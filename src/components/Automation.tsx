import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  Plus, 
  Play, 
  Pause, 
  Settings, 
  Calendar, 
  MessageSquare, 
  Image,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Mail,
  Hash,
  Target,
  TrendingUp,
  RefreshCw,
  Filter,
  Search
} from 'lucide-react'

interface AutomationRule {
  id: string
  name: string
  description: string
  trigger: {
    type: 'schedule' | 'engagement' | 'mention' | 'hashtag' | 'follower_count'
    condition: string
  }
  action: {
    type: 'post' | 'reply' | 'dm' | 'report' | 'alert'
    details: string
  }
  status: 'active' | 'paused' | 'draft'
  platforms: string[]
  lastRun?: string
  nextRun?: string
  executions: number
  successRate: number
  createdAt: string
}

const automationRules: AutomationRule[] = [
  {
    id: '1',
    name: 'Haftalık Instagram Story',
    description: 'Her pazartesi sabah 09:00\'da motivasyonel quote paylaş',
    trigger: {
      type: 'schedule',
      condition: 'Pazartesi 09:00'
    },
    action: {
      type: 'post',
      details: 'Instagram Story - Motivasyonel içerik'
    },
    status: 'active',
    platforms: ['Instagram'],
    lastRun: '2024-11-11T09:00:00Z',
    nextRun: '2024-11-18T09:00:00Z',
    executions: 24,
    successRate: 95.8,
    createdAt: '2024-05-15'
  },
  {
    id: '2',
    name: 'Yüksek Engagement Tespiti',
    description: 'Post 1000+ beğeni aldığında otomatik teşekkür yorumu',
    trigger: {
      type: 'engagement',
      condition: 'Beğeni > 1000'
    },
    action: {
      type: 'reply',
      details: 'Otomatik teşekkür yorumu'
    },
    status: 'active',
    platforms: ['Instagram', 'Facebook'],
    lastRun: '2024-11-10T14:32:00Z',
    nextRun: '2024-11-15T00:00:00Z',
    executions: 156,
    successRate: 98.1,
    createdAt: '2024-03-20'
  },
  {
    id: '3',
    name: 'Marka Mention Takibi',
    description: 'Markamızdan bahsedilen tweetlere otomatik beğeni',
    trigger: {
      type: 'mention',
      condition: '@TechnoMax OR #TechnoMax'
    },
    action: {
      type: 'reply',
      details: 'Beğeni + teşekkür mesajı'
    },
    status: 'active',
    platforms: ['Twitter'],
    lastRun: '2024-11-12T11:45:00Z',
    executions: 89,
    successRate: 92.1,
    createdAt: '2024-06-01'
  },
  {
    id: '4',
    name: 'LinkedIn Haftalık Rapor',
    description: 'Her cuma sonu haftalık performans raporu paylaş',
    trigger: {
      type: 'schedule',
      condition: 'Cuma 17:00'
    },
    action: {
      type: 'post',
      details: 'LinkedIn - Haftalık analitik raporu'
    },
    status: 'paused',
    platforms: ['LinkedIn'],
    lastRun: '2024-11-08T17:00:00Z',
    nextRun: '2024-11-15T17:00:00Z',
    executions: 12,
    successRate: 83.3,
    createdAt: '2024-08-10'
  },
  {
    id: '5',
    name: 'Takipçi Milestone Kutlaması',
    description: '5K katlarında takipçiye ulaşınca kutlama postu',
    trigger: {
      type: 'follower_count',
      condition: 'Her 5000 takipçi'
    },
    action: {
      type: 'post',
      details: 'Takipçi milestone kutlama postu'
    },
    status: 'active',
    platforms: ['Instagram', 'Twitter'],
    lastRun: '2024-10-15T12:00:00Z',
    executions: 4,
    successRate: 100,
    createdAt: '2024-04-01'
  },
  {
    id: '6',
    name: 'Trend Hashtag Takibi',
    description: 'Gündem hashtagleri tespit edince bildirim gönder',
    trigger: {
      type: 'hashtag',
      condition: 'Trend hashtagler (teknoloji)'
    },
    action: {
      type: 'alert',
      details: 'Ekibe Slack bildirim gönder'
    },
    status: 'draft',
    platforms: ['Twitter', 'Instagram'],
    executions: 0,
    successRate: 0,
    createdAt: '2024-11-01'
  }
]

