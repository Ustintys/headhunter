import {Button, Group, TextInput} from "@mantine/core";
import styles from "./InputVacancy.module.scss";
import Sheard from '../../../../assets/icon/search.svg?react'
import {useAppDispatch, useAppSelector} from "../../../../store/hooks.ts";
import {fetchVacancy, setValueInputVacancy} from "../../../../store/slices/vacancySlice.ts";

function InputVacancy() {

  const dispatch = useAppDispatch();
  const valueInputVacancy = useAppSelector(state => state.vacancies.valueInputVacancy);
  const valueInputCity = useAppSelector(state => state.vacancies.valueInputCity)

  return (
    <>
      <Group gap={12}>
        <TextInput
          className={styles.input}
          placeholder='Должность или название компании'
          leftSectionPointerEvents="none"
          leftSection={<Sheard/>}
          onChange={(event) => {dispatch(setValueInputVacancy(event.target.value))}}
          value={valueInputVacancy}
        />
        <Button onClick={() => {dispatch(fetchVacancy({page: 1, search: valueInputVacancy, city: valueInputCity}))}} radius="sm" fw={400}>Найти</Button>
      </Group>
    </>
  )
}

export default InputVacancy;