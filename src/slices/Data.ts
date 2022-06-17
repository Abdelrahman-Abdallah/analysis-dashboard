import { BaseData } from "./../types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { getData } from "../lib/data";
import { extractBaseData } from "../utils/extractBaseData";

export interface DataState {
  data: BaseData[];
  selectedCountry: string;
  selectedSchool: string;
  selectedCamp: string;
  hiddenSchools: string[];
}

const initialState: DataState = {
  data: [],
  selectedCamp: "",
  selectedCountry: "",
  selectedSchool: "",
  hiddenSchools: [],
};

export const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<{ data: BaseData[]; selectedCountry: string; selectedCamp: string; selectedSchool: string }>): void => {
      const { data, selectedCamp, selectedCountry, selectedSchool } = action.payload;
      state.data = data;
      state.selectedCountry = selectedCountry;
      state.selectedCamp = selectedCamp;
      state.selectedSchool = selectedSchool;
    },
    setHiddenSchools: (state, action: PayloadAction<string[]>): void => {
      state.hiddenSchools = action.payload;
    },
    setSelectedSchool: (state, action: PayloadAction<string>): void => {
      state.selectedSchool = action.payload;
    },
    setSelectedCountry: (state, action: PayloadAction<string>): void => {
      state.selectedCountry = action.payload;
    },
    setSelectedCamp: (state, action: PayloadAction<string>): void => {
      state.selectedCamp = action.payload;
    },
  },
});

export const { addData, setSelectedCamp, setSelectedCountry, setHiddenSchools, setSelectedSchool } = DataSlice.actions;

export const fetchChartData =
  (): AppThunk =>
  async (dispatch, getState): Promise<void> => {
    try {
      if (getState().data.data.length > 0) return;
      const data = await getData();
      const { camps, countries, schools } = extractBaseData(data);
      dispatch(addData({ data: data, selectedCountry: countries[0], selectedCamp: camps[0], selectedSchool: schools[0] }));
    } catch (err) {
      console.log(err);
    }
  };

export default DataSlice.reducer;
