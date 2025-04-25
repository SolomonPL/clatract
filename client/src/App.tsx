import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import OfferClarityPage from './pages/OfferClarityPage'
import ContractPage from './pages/ContractPage'
import PricingPage from './pages/PricingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/offer-clarity" element={<OfferClarityPage />} />
            <Route path="/contract" element={<ContractPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/dashboard" element={<DashboardPage isAuthenticated={isAuthenticated} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
