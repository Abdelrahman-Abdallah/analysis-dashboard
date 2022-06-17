export interface BaseData {
  id: string;
  month: string;
  camp: string;
  country: string;
  school: string;
  lessons: number;
}

export interface DataStateChange {
  country: string;
  school: string;
  camp: string;
  schools: string[];
  camps: string[];
}
