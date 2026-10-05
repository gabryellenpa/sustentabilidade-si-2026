import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useSustainabilityData } from './hooks/useSustainabilityData';
import { Header } from './components/Header';
import { KpiCards } from './components/KpiCards';
import { MonthlyEvolutionChart } from './components/MonthlyEvolutionChart';
import { GoalsProgressSection } from './components/GoalsProgressSection';
import { RecyclingPieChart } from './components/RecyclingPieChart';
import { RecordFormModal } from './components/RecordFormModal';
import { QuickTipsCard } from './components/QuickTipsCard';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const {
    records,
    currentRecord,
    metrics,
    selectedMonthId,
    setSelectedMonthId,
    saveRecord,
    resetToDemoData,
  } = useSustainabilityData();

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-16 sm:pb-8">
      {/* Container Centralizado Responsivo */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <Header
          currentRecord={currentRecord}
          records={records}
          selectedMonthId={selectedMonthId}
          onSelectMonth={setSelectedMonthId}
          onOpenForm={() => setIsFormOpen(true)}
          onResetData={resetToDemoData}
        />

        {/* Linha dos 3 Cards Principais de Consumo (Energia, Água, Reciclagem) */}
        <section aria-label="Indicadores principais de consumo">
          <KpiCards metrics={metrics} onOpenForm={() => setIsFormOpen(true)} />
        </section>

        {/* Gráfico de Evolução Mensal Comparativo */}
        <section aria-label="Evolução mensal dos consumos">
          <MonthlyEvolutionChart
            metrics={metrics}
            onSelectMonth={setSelectedMonthId}
          />
        </section>

        {/* Grid com Metas do Mês e Composição de Reciclagem (Lado a lado no Desktop, empilhado no Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-4">
          {/* Metas do Mês (Realizado vs Metas) */}
          <div className="lg:col-span-5">
            <GoalsProgressSection
              metrics={metrics}
              onOpenForm={() => setIsFormOpen(true)}
            />
          </div>

          {/* O que você reciclou (Gráfico de Pizza / Donut e Materiais) */}
          <div className="lg:col-span-7">
            <RecyclingPieChart
              metrics={metrics}
              onOpenForm={() => setIsFormOpen(true)}
            />
          </div>
        </div>

        {/* Dicas para leitura de faturas e economia */}
        <section aria-label="Dicas sustentáveis">
          <QuickTipsCard />
        </section>

        {/* Rodapé com detalhes de privacidade e LocalStorage */}
        <Footer onReset={resetToDemoData} />
      </div>

      {/* Botão Flutuante (FAB) visível no Mobile para acesso rápido ao formulário */}
      <div className="sm:hidden fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white font-bold px-4 py-3.5 rounded-full shadow-lg shadow-emerald-700/30 hover:bg-emerald-700 active:scale-95 transition-all"
          aria-label="Registrar novos consumos"
        >
          <Plus className="w-5 h-5" />
          <span className="text-xs">Novo Consumo</span>
        </button>
      </div>

      {/* Modal / Bottom-Sheet de Inserção e Edição de Leituras e Metas */}
      <RecordFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        currentRecord={currentRecord}
        onSave={saveRecord}
      />
    </div>
  );
};

export default App;
