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

function InputSkillsCity(){
  return (
    <div className={styles.container}>
      <div className={styles.containerSkills}>
        <Text className={styles.skillsText} fw={600}>Ключевые навыки</Text>
        <Group justify='space-between' gap={8}>
          <PillsInput w={227} size='xs'>
            <PillsInput.Field placeholder="Навык" />
          </PillsInput>
          <ActionIcon w={34} h={30} disabled={true} className={styles.plusBtn}>
            <Plus />
          </ActionIcon>
        </Group>
        <PillGroup mt={12} w={230}>
          <Pill withRemoveButton classNames={{label: styles.pillLabel, remove: styles.pillCross}}>JavaScript</Pill>
          <Pill withRemoveButton classNames={{label: styles.pillLabel, remove: styles.pillCross}}>React</Pill>
          <Pill withRemoveButton classNames={{label: styles.pillLabel, remove: styles.pillCross}}>Redux</Pill>
          <Pill withRemoveButton classNames={{label: styles.pillLabel, remove: styles.pillCross}}>ReduxToolkit</Pill>
          <Pill withRemoveButton classNames={{label: styles.pillLabel, remove: styles.pillCross}}>Nextjs</Pill>
        </PillGroup>

      </div>
      <div className={styles.containerCity}>
        <NativeSelect
          leftSection={<LocationIcon />}
          leftSectionPointerEvents="none"
          data={['Все города', 'Москва', 'Санкт-Петербург']}
          radius="sm"
        />
      </div>
    </div>
  )
}

export default InputSkillsCity;