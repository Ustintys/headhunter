import styles from './VacanciesList.module.scss'
import {Divider, Loader, Alert, Pagination, Tabs} from "@mantine/core";
import InputVacancy from "./components/inputVacancy/InputVacancy.tsx";
import InputSkillsCity from "./components/inputSkillsCity/InputSkillsCity.tsx";
import CardVacancy from "../../components/cardVacancy/CardVacancy.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {fetchVacancy, setValueInputCity, setValueInputVacancy, setSkills} from "../../store/slices/vacancySlice.ts";
import {useNavigate, useParams, useSearchParams} from 'react-router';
import type {City} from "../../store/slices/vacancySlice.ts";
import NoteFound from "../../components/404/NoteFound.tsx";


function VacanciesList() {

  const vacancies = useAppSelector(state => state.vacancies.vacancies?.jobs);
  const status = useAppSelector(state => state.vacancies.status);
  const pagination = useAppSelector(state => state.vacancies.vacancies?.pagination)
  const valueInputVacancy = useAppSelector(state => state.vacancies.valueInputVacancy)
  const valueInputCity = useAppSelector(state => state.vacancies.valueInputCity);
  const reduxSkills = useAppSelector(state => state.vacancies.skills)
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const { city } = useParams();

  if (city !== 'moscow' && city !== 'petersburg') {
    return <NoteFound />;
  }

  const selectedCity: City =
    city === 'moscow'
      ? 'Москва'
      : 'Санкт-Петербург';

  useEffect(() => {
    const search = searchParams.get('search') ?? '';

    const skillsParam = searchParams.get('skills');
    let skills: string[];
    if(skillsParam === null){
      skills = reduxSkills
    } else if(skillsParam === ''){
      skills = [];
    } else {
      skills = skillsParam.split(',');
    }

    dispatch(setValueInputVacancy(search));
    dispatch(setValueInputCity(selectedCity));
    dispatch(setSkills(skills));

    dispatch(fetchVacancy({
      page: 1,
      search,
      city: selectedCity,
      skills,
    }));
  }, [dispatch, searchParams, selectedCity]);

  useEffect(() => {
    if(searchParams.has('search')){
      return
    }

    setSearchParams({
      search: valueInputVacancy,
      skills: reduxSkills.join(','),
    })
  }, []);

  function handleSearch() {
    setSearchParams({
        search: valueInputVacancy,
        skills: reduxSkills.join(','),
    });
  }

  function handleSkillsChange(newSkills: string[]) {
    setSearchParams({
      search: valueInputVacancy,
      skills: newSkills.join(','),
    });
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

      <div className={styles.containerTabs}>
        <Tabs
          className={styles.Tabs}
          value={city}
          onChange={(value)=>{
            if (value === 'moscow') {
              navigate('/vacancies/moscow');
              setSearchParams({
                search: valueInputVacancy,
                skills: reduxSkills.join(','),
              });
            }

            if (value === 'petersburg') {
              navigate('/vacancies/petersburg');
              setSearchParams({
                search: valueInputVacancy,
                skills: reduxSkills.join(','),
              });
            }
          }}
        >
          <Tabs.List>
            <Tabs.Tab value="moscow" fw={400}>Москва</Tabs.Tab>
            <Tabs.Tab value="petersburg" fw={400}>Санкт-Петербург</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>

      <div className={styles.containerCards}>

        <InputSkillsCity handleSkillsChange={handleSkillsChange} />

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
                <Pagination classNames={{root: styles.paginationRoot}} onChange={(page) => {dispatch(fetchVacancy({page: page, search: valueInputVacancy, city: valueInputCity, skills: reduxSkills}))}} value={pagination?.currentPage} total={Number(pagination?.totalPages)} radius="xs" withEdges />
              </div>
            </div>}
        </div>
      </div>
    </>
  )
}

export default VacanciesList;