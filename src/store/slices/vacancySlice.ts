import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

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

type VacanciesSliceState = {
  vacancies: FetchState | null,
  status: string,
  error: string | null,
}

const initialState: VacanciesSliceState = {
  vacancies: null,
  status: '',
  error: null,
}

export const fetchVacancy = createAsyncThunk<FetchState, number>(
  "vacancy/fetchVacancy",

  async function (page, {rejectWithValue}){
    try {
      const response = await fetch(`https://kata-jobs.onrender.com/api/jobs?page=${page}`)

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
      })

      .addCase(fetchVacancy.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Unknown error';
      });
  }

});

export const {} = vacancySlice.actions;
export default vacancySlice.reducer;