import styles from './VacanciesList.module.scss'
import {Divider} from "@mantine/core";
import InputVacancies from "./components/inputVacancy/InputVacancy.tsx";
import InputSkillsCity from "./components/inputSkillsCity/InputSkillsCity.tsx";



function VacanciesList() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerText}>
          <h1 className={styles.titleH1}>Список вакансий</h1>
          <h3 className={styles.titleH3}>по профессии Frontend-разработчик</h3>
        </div>
        <div className={styles.containerInputVacancies}>
          <InputVacancies />
        </div>
      </div>
      <Divider size='xs' className={styles.divider} />
      <div className={styles.container}>
        <InputSkillsCity />
      </div>
    </>
  )
}

export default VacanciesList;