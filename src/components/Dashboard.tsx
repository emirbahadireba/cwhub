import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  CheckCircle,
  Clock,
  AlertCircle,
  Target,
  Calendar,
  Eye,
  MessageSquare,
  Heart,
  Share2,
  Plus,
  ArrowRight,
  BarChart3
} from 'lucide-react'
import { useStore } from '../store/useStore'

export const Dashboard: React.FC = () => {
  const { 
    campaigns, 
    tasks, 
    clients, 
    user,
    setCurrentView,
    setModalType,
    setShowCreateModal,
    getCampaignStats,
    getTaskStats,
    getClientStats,
    getTeamPerformance
  } = useStore()

  const campaignStats = getCampaignStats()
  const taskStats = getTaskStats()
  const clientStats = getClientStats()
  const teamPerformance = getTeamPerformance()

  const stats = [
    {
      label: 'Aktif Kampanyalar',
      value: campaignStats.active,
      icon: Briefcase,
      color: 'from-primary to-purple-600',
      change: '+12%',
      onClick: () => setCurrentView('campaigns')
    },
    {
      label: 'Tamamlanan Görevler',
      value: taskStats.done,
      icon: CheckCircle,
      color: 'from-success to-emerald-600',
      change: '+8%',
      onClick: () => setCurrentView('tasks')
    },
    {
      label: 'Aktif Müşteriler',
      value: clientStats.active,
      icon: Users,
      color: 'from-secondary to-blue-600',
      change: '+15%',
      onClick: () => setCurrentView('clients')
    },
    {
      label: 'Bu Ay Engagement',
      value: '1.2M',
      icon: TrendingUp,
      color: 'from-accent to-pink-600',
      change: '+22%',
      onClick: () => setCurrentView('analytics')
    }
  ]

  const recentActivities = [
    {
      id: '1',
      action: 'Instagram post yayınlandı',
      client: 'TechnoMax',
      time: '2 saat önce',
      type: 'success',
      onClick: () => setCurrentView('campaigns')
    },
    {
      id: '2',
      action: 'Yeni kampanya onaylandı',
      client: 'Gourmet Kitchen',
      time: '4 saat önce',
      type: 'info',
      onClick: () => setCurrentView('campaigns')
    },
    {
      id: '3',
      action: 'Görev tamamlandı',
      client: 'EcoLife',
      time: '6 saat önce',
      type: 'success',
      onClick: () => setCurrentView('tasks')
    }
  ]

  const socialMetrics = [
    { platform: 'Instagram', followers: '125K', engagement: '4.2%', posts: 28, color: 'from-pink-500 to-purple-500' },
    { platform: 'Facebook', followers: '89K', engagement: '3.1%', posts: 22, color: 'from-blue-500 to-indigo-500' },
    { platform: 'Twitter', followers: '45K', engagement: '2.8%', posts: 35, color: 'from-sky-400 to-blue-500' },
    { platform: 'LinkedIn', followers: '32K', engagement: '5.1%', posts: 18, color: 'from-blue-600 to-blue-800' }
  ]

  const quickActions = [
    {
      label: 'Yeni Kampanya',
      icon: Briefcase,
      color: 'bg-primary',
      onClick: () => {
        setModalType('campaign')
        setShowCreateModal(true)
      }
    },
    {
      label: 'Görev Oluştur',
      icon: CheckCircle,
      color: 'bg-secondary',
      onClick: () => {
        setModalType('task')
        setShowCreateModal(true)
      }
    },
    {
      label: 'Müşteri Ekle',
      icon: Users,
      color: 'bg-accent',
      onClick: () => {
        setModalType('client')
        setShowCreateModal(true)
      }
    },
    {
      label: 'Otomasyon Kur',
      icon: Target,
      color: 'bg-success',
      onClick: () => {
        setModalType('automation')
        setShowCreateModal(true)
      }
    }
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent p-6 sm:p-8 text-white"
      >
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Hoş geldin, {user?.name}! 👋</h1>
          <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-4 sm:mb-6">
            Bu ay {campaignStats.active} aktif kampanya var ve {taskStats.done} görev tamamlandı
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setModalType('campaign')
                setShowCreateModal(true)
              }}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all text-sm sm:text-base"
            >
              Yeni Kampanya Başlat
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setCurrentView('analytics')}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-white/30 rounded-xl hover:bg-white/10 transition-all text-sm sm:text-base"
            >
              Rapor Görüntüle
            </motion.button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.onClick}
              className={`p-3 sm:p-4 rounded-xl ${action.color} text-white hover:shadow-lg transition-all`}
            >
              <Icon className="w-5 sm:w-6 h-5 sm:h-6 mb-2 mx-auto" />
              <span className="text-xs sm:text-sm font-medium">{action.label}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.button
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={stat.onClick}
              className="p-4 sm:p-6 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-success text-xs sm:text-sm font-medium">{stat.change}</span>
                  <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 text-textSecondary group-hover:text-primary transition-colors" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-textSecondary text-sm">{stat.label}</p>
            </motion.button>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 p-4 sm:p-6 rounded-2xl bg-surface border border-border"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white">Son Aktiviteler</h2>
            <button 
              onClick={() => setCurrentView('analytics')}
              className="text-primary hover:text-primary/80 flex items-center space-x-1 text-sm"
            >
              <span className="hidden sm:inline">Tümünü Gör</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {recentActivities.map((activity) => (
              <motion.button
                key={activity.id}
                onClick={activity.onClick}
                whileHover={{ x: 4 }}
                className="w-full flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl bg-background/50 hover:bg-background/70 transition-all text-left"
              >
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-success' : 'bg-secondary'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm sm:text-base">{activity.action}</p>
                  <p className="text-textSecondary text-xs sm:text-sm truncate">{activity.client} • {activity.time}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-textSecondary flex-shrink-0" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Team Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 sm:p-6 rounded-2xl bg-surface border border-border"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white">Ekip Performansı</h2>
            <button 
              onClick={() => setCurrentView('teams')}
              className="text-primary hover:text-primary/80"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {teamPerformance.slice(0, 4).map((member) => (
              <motion.button
                key={member.id}
                onClick={() => setCurrentView('teams')}
                whileHover={{ scale: 1.02 }}
                className="w-full flex items-center space-x-3 p-3 rounded-xl bg-background/30 hover:bg-background/50 transition-all"
              >
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 sm:w-10 h-8 sm:h-10 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-2 sm:w-3 h-2 sm:h-3 rounded-full border-2 border-surface ${
                    member.status === 'online' ? 'bg-success' :
                    member.status === 'away' ? 'bg-warning' :
                    member.status === 'busy' ? 'bg-error' : 'bg-textSecondary'
                  }`}></div>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-white font-medium text-sm truncate">{member.name}</p>
                  <p className="text-textSecondary text-xs">{member.completedTasks}/{member.totalTasks} görev</p>
                </div>
                <div className="text-right">
                  <p className="text-primary font-medium text-sm">{member.completionRate.toFixed(0)}%</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Platform Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 sm:p-6 rounded-2xl bg-surface border border-border"
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-white">Platform Performansı</h2>
          <button 
            onClick={() => setCurrentView('analytics')}
            className="text-primary hover:text-primary/80 flex items-center space-x-1"
          >
            <span className="hidden sm:inline text-sm">Detaylı Analiz</span>
            <BarChart3 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {socialMetrics.map((metric) => (
            <motion.button
              key={metric.platform}
              onClick={() => setCurrentView('analytics')}
              whileHover={{ y: -2 }}
              className="p-4 rounded-xl bg-background/30 hover:bg-background/50 transition-all text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium text-sm sm:text-base">{metric.platform}</h3>
                <ArrowRight className="w-4 h-4 text-textSecondary" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-textSecondary">Takipçi</span>
                  <span className="text-white font-medium">{metric.followers}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-textSecondary">Engagement</span>
                  <span className="text-success font-medium">{metric.engagement}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-textSecondary">Posts</span>
                  <span className="text-secondary font-medium">{metric.posts}</span>
                </div>
                
                <div className="w-full bg-background/50 rounded-full h-2 mt-3">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${metric.color}`}
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                  ></div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 sm:p-6 rounded-2xl bg-surface border border-border"
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-white">Yaklaşan Görevler</h2>
          <button 
            onClick={() => setCurrentView('tasks')}
            className="text-primary hover:text-primary/80 flex items-center space-x-1"
          >
            <span className="hidden sm:inline text-sm">Tümünü Gör</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.slice(0, 6).map((task) => (
            <motion.button
              key={task.id}
              onClick={() => setCurrentView('tasks')}
              whileHover={{ y: -2 }}
              className="p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-all text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  task.priority === 'urgent' ? 'bg-error/20 text-error' :
                  task.priority === 'high' ? 'bg-warning/20 text-warning' :
                  task.priority === 'medium' ? 'bg-secondary/20 text-secondary' :
                  'bg-success/20 text-success'
                }`}>
                  {task.priority === 'urgent' ? 'Acil' :
                   task.priority === 'high' ? 'Yüksek' :
                   task.priority === 'medium' ? 'Orta' : 'Düşük'}
                </span>
                <Clock className="w-4 h-4 text-textSecondary" />
              </div>
              <h3 className="text-white font-medium mb-2 text-sm sm:text-base line-clamp-1">{task.title}</h3>
              <p className="text-textSecondary text-xs sm:text-sm mb-3 line-clamp-2">{task.description}</p>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-textSecondary">{new Date(task.dueDate).toLocaleDateString('tr-TR')}</span>
                <span className={`px-2 py-1 rounded-lg ${
                  task.status === 'done' ? 'bg-success/20 text-success' :
                  task.status === 'in-progress' ? 'bg-secondary/20 text-secondary' :
                  task.status === 'review' ? 'bg-warning/20 text-warning' :
                  'bg-textSecondary/20 text-textSecondary'
                }`}>
                  {task.status === 'done' ? 'Tamamlandı' : 
                   task.status === 'in-progress' ? 'Devam ediyor' :
                   task.status === 'review' ? 'İnceleme' : 'Bekliyor'}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
