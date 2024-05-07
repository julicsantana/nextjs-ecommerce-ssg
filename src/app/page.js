import styles from "./page.module.css";
import { Categorias } from "./components/Categorias";
import { Produtos } from "./components/Produtos";
import { getCategorias } from "../lib/api";

export default async function Home() {
  const produtos = await fetchProdutosApi();
  const categorias = getCategorias();

  async function fetchProdutosApi() {
    const res = await fetch("http://localhost:3000/api/produtos");

    if (!res.ok) {
      throw new Error("Não foipossível obter os dados.");
    }

    const produtos = await res.json();
    return produtos;
  }

  return (
    <>
      <main className={styles.main}>
        <Categorias categorias={categorias} />
        <Produtos produtos={produtos} />
      </main>
    </>
  );
}
