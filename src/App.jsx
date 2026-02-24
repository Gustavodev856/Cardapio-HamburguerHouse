import './App.css'
import Header from './components/Header'
import Hamburguer from './pages/Hamburguer'
import Beirute from './pages/Beirute'
import Bebidas from './pages/Bebidas'
import Carrinho from './pages/Carrinho'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'  // <--- aqui é o caminho certo


function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Hamburguer />} />
          <Route path="/beirute" element={<Beirute />} />
          <Route path="/bebidas" element={<Bebidas />} />
          <Route path="/carrinho" element={<Carrinho />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App