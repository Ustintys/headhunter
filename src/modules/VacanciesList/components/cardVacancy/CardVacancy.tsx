import styles from './CardVacancy.module.scss';
import {Button, Card, Group, Text} from "@mantine/core";


function CardVacancy(){
  return (
    <Card padding={24} className={styles.container}>
        <div className={styles.Shell}>
        <h1 className={styles.title}>Frontend разработчик в EdTech продукт</h1>
        <Group gap={16}>
          <Text fw={400} className={styles.priceText}>170 000 ₽</Text>
          <Text fw={400} className={styles.expText}>Опыт 3-5 лет</Text>
        </Group>
        </div>
        <div className={styles.Shell}>
          <Text fw={400} className={styles.companyText}>Kata Academy</Text>
          <Text  className={styles.formatText}>Можно удалённо</Text>
          <Text fw={400} className={styles.locationText}>Набережные Челны</Text>
        </div>
        <Button w={175} h={36} radius='sm' component='a' fw={400} color='black'>Смотреть вакансию</Button>
    </Card>
  )
}

export default CardVacancy;