import styles from './VacanciesList.module.scss'
import {Divider, Loader, Alert, Pagination} from "@mantine/core";
import InputVacancy from "./components/inputVacancy/InputVacancy.tsx";
import InputSkillsCity from "./components/inputSkillsCity/InputSkillsCity.tsx";
import CardVacancy from "../../components/cardVacancy/CardVacancy.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {fetchVacancy, setValueInputCity, setValueInputVacancy, setSkills} from "../../store/slices/vacancySlice.ts";
import { useSearchParams } from 'react-router';
import type {City} from "../../store/slices/vacancySlice.ts";


function VacanciesList() {

  const vacancies = useAppSelector(state => state.vacancies.vacancies?.jobs);
  const status = useAppSelector(state => state.vacancies.status);
  const pagination = useAppSelector(state => state.vacancies.vacancies?.pagination)
  const valueInputVacancy = useAppSelector(state => state.vacancies.valueInputVacancy)
  const valueInputCity = useAppSelector(state => state.vacancies.valueInputCity);
  const skills = useAppSelector(state => state.vacancies.skills)
  const reduxSkills = useAppSelector(state => state.vacancies.skills)
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();



  useEffect(() => {
    const search = searchParams.get('search') ?? '';

    const cityParam = searchParams.get('city');
    const city: City =
      cityParam === 'Москва' || cityParam === 'Санкт-Петербург'
        ? cityParam
        : 'Все города';

    const skillsParam = searchParams.get('skills');
    const skills = skillsParam
      ? skillsParam.split(',')
      : reduxSkills;

    dispatch(setValueInputVacancy(search));
    dispatch(setValueInputCity(city));
    dispatch(setSkills(skills));

    dispatch(fetchVacancy({
      page: 1,
      search,
      city,
      skills,
    }));
  }, [dispatch, searchParams]);

  useEffect(() => {

    const search = searchParams.get('search') ?? valueInputVacancy;

    const cityParam = searchParams.get('city');
    const city: City =
      cityParam === 'Москва' || cityParam === 'Санкт-Петербург'
        ? cityParam
        : 'Все города';

    const skillsParam = searchParams.get('skills');
    const skills = skillsParam
      ? skillsParam.split(',')
      : reduxSkills;


    setSearchParams({
      search: search,
      city: city,
      skills: skills.join(','),
    })
  }, []);

  function handleSearch() {
    setSearchParams({
        search: valueInputVacancy,
        city: valueInputCity,
        skills: skills.join(','),
    });
  }

  function handleSkillsChange(newSkills: string[]) {
    setSearchParams({
      search: valueInputVacancy,
      city: valueInputCity,
      skills: newSkills.join(','),
    });
  }

  function handleSearchCityChange(newCity: City) {
    setSearchParams({
      search: valueInputVacancy,
      city: newCity,
      skills: skills.join(','),
    })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerText}>
          <h1 className={styles.titleH1}>Список вакансий</h1>
          <h3 className={styles.titleH3}>по профессии Frontend-разработчик</h3>
        </div>

        <div className={styles.containerInputVacancies}>
          <InputVacancy handleSearch={handleSearch} />
        </div>
      </div>

      <Divider size='xs' className={styles.divider} />

      <div className={styles.containerCards}>

        <InputSkillsCity handleSkillsChange={handleSkillsChange} handleSearchCityChange={handleSearchCityChange} />

        <div>
          {status === 'loading' &&
            <Loader color="blue" size='xl' mr={300} mt={50} />}
          {status === 'error' &&
            <Alert w={500} mr={90} variant="light" color="red" title="Ошибка загрузки данных...">
              Мы не смогли получить информацию с сервера. Попробуйте обновить страницу или зайти позже.
            </Alert>}
          {status === 'empty' &&
            <Alert w={500} mr={90} variant="light" color="red" title="По вышему запросу ничего не найдено">
              Попробуйте изменить параметры поиска.
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
                    mode={'BTN'}
                  />
                </div>
              ))}
              <div className={styles.paginationDiv}>
                <Pagination classNames={{root: styles.paginationRoot}} onChange={(page) => {dispatch(fetchVacancy({page: page, search: valueInputVacancy, city: valueInputCity, skills: skills}))}} value={pagination?.currentPage} total={Number(pagination?.totalPages)} radius="xs" withEdges />
              </div>
            </div>}
        </div>
      </div>
    </>
  )
}

export default VacanciesList;