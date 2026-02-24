import './App.css'
import Header from './components/Header'
import Hamburguer from './pages/Hamburguer'
import Beirute from './pages/Beirute'
import Bebidas from './pages/Bebidas'
import Carrinho from './pages/Carrinho'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'  // <--- aqui é o caminho certo
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Hamburguer" element={<Hamburguer />} />
          <Route path="/Beirute" element={<Beirute />} />
          <Route path="/Bebidas" element={<Bebidas />} />
          <Route path="/Carrinho" element={<Carrinho />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App