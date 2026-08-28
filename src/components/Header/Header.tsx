import styles from './Header.module.scss'
import {Image, Text, UnstyledButton} from "@mantine/core";
import logo from '../../assets/img/logo.png'
import Avatar from '../../assets/icon/avatar.svg'

function Header() {
  return (
    <div className={styles.container}>
      <UnstyledButton component="a" href="/" className={styles.logo}>
        <Image src={logo} alt="logo" w={30} h={30} />
        <Text className={styles.textLogo}>.FrontEnd</Text>
      </UnstyledButton>
      <div className={styles.cover}>
        <UnstyledButton component="a" className={styles.vacancyBtn}>
          <Text className={styles.vacancyText}>Вакансии FE</Text>
          <div className={styles.circle} />
        </UnstyledButton>
        <UnstyledButton component="a" className={styles.homeBtn}>
          <Image src={Avatar} alt='Avatar'/>
          <Text className={styles.homeText}>Обо мне</Text>
        </UnstyledButton>
      </div>
    </div>
  )
}

export default Header;