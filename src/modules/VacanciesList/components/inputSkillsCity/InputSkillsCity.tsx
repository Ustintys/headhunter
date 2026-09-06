import styles from './InputSkillsCity.module.scss';
import {
  ActionIcon,
  Group,
  Pill,
  PillGroup,
  PillsInput,
  Text,
  NativeSelect
} from "@mantine/core";
import Plus from '../../../../assets/icon/plus.svg?react';
import LocationIcon from '../../../../assets/icon/location.svg?react';
import {useAppDispatch, useAppSelector} from "../../../../store/hooks.ts";
import {
  addSkills,
  type City,
  setValueInputCity, setValueInputPills
} from "../../../../store/slices/vacancySlice.ts";
import {useState} from "react";

function InputSkillsCity(){

  const dispatch = useAppDispatch();
  const value = useAppSelector(state => state.vacancies.valueInputCity);
  const skills = useAppSelector(state => state.vacancies.skills);
  const valueInputPills = useAppSelector(state => state.vacancies.valueInputPills);

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  function checkValueInputPills(value: string){
    if(value != ''){
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerSkills}>

        <Text className={styles.skillsText} fw={600}>Ключевые навыки</Text>

        <Group justify='space-between' gap={8}>
          <PillsInput w={227} size='xs'>
            <PillsInput.Field placeholder="Навык"
                              value={valueInputPills}
                              onChange={(event) => {
                                dispatch(setValueInputPills(event.currentTarget.value));
                                checkValueInputPills(event.currentTarget.value);
                              }}
            />
          </PillsInput>
          <ActionIcon onClick={()=>{dispatch(addSkills(valueInputPills))}} w={34} h={30} disabled={isDisabled} className={styles.plusBtn}>
            <Plus />
          </ActionIcon>
        </Group>

        <PillGroup mt={12} w={230}>
          {skills.map((skill ) => (
            <Pill key={skill} withRemoveButton classNames={{label: styles.pillLabel, remove: styles.pillCross}}>{skill}</Pill>
          ))}
        </PillGroup>

      </div>
      <div className={styles.containerCity}>
        <NativeSelect
          leftSection={<LocationIcon />}
          leftSectionPointerEvents="none"
          onChange={(event) => {dispatch(setValueInputCity(event.currentTarget.value as City))}}
          value={value}
          data={['Все города', 'Москва', 'Санкт-Петербург']}
          radius="sm"
        />
      </div>
    </div>
  )
}

export default InputSkillsCity;