const automationTemplates = [
  {
    id: 'welcome-dm',
    name: 'Hoş Geldin Mesajı',
    description: 'Yeni takipçilere otomatik hoş geldin DM\'i gönder',
    category: 'Engagement',
    icon: MessageSquare,
    trigger: 'Yeni takipçi',
    platforms: ['Instagram', 'Twitter']
  },
  {
    id: 'content-scheduling',
    name: 'İçerik Programlama',
    description: 'Belirli saatlerde otomatik içerik paylaşımı',
    category: 'Scheduling',
    icon: Calendar,
    trigger: 'Zaman bazlı',
    platforms: ['Instagram', 'Facebook', 'Twitter', 'LinkedIn']
  },
  {
    id: 'engagement-boost',
    name: 'Engagement Artırıcı',
    description: 'Düşük performanslı postları otomatik promote et',
    category: 'Performance',
    icon: TrendingUp,
    trigger: 'Düşük engagement',
    platforms: ['Instagram', 'Facebook']
  },
  {
    id: 'competitor-monitoring',
    name: 'Rakip Takibi',
    description: 'Rakiplerin yeni içeriklerini takip et ve bildirim gönder',
    category: 'Intelligence',
    icon: Target,
    trigger: 'Rakip aktivitesi',
    platforms: ['Instagram', 'Twitter', 'LinkedIn']
  }
]

