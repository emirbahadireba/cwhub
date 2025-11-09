import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Phone, 
  Video, 
  Paperclip, 
  Smile,
  Users,
  MessageSquare,
  Hash,
  Lock,
  Bell,
  Pin,
  Archive
} from 'lucide-react'
import { useStore } from '../store/useStore'

interface Message {
  id: string
  senderId: string
  receiverId?: string
  channelId?: string
  content: string
  timestamp: string
  type: 'text' | 'file' | 'image' | 'task'
  isRead: boolean
  reactions?: { emoji: string; userId: string; count: number }[]
}

interface Channel {
  id: string
  name: string
  description: string
  type: 'public' | 'private' | 'direct'
  members: string[]
  isArchived: boolean
  lastMessage?: Message
}

const sampleChannels: Channel[] = [
  {
    id: '1',
    name: 'genel',
    description: 'Genel tartışmalar',
    type: 'public',
    members: ['1', '2', '3', '4', '5'],
    isArchived: false
  },
  {
    id: '2',
    name: 'tasarim-ekibi',
    description: 'Tasarım ekibi koordinasyonu',
    type: 'private',
    members: ['1', '2', '4'],
    isArchived: false
  },
  {
    id: '3',
    name: 'technomax-projesi',
    description: 'TechnoMax kampanya ekibi',
    type: 'private',
    members: ['1', '2', '3'],
    isArchived: false
  }
]

const sampleMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    channelId: '1',
    content: 'TechnoMax kampanyası için yeni görseller hazır. İncelemenizi bekliyorum! 🎨',
    timestamp: '2024-11-12T10:30:00Z',
    type: 'text',
    isRead: true,
    reactions: [{ emoji: '👍', userId: '1', count: 2 }]
  },
  {
    id: '2',
    senderId: '3',
    channelId: '1',
    content: 'Harika iş! Pazartesi sunumuna kadar tüm metinleri de tamamlayacağım.',
    timestamp: '2024-11-12T11:15:00Z',
    type: 'text',
    isRead: true
  },
  {
    id: '3',
    senderId: '1',
    channelId: '2',
    content: 'Bu hafta için tasarım sprintini planlayalım. Toplantı odası ayarlıyorum.',
    timestamp: '2024-11-12T14:20:00Z',
    type: 'text',
    isRead: false
  }
]

