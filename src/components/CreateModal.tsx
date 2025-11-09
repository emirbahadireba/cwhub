import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, User, Tag, DollarSign, Target } from 'lucide-react'
import { useStore } from '../store/useStore'

export const CreateModal: React.FC = () => {
  const {
    showCreateModal,
    setShowCreateModal,
    modalType,
    setModalType,
    addCampaign,
    addTask,
    addClient,
    addAutomationRule,
    campaigns,
    clients,
    teamMembers
  } = useStore()

  const [formData, setFormData] = useState({
    // Campaign fields
    title: '',
    description: '',
    clientId: '',
    status: 'planning' as 'planning' | 'in-progress' | 'review' | 'completed',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    dueDate: '',
    budget: '',
    platforms: [] as string[],
    tags: '',
    assignedTo: [] as string[],
    
    // Task fields
    campaignId: '',
    type: 'content-creation' as 'content-creation' | 'design' | 'copy' | 'review' | 'publishing',
    assignedToSingle: '',
    
    // Client fields
    name: '',
    industry: '',
    website: '',
    address: '',
    socialChannels: [] as string[],
    clientStatus: 'potential' as 'active' | 'inactive' | 'potential',
    contactName: '',
    contactPosition: '',
    contactEmail: '',
    contactPhone: '',
    notes: '',
    
    // Automation fields
    automationName: '',
    automationDescription: '',
    triggerType: 'schedule' as 'schedule' | 'engagement' | 'mention' | 'hashtag' | 'follower_count',
    triggerCondition: '',
    actionType: 'post' as 'post' | 'reply' | 'dm' | 'report' | 'alert',
    actionDetails: '',
    automationPlatforms: [] as string[],
    automationStatus: 'draft' as 'active' | 'paused' | 'draft'
  })

  const platformOptions = ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube', 'Pinterest']
  const industryOptions = ['Teknoloji', 'Gastronomi', 'Moda', 'Sağlık', 'Sürdürülebilirlik', 'Sanat & Kültür', 'E-ticaret', 'Finans', 'Eğitim', 'Turizm']

  const handleClose = () => {
    setShowCreateModal(false)
    setModalType(null)
    setFormData({
      title: '',
      description: '',
      clientId: '',
      status: 'planning',
      priority: 'medium',
      dueDate: '',
      budget: '',
      platforms: [],
      tags: '',
      assignedTo: [],
      campaignId: '',
      type: 'content-creation',
      assignedToSingle: '',
      name: '',
      industry: '',
      website: '',
      address: '',
      socialChannels: [],
      clientStatus: 'potential',
      contactName: '',
      contactPosition: '',
      contactEmail: '',
      contactPhone: '',
      notes: '',
      automationName: '',
      automationDescription: '',
      triggerType: 'schedule',
      triggerCondition: '',
      actionType: 'post',
      actionDetails: '',
      automationPlatforms: [],
      automationStatus: 'draft'
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    switch (modalType) {
      case 'campaign':
        addCampaign({
          title: formData.title,
          description: formData.description,
          clientId: formData.clientId,
          status: formData.status,
          priority: formData.priority,
          dueDate: formData.dueDate,
          assignedTo: formData.assignedTo,
          progress: 0,
          budget: parseInt(formData.budget) || 0,
          platforms: formData.platforms,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          createdBy: '1'
        })
        break
        
      case 'task':
        addTask({
          campaignId: formData.campaignId,
          title: formData.title,
          description: formData.description,
          type: formData.type,
          status: 'todo',
          priority: formData.priority,
          assignedTo: formData.assignedToSingle,
          dueDate: formData.dueDate,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          createdBy: '1'
        })
        break
        
      case 'client':
        addClient({
          name: formData.name,
          logo: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop`,
          industry: formData.industry,
          website: formData.website,
          address: formData.address,
          socialChannels: formData.socialChannels,
          status: formData.clientStatus,
          campaigns: 0,
          totalBudget: 0,
          startDate: new Date().toISOString().split('T')[0],
          satisfaction: 0,
          contacts: formData.contactName ? [{
            name: formData.contactName,
            position: formData.contactPosition,
            email: formData.contactEmail,
            phone: formData.contactPhone,
            avatar: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`
          }] : [],
          notes: formData.notes
        })
        break
        
      case 'automation':
        addAutomationRule({
          name: formData.automationName,
          description: formData.automationDescription,
          trigger: {
            type: formData.triggerType,
            condition: formData.triggerCondition
          },
          action: {
            type: formData.actionType,
            details: formData.actionDetails
          },
          status: formData.automationStatus,
          platforms: formData.automationPlatforms
        })
        break
    }
    
    handleClose()
  }

  const togglePlatform = (platform: string, field: 'platforms' | 'socialChannels' | 'automationPlatforms') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(platform)
        ? prev[field].filter(p => p !== platform)
        : [...prev[field], platform]
    }))
  }

  const toggleAssignee = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(userId)
        ? prev.assignedTo.filter(id => id !== userId)
        : [...prev.assignedTo, userId]
    }))
  }

  const renderCampaignForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-textSecondary mb-2">Kampanya Başlığı</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Örnek: Yaz Koleksiyonu 2024"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
          required
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-textSecondary mb-2">Açıklama</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Kampanya detaylarını açıklayın..."
          rows={3}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Müşteri</label>
        <select 
          value={formData.clientId}
          onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
          required
        >
          <option value="">Müşteri seçin...</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Öncelik</label>
        <select 
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
        >
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
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Bütçe (₺)</label>
        <input
          type="number"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          placeholder="50000"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-textSecondary mb-2">Platformlar</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {platformOptions.map((platform) => (
            <label key={platform} className="flex items-center space-x-2 p-3 bg-background/30 rounded-xl cursor-pointer hover:bg-background/50 transition-all">
              <input 
                type="checkbox" 
                checked={formData.platforms.includes(platform)}
                onChange={() => togglePlatform(platform, 'platforms')}
                className="rounded text-primary" 
              />
              <span className="text-white text-sm">{platform}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-textSecondary mb-2">Ekip Üyeleri</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {teamMembers.map((member) => (
            <label key={member.id} className="flex items-center space-x-3 p-3 bg-background/30 rounded-xl cursor-pointer hover:bg-background/50 transition-all">
              <input 
                type="checkbox" 
                checked={formData.assignedTo.includes(member.id)}
                onChange={() => toggleAssignee(member.id)}
                className="rounded text-primary" 
              />
              <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <span className="text-white text-sm font-medium">{member.name}</span>
                <p className="text-textSecondary text-xs">{member.role}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-textSecondary mb-2">Etiketler</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="moda, yaz, koleksiyon (virgülle ayırın)"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
        />
      </div>
    </div>
  )

  const renderTaskForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-textSecondary mb-2">Görev Başlığı</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Örnek: Instagram story tasarımları"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
          required
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-textSecondary mb-2">Açıklama</label><textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Görev detaylarını açıklayın..."
          rows={3}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Kampanya</label>
        <select 
          value={formData.campaignId}
          onChange={(e) => setFormData({ ...formData, campaignId: e.target.value })}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
          required
        >
          <option value="">Kampanya seçin...</option>
          {campaigns.map((campaign) => (
            <option key={campaign.id} value={campaign.id}>{campaign.title}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Görev Türü</label>
        <select 
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
        >
          <option value="content-creation">İçerik Üretimi</option>
          <option value="design">Tasarım</option>
          <option value="copy">Metin Yazımı</option>
          <option value="review">İnceleme</option>
          <option value="publishing">Yayınlama</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Atanan Kişi</label>
        <select 
          value={formData.assignedToSingle}
          onChange={(e) => setFormData({ ...formData, assignedToSingle: e.target.value })}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
          required
        >
          <option value="">Kişi seçin...</option>
          {teamMembers.map((member) => (
            <option key={member.id} value={member.id}>{member.name} - {member.role}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Öncelik</label>
        <select 
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
        >
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
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
          required
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-textSecondary mb-2">Etiketler</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="design, urgent, instagram (virgülle ayırın)"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
        />
      </div>
    </div>
  )

  const renderClientForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-textSecondary mb-2">Şirket Adı</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Örnek: TechnoMax"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Sektör</label>
        <select 
          value={formData.industry}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
          required
        >
          <option value="">Sektör seçin...</option>
          {industryOptions.map((industry) => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Durum</label>
        <select 
          value={formData.clientStatus}
          onChange={(e) => setFormData({ ...formData, clientStatus: e.target.value as any })}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
        >
          <option value="potential">Potansiyel</option>
          <option value="active">Aktif</option>
          <option value="inactive">Pasif</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Website</label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          placeholder="www.ornek.com"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Adres</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="İstanbul, Türkiye"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-textSecondary mb-2">Sosyal Medya Kanalları</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {platformOptions.map((platform) => (
            <label key={platform} className="flex items-center space-x-2 p-3 bg-background/30 rounded-xl cursor-pointer hover:bg-background/50 transition-all">
              <input 
                type="checkbox" 
                checked={formData.socialChannels.includes(platform)}
                onChange={() => togglePlatform(platform, 'socialChannels')}
                className="rounded text-primary" 
              />
              <span className="text-white text-sm">{platform}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold text-white mb-4">İletişim Kişisi</h3>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Ad Soyad</label>
        <input
          type="text"
          value={formData.contactName}
          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
          placeholder="Ahmet Yılmaz"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Pozisyon</label>
        <input
          type="text"
          value={formData.contactPosition}
          onChange={(e) => setFormData({ ...formData, contactPosition: e.target.value })}
          placeholder="Pazarlama Müdürü"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">E-posta</label>
        <input
          type="email"
          value={formData.contactEmail}
          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          placeholder="ahmet@ornek.com"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Telefon</label>
        <input
          type="tel"
          value={formData.contactPhone}
          onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
          placeholder="+90 212 555 0000"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-textSecondary mb-2">Notlar</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Müşteri hakkında önemli notlar..."
          rows={3}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
        />
      </div>
    </div>
  )

  const renderAutomationForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-textSecondary mb-2">Kural Adı</label>
          <input
            type="text"
            value={formData.automationName}
            onChange={(e) => setFormData({ ...formData, automationName: e.target.value })}
            placeholder="Örnek: Haftalık Instagram Story"
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-textSecondary mb-2">Açıklama</label>
          <textarea
            value={formData.automationDescription}
            onChange={(e) => setFormData({ ...formData, automationDescription: e.target.value })}
            placeholder="Bu kuralın ne yaptığını açıklayın..."
            rows={3}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="p-4 bg-background/30 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Target className="w-5 h-5 text-secondary" />
          <span>Tetikleyici</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">Tetikleyici Türü</label>
            <select 
              value={formData.triggerType}
              onChange={(e) => setFormData({ ...formData, triggerType: e.target.value as any })}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
            >
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
              value={formData.triggerCondition}
              onChange={(e) => setFormData({ ...formData, triggerCondition: e.target.value })}
              placeholder="Örnek: Her pazartesi 09:00"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-background/30 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Target className="w-5 h-5 text-accent" />
          <span>Eylem</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">Eylem Türü</label>
            <select 
              value={formData.actionType}
              onChange={(e) => setFormData({ ...formData, actionType: e.target.value as any })}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
            >
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
              value={formData.actionDetails}
              onChange={(e) => setFormData({ ...formData, actionDetails: e.target.value })}
              placeholder="Örnek: Motivasyonel quote story"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-textSecondary mb-4">Platformlar</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {platformOptions.map((platform) => (
            <label key={platform} className="flex items-center space-x-2 p-3 bg-background/30 rounded-xl cursor-pointer hover:bg-background/50 transition-all">
              <input 
                type="checkbox" 
                checked={formData.automationPlatforms.includes(platform)}
                onChange={() => togglePlatform(platform, 'automationPlatforms')}
                className="rounded text-primary" 
              />
              <span className="text-white text-sm">{platform}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Durum</label>
        <select 
          value={formData.automationStatus}
          onChange={(e) => setFormData({ ...formData, automationStatus: e.target.value as any })}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
        >
          <option value="draft">Taslak</option>
          <option value="active">Aktif</option>
          <option value="paused">Duraklatılmış</option>
        </select>
      </div>
    </div>
  )

  const getModalTitle = () => {
    switch (modalType) {
      case 'campaign': return 'Yeni Kampanya Oluştur'
      case 'task': return 'Yeni Görev Oluştur'
      case 'client': return 'Yeni Müşteri Ekle'
      case 'automation': return 'Yeni Otomasyon Kuralı'
      default: return 'Yeni Oluştur'
    }
  }

  const getSubmitButtonText = () => {
    switch (modalType) {
      case 'campaign': return 'Kampanya Oluştur'
      case 'task': return 'Görev Oluştur'
      case 'client': return 'Müşteri Ekle'
      case 'automation': return 'Kural Oluştur'
      default: return 'Oluştur'
    }
  }

  const renderForm = () => {
    switch (modalType) {
      case 'campaign': return renderCampaignForm()
      case 'task': return renderTaskForm()
      case 'client': return renderClientForm()
      case 'automation': return renderAutomationForm()
      default: return null
    }
  }

  if (!showCreateModal || !modalType) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-surface border border-border rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">{getModalTitle()}</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-background/50 rounded-lg transition-all"
            >
              <X className="w-5 h-5 text-textSecondary" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {renderForm()}
            
            <div className="flex space-x-3 mt-8">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-3 border border-border rounded-xl text-textSecondary hover:text-white hover:bg-background/50 transition-all"
              >
                İptal
              </button>
              <button 
                type="submit"
                className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all"
              >
                {getSubmitButtonText()}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
