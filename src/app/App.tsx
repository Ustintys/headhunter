import VacanciesList from "../modules/VacanciesList/VacanciesList.tsx";
import {Route, Routes} from "react-router";
import Layout from "../components/Layout/Layout.tsx";
import VacancyInfo from "../modules/VacancyInfo/VacancyInfo.tsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<VacanciesList />} />
          <Route path={':vacancyId'} element={<VacancyInfo />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
