import { useState, useEffect } from 'react';
import { MonthlyRecord, ProcessedDashboardMetrics, RecyclingPercentages } from '../types/sustainability';

const STORAGE_KEY = 'vista_verde_sustainability_records_v1';

// Dados padrão idênticos ao protótipo Vista Verde Lar (https://vista-verde-lar.lovable.app/)
export const INITIAL_RECORD_SETEMBRO_2026: MonthlyRecord = {
  id: '2026-09',
  mesAno: '2026-09',
  mesNome: 'Setembro 2026',
  tipoImovel: 'Residência',
  energiaKwh: 189,
  aguaM3: 7.9,
  reciclagemKg: 14.6,
  metas: {
    energiaKwh: 200,
    aguaM3: 8.5,
    reciclagemKg: 12.0,
  },
  reciclagemDetalhada: {
    papel: 5.55,    // ~38%
    plastico: 3.94, // ~27%
    vidro: 2.92,    // ~20%
    metal: 2.19,    // ~15%
  },
  updatedAt: new Date().toISOString(),
};

// Histórico padrão para alimentar a evolução mensal
export const INITIAL_HISTORY: MonthlyRecord[] = [
  {
    id: '2026-05',
    mesAno: '2026-05',
    mesNome: 'Maio 2026',
    tipoImovel: 'Residência',
    energiaKwh: 215,
    aguaM3: 9.2,
    reciclagemKg: 10.2,
    metas: { energiaKwh: 210, aguaM3: 9.0, reciclagemKg: 11.0 },
    reciclagemDetalhada: { papel: 4.1, plastico: 2.8, vidro: 1.8, metal: 1.5 },
    updatedAt: '2026-05-31T23:59:59Z',
  },
  {
    id: '2026-06',
    mesAno: '2026-06',
    mesNome: 'Junho 2026',
    tipoImovel: 'Residência',
    energiaKwh: 204,
    aguaM3: 8.8,
    reciclagemKg: 11.5,
    metas: { energiaKwh: 210, aguaM3: 9.0, reciclagemKg: 11.5 },
    reciclagemDetalhada: { papel: 4.6, plastico: 3.1, vidro: 2.1, metal: 1.7 },
    updatedAt: '2026-06-30T23:59:59Z',
  },
  {
    id: '2026-07',
    mesAno: '2026-07',
    mesNome: 'Julho 2026',
    tipoImovel: 'Residência',
    energiaKwh: 198,
    aguaM3: 8.1,
    reciclagemKg: 13.0,
    metas: { energiaKwh: 205, aguaM3: 8.5, reciclagemKg: 12.0 },
    reciclagemDetalhada: { papel: 5.0, plastico: 3.5, vidro: 2.5, metal: 2.0 },
    updatedAt: '2026-07-31T23:59:59Z',
  },
  {
    id: '2026-08',
    mesAno: '2026-08',
    mesNome: 'Agosto 2026',
    tipoImovel: 'Residência',
    energiaKwh: 192,
    aguaM3: 8.4,
    reciclagemKg: 13.8,
    metas: { energiaKwh: 200, aguaM3: 8.5, reciclagemKg: 12.0 },
    reciclagemDetalhada: { papel: 5.2, plastico: 3.7, vidro: 2.7, metal: 2.2 },
    updatedAt: '2026-08-31T23:59:59Z',
  },
  INITIAL_RECORD_SETEMBRO_2026,
];

/**
 * Utilitário de cálculo inicial para permitir renderização imediata da UI.
 * A lógica aprofundada de processamento e estatística pode ser estendida pelos outros membros.
 */
