import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: 'admin' | 'manager' | 'designer' | 'copywriter'
  status: 'online' | 'away' | 'busy' | 'offline'
  lastActive: string
  permissions: string[]
}

interface Client {
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
  createdAt: string
}

interface ClientContact {
  name: string
  position: string
  email: string
  phone: string
  avatar: string
}

interface Campaign {
  id: string
  clientId: string
  title: string
  description: string
  status: 'planning' | 'in-progress' | 'review' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  dueDate: string
  assignedTo: string[]
  progress: number
  budget: number
  platforms: string[]
  tags: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
}

interface Task {
  id: string
  campaignId: string
  title: string
  description: string
  type: 'content-creation' | 'design' | 'copy' | 'review' | 'publishing'
  status: 'todo' | 'in-progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo: string
  dueDate: string
  tags: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
  timeSpent?: number
  comments: TaskComment[]
}

interface TaskComment {
  id: string
  text: string
  authorId: string
  createdAt: string
}

interface PersonalTask {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  dueDate: string
  tags: string[]
  createdAt: string
}

interface Message {
  id: string
  text: string
  senderId: string
  receiverId: string
  channelId?: string
  timestamp: string
  read: boolean
  type: 'direct' | 'channel'
}

interface Channel {
  id: string
  name: string
  description: string
  members: string[]
  createdAt: string
  lastMessage?: Message
}

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

interface ContentCalendarEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  type: 'post' | 'story' | 'reel' | 'video' | 'article'
  platform: string
  campaignId?: string
  clientId: string
  status: 'draft' | 'scheduled' | 'published'
  content: {
    text?: string
    images?: string[]
    hashtags?: string[]
  }
  assignedTo: string
}

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
  actionUrl?: string
}

interface Store {
  // Navigation
  currentView: string
  setCurrentView: (view: string) => void
  
  // User & Team
  user: User | null
  setUser: (user: User) => void
  teamMembers: User[]
  setTeamMembers: (members: User[]) => void
  
  // Data
  clients: Client[]
  campaigns: Campaign[]
  tasks: Task[]
  personalTasks: PersonalTask[]
  messages: Message[]
  channels: Channel[]
  automationRules: AutomationRule[]
  calendarEvents: ContentCalendarEvent[]
  notifications: Notification[]
  
  // UI States
  showCreateModal: boolean
  setShowCreateModal: (show: boolean) => void
  modalType: 'campaign' | 'task' | 'client' | 'automation' | 'event' | null
  setModalType: (type: 'campaign' | 'task' | 'client' | 'automation' | 'event' | null) => void
  
  // Actions
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void
  updateClient: (id: string, updates: Partial<Client>) => void
  deleteClient: (id: string) => void
  
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateCampaign: (id: string, updates: Partial<Campaign>) => void
  deleteCampaign: (id: string) => void
  
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  addTaskComment: (taskId: string, comment: Omit<TaskComment, 'id' | 'createdAt'>) => void
  
  addPersonalTask: (task: Omit<PersonalTask, 'id' | 'createdAt'>) => void
  updatePersonalTask: (id: string, updates: Partial<PersonalTask>) => void
  deletePersonalTask: (id: string) => void
  
  addAutomationRule: (rule: Omit<AutomationRule, 'id' | 'createdAt' | 'executions' | 'successRate'>) => void
  updateAutomationRule: (id: string, updates: Partial<AutomationRule>) => void
  deleteAutomationRule: (id: string) => void
  toggleAutomationRule: (id: string) => void
  
  addCalendarEvent: (event: Omit<ContentCalendarEvent, 'id'>) => void
  updateCalendarEvent: (id: string, updates: Partial<ContentCalendarEvent>) => void
  deleteCalendarEvent: (id: string) => void
  
  sendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  markMessageAsRead: (messageId: string) => void
  
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void
  markNotificationAsRead: (id: string) => void
  clearAllNotifications: () => void
  
  // Bulk Actions
  bulkUpdateTasks: (taskIds: string[], updates: Partial<Task>) => void
  bulkDeleteTasks: (taskIds: string[]) => void
  
  // Search & Filter
  searchTerm: string
  setSearchTerm: (term: string) => void
  
  // Analytics
  getClientStats: () => any
  getCampaignStats: () => any
  getTaskStats: () => any
  getTeamPerformance: () => any
}

