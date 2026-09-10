import styles from './CardVacancy.module.scss';
import {Button, Card, Group, Text} from "@mantine/core";

type CardVacancyProps = {
  id: number;
  name: string;
  experience: string;
  city: string;
  company: string;
  space: string;
  salary: string;
}


function CardVacancy({name, experience, city, company, space, salary }: CardVacancyProps) {
  return (
    <Card padding={24} className={styles.container}>
        <div className={styles.Shell}>
        <h1 className={styles.title}>{name}</h1>
        <Group gap={16}>
          <Text fw={400} className={styles.priceText}>{salary} ₽</Text>
          <Text fw={400} className={styles.expText}>Опыт {experience}</Text>
        </Group>
        </div>
        <div className={styles.Shell}>
          <Text fw={400} className={styles.companyText}>{company}</Text>
          {space === 'office' && <Text  className={styles.formatText} bg='lightGray' c='gray'>Офис</Text>}
          {space === 'remote' && <Text  className={styles.formatText} bg='indigo.6' c='white'>Можно удалённо</Text>}
          {space === 'hybrid' && <Text  className={styles.formatText} bg='black' c='white'>Гибрид</Text>}
          <Text fw={400} className={styles.locationText}>{city}</Text>
        </div>
        <Button w={175} h={36} radius='sm' component='a' fw={400} color='black'>Смотреть вакансию</Button>
    </Card>
  )
}

export default CardVacancy;