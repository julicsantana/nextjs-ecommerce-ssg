import styles from "./page.module.css";
import Produto from "@/app/components/Produto";

async function fetchProdutoBySlug(slug) {
  const res = await fetch(
    `https://api.npoint.io/559ae4cec77502bd2e87/produtos`
  );

  if (!res.ok) {
    throw new Error("Não foi possível obter os dados.");
  }

  const produtos = await res.json();
  const produto = produtos.find((prod) => prod.id.toString() === slug);

  return produto;
}

export default async function ProdutoPage({ params }) {
  const produto = await fetchProdutoBySlug(params.slug);

  return (
    <main className={styles.main}>
      <Produto produto={produto} />
    </main>
  );
}

export async function generateStaticParams() {
  const res = await fetch(
    "https://api.npoint.io/559ae4cec77502bd2e87/produtos"
  );
  const produtos = await res.json();
  const result = produtos.map((produto) => ({
    slug: produto.id.toString(),
  }));

  return result;
}
