import Cardapio from "../components/Cardapio";
import { hamburgueres } from "../data/produto";

export default function Hamburguer() {
  return <Cardapio items={hamburgueres} />;
}