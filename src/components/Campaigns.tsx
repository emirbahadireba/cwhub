import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Filter, 
  Search, 
  MoreHorizontal, 
  Clock, 
  Users, 
  Target,
  TrendingUp,
  Calendar,
  DollarSign,
  Tag
} from 'lucide-react'
import { useStore } from '../store/useStore'

export const Campaigns: React.FC = () => {
  const { campaigns, clients } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showNewCampaign, setShowNewCampaign] = useState(false)

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    return client?.name || 'Unknown Client'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-warning/20 text-warning border-warning/30'
      case 'in-progress': return 'bg-secondary/20 text-secondary border-secondary/30'
      case 'review': return 'bg-accent/20 text-accent border-accent/30'
      case 'completed': return 'bg-success/20 text-success border-success/30'
      default: return 'bg-textSecondary/20 text-textSecondary border-textSecondary/30'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-error text-white'
      case 'high': return 'bg-error/20 text-error'
      case 'medium': return 'bg-warning/20 text-warning'
      case 'low': return 'bg-success/20 text-success'
      default: return 'bg-textSecondary/20 text-textSecondary'
    }
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || campaign.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Kampanyalar</h1>
          <p className="text-textSecondary">Tüm sosyal medya kampanyalarınızı yönetin</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewCampaign(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Yeni Kampanya</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
          <input
            type="text"
            placeholder="Kampanya ara..."
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
          <option value="planning">Planlama</option>
          <option value="in-progress">Devam Eden</option>
          <option value="review">İnceleme</option>
          <option value="completed">Tamamlanan</option>
        </select>
        
        <button className="p-3 bg-surface border border-border rounded-xl hover:border-primary/50 transition-all">
          <Filter className="w-5 h-5 text-textSecondary" />
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCampaigns.map((campaign) => (
            <motion.div
              key={campaign.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                      {campaign.status === 'planning' ? 'Planlama' :
                       campaign.status === 'in-progress' ? 'Devam Eden' :
                       campaign.status === 'review' ? 'İnceleme' : 'Tamamlandı'}
                    </span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(campaign.priority)}`}>
                      {campaign.priority === 'urgent' ? 'Acil' :
                       campaign.priority === 'high' ? 'Yüksek' :
                       campaign.priority === 'medium' ? 'Orta' : 'Düşük'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{campaign.title}</h3>
                  <p className="text-textSecondary text-sm">{getClientName(campaign.clientId)}</p>
                </div>
                
                <button className="p-2 hover:bg-background/50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="w-5 h-5 text-textSecondary" />
                </button>
              </div>

              {/* Description */}
              <p className="text-textSecondary text-sm mb-4 line-clamp-2">{campaign.description}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">İlerleme</span>
                  <span className="text-textSecondary text-sm">{campaign.progress}%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${campaign.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
              </div>

              {/* Platforms */}
              <div className="flex flex-wrap gap-2 mb-4">
                {campaign.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 bg-background/50 text-textSecondary text-xs rounded-lg"
                  >
                    {platform}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="w-4 h-4 text-success" />
                  </div>
                  <p className="text-xs text-textSecondary">Bütçe</p>
                  <p className="text-sm font-medium text-white">₺{campaign.budget.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-4 h-4 text-secondary" />
                  </div>
                  <p className="text-xs text-textSecondary">Ekip</p>
                  <p className="text-sm font-medium text-white">{campaign.assignedTo.length} kişi</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-xs text-textSecondary">Bitiş</p>
                  <p className="text-sm font-medium text-white">{new Date(campaign.dueDate).toLocaleDateString('tr-TR')}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {campaign.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
                {campaign.tags.length > 3 && (
                  <span className="px-2 py-1 bg-textSecondary/10 text-textSecondary text-xs rounded-lg">
                    +{campaign.tags.length - 3}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Target className="w-16 h-16 text-textSecondary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Kampanya bulunamadı</h3>
          <p className="text-textSecondary mb-6">Arama kriterlerinizi değiştirin veya yeni bir kampanya oluşturun</p>
          <button
            onClick={() => setShowNewCampaign(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all"
          >
            İlk Kampanyanızı Oluşturun
          </button>
        </motion.div>
      )}
    </div>
  )
}
