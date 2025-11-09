import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Plus, 
  Search, 
  Crown, 
  Star, 
  MoreHorizontal,
  UserPlus,
  Settings,
  Shield,
  Briefcase,
  Clock,
  Target,
  Award
} from 'lucide-react'
import { useStore } from '../store/useStore'

interface Team {
  id: string
  name: string
  description: string
  avatar: string
  members: TeamMember[]
  projects: string[]
  createdAt: string
  stats: {
    completedTasks: number
    activeProjects: number
    successRate: number
  }
}

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  position: 'leader' | 'member'
  skills: string[]
  joinedAt: string
}

const sampleTeams: Team[] = [
  {
    id: '1',
    name: 'Tasarım Ekibi',
    description: 'Kreatif tasarım ve görsel içerik üretim ekibi',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    projects: ['1', '3'],
    createdAt: '2024-01-15',
    stats: {
      completedTasks: 89,
      activeProjects: 4,
      successRate: 94
    },
    members: [
      {
        id: '2',
        name: 'Zeynep Kaya',
        email: 'zeynep@creativehub.com',
        role: 'Senior Designer',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        position: 'leader',
        skills: ['UI/UX', 'Branding', 'Motion Graphics'],
        joinedAt: '2024-01-15'
      },
      {
        id: '4',
        name: 'Ayşe Özkan',
        email: 'ayse@creativehub.com',
        role: 'Visual Designer',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        position: 'member',
        skills: ['Illustration', 'Social Media', 'Print Design'],
        joinedAt: '2024-01-20'
      }
    ]
  },
  {
    id: '2',
    name: 'İçerik Ekibi',
    description: 'Copywriting ve içerik stratejisi ekibi',
    avatar: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    projects: ['1', '2'],
    createdAt: '2024-01-10',
    stats: {
      completedTasks: 156,
      activeProjects: 3,
      successRate: 91
    },
    members: [
      {
        id: '3',
        name: 'Mehmet Demir',
        email: 'mehmet@creativehub.com',
        role: 'Senior Copywriter',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        position: 'leader',
        skills: ['Copywriting', 'Content Strategy', 'SEO'],
        joinedAt: '2024-01-10'
      },
      {
        id: '5',
        name: 'Can Yıldız',
        email: 'can@creativehub.com',
        role: 'Content Manager',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        position: 'member',
        skills: ['Social Media', 'Community Management', 'Analytics'],
        joinedAt: '2024-01-25'
      }
    ]
  },
  {
    id: '3',
    name: 'TechnoMax Projesi',
    description: 'TechnoMax kampanya özel proje ekibi',
    avatar: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    projects: ['1'],
    createdAt: '2024-10-01',
    stats: {
      completedTasks: 34,
      activeProjects: 1,
      successRate: 97
    },
    members: [
      {
        id: '1',
        name: 'Ahmet Yılmaz',
        email: 'ahmet@creativehub.com',
        role: 'Project Manager',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        position: 'leader',
        skills: ['Project Management', 'Strategy', 'Client Relations'],
        joinedAt: '2024-10-01'
      },
      {
        id: '2',
        name: 'Zeynep Kaya',
        email: 'zeynep@creativehub.com',
        role: 'Lead Designer',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        position: 'member',
        skills: ['Design', 'Branding'],
        joinedAt: '2024-10-01'
      },
      {
        id: '3',
        name: 'Mehmet Demir',
        email: 'mehmet@creativehub.com',
        role: 'Copywriter',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        position: 'member',
        skills: ['Copywriting', 'Strategy'],
        joinedAt: '2024-10-01'
      }
    ]
  }
]

