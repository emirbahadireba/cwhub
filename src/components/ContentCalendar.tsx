import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Filter,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Image,
  Video,
  FileText,
  Clock,
  Users,
  Eye
} from 'lucide-react'
import { useStore } from '../store/useStore'

interface ContentPost {
  id: string
  date: string
  time: string
  platform: string
  type: 'image' | 'video' | 'text' | 'carousel'
  title: string
  description: string
  status: 'scheduled' | 'published' | 'draft'
  engagement?: {
    likes: number
    comments: number
    shares: number
    views: number
  }
}

const samplePosts: ContentPost[] = [
  {
    id: '1',
    date: '2024-11-15',
    time: '09:00',
    platform: 'instagram',
    type: 'image',
    title: 'Yeni ürün tanıtımı',
    description: 'TechnoMax\'in yeni akıllı telefonu ile tanışın!',
    status: 'scheduled'
  },
  {
    id: '2',
    date: '2024-11-15',
    time: '14:30',
    platform: 'linkedin',
    type: 'text',
    title: 'Sektör analizi',
    description: 'Teknoloji sektöründeki son trendler hakkında...',
    status: 'draft'
  },
  {
    id: '3',
    date: '2024-11-14',
    time: '12:00',
    platform: 'instagram',
    type: 'video',
    title: 'Ürün tanıtım videosu',
    description: 'Yeni özellikler detaylı anlatım',
    status: 'published',
    engagement: {
      likes: 1250,
      comments: 89,
      shares: 156,
      views: 8940
    }
  }
]

