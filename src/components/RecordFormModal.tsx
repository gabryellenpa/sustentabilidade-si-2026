import React, { useState, useEffect } from 'react';
import {
  Zap,
  Recycle,
  Target,
  Calendar,
  Home,
  Save,
  ShieldCheck,
  
} from 'lucide-react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { MonthlyRecord } from '../types/sustainability';

interface RecordFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRecord: MonthlyRecord;
  onSave: (record: Omit<MonthlyRecord, 'id' | 'updatedAt'>) => void;
}

export const RecordFormModal: React.FC<RecordFormModalProps> = ({
  isOpen,
  onClose,
  currentRecord,
  onSave,
}) => {
  // Estados do formulário
  const [mesAno, setMesAno] = useState(currentRecord.mesAno);
  const [mesNome, setMesNome] = useState(currentRecord.mesNome);
  const [tipoImovel, setTipoImovel] = useState(currentRecord.tipoImovel || 'Residência');

  const [energiaKwh, setEnergiaKwh] = useState<number>(currentRecord.energiaKwh);
  const [aguaM3, setAguaM3] = useState<number>(currentRecord.aguaM3);
  const [reciclagemKg, setReciclagemKg] = useState<number>(currentRecord.reciclagemKg);

  const [metaEnergiaKwh, setMetaEnergiaKwh] = useState<number>(currentRecord.metas.energiaKwh);
  const [metaAguaM3, setMetaAguaM3] = useState<number>(currentRecord.metas.aguaM3);
  const [metaReciclagemKg, setMetaReciclagemKg] = useState<number>(currentRecord.metas.reciclagemKg);

  const [papelKg, setPapelKg] = useState<number>(currentRecord.reciclagemDetalhada.papel);
  const [plasticoKg, setPlasticoKg] = useState<number>(currentRecord.reciclagemDetalhada.plastico);
  const [vidroKg, setVidroKg] = useState<number>(currentRecord.reciclagemDetalhada.vidro);
  const [metalKg, setMetalKg] = useState<number>(currentRecord.reciclagemDetalhada.metal);

  // Sincronizar quando abrir com o currentRecord atual
  useEffect(() => {
    if (isOpen) {
      setMesAno(currentRecord.mesAno);
      setMesNome(currentRecord.mesNome);
      setTipoImovel(currentRecord.tipoImovel || 'Residência');
      setEnergiaKwh(currentRecord.energiaKwh);
      setAguaM3(currentRecord.aguaM3);
      setReciclagemKg(currentRecord.reciclagemKg);
      setMetaEnergiaKwh(currentRecord.metas.energiaKwh);
      setMetaAguaM3(currentRecord.metas.aguaM3);
      setMetaReciclagemKg(currentRecord.metas.reciclagemKg);
      setPapelKg(currentRecord.reciclagemDetalhada.papel);
      setPlasticoKg(currentRecord.reciclagemDetalhada.plastico);
      setVidroKg(currentRecord.reciclagemDetalhada.vidro);
      setMetalKg(currentRecord.reciclagemDetalhada.metal);
    }
  }, [isOpen, currentRecord]);

  // Soma dos materiais para validação e conveniência do usuário
  const somaMateriais = Number((papelKg + plasticoKg + vidroKg + metalKg).toFixed(2));

  const handleSincronizarSomaReciclagem = () => {
    setReciclagemKg(somaMateriais);
  };

 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Se o usuário mudou a data, gera o mesNome amigável caso não esteja preenchido
    let nomeFormatado = mesNome;
    if (!nomeFormatado && mesAno) {
      const [ano, mes] = mesAno.split('-');
      const nomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      const mIdx = parseInt(mes, 10) - 1;
      nomeFormatado = `${nomes[mIdx] || mes} ${ano}`;
    }

    onSave({
      mesAno,
      mesNome: nomeFormatado || 'Mês Atual',
      tipoImovel,
      energiaKwh: Number(energiaKwh) || 0,
      aguaM3: Number(aguaM3) || 0,
      reciclagemKg: Number(reciclagemKg) || 0,
      metas: {
        energiaKwh: Number(metaEnergiaKwh) || 0,
        aguaM3: Number(metaAguaM3) || 0,
        reciclagemKg: Number(metaReciclagemKg) || 0,
      },
      reciclagemDetalhada: {
        papel: Number(papelKg) || 0,
        plastico: Number(plasticoKg) || 0,
        vidro: Number(vidroKg) || 0,
        metal: Number(metalKg) || 0,
      },
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Registrar Consumos e Metas"
      subtitle="Insira as leituras de contas de energia, água e separação de recicláveis"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Aviso de Privacidade LocalStorage */}
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/70 flex items-start gap-2.5 text-xs text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold">Privacidade total:</span> Todos os valores que você preencher serão salvos apenas no armazenamento local (LocalStorage) do seu navegador, sem backend ou envio para a rede.
          </div>
        </div>

        {/* 1. SEÇÃO: Identificação e Período */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            1. Período e Local
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Mês / Ano de Referência
              </label>
              <input
                type="month"
                value={mesAno}
                onChange={e => {
                  setMesAno(e.target.value);
                  const [ano, mes] = e.target.value.split('-');
                  const nomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                  const mIdx = parseInt(mes, 10) - 1;
                  setMesNome(`${nomes[mIdx] || mes} ${ano}`);
                }}
                required
                className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tipo de Imóvel / Unidade
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={tipoImovel}
                  onChange={e => setTipoImovel(e.target.value)}
                  placeholder="Ex: Residência, Apto 402, Escritório"
                  className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50"
                />
                <Home className="w-4 h-4 text-stone-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. SEÇÃO: Consumos Realizados */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            2. Leituras Realizadas no Mês
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Energia Realizada */}
            <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-100">
              <label className="block text-xs font-bold text-amber-900 mb-1 flex items-center justify-between">
                <span>Energia</span>
                <span className="text-[10px] text-amber-700 font-normal">kWh</span>
              </label>
              <input
                type="number"
                step="1"
                min="0"
                value={energiaKwh}
                onChange={e => setEnergiaKwh(parseFloat(e.target.value) || 0)}
                placeholder="Ex: 189"
                required
                className="w-full text-sm font-bold px-3 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                Consumo total na conta de luz
              </span>
            </div>

            {/* Água Realizada */}
            <div className="p-3 bg-sky-50/40 rounded-xl border border-sky-100">
              <label className="block text-xs font-bold text-sky-900 mb-1 flex items-center justify-between">
                <span>Água</span>
                <span className="text-[10px] text-sky-700 font-normal">m³</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={aguaM3}
                onChange={e => setAguaM3(parseFloat(e.target.value) || 0)}
                placeholder="Ex: 7.9"
                required
                className="w-full text-sm font-bold px-3 py-2 rounded-lg border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                Metros cúbicos na conta hídrica
              </span>
            </div>

            {/* Reciclagem Realizada */}
            <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100">
              <label className="block text-xs font-bold text-emerald-900 mb-1 flex items-center justify-between">
                <span>Reciclagem</span>
                <span className="text-[10px] text-emerald-700 font-normal">kg</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={reciclagemKg}
                onChange={e => setReciclagemKg(parseFloat(e.target.value) || 0)}
                placeholder="Ex: 14.6"
                required
                className="w-full text-sm font-bold px-3 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                Peso total separado
              </span>
            </div>
          </div>
        </div>

        {/* 3. SEÇÃO: Metas do Mês */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-stone-400" />
            3. Metas Estabelecidas para o Mês
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Meta de Energia (kWh)
              </label>
              <input
                type="number"
                step="1"
                min="0"
                value={metaEnergiaKwh}
                onChange={e => setMetaEnergiaKwh(parseFloat(e.target.value) || 0)}
                placeholder="Ex: 200"
                required
                className="w-full text-xs font-medium px-3 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Meta de Água (m³)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={metaAguaM3}
                onChange={e => setMetaAguaM3(parseFloat(e.target.value) || 0)}
                placeholder="Ex: 8.5"
                required
                className="w-full text-xs font-medium px-3 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Meta de Reciclagem (kg)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={metaReciclagemKg}
                onChange={e => setMetaReciclagemKg(parseFloat(e.target.value) || 0)}
                placeholder="Ex: 12.0"
                required
                className="w-full text-xs font-medium px-3 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* 4. SEÇÃO: Composição da Reciclagem (Papel, Plástico, Vidro, Metal) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Recycle className="w-3.5 h-3.5 text-emerald-600" />
              4. Composição dos Recicláveis (em kg)
            </h4>
            <div className="text-[11px] text-stone-500 flex items-center gap-2">
              <span>Soma: <strong>{somaMateriais} kg</strong></span>
              {somaMateriais !== reciclagemKg && (
                <button
                  type="button"
                  onClick={handleSincronizarSomaReciclagem}
                  className="text-emerald-700 font-semibold underline hover:text-emerald-800"
                >
                  Usar {somaMateriais} kg no total
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Papel */}
            <div className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/30">
              <label className="block text-xs font-bold text-blue-900 mb-1">
                Papel / Papelão
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={papelKg}
                onChange={e => setPapelKg(parseFloat(e.target.value) || 0)}
                placeholder="0.0"
                className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* Plástico */}
            <div className="p-2.5 rounded-xl border border-orange-200 bg-orange-50/30">
              <label className="block text-xs font-bold text-orange-900 mb-1">
                Plásticos
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={plasticoKg}
                onChange={e => setPlasticoKg(parseFloat(e.target.value) || 0)}
                placeholder="0.0"
                className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              />
            </div>

            {/* Vidro */}
            <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/30">
              <label className="block text-xs font-bold text-emerald-900 mb-1">
                Vidro
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={vidroKg}
                onChange={e => setVidroKg(parseFloat(e.target.value) || 0)}
                placeholder="0.0"
                className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>

            {/* Metal */}
            <div className="p-2.5 rounded-xl border border-slate-300 bg-slate-50/50">
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Metal / Latas
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={metalKg}
                onChange={e => setMetalKg(parseFloat(e.target.value) || 0)}
                placeholder="0.0"
                className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Rodapé com Ações */}
        <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              className="flex-1 sm:flex-none"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Save className="w-4 h-4" />}
              className="flex-1 sm:flex-none"
            >
              Salvar no Dispositivo
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