export const Automation: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'rules' | 'templates'>('rules')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showCreateRule, setShowCreateRule] = useState(false)

  const filteredRules = automationRules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || rule.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/20 text-success border border-success/30'
      case 'paused': return 'bg-warning/20 text-warning border border-warning/30'
      case 'draft': return 'bg-textSecondary/20 text-textSecondary border border-textSecondary/30'
      default: return 'bg-textSecondary/20 text-textSecondary border border-textSecondary/30'
    }
  }

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'schedule': return <Clock className="w-4 h-4" />
      case 'engagement': return <BarChart3 className="w-4 h-4" />
      case 'mention': return <Hash className="w-4 h-4" />
      case 'hashtag': return <Hash className="w-4 h-4" />
      case 'follower_count': return <Users className="w-4 h-4" />
      default: return <Zap className="w-4 h-4" />
    }
  }

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'post': return <Image className="w-4 h-4" />
      case 'reply': return <MessageSquare className="w-4 h-4" />
      case 'dm': return <Mail className="w-4 h-4" />
      case 'report': return <BarChart3 className="w-4 h-4" />
      case 'alert': return <AlertCircle className="w-4 h-4" />
      default: return <Zap className="w-4 h-4" />
    }
  }

  const automationStats = {
    totalRules: automationRules.length,
    activeRules: automationRules.filter(r => r.status === 'active').length,
    totalExecutions: automationRules.reduce((sum, r) => sum + r.executions, 0),
    avgSuccessRate: automationRules.filter(r => r.executions > 0).reduce((sum, r) => sum + r.successRate, 0) / automationRules.filter(r => r.executions > 0).length
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Otomasyon Hub</h1>
          <p className="text-textSecondary">Sosyal medya süreçlerinizi otomatikleştirin ve verimliliği artırın</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateRule(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Yeni Kural</span>
        </motion.button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex items-center space-x-3 mb-3">
            <Zap className="w-6 h-6 text-primary" />
            <span className="text-textSecondary">Toplam Kural</span>
          </div>
          <span className="text-3xl font-bold text-white">{automationStats.totalRules}</span>
        </div>
        
        <div className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex items-center space-x-3 mb-3">
            <Play className="w-6 h-6 text-success" />
            <span className="text-textSecondary">Aktif Kurallar</span>
          </div>
          <span className="text-3xl font-bold text-white">{automationStats.activeRules}</span>
        </div>
        
        <div className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex items-center space-x-3 mb-3">
            <RefreshCw className="w-6 h-6 text-secondary" />
            <span className="text-textSecondary">Toplam Çalıştırma</span>
          </div>
          <span className="text-3xl font-bold text-white">{automationStats.totalExecutions}</span>
        </div>
        
        <div className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex items-center space-x-3 mb-3">
            <CheckCircle className="w-6 h-6 text-accent" />
            <span className="text-textSecondary">Başarı Oranı</span>
          </div>
          <span className="text-3xl font-bold text-white">{automationStats.avgSuccessRate.toFixed(1)}%</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-surface rounded-xl p-2 border border-border w-fit">
        <button
          onClick={() => setSelectedTab('rules')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            selectedTab === 'rules'
              ? 'bg-primary text-white'
              : 'text-textSecondary hover:text-white'
          }`}
        >
          Mevcut Kurallar
        </button>
        <button
          onClick={() => setSelectedTab('templates')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            selectedTab === 'templates'
              ? 'bg-primary text-white'
              : 'text-textSecondary hover:text-white'
          }`}
        >
          Şablonlar
        </button>
      </div>

      {selectedTab === 'rules' ? (
        <>
          {/* Filters */}
          <div className="flex items-center space-x-4 mb-8 flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
              <input
                type="text"
                placeholder="Kural ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-surface border border-border rounded-xl text-white focus:border-primary focus:outline-none"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="paused">Duraklatılmış</option>
              <option value="draft">Taslak</option>
            </select>
            
            <button className="p-3 bg-surface border border-border rounded-xl hover:border-primary/50 transition-all">
              <Filter className="w-5 h-5 text-textSecondary" />
            </button>
          </div>

          {/* Automation Rules List */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredRules.map((rule, index) => (
                <motion.div
                  key={rule.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${
                        rule.status === 'active' ? 'bg-success/20' :
                        rule.status === 'paused' ? 'bg-warning/20' : 'bg-textSecondary/20'
                      }`}>
                        <Zap className={`w-6 h-6 ${
                          rule.status === 'active' ? 'text-success' :
                          rule.status === 'paused' ? 'text-warning' : 'text-textSecondary'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{rule.name}</h3>
                          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(rule.status)}`}>
                            {rule.status === 'active' ? 'Aktif' :
                             rule.status === 'paused' ? 'Duraklatılmış' : 'Taslak'}
                          </span>
                        </div>
                        
                        <p className="text-textSecondary mb-4">{rule.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-3 p-3 bg-background/30 rounded-xl">
                            <div className="p-2 bg-secondary/20 rounded-lg">
                              {getTriggerIcon(rule.trigger.type)}
                            </div>
                            <div>
                              <div className="text-white font-medium text-sm">Tetikleyici</div>
                              <div className="text-textSecondary text-sm">{rule.trigger.condition}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 p-3 bg-background/30 rounded-xl">
                            <div className="p-2 bg-accent/20 rounded-lg">
                              {getActionIcon(rule.action.type)}
                            </div>
                            <div>
                              <div className="text-white font-medium text-sm">Eylem</div>
                              <div className="text-textSecondary text-sm">{rule.action.details}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-sm text-textSecondary">
                            <span>Platformlar: {rule.platforms.join(', ')}</span>
                            <span>Çalıştırma: {rule.executions}</span>
                            <span>Başarı: {rule.successRate}%</span>
                            {rule.nextRun && (
                              <span>
                                Sonraki: {new Date(rule.nextRun).toLocaleDateString('tr-TR')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        className={`p-2 rounded-lg transition-all ${
                          rule.status === 'active' 
                            ? 'bg-warning/20 text-warning hover:bg-warning/30' 
                            : 'bg-success/20 text-success hover:bg-success/30'
                        }`}
                      >
                        {rule.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      
                      <button className="p-2 bg-textSecondary/20 text-textSecondary hover:bg-textSecondary/30 rounded-lg transition-all">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredRules.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Zap className="w-16 h-16 text-textSecondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Kural bulunamadı</h3>
              <p className="text-textSecondary mb-6">Arama kriterlerinizi değiştirin veya yeni bir kural oluşturun</p>
              <button 
                onClick={() => setShowCreateRule(true)}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all"
              >
                İlk Kuralınızı Oluşturun
              </button>
            </motion.div>
          )}
        </>
      ) : (
        /* Templates Tab */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automationTemplates.map((template, index) => {
            const Icon = template.icon
            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 cursor-pointer transition-all"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-lg">
                      {template.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-textSecondary mb-4">{template.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-textSecondary">Tetikleyici:</span>
                    <span className="text-white">{template.trigger}</span>
                  </div>
                  
                  <div>
                    <span className="text-textSecondary text-sm block mb-2">Platformlar:</span>
                    <div className="flex flex-wrap gap-1">
                      {template.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 rounded-xl hover:from-primary/30 hover:to-secondary/30 transition-all"
                >
                  Şablonu Kullan
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Create Automation Rule Modal */}
      <AnimatePresence>
        {showCreateRule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowCreateRule(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-border rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-white mb-6">Yeni Otomasyon Kuralı</h2>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-textSecondary mb-2">Kural Adı</label>
                    <input
                      type="text"
                      placeholder="Örnek: Haftalık Instagram Story"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-textSecondary mb-2">Açıklama</label>
                    <textarea
                      placeholder="Bu kuralın ne yaptığını açıklayın..."
                      rows={3}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* Trigger Configuration */}
                <div className="p-4 bg-background/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-secondary" />
                    <span>Tetikleyici</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Tetikleyici Türü</label>
                      <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none">
                        <option value="schedule">Zamanlama</option>
                        <option value="engagement">Engagement</option>
                        <option value="mention">Mention/Etiketleme</option>
                        <option value="hashtag">Hashtag</option>
                        <option value="follower_count">Takipçi Sayısı</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Koşul</label>
                      <input
                        type="text"
                        placeholder="Örnek: Her pazartesi 09:00"
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Configuration */}
                <div className="p-4 bg-background/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Target className="w-5 h-5 text-accent" />
                    <span>Eylem</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Eylem Türü</label>
                      <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none">
                        <option value="post">İçerik Paylaş</option>
                        <option value="reply">Yorum Yap</option>
                        <option value="dm">Direkt Mesaj</option>
                        <option value="report">Rapor Oluştur</option>
                        <option value="alert">Bildirim Gönder</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Eylem Detayları</label>
                      <input
                        type="text"
                        placeholder="Örnek: Motivasyonel quote story"
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Platform Selection */}
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-4">Platformlar</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube'].map((platform) => (
                      <label key={platform} className="flex items-center space-x-2 p-3 bg-background/30 rounded-xl cursor-pointer hover:bg-background/50 transition-all">
                        <input type="checkbox" className="rounded text-primary" />
                        <span className="text-white">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="p-4 bg-background/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-white mb-4">Gelişmiş Ayarlar</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Başlangıç Tarihi</label>
                      <input
                        type="datetime-local"
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Bitiş Tarihi (Opsiyonel)</label>
                      <input
                        type="datetime-local"
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Maksimum Çalıştırma</label>
                      <input
                        type="number"
                        placeholder="Sınırsız için boş bırakın"
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-2">Durum</label>
                      <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none">
                        <option value="active">Aktif</option>
                        <option value="paused">Duraklatılmış</option>
                        <option value="draft">Taslak</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateRule(false)}
                  className="flex-1 px-4 py-3 border border-border rounded-xl text-textSecondary hover:text-white hover:bg-background/50 transition-all"
                >
                  İptal
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all">
                  Kural Oluştur
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
