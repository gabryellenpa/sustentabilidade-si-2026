import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, Zap, Droplets, Recycle } from 'lucide-react';
import { Card } from './ui/Card';

export const QuickTipsCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="my-4 bg-emerald-950/5 border-emerald-900/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">
              Como encontrar os dados nas suas contas?
            </h4>
            <p className="text-xs text-stone-500">
              Guia rápido para preencher suas leituras de energia, água e pesagem de recicláveis
            </p>
          </div>
        </div>
        <div className="p-1 text-stone-400">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-emerald-900/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-600">
          {/* Dica Energia */}
          <div className="p-3 bg-white rounded-xl border border-stone-100 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-700 mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Conta de Energia Elétrica
            </div>
            <p className="leading-relaxed text-[11px]">
              Procure pelo campo <strong>"Consumo do Mês (kWh)"</strong> ou <strong>"Total faturado"</strong> no quadro de dados de medição. Ele expressa a quantidade de quilowatts-hora consumidos no ciclo de leitura.
            </p>
          </div>

          {/* Dica Água */}
          <div className="p-3 bg-white rounded-xl border border-stone-100 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-sky-700 mb-1">
              <Droplets className="w-3.5 h-3.5 text-sky-500" />
              Conta de Água e Esgoto
            </div>
            <p className="leading-relaxed text-[11px]">
              Localize o campo <strong>"Volume Faturado (m³)"</strong> ou <strong>"Consumo Medido"</strong>. Cada 1 m³ equivale a 1.000 litros de água consumidos.
            </p>
          </div>

          {/* Dica Reciclagem */}
          <div className="p-3 bg-white rounded-xl border border-stone-100 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-700 mb-1">
              <Recycle className="w-3.5 h-3.5 text-emerald-600" />
              Pesagem de Recicláveis
            </div>
            <p className="leading-relaxed text-[11px]">
              Separe os materiais limpos em recipientes ou sacolas distintas. Você pode pesar usando uma balança comum de bagagem ou banheiro antes de descartar no ponto de coleta seletiva.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};
