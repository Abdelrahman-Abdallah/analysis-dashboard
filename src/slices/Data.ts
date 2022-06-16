import { BaseData } from "./../types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store/index";
import { getData } from "../lib/data";

interface DateState {
  data: BaseData[];
  schools: string[];
  countries: string[];
  camp: string[];
  selectedCountry: string;
  selectSchool: string;
  selectedCamp: string;
}

const initialState: DateState = {
  data: [],
  schools: [],
  countries: [],
  camp: [],
  selectedCamp: "",
  selectedCountry: "",
  selectSchool: "",
};

export const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<{ data: BaseData[]; schools: string[]; countries: string[]; camp: string[] }>) => {
      const { camp, countries, data, schools } = action.payload;
      state.data = data;
      state.schools = ["show All", ...schools];
      state.countries = countries;
      state.camp = camp;
      state.selectSchool = "Show All";
      state.selectedCountry = countries[0];
      state.selectedCamp = camp[0];
    },
  },
});

export const { addData } = DataSlice.actions;

export const fetchChartData =
  (): AppThunk =>
  async (dispatch, getState): Promise<void> => {
    try {
      if (getState().data.data.length > 0) {
        return;
      }

      const data = await getData();
      const {
        country: countries,
        camp,
        school: schools,
      } = data.reduce(
        (value, field) => {
          value.country = [...new Set(value.country.concat([field.country]))];
          value.school = [...new Set(value.school.concat([field.school]))];
          value.camp = [...new Set(value.camp.concat([field.camp]))];
          return value;
        },
        { country: [], school: [], camp: [] } as { country: string[]; school: string[]; camp: string[] }
      );

      console.log("🚀 ~ file: Data.ts ~ line 35 ~ data", data);
      dispatch(addData({ data, countries, camp, schools }));
    } catch (err) {
      console.log(err);
    }
  };

export default DataSlice.reducer;
