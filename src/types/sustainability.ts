/**
 * Definições de Tipos e Contratos para o Dashboard Sustentável
 * 
 * Este arquivo serve como contrato de dados entre a camada de UI (Mobile/Desktop)
 * e as camadas de lógica de negócio, processamento de dados e geração de gráficos
 * desenvolvidas pelos demais membros da equipe.
 */

// Categorias detalhadas de materiais recicláveis
export interface RecyclingBreakdown {
  papel: number;    // em kg
  plastico: number; // em kg
  vidro: number;    // em kg
  metal: number;    // em kg
}

// Porcentagens calculadas pela lógica de processamento
export interface RecyclingPercentages {
  papel: number;    // 0 a 100 (%)
  plastico: number; // 0 a 100 (%)
  vidro: number;    // 0 a 100 (%)
  metal: number;    // 0 a 100 (%)
}

// Metas estipuladas para o mês
export interface MonthlyGoals {
  energiaKwh: number;     // Ex: 200 kWh
  aguaM3: number;         // Ex: 8.5 m³
  reciclagemKg: number;   // Ex: 12.0 kg
}

// Registro mensal completo inserido pelo usuário
export interface MonthlyRecord {
  id: string;               // UUID ou string única (ex: '2026-09')
  mesAno: string;           // Identificador do mês (ex: '2026-09')
  mesNome: string;          // Nome legível (ex: 'Setembro 2026')
  tipoImovel: string;       // 'Residência', 'Apartamento', 'Comércio', etc.
  
  // Consumos do mês
  energiaKwh: number;       // Consumo de energia em kWh
  aguaM3: number;           // Consumo de água em m³
  reciclagemKg: number;     // Total de reciclagem em kg
  
  // Metas do mês
  metas: MonthlyGoals;
  
  // Composição da reciclagem
  reciclagemDetalhada: RecyclingBreakdown;
  
  // Data da última atualização (ISO 8601)
  updatedAt: string;
}

// Dados calculados para os gráficos e indicadores (para os outros desenvolvedores conectarem)
export interface ProcessedDashboardMetrics {
  currentRecord: MonthlyRecord;
  reciclagemPercentages: RecyclingPercentages;
  
  // Metas atingidas / percentuais de realização
  progressoMetas: {
    energia: {
      percentual: number; // ex: 94.5%
      dentroDaMeta: boolean; // se energia <= meta
      diferenca: number;
    };
    agua: {
      percentual: number; // ex: 92.9%
      dentroDaMeta: boolean; // se água <= meta
      diferenca: number;
    };
    reciclagem: {
      percentual: number; // ex: 121.7%
      atingiuMeta: boolean; // se reciclagem >= meta
      diferenca: number;
    };
  };
  
  // Histórico para o gráfico de evolução mensal
  historicoMensal: {
    mesAno: string;
    mesNomeCurto: string; // 'Mai', 'Jun', 'Jul', 'Ago', 'Set'
    energiaKwh: number;
    aguaM3: number;
    reciclagemKg: number;
  }[];
}
