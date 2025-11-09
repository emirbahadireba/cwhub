import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Filter, 
  Search, 
  Calendar, 
  User, 
  Clock, 
  CheckCircle2,
  Circle,
  AlertTriangle,
  MoreHorizontal,
  Tag,
  Briefcase,
  Palette,
  FileText,
  Video,
  Camera
} from 'lucide-react'
import { useStore } from '../store/useStore'

export const Tasks: React.FC = () => {
  const { tasks, campaigns, clients, updateTask } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [showCreateTask, setShowCreateTask] = useState(false)

  const teamMembers = [
    { id: '1', name: 'Ahmet Yılmaz', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { id: '2', name: 'Zeynep Kaya', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { id: '3', name: 'Mehmet Demir', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { id: '4', name: 'Ayşe Özkan', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { id: '5', name: 'Can Yıldız', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' }
  ]

  const getAssignedUser = (userId: string) => {
    return teamMembers.find(member => member.id === userId)
  }

  const getCampaignName = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId)
    return campaign?.title || 'Bilinmeyen Kampanya'
  }

  const getClientName = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId)
    if (!campaign) return 'Bilinmeyen Müşteri'
    const client = clients.find(c => c.id === campaign.clientId)
    return client?.name || 'Bilinmeyen Müşteri'
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'design': return <Palette className="w-4 h-4" />
      case 'copy': return <FileText className="w-4 h-4" />
      case 'content-creation': return <Camera className="w-4 h-4" />
      case 'review': return <CheckCircle2 className="w-4 h-4" />
      case 'publishing': return <Video className="w-4 h-4" />
      default: return <Briefcase className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'text-success'
      case 'in-progress': return 'text-secondary'
      case 'review': return 'text-warning'
      default: return 'text-textSecondary'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-error/20 text-error border border-error/30'
      case 'high': return 'bg-warning/20 text-warning border border-warning/30'
      case 'medium': return 'bg-secondary/20 text-secondary border border-secondary/30'
      case 'low': return 'bg-success/20 text-success border border-success/30'
      default: return 'bg-textSecondary/20 text-textSecondary border border-textSecondary/30'
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    const matchesType = filterType === 'all' || task.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    done: tasks.filter(t => t.status === 'done').length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'done').length
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Görevler</h1>
          <p className="text-textSecondary">Tüm proje görevlerinizi takip edin ve yönetin</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateTask(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Yeni Görev</span>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-surface border border-border text-center">
          <div className="text-2xl font-bold text-white mb-1">{taskStats.total}</div>
          <div className="text-textSecondary text-sm">Toplam</div>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border text-center">
          <div className="text-2xl font-bold text-textSecondary mb-1">{taskStats.todo}</div>
          <div className="text-textSecondary text-sm">Yapılacak</div>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border text-center">
          <div className="text-2xl font-bold text-secondary mb-1">{taskStats.inProgress}</div>
          <div className="text-textSecondary text-sm">Devam Eden</div>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border text-center">
          <div className="text-2xl font-bold text-warning mb-1">{taskStats.review}</div>
          <div className="text-textSecondary text-sm">İnceleme</div>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border text-center">
          <div className="text-2xl font-bold text-success mb-1">{taskStats.done}</div>
          <div className="text-textSecondary text-sm">Tamamlanan</div>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border text-center">
          <div className="text-2xl font-bold text-error mb-1">{taskStats.overdue}</div>
          <div className="text-textSecondary text-sm">Gecikmiş</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-8 flex-wrap gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
          <input
            type="text"
            placeholder="Görev ara..."
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
          <option value="todo">Yapılacak</option>
          <option value="in-progress">Devam Eden</option>
          <option value="review">İnceleme</option>
          <option value="done">Tamamlanan</option>
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-3 bg-surface border border-border rounded-xl text-white focus:border-primary focus:outline-none"
        >
          <option value="all">Tüm Türler</option>
          <option value="design">Tasarım</option>
          <option value="copy">Metin</option>
          <option value="content-creation">İçerik Üretimi</option>
          <option value="review">İnceleme</option>
          <option value="publishing">Yayınlama</option>
        </select>
        
        <button className="p-3 bg-surface border border-border rounded-xl hover:border-primary/50 transition-all">
          <Filter className="w-5 h-5 text-textSecondary" />
        </button>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredTasks.map((task) => {
            const assignedUser = getAssignedUser(task.assignedTo)
            const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done'
            
            return (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.01 }}
                className={`p-6 rounded-2xl bg-surface border transition-all ${
                  task.status === 'done' 
                    ? 'border-success/30 bg-success/5' 
                    : isOverdue
                    ? 'border-error/30 bg-error/5'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <button 
                      onClick={() => updateTask(task.id, { 
                        status: task.status === 'done' ? 'todo' : 'done' 
                      })}
                      className="mt-1"
                    >
                      {task.status === 'done' ? (
                        <CheckCircle2 className="w-6 h-6 text-success" />
                      ) : (
                        <Circle className="w-6 h-6 text-textSecondary hover:text-primary transition-colors" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`text-lg font-semibold ${
                          task.status === 'done' ? 'text-textSecondary line-through' : 'text-white'
                        }`}>
                          {task.title}
                        </h3>
                        
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(task.type)}
                        </div>

                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority === 'urgent' ? 'Acil' :
                           task.priority === 'high' ? 'Yüksek' :
                           task.priority === 'medium' ? 'Orta' : 'Düşük'}
                        </span>

                        {isOverdue && (
                          <span className="px-2 py-1 bg-error/20 text-error rounded-lg text-xs font-medium">
                            Gecikmiş
                          </span>
                        )}
                      </div>

                      <p className={`mb-4 ${
                        task.status === 'done' ? 'text-textSecondary' : 'text-textSecondary'
                      }`}>
                        {task.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm">
                          <span className="text-textSecondary">{getCampaignName(task.campaignId)}</span>
                          <span className="text-textSecondary">{getClientName(task.campaignId)}</span>
                          
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-textSecondary" />
                            <span className="text-textSecondary">
                              {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                            </span>
                          </div>

                          {assignedUser && (
                            <div className="flex items-center space-x-2">
                              <User classNameclassName="w-4 h-4 text-textSecondary" />
                              <img
                                src={assignedUser.avatar}
                                alt={assignedUser.name}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              <span className="text-white">{assignedUser.name}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          {task.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg flex items-center space-x-1"
                            >
                              <Tag className="w-3 h-3" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(task.status)}`}>
                      {task.status === 'done' ? 'Tamamlandı' : 
                       task.status === 'in-progress' ? 'Devam Ediyor' :
                       task.status === 'review' ? 'İnceleme' : 'Yapılacak'}
                    </span>
                    
                    <button className="p-2 hover:bg-background/50 rounded-lg transition-all">
                      <MoreHorizontal className="w-4 h-4 text-textSecondary" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <CheckCircle2 className="w-16 h-16 text-textSecondary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Görev bulunamadı</h3>
          <p className="text-textSecondary mb-6">Arama kriterlerinizi değiştirin veya yeni bir görev oluşturun</p>
          <button 
            onClick={() => setShowCreateTask(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all"
          >
            İlk Görevinizi Oluşturun
          </button>
        </motion.div>
      )}

      {/* Create Task Modal */}
      <AnimatePresence>
        {showCreateTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowCreateTask(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-border rounded-2xl p-6 w-full max-w-2xl"
            >
              <h2 className="text-xl font-bold text-white mb-6">Yeni Görev Oluştur</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-textSecondary mb-2">Görev Başlığı</label>
                  <input
                    type="text"
                    placeholder="Görev başlığını girin..."
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-textSecondary mb-2">Açıklama</label>
                  <textarea
                    placeholder="Görev detaylarını açıklayın..."
                    rows={3}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Kampanya</label>
                  <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none">
                    <option value="">Kampanya seçin...</option>
                    {campaigns.map((campaign) => (
                      <option key={campaign.id} value={campaign.id}>{campaign.title}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Atanan Kişi</label>
                  <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none">
                    <option value="">Kişi seçin...</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Görev Türü</label>
                  <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none">
                    <option value="design">Tasarım</option>
                    <option value="copy">Metin Yazımı</option>
                    <option value="content-creation">İçerik Üretimi</option>
                    <option value="review">İnceleme</option>
                    <option value="publishing">Yayınlama</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Öncelik</label>
                  <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none">
                    <option value="low">Düşük</option>
                    <option value="medium">Orta</option>
                    <option value="high">Yüksek</option>
                    <option value="urgent">Acil</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Son Tarih</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Etiketler</label>
                  <input
                    type="text"
                    placeholder="design, urgent, instagram (virgülle ayırın)"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateTask(false)}
                  className="flex-1 px-4 py-3 border border-border rounded-xl text-textSecondary hover:text-white hover:bg-background/50 transition-all"
                >
                  İptal
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all">
                  Görev Oluştur
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
