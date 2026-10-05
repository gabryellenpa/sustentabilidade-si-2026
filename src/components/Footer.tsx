import React from 'react';
import { Shield, HardDrive, Users, Trash2 } from 'lucide-react';

interface FooterProps {
  onReset: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReset }) => {
  return (
    <footer className="mt-12 mb-8 pt-8 border-t border-stone-200 text-xs text-stone-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Privacidade */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-bold text-stone-800">Privacidade em Primeiro Lugar</h5>
            <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
              Sem cadastro, sem login e sem servidores. Todas as leituras e metas ficam armazenadas exclusivamente no navegador do seu celular ou computador.
            </p>
          </div>
        </div>

        {/* Armazenamento Local */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
            <HardDrive className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-bold text-stone-800">Armazenamento Local</h5>
            <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
              Os dados persistem mesmo se você fechar a aba ou reiniciar seu navegador. Você pode limpar ou restaurar a qualquer momento.
            </p>
          </div>
        </div>

        {/* Projeto Colaborativo */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-bold text-stone-800">Projeto Colaborativo</h5>
            <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
              Camada de UI desenvolvida com TypeScript e Tailwind CSS, pronta para receber os motores de cálculo e gráficos desenvolvidos pela equipe da Sustenteco.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-100 text-[11px] text-stone-400">
        <p>© 2026 Sustenteco · Projeto de Extensão Interprofissional · Desenvolvimento Sustentável</p>
        <button
          onClick={() => {
            if (window.confirm('Tem certeza que deseja limpar todos os registros do LocalStorage e restaurar os dados de demonstração?')) {
              onReset();
            }
          }}
          className="flex items-center gap-1.5 text-stone-400 hover:text-rose-600 transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          Limpar dados e restaurar padrão
        </button>
      </div>
    </footer>
  );
};