export function calculateMetrics(
  currentRecord: MonthlyRecord,
  recordsList: MonthlyRecord[]
): ProcessedDashboardMetrics {
  const { reciclagemDetalhada, energiaKwh, aguaM3, reciclagemKg, metas } = currentRecord;
  
  const somaMateriais =
    (reciclagemDetalhada.papel || 0) +
    (reciclagemDetalhada.plastico || 0) +
    (reciclagemDetalhada.vidro || 0) +
    (reciclagemDetalhada.metal || 0);

  // Se a soma for zero, usa proporção padrão visual
  const divisor = somaMateriais > 0 ? somaMateriais : 1;
  const percentages: RecyclingPercentages = {
    papel: Math.round(((reciclagemDetalhada.papel || 0) / divisor) * 100),
    plastico: Math.round(((reciclagemDetalhada.plastico || 0) / divisor) * 100),
    vidro: Math.round(((reciclagemDetalhada.vidro || 0) / divisor) * 100),
    metal: Math.round(((reciclagemDetalhada.metal || 0) / divisor) * 100),
  };

  // Garante que some 100 se houver itens
  const somaPerc = percentages.papel + percentages.plastico + percentages.vidro + percentages.metal;
  if (somaPerc > 0 && somaPerc !== 100) {
    percentages.papel += 100 - somaPerc;
  }

  // Progresso de metas
  const pctEnergia = metas.energiaKwh > 0 ? (energiaKwh / metas.energiaKwh) * 100 : 0;
  const pctAgua = metas.aguaM3 > 0 ? (aguaM3 / metas.aguaM3) * 100 : 0;
  const pctReciclagem = metas.reciclagemKg > 0 ? (reciclagemKg / metas.reciclagemKg) * 100 : 0;

  // Histórico ordenado
  const sortedRecords = [...recordsList].sort((a, b) => a.mesAno.localeCompare(b.mesAno));
  const historicoMensal = sortedRecords.map(r => {
    const parts = r.mesAno.split('-');
    const monthIndex = parseInt(parts[1], 10) - 1;
    const monthsShort = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const mesNomeCurto = monthsShort[monthIndex] || r.mesNome;

    return {
      mesAno: r.mesAno,
      mesNomeCurto,
      energiaKwh: r.energiaKwh,
      aguaM3: r.aguaM3,
      reciclagemKg: r.reciclagemKg,
    };
  });

  return {
    currentRecord,
    reciclagemPercentages: percentages,
    progressoMetas: {
      energia: {
        percentual: Number(pctEnergia.toFixed(1)),
        dentroDaMeta: energiaKwh <= metas.energiaKwh,
        diferenca: Number(Math.abs(metas.energiaKwh - energiaKwh).toFixed(1)),
      },
      agua: {
        percentual: Number(pctAgua.toFixed(1)),
        dentroDaMeta: aguaM3 <= metas.aguaM3,
        diferenca: Number(Math.abs(metas.aguaM3 - aguaM3).toFixed(1)),
      },
      reciclagem: {
        percentual: Number(pctReciclagem.toFixed(1)),
        atingiuMeta: reciclagemKg >= metas.reciclagemKg,
        diferenca: Number(Math.abs(reciclagemKg - metas.reciclagemKg).toFixed(1)),
      },
    },
    historicoMensal,
  };
}

export function useSustainabilityData() {
  const [records, setRecords] = useState<MonthlyRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Erro ao carregar dados do localStorage:', err);
    }
    return INITIAL_HISTORY;
  });

  const [selectedMonthId, setSelectedMonthId] = useState<string>('2026-09');

  // Persistir no LocalStorage sempre que alterar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (err) {
      console.error('Falha ao salvar no localStorage:', err);
    }
  }, [records]);

  // Obter o registro atual selecionado
  const currentRecord = records.find(r => r.id === selectedMonthId) || records[records.length - 1] || INITIAL_RECORD_SETEMBRO_2026;

  // Métricas calculadas para os componentes de UI
  const metrics = calculateMetrics(currentRecord, records);

  // Ação para salvar ou atualizar um registro (vindo do formulário)
  const saveRecord = (recordData: Omit<MonthlyRecord, 'id' | 'updatedAt'>) => {
    const id = recordData.mesAno;
    const newRecord: MonthlyRecord = {
      ...recordData,
      id,
      updatedAt: new Date().toISOString(),
    };

    setRecords(prev => {
      const existsIndex = prev.findIndex(r => r.id === id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = newRecord;
        return updated;
      }
      return [...prev, newRecord];
    });

    setSelectedMonthId(id);
  };

  // Ação para resetar aos dados padrões
  const resetToDemoData = () => {
    setRecords(INITIAL_HISTORY);
    setSelectedMonthId('2026-09');
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_HISTORY));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    records,
    currentRecord,
    metrics,
    selectedMonthId,
    setSelectedMonthId,
    saveRecord,
    resetToDemoData,
  };
}
