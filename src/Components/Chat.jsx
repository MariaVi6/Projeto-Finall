import { useEffect, useRef, useState } from 'react'
import './Chat.css'

const validateUserInput = (message, isLoading) => {
  const trimmed = message.trim()
  return {
    isValid: trimmed.length > 0 && !isLoading,
    message: trimmed
  }
}

const validateAuth = (token, usuario) => {
  return {
    isValid: !!(token && usuario),
    errorMessage: 'Você precisa estar logado para usar o chat.'
  }
}

const processApiResponse = (response) => {
  const contentType = response.headers.get('content-type')
  return {
    isStreaming: contentType?.includes('text/event-stream'),
    isJson: contentType?.includes('application/json'),
    isValid: response.ok,
    status: response.status,
    statusText: response.statusText
  }
}

const parseSSELine = (line) => {
  if (!line.startsWith('data: ')) return null
  try {
    const jsonStr = line.slice(6).trim()
    if (!jsonStr) return null
    return JSON.parse(jsonStr)
  } catch (error) {
    console.warn('Erro ao realizar parse do chunk SSE:', error)
    return null
  }
}

const processSSEChunk = (chunk) => {
  return chunk
    .split('\n')
    .map(parseSSELine)
    .filter(Boolean)
}

const useAuth = () => {
  const token = localStorage.getItem('access_token')
  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null')

  return { token, usuario, ...validateAuth(token, usuario) }
}

const useAutoScroll = (chatMessages) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  return messagesEndRef
}

export default function Chat() {
  const [prompt, setPrompt] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const dialog = useRef(null)

  const { token, usuario, isValid: isAuthenticated, errorMessage } = useAuth()
  const messagesEndRef = useAutoScroll(chatMessages)

  const addMessage = (role, content) => {
    setChatMessages(prev => [...prev, { role, content, id: Date.now() }])
  }

  const createEmptyMessage = () => {
    const messageId = Date.now()
    setChatMessages(prev => [...prev, { role: 'system', content: '', id: messageId }])
    return messageId
  }

  const updateMessageById = (messageId, content) => {
    setChatMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, content } : msg
      )
    )
  }

  const buildApiRequest = (userMessage) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: userMessage,
      nome: usuario.nome,
      token
    })
  })

  const handleJsonResponse = async (response) => {
    const data = await response.json()
    addMessage('system', data.message || data.data?.join('') || 'Resposta recebida!')
  }

  const handleStreamingResponse = async (response) => {
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let accumulatedText = ''
    const messageId = createEmptyMessage()

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const parsedData = processSSEChunk(chunk)

        for (const data of parsedData) {
          if (data.error) {
            updateMessageById(messageId, `Erro: ${data.error}`)
            return
          }

          if (data.chunk) {
            accumulatedText += data.chunk
            updateMessageById(messageId, accumulatedText)
          }

          if (data.done) return
        }
      }
    } catch (streamError) {
      updateMessageById(messageId, `Erro de streaming: ${streamError.message}`)
    }
  }

  const sendMessage = async () => {
    const validation = validateUserInput(prompt, isLoading)
    if (!validation.isValid) return

    if (!isAuthenticated) {
      addMessage('system', errorMessage)
      return
    }

    addMessage('user', validation.message)
    setPrompt('')
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:3000/chat', buildApiRequest(validation.message))

      const apiResponse = processApiResponse(response)
      if (!apiResponse.isValid) {
        throw new Error(`Erro ${apiResponse.status}: ${apiResponse.statusText}`)
      }

      // Processa resposta baseado no tipo
      if (apiResponse.isStreaming) await handleStreamingResponse(response)
      if (apiResponse.isJson) await handleJsonResponse(response)
    } catch (error) {
      addMessage('system', `Erro: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    sendMessage()
  }

  const openDialog = () => dialog.current.showModal()
  const closeDialog = () => dialog.current.close()

  const renderMessage = (msg) => (
    <div
      key={msg.id}
      className={`message-${msg.role === 'user' ? 'user' : 'system'}`}>
      <span className="message-role">{msg.role === 'user' ? 'Eu' : 'Celestia'}</span>
      {msg.content}
    </div>
  )

  const renderLoadingIndicator = () => (
    isLoading && (
      <div className="message-system">
        <span className="typing-indicator">Digitando...</span>
      </div>
    )
  )

  const renderChatHeader = () => (
    <div className="chat-header">
      <h1 className="chat-title">Olá, {usuario?.nome || 'Fulano de Tal'}</h1>
      <h2 className="chat-subtitle">Pergunte qualquer coisa!</h2>
      <button type="button" className="close-icon" onClick={closeDialog}>
        ✕
      </button>
    </div>
  )

  const renderChatForm = () => (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <div className='chat-form__body'>
        <input
          placeholder="Como posso te ajudar?"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </form>
  )

  return (
    <div>
      <button className="show" onClick={openDialog}>
        Conversar com a Celestia
      </button>

      <dialog ref={dialog} className="chat-dialog" closedby="any">
        {renderChatHeader()}

        <div className="chat-messages">
          {chatMessages.map(renderMessage)}
          {renderLoadingIndicator()}
          <div ref={messagesEndRef} />
        </div>

        {renderChatForm()}
      </dialog>
    </div>
  )
}
