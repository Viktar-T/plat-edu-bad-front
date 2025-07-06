import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts'
import { Loading, ErrorBoundary } from './components/common'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const FloorPlan = lazy(() => import('./pages/FloorPlan'))
const EquipmentDetail = lazy(() => import('./pages/EquipmentDetail'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const ChartsDemo = lazy(() => import('./pages/ChartsDemo'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Example navigation guard (placeholder)
const isAuthenticated = () => true // Replace with real auth logic

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ErrorBoundary>
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/floor-plan" element={<FloorPlan />} />
              <Route path="/equipment/:id" element={<EquipmentDetail />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/charts-demo" element={<ChartsDemo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </ErrorBoundary>
    </Router>
  )
}

export default App
