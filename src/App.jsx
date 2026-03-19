import { useState } from 'react';
import '@mantine/core/styles.css';
import { 
  MantineProvider, AppShell, Container, Grid, Card, Image, Text, 
  Group, Badge, Button, SimpleGrid, Title, Anchor, Flex, Divider, 
  Paper, Box 
} from '@mantine/core';

// Импорт твоей сгенерированной базы
import catalogData from './data.json'; 

// Оригинальные импорты Vite (сохранены строго по ТЗ, функционал не урезан)
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

export default function App() {
  // Оригинальный стейт Vite (сохранен)
  const [count, setCount] = useState(0);

  return (
    <MantineProvider defaultColorScheme="light">
      <AppShell
        header={{ height: 85 }}
        padding={0}
        bg="#F8F9FA" // Очень светлый, дорогой серый оттенок для фона сайта
      >
        {/* === ШАПКА САЙТА (ПРЕМИУМ) === */}
        <AppShell.Header bg="rgba(255, 255, 255, 0.95)" style={{ backdropFilter: 'blur(10px)', borderBottom: '1px solid #E9ECEF' }}>
          <Container size="xl" h="100%">
            <Flex justify="space-between" align="center" h="100%">
              
              {/* Логотип */}
              <Group>
                <Image 
                  src="/logo.png" 
                  alt="AY TEAM" 
                  h={45} 
                  fit="contain"
                  fallbackSrc="https://placehold.co/180x60/white/black?text=AY+TEAM" 
                />
              </Group>

              {/* Контакты (Адаптивные, скрываются на мобилках) */}
              <Group gap="xl" visibleFrom="md">
                <Flex direction="column" align="flex-end" gap={2}>
                  <Text size="0.65rem" c="gray.6" fw={700} tt="uppercase" ls={1}>Instagram</Text>
                  <Anchor href="https://instagram.com/Ayteam_mebel" target="_blank" c="dark.9" fw={600} size="sm" underline="hover">
                    @Ayteam_mebel
                  </Anchor>
                </Flex>
                
                <Divider orientation="vertical" color="gray.3" />
                
                <Flex direction="column" align="flex-start" gap={2}>
                  <Text size="0.65rem" c="gray.6" fw={700} tt="uppercase" ls={1}>Отдел продаж</Text>
                  <Group gap="md">
                    <Anchor href="https://wa.me/77476509747" target="_blank" c="dark.9" fw={600} size="sm" underline="hover">
                      +7 747 650 9747
                    </Anchor>
                    <Anchor href="https://wa.me/77052727304" target="_blank" c="dark.9" fw={600} size="sm" underline="hover">
                      +7 705 272 7304
                    </Anchor>
                  </Group>
                </Flex>
              </Group>
            </Flex>
          </Container>
        </AppShell.Header>

        <AppShell.Main>
          {/* === HERO СЕКЦИЯ (ЗАГОЛОВОК) === */}
          <Box bg="white" py={{ base: '3rem', md: '5rem' }} style={{ borderBottom: '1px solid #E9ECEF' }}>
            <Container size="xl">
              <Flex direction="column" align="center" ta="center">
                <Badge color="dark" variant="outline" size="lg" radius="sm" mb="md" ls={2}>
                  Эксклюзивная коллекция
                </Badge>
                <Title order={1} size="3.5rem" fw={900} c="dark.9" style={{ letterSpacing: '-1px' }}>
                  КАТАЛОГ МЕБЕЛИ
                </Title>
                <Text c="gray.6" size="lg" mt="md" maw={600}>
                  Индивидуальный дизайн, точные инженерные решения и премиальное качество материалов для вашего интерьера.
                </Text>
              </Flex>
            </Container>
          </Box>

          {/* === СЕТКА ТОВАРОВ === */}
          <Container size="xl" py="4rem">
            <Grid gutter="xl">
              {catalogData.map((item) => (
                <Grid.Col key={item.id} span={{ base: 12, sm: 6, lg: 4 }}>
                  
                  {/* КАРТОЧКА ТОВАРА */}
                  <Card 
                    padding="xl" 
                    radius="md" 
                    bg="white" 
                    style={{ 
                      border: '1px solid #E9ECEF',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                  >
                    {/* Главное фото с серой премиальной подложкой */}
                    <Card.Section p="md" bg="#F1F3F5" style={{ borderBottom: '1px solid #E9ECEF' }}>
                      <Image
                        src={`/images/${item.main}`}
                        height={320}
                        fit="contain"
                        alt={item.name}
                        style={{ filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.05))' }}
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="xl" mb="md" align="flex-start">
                      <Title order={3} fw={800} c="dark.9">{item.name}</Title>
                      <Badge color="gray.2" c="dark.9" radius="sm" variant="filled">Под заказ</Badge>
                    </Group>

                    {/* Блок схем */}
                    <Paper bg="#F8F9FA" p="sm" radius="sm" withBorder mt="md">
                      <Text size="0.7rem" c="gray.6" mb="xs" tt="uppercase" fw={700} ls={1}>Техническая документация</Text>
                      <SimpleGrid cols={3} spacing="sm">
                        {item.schemes.map((scheme, idx) => (
                          <Paper key={idx} bg="white" p={4} withBorder>
                            <Image src={`/images/${scheme}`} radius="sm" h={50} fit="contain" />
                          </Paper>
                        ))}
                        <Paper bg="white" p={4} withBorder>
                          <Image src={`/images/${item.render}`} radius="sm" h={50} fit="contain" />
                        </Paper>
                      </SimpleGrid>
                    </Paper>

                    {/* Кнопка заказа (Строгий черный стиль) */}
                    <Button
                      component="a"
                      href={`https://wa.me/77476509747?text=Здравствуйте! Интересует модель из каталога: ${item.name}`}
                      target="_blank"
                      color="dark.9"
                      fullWidth
                      mt="xl"
                      radius="sm"
                      size="lg"
                      fw={600}
                    >
                      Заказать расчет
                    </Button>
                  </Card>
                  
                </Grid.Col>
              ))}
            </Grid>
          </Container>

          {/* === ПОДВАЛ (Сюда убран оригинальный код Vite, чтобы не нарушать ТЗ) === */}
          <Box bg="dark.9" py="3rem" mt="5rem">
            <Container size="xl">
              <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" gap="lg">
                <Text c="gray.5" size="sm">
                  © 2026 AY TEAM. Все права защищены. Разработано Ерниязом.
                </Text>
                
                {/* Сохраненный функционал дефолтных кнопок и логотипов Vite */}
                <Group>
                  <Button variant="outline" color="gray.5" radius="xl" onClick={() => setCount((c) => c + 1)}>
                    Тест системы: {count}
                  </Button>
                  <Image src={viteLogo} w={24} h={24} alt="Vite" />
                  <Image src={reactLogo} w={24} h={24} alt="React" />
                </Group>
              </Flex>
            </Container>
          </Box>
          
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}