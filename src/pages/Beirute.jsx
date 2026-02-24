import CardItem from "../components/CardItem"

export default function Beirute() {
    const beirutes = [
  {nome: 'Beirute Tradicional', description: 'Pão sírio, presunto, queijo, alface, tomate e maionese.', preco: 'R$ 22,00', imagem:'/beirute.png'},
  {nome: 'Beirute de Frango', description: 'Frango grelhado, queijo, alface, tomate e molho especial.', preco: 'R$ 24,50', imagem:'/beirute.png'},
  {nome: 'Beirute de Carne', description: 'Filé bovino, queijo prato, cebola roxa e maionese temperada.', preco: 'R$ 26,90', imagem:'/beirute.png'},
  {nome: 'Beirute de Calabresa', description: 'Calabresa fatiada, queijo, tomate e orégano.', preco: 'R$ 23,50', imagem:'/beirute.png'},
  {nome: 'Beirute Vegetariano', description: 'Pão sírio, queijo branco, alface, tomate, cenoura e molho de iogurte.', preco: 'R$ 19,90', imagem:'/beirute.png'},
  {nome: 'Beirute de Atum', description: 'Atum temperado, queijo, alface e tomate.', preco: 'R$ 21,00', imagem:'/beirute.png'},
  {nome: 'Beirute de Bacon', description: 'Bacon crocante, queijo cheddar, alface e molho barbecue.', preco: 'R$ 25,00', imagem:'/beirute.png'},
  {nome: 'Beirute de Peito de Peru', description: 'Peito de peru defumado, queijo, alface e tomate.', preco: 'R$ 22,50', imagem:'/beirute.png'},
  {nome: 'Beirute de Filé de Peixe', description: 'Filé de peixe grelhado, queijo, alface e molho tártaro.', preco: 'R$ 24,90', imagem:'/beirute.png'}
]

return (
     <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Cardápio de Beirutes</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {beirutes.map((item, index) => (
         <CardItem key={index} item={item} />
        ))}
      </div>
    </div>
)

}