export const Messaging: React.FC = () => {
  const { user, clients } = useStore()
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(sampleChannels[0])
  const [messageInput, setMessageInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showChannelCreate, setShowChannelCreate] = useState(false)

  const teamMembers = [
    { id: '1', name: 'Ahmet Yılmaz', role: 'Creative Director', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', status: 'online' },
    { id: '2', name: 'Zeynep Kaya', role: 'Designer', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', status: 'online' },
    { id: '3', name: 'Mehmet Demir', role: 'Copywriter', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', status: 'away' },
    { id: '4', name: 'Ayşe Özkan', role: 'Social Media Manager', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', status: 'busy' },
    { id: '5', name: 'Can Yıldız', role: 'Account Manager', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', status: 'offline' }
  ]

  const getMember = (id: string) => teamMembers.find(m => m.id === id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success'
      case 'away': return 'bg-warning'
      case 'busy': return 'bg-error'
      default: return 'bg-textSecondary'
    }
  }

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChannel) return
    
    // Mesaj gönderme logic'i burada olacak
    setMessageInput('')
  }

  const filteredChannels = sampleChannels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Channels & DMs */}
      <div className="w-80 bg-surface border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-white">Mesajlar</h1>
            <button 
              onClick={() => setShowChannelCreate(true)}
              className="p-2 hover:bg-background/50 rounded-lg transition-all"
            >
              <Plus className="w-5 h-5 text-textSecondary" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-textSecondary" />
            <input
              type="text"
              placeholder="Kanal veya kişi ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-white placeholder-textSecondary focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Channel List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            <div className="flex items-center space-x-2 mb-3">
              <Hash className="w-4 h-4 text-textSecondary" />
              <span className="text-sm font-medium text-textSecondary uppercase tracking-wide">Kanallar</span>
            </div>
            
            {filteredChannels.filter(c => c.type !== 'direct').map((channel) => (
              <motion.button
                key={channel.id}
                onClick={() => setSelectedChannel(channel)}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
                  selectedChannel?.id === channel.id
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-textSecondary hover:text-white hover:bg-background/50'
                }`}
              >
                {channel.type === 'private' ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Hash className="w-4 h-4" />
                )}
                <div className="flex-1">
                  <div className="font-medium">{channel.name}</div>
                  <div className="text-xs opacity-75 truncate">{channel.description}</div>
                </div>
                {channel.members.length > 0 && (
                  <span className="text-xs bg-textSecondary/20 px-2 py-1 rounded-full">
                    {channel.members.length}
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          <div className="p-4 space-y-2 border-t border-border">
            <div className="flex items-center space-x-2 mb-3">
              <MessageSquare className="w-4 h-4 text-textSecondary" />
              <span className="text-sm font-medium text-textSecondary uppercase tracking-wide">Direkt Mesajlar</span>
            </div>
            
            {teamMembers.filter(m => m.id !== user?.id).map((member) => (
              <motion.button
                key={member.id}
                whileHover={{ x: 4 }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-background/50 transition-all"
              >
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-surface`}></div>
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">{member.name}</div>
                  <div className="text-xs text-textSecondary">{member.role}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChannel ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-surface">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {selectedChannel.type === 'private' ? (
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Lock className="w-5 h-5 text-primary" />
                    </div>
                  ) : (
                    <div className="p-2 bg-secondary/20 rounded-lg">
                      <Hash className="w-5 h-5 text-secondary" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-bold text-white">{selectedChannel.name}</h2>
                    <p className="text-sm text-textSecondary">{selectedChannel.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-background/50 rounded-lg transition-all">
                    <Phone className="w-5 h-5 text-textSecondary" />
                  </button>
                  <button className="p-2 hover:bg-background/50 rounded-lg transition-all">
                    <Video className="w-5 h-5 text-textSecondary" />
                  </button>
                  <button className="p-2 hover:bg-background/50 rounded-lg transition-all">
                    <Users className="w-5 h-5 text-textSecondary" />
                  </button>
                  <button className="p-2 hover:bg-background/50 rounded-lg transition-all">
                    <MoreHorizontal className="w-5 h-5 text-textSecondary" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {sampleMessages.filter(m => m.channelId === selectedChannel.id).map((message) => {
                const sender = getMember(message.senderId)
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start space-x-3"
                  >
                    <img
                      src={sender?.avatar}
                      alt={sender?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-white">{sender?.name}</span>
                        <span className="text-xs text-textSecondary">
                          {new Date(message.timestamp).toLocaleTimeString('tr-TR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="bg-surface p-3 rounded-xl">
                        <p className="text-white">{message.content}</p>
                        {message.reactions && (
                          <div className="flex items-center space-x-1 mt-2">
                            {message.reactions.map((reaction, index) => (
                              <button
                                key={index}
                                className="flex items-center space-x-1 px-2 py-1 bg-background/50 rounded-lg hover:bg-background transition-all"
                              >
                                <span>{reaction.emoji}</span>
                                <span className="text-xs text-textSecondary">{reaction.count}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div></div>
                  </motion.div>
                )
              })}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-surface">
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-background/50 rounded-lg transition-all">
                  <Paperclip className="w-5 h-5 text-textSecondary" />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder={`#${selectedChannel.name} kanalına mesaj yaz...`}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                  />
                </div>
                
                <button className="p-2 hover:bg-background/50 rounded-lg transition-all">
                  <Smile className="w-5 h-5 text-textSecondary" />
                </button>
                
                <motion.button
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!messageInput.trim()}
                  className="p-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-textSecondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Bir kanal seçin</h3>
              <p className="text-textSecondary">Ekibinizle iletişim kurmaya başlayın</p>
            </div>
          </div>
        )}
      </div>

      {/* Create Channel Modal */}
      <AnimatePresence>
        {showChannelCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowChannelCreate(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-border rounded-2xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-white mb-4">Yeni Kanal Oluştur</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Kanal Adı</label>
                  <input
                    type="text"
                    placeholder="kanal-adi"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Açıklama</label>
                  <textarea
                    placeholder="Bu kanalın amacı nedir?"
                    rows={3}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Kanal Türü</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="radio" name="channelType" value="public" defaultChecked className="text-primary" />
                      <Hash className="w-4 h-4 text-textSecondary" />
                      <div>
                        <span className="text-white font-medium">Açık Kanal</span>
                        <p className="text-xs text-textSecondary">Herkes görebilir ve katılabilir</p>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="radio" name="channelType" value="private" className="text-primary" />
                      <Lock className="w-4 h-4 text-textSecondary" />
                      <div>
                        <span className="text-white font-medium">Özel Kanal</span>
                        <p className="text-xs text-textSecondary">Sadece davet edilenler katılabilir</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowChannelCreate(false)}
                  className="flex-1 px-4 py-3 border border-border rounded-xl text-textSecondary hover:text-white hover:bg-background/50 transition-all"
                >
                  İptal
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all">
                  Kanal Oluştur
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
