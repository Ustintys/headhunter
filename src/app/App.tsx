import VacanciesList from "../modules/VacanciesList/VacanciesList.tsx";
import {
  Route, RouterProvider, createBrowserRouter,
  createRoutesFromElements, Navigate
} from "react-router";
import Layout from "../components/Layout/Layout.tsx";
import VacancyInfo from "../modules/VacancyInfo/VacancyInfo.tsx";
import NoteFound from "../components/404/NoteFound.tsx";
import AboutUser from "../modules/AboutUser/AboutUser.tsx";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>

      <Route index element={<Navigate to="/vacancies/moscow" replace />} />

      <Route path="vacancies">
        <Route path=":city">
          <Route index element={<VacanciesList />} />
          <Route path=":vacancyId" element={<VacancyInfo />} />
        </Route>
      </Route>

      <Route path="about" element={<AboutUser />}/>

      <Route path='*' element={<NoteFound />}/>
    </Route>
  ),
  {

    basename: import.meta.env.PROD ? '/headhunter' : '/',

  }
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