export const useStore = create<Store>((set, get) => ({
  // Navigation
  currentView: 'dashboard',
  setCurrentView: (view) => set({ currentView: view }),
  
  // User & Team
  user: {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@creativehub.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    role: 'admin',
    status: 'online',
    lastActive: new Date().toISOString(),
    permissions: ['all']
  },
  setUser: (user) => set({ user }),
  
  teamMembers: [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@creativehub.com',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'admin',
      status: 'online',
      lastActive: new Date().toISOString(),
      permissions: ['all']
    },
    {
      id: '2',
      name: 'Zeynep Kaya',
      email: 'zeynep@creativehub.com',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'designer',
      status: 'online',
      lastActive: new Date(Date.now() - 30000).toISOString(),
      permissions: ['design', 'campaigns']
    },
    {
      id: '3',
      name: 'Mehmet Demir',
      email: 'mehmet@creativehub.com',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'copywriter',
      status: 'away',
      lastActive: new Date(Date.now() - 600000).toISOString(),
      permissions: ['copy', 'campaigns']
    },
    {
      id: '4',
      name: 'Ayşe Özkan',
      email: 'ayse@creativehub.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'manager',
      status: 'busy',
      lastActive: new Date(Date.now() - 1800000).toISOString(),
      permissions: ['campaigns', 'tasks', 'clients']
    },
    {
      id: '5',
      name: 'Can Yıldız',
      email: 'can@creativehub.com',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'designer',
      status: 'offline',
      lastActive: new Date(Date.now() - 3600000).toISOString(),
      permissions: ['design']
    }
  ],
  setTeamMembers: (members) => set({ teamMembers: members }),
  
  // Initial Data
  clients: [
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
        }
      ],
      notes: 'Premium teknoloji markaları. B2B odaklı kampanyalar başarılı.',
      createdAt: '2024-01-15'
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
      notes: 'Yüksek kaliteli gastronomi içerikleri.',
      createdAt: '2024-03-01'
    }
  ],
  
  campaigns: [
    {
      id: '1',
      clientId: '1',
      title: 'Yeni Ürün Lansmanı',
      description: 'TechnoMax\'in yeni akıllı telefon serisinin sosyal medya kampanyası',
      status: 'in-progress',priority: 'high',
      dueDate: '2024-12-15',
      assignedTo: ['1', '2'],
      progress: 65,
      budget: 50000,
      platforms: ['Instagram', 'LinkedIn', 'Twitter'],
      tags: ['product-launch', 'tech', 'b2c'],
      createdAt: '2024-01-15',
      updatedAt: new Date().toISOString(),
      createdBy: '1'
    }
  ],
  
  tasks: [
    {
      id: '1',
      campaignId: '1',
      title: 'Instagram story şablonları',
      description: 'Ürün lansmanı için 10 farklı story şablonu tasarla',
      type: 'design',
      status: 'in-progress',
      priority: 'high',
      assignedTo: '2',
      dueDate: '2024-11-15',
      tags: ['design', 'instagram', 'story'],
      createdAt: '2024-11-01',
      updatedAt: new Date().toISOString(),
      createdBy: '1',
      comments: []
    }
  ],
  
  personalTasks: [
    {
      id: '1',
      title: 'Haftalık performans raporu hazırla',
      description: 'Tüm kampanyaların haftalık performans raporunu Excel\'de hazırla',
      status: 'todo',
      priority: 'medium',
      dueDate: '2024-11-15',
      tags: ['reporting', 'analytics'],
      createdAt: new Date().toISOString()
    }
  ],
  
  messages: [],
  channels: [
    {
      id: '1',
      name: 'Genel',
      description: 'Tüm ekip için genel sohbet kanalı',
      members: ['1', '2', '3', '4', '5'],
      createdAt: '2024-01-01'
    }
  ],
  
  automationRules: [],
  calendarEvents: [],
  notifications: [
    {
      id: '1',
      title: 'Yeni görev atandı',
      message: 'Size yeni bir tasarım görevi atandı: Instagram story şablonları',
      type: 'info',
      read: false,
      createdAt: new Date().toISOString()
    }
  ],
  
  // UI States
  showCreateModal: false,
  setShowCreateModal: (show) => set({ showCreateModal: show }),
  modalType: null,
  setModalType: (type) => set({ modalType: type }),
  
  // Search
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  // Client Actions
  addClient: (clientData) => {
    const newClient = {
      ...clientData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    set((state) => ({
      clients: [...state.clients, newClient],
      notifications: [...state.notifications, {
        id: Date.now().toString(),
        title: 'Yeni müşteri eklendi',
        message: `${clientData.name} başarıyla eklendi`,
        type: 'success',
        read: false,
        createdAt: new Date().toISOString()
      }]
    }))
  },
  
  updateClient: (id, updates) => {
    set((state) => ({
      clients: state.clients.map(client => 
        client.id === id ? { ...client, ...updates } : client
      )
    }))
  },
  
  deleteClient: (id) => {
    set((state) => ({
      clients: state.clients.filter(client => client.id !== id),
      campaigns: state.campaigns.filter(campaign => campaign.clientId !== id),
      notifications: [...state.notifications, {
        id: Date.now().toString(),
        title: 'Müşteri silindi',
        message: 'Müşteri ve ilgili kampanyalar başarıyla silindi',
        type: 'warning',
        read: false,
        createdAt: new Date().toISOString()
      }]
    }))
  },
  
  // Campaign Actions
  addCampaign: (campaignData) => {
    const newCampaign = {
      ...campaignData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    set((state) => ({
      campaigns: [...state.campaigns, newCampaign],
      clients: state.clients.map(client =>
        client.id === campaignData.clientId
          ? { ...client, campaigns: client.campaigns + 1 }
          : client
      ),
      notifications: [...state.notifications, {
        id: Date.now().toString(),
        title: 'Yeni kampanya oluşturuldu',
        message: `${campaignData.title} kampanyası başarıyla oluşturuldu`,
        type: 'success',
        read: false,
        createdAt: new Date().toISOString()
      }]
    }))
  },
  
  updateCampaign: (id, updates) => {
    set((state) => ({
      campaigns: state.campaigns.map(campaign =>
        campaign.id === id 
          ? { ...campaign, ...updates, updatedAt: new Date().toISOString() }
          : campaign
      )
    }))
  },
  
  deleteCampaign: (id) => {
    set((state) => {
      const campaign = state.campaigns.find(c => c.id === id)
      return {
        campaigns: state.campaigns.filter(campaign => campaign.id !== id),
        tasks: state.tasks.filter(task => task.campaignId !== id),
        clients: campaign ? state.clients.map(client =>
          client.id === campaign.clientId
            ? { ...client, campaigns: Math.max(0, client.campaigns - 1) }
            : client
        ) : state.clients,
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          title: 'Kampanya silindi',
          message: 'Kampanya ve ilgili görevler başarıyla silindi',
          type: 'warning',
          read: false,
          createdAt: new Date().toISOString()
        }]
      }
    })
  },
  
  // Task Actions
  addTask: (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    }
    set((state) => ({
      tasks: [...state.tasks, newTask],
      notifications: [...state.notifications, {
        id: Date.now().toString(),
        title: 'Yeni görev oluşturuldu',
        message: `${taskData.title} görevi oluşturuldu ve ${state.teamMembers.find(m => m.id === taskData.assignedTo)?.name || 'atanan kişi'}ye atandı`,
        type: 'info',
        read: false,
        createdAt: new Date().toISOString()
      }]
    }))
  },
  
  updateTask: (id, updates) => {
    set((state) => {
      const task = state.tasks.find(t => t.id === id)
      const statusChanged = updates.status && task?.status !== updates.status
      
      return {
        tasks: state.tasks.map(task =>
          task.id === id 
            ? { ...task, ...updates, updatedAt: new Date().toISOString() }
            : task
        ),
        notifications: statusChanged ? [...state.notifications, {
          id: Date.now().toString(),
          title: 'Görev durumu güncellendi',
          message: `${task?.title} görevi "${updates.status === 'done' ? 'tamamlandı' : updates.status}" olarak işaretlendi`,
          type: 'success',
          read: false,
          createdAt: new Date().toISOString()
        }] : state.notifications
      }
    })
  },
  
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter(task => task.id !== id),
      notifications: [...state.notifications, {
        id: Date.now().toString(),
        title: 'Görev silindi',
        message: 'Görev başarıyla silindi',
        type: 'warning',
        read: false,
        createdAt: new Date().toISOString()
      }]
    }))
  },
  
  addTaskComment: (taskId, comment) => {
    const newComment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? { ...task, comments: [...task.comments, newComment], updatedAt: new Date().toISOString() }
          : task
      )
    }))
  },
  
  // Personal Task Actions
  addPersonalTask: (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    set((state) => ({
      personalTasks: [...state.personalTasks, newTask]
    }))
  },
  
  updatePersonalTask: (id, updates) => {
    set((state) => ({
      personalTasks: state.personalTasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    }))
  },
  
  deletePersonalTask: (id) => {
    set((state) => ({
      personalTasks: state.personalTasks.filter(task => task.id !== id)
    }))
  },
  
  // Automation Actions
  addAutomationRule: (ruleData) => {
    const newRule = {
      ...ruleData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      executions: 0,
      successRate: 0
    }
    set((state) => ({
      automationRules: [...state.automationRules, newRule],
      notifications: [...state.notifications, {
        id: Date.now().toString(),
        title: 'Yeni otomasyon kuralı oluşturuldu',
        message: `${ruleData.name} otomasyon kuralı oluşturuldu`,
        type: 'success',
        read: false,
        createdAt: new Date().toISOString()
      }]
    }))
  },
  
  updateAutomationRule: (id, updates) => {
    set((state) => ({
      automationRules: state.automationRules.map(rule =>
        rule.id === id ? { ...rule, ...updates } : rule
      )
    }))
  },
  
  deleteAutomationRule: (id) => {
    set((state) => ({
      automationRules: state.automationRules.filter(rule => rule.id !== id)
    }))
  },
  
  toggleAutomationRule: (id) => {
    set((state) => ({
      automationRules: state.automationRules.map(rule =>
        rule.id === id 
          ? { ...rule, status: rule.status === 'active' ? 'paused' : 'active' }
          : rule
      )
    }))
  },
  
  // Calendar Actions
  addCalendarEvent: (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now().toString()
    }
    set((state) => ({
      calendarEvents: [...state.calendarEvents, newEvent]
    }))
  },
  
  updateCalendarEvent: (id, updates) => {
    set((state) => ({
      calendarEvents: state.calendarEvents.map(event =>
        event.id === id ? { ...event, ...updates } : event
      )
    }))
  },
  
  deleteCalendarEvent: (id) => {
    set((state) => ({
      calendarEvents: state.calendarEvents.filter(event => event.id !== id)
    }))
  },
  
  // Message Actions
  sendMessage: (messageData) => {
    const newMessage = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    }
    set((state) => ({
      messages: [...state.messages, newMessage],
      channels: messageData.channelId 
        ? state.channels.map(channel =>
            channel.id === messageData.channelId
              ? { ...channel, lastMessage: newMessage }
              : channel
          )
        : state.channels
    }))
  },
  
  markMessageAsRead: (messageId) => {
    set((state) => ({
      messages: state.messages.map(message =>
        message.id === messageId ? { ...message, read: true } : message
      )
    }))
  },
  
  // Notification Actions
  addNotification: (notificationData) => {
    const newNotification = {
      ...notificationData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    set((state) => ({
      notifications: [newNotification, ...state.notifications]
    }))
  },
  
  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    }))
  },
  
  clearAllNotifications: () => {
    set({ notifications: [] })
  },
  
  // Bulk Actions
  bulkUpdateTasks: (taskIds, updates) => {
    set((state) => ({
      tasks: state.tasks.map(task =>
        taskIds.includes(task.id)
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    }))
  },
  
  bulkDeleteTasks: (taskIds) => {
    set((state) => ({
      tasks: state.tasks.filter(task => !taskIds.includes(task.id))
    }))
  },
  
  // Analytics
  getClientStats: () => {
    const state = get()
    return {
      total: state.clients.length,
      active: state.clients.filter(c => c.status === 'active').length,
      potential: state.clients.filter(c => c.status === 'potential').length,
      totalBudget: state.clients.reduce((sum, c) => sum + c.totalBudget, 0),
      avgSatisfaction: state.clients.filter(c => c.satisfaction > 0).reduce((sum, c) => sum + c.satisfaction, 0) / state.clients.filter(c => c.satisfaction > 0).length || 0
    }
  },
  
  getCampaignStats: () => {
    const state = get()
    return {
      total: state.campaigns.length,
      active: state.campaigns.filter(c => c.status === 'in-progress').length,
      completed: state.campaigns.filter(c => c.status === 'completed').length,
      planning: state.campaigns.filter(c => c.status === 'planning').length,
      totalBudget: state.campaigns.reduce((sum, c) => sum + c.budget, 0),
      avgProgress: state.campaigns.reduce((sum, c) => sum + c.progress, 0) / state.campaigns.length || 0
    }
  },
  
  getTaskStats: () => {
    const state = get()
    return {
      total: state.tasks.length,
      todo: state.tasks.filter(t => t.status === 'todo').length,
      inProgress: state.tasks.filter(t => t.status === 'in-progress').length,
      review: state.tasks.filter(t => t.status === 'review').length,
      done: state.tasks.filter(t => t.status === 'done').length,
      overdue: state.tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'done').length
    }
  },
  
  getTeamPerformance: () => {
    const state = get()
    return state.teamMembers.map(member => {
      const memberTasks = state.tasks.filter(t => t.assignedTo === member.id)
      const completedTasks = memberTasks.filter(t => t.status === 'done')
      return {
        id: member.id,
        name: member.name,
        avatar: member.avatar,
        role: member.role,
        status: member.status,
        totalTasks: memberTasks.length,
        completedTasks: completedTasks.length,
        completionRate: memberTasks.length > 0 ? (completedTasks.length / memberTasks.length) * 100 : 0,
        avgPriority: memberTasks.length > 0 ? memberTasks.reduce((sum, t) => {
          const priorityValue = { low: 1, medium: 2, high: 3, urgent: 4 }[t.priority]
          return sum + priorityValue
        }, 0) / memberTasks.length : 0
      }
    })
  }
}))
