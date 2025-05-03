import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFighterStore } from '../stores/fighterStore';
import { useAuthStore } from '../stores/authStore';
import { useGameStore } from '../stores/gameStore';
import { martialArtsInfo } from '../data/martialArts';
import { MartialArt } from '../types';
import { motion } from 'framer-motion';
import { Swords, Trophy, Clock, AlertTriangle } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { fighter } = useFighterStore();
  const { user } = useAuthStore();
  const { checkForReset } = useGameStore();
  
  // Check for game reset on component mount
  useEffect(() => {
    checkForReset();
  }, [checkForReset]);
  
  // If user has no fighter, show fighter creation
  if (!fighter) {
    return <FighterCreation />;
  }
  
  // Determine days remaining until reset
  const today = new Date();
  const lastReset = new Date(useGameStore.getState().lastReset);
  const nextReset = new Date(lastReset);
  nextReset.setDate(nextReset.getDate() + 30);
  const daysRemaining = Math.ceil((nextReset.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Determine fights remaining today
  const fightsRemaining = 15 - fighter.fightCount;
  
  return (
    <div className="space-y-6">
      <motion.div 
        className="card overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-48 bg-gradient-to-r from-black to-red-900 relative">
          <img 
            src={martialArtsInfo[fighter.martialArt].image} 
            alt={martialArtsInfo[fighter.martialArt].name}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h1 className="text-2xl font-bold text-white">{fighter.name}</h1>
            <p className="text-gray-300">{martialArtsInfo[fighter.martialArt].name}</p>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-400">Poder Total</p>
              <p className="text-2xl font-bold text-white">
                {fighter.attributes.resistance + 
                 fighter.attributes.dexterity + 
                 fighter.attributes.technique + 
                 fighter.attributes.strength + 
                 fighter.attributes.defense}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-400">Ranking</p>
              <p className="text-2xl font-bold text-white">{fighter.ranking}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-400">Recorde</p>
              <p className="text-xl font-bold text-white">
                {fighter.wins}W - {fighter.losses}L - {fighter.draws}D
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className="card bg-gradient-to-r from-black to-red-900/40 p-4 flex items-center cursor-pointer hover:bg-red-900/20 transition"
              onClick={() => navigate('/fight')}
            >
              <Swords className="mr-3 text-red-500" />
              <div>
                <h3 className="font-semibold text-white">Lutar</h3>
                <p className="text-sm text-gray-400">Inicie uma nova luta</p>
              </div>
            </div>
            
            <div 
              className="card bg-gradient-to-r from-black to-red-900/40 p-4 flex items-center cursor-pointer hover:bg-red-900/20 transition"
              onClick={() => navigate('/profile')}
            >
              <Trophy className="mr-3 text-amber-500" />
              <div>
                <h3 className="font-semibold text-white">Treinar</h3>
                <p className="text-sm text-gray-400">Melhore seus atributos</p>
              </div>
            </div>
            
            <div 
              className="card bg-gradient-to-r from-black to-red-900/40 p-4 flex items-center cursor-pointer hover:bg-red-900/20 transition"
              onClick={() => navigate('/ranking')}
            >
              <Trophy className="mr-3 text-red-500" />
              <div>
                <h3 className="font-semibold text-white">Ranking</h3>
                <p className="text-sm text-gray-400">Veja sua posição</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center mb-3">
            <Clock className="mr-2 text-amber-500" />
            <h2 className="text-lg font-semibold text-white">Status do Jogo</h2>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-400">Próximo reset global</p>
              <p className="text-lg font-medium text-white">{daysRemaining} dias</p>
              <div className="stat-bar mt-1">
                <div 
                  className="stat-fill bg-amber-600" 
                  style={{ width: `${(30 - daysRemaining) / 30 * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-400">Lutas restantes hoje</p>
              <p className="text-lg font-medium text-white">{fightsRemaining} de 15</p>
              <div className="stat-bar mt-1">
                <div 
                  className="stat-fill bg-red-600" 
                  style={{ width: `${(15 - fightsRemaining) / 15 * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center mb-3">
            <AlertTriangle className="mr-2 text-red-500" />
            <h2 className="text-lg font-semibold text-white">Informações Importantes</h2>
          </div>
          
          <div className="space-y-2 text-gray-300">
            <p>• O jogo reseta a cada 30 dias. Todos os lutadores são recriados.</p>
            <p>• Você pode fazer até 15 lutas por dia.</p>
            <p>• Distribua seus pontos sabiamente para maximizar seu desempenho nas lutas.</p>
            <p>• Novas técnicas são desbloqueadas conforme você aumenta seu nível de técnica.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FighterCreation: React.FC = () => {
  const [name, setName] = useState('');
  const [selectedArt, setSelectedArt] = useState<MartialArt | null>(null);
  const { createFighter } = useFighterStore();
  const navigate = useNavigate();
  
  const handleCreateFighter = () => {
    if (!name || !selectedArt) return;
    
    createFighter(name, selectedArt);
    navigate('/profile');
  };
  
  return (
    <div>
      <motion.div 
        className="card p-6 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-white text-center mb-6">Crie seu Lutador</h1>
        
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Nome do Lutador
          </label>
          <input
            type="text"
            id="name"
            className="input w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do seu lutador"
            required
          />
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium text-white mb-3">Selecione uma Arte Marcial</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(martialArtsInfo).map(([key, art]) => (
              <div 
                key={key}
                className={`card relative overflow-hidden cursor-pointer transition-all duration-200 ${
                  selectedArt === key ? 'ring-2 ring-red-500' : ''
                }`}
                onClick={() => setSelectedArt(key as MartialArt)}
              >
                <img 
                  src={art.image} 
                  alt={art.name} 
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-3">
                  <h3 className="text-white font-semibold">{art.name}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{art.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={handleCreateFighter}
          disabled={!name || !selectedArt}
          className="btn-primary w-full"
        >
          Criar Lutador
        </button>
      </motion.div>
    </div>
  );
};

export default HomePage;