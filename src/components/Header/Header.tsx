import styles from './Header.module.scss'
import {Image, Text, UnstyledButton} from "@mantine/core";
import logo from '../../assets/img/logo.png'
import Avatar from '../../assets/icon/avatar.svg?react'
import {Link, NavLink, useParams, useSearchParams} from "react-router";

function Header() {

  const [searchParam,_] = useSearchParams()
  const { city } = useParams()
  return (
    <div className={styles.container}>
      <Link className={styles.link} to={`/vacancies/${city || 'moscow'}?${searchParam.toString()}`}>
        <UnstyledButton className={styles.logo}>
          <Image src={logo} alt="logo" w={30} h={30} />
          <Text className={styles.textLogo} fw={600}>.FrontEnd</Text>
        </UnstyledButton>
      </Link>
      <div className={styles.cover}>
        <NavLink
          to={`/vacancies/${city || 'moscow'}?${searchParam.toString()}`}
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          {({ isActive }) => (
            <UnstyledButton className={styles.vacancyBtn}>
              <Text className={ isActive ? styles.vacancyTextActive : styles.vacancyText } fw={500}>
                Вакансии FE
              </Text>
              <div
                className={`${styles.circle} ${
                  isActive ? styles.circleActive : ''
                }`}
              />
            </UnstyledButton>
          )}
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          {({ isActive }) => (
            <UnstyledButton className={styles.homeBtn}>
              <Avatar className={isActive ? styles.avatarActive : styles.avatar} />
              <Text className={ isActive ? styles.homeTextActive : styles.homeText} fw={500} mr={3}>
                Обо мне
              </Text>
              <div
                className={`${styles.circle} ${
                  isActive ? styles.circleActive : ''
                }`}
              />
            </UnstyledButton>
          )}
        </NavLink>
      </div>
    </div>
  )
}

export default Header;