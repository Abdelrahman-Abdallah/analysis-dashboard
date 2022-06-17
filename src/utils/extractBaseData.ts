import { BaseData } from "./../types/common";
interface BaseProps {
  countries: string[];
  schools: string[];
  camps: string[];
}
export function extractBaseData(data: BaseData[]): BaseProps {
  const { countries, camps, schools } = data.reduce(
    (value, field) => {
      value.countries = [...new Set(value.countries.concat([field.country]))];
      value.schools = [...new Set(value.schools.concat([field.school]))];
      value.camps = [...new Set(value.camps.concat([field.camp]))];
      return value;
    },
    { countries: [], schools: [], camps: [] } as BaseProps
  );
  return {
    countries,
    camps,
    schools,
  };
}
