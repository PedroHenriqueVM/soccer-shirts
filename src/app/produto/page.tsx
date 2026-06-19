"use client"

import { useState } from "react"
import { Search, RotateCcw } from "lucide-react"
import CardProduto from "@/components/CardProduto"
import products from "../../../produtos.json"

// Definição da tipagem das propriedades dos produtos
interface ProdutoProps {
  id: string | number;
  title: string;
  description: string;
  price: number;
  imageSrc: string;
  destaque: boolean;
  categoria?: string;
}

export default function Produtos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos")
  const [ordenacaoPreco, setOrdenacaoPreco] = useState("relevante")

  // Função para limpar todos os campos e restaurar os estados iniciais
  const limparFiltros = () => {
    setSearchTerm("")
    setCategoriaSelecionada("Todos")
    setOrdenacaoPreco("relevante")
  }

  // Filtragem combinada por busca textual e categoria
  const produtosFiltrados = (products as ProdutoProps[]).filter((produto) => {
    const correspondeTexto =
      produto.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.description.toLowerCase().includes(searchTerm.toLowerCase())

    const correspondeCategoria =
      categoriaSelecionada === "Todos" || produto.categoria === categoriaSelecionada

    return correspondeTexto && correspondeCategoria
  })

  // Ordenação dos dados filtrados com base no preço
  const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
    if (ordenacaoPreco === "menor-preco") {
      return a.price - b.price
    }
    if (ordenacaoPreco === "maior-preco") {
      return b.price - a.price
    }
    return 0
  })

  // Função para obter o total de produtos cadastrados em cada categoria
  const obterTotalCategoria = (categoria: string) => {
    if (categoria === "Todos") {
      return products.length
    }
    return (products as ProdutoProps[]).filter((p) => p.categoria === categoria).length
  }

  // Categorias adaptadas para o nicho de camisas de futebol
  const listaCategorias = ["Todos", "Copa do Mundo 2026", "Brasileirão Série A 2026", "Premier League 25/26", "La Liga 2026", "Bundesliga 25/26"]

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-36">
      <div className="max-w-7xl mx-auto">

        {/* Cabeçalho da Seção de Produtos */}
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Produtos da Soccer Shirts
          </h1>
          <p className="max-w-2xl text-slate-600 mx-auto md:mx-0">
            Encontre todos os itens disponíveis na nossa loja, com preços e descrições completas.
          </p>
        </header>

        {/* Bloco de controles e filtros */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            {/* Campo de pesquisa de texto */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Search className="h-5 w-5" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar produtos..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white transition-all text-sm"
              />
            </div>

            {/* Controles de ordenação e ação de limpeza */}
            <div className="flex items-center gap-4 flex-wrap">
              <label htmlFor="ordenar-preco" className="text-sm font-medium text-slate-700">
                Ordenar por:
              </label>
              <select
                id="ordenar-preco"
                value={ordenacaoPreco}
                onChange={(e) => setOrdenacaoPreco(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-950 text-sm rounded-lg focus:ring-slate-400 focus:border-slate-400 p-2 focus:outline-none"
              >
                <option value="relevante">Mais relevantes</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
              </select>

              {/* Botão de redefinir seleções */}
              {(searchTerm !== "" || categoriaSelecionada !== "Todos" || ordenacaoPreco !== "relevante") && (
                <button
                  onClick={limparFiltros}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Limpar filtros
                </button>
              )}
            </div>

          </div>

          {/* Filtros rápidos de categoria com badges de contagem de itens */}
          <div className="flex gap-2 flex-wrap mt-6 pt-6 border-t border-slate-100">
            {listaCategorias.map((categoria) => {
              const isActive = categoriaSelecionada === categoria
              const totalItens = obterTotalCategoria(categoria)
              return (
                <button
                  key={categoria}
                  onClick={() => setCategoriaSelecionada(categoria)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>{categoria}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full transition-all ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {totalItens}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Seção indicadora do número de resultados */}
        <div className="mb-6 flex justify-between items-center text-sm text-slate-500">
          <span>
            {produtosOrdenados.length === 1
              ? "1 produto encontrado"
              : `${produtosOrdenados.length} produtos encontrados`}
          </span>
        </div>

        {/* Grade de exibição dos produtos */}
        <section className="w-full">
          {produtosOrdenados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {produtosOrdenados.map((product) => (
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
          ) : (
            <div className="w-full bg-white border border-slate-200 rounded-xl p-12 text-center shadow-xs">
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Nenhum produto foi encontrado
              </h3>
              <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
                Não localizamos produtos com o termo "{searchTerm}" na categoria "{categoriaSelecionada}".
              </p>
              <button
                onClick={limparFiltros}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all cursor-pointer"
              >
                Ver todos os produtos
              </button>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}