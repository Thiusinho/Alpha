import React, { useState } from 'react';
import { useFighterStore } from '../../stores/fighterStore';
import { martialArtsInfo, getAvailableTechniques } from '../../data/martialArts';
import { Attributes, Technique } from '../../types';
import { motion } from 'framer-motion';
import { Shield, Zap, Brain, Bomb, Heart } from 'lucide-react';

const FighterProfile: React.FC = () => {
  const { fighter, updateAttributes } = useFighterStore();
  const [editingAttributes, setEditingAttributes] = useState(false);
  const [attributes, setAttributes] = useState<Attributes>(
    fighter?.attributes || {
      resistance: 25,
      dexterity: 25,
      technique: 25,
      strength: 25,
      defense: 25,
      unallocated: 25
    }
  );
  
  if (!fighter) {
    return (
      <div className="text-center p-8">
        <p className="text-xl text-white">Você precisa criar um lutador primeiro!</p>
      </div>
    );
  }
  
  const handleIncreaseAttribute = (attr: keyof Attributes) => {
    if (attributes.unallocated <= 0) return;
    
    setAttributes({
      ...attributes,
      [attr]: attributes[attr] + 1,
      unallocated: attributes.unallocated - 1
    });
  };
  
  const handleDecreaseAttribute = (attr: keyof Attributes) => {
    if (attributes[attr] <= 25) return; // Can't go below base value
    
    setAttributes({
      ...attributes,
      [attr]: attributes[attr] - 1,
      unallocated: attributes.unallocated + 1
    });
  };
  
  const handleSaveAttributes = () => {
    updateAttributes(attributes);
    setEditingAttributes(false);
  };
  
  const calculateTotalPower = () => {
    return (
      attributes.resistance +
      attributes.dexterity +
      attributes.technique +
      attributes.strength +
      attributes.defense
    );
  };
  
  // Get all techniques available to the fighter based on technique level
  const availableTechniques = getAvailableTechniques(
    fighter.martialArt, 
    attributes.technique
  );
  
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
              <p className="text-2xl font-bold text-white">{calculateTotalPower()}</p>
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
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Atributos</h2>
            
            {editingAttributes ? (
              <div className="space-x-2">
                <button 
                  onClick={() => setEditingAttributes(false)}
                  className="btn-secondary text-sm"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSaveAttributes}
                  className="btn-primary text-sm"
                >
                  Salvar
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setEditingAttributes(true)}
                className="btn-primary text-sm"
              >
                Editar
              </button>
            )}
          </div>
          
          {editingAttributes && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-md">
              <p className="text-amber-400 font-medium">
                Pontos não distribuídos: {attributes.unallocated}
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            <AttributeRow 
              name="Resistência"
              value={attributes.resistance}
              icon={<Heart className="text-red-500" />}
              description="Aumenta sua vida total. Quanto mais resistência, mais dano você aguenta."
              editing={editingAttributes}
              onIncrease={() => handleIncreaseAttribute('resistance')}
              onDecrease={() => handleDecreaseAttribute('resistance')}
            />
            
            <AttributeRow 
              name="Destreza"
              value={attributes.dexterity}
              icon={<Zap className="text-yellow-500" />}
              description="Melhora sua precisão e capacidade de esquiva. Impacta a chance de acertar golpes."
              editing={editingAttributes}
              onIncrease={() => handleIncreaseAttribute('dexterity')}
              onDecrease={() => handleDecreaseAttribute('dexterity')}
            />
            
            <AttributeRow 
              name="Técnica"
              value={attributes.technique}
              icon={<Brain className="text-blue-500" />}
              description="Permite aprender golpes mais avançados. Quanto maior a técnica, mais golpes disponíveis."
              editing={editingAttributes}
              onIncrease={() => handleIncreaseAttribute('technique')}
              onDecrease={() => handleDecreaseAttribute('technique')}
            />
            
            <AttributeRow 
              name="Força"
              value={attributes.strength}
              icon={<Bomb className="text-orange-500" />}
              description="Aumenta o dano de seus golpes. Quanto mais força, mais dano você causa."
              editing={editingAttributes}
              onIncrease={() => handleIncreaseAttribute('strength')}
              onDecrease={() => handleDecreaseAttribute('strength')}
            />
            
            <AttributeRow 
              name="Defesa"
              value={attributes.defense}
              icon={<Shield className="text-green-500" />}
              description="Reduz o dano recebido. Quanto mais defesa, menos dano você sofre."
              editing={editingAttributes}
              onIncrease={() => handleIncreaseAttribute('defense')}
              onDecrease={() => handleDecreaseAttribute('defense')}
            />
          </div>
        </motion.div>
        
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">Técnicas</h2>
          
          <div className="space-y-4">
            {availableTechniques.map(technique => (
              <TechniqueCard 
                key={technique.id}
                technique={technique}
                isActive={fighter.activeTechniques.includes(technique.id)}
                isLearned={fighter.techniques.some(t => t.id === technique.id)}
                isSpecial={technique.isSpecial}
                requiredTechnique={technique.requiredTechnique}
                currentTechnique={attributes.technique}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface AttributeRowProps {
  name: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  editing: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
}

const AttributeRow: React.FC<AttributeRowProps> = ({
  name,
  value,
  icon,
  description,
  editing,
  onIncrease,
  onDecrease
}) => {
  return (
    <div className="flex items-center">
      <div className="mr-3">
        {icon}
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-white">{name}</h3>
          <div className="flex items-center">
            {editing && (
              <button 
                onClick={onDecrease}
                className="w-6 h-6 flex items-center justify-center bg-red-900/30 text-white rounded-md mr-2"
              >
                -
              </button>
            )}
            
            <span className="text-lg font-semibold text-white">{value}</span>
            
            {editing && (
              <button 
                onClick={onIncrease}
                className="w-6 h-6 flex items-center justify-center bg-red-900/30 text-white rounded-md ml-2"
              >
                +
              </button>
            )}
          </div>
        </div>
        
        <p className="text-xs text-gray-400">{description}</p>
        
        <div className="stat-bar mt-1">
          <div 
            className="stat-fill bg-red-600" 
            style={{ width: `${(value / 100) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

interface TechniqueCardProps {
  technique: Technique;
  isActive: boolean;
  isLearned: boolean;
  isSpecial: boolean;
  requiredTechnique: number;
  currentTechnique: number;
}

const TechniqueCard: React.FC<TechniqueCardProps> = ({
  technique,
  isActive,
  isLearned,
  isSpecial,
  requiredTechnique,
  currentTechnique
}) => {
  const { fighter, activateTechnique, deactivateTechnique, learnTechnique } = useFighterStore();
  
  const handleToggleTechnique = () => {
    if (!isLearned) {
      if (currentTechnique >= requiredTechnique) {
        learnTechnique(technique);
      }
      return;
    }
    
    if (isActive) {
      deactivateTechnique(technique.id);
    } else {
      activateTechnique(technique.id);
    }
  };
  
  const canLearn = currentTechnique >= requiredTechnique;
  
  return (
    <div className={`
      p-3 rounded-md border transition-all
      ${isSpecial ? 'bg-gradient-to-r from-black to-red-900/30' : 'bg-black/50'}
      ${isActive ? 'border-red-500' : isLearned ? 'border-gray-700' : 'border-gray-800'}
      ${!isLearned && canLearn ? 'cursor-pointer hover:border-amber-500' : ''}
      ${isLearned ? 'cursor-pointer hover:border-red-400' : ''}
    `}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-medium ${isSpecial ? 'text-red-400' : 'text-white'}`}>
            {technique.name}
            {isSpecial && <span className="ml-2 text-xs text-amber-400">Especial</span>}
          </h3>
          <p className="text-sm text-gray-400">{technique.description}</p>
        </div>
        
        {isLearned ? (
          <button 
            onClick={handleToggleTechnique}
            className={`px-2 py-1 text-xs rounded ${
              isActive ? 'bg-red-900/50 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            {isActive ? 'Ativo' : 'Inativo'}
          </button>
        ) : (
          <button 
            onClick={handleToggleTechnique}
            disabled={!canLearn}
            className={`px-2 py-1 text-xs rounded ${
              canLearn ? 'bg-amber-900/50 text-amber-100 cursor-pointer' : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canLearn ? 'Aprender' : `Técnica ${requiredTechnique}`}
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
        <div>
          <span className="text-gray-400">Dano:</span> <span className="text-white">{technique.damage}</span>
        </div>
        <div>
          <span className="text-gray-400">Precisão:</span> <span className="text-white">{technique.accuracy}%</span>
        </div>
      </div>
    </div>
  );
};

export default FighterProfile;