import styles from './VacanciesList.module.scss'
import {Divider, Loader, Alert, Pagination} from "@mantine/core";
import InputVacancy from "./components/inputVacancy/InputVacancy.tsx";
import InputSkillsCity from "./components/inputSkillsCity/InputSkillsCity.tsx";
import CardVacancy from "./components/cardVacancy/CardVacancy.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {fetchVacancy} from "../../store/slices/vacancySlice.ts";



function VacanciesList() {

  const vacancies = useAppSelector(state => state.vacancies.vacancies?.jobs);
  const status = useAppSelector(state => state.vacancies.status);
  const pagination = useAppSelector(state => state.vacancies.vacancies?.pagination)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVacancy(1))
  }, [dispatch])

  return (
    <>
      <div className={styles.container}>

        <div className={styles.containerText}>
          <h1 className={styles.titleH1}>Список вакансий</h1>
          <h3 className={styles.titleH3}>по профессии Frontend-разработчик</h3>
        </div>

        <div className={styles.containerInputVacancies}>
          <InputVacancy />
        </div>

      </div>

      <Divider size='xs' className={styles.divider} />

      <div className={styles.containerCards}>

        <InputSkillsCity />

        <div>
          {status === 'loading' &&
            <Loader color="blue" size='xl' mr={300} mt={50} />}
          {status === 'error' &&
            <Alert w={500} mr={90} variant="light" color="red" title="Ошибка загрузки данных...">
              Мы не смогли получить информацию с сервера. Попробуйте обновить страницу или зайти позже.
            </Alert>}
          {status === 'resolved' &&
            <div>
              {vacancies?.map((vacancy) => (
                <div key={vacancy.id}>
                  <CardVacancy
                    id={vacancy.id}
                    name={vacancy.name}
                    experience={vacancy.experience}
                    city={vacancy.city}
                    company={vacancy.company_name}
                    space={vacancy.space}
                    salary={vacancy.salary}
                  />
                </div>
              ))}
              <div className={styles.pagination}>
                <Pagination onChange={(page) => {dispatch(fetchVacancy(page))}} value={pagination?.currentPage} total={Number(pagination?.totalPages)} radius="xs" withEdges />
              </div>
            </div>}
        </div>
      </div>
    </>
  )
}

export default VacanciesList;