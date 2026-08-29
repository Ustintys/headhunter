import {Button, Group, TextInput} from "@mantine/core";
import styles from "./InputVacancy.module.scss";
import Sheard from '../../../../assets/icon/search.svg?react'

function InputVacancies() {
  return (
    <>
      <Group gap={12}>
        <TextInput
          className={styles.input}
          placeholder='Должность или название компании'
          leftSectionPointerEvents="none"
          leftSection={<Sheard/>}
        />
        <Button radius="sm" fw={400}>Найти</Button>
      </Group>
    </>
  )
}

export default InputVacancies;