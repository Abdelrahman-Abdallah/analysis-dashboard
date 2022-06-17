import { BaseSchoolData } from "./../utils/helpers";
import { BaseData } from "./../types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { getData } from "../lib/data";
import { extractBaseData } from "../utils/extractBaseData";
import { handleChangeCamp, handleChangeCountry, handleChangeSchool, TableBaseDataSet } from "src/utils/helpers";

export interface DataState {
  data: BaseData[];
  schools: string[];
  countries: string[];
  camps: string[];
  selectedCountry: string;
  selectedSchool: string;
  selectedCamp: string;
  chartInfo: TableBaseDataSet[];
  chartTitle: string;
  baseSchoolData: BaseSchoolData[];
  hiddenChartSchools: string[];
}

const initialState: DataState = {
  data: [],
  schools: [],
  countries: [],
  camps: [],
  selectedCamp: "",
  selectedCountry: "",
  selectedSchool: "",
  chartInfo: [],
  chartTitle: "",
  baseSchoolData: [],
  hiddenChartSchools: [],
};

export const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<{ data: BaseData[]; countries: string[]; camps: string[]; schools: string[] }>) => {
      const { camps, countries, data, schools } = action.payload;
      state.data = data;
      state.schools = ["show All", ...schools];
      state.countries = countries;
      state.camps = camps;
      state.selectedSchool = "Show All";
      state.selectedCountry = countries[0];
      state.selectedCamp = camps[0];
    },
    setHiddenSchools: (state, action: PayloadAction<string[]>): void => {
      state.hiddenChartSchools = action.payload;
    },
    setChartData: (
      state,
      action: PayloadAction<{
        camps: string[];
        chartData: TableBaseDataSet[];
        selectCamp: string;
        selectedCountry: string;
        selectedSchool: string;
        schools: string[];
        baseSchoolData: BaseSchoolData[];
      }>
    ): void => {
      const { camps, chartData, selectCamp, selectedCountry, selectedSchool, schools, baseSchoolData } = action.payload;
      state.camps = camps;
      state.chartInfo = chartData;
      state.selectedCamp = selectCamp;
      state.selectedCountry = selectedCountry;
      state.selectedSchool = selectedSchool;
      state.schools = schools;
      state.baseSchoolData = baseSchoolData;
      state.hiddenChartSchools = [];
    },
  },
});

export const { addData, setChartData, setHiddenSchools } = DataSlice.actions;

export const fetchChartData =
  (): AppThunk =>
  async (dispatch, getState): Promise<void> => {
    try {
      if (getState().data.data.length > 0) return;
      const data = await getData();
      const { camps, countries, schools } = extractBaseData(data);
      dispatch(addData({ data, camps, countries, schools }));
      const data1 = handleChangeCountry(countries[0], getState().data);
      dispatch(setChartData(data1));
    } catch (err) {
      console.log(err);
    }
  };

export const selectCountry =
  (country: string): AppThunk =>
  (dispatch, getState): void => {
    const data = handleChangeCountry(country, getState().data);
    dispatch(setChartData(data));
  };

export const selectSchoolName =
  (school: string): AppThunk =>
  (dispatch, getState): void => {
    const data = handleChangeSchool(school, getState().data);
    dispatch(setChartData(data));
  };
export const selectCamp =
  (camp: string): AppThunk =>
  (dispatch, getState): void => {
    const data = handleChangeCamp(camp, getState().data);
    dispatch(setChartData(data));
  };

export const toggleHiddenSchool =
  (schoolId: string): AppThunk =>
  (dispatch, getState): void => {
    const hiddenSchools = getState().data.hiddenChartSchools;
    const newHiddenSchools = hiddenSchools.includes(schoolId) ? hiddenSchools.filter((id) => id !== schoolId) : [...hiddenSchools, schoolId];
    dispatch(setHiddenSchools(newHiddenSchools));
  };

export default DataSlice.reducer;
