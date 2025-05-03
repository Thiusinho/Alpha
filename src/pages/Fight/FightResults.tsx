import React, { useState } from 'react';
import { FightResult, FightRound } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { martialArtsInfo } from '../../data/martialArts';
import { Swords, ArrowRight, Trophy, Medal } from 'lucide-react';

interface FightResultsProps {
  result: FightResult;
  onFightAgain: () => void;
}

const FightResults: React.FC<FightResultsProps> = ({ result, onFightAgain }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const navigate = useNavigate();
  
  const playerWon = result.winnerId === result.player1Id;
  const isDraw = result.isDraw;
  
  const handleNextRound = () => {
    if (currentRound < result.rounds.length - 1) {
      setCurrentRound(currentRound + 1);
    }
  };
  
  const handlePrevRound = () => {
    if (currentRound > 0) {
      setCurrentRound(currentRound - 1);
    }
  };
  
  // Calculate total damage for health bars
  const player1MaxHealth = 10; // Just a relative scale for the UI
  const player2MaxHealth = 10;
  
  const player1CurrentHealth = player1MaxHealth - (result.player1Damage / 100);
  const player2CurrentHealth = player2MaxHealth - (result.player2Damage / 100);
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        className="card overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gradient-to-r from-black to-red-900 p-4 text-center relative">
          <h1 className="text-2xl font-bold text-white">Resultado da Luta</h1>
          
          {result.isPerfect && playerWon && (
            <div className="absolute top-4 right-4">
              <div className="bg-amber-500 text-black font-bold px-3 py-1 rounded-md text-sm flex items-center">
                <Trophy size={16} className="mr-1" /> PERFECT!
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="text-center relative">
              <div className={`w-24 h-24 rounded-full overflow-hidden mb-3 border-2 mx-auto ${
                playerWon ? 'border-amber-500' : isDraw ? 'border-gray-500' : 'border-gray-700'
              }`}>
                <img 
                  src={martialArtsInfo[result.player1MartialArt].image} 
                  alt={result.player1MartialArt}
                  className="w-full h-full object-cover"
                />
                
                {playerWon && (
                  <div className="absolute -right-2 -top-2 bg-amber-500 rounded-full p-1">
                    <Trophy size={16} />
                  </div>
                )}
              </div>
              
              <h2 className="text-lg font-bold text-white">{result.player1Name}</h2>
              <p className="text-gray-400">{martialArtsInfo[result.player1MartialArt].name}</p>
              
              <div className="mt-2">
                <div className="stat-bar">
                  <div 
                    className="stat-fill bg-green-600" 
                    style={{ width: `${Math.max(0, player1CurrentHealth / player1MaxHealth * 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Dano recebido: <span className="text-red-400">{result.player1Damage}</span>
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-black p-3 rounded-md border border-red-800">
                {isDraw ? (
                  <span className="text-gray-300 font-bold">EMPATE</span>
                ) : (
                  <span className={`font-bold ${playerWon ? 'text-green-500' : 'text-red-500'}`}>
                    {playerWon ? 'VITÓRIA' : 'DERROTA'}
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-center relative">
              <div className={`w-24 h-24 rounded-full overflow-hidden mb-3 border-2 mx-auto ${
                !playerWon && !isDraw ? 'border-amber-500' : isDraw ? 'border-gray-500' : 'border-gray-700'
              }`}>
                <img 
                  src={martialArtsInfo[result.player2MartialArt].image} 
                  alt={result.player2MartialArt}
                  className="w-full h-full object-cover"
                />
                
                {!playerWon && !isDraw && (
                  <div className="absolute -right-2 -top-2 bg-amber-500 rounded-full p-1">
                    <Trophy size={16} />
                  </div>
                )}
              </div>
              
              <h2 className="text-lg font-bold text-white">{result.player2Name}</h2>
              <p className="text-gray-400">{martialArtsInfo[result.player2MartialArt].name}</p>
              
              <div className="mt-2">
                <div className="stat-bar">
                  <div 
                    className="stat-fill bg-green-600" 
                    style={{ width: `${Math.max(0, player2CurrentHealth / player2MaxHealth * 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Dano recebido: <span className="text-red-400">{result.player2Damage}</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <button 
                onClick={handlePrevRound}
                disabled={currentRound === 0}
                className="btn-secondary text-sm"
              >
                Round Anterior
              </button>
              
              <h3 className="text-lg font-bold text-white">
                Round {result.rounds[currentRound].round}
              </h3>
              
              <button 
                onClick={handleNextRound}
                disabled={currentRound === result.rounds.length - 1}
                className="btn-secondary text-sm"
              >
                Próximo Round
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentRound}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-black/50 p-4 rounded-md border border-gray-800"
              >
                <RoundDetail round={result.rounds[currentRound]} />
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onFightAgain}
              className="btn-primary"
            >
              Lutar Novamente
            </button>
            
            <button 
              onClick={() => navigate('/history')}
              className="btn-secondary"
            >
              Ver Histórico de Lutas
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface RoundDetailProps {
  round: FightRound;
}

const RoundDetail: React.FC<RoundDetailProps> = ({ round }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gradient-to-r from-black to-red-900/30 p-3 rounded-md border border-gray-800">
          <h4 className="font-medium text-white mb-2">Técnica Utilizada</h4>
          {round.player1Technique ? (
            <div>
              <p className="text-lg font-semibold text-white">{round.player1Technique.name}</p>
              <p className="text-sm text-gray-400">{round.player1Technique.description}</p>
              <div className="flex justify-between mt-2 text-sm">
                <span>Dano: <span className="text-red-400">{round.player1Technique.damage}</span></span>
                <span>Precisão: <span className="text-green-400">{round.player1Technique.accuracy}%</span></span>
              </div>
              <div className="mt-2">
                <span className="text-sm text-amber-400">
                  Dano causado: {round.player1Damage}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Nenhuma técnica utilizada</p>
          )}
        </div>
        
        <div className="bg-gradient-to-r from-black to-red-900/30 p-3 rounded-md border border-gray-800">
          <h4 className="font-medium text-white mb-2">Técnica do Oponente</h4>
          {round.player2Technique ? (
            <div>
              <p className="text-lg font-semibold text-white">{round.player2Technique.name}</p>
              <p className="text-sm text-gray-400">{round.player2Technique.description}</p>
              <div className="flex justify-between mt-2 text-sm">
                <span>Dano: <span className="text-red-400">{round.player2Technique.damage}</span></span>
                <span>Precisão: <span className="text-green-400">{round.player2Technique.accuracy}%</span></span>
              </div>
              <div className="mt-2">
                <span className="text-sm text-amber-400">
                  Dano causado: {round.player2Damage}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Nenhuma técnica utilizada</p>
          )}
        </div>
      </div>
      
      <div className="p-3 bg-black/30 rounded-md border border-gray-800">
        <h4 className="font-medium text-white mb-2">Narração do Round</h4>
        <p className="text-gray-300">{round.commentary}</p>
      </div>
    </div>
  );
};

export default FightResults;