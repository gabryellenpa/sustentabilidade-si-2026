# Sustenteco 🌿 — Consumos & Reciclagem

Painel interativo e responsivo (mobile e desktop) para acompanhar o consumo de **energia elétrica (kWh)**, **água tratada (m³)** e **reciclagem (kg)**, com detalhamento por material (papel, plástico, vidro e metal), comparação com metas e evolução mensal.

Inspirado no protótipo [Vista Verde Lar](https://vista-verde-lar.lovable.app/).

Projeto de Extensão Interprofissional · Desenvolvimento Sustentável.

## 🔒 Privacidade: 100% no dispositivo

- **Sem servidores:** nenhum dado é enviado para APIs externas.
- **LocalStorage:** faturas de energia, leituras de hidrômetro e pesagens de reciclagem ficam salvas apenas no navegador do usuário.
- **Sem login e sem cadastro:** abriu, já pode usar.

## ✨ Funcionalidades

- KPIs do mês: energia, água e reciclagem com status em relação à meta
- Gráfico de evolução mensal (comparativo ou por categoria)
- Progresso das metas do mês (limite de energia e água, mínimo de reciclagem)
- Gráfico de rosca com a composição dos materiais reciclados
- Formulário para inserir/editar leituras mensais e metas
- Guia rápido para encontrar os dados nas contas
- Layout mobile-first; o modal vira folha inferior no celular

## 🛠️ Tecnologias

React · TypeScript · Vite · Tailwind CSS

## 🚀 Como executar

Pré-requisito: [Node.js](https://nodejs.org/) 18 ou superior.

```bash
# clone o repositório
git clone <URL-DO-REPOSITORIO>
cd <NOME-DA-PASTA>

# instale as dependências
npm install

# inicie o servidor de desenvolvimento
npm run dev
```

Abra o endereço mostrado no terminal (geralmente `http://localhost:5173`). Para testar no celular, use o mesmo Wi-Fi do computador e acesse pelo IP da máquina.

## 📁 Estrutura

```
src/
├── main.tsx
├── App.tsx
├── index.css
├── types/
│   └── sustainability.ts         # Contratos de tipos e dados
├── hooks/
│   └── useSustainabilityData.ts  # LocalStorage, estado e cálculos
└── components/
    ├── Header.tsx                # Topo, seletor de mês e ações
    ├── KpiCards.tsx              # Cards de kWh, m³ e kg
    ├── MonthlyEvolutionChart.tsx # Evolução mensal
    ├── GoalsProgressSection.tsx  # Realizado vs. metas
    ├── RecyclingPieChart.tsx     # Rosca e materiais
    ├── RecordFormModal.tsx       # Formulário de dados
    ├── QuickTipsCard.tsx         # Guia de leitura das contas
    ├── Footer.tsx                # Informações de privacidade
    └── ui/                       # Badge, Button, Card, Modal
```

## 👥 Guia para a equipe

O projeto é desacoplado para facilitar a divisão de tarefas:

- **Interface (pronta):** layout responsivo, componentes modulares, formulário de leituras e metas.
- **Dados e lógica:**
  - `src/types/sustainability.ts`: tipos `MonthlyRecord`, `MonthlyGoals`, `RecyclingBreakdown` e `ProcessedDashboardMetrics`.
  - `src/hooks/useSustainabilityData.ts`: gerencia o LocalStorage e é o lugar ideal para novos cálculos (média móvel, previsão de consumo, estimativa de CO₂ evitado).
- **Gráficos:** `MonthlyEvolutionChart.tsx` e `RecyclingPieChart.tsx` recebem métricas já processadas via props, então dá para trocar por Recharts ou Chart.js sem mexer nas telas.

## 📄 Licença

Projeto acadêmico de extensão universitária.
