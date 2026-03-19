import { useState, useEffect } from 'react';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css'; 

import { 
  MantineProvider, Container, Grid, Image, Text, Title, Button, Group, 
  Box, Flex, UnstyledButton, SimpleGrid, Stack, Modal, ScrollArea, Anchor, Badge,
  Paper, ActionIcon, Affix, Transition, rem, Center, Card 
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';

// Твоя база данных
import catalogData from './data.json'; 
import './App.css';

// ==========================================
// SVG ИКОНКИ
// ==========================================
const Icons = {
  ArrowUp: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5l0 14m-7 -7l7 -7l7 7"/></svg>,
  ArrowRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l14 0m-7 -7l7 7l-7 7"/></svg>,
  WhatsApp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"/><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"/></svg>,
  Instagram: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3"/><path d="M16.5 7.5v.01"/></svg>,
  X: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6l-12 12m0 -12l12 12"/></svg>,
  ZoomIn: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="7"/><path d="M21 21l-6 -6"/><path d="M10 7l0 6m-3 -3l6 0"/></svg>
};

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [embla, setEmbla] = useState(null);
  const [scroll, scrollTo] = useWindowScroll();
  
  const [zoomedImage, setZoomedImage] = useState(null);
  const [isZoomScale, setIsZoomScale] = useState(false);

  useEffect(() => {
    if (embla && selectedItem) {
      embla.scrollTo(0, true);
    }
  }, [embla, selectedItem]);

  useEffect(() => {
    if (!zoomedImage) setIsZoomScale(false);
  }, [zoomedImage]);

  return (
    <MantineProvider defaultColorScheme="light">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700;900&display=swap');

        /* ЖЕСТКИЙ СБРОС: Убиваем все линии по бокам */
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          font-family: 'Google Sans', sans-serif;
          background-color: #F8F9FA;
          color: #1B2E3D;
          -ms-overflow-style: none; 
          scrollbar-width: none;    
        }
        * {
          box-sizing: border-box;
        }

        ::-webkit-scrollbar { 
          display: none; 
          width: 0px; 
          background: transparent; 
        }

        .fade-up {
          animation: fadeUpAnim 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        @keyframes fadeUpAnim {
          to { opacity: 1; transform: translateY(0); }
        }

        .hover-card {
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          border: none !important;
          box-shadow: 0 5px 15px rgba(27,46,61,0.03);
        }
        .hover-card:hover {
          background-color: white !important;
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(27, 46, 61, 0.08) !important;
        }

        .image-zoom {
          transition: transform 0.5s ease;
          cursor: zoom-in;
        }
        .image-zoom:hover { transform: scale(1.03); }

        .btn-hover { transition: all 0.3s ease; }
        .btn-hover:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(27,46,61,0.15); }
        
        .nav-link { transition: color 0.3s ease; text-decoration: none; }
        .nav-link:hover { color: #888 !important; }
      `}</style>

      <Box style={{ minHeight: '100vh', overflowX: 'hidden', width: '100%' }}>
        
        {/* КНОПКА НАВЕРХ */}
        <Affix position={{ bottom: rem(20), right: rem(20) }} zIndex={100}>
          <Transition transition="slide-up" mounted={scroll.y > 400}>
            {(transitionStyles) => (
              <ActionIcon 
                style={{ ...transitionStyles, backgroundColor: "#1B2E3D", color: "white", border: "none", boxShadow: "0 8px 25px rgba(27, 46, 61, 0.15)" }} 
                onClick={() => scrollTo({ y: 0 })} size="xl" radius="100%"
              >
                <Icons.ArrowUp />
              </ActionIcon>
            )}
          </Transition>
        </Affix>

        {/* ========================================== */}
        {/* HERO СЕКЦИЯ */}
        {/* ========================================== */}
        <Box pt={20} pb={{ base: 60, md: 100 }} bg="#FFFFFF" pos="relative" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
          <Container size="xl" pos="relative" style={{ zIndex: 20, flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
            
            <Center mb={{ base: 40, md: 60 }}>
              <Group gap="sm" style={{ cursor: "pointer" }} onClick={() => scrollTo({ y: 0 })}>
                <Center bg="#1B2E3D" w={48} h={48} style={{ borderRadius: "100%" }}>
                  <Image src="/logo.png" w={24} h={24} fit="contain" style={{ filter: "brightness(0) invert(1)" }} />
                </Center>
                <Title order={3} fw={900} style={{ color: "#1B2E3D", letterSpacing: "1px", textTransform: 'uppercase' }}>
                  AY TEAM
                </Title>
              </Group>
            </Center>

            <Center style={{ flexDirection: 'column', textAlign: 'center', flexGrow: 1 }} className="fade-up">
              <Group justify="center" gap="xs" mb="xl" style={{ display: "inline-flex", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(27,46,61,0.1)" }}>
                <Box style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#1B2E3D" }} />
                <Text size="xs" fw={800} style={{ color: "#1B2E3D", letterSpacing: "1px", textTransform: "uppercase" }}>
                  Архитектурный подход
                </Text>
              </Group>
              
              <Title order={1} style={{ color: "#1B2E3D", letterSpacing: "-1px", fontSize: "clamp(36px, 7vw, 72px)", lineHeight: 1.05, fontWeight: 900, textTransform: 'uppercase' }}>
                ИСКУССТВО ФОРМЫ<br />И БЕЗУПРЕЧНОСТИ
              </Title>

              <Text size="lg" mt={24} maw={600} lh={1.6} fw={500} style={{ color: "rgba(27,46,61,0.7)" }}>
                Производство мебели премиум-класса. Математическая точность, строгие формы и бескомпромиссный минимализм.
              </Text>

              <Flex justify="center" align="center" gap={{ base: 'sm', md: 'md' }} mt={40} wrap="wrap">
                <Paper 
                  component="a" href="https://wa.me/77052727304" target="_blank"
                  radius="100px" p="6px 20px 6px 6px" bg="#F8F9FA" 
                  withBorder={false}
                  style={{ border: '1px solid rgba(27,46,61,0.05)', textDecoration: 'none' }} className="btn-hover"
                >
                  <Group gap="sm">
                    <Center w={38} h={38} bg="#1B2E3D" style={{ borderRadius: '50%' }} c="white">
                      <Icons.WhatsApp />
                    </Center>
                    <Box ta="left">
                      <Text size="9px" tt="uppercase" fw={800} ls={1} c="dimmed" lh={1}>Айдос</Text>
                      <Text size="sm" fw={800} c="#1B2E3D" lh={1.2}>+7 705 272 7304</Text>
                    </Box>
                  </Group>
                </Paper>

                <Paper 
                  component="a" href="https://wa.me/77476509747" target="_blank"
                  radius="100px" p="6px 20px 6px 6px" bg="#F8F9FA" 
                  withBorder={false}
                  style={{ border: '1px solid rgba(27,46,61,0.05)', textDecoration: 'none' }} className="btn-hover"
                >
                  <Group gap="sm">
                    <Center w={38} h={38} bg="#1B2E3D" style={{ borderRadius: '50%' }} c="white">
                      <Icons.WhatsApp />
                    </Center>
                    <Box ta="left">
                      <Text size="9px" tt="uppercase" fw={800} ls={1} c="dimmed" lh={1}>Темирлан</Text>
                      <Text size="sm" fw={800} c="#1B2E3D" lh={1.2}>+7 747 650 9747</Text>
                    </Box>
                  </Group>
                </Paper>

                <ActionIcon component="a" href="https://instagram.com/ayteam_mebel" target="_blank" size={50} radius="100%" style={{ border: '1px solid rgba(27,46,61,0.1)' }} color="#1B2E3D" variant="transparent" className="btn-hover">
                  <Icons.Instagram />
                </ActionIcon>
              </Flex>

              <Button mt={50} size="xl" radius="xl" className="btn-hover" style={{ backgroundColor: "#1B2E3D", color: "white", fontWeight: 700, padding: "0 50px" }} component="a" href="#catalog">
                Смотреть коллекцию
              </Button>
            </Center>
          </Container>
        </Box>

        {/* ========================================== */}
        {/* КАТАЛОГ */}
        {/* ========================================== */}
        <Box id="catalog" py={{ base: 60, md: 100 }} bg="#FFFFFF" w="100%">
          <Container size="xl" w="100%">
            <Center style={{ flexDirection: 'column', textAlign: 'center' }} mb={{ base: 40, md: 60 }} className="fade-up">
              <Text size="xs" fw={800} style={{ color: "rgba(27,46,61,0.5)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>
                Index 01
              </Text>
              <Title order={2} style={{ color: "#1B2E3D", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, textTransform: 'uppercase' }}>
                Коллекция '26
              </Title>
            </Center>

            <Grid gutter={{ base: "xl", md: 40 }}>
              {catalogData.map((item) => (
                <Grid.Col span={{ base: 12, sm: 6, lg: 4 }} key={item.id}>
                  <Card 
                    p="lg" 
                    radius="40px" 
                    bg="#F8F9FA"
                    className="hover-card"
                    withBorder={false}
                    onClick={() => setSelectedItem(item)}
                    style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <Box 
                      bg="white" 
                      radius="30px" 
                      p="xl"
                      style={{ 
                        aspectRatio: '4/4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 5px 15px rgba(27,46,61,0.02)'
                      }}
                    >
                      <Image
                        src={`/images/${item.main}`}
                        fit="contain"
                        alt={item.name}
                        h="100%"
                        style={{ filter: 'drop-shadow(0px 15px 30px rgba(27,46,61,0.08))' }}
                      />
                    </Box>
                    <Box mt="xl" px="md" style={{ flexGrow: 1 }}>
                      <Group justify="space-between" align="center">
                        <Box>
                          <Text size="10px" c="dimmed" tt="uppercase" fw={800} ls={2} mb={4}>Модель</Text>
                          <Title order={3} fw={900} size="xl" c="#1B2E3D" tt="uppercase">{item.name}</Title>
                        </Box>
                        <ActionIcon radius="100%" size="lg" bg="#1B2E3D" c="white">
                          <Icons.ArrowRight />
                        </ActionIcon>
                      </Group>
                    </Box>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ========================================== */}
        {/* ПОДВАЛ (На всю ширину, прямой верхний край) */}
        {/* ========================================== */}
        <Box bg="#1B2E3D" pt={{ base: 60, md: 100 }} pb={40} w="100%" style={{ position: 'relative', zIndex: 10 }}>
          <Container size="xl" w="100%">
            
            <Center mb={{ base: 40, md: 60 }} style={{ flexDirection: 'column', textAlign: 'center' }}>
              <Badge variant="outline" color="rgba(255,255,255,0.2)" radius="xl" size="lg" ls={2} fw={800} py="sm" mb="xl">AY TEAM</Badge>
              <Title order={2} c="white" fw={900} size="clamp(32px, 5vw, 56px)" lh={1.1} tt="uppercase">
                Архитектура <br /> вашего пространства
              </Title>
            </Center>

            <Grid gutter={{ base: 30, md: 40 }}>
              
              {/* Блок Контактов - Строго по центру */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper p={{ base: 30, md: 50 }} radius="40px" bg="rgba(255,255,255,0.03)" withBorder={false} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Text size="xs" tt="uppercase" ls={2} c="rgba(255,255,255,0.4)" fw={800} mb="xl" ta="center">Отдел продаж</Text>
                  
                  <Stack gap="xl" align="center">
                    <Group align="center" justify="center">
                      <ActionIcon size={40} radius="100%" bg="rgba(255,255,255,0.1)" c="white" component="a" href="https://wa.me/77052727304" target="_blank">
                        <Icons.WhatsApp />
                      </ActionIcon>
                      <Box ta="center">
                        <Text size="10px" tt="uppercase" ls={1} c="rgba(255,255,255,0.5)" fw={700}>Айдос</Text>
                        <Anchor href="https://wa.me/77052727304" target="_blank" c="white" fw={800} size="lg" className="nav-link">+7 705 272 7304</Anchor>
                      </Box>
                    </Group>
                    
                    <Group align="center" justify="center">
                      <ActionIcon size={40} radius="100%" bg="rgba(255,255,255,0.1)" c="white" component="a" href="https://wa.me/77476509747" target="_blank">
                        <Icons.WhatsApp />
                      </ActionIcon>
                      <Box ta="center">
                        <Text size="10px" tt="uppercase" ls={1} c="rgba(255,255,255,0.5)" fw={700}>Темирлан</Text>
                        <Anchor href="https://wa.me/77476509747" target="_blank" c="white" fw={800} size="lg" className="nav-link">+7 747 650 9747</Anchor>
                      </Box>
                    </Group>

                    <Group align="center" justify="center">
                      <ActionIcon size={40} radius="100%" bg="rgba(255,255,255,0.1)" c="white" component="a" href="https://instagram.com/ayteam_mebel" target="_blank">
                        <Icons.Instagram />
                      </ActionIcon>
                      <Box ta="center">
                        <Text size="10px" tt="uppercase" ls={1} c="rgba(255,255,255,0.5)" fw={700}>Соцсети</Text>
                        <Anchor href="https://instagram.com/ayteam_mebel" target="_blank" c="white" fw={800} size="lg" className="nav-link">@ayteam_mebel</Anchor>
                      </Box>
                    </Group>
                  </Stack>
                </Paper>
              </Grid.Col>

              {/* Блок Yerniyaz - Строго по центру */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper p={{ base: 30, md: 50 }} radius="40px" bg="rgba(255,255,255,0.03)" withBorder={false} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  
                  <Badge variant="filled" bg="rgba(255,255,255,0.1)" c="white" radius="xl" size="sm" mb="md">IT / WEB</Badge>
                  <Text size="xs" tt="uppercase" ls={2} c="rgba(255,255,255,0.4)" fw={800} mb="xs">Digital Production</Text>
                  
                  <Title order={3} c="white" fw={900} size="32px" tt="uppercase" lh={1.2}>
                    Создание <br/> IT-продуктов
                  </Title>
                  
                  <Text c="rgba(255,255,255,0.5)" size="sm" mt="md" fw={500} maw={350} ta="center" mx="auto">
                    Современные веб-каталоги, системы управления бизнесом и автоматизация.
                  </Text>

                  <Group justify="center" align="center" mt={40} gap={{ base: 'md', md: 'xl' }}>
                    <Stack gap={4} align="center">
                      <Text c="rgba(255,255,255,0.4)" size="10px" tt="uppercase" fw={800} ls={1}>Портфолио</Text>
                      <Anchor href="https://yeee.kz" target="_blank" c="white" fw={900} size="lg" className="nav-link">YEEE.KZ</Anchor>
                    </Stack>
                    <Stack gap={4} align="center">
                      <Text c="rgba(255,255,255,0.4)" size="10px" tt="uppercase" fw={800} ls={1}>Связь с разработчиком</Text>
                      <Anchor href="https://wa.me/77066066323" target="_blank" c="white" fw={900} size="lg" className="nav-link">+7 706 606 6323</Anchor>
                    </Stack>
                  </Group>

                </Paper>
              </Grid.Col>

            </Grid>

            {/* Копирайт */}
            <Center mt={60}>
               <Text c="rgba(255,255,255,0.3)" fw={800} size="10px" tt="uppercase" ls={2} ta="center">
                 © 2026 AY TEAM x YERNIYAZ AGAEVICH. ALL RIGHTS RESERVED.
               </Text>
            </Center>

          </Container>
        </Box>

        {/* ========================================== */}
        {/* МОДАЛКА ТОВАРА */}
        {/* ========================================== */}
        <Modal
          opened={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          fullScreen
          transitionProps={{ transition: 'slide-up', duration: 400 }}
          withCloseButton={false}
          styles={{
            content: { backgroundColor: '#F8F9FA' }, 
            body: { padding: '20px', height: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column' } 
          }}
        >
          {selectedItem && (
            <Flex h="100%" pos="relative" gap="20px" direction={{ base: 'column', lg: 'row' }}>
              
              <ActionIcon 
                onClick={() => setSelectedItem(null)}
                pos="fixed" top={30} right={30}
                size={50} radius="100%" bg="#1B2E3D" c="white"
                style={{ zIndex: 300, boxShadow: '0 10px 20px rgba(27,46,61,0.2)' }}
                className="btn-hover"
              >
                <Icons.X />
              </ActionIcon>

              {/* Сайдбар - скрыт на мобилках */}
              <Paper 
                display={{ base: 'none', lg: 'flex' }}
                flexDirection="column"
                w={{ base: '100%', lg: '22%' }} h="100%" 
                bg="white" radius="40px" withBorder={false}
                style={{ overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}
              >
                <Center p="xl" style={{ borderBottom: '1px solid rgba(27,46,61,0.05)' }}>
                  <Text fw={900} size="10px" tt="uppercase" ls={2} c="rgba(27,46,61,0.5)">Index / Models</Text>
                </Center>
                <ScrollArea h="100%" type="hover">
                  <Stack gap={0}>
                    {catalogData.map((item) => {
                      const isActive = selectedItem.id === item.id;
                      return (
                        <UnstyledButton
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          p="lg"
                          bg={isActive ? '#F8F9FA' : 'transparent'}
                          style={{ transition: 'all 0.2s ease' }}
                        >
                          <Flex align="center" gap="md">
                            <Box w={40} h={40} p={4} bg="white" radius="8px" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                              <Image src={`/images/${item.main}`} fit="contain" h="100%" />
                            </Box>
                            <Text fw={isActive ? 800 : 600} size="sm" c={isActive ? '#1B2E3D' : 'rgba(27,46,61,0.6)'} tt="uppercase">
                              {item.name}
                            </Text>
                          </Flex>
                        </UnstyledButton>
                      );
                    })}
                  </Stack>
                </ScrollArea>
              </Paper>

              {/* Фото товара */}
              <Paper 
                w={{ base: '100%', lg: '50%' }} h={{ base: '45dvh', lg: '100%' }} 
                bg="white" radius="40px" withBorder={false}
                style={{ overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', position: 'relative' }}
              >
                {(() => {
                  const slides = [selectedItem.main, selectedItem.render, ...(selectedItem.schemes || [])].filter(Boolean);
                  return (
                    <Carousel
                      getEmblaApi={setEmbla}
                      loop
                      withIndicators
                      height="100%"
                      controlSize={50}
                      styles={{
                        root: { height: '100%' },
                        container: { height: '100%' },
                        slide: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' },
                        indicator: { 
                          width: 8, height: 8, radius: '50%', backgroundColor: 'rgba(27,46,61,0.2)',
                          transition: 'all 0.3s ease',
                          '&[data-active]': { backgroundColor: '#1B2E3D', transform: 'scale(1.5)' } 
                        },
                        control: { 
                          backgroundColor: 'white', color: '#1B2E3D', border: 'none',
                          boxShadow: '0 5px 15px rgba(27,46,61,0.1)',
                          '&:hover': { backgroundColor: '#F8F9FA' }
                        }
                      }}
                    >
                      {slides.map((img, idx) => (
                        <Carousel.Slide key={idx}>
                          <Box 
                            className="image-zoom"
                            onClick={() => setZoomedImage(`/images/${img}`)}
                            w="100%" h="100%" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <Image src={`/images/${img}`} h="100%" fit="contain" style={{ filter: 'drop-shadow(0 20px 40px rgba(27,46,61,0.08))' }} />
                            <Box pos="absolute" top={30} left={30} bg="rgba(255,255,255,0.8)" p={10} style={{ borderRadius: '50%', backdropFilter: 'blur(5px)', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                              <Icons.ZoomIn />
                            </Box>
                          </Box>
                        </Carousel.Slide>
                      ))}
                    </Carousel>
                  );
                })()}
              </Paper>

              {/* Детали и заказ */}
              <Paper 
                w={{ base: '100%', lg: '28%' }} h={{ base: 'calc(55dvh - 60px)', lg: '100%' }} 
                bg="white" radius="40px" withBorder={false}
                style={{ overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}
              >
                <ScrollArea h="100%">
                  <Stack p={{ base: '20px', md: '40px' }} gap="xl" h="100%">
                    <Center style={{ flexDirection: 'column', textAlign: 'center' }}>
                      <Badge variant="filled" bg="#1B2E3D" size="lg" radius="xl" ls={1} fw={800} py="sm" mb="lg">Модель</Badge>
                      <Title order={2} fw={900} size="clamp(28px, 3vw, 36px)" lh={1} c="#1B2E3D" tt="uppercase">
                        {selectedItem.name}
                      </Title>
                    </Center>

                    <Center>
                      <Box w="80%" h="1px" bg="rgba(27,46,61,0.05)" />
                    </Center>

                    <Box>
                      <Center mb="md">
                        <Text size="xs" c="rgba(27,46,61,0.5)" tt="uppercase" fw={800} ls={1}>Техническая база</Text>
                      </Center>
                      <SimpleGrid cols={2} spacing="md">
                        {(selectedItem.schemes || []).map((s, i) => (
                          <Paper key={i} p="md" radius="20px" bg="#F8F9FA" withBorder={false} onClick={() => setZoomedImage(`/images/${s}`)} style={{ cursor: 'zoom-in', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }} className="btn-hover">
                            <Image src={`/images/${s}`} h={80} fit="contain" />
                          </Paper>
                        ))}
                        <Paper p="md" radius="20px" bg="#F8F9FA" withBorder={false} onClick={() => setZoomedImage(`/images/${selectedItem.render}`)} style={{ cursor: 'zoom-in', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }} className="btn-hover">
                          <Image src={`/images/${selectedItem.render}`} h={80} fit="contain" />
                        </Paper>
                      </SimpleGrid>
                    </Box>

                    <Box mt="auto">
                      <Center mb="sm">
                        <Text size="10px" c="dimmed" tt="uppercase" fw={800} ls={1}>Связаться для заказа</Text>
                      </Center>
                      <Grid gutter="sm">
                        <Grid.Col span={6}>
                          <Button
                            component="a"
                            href={`https://wa.me/77052727304?text=${encodeURIComponent(`Здравствуйте, Айдос! Интересует расчет модели AY TEAM: ${selectedItem.name}.`)}`}
                            target="_blank"
                            fullWidth radius="xl" h="50px" fw={700}
                            style={{ backgroundColor: "#1B2E3D", color: "white", boxShadow: "0 5px 15px rgba(27,46,61,0.15)" }}
                            className="btn-hover"
                          >
                            Айдос
                          </Button>
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <Button
                            component="a"
                            href={`https://wa.me/77476509747?text=${encodeURIComponent(`Здравствуйте, Темирлан! Интересует расчет модели AY TEAM: ${selectedItem.name}.`)}`}
                            target="_blank"
                            fullWidth radius="xl" h="50px" fw={700}
                            style={{ backgroundColor: "#1B2E3D", color: "white", boxShadow: "0 5px 15px rgba(27,46,61,0.15)" }}
                            className="btn-hover"
                          >
                            Темирлан
                          </Button>
                        </Grid.Col>
                      </Grid>
                    </Box>

                    <Center mt="xs">
                      <Anchor href="https://wa.me/77066066323" target="_blank" c="rgba(27,46,61,0.4)" size="10px" fw={800} tt="uppercase" ls={1} className="nav-link">
                        Web Dev by Yerniyaz
                      </Anchor>
                    </Center>
                  </Stack>
                </ScrollArea>
              </Paper>

            </Flex>
          )}
        </Modal>

        {/* ========================================== */}
        {/* LIGHTBOX ДЛЯ ЗУМА */}
        {/* ========================================== */}
        <Modal
          opened={!!zoomedImage}
          onClose={() => setZoomedImage(null)}
          fullScreen
          transitionProps={{ transition: 'fade', duration: 300 }}
          withCloseButton={false}
          styles={{
            content: { backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' },
            body: { padding: 0, height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }}
        >
          {zoomedImage && (
            <Box w="100%" h="100%" onClick={() => setIsZoomScale(!isZoomScale)} style={{ cursor: isZoomScale ? 'zoom-out' : 'zoom-in', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              
              <ActionIcon 
                onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
                pos="fixed" top={30} right={30}
                size={50} radius="100%" bg="#1B2E3D" c="white"
                style={{ zIndex: 300, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                className="btn-hover"
              >
                <Icons.X />
              </ActionIcon>

              <Image 
                src={zoomedImage} 
                fit="contain" 
                w="90%" h="90%" 
                style={{ 
                  transform: isZoomScale ? 'scale(1.8)' : 'scale(1)',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: 'drop-shadow(0 40px 80px rgba(27,46,61,0.1))'
                }} 
              />
              
              <Paper pos="absolute" bottom={40} p="8px 20px" radius="xl" bg="white" withBorder={false} style={{ pointerEvents: 'none', boxShadow: '0 5px 15px rgba(27,46,61,0.05)' }}>
                <Text size="xs" c="#1B2E3D" tt="uppercase" fw={800} ls={1}>
                  {isZoomScale ? 'Отдалить' : 'Приблизить'}
                </Text>
              </Paper>

            </Box>
          )}
        </Modal>

      </Box>
    </MantineProvider>
  );
}