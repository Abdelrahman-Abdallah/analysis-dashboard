import { BaseData } from "./../types/common";

export async function getData(): Promise<BaseData[]> {
  const response = await fetch("https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json");
  const data = await response.json();
  return data as BaseData[];
}
