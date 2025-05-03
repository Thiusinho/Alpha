import { MartialArt, Technique } from '../types';

export const martialArtsInfo: Record<MartialArt, {
  name: string;
  description: string;
  image: string;
}> = {
  karate: {
    name: 'Karatê',
    description: 'Arte marcial japonesa focada em golpes precisos e técnicas de bloqueio.',
    image: 'https://images.pexels.com/photos/7045617/pexels-photo-7045617.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  judô: {
    name: 'Judô',
    description: 'Arte marcial japonesa baseada em arremessos e imobilizações.',
    image: 'https://images.pexels.com/photos/6765028/pexels-photo-6765028.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  boxe: {
    name: 'Boxe',
    description: 'Arte do combate com os punhos, focada em golpes rápidos e potentes.',
    image: 'https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  muaythai: {
    name: 'Muay Thai',
    description: 'Arte marcial tailandesa conhecida como a "arte das oito armas".',
    image: 'https://images.pexels.com/photos/6203631/pexels-photo-6203631.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  jiujitsu: {
    name: 'Jiu-Jitsu',
    description: 'Arte marcial focada em técnicas de solo, chaves e estrangulamentos.',
    image: 'https://images.pexels.com/photos/9474234/pexels-photo-9474234.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  taekwondo: {
    name: 'Taekwondo',
    description: 'Arte marcial coreana conhecida por seus chutes altos e técnicas de perna.',
    image: 'https://images.pexels.com/photos/9583639/pexels-photo-9583639.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  kungfu: {
    name: 'Kung Fu',
    description: 'Conjunto de artes marciais chinesas com diversos estilos e técnicas.',
    image: 'https://images.pexels.com/photos/7045656/pexels-photo-7045656.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  capoeira: {
    name: 'Capoeira',
    description: 'Arte marcial brasileira que combina dança, acrobacia e música.',
    image: 'https://images.pexels.com/photos/7293138/pexels-photo-7293138.jpeg?auto=compress&cs=tinysrgb&w=1600'
  }
};

