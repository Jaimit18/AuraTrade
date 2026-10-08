import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

const Landing = lazy(() => import('./pages/Landing'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Experts = lazy(() => import('./pages/Experts'))
const ExpertDetail = lazy(() => import('./pages/ExpertDetail'))
const Booking = lazy(() => import('./pages/Booking'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Chat = lazy(() => import('./pages/Chat'))
const VideoCall = lazy(() => import('./pages/VideoCall'))
const Marketplace = lazy(() => import('./pages/Marketplace'))
const Profile = lazy(() => import('./pages/Profile'))
const Settings = lazy(() => import('./pages/Settings'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-4">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-faint">AuraTrade</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public marketing area */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/experts/:id/book" element={<Layout><Booking /></Layout>} />
          <Route path="/experts/:id" element={<Layout><ExpertDetail /></Layout>} />
          <Route path="/experts" element={<Layout><Experts /></Layout>} />
          <Route path="/" element={<Layout><Landing /></Layout>} />

          {/* Authenticated app area */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="experts" element={<Experts />} />
            <Route path="experts/:id" element={<ExpertDetail />} />
            <Route path="chat" element={<Chat />} />
            <Route path="call/:bookId" element={<VideoCall />} />
            <Route path="shop" element={<Marketplace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}