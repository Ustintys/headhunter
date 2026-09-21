import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from "@reduxjs/toolkit";
import type {RootState} from "../store.ts";

type VacancyState = {
  id: number,
  company_name: string,
  name: string,
  city: string,
  salary: string,
  published_at: string,
  short_description: string,
  space: string,
  skills: string,
  experience: string
}

type PaginationState = {
  currentPage: number,
  totalPages: number,
  totalItems: number,
  itemsPerPage: number,
  hasNextPage: boolean,
  hasPrevPage: boolean,
}

type FetchState = {
  jobs: VacancyState[],
  pagination: PaginationState,
  success: boolean,
}

export type City = 'Москва' | 'Санкт-Петербург';

type FetchArg = {
  page: number,
  search?: string,
  city?: City,
  skills: string[],
}

type VacanciesSliceState = {
  vacancies: FetchState | null,
  status: string,
  error: string | null,
  valueInputVacancy: string,
  valueInputCity: City,
  valueInputPills: string,
  skills: string[],
}

const initialState: VacanciesSliceState = {
  vacancies: null,
  status: '',
  error: null,
  valueInputVacancy: '',
  valueInputCity: 'Москва',
  valueInputPills: '',
  skills: ['JavaScript', 'React', 'Redux', 'ReduxToolkit', 'Nextjs'],
}

export const fetchVacancy = createAsyncThunk<FetchState, FetchArg>(
  "vacancy/fetchVacancy",

  async function ({page, search, city, skills}, {rejectWithValue, getState}){
    try {

      const state = getState() as RootState;

      const params = new URLSearchParams();

      params.set("page", String(page));


      if (city){
        params.set("city", city);
      }

      if (search) {
        params.set("search", search);
      }

      if(state.vacancies.skills.length > 0){
        const skillsString = skills.join(',');
        params.set('skills', skillsString);
      }

      const response = await fetch(`https://kata-jobs.onrender.com/api/jobs?${params}`)

      if(!response.ok){
        throw new Error('Unknown error')
      }

      return response.json()
    }
    catch (error){
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Неизвестная ошибка');
    }
  }
)

const vacancySlice = createSlice({
  name: 'vacancy',

  initialState,

  reducers:{

    setValueInputVacancy(state, action: PayloadAction<string>){
      state.valueInputVacancy = action.payload;
    },

    setValueInputCity(state, action: PayloadAction<City>){
      state.valueInputCity = action.payload;
    },

    setValueInputPills(state, action: PayloadAction<string>){
      state.valueInputPills = action.payload;
    },

    addSkills(state, action: PayloadAction<string>){

      const skill = action.payload;
      const overlap = state.skills.find((skill) => skill.toLowerCase() === state.valueInputPills.toLowerCase());

      if (overlap){
        state.valueInputPills = '';
        return
      } else {
        state.skills.push(skill.trim());
      }
      state.valueInputPills = '';
    },

    deleteSkills(state, action: PayloadAction<string>){
      state.skills = state.skills.filter((skill) => skill !== action.payload);
    },

    setSkills(state, action: PayloadAction<string[]>) {
      state.skills = action.payload;
    }

  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchVacancy.pending, (state) => {
        state.status = 'loading'
        state.error = null;
      })

      .addCase(fetchVacancy.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.vacancies = action.payload;
        if(state.vacancies.jobs.length === 0){
          state.status = 'empty'
        }
      })

      .addCase(fetchVacancy.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Unknown error';
      });
  }

});

export const {setValueInputVacancy, setValueInputCity, setValueInputPills, addSkills, deleteSkills, setSkills} = vacancySlice.actions;
export default vacancySlice.reducer;