export const techniques: Technique[] = [
  // Karatê
  {
    id: 'k1',
    name: 'Gyaku Zuki',
    martialArt: 'karate',
    damage: 20,
    accuracy: 80,
    description: 'Soco reverso potente',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'k2',
    name: 'Mae Geri',
    martialArt: 'karate',
    damage: 15,
    accuracy: 85,
    description: 'Chute frontal',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'k3',
    name: 'Mawashi Geri',
    martialArt: 'karate',
    damage: 25,
    accuracy: 70,
    description: 'Chute circular',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'k4',
    name: 'Ushiro Geri',
    martialArt: 'karate',
    damage: 35,
    accuracy: 65,
    description: 'Chute para trás',
    requiredTechnique: 10,
    isSpecial: false
  },
  {
    id: 'k5',
    name: 'Sanbon Zuki',
    martialArt: 'karate',
    damage: 45,
    accuracy: 60,
    description: 'Sequência de três socos',
    requiredTechnique: 20,
    isSpecial: true
  },
  
  // Judô
  {
    id: 'j1',
    name: 'O Goshi',
    martialArt: 'judô',
    damage: 20,
    accuracy: 80,
    description: 'Arremesso de quadril',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'j2',
    name: 'Osoto Gari',
    martialArt: 'judô',
    damage: 25,
    accuracy: 75,
    description: 'Grande ceifada externa',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'j3',
    name: 'Ippon Seoi Nage',
    martialArt: 'judô',
    damage: 30,
    accuracy: 70,
    description: 'Arremesso pelo ombro',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'j4',
    name: 'Uchi Mata',
    martialArt: 'judô',
    damage: 40,
    accuracy: 65,
    description: 'Ceifada interna da coxa',
    requiredTechnique: 15,
    isSpecial: false
  },
  {
    id: 'j5',
    name: 'Tomoe Nage',
    martialArt: 'judô',
    damage: 50,
    accuracy: 55,
    description: 'Sacrifício circular',
    requiredTechnique: 25,
    isSpecial: true
  },
  
  // Boxe
  {
    id: 'b1',
    name: 'Jab',
    martialArt: 'boxe',
    damage: 10,
    accuracy: 90,
    description: 'Soco rápido de mão dianteira',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'b2',
    name: 'Direto',
    martialArt: 'boxe',
    damage: 20,
    accuracy: 80,
    description: 'Soco potente de mão traseira',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'b3',
    name: 'Gancho',
    martialArt: 'boxe',
    damage: 25,
    accuracy: 75,
    description: 'Soco ascendente',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'b4',
    name: 'Uppercut',
    martialArt: 'boxe',
    damage: 35,
    accuracy: 70,
    description: 'Soco vertical ascendente',
    requiredTechnique: 10,
    isSpecial: false
  },
  {
    id: 'b5',
    name: 'Combinação Devastadora',
    martialArt: 'boxe',
    damage: 55,
    accuracy: 60,
    description: 'Sequência de socos potentes',
    requiredTechnique: 20,
    isSpecial: true
  },
  
  // Muay Thai
  {
    id: 'm1',
    name: 'Jab-Direto',
    martialArt: 'muaythai',
    damage: 15,
    accuracy: 85,
    description: 'Combinação de socos rápidos',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'm2',
    name: 'Low Kick',
    martialArt: 'muaythai',
    damage: 20,
    accuracy: 80,
    description: 'Chute baixo na coxa',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'm3',
    name: 'Joelhada',
    martialArt: 'muaythai',
    damage: 25,
    accuracy: 75,
    description: 'Golpe com o joelho',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'm4',
    name: 'Clinch e Cotovelo',
    martialArt: 'muaythai',
    damage: 40,
    accuracy: 65,
    description: 'Agarramento seguido de cotoveladas',
    requiredTechnique: 15,
    isSpecial: false
  },
  {
    id: 'm5',
    name: 'Tornado Tailandês',
    martialArt: 'muaythai',
    damage: 50,
    accuracy: 55,
    description: 'Sequência devastadora de golpes',
    requiredTechnique: 25,
    isSpecial: true
  },
  
  // Jiu-Jitsu
  {
    id: 'jj1',
    name: 'Single Leg',
    martialArt: 'jiujitsu',
    damage: 15,
    accuracy: 85,
    description: 'Queda com controle de uma perna',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'jj2',
    name: 'Mata-Leão',
    martialArt: 'jiujitsu',
    damage: 25,
    accuracy: 70,
    description: 'Estrangulamento pelas costas',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'jj3',
    name: 'Kimura',
    martialArt: 'jiujitsu',
    damage: 30,
    accuracy: 65,
    description: 'Chave de ombro rotacional',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'jj4',
    name: 'Triângulo',
    martialArt: 'jiujitsu',
    damage: 40,
    accuracy: 60,
    description: 'Estrangulamento com as pernas',
    requiredTechnique: 15,
    isSpecial: false
  },
  {
    id: 'jj5',
    name: 'Berimbolo',
    martialArt: 'jiujitsu',
    damage: 45,
    accuracy: 55,
    description: 'Inversão de posição para ataque nas costas',
    requiredTechnique: 25,
    isSpecial: true
  },
  
  // Taekwondo
  {
    id: 't1',
    name: 'Ap Chagi',
    martialArt: 'taekwondo',
    damage: 15,
    accuracy: 85,
    description: 'Chute frontal',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 't2',
    name: 'Dollyeo Chagi',
    martialArt: 'taekwondo',
    damage: 20,
    accuracy: 80,
    description: 'Chute circular',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 't3',
    name: 'Naeryeo Chagi',
    martialArt: 'taekwondo',
    damage: 30,
    accuracy: 70,
    description: 'Chute de cima para baixo',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 't4',
    name: 'Dwi Chagi',
    martialArt: 'taekwondo',
    damage: 35,
    accuracy: 65,
    description: 'Chute giratório para trás',
    requiredTechnique: 15,
    isSpecial: false
  },
  {
    id: 't5',
    name: 'Combo Tornado',
    martialArt: 'taekwondo',
    damage: 55,
    accuracy: 50,
    description: 'Sequência de chutes giratórios',
    requiredTechnique: 25,
    isSpecial: true
  },
  
  // Kung Fu
  {
    id: 'kf1',
    name: 'Punho de Ferro',
    martialArt: 'kungfu',
    damage: 20,
    accuracy: 80,
    description: 'Golpe concentrado com o punho',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'kf2',
    name: 'Palma de Buda',
    martialArt: 'kungfu',
    damage: 25,
    accuracy: 75,
    description: 'Golpe com a palma da mão',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'kf3',
    name: 'Chute Circular',
    martialArt: 'kungfu',
    damage: 30,
    accuracy: 70,
    description: 'Chute em movimento circular',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'kf4',
    name: 'Punho Voador',
    martialArt: 'kungfu',
    damage: 40,
    accuracy: 60,
    description: 'Sequência acrobática com soco',
    requiredTechnique: 15,
    isSpecial: false
  },
  {
    id: 'kf5',
    name: 'Punho do Dragão',
    martialArt: 'kungfu',
    damage: 50,
    accuracy: 55,
    description: 'Técnica lendária de ataque',
    requiredTechnique: 25,
    isSpecial: true
  },
  
  // Capoeira
  {
    id: 'c1',
    name: 'Ginga',
    martialArt: 'capoeira',
    damage: 10,
    accuracy: 90,
    description: 'Movimento básico de esquiva',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'c2',
    name: 'Meia Lua',
    martialArt: 'capoeira',
    damage: 20,
    accuracy: 80,
    description: 'Chute semicircular rasteiro',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'c3',
    name: 'Armada',
    martialArt: 'capoeira',
    damage: 30,
    accuracy: 70,
    description: 'Chute giratório amplo',
    requiredTechnique: 0,
    isSpecial: false
  },
  {
    id: 'c4',
    name: 'Macaco',
    martialArt: 'capoeira',
    damage: 35,
    accuracy: 65,
    description: 'Movimentação acrobática de ataque',
    requiredTechnique: 15,
    isSpecial: false
  },
  {
    id: 'c5',
    name: 'Rabo de Arraia',
    martialArt: 'capoeira',
    damage: 45,
    accuracy: 60,
    description: 'Chute giratório reverso',
    requiredTechnique: 25,
    isSpecial: true
  }
];

export const getInitialTechniques = (martialArt: MartialArt): Technique[] => {
  return techniques
    .filter(t => t.martialArt === martialArt && t.requiredTechnique === 0)
    .slice(0, 3);
};

export const getAvailableTechniques = (martialArt: MartialArt, techniqueLevel: number): Technique[] => {
  return techniques.filter(t => 
    t.martialArt === martialArt && 
    t.requiredTechnique <= techniqueLevel
  );
};