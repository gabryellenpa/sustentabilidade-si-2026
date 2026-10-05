import React, { useState } from 'react';
import { BarChart3, Zap, Droplets, Recycle } from 'lucide-react';
import { Card } from './ui/Card';
import { ProcessedDashboardMetrics } from '../types/sustainability';

interface MonthlyEvolutionChartProps {
  metrics: ProcessedDashboardMetrics;
  onSelectMonth?: (mesAno: string) => void;
}

type MetricView = 'todos' | 'energia' | 'agua' | 'reciclagem';

export const MonthlyEvolutionChart: React.FC<MonthlyEvolutionChartProps> = ({
  metrics,
  onSelectMonth,
}) => {
  const [view, setView] = useState<MetricView>('todos');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const history = metrics.historicoMensal;

  // Encontrar valores máximos para normalizar alturas das barras
  const maxEnergia = Math.max(...history.map(h => h.energiaKwh), 250);
  const maxAgua = Math.max(...history.map(h => h.aguaM3), 12);
  const maxReciclagem = Math.max(...history.map(h => h.reciclagemKg), 20);

  return (
    <Card className="my-4">
      {/* Header com Título e Filtro de Métrica */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Evolução mensal</h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Acompanhe a variação do consumo ao longo dos últimos meses
          </p>
        </div>

        {/* Abas de visualização */}
        <div className="inline-flex p-1 bg-stone-100 rounded-xl self-start sm:self-auto text-xs font-medium">
          <button
            onClick={() => setView('todos')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              view === 'todos'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Comparativo
          </button>
          <button
            onClick={() => setView('energia')}
            className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
              view === 'energia'
                ? 'bg-white text-amber-700 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-amber-700'
            }`}
          >
            <Zap className="w-3 h-3 text-amber-500" /> Energia
          </button>
          <button
            onClick={() => setView('agua')}
            className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
              view === 'agua'
                ? 'bg-white text-sky-700 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-sky-700'
            }`}
          >
            <Droplets className="w-3 h-3 text-sky-500" /> Água
          </button>
          <button
            onClick={() => setView('reciclagem')}
            className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
              view === 'reciclagem'
                ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-emerald-700'
            }`}
          >
            <Recycle className="w-3 h-3 text-emerald-600" /> Reciclagem
          </button>
        </div>
      </div>

      {/* Área do Gráfico de Barras Responsivo */}
      <div className="pt-4 pb-2">
        <div className="h-56 sm:h-64 flex items-end justify-between gap-2 sm:gap-4 px-2 sm:px-4 border-b border-stone-200">
          {history.map((item, idx) => {
            const isCurrent = item.mesAno === metrics.currentRecord.mesAno;
            const isHovered = hoveredIndex === idx;

            // Alturas relativas (0% a 100%)
            const heightEnergia = (item.energiaKwh / maxEnergia) * 100;
            const heightAgua = (item.aguaM3 / maxAgua) * 100;
            const heightReciclagem = (item.reciclagemKg / maxReciclagem) * 100;

            return (
              <div
                key={item.mesAno}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSelectMonth && onSelectMonth(item.mesAno)}
              >
                {/* Tooltip Hover flutuante */}
                {isHovered && (
                  <div className="absolute -top-16 z-20 bg-stone-900 text-white text-[11px] py-1.5 px-2.5 rounded-lg shadow-xl pointer-events-none whitespace-nowrap flex flex-col gap-0.5">
                    <span className="font-bold border-b border-stone-700 pb-0.5 mb-0.5">
                      {item.mesNomeCurto}
                    </span>
                    <span className="text-amber-300">⚡ {item.energiaKwh} kWh</span>
                    <span className="text-sky-300">💧 {item.aguaM3} m³</span>
                    <span className="text-emerald-300">♻️ {item.reciclagemKg} kg</span>
                  </div>
                )}

                {/* Barras do mês */}
                <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-full max-w-[50px] pb-1">
                  {/* Barra Energia */}
                  {(view === 'todos' || view === 'energia') && (
                    <div
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        isCurrent
                          ? 'bg-amber-500'
                          : 'bg-amber-200/90 group-hover:bg-amber-400'
                      }`}
                      style={{ height: `${Math.max(heightEnergia, 8)}%` }}
                      title={`Energia: ${item.energiaKwh} kWh`}
                    />
                  )}

                  {/* Barra Água */}
                  {(view === 'todos' || view === 'agua') && (
                    <div
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        isCurrent
                          ? 'bg-sky-500'
                          : 'bg-sky-200/90 group-hover:bg-sky-400'
                      }`}
                      style={{ height: `${Math.max(heightAgua, 8)}%` }}
                      title={`Água: ${item.aguaM3} m³`}
                    />
                  )}

                  {/* Barra Reciclagem */}
                  {(view === 'todos' || view === 'reciclagem') && (
                    <div
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        isCurrent
                          ? 'bg-emerald-600'
                          : 'bg-emerald-200/90 group-hover:bg-emerald-400'
                      }`}
                      style={{ height: `${Math.max(heightReciclagem, 8)}%` }}
                      title={`Reciclagem: ${item.reciclagemKg} kg`}
                    />
                  )}
                </div>

                {/* Label do Mês */}
                <span
                  className={`mt-2 text-xs font-medium transition-colors ${
                    isCurrent
                      ? 'text-emerald-700 font-bold'
                      : 'text-stone-500 group-hover:text-stone-800'
                  }`}
                >
                  {item.mesNomeCurto}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legenda do Gráfico */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-amber-500" />
            <span>Energia (kWh)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-sky-500" />
            <span>Água (m³)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-emerald-600" />
            <span>Reciclagem (kg)</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
