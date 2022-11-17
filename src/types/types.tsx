// =====
// Store
// =====
export interface UserData {
  username: string;
  role: string;
  characters: Character[];
}

export interface DefaultRes {
  message: string;
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
}

export interface Character {
  uuid: string;
  username: string;
  class_name: string;
  ign: string;
  level: number;
  tracking: string;
  is_main: boolean;
  stats?: number;
  dojo?: number;
  ba?: number;
}

export interface CreateCharacterRes {
  message: string;
  character: Character;
}

// ============
// Dailies Page
// ============
export interface GetDailiesRes {
  message: string;
  dailies: Dailies;
}

export interface Dailies {
  uuid: string;
  character: string;
  date: string;
  is_current_day: boolean;
  dailies_list: string;
  dailies_done: string;
}

export interface GetWeekliesRes {
  message: string;
  weeklies: Weeklies;
}

export interface Weeklies {
  uuid: string;
  character: string;
  first_day_of_week: string;
  is_current_week: boolean;
  weeklies_list: string;
  weeklies_done: string;
}

export interface GetUrsusTourRes {
  message: string;
  ursus_tour: UrsusTour;
}

export interface UrsusTour {
  uuid: string;
  username: string;
  date: string;
  first_day_of_bossing_week: string;
  ursus: number;
  tour: number;
}
