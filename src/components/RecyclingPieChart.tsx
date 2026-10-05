import React, { useState } from 'react';
import { Package, HelpCircle } from 'lucide-react';
import { Card } from './ui/Card';
import { ProcessedDashboardMetrics } from '../types/sustainability';

interface RecyclingPieChartProps {
  metrics: ProcessedDashboardMetrics;
  onOpenForm: () => void;
}

type MaterialKey = 'papel' | 'plastico' | 'vidro' | 'metal';

interface MaterialConfig {
  key: MaterialKey;
  label: string;
  color: string;
  hoverColor: string;
  dotColor: string;
  bgBadge: string;
  textColor: string;
  borderColor: string;
}

const MATERIALS: MaterialConfig[] = [
  {
    key: 'papel',
    label: 'Papel',
    color: '#3b82f6', // blue-500
    hoverColor: '#2563eb',
    dotColor: 'bg-blue-500',
    bgBadge: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
  },
  {
    key: 'plastico',
    label: 'Plástico',
    color: '#f97316', // orange-500
    hoverColor: '#ea580c',
    dotColor: 'bg-orange-500',
    bgBadge: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
  },
  {
    key: 'vidro',
    label: 'Vidro',
    color: '#10b981', // emerald-500
    hoverColor: '#059669',
    dotColor: 'bg-emerald-500',
    bgBadge: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
  },
  {
    key: 'metal',
    label: 'Metal',
    color: '#64748b', // slate-500
    hoverColor: '#475569',
    dotColor: 'bg-slate-500',
    bgBadge: 'bg-slate-100',
    textColor: 'text-slate-700',
    borderColor: 'border-slate-300',
  },
];

export const RecyclingPieChart: React.FC<RecyclingPieChartProps> = ({
  metrics,
  onOpenForm,
}) => {
  const [activeItem, setActiveItem] = useState<MaterialKey | null>(null);

  const { currentRecord, reciclagemPercentages } = metrics;
  const { reciclagemDetalhada, reciclagemKg } = currentRecord;

  // Cálculo dos arcos do Donut SVG (coordenadas polares -> cartesianas)
  const size = 200;
  const center = size / 2;
  const radius = 78;
  const strokeWidth = 28;
  const circumference = 2 * Math.PI * radius;

  // Acumular offsets para cada fatia
  let accumulatedPercent = 0;
  const slices = MATERIALS.map(mat => {
    const percent = reciclagemPercentages[mat.key] || 0;
    const strokeDasharray = `${(percent * circumference) / 100} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent * circumference) / 100);
    accumulatedPercent += percent;

    return {
      ...mat,
      percent,
      kg: reciclagemDetalhada[mat.key] || 0,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  const activeMaterial = activeItem ? slices.find(s => s.key === activeItem) : null;

  return (
    <Card className="my-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-stone-900">O que você reciclou</h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            <span className="font-semibold text-emerald-700">
              {reciclagemKg.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} kg
            </span>{' '}
            separados em {currentRecord.mesNome.toLowerCase()}
          </p>
        </div>

        <button
          onClick={onOpenForm}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline self-start sm:self-auto"
        >
          Editar materiais
        </button>
      </div>

      {/* Conteúdo: Gráfico Donut SVG + Lista de Materiais */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
        {/* Gráfico Donut Interativo */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-48 h-48 sm:w-52 sm:h-52">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox={`0 0 ${size} ${size}`}
            >
              {/* Background circle */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke="#f1f5f9"
                strokeWidth={strokeWidth}
              />
              {/* Slices */}
              {slices.map(slice => {
                const isSelected = activeItem === slice.key;
                return (
                  <circle
                    key={slice.key}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke={isSelected ? slice.hoverColor : slice.color}
                    strokeWidth={isSelected ? strokeWidth + 4 : strokeWidth}
                    strokeDasharray={slice.strokeDasharray}
                    strokeDashoffset={slice.strokeDashoffset}
                    strokeLinecap="round"
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setActiveItem(slice.key)}
                    onMouseLeave={() => setActiveItem(null)}
                  />
                );
              })}
            </svg>

            {/* Centro do Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-4">
              {activeMaterial ? (
                <>
                  <span className="text-[11px] font-semibold uppercase text-stone-400">
                    {activeMaterial.label}
                  </span>
                  <span className="text-2xl font-black text-stone-900 leading-tight">
                    {activeMaterial.percent}%
                  </span>
                  <span className="text-[11px] font-medium text-stone-500">
                    {activeMaterial.kg.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} kg
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[11px] font-medium uppercase text-stone-400">
                    Total
                  </span>
                  <span className="text-2xl font-black text-stone-900 leading-tight">
                    {reciclagemKg.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700">
                    kg reciclados
                  </span>
                </>
              )}
            </div>
          </div>

          <p className="text-[11px] text-stone-400 mt-2 text-center flex items-center gap-1">
            <HelpCircle className="w-3 h-3" /> Passe o mouse ou toque nos segmentos
          </p>
        </div>

        {/* Detalhamento dos Materiais em Cartões / Lista */}
        <div className="md:col-span-7 grid grid-cols-2 gap-3">
          {slices.map(item => {
            const isHovered = activeItem === item.key;
            return (
              <div
                key={item.key}
                onMouseEnter={() => setActiveItem(item.key)}
                onMouseLeave={() => setActiveItem(null)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isHovered
                    ? `${item.bgBadge} ${item.borderColor} shadow-sm scale-[1.02]`
                    : 'bg-white border-stone-200/90 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.dotColor}`} />
                    <span className="text-xs font-bold text-stone-800">{item.label}</span>
                  </div>
                  <span className="text-sm font-black text-stone-900">{item.percent}%</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span>Peso separado:</span>
                  <span className="font-semibold text-stone-700">
                    {item.kg.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} kg
                  </span>
                </div>

                {/* Micro barra de percentual */}
                <div className="mt-2 w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
