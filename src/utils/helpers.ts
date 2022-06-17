import { MONTHS, SHOW_ALL } from "./../constants";
import { DataState } from "src/slices/Data";
import { BaseData } from "src/types/common";

interface BaseItemsSelect {
  camps: string[];
  schools: string[];
  rawFileredSchoolData: BaseData[];
  selectedSchool: string;
}

export interface BaseSchoolData {
  schoolName: string;
  totalLessons: number;
  months: string[];
  campName: string;
}

export interface TableBaseDataSet {
  id: string;
  label: string;
  data: number[];
  fill?: boolean;
  borderColor: string;
  tension?: number;
}

export function handleChangeCamp(campId: string, state: DataState) {
  const { selectedCountry, selectedSchool, data } = state;
  return handleProcessState(selectedCountry, campId, selectedSchool, data);
}
export function handleChangeCountry(countryId: string, state: DataState) {
  const { selectedCamp, selectedSchool, data } = state;
  return handleProcessState(countryId, selectedCamp, selectedSchool, data);
}
export function handleChangeSchool(schoolId: string, state: DataState) {
  const { selectedCountry, selectedCamp, data } = state;
  return handleProcessState(selectedCountry, selectedCamp, schoolId, data);
}

function getCurrentlySelected(selectedCountry: string, selectCamp: string, selectedSchool: string, data: BaseData[]): BaseItemsSelect {
  let modifiedSelectedSchool = selectedSchool;

  let rawData = data.filter((field) => field.country === selectedCountry && field.camp === selectCamp);

  const camps = [...new Set(data.filter((field) => field.country === selectedCountry).map((item) => item.camp))];

  const schools = [SHOW_ALL].concat([...new Set(rawData.map((field) => field.school))]);

  if (selectedSchool !== SHOW_ALL && schools.includes(modifiedSelectedSchool)) {
    rawData = rawData.filter((field) => field.school === modifiedSelectedSchool);
  } else {
    modifiedSelectedSchool = SHOW_ALL;
  }

  return {
    camps,
    schools,
    rawFileredSchoolData: rawData,
    selectedSchool: modifiedSelectedSchool,
  };
}

function generateTableDataSet(schoolsData: BaseSchoolData[]): TableBaseDataSet[] {
  const campTotalLessons = schoolsData.reduce((acc, data) => acc + data.totalLessons, 0);
  return schoolsData.reduce((acc, school) => {
    const data = school.months.map((month) => +month.split("/").pop());
    // const borderColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    const borderColor = "#000";

    acc = [...acc, { id: school.schoolName, data, label: `${school.schoolName},${((school.totalLessons / campTotalLessons) * 100).toFixed(2)}`, borderColor }];
    return acc;
  }, [] as TableBaseDataSet[]);
}

export function generateBaseSchoolData(rawSchoolData: BaseData[]): BaseSchoolData[] {
  const schoolsNames = [...new Set(rawSchoolData.map((data) => data.school))];
  return schoolsNames.reduce((acc, school) => {
    let schoolLessons = 0;
    const months = MONTHS.map((month) => {
      const monthData = rawSchoolData.find((data) => data.school === school && data.month === month);
      if (!monthData) return "404/0";
      schoolLessons += monthData.lessons;
      return `${monthData.id}/${monthData.lessons}`;
    });

    const rawData = rawSchoolData.find((item) => item.school === school).camp;
    acc = [...acc, { schoolName: school, months, totalLessons: schoolLessons, campName: rawData }];

    return acc;
  }, [] as BaseSchoolData[]);
}

/**
 *
 * @param selectedCountry the currenlty selected country
 * @param selectCamp the currently selected camp
 * @param selectedSchool the currently selected school
 * @param data raw data the get from the
 */
export function handleProcessState(selectedCountry: string, selectCamp: string, selectedSchool: string, data: BaseData[]) {
  const { camps, rawFileredSchoolData, schools, selectedSchool: modifiedSchoolName } = getCurrentlySelected(selectedCountry, selectCamp, selectedSchool, data);

  const tableData = generateBaseSchoolData(rawFileredSchoolData);
  const chartData = generateTableDataSet(tableData);

  return {
    chartData,
    selectCamp,
    selectedSchool: modifiedSchoolName,
    schools,
    selectedCountry,
    camps,
    baseSchoolData: tableData,
  };
}
