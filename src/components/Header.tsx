'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {

const [ isOpen, setIsOpen ] = useState<boolean>(false)

  return (
    <header className="relative w-full h-16 bg-[#f8f8f8] border-slate-200 px-36 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src="/logo/logo Soccer Shirts.png"
          alt="Logo da empresa"
          width={100}
          height={100}
          className="h-16 w-auto object-contain"
        />
        <h1 className="text-lg font-bold text-blue-600">
          Soccer Shirts
        </h1>
      </div>
      <nav className="hidden md:flex space-x-6">
        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
          Home
        </Link>
        <Link href="/produto" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
          Produtos
        </Link>
        <Link href="/contato" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
          Contato
        </Link>
      </nav>
      <button
      onClick = {() => setIsOpen(!isOpen)}
      className="md:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors focus:outline-none" aria-label={ isOpen ? "Fechar menu": "Abrir menu"}>
        { isOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
      </button>
      {/* Menu mobile - renderização condicional */}
      { isOpen && (
        <nav className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg px-6 py-4 flex items-center justify-center gap-6 z-40">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/produto"
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            Produtos
          </Link>
          <Link
            href="/contato"
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            Contato
          </Link>
        </nav>
      )}
    </header>
  );
}