export const Teams: React.FC = () => {
  const { campaigns } = useStore()
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateTeam, setShowCreateTeam] = useState(false)
  const [showAddMember, setShowAddMember] = useState(false)

  const filteredTeams = sampleTeams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCampaignName = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId)
    return campaign?.title || 'Bilinmeyen Proje'
  }

  return (
    <div className="p-8">
      {!selectedTeam ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Ekipler</h1>
              <p className="text-textSecondary">Takımlarınızı yönetin ve yeni ekipler oluşturun</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateTeam(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Yeni Ekip</span>
            </motion.button>
          </div>

          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search className="absoluteleft-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
            <input
              type="text"
              placeholder="Ekip ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
            />
          </div>

          {/* Teams Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedTeam(team)}
                className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 cursor-pointer transition-all"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={team.avatar}
                    alt={team.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{team.name}</h3>
                    <p className="text-textSecondary text-sm">{team.description}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-textSecondary">Üyeler</span>
                    <span className="text-white font-medium">{team.members.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-textSecondary">Aktif Projeler</span>
                    <span className="text-white font-medium">{team.stats.activeProjects}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-textSecondary">Başarı Oranı</span>
                    <span className="text-success font-medium">{team.stats.successRate}%</span>
                  </div>
                </div>

                {/* Member Avatars */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {team.members.slice(0, 4).map((member) => (
                      <img
                        key={member.id}
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full border-2 border-surface object-cover"
                      />
                    ))}
                    {team.members.length > 4 && (
                      <div className="w-8 h-8 rounded-full bg-textSecondary/20 border-2 border-surface flex items-center justify-center">
                        <span className="text-xs text-textSecondary">+{team.members.length - 4}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {team.projects.map((projectId) => (
                      <span
                        key={projectId}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg"
                      >
                        {getCampaignName(projectId)}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTeams.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-textSecondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Ekip bulunamadı</h3>
              <p className="text-textSecondary mb-6">Arama kriterlerinizi değiştirin veya yeni bir ekip oluşturun</p>
              <button 
                onClick={() => setShowCreateTeam(true)}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all"
              >
                İlk Ekibinizi Oluşturun
              </button>
            </div>
          )}
        </>
      ) : (
        /* Team Detail View */
        <div className="space-y-8">
          {/* Team Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedTeam(null)}
                className="p-2 hover:bg-surface rounded-lg transition-all"
              >
                ←
              </button>
              <img
                src={selectedTeam.avatar}
                alt={selectedTeam.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">{selectedTeam.name}</h1>
                <p className="text-textSecondary">{selectedTeam.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAddMember(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:border-primary/50 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span className="text-white">Üye Ekle</span>
              </button>
              <button className="p-2 border border-border rounded-lg hover:border-primary/50 transition-all">
                <Settings className="w-5 h-5 text-textSecondary" />
              </button>
            </div>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-surface border border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedTeam.members.length}</h3>
                  <p className="text-textSecondary text-sm">Ekip Üyesi</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-surface border border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Briefcase className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedTeam.stats.activeProjects}</h3>
                  <p className="text-textSecondary text-sm">Aktif Proje</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-surface border border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/20 rounded-lg">
                  <Target className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedTeam.stats.completedTasks}</h3>
                  <p className="text-textSecondary text-sm">Tamamlanan Görev</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-surface border border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedTeam.stats.successRate}%</h3>
                  <p className="text-textSecondary text-sm">Başarı Oranı</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h2 className="text-xl font-bold text-white mb-6">Ekip Üyeleri</h2>
            
            <div className="space-y-4">
              {selectedTeam.members.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-background/30 hover:bg-background/50 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {member.position === 'leader' && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-warning rounded-full flex items-center justify-center">
                          <Crown className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-white font-medium">{member.name}</h3>
                        {member.position === 'leader' && (
                          <span className="px-2 py-1 bg-warning/20 text-warning text-xs rounded-lg">
                            Ekip Lideri
                          </span>
                        )}
                      </div>
                      <p className="text-textSecondary text-sm">{member.role}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {member.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.skills.length > 3 && (
                          <span className="text-xs text-textSecondary">+{member.skills.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-textSecondary text-sm">
                      {new Date(member.joinedAt).toLocaleDateString('tr-TR')} tarihinde katıldı
                    </span>
                    <button className="p-2 hover:bg-background/50 rounded-lg transition-all">
                      <MoreHorizontal className="w-4 h-4 text-textSecondary" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Active Projects */}
          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h2 className="text-xl font-bold text-white mb-6">Aktif Projeler</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {selectedTeam.projects.map((projectId) => {
                const campaign = campaigns.find(c => c.id === projectId)
                if (!campaign) return null
                
                return (
                  <div
                    key={projectId}
                    className="p-4 rounded-xl bg-background/30 border border-border/50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-medium">{campaign.title}</h3>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        campaign.status === 'in-progress' ? 'bg-secondary/20 text-secondary' :
                        campaign.status === 'planning' ? 'bg-warning/20 text-warning' :
                        campaign.status === 'completed' ? 'bg-success/20 text-success' :
                        'bg-error/20 text-error'
                      }`}>
                        {campaign.status === 'in-progress' ? 'Devam Ediyor' :
                         campaign.status === 'planning' ? 'Planlanıyor' :
                         campaign.status === 'completed' ? 'Tamamlandı' : 'İnceleme'}
                      </span>
                    </div>
                    <p className="text-textSecondary text-sm mb-3">{campaign.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="w-full bg-background rounded-full h-2">
                        <div 
                          className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                      <span className="ml-3 text-white text-sm font-medium">{campaign.progress}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Create Team Modal */}
      <AnimatePresence>
        {showCreateTeam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowCreateTeam(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-border rounded-2xl p-6 w-full max-w-lg"
            >
              <h2 className="text-xl font-bold text-white mb-6">Yeni Ekip Oluştur</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Ekip Adı</label>
                  <input
                    type="text"
                    placeholder="Tasarım Ekibi"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Açıklama</label>
                  <textarea
                    placeholder="Bu ekibin görev ve sorumluluklarını açıklayın..."
                    rows={3}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Ekip Türü</label>
                  <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none">
                    <option value="department">Departman Ekibi</option>
                    <option value="project">Proje Ekibi</option>
                    <option value="cross-functional">Çapraz Fonksiyonel</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateTeam(false)}
                  className="flex-1 px-4 py-3 border border-border rounded-xl text-textSecondary hover:text-white hover:bg-background/50 transition-all"
                >
                  İptal
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all">
                  Ekip Oluştur
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Member Modal */}
      <AnimatePresence>
        {showAddMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowAddMember(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-border rounded-2xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-white mb-6">Ekibe Üye Ekle</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">E-posta Adresi</label>
                  <input
                    type="email"
                    placeholder="kullanici@example.com"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Rol</label>
                  <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none">
                    <option value="member">Ekip Üyesi</option>
                    <option value="leader">Ekip Lideri</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Pozisyon</label>
                  <input
                    type="text"
                    placeholder="Senior Designer, Copywriter, vb."
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddMember(false)}
                  className="flex-1 px-4 py-3 border border-border rounded-xl text-textSecondary hover:text-white hover:bg-background/50 transition-all"
                >
                  İptal
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all">
                  Davet Gönder
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
