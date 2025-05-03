import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Fighter, MartialArt, Attributes, Technique } from '../types';
import { getInitialTechniques } from '../data/martialArts';
import { toast } from 'react-toastify';
import { useAuthStore } from './authStore';

interface FighterState {
  fighter: Fighter | null;
  isLoading: boolean;
  createFighter: (name: string, martialArt: MartialArt) => void;
  updateAttributes: (attributes: Attributes) => void;
  activateTechnique: (techniqueId: string) => void;
  deactivateTechnique: (techniqueId: string) => void;
  learnTechnique: (technique: Technique) => void;
  addFightResult: (won: boolean, isDraw: boolean) => void;
  resetFightCount: () => void;
  getFighterPower: () => number;
}

const initialAttributes: Attributes = {
  resistance: 25,
  dexterity: 25,
  technique: 25,
  strength: 25,
  defense: 25,
  unallocated: 25
};

export const useFighterStore = create<FighterState>()(
  persist(
    (set, get) => ({
      fighter: null,
      isLoading: false,

      createFighter: (name: string, martialArt: MartialArt) => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        const initialTechniques = getInitialTechniques(martialArt);
        
        const newFighter: Fighter = {
          id: `fighter-${Date.now()}`,
          userId: user.id,
          name,
          martialArt,
          attributes: { ...initialAttributes },
          techniques: initialTechniques,
          activeTechniques: initialTechniques.map(t => t.id),
          wins: 0,
          losses: 0,
          draws: 0,
          ranking: 1000,
          fightCount: 0
        };
        
        set({ fighter: newFighter });
        toast.success('Lutador criado com sucesso!');
      },

      updateAttributes: (attributes: Attributes) => {
        const total = 
          attributes.resistance + 
          attributes.dexterity + 
          attributes.technique + 
          attributes.strength + 
          attributes.defense + 
          attributes.unallocated;
        
        const fighter = get().fighter;
        if (!fighter) return;
        
        const expectedTotal = fighter.wins * 25 + fighter.losses * 15 + 150; // Base (125) + unallocated (25)
        
        if (total !== expectedTotal) {
          toast.error('Distribuição de pontos inválida!');
          return;
        }
        
        set(state => ({
          fighter: state.fighter ? {
            ...state.fighter,
            attributes
          } : null
        }));
        
        toast.success('Atributos atualizados!');
      },

      activateTechnique: (techniqueId: string) => {
        set(state => {
          if (!state.fighter) return state;
          
          if (state.fighter.activeTechniques.length >= 5 && 
              !state.fighter.activeTechniques.includes(techniqueId)) {
            toast.error('Você só pode ter 5 técnicas ativas!');
            return state;
          }
          
          if (!state.fighter.techniques.some(t => t.id === techniqueId)) {
            return state;
          }
          
          if (state.fighter.activeTechniques.includes(techniqueId)) {
            return state;
          }
          
          return {
            fighter: {
              ...state.fighter,
              activeTechniques: [...state.fighter.activeTechniques, techniqueId]
            }
          };
        });
      },

      deactivateTechnique: (techniqueId: string) => {
        set(state => {
          if (!state.fighter) return state;
          
          if (state.fighter.activeTechniques.length <= 3) {
            toast.error('Você precisa ter pelo menos 3 técnicas ativas!');
            return state;
          }
          
          return {
            fighter: {
              ...state.fighter,
              activeTechniques: state.fighter.activeTechniques.filter(id => id !== techniqueId)
            }
          };
        });
      },

      learnTechnique: (technique: Technique) => {
        set(state => {
          if (!state.fighter) return state;
          
          if (state.fighter.techniques.some(t => t.id === technique.id)) {
            toast.info('Você já conhece esta técnica!');
            return state;
          }
          
          if (state.fighter.attributes.technique < technique.requiredTechnique) {
            toast.error(`Você precisa de ${technique.requiredTechnique} pontos de técnica!`);
            return state;
          }
          
          return {
            fighter: {
              ...state.fighter,
              techniques: [...state.fighter.techniques, technique]
            }
          };
        });
        
        toast.success(`Você aprendeu ${technique.name}!`);
      },

      addFightResult: (won: boolean, isDraw: boolean) => {
        set(state => {
          if (!state.fighter) return state;
          
          let newRanking = state.fighter.ranking;
          let attributePoints = state.fighter.attributes.unallocated;
          
          if (won) {
            newRanking += 15;
            attributePoints += 25; // 25 points for winning
            toast.success('Você ganhou 25 pontos de atributo pela vitória!');
          } else if (isDraw) {
            newRanking += 5;
          } else {
            newRanking -= 10;
            attributePoints += 15; // 15 points for losing
            toast.info('Você ganhou 15 pontos de atributo pela derrota!');
          }
          
          return {
            fighter: {
              ...state.fighter,
              wins: isDraw ? state.fighter.wins : won ? state.fighter.wins + 1 : state.fighter.wins,
              losses: isDraw ? state.fighter.losses : won ? state.fighter.losses : state.fighter.losses + 1,
              draws: isDraw ? state.fighter.draws + 1 : state.fighter.draws,
              ranking: newRanking,
              fightCount: state.fighter.fightCount + 1,
              attributes: {
                ...state.fighter.attributes,
                unallocated: attributePoints
              }
            }
          };
        });
      },

      resetFightCount: () => {
        set(state => ({
          fighter: state.fighter ? {
            ...state.fighter,
            fightCount: 0
          } : null
        }));
      },

      getFighterPower: () => {
        const fighter = get().fighter;
        if (!fighter) return 0;
        
        return fighter.attributes.resistance + 
               fighter.attributes.dexterity + 
               fighter.attributes.technique + 
               fighter.attributes.strength + 
               fighter.attributes.defense;
      }
    }),
    {
      name: 'fighter-storage',
      partialize: (state) => ({ fighter: state.fighter })
    }
  )
);