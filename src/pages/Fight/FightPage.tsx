import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../stores/gameStore';
import { useFighterStore } from '../../stores/fighterStore';
import { FightResult } from '../../types';
import { motion } from 'framer-motion';
import { martialArtsInfo } from '../../data/martialArts';
import { Swords, Trophy } from 'lucide-react';
import FightResults from './FightResults';

const FightPage: React.FC = () => {
  const [fightResult, setFightResult] = useState<FightResult | null>(null);
  const [isFighting, setIsFighting] = useState(false);
  const { startFight, isLoading } = useGameStore();
  const { fighter } = useFighterStore();
  const navigate = useNavigate();
  
  if (!fighter) {
    return (
      <div className="text-center p-8">
        <p className="text-xl text-white">Você precisa criar um lutador primeiro!</p>
        <button 
          onClick={() => navigate('/')}
          className="btn-primary mt-4"
        >
          Voltar para o Início
        </button>
      </div>
    );
  }
  
  const handleStartFight = async () => {
    setIsFighting(true);
    const result = await startFight();
    if (result) {
      setFightResult(result);
    }
    setIsFighting(false);
  };
  
  const handleFightAgain = () => {
    setFightResult(null);
  };
  
  if (fightResult) {
    return <FightResults result={fightResult} onFightAgain={handleFightAgain} />;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Arena de Combate</h1>
          <p className="text-gray-400 mt-2">Batalhe contra outros lutadores para subir no ranking</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mb-8">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-3 border-2 border-red-700 mx-auto">
              <img 
                src={martialArtsInfo[fighter.martialArt].image} 
                alt={martialArtsInfo[fighter.martialArt].name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-white">{fighter.name}</h2>
            <p className="text-gray-400">{martialArtsInfo[fighter.martialArt].name}</p>
            <p className="text-sm mt-1">
              <span className="text-amber-400">{fighter.ranking}</span> pontos
            </p>
          </div>
          
          <div className="flex items-center justify-center">
            <Swords size={48} className="text-red-600" />
            <span className="text-2xl font-bold mx-4 text-gray-500">VS</span>
            <Trophy size={48} className="text-amber-500" />
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-3 border-2 border-gray-700 mx-auto bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
              <span className="text-gray-500 font-bold text-lg">?</span>
            </div>
            <h2 className="text-xl font-bold text-white">Oponente</h2>
            <p className="text-gray-400">Lutador Aleatório</p>
            <p className="text-sm mt-1">
              <span className="text-amber-400">???</span> pontos
            </p>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <p className="text-gray-300 mb-3">
            Lutas restantes hoje: <span className="font-bold text-white">{15 - fighter.fightCount}</span> de 15
          </p>
          
          <button 
            onClick={handleStartFight}
            disabled={isLoading || isFighting || fighter.fightCount >= 15}
            className="btn-primary px-8 py-3 text-lg"
          >
            {isLoading || isFighting ? (
              <>
                <span className="animate-pulse">Lutando...</span>
              </>
            ) : fighter.fightCount >= 15 ? (
              'Limite de lutas atingido'
            ) : (
              'Iniciar Combate'
            )}
          </button>
        </div>
        
        <div className="bg-red-900/20 border border-red-800 rounded-md p-4">
          <h3 className="font-semibold text-white mb-2">Como as lutas funcionam:</h3>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li>• As lutas são simuladas automaticamente com base nos atributos e técnicas dos lutadores.</li>
            <li>• A duração máxima de cada luta é de 3 rounds (a menos que ocorra um nocaute).</li>
            <li>• Cada lutador pode usar apenas as técnicas que tem ativas.</li>
            <li>• Quanto maior sua Destreza, maior a chance de acertar e esquivar.</li>
            <li>• Quanto maior sua Força, mais dano seus golpes causam.</li>
            <li>• Quanto maior sua Resistência, mais vida você tem.</li>
            <li>• Quanto maior sua Defesa, menos dano você recebe.</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default FightPage;