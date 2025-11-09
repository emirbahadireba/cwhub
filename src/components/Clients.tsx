import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Building2,
  Globe,
  Users,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Star,
  Briefcase,
  DollarSign,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube
} from 'lucide-react'
import { useStore } from '../store/useStore'

interface ClientContact {
  name: string
  position: string
  email: string
  phone: string
  avatar: string
}

interface ClientDetails {
  id: string
  name: string
  logo: string
  industry: string
  website: string
  address: string
  socialChannels: string[]
  status: 'active' | 'inactive' | 'potential'
  campaigns: number
  totalBudget: number
  startDate: string
  nextMeeting?: string
  contacts: ClientContact[]
  notes: string
  satisfaction: number
}

const detailedClients: ClientDetails[] = [
  {
    id: '1',
    name: 'TechnoMax',
    logo: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    industry: 'Teknoloji',
    website: 'www.technomax.com.tr',
    address: 'Levent, İstanbul',
    socialChannels: ['Instagram', 'LinkedIn', 'Twitter', 'YouTube'],
    status: 'active',
    campaigns: 5,
    totalBudget: 275000,
    startDate: '2024-01-15',
    nextMeeting: '2024-11-20',
    satisfaction: 4.8,
    contacts: [
      {
        name: 'Emre Özkan',
        position: 'Pazarlama Müdürü',
        email: 'emre.ozkan@technomax.com.tr',
        phone: '+90 212 555 0101',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      {
        name: 'Selin Yılmaz',
        position: 'Dijital Pazarlama Uzmanı',
        email: 'selin.yilmaz@technomax.com.tr',
        phone: '+90 212 555 0102',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    ],
    notes: 'Premium teknoloji markaları. B2B odaklı kampanyalar başarılı. LinkedIn performansı çok iyi.'
  },
  {
    id: '2',
    name: 'Gourmet Kitchen',
    logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    industry: 'Gastronomi',
    website: 'www.gourmetkitchen.com.tr',
    address: 'Nişantaşı, İstanbul',
    socialChannels: ['Instagram', 'Facebook', 'TikTok'],
    status: 'active',
    campaigns: 3,
    totalBudget: 150000,
    startDate: '2024-03-01',
    nextMeeting: '2024-11-15',
    satisfaction: 4.5,
    contacts: [
      {
        name: 'Chef Antonio Rossi',
        position: 'Genel Müdür',
        email: 'antonio@gourmetkitchen.com.tr',
        phone: '+90 212 555 0201',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    ],
    notes: 'Yüksek kaliteli gastronomi içerikleri. Görsel odaklı kampanyalar çok başarılı. Instagram engagement yüksek.'
  },
  {
    id: '3',
    name: 'EcoLife Organics',
    logo: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    industry: 'Sürdürülebilirlik',
    website: 'www.ecolife.com.tr',
    address: 'Kadıköy, İstanbul',
    socialChannels: ['Instagram', 'YouTube', 'LinkedIn'],
    status: 'active',
    campaigns: 2,
    totalBudget: 85000,
    startDate: '2024-05-15',
    nextMeeting: '2024-11-18',
    satisfaction: 4.9,
    contacts: [
      {
        name: 'Elif Demir',
        position: 'Sürdürülebilirlik Direktörü',
        email: 'elif.demir@ecolife.com.tr',
        phone: '+90 216 555 0301',
        avatar: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    ],
    notes: 'Çevre dostu ürünler. Değer odaklı içerik stratejisi. Genç demografikte güçlü.'
  },
  {
    id: '4',
    name: 'FashionHub',
    logo: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    industry: 'Moda',
    website: 'www.fashionhub.com.tr',
    address: 'Beyoğlu, İstanbul',
    socialChannels: ['Instagram', 'TikTok', 'Pinterest', 'YouTube'],
    status: 'active',
    campaigns: 8,
    totalBudget: 420000,
    startDate: '2023-09-01',
    nextMeeting: '2024-11-22',
    satisfaction: 4.6,
    contacts: [
      {
        name: 'Aylin Kara',
        position: 'Marka Müdürü',
        email: 'aylin.kara@fashionhub.com.tr',
        phone: '+90 212 555 0401',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      {
        name: 'Murat Özdemir',
        position: 'E-ticaret Müdürü',
        email: 'murat.ozdemir@fashionhub.com.tr',
        phone: '+90 212 555 0402',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    ],
    notes: 'Hızla büyüyen moda markası. Influencer işbirlikleri çok başarılı. Gen-Z hedef kitle.'
  },
  {
    id: '5',
    name: 'HealthPlus Clinic',
    logo: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    industry: 'Sağlık',
    website: 'www.healthplus.com.tr',
    address: 'Etiler, İstanbul',
    socialChannels: ['LinkedIn', 'Facebook', 'YouTube', 'Instagram'],
    status: 'active',
    campaigns: 3,
    totalBudget: 180000,
    startDate: '2024-02-01',
    satisfaction: 4.7,
    contacts: [
      {
        name: 'Dr. Mehmet Yılmaz',
        position: 'Genel Müdür',
        email: 'dr.mehmet@healthplus.com.tr',
        phone: '+90 212 555 0501',
        avatar: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    ],
    notes: 'Sağlık sektöründe güvenilir marka. Bilgilendirici içerikler odaklı strateji.'
  },
  {
    id: '6',
    name: 'ArtSpace Gallery',
    logo: 'https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    industry: 'Sanat & Kültür',
    website: 'www.artspace.com.tr',
    address: 'Beyoğlu, İstanbul',
    socialChannels: ['Instagram', 'Facebook', 'LinkedIn'],
    status: 'potential',
    campaigns: 0,
    totalBudget: 0,
    startDate: '2024-11-01',
    satisfaction: 0,
    contacts: [
      {
        name: 'Zeynep Arslan',
        position: 'Küratör',
        email: 'zeynep@artspace.com.tr',
        phone: '+90 212 555 0601',
        avatar: 'https://images.pexels.com/photos/1197132/pexels-photo-1197132.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    ],
    notes: 'Yeni potansiyel müşteri. Sanat ve kültür odaklı içerik stratejisi planlanan.'
  }
]

export const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterIndustry, setFilterIndustry] = useState('all')
  const [selectedClient, setSelectedClient] = useState<ClientDetails | null>(null)
  const [showCreateClient, setShowCreateClient] = useState(false)

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="w-4 h-4" />
      case 'facebook': return <Facebook className="w-4 h-4" />
      case 'twitter': return <Twitter className="w-4 h-4" />
      case 'linkedin': return <Linkedin className="w-4 h-4" />
      case 'youtube': return <Youtube className="w-4 h-4" />
      default: return <Globe className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/20 text-success border border-success/30'
      case 'inactive': return 'bg-error/20 text-error border border-error/30'
      case 'potential': return 'bg-warning/20 text-warning border border-warning/30'
      default: return 'bg-textSecondary/20 text-textSecondary border border-textSecondary/30'
    }
  }

  const filteredClients = detailedClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus
    const matchesIndustry = filterIndustry === 'all' || client.industry === filterIndustry
    return matchesSearch && matchesStatus && matchesIndustry
  })

  const clientStats = {
    total: detailedClients.length,
    active: detailedClients.filter(c => c.status === 'active').length,
    potential: detailedClients.filter(c => c.status === 'potential').length,
    totalBudget: detailedClients.reduce((sum, c) => sum + c.totalBudget, 0),
    avgSatisfaction: detailedClients.filter(c => c.satisfaction > 0).reduce((sum, c) => sum + c.satisfaction, 0) / detailedClients.filter(c => c.satisfaction > 0).length
  }

  return (
    <div className="p-8">
      {!selectedClient ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Müşteriler</h1>
              <p className="text-textSecondary">Müşteri portföyünüzü yönetin ve ilişkileri takip edin</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateClient(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Yeni Müşteri</span>
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-2">
                <Building2 className="w-6 h-6 text-primary" />
                <span className="text-textSecondary">Toplam Müşteri</span>
              </div>
              <span className="text-2xl font-bold text-white">{clientStats.total}</span>
            </div>
            
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-2">
                <Users className="w-6 h-6 text-success" />
                <span className="text-textSecondary">Aktif Müşteri</span>
              </div>
              <span className="text-2xl font-bold text-white">{clientStats.active}</span>
            </div>
            
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp className="w-6 h-6 text-warning" />
                <span className="text-textSecondary">Potansiyel</span>
              </div>
              <span className="text-2xl font-bold text-white">{clientStats.potential}</span>
            </div>
            
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-2">
                <DollarSign className="w-6 h-6 text-secondary" />
                <span className="text-textSecondary">Toplam Bütçe</span>
              </div>
              <span className="text-2xl font-bold text-white">₺{clientStats.totalBudget.toLocaleString()}</span>
            </div>
            
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-2">
                <Star className="w-6 h-6 text-accent" />
                <span className="text-textSecondary">Ort. Memnuniyet</span>
              </div>
              <span className="text-2xl font-bold text-white">{clientStats.avgSatisfaction.toFixed(1)}/5</span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 mb-8 flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
              <input
                type="text"
                placeholder="Müşteri ara..."
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
              <option value="inactive">Pasif</option>
              <option value="potential">Potansiyel</option>
            </select>

            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="px-4 py-3 bg-surface border border-border rounded-xl text-white focus:border-primary focus:outline-none"
            >
              <option value="all">Tüm Sektörler</option>
              <option value="Teknoloji">Teknoloji</option>
              <option value="Gastronomi">Gastronomi</option>
              <option value="Moda">Moda</option>
              <option value="Sağlık">Sağlık</option>
              <option value="Sürdürülebilirlik">Sürdürülebilirlik</option>
              <option value="Sanat & Kültür">Sanat & Kültür</option>
            </select>
            
            <button className="p-3 bg-surface border border-border rounded-xl hover:border-primary/50 transition-all">
              <Filter className="w-5 h-5 text-textSecondary" />
            </button>
          </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedClient(client)}
                  className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 cursor-pointer transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{client.name}</h3>
                        <p className="text-textSecondary text-sm">{client.industry}</p>
                      </div>
                    </div>
                    
                    <button className="p-2 hover:bg-background/50 rounded-lg transition-all">
                      <MoreHorizontal className="w-5 h-5 text-textSecondary" />
                    </button>
                  </div>

                  {/* Status & Satisfaction */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(client.status)}`}>
                      {client.status === 'active' ? 'Aktif' :
                       client.status === 'inactive'? 'Pasif' : 'Potansiyel'}
                    </span>
                    
                    {client.satisfaction > 0 && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-warning fill-current" />
                        <span className="text-white font-medium">{client.satisfaction}</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-white">{client.campaigns}</div>
                      <div className="text-xs text-textSecondary">Kampanya</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">₺{(client.totalBudget / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-textSecondary">Bütçe</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{client.socialChannels.length}</div>
                      <div className="text-xs text-textSecondary">Platform</div>
                    </div>
                  </div>

                  {/* Social Platforms */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      {client.socialChannels.slice(0, 4).map((platform) => (
                        <div
                          key={platform}
                          className="p-2 bg-background/50 rounded-lg"
                          title={platform}
                        >
                          {getSocialIcon(platform)}
                        </div>
                      ))}
                      {client.socialChannels.length > 4 && (
                        <div className="p-2 bg-background/50 rounded-lg text-textSecondary text-xs">
                          +{client.socialChannels.length - 4}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="text-sm text-textSecondary">
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span>{client.address}</span>
                    </div>
                    {client.nextMeeting && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Sonraki toplantı: {new Date(client.nextMeeting).toLocaleDateString('tr-TR')}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredClients.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Building2 className="w-16 h-16 text-textSecondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Müşteri bulunamadı</h3>
              <p className="text-textSecondary mb-6">Arama kriterlerinizi değiştirin veya yeni bir müşteri ekleyin</p>
              <button 
                onClick={() => setShowCreateClient(true)}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all"
              >
                İlk Müşterinizi Ekleyin
              </button>
            </motion.div>
          )}
        </>
      ) : (
        /* Client Detail View */
        <div className="space-y-8">
          {/* Client Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 hover:bg-surface rounded-lg transition-all text-textSecondary hover:text-white"
              >
                ← Geri
              </button>
              <img
                src={selectedClient.logo}
                alt={selectedClient.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">{selectedClient.name}</h1>
                <p className="text-textSecondary">{selectedClient.industry} • {selectedClient.address}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(selectedClient.status)}`}>
                    {selectedClient.status === 'active' ? 'Aktif Müşteri' :
                     selectedClient.status === 'inactive' ? 'Pasif Müşteri' : 'Potansiyel Müşteri'}
                  </span>
                  {selectedClient.satisfaction > 0 && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-warning fill-current" />
                      <span className="text-white font-medium">{selectedClient.satisfaction}/5 Memnuniyet</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <a
                href={`https://${selectedClient.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:border-primary/50 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="text-white">Website</span>
              </a>
              <button className="p-2 border border-border rounded-lg hover:border-primary/50 transition-all">
                <MoreHorizontal className="w-5 h-5 text-textSecondary" />
              </button>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <Briefcase className="w-6 h-6 text-primary" />
                <span className="text-textSecondary">Aktif Kampanyalar</span>
              </div>
              <span className="text-3xl font-bold text-white">{selectedClient.campaigns}</span>
            </div>
            
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <DollarSign className="w-6 h-6 text-success" />
                <span className="text-textSecondary">Toplam Bütçe</span>
              </div>
              <span className="text-3xl font-bold text-white">₺{selectedClient.totalBudget.toLocaleString()}</span>
            </div>
            
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <Calendar className="w-6 h-6 text-secondary" />
                <span className="text-textSecondary">İlişki Süresi</span>
              </div>
              <span className="text-3xl font-bold text-white">
                {Math.floor((new Date().getTime() - new Date(selectedClient.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} ay
              </span>
            </div>
            
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <Globe className="w-6 h-6 text-accent" />
                <span className="text-textSecondary">Sosyal Platformlar</span>
              </div>
              <span className="text-3xl font-bold text-white">{selectedClient.socialChannels.length}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl bg-surface border border-border">
                <h2 className="text-xl font-bold text-white mb-6">İletişim Bilgileri</h2>
                
                <div className="space-y-4">
                  {selectedClient.contacts.map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-background/30"
                    >
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{contact.name}</h3>
                        <p className="text-textSecondary text-sm">{contact.position}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4 text-textSecondary" />
                            <span className="text-textSecondary">{contact.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4 text-textSecondary" />
                            <span className="text-textSecondary">{contact.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media Presence */}
              <div className="p-6 rounded-2xl bg-surface border border-border">
                <h2 className="text-xl font-bold text-white mb-6">Sosyal Medya Kanalları</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedClient.socialChannels.map((platform) => (
                    <div
                      key={platform}
                      className="flex items-center space-x-3 p-4 rounded-xl bg-background/30"
                    >
                      {getSocialIcon(platform)}
                      <span className="text-white font-medium">{platform}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Next Meeting */}
              {selectedClient.nextMeeting && (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-white">Sonraki Toplantı</h3>
                  </div>
                  <p className="text-white text-xl font-semibold mb-2">
                    {new Date(selectedClient.nextMeeting).toLocaleDateString('tr-TR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-primary text-sm">
                    {Math.ceil((new Date(selectedClient.nextMeeting).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} gün sonra
                  </p>
                </div>
              )}

              {/* Client Notes */}
              <div className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="text-lg font-bold text-white mb-4">Müşteri Notları</h3>
                <p className="text-textSecondary leading-relaxed">{selectedClient.notes}</p>
              </div>

              {/* Quick Actions */}
              <div className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="text-lg font-bold text-white mb-4">Hızlı İşlemler</h3>
                
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-background/30 hover:bg-background/50 transition-all">
                    <Plus className="w-5 h-5 text-primary" />
                    <span className="text-white">Yeni Kampanya</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-background/30 hover:bg-background/50 transition-all">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span className="text-white">Toplantı Planla</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-background/30 hover:bg-background/50 transition-all">
                    <Mail className="w-5 h-5 text-accent" />
                    <span className="text-white">E-posta Gönder</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Client Modal */}
      <AnimatePresence>
        {showCreateClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowCreateClient(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-border rounded-2xl p-6 w-full max-w-2xl max-h-[90vh]overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-white mb-6">Yeni Müşteri Ekle</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-textSecondary mb-2">Şirket Adı</label>
                  <input
                    type="text"
                    placeholder="Örnek: TechnoMax"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Sektör</label>
                  <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none">
                    <option value="">Sektör seçin...</option>
                    <option value="Teknoloji">Teknoloji</option>
                    <option value="Gastronomi">Gastronomi</option>
                    <option value="Moda">Moda</option>
                    <option value="Sağlık">Sağlık</option>
                    <option value="Sürdürülebilirlik">Sürdürülebilirlik</option>
                    <option value="Sanat & Kültür">Sanat & Kültür</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Durum</label>
                  <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none">
                    <option value="potential">Potansiyel</option>
                    <option value="active">Aktif</option>
                    <option value="inactive">Pasif</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Website</label>
                  <input
                    type="url"
                    placeholder="www.ornek.com"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Adres</label>
                  <input
                    type="text"
                    placeholder="İstanbul, Türkiye"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-textSecondary mb-2">İletişim Kişisi</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Ad Soyad"
                      className="px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Pozisyon"
                      className="px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="E-posta"
                      className="px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Telefon"
                      className="px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-textSecondary mb-2">Sosyal Medya Kanalları</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube'].map((platform) => (
                      <label key={platform} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded text-primary" />
                        <span className="text-white text-sm">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-textSecondary mb-2">Notlar</label>
                  <textarea
                    placeholder="Müşteri hakkında önemli notlar..."
                    rows={3}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateClient(false)}
                  className="flex-1 px-4 py-3 border border-border rounded-xl text-textSecondary hover:text-white hover:bg-background/50 transition-all"
                >
                  İptal
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all">
                  Müşteri Ekle
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
