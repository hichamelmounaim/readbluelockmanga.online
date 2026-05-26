export interface Chapter {
  id: string;
  number: number;
  title: string;
  releaseDate: string;
  pages: string[];
}

export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  grade: string;
}

export interface Arc {
  id: string;
  title: string;
  description: string;
  chapterStart: number;
  chapterEnd: number;
  image: string;
}

export interface SEOMeta {
  title: string;
  description: string;
  schema?: object;
}

export interface Comment {
  id: string;
  user: string;
  content: string;
  date: string;
  likes: number;
}