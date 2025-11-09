import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings,
  Zap,
  PieChart,
  LogOut,
  Bell,
  MessageSquare,
  UserCheck,
  UsersRound,
  X,
  Check,
  AlertCircle,
  Info
} from 'lucide-react'
import { useStore } from '../store/useStore'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'campaigns', label: 'Kampanyalar', icon: Briefcase },
  { id: 'tasks', label: 'Görevler', icon: CheckSquare },
  { id: 'personal-tasks', label: 'Kişisel Görevler', icon: UserCheck },
  { id: 'clients', label: 'Müşteriler', icon: Users },
  { id: 'calendar', label: 'İçerik Takvimi', icon: Calendar },
  { id: 'analytics', label: 'Analitik', icon: BarChart3 },
  { id: 'automation', label: 'Otomasyon', icon: Zap },
  { id: 'messaging', label: 'Mesajlaşma', icon: MessageSquare },
  { id: 'teams', label: 'Ekipler', icon: UsersRound },
  { id: 'settings', label: 'Ayarlar', icon: Settings }
]

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { 
    currentView, 
    setCurrentView, 
    user, 
    notifications, 
    markNotificationAsRead, 
    clearAllNotifications,
    setUser 
  } = useStore()
  
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const unreadNotifications = notifications.filter(n => !n.read)

  const handleNotificationClick = (notification: any) => {
    markNotificationAsRead(notification.id)
    if (notification.actionUrl) {
      setCurrentView(notification.actionUrl)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="w-4 h-4 text-success" />
      case 'warning': return <AlertCircle className="w-4 h-4 text-warning" />
      case 'error': return <X className="w-4 h-4 text-error" />
      default: return <Info className="w-4 h-4 text-secondary" />
    }
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView('login')
  }

  const handleStatusChange = (newStatus: 'online' | 'away' | 'busy' | 'offline') => {
    if (user) {
      setUser({
        ...user,
        status: newStatus,
        lastActive: new Date().toISOString()
      })
    }
    setShowUserMenu(false)
  }

  const handleMenuItemClick = (itemId: string) => {
    setCurrentView(itemId)
    if (window.innerWidth < 1024) {
      onToggle() // Close sidebar on mobile after selection
    }
  }

  return (
    <>
      {/* Mobile Overlay - Only on mobile when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        ${window.innerWidth >= 1024 
          ? 'relative w-72 flex-shrink-0' // Desktop: Always visible
          : `fixed top-0 left-0 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}` // Mobile: Slide in/out
        }
        transition-transform duration-300 ease-in-out
      `}>
        <div className="w-72 min-h-screen bg-surface border-r border-border flex flex-col">
          {/* Close Button - Mobile Only */}
          <button
            onClick={onToggle}
            className="absolute top-4 right-4 p-2 rounded-lg bg-background/50 text-textSecondary hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo & Brand */}
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CreativeHub</h1>
                <p className="text-xs text-textSecondary">Social Media Suite</p>
              </div>
            </div>
          </div>

          {/* User Profile */}
          {user && (
            <div className="px-6 pb-6 relative">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-background/50">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-surface ${
                    user.status === 'online' ? 'bg-success' :
                    user.status === 'away' ? 'bg-warning' :
                    user.status === 'busy' ? 'bg-error' : 'bg-textSecondary'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="text-left w-full"
                  >
                    <p className="text-white font-medium text-sm truncate">{user.name}</p>
                    <p className="text-textSecondary text-xs capitalize">{user.role} • {user.status}</p>
                  </button>
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-1.5 hover:bg-background/50 rounded-lg transition-all relative"
                  >
                    <Bell className="w-4 h-4 text-textSecondary" />
                    {unreadNotifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
                        </span>
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* User Status Menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-6 right-6 mt-2 bg-surface border border-border rounded-xl p-4 shadow-lg z-50"
                  >
                    <div className="space-y-2">
                      <p className="text-textSecondary text-xs uppercase tracking-wide">Durum</p>
                      {[
                        { status: 'online', label: 'Çevrimiçi', color: 'bg-success' },
                        { status: 'away', label: 'Uzakta', color: 'bg-warning' },
                        { status: 'busy', label: 'Meşgul', color: 'bg-error' },
                        { status: 'offline', label: 'Çevrimdışı', color: 'bg-textSecondary' }
                      ].map(({ status, label, color }) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(status as any)}
                          className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-background/30 transition-all ${
                            user.status === status ? 'bg-primary/20' : ''
                          }`}
                        >
                          <div className={`w-3 h-3 rounded-full ${color}`}></div>
                          <span classNameclassName="text-white text-sm">{label}</span>
                          {user.status === status && <Check className="w-4 h-4 text-primary ml-auto" />}
                        </button>
                      ))}
                    </div>
                    
                    <div className="border-t border-border mt-3 pt-3">
                      <button
                        onClick={() => {
                          setCurrentView('settings')
                          setShowUserMenu(false)
                          if (window.innerWidth < 1024) onToggle()
                        }}
                        className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-background/30 transition-all"
                      >
                        <Settings className="w-4 h-4 text-textSecondary" />
                        <span className="text-white text-sm">Ayarlar</span>
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-error/20 text-error transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Çıkış Yap</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-6 mt-2 w-80 bg-surface border border-border rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto"
                  >
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-semibold">Bildirimler</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-textSecondary text-sm">
                            {unreadNotifications.length} okunmamış
                          </span>
                          {notifications.length > 0 && (
                            <button
                              onClick={clearAllNotifications}
                              className="text-primary hover:text-primary/80 text-sm"
                            >
                              Tümünü Temizle
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center">
                          <Bell className="w-8 h-8 text-textSecondary mx-auto mb-2" />
                          <p className="text-textSecondary">Henüz bildirim yok</p>
                        </div>
                      ) : (
                        notifications.slice(0, 10).map((notification) => (
                          <button
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className={`w-full p-4 border-b border-border/50 hover:bg-background/30 transition-all text-left ${
                              !notification.read ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1 min-w-0">
                                <p className={`font-medium text-sm ${notification.read ? 'text-textSecondary' : 'text-white'}`}>
                                  {notification.title}
                                </p>
                                <p className="text-textSecondary text-xs mt-1 truncate">
                                  {notification.message}
                                </p>
                                <p className="text-textSecondary text-xs mt-2">
                                  {new Date(notification.createdAt).toLocaleString('tr-TR')}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-3 overflow-y-auto">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = currentView === item.id
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleMenuItemClick(item.id)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white border border-primary/30'
                        : 'text-textSecondary hover:text-white hover:bg-background/30'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                    <span className="font-medium text-base">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="ml-auto w-2 h-2 bg-primary rounded-full"
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="p-6 border-t border-border">
            <motion.button
              whileHover={{ x: 4 }}
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-textSecondary hover:text-white hover:bg-background/30 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-base">Çıkış Yap</span>
            </motion.button>
          </div>
        </div>
      </div>
    </>
  )
}
