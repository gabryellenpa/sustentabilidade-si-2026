import React from 'react';
import { Target, Zap, Droplets, Recycle, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { ProcessedDashboardMetrics } from '../types/sustainability';

interface GoalsProgressSectionProps {
  metrics: ProcessedDashboardMetrics;
  onOpenForm: () => void;
}

export const GoalsProgressSection: React.FC<GoalsProgressSectionProps> = ({
  metrics,
  onOpenForm,
}) => {
  const { currentRecord, progressoMetas } = metrics;

  return (
    <Card className="my-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Meta do mês</h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Realizado em {currentRecord.mesNome.toLowerCase()} em relação aos objetivos estabelecidos
          </p>
        </div>

        <button
          onClick={onOpenForm}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline self-start sm:self-auto"
        >
          Ajustar metas
        </button>
      </div>

      {/* Grid de 3 barras de progresso com status detalhado */}
      <div className="space-y-4">
        {/* Meta Energia */}
        <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-semibold text-stone-800">Energia Elétrica (Limite)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900">
                {currentRecord.energiaKwh} / {currentRecord.metas.energiaKwh} kWh
              </span>
              <Badge
                variant={progressoMetas.energia.dentroDaMeta ? 'emerald' : 'rose'}
                size="sm"
              >
                {progressoMetas.energia.percentual}%
              </Badge>
            </div>
          </div>
          {/* Progress track */}
          <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                progressoMetas.energia.dentroDaMeta ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(progressoMetas.energia.percentual, 100)}%` }}
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-stone-500">
            <span>Objetivo: manter abaixo de {currentRecord.metas.energiaKwh} kWh</span>
            <span className="font-medium text-emerald-700 flex items-center gap-1">
              {progressoMetas.energia.dentroDaMeta ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Economizando{' '}
                  {progressoMetas.energia.diferenca} kWh
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 text-rose-600" /> Excedeu{' '}
                  {progressoMetas.energia.diferenca} kWh
                </>
              )}
            </span>
          </div>
        </div>

        {/* Meta Água */}
        <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-2">
              <Droplets className="w-3.5 h-3.5 text-sky-500" />
              <span className="font-semibold text-stone-800">Consumo de Água (Limite)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900">
                {currentRecord.aguaM3.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} /{' '}
                {currentRecord.metas.aguaM3.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} m³
              </span>
              <Badge
                variant={progressoMetas.agua.dentroDaMeta ? 'emerald' : 'rose'}
                size="sm"
              >
                {progressoMetas.agua.percentual}%
              </Badge>
            </div>
          </div>
          {/* Progress track */}
          <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                progressoMetas.agua.dentroDaMeta ? 'bg-sky-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(progressoMetas.agua.percentual, 100)}%` }}
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-stone-500">
            <span>Objetivo: manter abaixo de {currentRecord.metas.aguaM3.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} m³</span>
            <span className="font-medium text-emerald-700 flex items-center gap-1">
              {progressoMetas.agua.dentroDaMeta ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Folga de{' '}
                  {progressoMetas.agua.diferenca} m³
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 text-rose-600" /> Ultrapassou{' '}
                  {progressoMetas.agua.diferenca} m³
                </>
              )}
            </span>
          </div>
        </div>

        {/* Meta Reciclagem */}
        <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-2">
              <Recycle className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold text-stone-800">Meta de Reciclagem (Mínimo)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900">
                {currentRecord.reciclagemKg.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} /{' '}
                {currentRecord.metas.reciclagemKg.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} kg
              </span>
              <Badge
                variant={progressoMetas.reciclagem.atingiuMeta ? 'emerald' : 'amber'}
                size="sm"
              >
                {progressoMetas.reciclagem.percentual}%
              </Badge>
            </div>
          </div>
          {/* Progress track */}
          <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all duration-500"
              style={{ width: `${Math.min(progressoMetas.reciclagem.percentual, 100)}%` }}
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-stone-500">
            <span>Objetivo: reciclar pelo menos {currentRecord.metas.reciclagemKg.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} kg</span>
            <span className="font-medium text-emerald-700 flex items-center gap-1">
              {progressoMetas.reciclagem.atingiuMeta ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Meta atingida! (
                  +{progressoMetas.reciclagem.diferenca} kg)
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 text-amber-600" /> Faltam{' '}
                  {progressoMetas.reciclagem.diferenca} kg
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
