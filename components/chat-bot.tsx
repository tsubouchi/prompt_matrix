"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Paperclip, ImageIcon, X, Bot, User, FileText, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  attachments?: Attachment[]
}

interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "こんにちは！PROMPT MATRIXの技術サポートです。プロンプトテンプレートの使い方や技術的な質問がございましたら、お気軽にお聞かせください。画像やファイルの添付も可能です。",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = async (userMessage: string, attachments: Attachment[]): Promise<string> => {
    // 模擬的なボット応答生成
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    const responses = {
      greeting: ["こんにちは！何かお手伝いできることはありますか？", "お疲れ様です！どのようなご質問でしょうか？"],
      prompt: [
        "プロンプトテンプレートについてですね。具体的にどのような用途でお使いになりたいですか？カテゴリ別に最適なテンプレートをご提案できます。",
        "プロンプトの効果を最大化するコツをお教えします。まず、具体的な要件を明確にすることが重要です。どのような成果物を期待されていますか？",
      ],
      technical: [
        "技術的なご質問ですね。詳細を教えていただければ、より具体的なサポートができます。エラーメッセージやスクリーンショットがあれば添付してください。",
        "技術サポートチームがお答えします。問題の詳細と、可能であれば再現手順を教えてください。",
      ],
      file: [
        "ファイルを添付していただきありがとうございます。内容を確認して適切なアドバイスをいたします。",
        "添付ファイルを拝見しました。この内容について詳しくサポートさせていただきます。",
      ],
      general: [
        "ご質問ありがとうございます。より詳しい情報をいただければ、具体的なアドバイスができます。",
        "承知いたしました。他にもご不明な点がございましたら、お気軽にお聞かせください。",
      ],
    }

    // 簡単なキーワードマッチング
    const lowerMessage = userMessage.toLowerCase()
    if (attachments.length > 0) {
      return responses.file[Math.floor(Math.random() * responses.file.length)]
    } else if (lowerMessage.includes("プロンプト") || lowerMessage.includes("テンプレート")) {
      return responses.prompt[Math.floor(Math.random() * responses.prompt.length)]
    } else if (lowerMessage.includes("エラー") || lowerMessage.includes("問題") || lowerMessage.includes("技術")) {
      return responses.technical[Math.floor(Math.random() * responses.technical.length)]
    } else if (lowerMessage.includes("こんにちは") || lowerMessage.includes("はじめまして")) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)]
    } else {
      return responses.general[Math.floor(Math.random() * responses.general.length)]
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() && attachments.length === 0) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setAttachments([])
    setIsLoading(true)

    try {
      const botResponse = await generateBotResponse(inputValue, attachments)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Bot response error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "申し訳ございません。一時的な問題が発生しました。もう一度お試しください。",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "file" | "image") => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const attachment: Attachment = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      }
      setAttachments((prev) => [...prev, attachment])
    })

    // Reset input
    if (event.target) {
      event.target.value = ""
    }
  }

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      {/* Chat Icon Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-4 right-4 h-14 w-14 rounded-full bg-white text-black hover:bg-gray-200 shadow-lg z-50 transition-all duration-300",
          isOpen ? "scale-0" : "scale-100 hover:scale-110",
        )}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-52 right-4 w-80 sm:w-96 h-[400px] sm:h-[500px] bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50 transition-all duration-300 ease-out max-w-[calc(100vw-2rem)] max-h-[calc(100vh-14rem)]",
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-4 pointer-events-none",
        )}
        style={{
          transformOrigin: "bottom right",
          right: "1rem",
          maxWidth: "calc(100vw - 2rem)",
          bottom: "13rem", // 200px上に移動
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700 bg-gray-800 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-white" />
              <span className="text-white font-semibold">技術サポートチャット</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white h-8 w-8 p-0"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.role === "user" ? "bg-white text-black" : "bg-gray-800 text-white",
                    )}
                  >
                    <div className="text-sm leading-relaxed">{message.content}</div>

                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center gap-2 p-2 bg-gray-700 rounded text-xs">
                            {attachment.type.startsWith("image/") ? (
                              <ImageIcon className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                            <span className="flex-1 truncate">{attachment.name}</span>
                            <span className="text-gray-400">{formatFileSize(attachment.size)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-gray-400 mt-1">{formatTime(message.timestamp)}</div>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-800 text-white rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="p-3 border-t border-gray-700 bg-gray-800">
              <div className="space-y-2">
                {attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center gap-2 p-2 bg-gray-700 rounded text-sm">
                    {attachment.type.startsWith("image/") ? (
                      <ImageIcon className="h-4 w-4 text-white" />
                    ) : (
                      <FileText className="h-4 w-4 text-white" />
                    )}
                    <span className="flex-1 truncate text-white">{attachment.name}</span>
                    <span className="text-gray-400 text-xs">{formatFileSize(attachment.size)}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeAttachment(attachment.id)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-700 bg-gray-800 rounded-b-lg">
            <div className="flex gap-2">
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-gray-400 hover:text-white"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => imageInputRef.current?.click()}
                  className="text-gray-400 hover:text-white"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>

              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="メッセージを入力..."
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />

              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() && attachments.length === 0}
                className="bg-white text-black hover:bg-gray-200"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileUpload(e, "file")}
          accept=".pdf,.doc,.docx,.txt,.csv,.json,.xml"
        />
        <input
          ref={imageInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileUpload(e, "image")}
          accept="image/*"
        />
      </div>
    </>
  )
}

export default ChatBot
