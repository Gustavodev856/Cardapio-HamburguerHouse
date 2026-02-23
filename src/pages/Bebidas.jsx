import CardItem from "../components/CardItem"


export default function Bebidas() {
    const bebidas = [
  {nome: 'Refrigerante Lata', description: 'Coca-Cola, Guaraná, Fanta ou Sprite (350ml).', preco: 'R$ 6,00', imagem:'/public/refrigerante.png'},
  {nome: 'Refrigerante 350ml', description: 'Coca-Cola, (350ml).', preco: 'R$ 8,50', imagem:'/public/refrigerantes.png'},
  {nome: 'Suco Natural', description: 'Suco de laranja, abacaxi, acerola ou maracujá.', preco: 'R$ 9,00', imagem:'/public/suco.png'},
  {nome: 'Suco Detox', description: 'Suco verde com couve, limão, maçã e gengibre.', preco: 'R$ 10,50', imagem:'/public/sucodetox.png'},
  {nome: 'Água Mineral', description: 'Garrafa de água sem gás (500ml).', preco: 'R$ 4,00', imagem:'/public/agua.png'},
  {nome: 'Água com Gás', description: 'Garrafa de água com gás (500ml).', preco: 'R$ 4,50', imagem:'/public/aguagas.png'},
  {nome: 'Guaraná Natural', description: 'Guaraná da Amazônia batido com limão e gelo.', preco: 'R$ 7,50', imagem:'/public/guarana.png'},
  {nome: 'Cerveja Long Neck', description: 'Cerveja nacional ou importada (330ml).', preco: 'R$ 9,90', imagem:'/public/cerveja.png'},
  {nome: 'Caipirinha', description: 'Limão, açúcar, gelo e cachaça artesanal.', preco: 'R$ 12,00', imagem:'/public/caipirinha.png'},
  {nome: 'Drink da Casa', description: 'Mix de frutas tropicais com vodka ou rum.', preco: 'R$ 14,90', imagem:'/public/drink.png'}
    ]

    return (
     <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Cardápio de Bebidas</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {bebidas.map((item, index) => (
         <CardItem key={index} item={item} />
        ))}
      </div>
    </div>
)
}