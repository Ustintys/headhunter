import styles from './VacancyInfo.module.scss';
import CardVacancy from "../../components/cardVacancy/CardVacancy.tsx";
import {Alert, Card, Loader, Text} from "@mantine/core";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {fetchVacancyWithId} from "../../store/slices/vacancyDetailSlice.ts";
import {useParams} from "react-router";

function VacancyInfo() {

  const dispatch = useAppDispatch();
  const {vacancyId} = useParams();

  const vacancyData = useAppSelector(state => state.vacancyDetails.vacancy);
  const status = useAppSelector(state => state.vacancyDetails.status);

  useEffect(() => {
    dispatch(fetchVacancyWithId(Number(vacancyId)))
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {status === "loading" && <Loader color="blue" size='xl' mt={200} className={styles.loader} />}
      {status === 'error' &&
        <Alert w={500} mr={90} variant="light" color="red" title="Ошибка загрузки данных...">
          Мы не смогли получить информацию с сервера. Попробуйте обновить страницу или зайти позже.
        </Alert>}
      {status === 'resolved' && vacancyData &&
      <div>
        <CardVacancy
          id={vacancyData.id}
          name={vacancyData.name}
          experience={vacancyData.experience}
          city={vacancyData.city}
          company={vacancyData.company_name}
          space={vacancyData.space}
          salary={vacancyData.salary}
          mode='INFO'
        />
        <Card padding={24} className={styles.containerInfo}>
          <h2 className={styles.h2}>{vacancyData.company_name}</h2>
          <Text className={styles.text}>{vacancyData.about_company}</Text>
          <h4 className={styles.h4}>О вакансии:</h4>
          <Text className={styles.text}>{vacancyData.description}</Text>
        </Card>
      </div>
      }
    </div>
  )
}

export default VacancyInfo;