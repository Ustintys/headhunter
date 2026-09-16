import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

type VacancyJobState = {
  id: number;
  published_at: string;
  company_name: string;
  name: string;
  city: string;
  salary: string;
  skills: string;
  short_description: string;
  description: string;
  space: string;
  about_company: string;
  experience: string;
};

type VacancyStateWithIdResponse = {
  success: boolean;
  job: VacancyJobState;
};

type VacancyDetailSliceState = {
  vacancy: VacancyJobState | null;
  status: string;
  error: null | string;
}

const initialState: VacancyDetailSliceState = {
  vacancy: null,
  status: '',
  error: null,
}

export const fetchVacancyWithId = createAsyncThunk<VacancyStateWithIdResponse, number>(
  "vacancy/fetchVacancyWithId",

  async function (id, {rejectWithValue}){
    try {

      const response = await fetch(`https://kata-jobs.onrender.com/api/jobs/${id}`)

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

const vacancyDetailSlice = createSlice({
  name: 'vacancyDetail',

  initialState,

  reducers: {

  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchVacancyWithId.pending, (state) => {
        state.status = 'loading'
        state.error = null;
      })

      .addCase(fetchVacancyWithId.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.vacancy = action.payload.job;
      })

      .addCase(fetchVacancyWithId.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Unknown error';
      });
  }
})

export const {} = vacancyDetailSlice.actions;
export default vacancyDetailSlice.reducer