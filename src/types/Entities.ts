export interface Location {
  name: string;
  type: string;
  dimension: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  location?: Location;
  origin?: {
    name: string;
    type?: string;
    dimension?: string;
  };
  episode?: Array<string>
  image: string;
  
}

export interface Pagination<T> {
  results: T[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}