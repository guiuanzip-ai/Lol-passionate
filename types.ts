
export interface Champion {
  id: string;
  name: string;
  title: string;
  role: string;
  image: string;
  lore: string;
  difficulty: number;
}

export interface BuildPart {
  name: string;
  description: string;
}

export enum AppState {
  HOME = 'HOME',
  DETAILS = 'DETAILS',
  SIGNUP = 'SIGNUP',
  REVEAL = 'REVEAL'
}
