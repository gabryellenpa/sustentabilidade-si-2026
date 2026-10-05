import React from 'react';
import { Zap, Droplets, Recycle, TrendingDown, TrendingUp, CheckCircle2 } from 'lucide-react';
import { ProcessedDashboardMetrics } from '../types/sustainability';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

interface KpiCardsProps {
  metrics: ProcessedDashboardMetrics;
  onOpenForm: () => void;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ metrics, onOpenForm }) => {
  const { currentRecord, progressoMetas } = metrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      {/* CARD 1: ENERGIA ELÉTRICA */}
      <Card
        className="relative overflow-hidden group hover:border-amber-300/80 transition-all cursor-pointer"
        onClick={onOpenForm}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 fill-amber-500/20" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Energia
              </span>
              <h4 className="text-xs text-stone-400">Consumo elétrico</h4>
            </div>
          </div>
          <Badge
            variant={progressoMetas.energia.dentroDaMeta ? 'emerald' : 'rose'}
            size="sm"
          >
            {progressoMetas.energia.dentroDaMeta ? (
              <>
                <TrendingDown className="w-3 h-3" /> Dentro da meta
              </>
            ) : (
              <>
                <TrendingUp className="w-3 h-3" /> Acima da meta
              </>
            )}
          </Badge>
        </div>

        {/* Valor Principal */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            {currentRecord.energiaKwh}
          </span>
          <span className="text-base font-semibold text-stone-500">kWh</span>
        </div>

        {/* Linha da Meta */}
        <div className="mt-2 text-xs font-medium text-stone-600 flex items-center justify-between">
          <span>Meta do mês:</span>
          <span className="font-semibold text-stone-800">
            {currentRecord.metas.energiaKwh} kWh
          </span>
        </div>

        {/* Barra de Progresso Visual */}
        <div className="mt-2 w-full bg-stone-100 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              progressoMetas.energia.dentroDaMeta ? 'bg-amber-500' : 'bg-rose-500'
            }`}
            style={{ width: `${Math.min(progressoMetas.energia.percentual, 100)}%` }}
          />
        </div>

        <div className="mt-2 text-[11px] text-stone-400 flex items-center justify-between">
          <span>{progressoMetas.energia.percentual}% da meta</span>
          <span>
            {progressoMetas.energia.dentroDaMeta
              ? `${progressoMetas.energia.diferenca} kWh de economia`
              : `+${progressoMetas.energia.diferenca} kWh excedente`}
          </span>
        </div>
      </Card>

      {/* CARD 2: ÁGUA */}
      <Card
        className="relative overflow-hidden group hover:border-sky-300/80 transition-all cursor-pointer"
        onClick={onOpenForm}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold">
              <Droplets className="w-5 h-5 fill-sky-500/20" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Água
              </span>
              <h4 className="text-xs text-stone-400">Consumo hídrico</h4>
            </div>
          </div>
          <Badge
            variant={progressoMetas.agua.dentroDaMeta ? 'emerald' : 'rose'}
            size="sm"
          >
            {progressoMetas.agua.dentroDaMeta ? (
              <>
                <TrendingDown className="w-3 h-3" /> Dentro da meta
              </>
            ) : (
              <>
                <TrendingUp className="w-3 h-3" /> Acima da meta
              </>
            )}
          </Badge>
        </div>

        {/* Valor Principal */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            {currentRecord.aguaM3.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
          </span>
          <span className="text-base font-semibold text-stone-500">m³</span>
        </div>

        {/* Linha da Meta */}
        <div className="mt-2 text-xs font-medium text-stone-600 flex items-center justify-between">
          <span>Meta do mês:</span>
          <span className="font-semibold text-stone-800">
            {currentRecord.metas.aguaM3.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} m³
          </span>
        </div>

        {/* Barra de Progresso Visual */}
        <div className="mt-2 w-full bg-stone-100 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              progressoMetas.agua.dentroDaMeta ? 'bg-sky-500' : 'bg-rose-500'
            }`}
            style={{ width: `${Math.min(progressoMetas.agua.percentual, 100)}%` }}
          />
        </div>

        <div className="mt-2 text-[11px] text-stone-400 flex items-center justify-between">
          <span>{progressoMetas.agua.percentual}% da meta</span>
          <span>
            {progressoMetas.agua.dentroDaMeta
              ? `${progressoMetas.agua.diferenca} m³ de folga`
              : `+${progressoMetas.agua.diferenca} m³ acima`}
          </span>
        </div>
      </Card>

      {/* CARD 3: RECICLAGEM */}
      <Card
        className="relative overflow-hidden group hover:border-emerald-300/80 transition-all cursor-pointer"
        onClick={onOpenForm}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Reciclagem
              </span>
              <h4 className="text-xs text-stone-400">Total reciclado</h4>
            </div>
          </div>
          <Badge
            variant={progressoMetas.reciclagem.atingiuMeta ? 'emerald' : 'amber'}
            size="sm"
          >
            {progressoMetas.reciclagem.atingiuMeta ? (
              <>
                <CheckCircle2 className="w-3 h-3" /> Meta batida!
              </>
            ) : (
              <>
                <TrendingUp className="w-3 h-3" /> Em progresso
              </>
            )}
          </Badge>
        </div>

        {/* Valor Principal */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            {currentRecord.reciclagemKg.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
          </span>
          <span className="text-base font-semibold text-stone-500">kg</span>
        </div>

        {/* Linha da Meta */}
        <div className="mt-2 text-xs font-medium text-stone-600 flex items-center justify-between">
          <span>Meta do mês:</span>
          <span className="font-semibold text-stone-800">
            {currentRecord.metas.reciclagemKg.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} kg
          </span>
        </div>

        {/* Barra de Progresso Visual */}
        <div className="mt-2 w-full bg-stone-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-500"
            style={{ width: `${Math.min(progressoMetas.reciclagem.percentual, 100)}%` }}
          />
        </div>

        <div className="mt-2 text-[11px] text-stone-400 flex items-center justify-between">
          <span>{progressoMetas.reciclagem.percentual}% da meta</span>
          <span>
            {progressoMetas.reciclagem.atingiuMeta
              ? `+${progressoMetas.reciclagem.diferenca} kg além da meta`
              : `Faltam ${progressoMetas.reciclagem.diferenca} kg`}
          </span>
        </div>
      </Card>
    </div>
  );
};
