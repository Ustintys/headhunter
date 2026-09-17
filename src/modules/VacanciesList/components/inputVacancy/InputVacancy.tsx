import {Button, Group, TextInput} from "@mantine/core";
import styles from "./InputVacancy.module.scss";
import Sheard from '../../../../assets/icon/search.svg?react'
import {useAppDispatch, useAppSelector} from "../../../../store/hooks.ts";
import {setValueInputVacancy} from "../../../../store/slices/vacancySlice.ts";


type InputVacancyProps = {
  handleSearch: () => void;
}

function InputVacancy({ handleSearch }: InputVacancyProps){

  const dispatch = useAppDispatch();
  const valueInputVacancy = useAppSelector(state => state.vacancies.valueInputVacancy);

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
        <Button onClick={handleSearch} radius="sm" fw={400}>Найти</Button>
      </Group>
    </>
  )
}

export default InputVacancy;