import Cardapio from "../pages/Cardapio";



export default function Bebidas() {
    const bebidas = [
  {nome: 'Refrigerante Lata', description: 'Coca-Cola, Guaraná, Fanta ou Sprite (350ml).', preco: 'R$ 6,00', imagem:'/refrigerante.png'},
  {nome: 'Refrigerante 350ml', description: 'Coca-Cola, (350ml).', preco: 'R$ 8,50', imagem:'/refrigerantes.png'},
  {nome: 'Suco Natural', description: 'Suco de laranja, abacaxi, acerola ou maracujá.', preco: 'R$ 9,00', imagem:'/suco.png'},
  {nome: 'Suco Detox', description: 'Suco verde com couve, limão, maçã e gengibre.', preco: 'R$ 10,50', imagem:'/sucodetox.png'},
  {nome: 'Água Mineral', description: 'Garrafa de água sem gás (500ml).', preco: 'R$ 4,00', imagem:'/agua.png'},
  {nome: 'Água com Gás', description: 'Garrafa de água com gás (500ml).', preco: 'R$ 4,50', imagem:'/aguagas.png'},
  {nome: 'Guaraná Natural', description: 'Guaraná da Amazônia batido com limão e gelo.', preco: 'R$ 7,50', imagem:'/guarana.png'},
  {nome: 'Cerveja Long Neck', description: 'Cerveja nacional ou importada (330ml).', preco: 'R$ 9,90', imagem:'/cerveja.png'},
  {nome: 'Caipirinha', description: 'Limão, açúcar, gelo e cachaça artesanal.', preco: 'R$ 12,00', imagem:'/caipirinha.png'},
  {nome: 'Drink da Casa', description: 'Mix de frutas tropicais com vodka ou rum.', preco: 'R$ 14,90', imagem:'/drink.png'}
    ]

   return <Cardapio items={bebidas} />;
}