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
  type City, deleteSkills, fetchVacancy,
  setValueInputCity, setValueInputPills
} from "../../../../store/slices/vacancySlice.ts";
import {useState} from "react";

function InputSkillsCity(){

  const dispatch = useAppDispatch();
  const value = useAppSelector(state => state.vacancies.valueInputCity);
  const skills = useAppSelector(state => state.vacancies.skills);
  const valueInputPills = useAppSelector(state => state.vacancies.valueInputPills);
  const valueInputVacancy = useAppSelector(state => state.vacancies.valueInputVacancy);
  const valueInputCity = useAppSelector(state => state.vacancies.valueInputCity);

  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(true);
  const isDisabledInput = skills.length >= 10;

  function checkValueInputPills(value: string){
    if(value != ''){
      setIsDisabledBtn(false);
    } else {
      setIsDisabledBtn(true);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

    const skill = event.currentTarget.value;

    if (event.key === 'Enter') {
      event.preventDefault();

      if (!skill.trim()) return;

      dispatch(addSkills(skill));

      const newSkills = [...skills, skill.trim()];

      dispatch(fetchVacancy({page: 1, search: valueInputVacancy, city: valueInputCity, skills: newSkills}))
      setIsDisabledBtn(true)
    }
  };

  function errorInput(){
    if(isDisabledInput){
      return 'слишком много навыков';
    }
    return '';
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerSkills}>

        <Text className={styles.skillsText} fw={600}>Ключевые навыки</Text>

        <Group justify='space-between' gap={8} align='flex-start'>
          <PillsInput w={227} size='xs' error={errorInput()}>
            <PillsInput.Field placeholder="Навык"
                              value={valueInputPills}
                              onChange={(event) => {
                                dispatch(setValueInputPills(event.currentTarget.value));
                                checkValueInputPills(event.currentTarget.value);
                              }}
                              onKeyDown={handleKeyDown}
                              disabled={isDisabledInput}
            />
          </PillsInput>
          <ActionIcon onClick={()=>{dispatch(addSkills(valueInputPills)); setIsDisabledBtn(true); dispatch(fetchVacancy({page: 1, search: valueInputVacancy, city: valueInputCity, skills: skills}))}}
                      w={34}
                      h={30}
                      disabled={isDisabledBtn}
                      className={styles.plusBtn}
          >
            <Plus />
          </ActionIcon>
        </Group>

        <PillGroup mt={12} w={230}>
          {skills.map((skill ) => (
            <Pill onRemove={() => {dispatch(deleteSkills(skill)); dispatch(fetchVacancy({page: 1, search: valueInputVacancy, city: valueInputCity, skills: skills}))}}
                  key={skill}
                  withRemoveButton
                  classNames={{label: styles.pillLabel, remove: styles.pillCross}}
            >{skill}</Pill>
          ))}
        </PillGroup>

      </div>
      <div className={styles.containerCity}>
        <NativeSelect
          leftSection={<LocationIcon />}
          leftSectionPointerEvents="none"
          onChange={(event) => {dispatch(setValueInputCity(event.currentTarget.value as City)); dispatch(fetchVacancy({page: 1, search: valueInputVacancy, city: event.currentTarget.value as City, skills: skills}))}}
          value={value}
          data={['Все города', 'Москва', 'Санкт-Петербург']}
          radius="sm"
        />
      </div>
    </div>
  )
}

export default InputSkillsCity;