import styles from './Header.module.scss'
import {Image, Text, UnstyledButton} from "@mantine/core";
import logo from '../../assets/img/logo.png'
import Avatar from '../../assets/icon/avatar.svg'
import {Link, useSearchParams} from "react-router";

function Header() {

  const [searchParam,_] = useSearchParams()

  return (
    <div className={styles.container}>
      <Link className={styles.link} to={`/?${searchParam.toString()}`}>
        <UnstyledButton component="a" className={styles.logo}>
          <Image src={logo} alt="logo" w={30} h={30} />
          <Text className={styles.textLogo} fw={600}>.FrontEnd</Text>
        </UnstyledButton>
      </Link>
      <div className={styles.cover}>
        <Link to={`/?${searchParam.toString()}`} className={styles.link}>
          <UnstyledButton component="a" className={styles.vacancyBtn}>
            <Text className={styles.vacancyText} fw={500}>Вакансии FE</Text>
            <div className={styles.circle} />
          </UnstyledButton>
        </Link>
        <UnstyledButton component="a" className={styles.homeBtn}>
          <Image src={Avatar} alt='Avatar' w={20} h={20} />
          <Text className={styles.homeText} fw={500}>Обо мне</Text>
        </UnstyledButton>
      </div>
    </div>
  )
}

export default Header;