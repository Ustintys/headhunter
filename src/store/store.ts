import {configureStore} from "@reduxjs/toolkit";
import vacanciesReducer from './slices/vacancySlice.ts'
import vacancyDitailReducer from './slices/vacancyDetailSlice.ts'


export const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer,
    vacancyDetails: vacancyDitailReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;