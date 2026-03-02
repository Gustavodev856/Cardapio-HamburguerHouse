import Cardapio from "../components/Cardapio";
import { bebidas } from "../data/produto"


export default function Bebidas() {
   return <Cardapio items={bebidas} />;
}