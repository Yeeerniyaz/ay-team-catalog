import { useState, useMemo, useEffect } from 'react';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css'; 

import { 
  MantineProvider, Container, Grid, Image, Text, Title, Button, Group, 
  Box, Flex, UnstyledButton, SimpleGrid, Stack, Modal, ScrollArea, Divider, Anchor, Badge
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';

// Твоя база данных
import catalogData from './data.json'; 
import './App.css';

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [embla, setEmbla] = useState(null);

  // Сброс слайдера при смене товара в модалке
  useEffect(() => {
    if (embla && selectedItem) {
      embla.scrollTo(0, true);
    }
  }, [embla, selectedItem]);

  return (
    <MantineProvider defaultColorScheme="light">
      <Box bg="#FFFFFF" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
        
        {/* === HERO СЕКЦИЯ (FULLSCREEN 100DVH) === */}
        <Box 
          h="100dvh" 
          w="100%" 
          bg="#F8F9FA" 
          pos="relative" 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #000' }}
        >
          {/* Инстаграм сверху справа */}
          <Anchor 
            href="https://instagram.com/ayteam_mebel" 
            target="_blank"
            pos="absolute"
            top={30}
            right={{ base: 20, md: 40 }}
            c="dark.9"
            fw={800}
            size="xs"
            tt="uppercase"
            ls={2}
            style={{ zIndex: 10, borderBottom: '2px solid #000', textDecoration: 'none' }}
          >
            @ayteam_mebel
          </Anchor>

          <Container size="xl" ta="center">
            <Image 
              src="/logo.png" 
              alt="AY TEAM" 
              h={{ base: 45, md: 65 }} 
              fit="contain"
              mx="auto"
              mb="2.5rem"
            />
            <Title order={1} fw={900} size="clamp(3.5rem, 12vw, 9rem)" c="dark.9" style={{ letterSpacing: '-5px', lineHeight: 0.85, textTransform: 'uppercase' }}>
              AY TEAM
            </Title>
            <Text c="dark.9" size="sm" tt="uppercase" fw={800} ls={8} mt="xl">
              Furniture Architecture
            </Text>
            
            <Box maw={700} mx="auto" mt="4rem">
              <Text c="gray.6" size="xl" fw={500} lh={1.6}>
                Премиальные решения для интерьера. Математическая точность, строгие формы и бескомпромиссный минимализм. 
                Каждый объект — манифест качества.
              </Text>
            </Box>

            <Button 
              component="a"
              href="#catalog"
              color="dark.9" 
              size="xl" 
              radius={0} 
              mt="5rem" 
              fw={900} 
              tt="uppercase" 
              ls={2}
              h="5rem"
              px="5rem"
              style={{ transition: 'all 0.3s ease' }}
            >
              В каталог
            </Button>
          </Container>

          {/* Декоративный скролл-индикатор */}
          <Box pos="absolute" bottom={30} left="50%" style={{ transform: 'translateX(-50%)' }}>
            <Box 
              w={1} h={60} bg="gray.3" 
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <Box 
                w={1} h={30} bg="dark.9" 
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  animation: 'scrollDown 2s infinite ease-in-out' 
                }} 
              />
            </Box>
          </Box>
        </Box>

        {/* === КАТАЛОГ (GRID) === */}
        <Box id="catalog" pt={{ base: '6rem', md: '10rem' }} pb="10rem">
          <Container size="xl">
            <Title order={2} fw={900} size="clamp(2.5rem, 6vw, 4.5rem)" c="dark.9" style={{ letterSpacing: '-2px', textTransform: 'uppercase' }} mb="6rem">
              Коллекция '26
            </Title>

            <Grid gutter={{ base: '2.5rem', md: '5rem' }}>
              {catalogData.map((item) => (
                <Grid.Col key={item.id} span={{ base: 12, sm: 6, lg: 6 }}>
                  <Box 
                    onClick={() => setSelectedItem(item)}
                    style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                  >
                    <Box 
                      bg="#F7F7F7" 
                      p={{ base: '2rem', md: '4rem' }}
                      radius={0}
                      style={{ 
                        border: '1px solid #E9ECEF',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#000';
                        e.currentTarget.style.backgroundColor = '#F2F2F2';
                        e.currentTarget.firstChild.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#E9ECEF';
                        e.currentTarget.style.backgroundColor = '#F7F7F7';
                        e.currentTarget.firstChild.style.transform = 'scale(1)';
                      }}
                    >
                      <Image
                        src={`/images/${item.main}`}
                        height={450}
                        fit="contain"
                        alt={item.name}
                        style={{ filter: 'drop-shadow(0px 25px 40px rgba(0,0,0,0.06))', transition: 'transform 0.6s ease' }}
                      />
                    </Box>
                    <Title order={3} fw={900} size="2.5rem" c="dark.9" mt="2rem" style={{ letterSpacing: '-1.5px', textTransform: 'uppercase' }}>
                      {item.name}
                    </Title>
                  </Box>
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* === БРУТАЛЬНЫЙ ПОДВАЛ (ТВОЯ РЕКЛАМА) === */}
        <Box bg="dark.9" py="6rem" style={{ borderTop: '2px solid #000' }}>
          <Container size="xl">
            <Grid gutter="xl">
              {/* Левая сторона: Инфо AY TEAM */}
              <Grid.Col span={{ base: 12, md: 5 }}>
                <Stack gap="xl">
                  <Box>
                    <Title order={3} c="white" fw={900} size="2rem" ls={1} tt="uppercase" mb="md">AY TEAM</Title>
                    <Text c="gray.5" size="lg" maw={350} lh={1.5}>
                      Производство мебели премиум-класса. Архитектурный подход к каждому метру.
                    </Text>
                  </Box>
                  <Group gap="xl">
                    <Anchor href="https://instagram.com/ayteam_mebel" target="_blank" c="white" fw={800} size="sm" tt="uppercase" ls={1}>
                      Instagram
                    </Anchor>
                    <Anchor href="https://wa.me/77476509747" target="_blank" c="white" fw={800} size="sm" tt="uppercase" ls={1}>
                      WhatsApp
                    </Anchor>
                  </Group>
                  <Text c="gray.8" size="xs" mt="2rem">© 2026 AY TEAM. All rights reserved.</Text>
                </Stack>
              </Grid.Col>

              {/* Правая сторона: Реклама Ернияза */}
              <Grid.Col span={{ base: 12, md: 7 }}>
                <Flex direction="column" align={{ base: 'flex-start', md: 'flex-end' }} gap="xl">
                  <Box ta={{ base: 'left', md: 'right' }}>
                    <Badge variant="outline" color="gray.7" radius={0} size="lg" mb="md" ls={2} fw={800}>Digital Production</Badge>
                    <Title order={2} c="white" fw={900} size="2.5rem" tt="uppercase" ls={1}>Создание IT-продуктов</Title>
                    <Text c="gray.5" size="md" mt="sm">Разработка современных каталогов и бизнес-систем.</Text>
                  </Box>

                  <Group gap="4rem" wrap="wrap" justify={{ base: 'flex-start', md: 'flex-end' }}>
                    <Stack gap={4} align={{ base: 'flex-start', md: 'flex-end' }}>
                      <Text c="gray.6" size="xs" tt="uppercase" fw={800} ls={2}>Портфолио</Text>
                      <Anchor href="https://yeee.kz" target="_blank" c="white" fw={900} size="2rem" style={{ borderBottom: '3px solid #FFF', textDecoration: 'none' }}>
                        YEEE.KZ
                      </Anchor>
                    </Stack>

                    <Stack gap={4} align={{ base: 'flex-start', md: 'flex-end' }}>
                      <Text c="gray.6" size="xs" tt="uppercase" fw={800} ls={2}>Прямая связь</Text>
                      <Anchor href="https://wa.me/77066066323" target="_blank" c="white" fw={900} size="2rem" style={{ textDecoration: 'none' }}>
                        +7 706 606 6323
                      </Anchor>
                    </Stack>
                  </Group>

                  <Text c="gray.7" fw={900} size="xs" tt="uppercase" ls={3}>Designed & Coded by Yerniyaz Agaevich</Text>
                </Flex>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>

        {/* === ПРЕМИАЛЬНАЯ МОДАЛКА (3-PANEL EDITORIAL) === */}
        <Modal
          opened={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          fullScreen
          transitionProps={{ transition: 'fade', duration: 250 }}
          withCloseButton={false}
          styles={{
            content: { backgroundColor: '#FFFFFF' },
            body: { padding: 0, height: '100dvh', overflow: 'hidden' } 
          }}
        >
          {selectedItem && (
            <Flex h="100dvh" direction={{ base: 'column', lg: 'row' }} pos="relative">
              
              {/* Крестик */}
              <UnstyledButton 
                onClick={() => setSelectedItem(null)}
                pos="fixed"
                top={25}
                right={25}
                p="md"
                bg="#000"
                style={{ borderRadius: '50%', zIndex: 200, boxShadow: '0 15px 30px rgba(0,0,0,0.3)', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Text size="md" fw={900} c="white" lh={1}>✕</Text>
              </UnstyledButton>

              {/* КОЛОНКА 1: ИНДЕКС КАТАЛОГА */}
              <Box 
                w={{ base: '100%', lg: '22%' }} 
                h={{ base: '85px', lg: '100dvh' }} 
                bg="#FFFFFF"
                style={{ borderRight: '1px solid #E9ECEF', borderBottom: '1px solid #E9ECEF', zIndex: 100 }}
              >
                <Box p="xl" display={{ base: 'none', lg: 'block' }}>
                  <Text fw={900} size="xs" tt="uppercase" ls={3} c="gray.4">Index / Models</Text>
                </Box>
                
                <ScrollArea h={{ base: '85px', lg: 'calc(100dvh - 80px)' }} type="hover">
                  <Flex direction={{ base: 'row', lg: 'column' }} h="100%">
                    {catalogData.map((item) => {
                      const isActive = selectedItem.id === item.id;
                      return (
                        <UnstyledButton
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          p={{ base: 'xs', lg: '1.2rem 2rem' }}
                          bg={isActive ? '#F8F9FA' : 'transparent'}
                          style={{ 
                            borderBottom: '1px solid #F1F3F5',
                            borderRight: { base: '1px solid #F1F3F5', lg: 'none' },
                            minWidth: { base: '90px', lg: 'auto' },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        >
                          <Flex align="center" gap="lg" direction={{ base: 'column', lg: 'row' }}>
                            <Box w={45} h={45} p={6} bg="#FFF" style={{ border: isActive ? '1px solid #000' : '1px solid #EEE' }}>
                              <Image src={`/images/${item.main}`} fit="contain" h="100%" />
                            </Box>
                            <Text fw={isActive ? 900 : 600} size="xs" tt="uppercase" display={{ base: 'none', lg: 'block' }} c={isActive ? 'black' : 'gray.5'} lineClamp={1} ls={0.5}>
                              {item.name}
                            </Text>
                          </Flex>
                        </UnstyledButton>
                      );
                    })}
                  </Flex>
                </ScrollArea>
              </Box>

              {/* КОЛОНКА 2: ПОДИУМ (КАРУСЕЛЬ) */}
              <Box 
                w={{ base: '100%', lg: '53%' }} 
                h={{ base: '45dvh', lg: '100dvh' }} 
                bg="#F8F9FA"
                pos="relative"
                style={{ borderRight: '1px solid #E9ECEF' }}
              >
                {(() => {
                  const slides = [selectedItem.main, selectedItem.render, ...(selectedItem.schemes || [])].filter(Boolean);
                  return (
                    <Carousel
                      getEmblaApi={setEmbla}
                      loop
                      withIndicators
                      height="100%"
                      controlSize={45}
                      styles={{
                        root: { height: '100%' },
                        container: { height: '100%' },
                        slide: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' },
                        indicator: { width: 10, height: 2, radius: 0, backgroundColor: '#DEE2E6', '&[data-active]': { width: 40, backgroundColor: '#000' } },
                        control: { borderRadius: 0, backgroundColor: '#FFF', border: '1px solid #000', color: '#000', boxShadow: 'none' }
                      }}
                    >
                      {slides.map((img, idx) => (
                        <Carousel.Slide key={idx}>
                          <Image src={`/images/${img}`} h="100%" w="100%" fit="contain" style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.1))' }} />
                        </Carousel.Slide>
                      ))}
                    </Carousel>
                  );
                })()}
              </Box>

              {/* КОЛОНКА 3: ДЕТАЛИ И ЗАКАЗ */}
              <ScrollArea 
                w={{ base: '100%', lg: '25%' }} 
                h={{ base: 'calc(55dvh - 85px)', lg: '100dvh' }}
                bg="#FFFFFF"
              >
                <Container py={{ base: '3rem', lg: '6rem' }} px="xl">
                  <Stack gap="xl">
                    <Box>
                      <Text c="gray.4" fw={900} size="xs" tt="uppercase" ls={3} mb="xs">Architectural Object</Text>
                      <Title order={2} fw={900} size="3rem" lh={1} c="dark.9" style={{ letterSpacing: '-2px', textTransform: 'uppercase' }}>
                        {selectedItem.name}
                      </Title>
                    </Box>

                    <Divider color="gray.2" my="md" />

                    <Box>
                      <Text size="xs" c="gray.5" mb="xl" tt="uppercase" fw={800} ls={2}>Техническая база</Text>
                      <SimpleGrid cols={2} spacing="md">
                        {(selectedItem.schemes || []).map((s, i) => (
                          <Box key={i} p="md" style={{ border: '1px solid #F1F3F5', backgroundColor: '#FAFAFA' }}>
                            <Image src={`/images/${s}`} h={80} fit="contain" />
                          </Box>
                        ))}
                        <Box p="md" style={{ border: '1px solid #F1F3F5', backgroundColor: '#FAFAFA' }}>
                          <Image src={`/images/${selectedItem.render}`} h={80} fit="contain" />
                        </Box>
                      </SimpleGrid>
                    </Box>

                    <Button
                      component="a"
                      href={`https://wa.me/77476509747?text=${encodeURIComponent(`Здравствуйте! Интересует расчет модели AY TEAM: ${selectedItem.name}.`)}`}
                      target="_blank"
                      color="dark.9"
                      size="xl"
                      radius={0}
                      fullWidth
                      mt="2rem"
                      fw={900}
                      tt="uppercase"
                      h="5.5rem"
                      ls={1}
                    >
                      Заказать проект
                    </Button>

                    <Stack gap="xs" mt="3rem">
                      <Divider label="Developer Support" labelPosition="center" color="gray.1" />
                      <Anchor 
                        href="https://wa.me/77066066323" 
                        target="_blank" 
                        ta="center" 
                        c="dark.9" 
                        size="sm" 
                        fw={800} 
                        tt="uppercase"
                        ls={1}
                        style={{ textDecoration: 'none' }}
                      >
                        Web Dev by Yerniyaz
                      </Anchor>
                    </Stack>
                  </Stack>
                </Container>
              </ScrollArea>

            </Flex>
          )}
        </Modal>

        {/* Стили для анимации Hero */}
        <style>{`
          @keyframes scrollDown {
            0% { transform: translateY(-100%); }
            50% { transform: translateY(100%); }
            100% { transform: translateY(-100%); }
          }
          #catalog { scroll-behavior: smooth; }
        `}</style>

      </Box>
    </MantineProvider>
  );
}