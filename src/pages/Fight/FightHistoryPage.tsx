import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { martialArtsInfo } from '../../data/martialArts';
import { Trophy, Calendar, ArrowLeft } from 'lucide-react';

const FightHistoryPage: React.FC = () => {
  const { fightHistory } = useGameStore();
  
  if (fightHistory.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="card p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-white mb-4">Histórico de Lutas</h1>
          <p className="text-gray-400 mb-6">Você ainda não participou de nenhuma luta.</p>
          
          <Link to="/fight" className="btn-primary inline-flex items-center">
            <Swords size={18} className="mr-2" />
            Ir para a Arena
          </Link>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        className="card overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gradient-to-r from-black to-red-900 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Histórico de Lutas</h1>
          
          <Link to="/fight" className="btn-secondary flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            Voltar para Arena
          </Link>
        </div>
        
        <div className="p-4">
          <div className="space-y-4">
            {fightHistory.map((fight) => {
              const playerWon = fight.winnerId === fight.player1Id;
              const isDraw = fight.isDraw;
              const fightDate = new Date(fight.date);
              
              return (
                <motion.div 
                  key={fight.id}
                  className="bg-black/50 border border-gray-800 rounded-md overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`p-3 ${
                    isDraw ? 'bg-gray-800/50' : playerWon ? 'bg-green-900/20' : 'bg-red-900/20'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {fightDate.toLocaleDateString('pt-BR')} às {fightDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      <div>
                        {isDraw ? (
                          <span className="text-gray-300 text-sm font-medium">EMPATE</span>
                        ) : (
                          <span className={`text-sm font-medium ${playerWon ? 'text-green-400' : 'text-red-400'}`}>
                            {playerWon ? 'VITÓRIA' : 'DERROTA'}
                          </span>
                        )}
                        
                        {fight.isPerfect && playerWon && (
                          <span className="ml-2 bg-amber-500 text-black text-xs px-1 py-0.5 rounded">
                            PERFECT
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-700 mr-3">
                          <img 
                            src={martialArtsInfo[fight.player1MartialArt].image} 
                            alt={fight.player1MartialArt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div>
                          <p className="font-medium text-white">{fight.player1Name}</p>
                          <p className="text-sm text-gray-400">{martialArtsInfo[fight.player1MartialArt].name}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center mb-4 sm:mb-0">
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-red-500">{fight.player2Damage}</span>
                          <span className="mx-2 text-gray-500">:</span>
                          <span className="text-2xl font-bold text-red-500">{fight.player1Damage}</span>
                        </div>
                        <p className="text-xs text-gray-500">Dano Causado : Dano Recebido</p>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-700 mr-3">
                          <img 
                            src={martialArtsInfo[fight.player2MartialArt].image} 
                            alt={fight.player2MartialArt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div>
                          <p className="font-medium text-white">{fight.player2Name}</p>
                          <p className="text-sm text-gray-400">{martialArtsInfo[fight.player2MartialArt].name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FightHistoryPage;