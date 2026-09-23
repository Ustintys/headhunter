import styles from "./AboutUser.module.scss"
import {Card, Group, Image, Text} from "@mantine/core";
import UST from '../../assets/img/UST.png'

function AboutUser() {
  return (
      <div className={styles.container}>
        <Card radius='lg' padding={24}>
          <Group>
            <Image src={UST} radius='xl' w={100} h={100} />
            <h1 className={styles.h1}>Устин Чернышов</h1>
          </Group>
          <Text fw={400} mt={20} mb={20}>
            Начинающий Frontend Developer, развиваюсь в направлении React и TypeScript.
            Изучаю современный frontend и практикую разработку SPA-приложений,
            уделяя внимание архитектуре, читаемости и поддерживаемости кода.
          </Text>
          <h3 className={styles.h3}>Стек технологий:</h3>
          <ul>
            <li>JavaScript, TypeScript</li>
            <li>React, React Router</li>
            <li>Redux Toolkit, RTK Query</li>
            <li>HTML5, CSS3, SCSS, CSS Modules, BEM</li>
            <li>Mantine UI</li>
            <li>REST API, async/await, Fetch API</li>
            <li>Git, GitHub, Fork</li>
            <li>Vite</li>
          </ul>
          <Text fw={400} >
            Имею практический опыт работы с компонентным подходом в React,
            типизацией TypeScript, управлением состоянием через Redux Toolkit,
            маршрутизацией с React Router и взаимодействием с REST API.
            <br/>
            Уделяю внимание структуре проекта, читаемости и поддерживаемости кода,
            стараюсь понимать принципы работы используемых технологий и выбирать подходящие инструменты для решения задач.
          </Text>
        </Card>
      </div>
  )
}

export default AboutUser;