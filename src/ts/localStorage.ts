import { IMovieData } from "./interfaces";

export function setLocalStorage (key: string, data: IMovieData[]): void {
  localStorage.setItem(key, JSON.stringify(data));
};

export function getLocalStorage (key: string): IMovieData[] {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : [];  
};

export const store: IMovieData[] = getLocalStorage('favorite');