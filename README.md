# EcoDashboard Sustentável — Consumos & Reciclagem 🌿

Painel interativo e responsivo (Mobile & Desktop) para acompanhamento sustentável de consumo de **energia elétrica (kWh)**, **água tratada (m³)**, **reciclagem total (kg)** e detalhamento por materiais (**papel, plástico, vidro e metal**), com comparação de metas e evolução mensal.

Inspirado no protótipo [Vista Verde Lar](https://vista-verde-lar.lovable.app/).

---

## 🔒 Princípio de Privacidade: 100% no Dispositivo (Sem Backend)

- **Zero servidores**: Nenhum dado é enviado para APIs externas.
- **Armazenamento no LocalStorage**: Os dados inseridos pelo usuário (faturas de energia, leituras de hidrômetro e pesagens de reciclagem) ficam gravados apenas no navegador do seu smartphone ou computador.
- **Sem login / Sem cadastro**: O usuário abre o app e já pode usar imediatamente.

---

## 👥 Arquitetura Colaborativa (Guia para os Membros da Equipe)

Este projeto foi desenhado de forma desacoplada para facilitar a divisão de tarefas entre os desenvolvedores:

- **Camada de UI / Apresentação (Implementada aqui)**:
  - Layout responsivo Mobile-First & Desktop expansivo com Tailwind CSS.
  - Componentes modulares (`Header`, `KpiCards`, `MonthlyEvolutionChart`, `GoalsProgressSection`, `RecyclingPieChart`, `RecordFormModal`, `QuickTipsCard`, `Footer`).
  - Formulário completo para inclusão/edição de leituras mensais e metas.
  - Modal adaptável (Bottom Sheet no celular, Modal centralizado no computador).

- **Onde conectar a Lógica de Negócio e Processamento de Dados**:
  - `src/types/sustainability.ts`: Contrato de dados e tipagens TypeScript (`MonthlyRecord`, `MonthlyGoals`, `RecyclingBreakdown`, `ProcessedDashboardMetrics`).
  - `src/hooks/useSustainabilityData.ts`: Central de gerenciamento do LocalStorage e ponto ideal para plugar novos algoritmos de média móvel, previsão de consumo, estimativa de pegada de carbono (CO₂ economizado), etc.
  - `src/components/MonthlyEvolutionChart.tsx` e `src/components/RecyclingPieChart.tsx`: Componentes de gráfico que recebem métricas já processadas via props, permitindo plugar bibliotecas externas caso a equipe decida (como Recharts ou Chart.js) sem alterar a estrutura de telas.

---

## 🚀 Como Executar o Projeto

1. Certifique-se de ter o **Node.js** (versão 18+ ou 20+) instalado.
2. Navegue até o diretório do projeto:
   ```bash
   cd /home/rayan/.gemini/antigravity/scratch/dashboard-sustentavel
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Abra o link informado no terminal (normalmente `http://localhost:3000` ou `http://localhost:5173`) no navegador do seu computador ou no navegador do smartphone na mesma rede Wi-Fi.

---

## 📊 Estrutura de Arquivos

```text
dashboard-sustentavel/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── README.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── sustainability.ts        # Contratos de tipos e dados
    ├── hooks/
    │   └── useSustainabilityData.ts # LocalStorage, estado e cálculos iniciais
    └── components/
        ├── Header.tsx               # Topbar, seletor de mês e ações
        ├── KpiCards.tsx             # 3 Cards principais (kWh, m³, kg)
        ├── MonthlyEvolutionChart.tsx# Gráfico de evolução mensal
        ├── GoalsProgressSection.tsx # Realizado vs Metas do mês
        ├── RecyclingPieChart.tsx    # Gráfico de pizza/donut e materiais
        ├── RecordFormModal.tsx      # Formulário de entrada de dados
        ├── QuickTipsCard.tsx        # Guia para leitura de contas
        ├── Footer.tsx               # Informações de privacidade
        └── ui/
            ├── Badge.tsx
            ├── Button.tsx
            ├── Card.tsx
            └── Modal.tsx
```
