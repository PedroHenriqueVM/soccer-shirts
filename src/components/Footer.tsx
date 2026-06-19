import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-36">
      {/* Container Principal com alinhamento responsivo:
          Empilhado verticalmente no celular e alinhado horizontalmente em telas amplas
      */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 text-center md:text-left">
        <p>&copy; {currentYear} Papelaria Rabisco. Todos os direitos reservados.</p>
        <p className="text-slate-300">Feito com carinho para você.</p>
      </div>
    </footer>
  );
}