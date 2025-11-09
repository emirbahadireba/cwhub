import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Heart, 
  MessageSquare, 
  Share2, 
  Eye,
  Target,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'

interface MetricCard {
  title: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative'
  icon: React.ElementType
  color: string
}

export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('engagement')

  const metrics: MetricCard[] = [
    {
      title: 'Toplam Takipçi',
      value: '285.4K',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Engagement Rate',
      value: '4.2%',
      change: '+0.8%',
      changeType: 'positive',
      icon: Heart,
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Reach',
      value: '1.2M',
      change: '+22.1%',
      changeType: 'positive',
      icon: Eye,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Impressions',
      value: '2.8M',
      change: '-2.3%',
      changeType: 'negative',
      icon: Target,
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const platformData = [
    { platform: 'Instagram', followers: '125K', engagement: '4.8%', posts: 28, color: 'bg-gradient-to-r from-pink-500 to-purple-500' },
    { platform: 'LinkedIn', followers: '89K', engagement: '5.2%', posts: 22, color: 'bg-gradient-to-r from-blue-600 to-blue-700' },
    { platform: 'Facebook', followers: '45K', engagement: '3.1%', posts: 35, color: 'bg-gradient-to-r from-blue-500 to-indigo-500' },
    { platform: 'Twitter', followers: '26K', engagement: '2.8%', posts: 18, color: 'bg-gradient-to-r from-sky-400 to-blue-500' }
  ]

  const topPosts = [
    {
      id: 1,
      platform: 'Instagram',
      title: 'Yeni ürün lansmanı',
      date: '2024-11-10',
      engagement: { likes: 2840, comments: 156, shares: 89 },
      reach: 45600
    },
    {
      id: 2,
      platform: 'LinkedIn',
      title: 'Sektör analizi raporu',
      date: '2024-11-08',
      engagement: { likes: 892, comments: 67, shares: 234 },
      reach: 28400
    },
    {
      id: 3,
      platform: 'Facebook',
      title: 'Müşteri başarı hikayesi',
      date: '2024-11-05',
      engagement: { likes: 1456, comments: 89, shares: 123 },
      reach: 32100
    }
  ]

  const demographicsData = [
    { age: '18-24', percentage: 23, color: 'bg-primary' },
    { age: '25-34', percentage: 34, color: 'bg-secondary' },
    { age: '35-44', percentage: 28, color: 'bg-accent' },
    { age: '45-54', percentage: 12, color: 'bg-success' },
    { age: '55+', percentage: 3, color: 'bg-warning' }
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analitik Dashboard</h1>
          <p className="text-textSecondary">Sosyal medya performansınızı detaylı analiz edin</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-surface border border-border rounded-xl text-white focus:border-primary focus:outline-none"
          >
            <option value="7d">Son 7 Gün</option>
            <option value="30d">Son 30 Gün</option>
            <option value="90d">Son 3 Ay</option>
            <option value="365d">Son 1 Yıl</option>
          </select>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 px-4 py-2 bg-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Rapor İndir</span>
          </motion.button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.changeType === 'positive' ? 'text-success' : 'text-error'
                }`}>
                  {metric.changeType === 'positive' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
              <p className="text-textSecondary">{metric.title}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Platform Performance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Engagement Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-surface border border-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Engagement Trendi</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedMetric('engagement')}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    selectedMetric === 'engagement' 
                      ? 'bg-primary text-white' 
                      : 'text-textSecondary hover:text-white'
                  }`}
                >
                  Engagement
                </button>
                <button
                  onClick={() => setSelectedMetric('reach')}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    selectedMetric === 'reach' 
                      ? 'bg-primary text-white' 
                      : 'text-textSecondary hover:text-white'
                  }`}
                >
                  Reach
                </button>
                <button
                  onClick={() => setSelectedMetric('impressions')}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    selectedMetric === 'impressions' 
                      ? 'bg-primary text-white' 
                      : 'text-textSecondary hover:text-white'
                  }`}
                >
                  Impressions
                </button>
              </div>
            </div>
            
            {/* Simulated Chart */}
            <div className="relative h-64 bg-background/30 rounded-xl p-4 flex items-end space-x-2">
              {Array.from({ length: 30 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.random() * 80 + 20}%` }}
                  transition={{ delay: i * 0.02 }}
                  className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t opacity-70"
                />
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4 text-sm text-textSecondary">
              <span>1 Kas</span>
              <span>15 Kas</span>
              <span>30 Kas</span>
            </div>
          </motion.div>

          {/* Platform Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-surface border border-border"
          >
            <h2 className="text-xl font-bold text-white mb-6">Platform Performansı</h2>
            
            <div className="space-y-4">
              {platformData.map((platform, index) => (
                <motion.div
                  key={platform.platform}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-background/30 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">{platform.platform}</h3>
                    <span className="text-textSecondary text-sm">{platform.followers}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{platform.engagement}</div>
                      <div className="text-xs text-textSecondary">Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{platform.posts}</div>
                      <div className="text-xs text-textSecondary">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-success">+{Math.floor(Math.random() * 20 + 5)}%</div>
                      <div className="text-xs text-textSecondary">Büyüme</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-background/50 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.random() * 40 + 60}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-2 rounded-full ${platform.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Top Posts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-surface border border-border"
          >
            <h2 className="text-xl font-bold text-white mb-6">En İyi Performans</h2>
            
            <div className="space-y-4">
              {topPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-background/30 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary font-medium">{post.platform}</span>
                    <span className="text-xs text-textSecondary">{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                  </div>
                  
                  <h3 className="text-white font-medium mb-3">{post.title}</h3>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Heart className="w-3 h-3 text-pink-400" />
                      </div>
                      <div className="text-xs text-white font-medium">{post.engagement.likes}</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <MessageSquare className="w-3 h-3 text-blue-400" />
                      </div>
                      <div className="text-xs text-white font-medium">{post.engagement.comments}</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Share2 className="w-3 h-3 text-green-400" />
                      </div>
                      <div className="text-xs text-white font-medium">{post.engagement.shares}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-center">
                    <div className="text-sm text-textSecondary">Reach</div>
                    <div className="text-lg font-bold text-white">{post.reach.toLocaleString()}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Demographics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-surface border border-border"
          >
            <h2 className="text-xl font-bold text-white mb-6">Yaş Dağılımı</h2>
            
            <div className="space-y-4">
              {demographicsData.map((demo, index) => (
                <div key={demo.age} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{demo.age}</span>
                    <span className="text-textSecondary text-sm">{demo.percentage}%</span>
                  </div>
                  <div className="w-full bg-background/30 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${demo.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-2 rounded-full ${demo.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-white">Akıllı İçgörüler</h2>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="text-success text-sm font-medium mb-1">📈 En İyi Saat</div>
                <div className="text-white text-xs">Saat 14:00-16:00 arası %34 daha fazla engagement</div>
              </div>
              
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="text-warning text-sm font-medium mb-1">💡 Öneri</div>
                <div className="text-white text-xs">Video içerikleri %45 daha iyi performans gösteriyor</div>
              </div>
              
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="text-secondary text-sm font-medium mb-1">🎯 Fırsat</div>
                <div className="text-white text-xs">LinkedIn'de B2B içerikler için büyük potansiyel</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
