import { BaseData } from "src/types/common";

export const getData = async (): Promise<BaseData[]> => {
  const response = await fetch("https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json");
  const data = await response.json();
  // return [{ id: "ddfdfd", month: "May", camp: "omaka", school: "suze", country: "egypt", lessons: 10 }];
  return data as BaseData[];
};
