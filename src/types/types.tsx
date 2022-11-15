// =====
// Store
// =====
export interface UserData {
  username: string;
  role: string;
  characters: Character[];
  main: Character | null;
}

export interface SetUserData {
  username?: string;
  role?: string;
  characters?: Character[];
  main?: Character | null;
}

export interface DefaultRes {
  message: string;
}

export interface SetDashboard {
  featuredChar: Character;
}

// ==========
// Login Page
// ==========
export interface LoginRes {
  message: string;
  role: string;
}

// ===============
// Characters Page
// ===============
export interface GetClassesRes {
  message: string;
  classes: string[];
}

export interface GetCharactersRes {
  message: string;
  characters: Character[];
  main: Character | null;
}

export interface Character {
  uuid: string;
  username: string;
  class_name: string;
  ign: string;
  level: number;
  tracking?: string;
  is_main: boolean;
  stats?: number;
  dojo?: number;
  ba?: number;
}

export interface CreateCharacterRes {
  message: string;
  character: Character;
}
