import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FightResult, Fighter, RankingEntry } from '../types';
import { toast } from 'react-toastify';
import { useFighterStore } from './fighterStore';
import { techniques } from '../data/martialArts';

interface GameState {
  fightHistory: FightResult[];
  rankings: RankingEntry[];
  lastReset: string;
  isLoading: boolean;
  startFight: () => Promise<FightResult | null>;
  updateRankings: () => void;
  checkForReset: () => void;
}

const generateOpponent = (playerPower: number): Fighter => {
  const martialArts = ['karate', 'judô', 'boxe', 'muaythai', 'jiujitsu', 'taekwondo', 'kungfu', 'capoeira'];
  const names = [
    'Marcos Silva', 'João Pereira', 'Carlos Oliveira', 'Roberto Santos', 
    'Ricardo Lima', 'Fernando Costa', 'Victor Souza', 'Gabriel Martins',
    'Mateus Rocha', 'Lucas Alves', 'Bruno Ferreira', 'Daniel Castro',
    'Rodrigo Vieira', 'Eduardo Rodrigues', 'Gustavo Almeida', 'Anderson Cruz'
  ];
  
  const name = names[Math.floor(Math.random() * names.length)];
  const martialArt = martialArts[Math.floor(Math.random() * martialArts.length)] as any;
  
  const powerVariation = Math.floor(Math.random() * 20) - 10;
  const opponentPower = Math.max(125, playerPower + powerVariation);
  
  const baseAttribute = Math.floor(opponentPower / 5);
  const remainder = opponentPower % 5;
  
  const opponent: Fighter = {
    id: `ai-${Date.now()}`,
    userId: 'ai',
    name,
    martialArt,
    attributes: {
      resistance: baseAttribute + (remainder > 0 ? 1 : 0),
      dexterity: baseAttribute + (remainder > 1 ? 1 : 0),
      technique: baseAttribute + (remainder > 2 ? 1 : 0),
      strength: baseAttribute + (remainder > 3 ? 1 : 0),
      defense: baseAttribute,
      unallocated: 0
    },
    techniques: techniques
      .filter(t => t.martialArt === martialArt)
      .slice(0, 5 + Math.floor(Math.random() * 3)),
    activeTechniques: techniques
      .filter(t => t.martialArt === martialArt)
      .slice(0, 5)
      .map(t => t.id),
    wins: Math.floor(Math.random() * 10),
    losses: Math.floor(Math.random() * 5),
    draws: Math.floor(Math.random() * 3),
    ranking: 1000 + Math.floor(Math.random() * 200) - 100,
    fightCount: 0
  };
  
  return opponent;
};

