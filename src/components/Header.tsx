import React from 'react';
import { Leaf, PlusCircle, Calendar, Home, RefreshCw, Smartphone, Laptop } from 'lucide-react';
import { MonthlyRecord } from '../types/sustainability';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface HeaderProps {
  currentRecord: MonthlyRecord;
  records: MonthlyRecord[];
  selectedMonthId: string;
  onSelectMonth: (id: string) => void;
  onOpenForm: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRecord,
  records,
  selectedMonthId,
  onSelectMonth,
  onOpenForm,
  onResetData,
}) => {
  return (
    <header className="w-full pt-6 pb-4">
      {/* Top Bar com Status e Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        {/* Brand / Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 tracking-tight text-lg">Sustenteco</span>
              <Badge variant="emerald" size="sm">
                100% Armazenamento Local
              </Badge>
            </div>
            <p className="text-xs text-stone-500">Sem nuvem · Seus dados ficam no seu dispositivo</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onResetData}
            title="Restaurar dados do protótipo"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Demo
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenForm}
            icon={<PlusCircle className="w-4 h-4" />}
          >
            Inserir / Editar Consumos
          </Button>
        </div>
      </div>

      {/* Main Title Section idêntica ao protótipo */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          {/* Badge de Referência do Mês */}
          <div className="inline-flex items-center gap-2 bg-stone-100/90 text-stone-700 text-xs px-3 py-1.5 rounded-full font-medium border border-stone-200">
            <Calendar className="w-3.5 h-3.5 text-stone-500" />
            <span>{currentRecord.mesNome}</span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Home className="w-3 h-3 text-stone-500" />
              {currentRecord.tipoImovel || 'Residência'}
            </span>
          </div>

          {/* Seletor de Mês se houver múltiplos registros */}
          {records.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
              <span className="text-xs text-stone-400 font-medium whitespace-nowrap">Mudar mês:</span>
              {records.map(record => (
                <button
                  key={record.id}
                  onClick={() => onSelectMonth(record.id)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedMonthId === record.id
                      ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-200/60'
                  }`}
                >
                  {record.mesNome.split(' ')[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
          Seus consumos
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
          Energia, água e reciclagem do mês — com evolução, metas e composição do que você separou para reciclar.
        </p>

        {/* Indicador de compatibilidade Mobile/Desktop */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-stone-100 text-[11px] text-stone-400">
          <span className="flex items-center gap-1">
            <Smartphone className="w-3 h-3 text-emerald-600" /> Interface Mobile Otimizada
          </span>
          <span className="flex items-center gap-1">
            <Laptop className="w-3 h-3 text-emerald-600" /> Layout Desktop Expansivo
          </span>
        </div>
      </div>
    </header>
  );
};
