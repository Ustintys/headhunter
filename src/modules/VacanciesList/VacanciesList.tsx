import styles from './VacanciesList.module.scss'
import {Divider} from "@mantine/core";
import InputVacancy from "./components/inputVacancy/InputVacancy.tsx";
import InputSkillsCity from "./components/inputSkillsCity/InputSkillsCity.tsx";
import CardVacancy from "./components/cardVacancy/CardVacancy.tsx";



function VacanciesList() {

  const mas = [1,1,1,1,1,1,1,1,1,1]

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
          {mas.map(() => (
            <CardVacancy />
          ))}
        </div>
      </div>
    </>
  )
}

export default VacanciesList;