export const ContentCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [posts] = useState<ContentPost[]>(samplePosts)
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-4 h-4" />
      case 'facebook': return <Facebook className="w-4 h-4" />
      case 'twitter': return <Twitter className="w-4 h-4" />
      case 'linkedin': return <Linkedin className="w-4 h-4" />
      case 'youtube': return <Youtube className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-3 h-3" />
      case 'video': return <Video className="w-3 h-3" />
      case 'carousel': return <Image className="w-3 h-3" />
      default: return <FileText className="w-3 h-3" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-success/20 text-success border-success/30'
      case 'scheduled': return 'bg-secondary/20 text-secondary border-secondary/30'
      case 'draft': return 'bg-warning/20 text-warning border-warning/30'
      default: return 'bg-textSecondary/20 text-textSecondary border-textSecondary/30'
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i)
      days.push(day)
    }
    return days
  }

  const getPostsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return posts.filter(post => post.date === dateStr)
  }

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">İçerik Takvimi</h1>
          <p className="text-textSecondary">Sosyal medya içeriklerinizi planlayın ve yönetin</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* View Mode */}
          <div className="flex bg-surface rounded-xl border border-border">
            {['month', 'week', 'day'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  viewMode === mode
                    ? 'bg-primary text-white'
                    : 'text-textSecondary hover:text-white'
                }`}
              >
                {mode === 'month' ? 'Ay' : mode === 'week' ? 'Hafta' : 'Gün'}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>İçerik Ekle</span>
          </motion.button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-3">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-surface rounded-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-textSecondary" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-all"
              >
                Bugün
              </button>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-surface rounded-lg transition-all"
              >
                <ChevronRight className="w-5 h-5 text-textSecondary" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-surface rounded-2xl border border-border p-6">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'].map((day) => (
                <div key={day} className="p-3 text-center text-textSecondary text-sm font-medium">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const isCurrentMonth = day.getMonth() === currentDate.getMonth()
                const isToday = day.toDateString() === new Date().toDateString()
                const dayPosts = getPostsForDate(day)
                const dateStr = day.toISOString().split('T')[0]

                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`min-h-[120px] p-2 rounded-lg cursor-pointer transition-all ${
                      isCurrentMonth 
                        ? 'bg-background/50 hover:bg-background/80' 
                        : 'bg-background/20 opacity-50'
                    } ${
                      selectedDate === dateStr ? 'ring-2 ring-primary' : ''
                    } ${
                      isToday ? 'bg-primary/10 border border-primary/30' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${
                        isCurrentMonth ? 'text-white' : 'text-textSecondary'
                      } ${isToday ? 'text-primary font-bold' : ''}`}>
                        {day.getDate()}
                      </span>
                      {dayPosts.length > 0 && (
                        <span className="text-xs bg-primary/20 text-primary px-1 py-0.5 rounded">
                          {dayPosts.length}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      {dayPosts.slice(0, 3).map((post) => (
                        <motion.div
                          key={post.id}
                          whileHover={{ scale: 1.05 }}
                          className="p-2 bg-surface/50 rounded text-xs"
                        >
                          <div className="flex items-center space-x-1 mb-1">
                            {getPlatformIcon(post.platform)}
                            {getTypeIcon(post.type)}
                            <span className="text-white truncate flex-1">
                              {post.title}
                            </span>
                          </div>
                          <div className="text-textSecondary text-xs">
                            {post.time}
                          </div>
                        </motion.div>
                      ))}
                      {dayPosts.length > 3 && (
                        <div className="text-xs text-textSecondary text-center">
                          +{dayPosts.length - 3} daha
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="p-6 bg-surface rounded-2xl border border-border">
            <h3 className="text-lg font-semibold text-white mb-4">Bu Ay</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-textSecondary">Yayınlanan</span>
                <span className="text-white font-medium">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-textSecondary">Planlanmış</span>
                <span className="text-white font-medium">18</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-textSecondary">Taslak</span>
                <span className="text-white font-medium">7</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-textSecondary">Toplam Engagement</span>
                <span className="text-success font-medium">+22%</span>
              </div>
            </div>
          </div>

          {/* Upcoming Posts */}
          <div className="p-6 bg-surface rounded-2xl border border-border">
            <h3 className="text-lg font-semibold text-white mb-4">Yaklaşan Paylaşımlar</h3>
            <div className="space-y-3">
              {posts
                .filter(p => p.status === 'scheduled')
                .slice(0, 5)
                .map((post) => (
                  <div
                    key={post.id}
                    className="p-3 bg-background/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {getPlatformIcon(post.platform)}
                      <span className="text-white text-sm font-medium">
                        {post.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-textSecondary">
                      <Clock className="w-3 h-3" />
                      <span>{post.date} - {post.time}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Platform Performance */}
          <div className="p-6 bg-surface rounded-2xl border border-border">
            <h3 className="text-lg font-semibold text-white mb-4">Platform Performansı</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span className="text-textSecondary text-sm">Instagram</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">4.2%</div>
                  <div className="text-success text-xs">+0.3%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span className="text-textSecondary text-sm">LinkedIn</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">5.1%</div>
                  <div className="text-success text-xs">+0.8%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <span className="text-textSecondary text-sm">Facebook</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">3.1%</div>
                  <div className="text-error text-xs">-0.2%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Date Details Modal */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface rounded-2xl border border-border p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                {new Date(selectedDate).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h2>
              
              <div className="space-y-4">
                {getPostsForDate(new Date(selectedDate)).map((post) => (
                  <div key={post.id} className="p-4 bg-background/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getPlatformIcon(post.platform)}
                        <span className="text-white font-medium">{post.title}</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(post.status)}`}>
                          {post.status === 'published' ? 'Yayınlandı' : 
                           post.status === 'scheduled' ? 'Planlandı' : 'Taslak'}
                        </span>
                      </div>
                      <span className="text-textSecondary text-sm">{post.time}</span>
                    </div>
                    
                    <p className="text-textSecondary mb-3">{post.description}</p>
                    
                    {post.engagement && (
                      <div className="grid grid-cols-4 gap-3 text-center">
                        <div>
                          <div className="text-white font-medium">{post.engagement.likes}</div>
                          <div className="text-textSecondary text-xs">Beğeni</div>
                        </div>
                        <div>
                          <div className="text-white font-medium">{post.engagement.comments}</div>
                          <div className="text-textSecondary text-xs">Yorum</div>
                        </div>
                        <div>
                          <div className="text-white font-medium">{post.engagement.shares}</div>
                          <div className="text-textSecondary text-xs">Paylaşım</div>
                        </div>
                        <div>
                          <div className="text-white font-medium">{post.engagement.views}</div>
                          <div className="text-textSecondary text-xs">Görüntüleme</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {getPostsForDate(new Date(selectedDate)).length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-textSecondary mx-auto mb-3" />
                    <p className="text-textSecondary">Bu tarihte planlanmış içerik yok</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
