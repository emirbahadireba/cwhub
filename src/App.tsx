import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from './store/useStore'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './components/Dashboard'
import { Campaigns } from './components/Campaigns'
import { Tasks } from './components/Tasks'
import { Clients } from './components/Clients'
import { ContentCalendar } from './components/ContentCalendar'
import { Analytics } from './components/Analytics'
import { Automation } from './components/Automation'
import { Messaging } from './components/Messaging'
import { Teams } from './components/Teams'
import { PersonalTasks } from './components/PersonalTasks'
import { CreateModal } from './components/CreateModal'

const renderCurrentView = (currentView: string) => {
  switch (currentView) {
    case 'dashboard': return <Dashboard />
    case 'campaigns': return <Campaigns />
    case 'tasks': return <Tasks />
    case 'clients': return <Clients />
    case 'calendar': return <ContentCalendar />
    case 'analytics': return <Analytics />
    case 'automation': return <Automation />
    case 'messaging': return <Messaging />
    case 'teams': return <Teams />
    case 'personal-tasks': return <PersonalTasks />
    case 'settings': return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Ayarlar</h1>
          <p className="text-textSecondary">Sistem ayarları ve konfigürasyon seçenekleri yakında eklenecek...</p>
        </div>
      </div>
    )
    default: return <Dashboard />
  }
}

function App() {
  const { currentView } = useStore()

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-screen overflow-y-auto"
          >
            {renderCurrentView(currentView)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Create Modal */}
      <CreateModal />

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}

export default App