const simulateFight = (player: Fighter, opponent: Fighter): FightResult => {
  const playerHP = player.attributes.resistance * 20; // Increased HP multiplier
  const opponentHP = opponent.attributes.resistance * 20;
  
  let currentPlayerHP = playerHP;
  let currentOpponentHP = opponentHP;
  
  const rounds = [];
  let isPerfect = true;
  let round = 1;
  
  // Fight continues until someone is knocked out
  while (currentPlayerHP > 0 && currentOpponentHP > 0) {
    const playerTechniques = player.techniques.filter(t => 
      player.activeTechniques.includes(t.id)
    );
    
    const opponentTechniques = opponent.techniques.filter(t => 
      opponent.activeTechniques.includes(t.id)
    );
    
    const playerTechnique = playerTechniques[Math.floor(Math.random() * playerTechniques.length)];
    const opponentTechnique = opponentTechniques[Math.floor(Math.random() * opponentTechniques.length)];
    
    const playerHitChance = (playerTechnique.accuracy * (player.attributes.dexterity / 50)) / 100;
    const opponentHitChance = (opponentTechnique.accuracy * (opponent.attributes.dexterity / 50)) / 100;
    
    const playerHits = Math.random() < playerHitChance;
    const opponentHits = Math.random() < opponentHitChance;
    
    let playerDamage = 0;
    let opponentDamage = 0;
    let commentary = '';
    
    if (playerHits) {
      playerDamage = Math.floor(
        (playerTechnique.damage * 0.7) * // Reduced base damage
        (player.attributes.strength / 50) * 
        (1 - opponent.attributes.defense / 150) // Reduced defense impact
      );
      currentOpponentHP -= playerDamage;
      commentary += `${player.name} acerta ${playerTechnique.name}! `;
    } else {
      commentary += `${player.name} tenta ${playerTechnique.name} mas erra. `;
    }
    
    if (opponentHits) {
      opponentDamage = Math.floor(
        (opponentTechnique.damage * 0.7) *
        (opponent.attributes.strength / 50) *
        (1 - player.attributes.defense / 150)
      );
      currentPlayerHP -= opponentDamage;
      commentary += `${opponent.name} acerta ${opponentTechnique.name}! `;
      isPerfect = false;
    } else {
      commentary += `${opponent.name} tenta ${opponentTechnique.name} mas erra. `;
    }
    
    rounds.push({
      round,
      player1Technique: playerTechnique,
      player2Technique: opponentTechnique,
      player1Damage: playerDamage,
      player2Damage: opponentDamage,
      commentary
    });
    
    round++;
  }
  
  const player1Victory = currentOpponentHP <= 0 || currentPlayerHP > currentOpponentHP;
  const isDraw = currentPlayerHP === currentOpponentHP;
  
  return {
    id: `fight-${Date.now()}`,
    date: new Date().toISOString(),
    player1Id: player.id,
    player1Name: player.name,
    player1MartialArt: player.martialArt,
    player2Id: opponent.id,
    player2Name: opponent.name,
    player2MartialArt: opponent.martialArt,
    winnerId: isDraw ? null : (player1Victory ? player.id : opponent.id),
    isDraw,
    isPerfect: isPerfect && player1Victory,
    player1Damage: playerHP - currentPlayerHP,
    player2Damage: opponentHP - currentOpponentHP,
    rounds
  };
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      fightHistory: [],
      rankings: [],
      lastReset: new Date().toISOString(),
      isLoading: false,

      startFight: async () => {
        const fighter = useFighterStore.getState().fighter;
        if (!fighter) {
          toast.error('Você precisa criar um lutador primeiro!');
          return null;
        }
        
        if (fighter.fightCount >= 15) {
          toast.error('Você já atingiu o limite de 15 lutas diárias!');
          return null;
        }
        
        set({ isLoading: true });
        
        const opponent = generateOpponent(useFighterStore.getState().getFighterPower());
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const result = simulateFight(fighter, opponent);
        
        set(state => ({
          isLoading: false,
          fightHistory: [result, ...state.fightHistory]
        }));
        
        useFighterStore.getState().addFightResult(
          result.winnerId === fighter.id,
          result.isDraw
        );
        
        get().updateRankings();
        
        if (result.winnerId === fighter.id) {
          if (result.isPerfect) {
            toast.success('Você venceu com um PERFECT!', { autoClose: 5000 });
          } else {
            toast.success('Você venceu a luta!');
          }
        } else if (result.isDraw) {
          toast.info('A luta terminou em empate!');
        } else {
          toast.error('Você perdeu a luta!');
        }
        
        return result;
      },

      updateRankings: () => {
        const fighters = [];
        
        const playerFighter = useFighterStore.getState().fighter;
        if (playerFighter) {
          fighters.push(playerFighter);
        }
        
        for (let i = 0; i < 20; i++) {
          const power = 125 + Math.floor(Math.random() * 50);
          fighters.push(generateOpponent(power));
        }
        
        const rankings: RankingEntry[] = fighters.map(f => ({
          id: f.id,
          name: f.name,
          martialArt: f.martialArt,
          wins: f.wins,
          losses: f.losses,
          draws: f.draws,
          winPercentage: f.wins + f.losses + f.draws === 0 ? 0 :
            Math.round((f.wins / (f.wins + f.losses + f.draws)) * 100),
          totalPower: 
            f.attributes.resistance + 
            f.attributes.dexterity + 
            f.attributes.technique + 
            f.attributes.strength + 
            f.attributes.defense
        }));
        
        rankings.sort((a, b) => {
          if (b.wins !== a.wins) return b.wins - a.wins;
          return b.totalPower - a.totalPower;
        });
        
        set({ rankings });
      },

      checkForReset: () => {
        const lastReset = new Date(get().lastReset);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff >= 30) {
          set({
            fightHistory: [],
            rankings: [],
            lastReset: now.toISOString()
          });
          
          const fighter = useFighterStore.getState().fighter;
          if (fighter) {
            const martialArt = fighter.martialArt;
            const name = fighter.name;
            useFighterStore.getState().createFighter(name, martialArt);
          }
          
          toast.info('O jogo foi resetado para um novo ciclo de 30 dias!', { 
            autoClose: 8000 
          });
        }
        
        const lastFight = get().fightHistory[0];
        if (lastFight) {
          const lastFightDate = new Date(lastFight.date);
          const isNewDay = lastFightDate.getDate() !== now.getDate() ||
                          lastFightDate.getMonth() !== now.getMonth() ||
                          lastFightDate.getFullYear() !== now.getFullYear();
          
          if (isNewDay) {
            useFighterStore.getState().resetFightCount();
          }
        }
      }
    }),
    {
      name: 'game-storage',
      partialize: (state) => ({ 
        fightHistory: state.fightHistory,
        lastReset: state.lastReset
      })
    }
  )
);