// src/pages/Hamburguer.jsx
import Cardapio from "../pages/Cardapio";


export default function Hamburguer() {
  const hamburgueres = [
    {nome: 'Cheeseburger', description: 'Carne suculenta, queijo, bacon crocante e vegetais frescos.', preco: 'R$ 20,00', imagem:'/hamburguer.png'},
    {nome: 'Mushroom Swiss Burguer', description: 'Hambúrguer com cogumelos salteados e queijo suíço.', preco: 'R$ 27,50', imagem:'/hamburguer.png'},
    {nome: 'Barbecue Burguer', description: 'Carne com molho barbecue, cebola crocante e queijo.', preco: 'R$ 20,99', imagem:'/hamburguer.png'},
    {nome: 'Blue CheeseBurguer', description: 'Hambúrguer com queijo azul, cebola roxa e alface.', preco: 'R$ 19,29', imagem:'/hamburguer.png'},
    {nome: 'Double CheeseBurguer', description: 'Duplo hambúrguer com duas camadas de carne e queijo.', preco: 'R$ 16,80', imagem:'/hamburguer.png'},
    {nome: 'Spicy Burguer', description: 'Carne com jalapeños, queijo pepper jack e toque picante.', preco: 'R$ 35,90', imagem:'/hamburguer.png'},
    {nome: 'Veggie Burguer', description: 'Hambúrguer vegetariano com legumes, tomate e cebola roxa.', preco: 'R$ 10,00', imagem:'/hamburguer.png'},
    {nome: 'Chicken Burguer', description: 'Filé de frango empanado, alface e tomate', preco: 'R$ 15,99', imagem:'/hamburguer.png'},
    {nome: 'Fish Burguer', description: 'Filé de peixe crocante com molho tártaro e alface.', preco: 'R$ 14,95', imagem:'/hamburguer.png'},
  ];

  return <Cardapio items={hamburgueres} />;
}