import React, { useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';
import { useFighterStore } from '../stores/fighterStore';
import { martialArtsInfo } from '../data/martialArts';
import { motion } from 'framer-motion';
import { Trophy, Medal, User } from 'lucide-react';

const RankingPage: React.FC = () => {
  const { rankings, updateRankings } = useGameStore();
  const { fighter } = useFighterStore();
  
  useEffect(() => {
    updateRankings();
  }, [updateRankings]);
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        className="card overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gradient-to-r from-black to-red-900 p-4">
          <h1 className="text-2xl font-bold text-white">Ranking Global</h1>
          <p className="text-gray-300 mt-1">Os melhores lutadores de As Lendas</p>
        </div>
        
        <div className="p-4">
          <div className="bg-gradient-to-r from-amber-900/20 to-black p-4 rounded-md border border-amber-800/50 mb-6 flex items-center">
            <Trophy size={24} className="text-amber-500 mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-white">Classificação</h2>
              <p className="text-sm text-gray-300">
                Lutadores são classificados com base em vitórias e poder total
              </p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Posição</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Lutador</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Arte Marcial</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Vitórias</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Derrotas</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">% Vitórias</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Poder</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((entry, index) => {
                  const isPlayer = fighter && entry.id === fighter.id;
                  
                  return (
                    <tr 
                      key={entry.id}
                      className={`
                        border-b border-gray-800 
                        ${isPlayer ? 'bg-red-900/10' : index % 2 === 0 ? 'bg-black/30' : ''}
                        ${isPlayer ? 'hover:bg-red-900/20' : 'hover:bg-gray-800/30'}
                        transition-colors
                      `}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {index === 0 ? (
                            <Medal size={20} className="text-amber-500 mr-1" />
                          ) : index === 1 ? (
                            <Medal size={20} className="text-gray-400 mr-1" />
                          ) : index === 2 ? (
                            <Medal size={20} className="text-amber-700 mr-1" />
                          ) : (
                            <span className="text-gray-500 font-medium">{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {isPlayer ? (
                            <User size={16} className="text-red-500 mr-2" />
                          ) : null}
                          <span className={`font-medium ${isPlayer ? 'text-red-400' : 'text-white'}`}>
                            {entry.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {martialArtsInfo[entry.martialArt].name}
                      </td>
                      <td className="px-4 py-3 text-green-400 font-medium">
                        {entry.wins}
                      </td>
                      <td className="px-4 py-3 text-red-400 font-medium">
                        {entry.losses}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`
                          font-medium
                          ${entry.winPercentage >= 75 ? 'text-green-400' : 
                            entry.winPercentage >= 50 ? 'text-amber-400' : 
                            entry.winPercentage >= 25 ? 'text-orange-400' : 'text-red-400'}
                        `}>
                          {entry.winPercentage}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-white">{entry.totalPower}</span>
                      </td>
                    </tr>
                  );
                })}
                
                {rankings.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                      Nenhum lutador encontrado no ranking
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RankingPage;