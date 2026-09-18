import styles from './NoteFound.module.scss';
import {Button, Card, Group, Image, Text} from "@mantine/core";
import ImgCat from '../../assets/img/img404.png'
import {Link} from "react-router";

function NoteFound() {
  return (
      <div className={styles.container}>
        <Card padding={24} className={styles.containerCard}>
          <Group justify="space-between" align='center'>
            <h1 className={styles.h1}>Упс! Такой страницы не существует</h1>
            <Link to='/'>
              <Button w={135} h={36} radius='sm' component='a' fw={400} color='indigo.6' mt={12}>На главную</Button>
            </Link>
          </Group>
          <Text fw={400} mb={32} mt={12}>Давайте перейдём к началу.</Text>
          <Image src={ImgCat} w={640} h={336} radius="md"/>
        </Card>
      </div>
  )
}

export default NoteFound;