import { useState, useCallback, useMemo, useEffect } from 'react'
import { useMediaQuery, useTheme } from '@mui/material'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
import type { Page, ViewMode } from './components/Header/Header'
import Login from './components/Login/Login'
import CreateAccount from './components/CreateAccount/CreateAccount'
import Dashboard from './components/Dashboard/Dashboard'
import Home from './Home/Home'
import MobileViewport from './components/commonfiles/MobileViewport'

const FormsPlaceholder = () => (
  <section 
    aria-label="Forms Placeholder"
    className="flex items-center justify-center h-full bg-[#f5f6f8]"
  >
    <div className="text-center space-y-3">
      <p 
        aria-hidden="true" 
        className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9199a8]"
      >
        Current Page
      </p>
      <h1 className="text-4xl font-extrabold text-[#6B21A8] capitalize tracking-tight">
        Forms
      </h1>
    </div>
  </section>
)

const NotFound = () => (
  <section 
    className="flex items-center justify-center h-full bg-[#f5f6f8]"
  >
    <div className="text-center space-y-3">
      <h1 className="text-4xl font-extrabold text-[#6B21A8] tracking-tight">
        404
      </h1>
      <p className="text-[#9199a8]">Page Not Found</p>
    </div>
  </section>
)

export default function App() {
  const theme = useTheme()
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('lg'))
  const navigate = useNavigate()
  const location = useLocation()

  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const [isHoverEnabled, setIsHoverEnabled] = useState(true)

  const toggleHeader = useCallback(() => {
    setIsHeaderVisible(prev => {
      if (prev) {
        // If it was visible and we're toggling it off, disable hover
        setIsHoverEnabled(false);
      }
      return !prev;
    });
  }, []);

  const closeHeader = useCallback(() => {
    setIsHeaderVisible(false);
    setIsHoverEnabled(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle header with Ctrl+M or Cmd+M
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleHeader();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Parse routing
  const pathParts = location.pathname.split('/').filter(Boolean)
  const viewMode: ViewMode = pathParts[0] === 'mobile' ? 'mobile' : 'desktop'
  const activeRoute = pathParts[1] || 'login'

  const activePage = useMemo<Page>(() => {
    if (activeRoute.startsWith('create-account')) return 'createAccount'
    if (activeRoute.startsWith('dashboard')) return 'dashboard'
    if (activeRoute.startsWith('home')) return 'home'
    if (activeRoute.startsWith('forms')) return 'forms'
    return 'login'
  }, [activeRoute])

  const showViewControls = useMemo(() => {
    return ['login', 'createAccount', 'dashboard', 'home'].includes(activePage)
  }, [activePage])

  const handleNavigate = useCallback((page: Page) => {
    switch (page) {
      case 'login': navigate(`/${viewMode}/login`); break;
      case 'createAccount': navigate(`/${viewMode}/create-account`); break;
      case 'dashboard': navigate(`/${viewMode}/dashboard`); break;
      case 'home': navigate(`/${viewMode}/home`); break;
      case 'forms': navigate(`/${viewMode}/forms`); break;
    }
  }, [navigate, viewMode])

  const handleViewModeChange = useCallback((newMode: ViewMode) => {
    navigate(`/${newMode}/${activeRoute}`)
  }, [navigate, activeRoute])

  const handleLogin = useCallback(() => navigate(`/${viewMode}/dashboard`), [navigate, viewMode])
  const handleCreateAccountClick = useCallback(() => navigate(`/${viewMode}/create-account`), [navigate, viewMode])
  const handleCreateAccount = useCallback(() => navigate(`/${viewMode}/dashboard`), [navigate, viewMode])
  const handleLoginClick = useCallback(() => navigate(`/${viewMode}/login`), [navigate, viewMode])

  const wrapWithViewport = (component: React.ReactNode) => {
    if (viewMode === 'mobile') {
      return (
        <MobileViewport isMobile={isMobileScreen}>
          {component}
        </MobileViewport>
      )
    }
    return component
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden font-['Outfit'] relative bg-[#f5f6f8]">
      
      {/* Invisible Hover Trigger for Header */}
      {isHoverEnabled && (
        <div 
          className="absolute top-0 left-0 right-0 h-4 z-[60]"
          onMouseEnter={() => setIsHeaderVisible(true)}
        />
      )}

      {/* Header Container */}
      <div 
        className={`absolute top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <Header
          activePage={activePage}
          onNavigate={handleNavigate}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          showViewControls={showViewControls}
          onClose={closeHeader}
        />
      </div>

      <main 
        id="main-content"
        aria-live="polite"
        className="flex-1 overflow-hidden relative focus-visible:outline-none @container"
        tabIndex={-1}
      >
        <div 
          key={location.pathname} 
          className="ys-page-enter h-full w-full motion-reduce:animate-none motion-reduce:transform-none motion-reduce:opacity-100"
        >
          <Routes>
            <Route path="/" element={<Navigate to="/desktop/home" replace />} />
            
            <Route path="/:viewMode/login" element={wrapWithViewport(<Login viewMode={viewMode} onLogin={handleLogin} onCreateAccountClick={handleCreateAccountClick} />)} />
            <Route path="/:viewMode/create-account" element={wrapWithViewport(<CreateAccount viewMode={viewMode} onCreateAccount={handleCreateAccount} onLoginClick={handleLoginClick} />)} />
            <Route path="/:viewMode/dashboard" element={wrapWithViewport(<Dashboard viewMode={viewMode} />)} />
            <Route path="/:viewMode/home" element={wrapWithViewport(<Home viewMode={viewMode} />)} />
            <Route path="/:viewMode/forms" element={wrapWithViewport(<FormsPlaceholder />)} />
            
            {/* Fallback for old routes without viewMode */}
            <Route path="/login" element={<Navigate to="/desktop/login" replace />} />
            <Route path="/create-account" element={<Navigate to="/desktop/create-account" replace />} />
            <Route path="/dashboard" element={<Navigate to="/desktop/dashboard" replace />} />
            <Route path="/home" element={<Navigate to="/desktop/home" replace />} />
            <Route path="/forms" element={<Navigate to="/desktop/forms" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>

    </div>
  )
}