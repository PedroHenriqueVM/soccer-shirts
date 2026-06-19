import CardProduto from "@/components/CardProduto";
import products from "../../../produtos.json";

export default function Produtos() {
  return (
    // Substituído o padding lateral estático 'px-36' por um padding dinâmico e fluido
    <div className="w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-36">

      {/* Container de largura máxima para centralização e alinhamento em telas amplas */}
      <div className="max-w-7xl mx-auto">

        {/* Cabeçalho da Seção de Produtos */}
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Produtos da Papelaria Rabisco
          </h1>
          <p className="max-w-2xl text-slate-600 mx-auto md:mx-0">
            Encontre todos os itens disponíveis na nossa loja, com preços e descrições completas.
          </p>
        </header>

        {/* Grade de Produtos Responsiva com Tailwind Grid */}
        <section className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {products.map((product) => (
              <CardProduto
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                imageSrc={product.imageSrc}
                destaque={product.destaque}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}