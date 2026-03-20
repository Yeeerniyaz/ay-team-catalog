/**
 * PROJECT: AY TEAM Fullscreen Showroom
 * VERSION: 9.0 (Mobile Feed Perfection)
 * ROLE: Senior Architect
 * DESCRIPTION: Десктоп - слайды. Мобилка - лента страниц по дизайну заказчика.
 */

import React, { useState, useEffect } from 'react';
import { MantineProvider, Box, Flex, Image, Text, Title, ActionIcon, Paper, Tooltip, SimpleGrid, Group } from '@mantine/core';
import { IconBrandWhatsapp, IconBrandInstagram, IconChevronDown, IconMaximize, IconMinimize, IconPhone } from '@tabler/icons-react';
import catalogData from './data.json';
import './index.css';

const theme = {
  fontFamily: 'Montserrat, sans-serif',
};

export default function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Полноэкранный режим
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Ошибка при переходе в полный экран: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <MantineProvider theme={theme}>
      
      {/* ПЛАВАЮЩАЯ ПАНЕЛЬ КОНТАКТОВ И УПРАВЛЕНИЯ */}
      <Paper
        pos="fixed"
        bottom={{ base: 20, md: 40 }}
        right={{ base: 10, md: 40 }}
        zIndex={9999}
        radius="xl"
        p="xs"
        bg="rgba(255, 255, 255, 0.85)"
        style={{ 
          backdropFilter: 'blur(15px)', 
          border: '1px solid rgba(0,0,0,0.1)', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)' 
        }}
      >
        <Flex direction="column" gap="md" align="center">
          <Tooltip label="На весь экран" position="left" withArrow>
            <ActionIcon size="xl" radius="xl" variant="subtle" color="dark" onClick={toggleFullscreen}>
              {isFullscreen ? <IconMinimize size={24} /> : <IconMaximize size={24} />}
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Позвонить" position="left" withArrow>
            <ActionIcon size="xl" radius="xl" variant="light" color="dark" component="a" href="tel:+77476509747">
              <IconPhone size={24} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="WhatsApp" position="left" withArrow>
            <ActionIcon size="xl" radius="xl" variant="filled" color="green.6" component="a" href="https://wa.me/77476509747" target="_blank">
              <IconBrandWhatsapp size={26} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Instagram" position="left" withArrow>
            <ActionIcon size="xl" radius="xl" variant="filled" color="dark" component="a" href="https://instagram.com/ayteam_mebel" target="_blank" bg="linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)">
              <IconBrandInstagram size={26} />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Paper>

      {/* ГЛОБАЛЬНЫЙ КОНТЕЙНЕР */}
      <Box className="snap-container">
        
        {/* --- 1. ТИТУЛЬНЫЙ СЛАЙД --- */}
        <Box className="snap-slide" bg="#000000" c="white" pos="relative">
           <Image 
             src="/images/ayteam_item_1_1.webp" 
             pos="absolute" top={0} left={0} w="100%" h="100%" fit="cover" opacity={0.2} 
           />
           <Flex direction="column" align="center" justify="center" h="100%" pos="relative" zIndex={2}>
              <Title order={1} style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }} tracking={10} tt="uppercase" fw={900}>
                AYTEAM
              </Title>
              <Text size="sm" tracking={8} mt="lg" c="dimmed" tt="uppercase">
                SHOWROOM 2026
              </Text>
           </Flex>
           <Box pos="absolute" bottom={40} left={0} right={0} ta="center" zIndex={2}>
              <ActionIcon variant="transparent" c="white" size="xl" className="bounce" mx="auto">
                 <IconChevronDown size={40} />
              </ActionIcon>
           </Box>
        </Box>

        {/* --- 2. КАТАЛОГ ТОВАРОВ --- */}
        {catalogData.map((item, index) => {
          const pageNum = index + 1;
          
          return (
          <Box key={item.id} className="snap-slide" bg="transparent">
            
            {/* ====== ВЕРСИЯ ДЛЯ ПК (Осталась полноэкранной) ====== */}
            <Flex h="100%" visibleFrom="md" bg="#ffffff">
              <Flex w={120} direction="column" align="center" justify="center" style={{ borderRight: '1px solid #f0f0f0' }} pos="relative">
                <Title order={2} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '4px', textTransform: 'uppercase', color: '#1B2E3D', fontSize: '32px' }}>
                  {item.name}
                </Title>
                <Text pos="absolute" bottom={40} size="xs" c="dimmed" fw={700} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '2px' }}>
                  AY TEAM | DESIGN 2026
                </Text>
              </Flex>

              <Box flex={1} h="100%" bg="#f8f9fa">
                <Image src={`/images/${item.main}`} h="100%" w="100%" fit="cover" />
              </Box>

              <Flex w={400} direction="column" h="100%" style={{ borderLeft: '1px solid #f0f0f0' }}>
                <Box h="33.33%" p="xl" style={{ borderBottom: '1px solid #f0f0f0' }}>
                  {item.render && <Image src={`/images/${item.render}`} h="100%" fit="contain" />}
                </Box>
                <Box h="33.33%" p="xl" style={{ borderBottom: '1px solid #f0f0f0' }}>
                  {item.schemes?.[0] && <Image src={`/images/${item.schemes[0]}`} h="100%" fit="contain" />}
                </Box>
                <Box h="33.33%" p="xl" pos="relative">
                  {item.schemes?.[1] && <Image src={`/images/${item.schemes[1]}`} h="100%" fit="contain" />}
                  <Text pos="absolute" bottom={20} right={20} size="sm" c="dimmed" fw={900}>
                    {pageNum < 10 ? `0${pageNum}` : pageNum}
                  </Text>
                </Box>
              </Flex>
            </Flex>

            {/* ====== МОБИЛЬНАЯ ВЕРСИЯ (Лента как на скриншоте) ====== */}
            <Box hiddenFrom="md" p="sm" pb={0}>
              <Paper radius="sm" p="md" shadow="xs" bg="white" pos="relative" style={{ border: '1px solid #eaeaea' }}>
                
                {/* Шапка карточки */}
                <Flex direction="column" align="center" mb="md" pt="xs">
                  <Title order={3} tt="uppercase" size="h4" c="#1B2E3D" fw={900} tracking={1}>
                    {item.name}
                  </Title>
                  <Text size="8px" c="dimmed" tt="uppercase" tracking={2} fw={700} mt={3}>
                    AY TEAM CATALOG 2026
                  </Text>
                </Flex>

                {/* Главное фото */}
                <Box mb="lg" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                  <Image src={`/images/${item.main}`} w="100%" fit="cover" />
                </Box>

                {/* Три миниатюры ровно в ряд (Рендер + Схемы) */}
                <SimpleGrid cols={3} spacing="xs" mb="md" align="flex-end">
                  <Box h={80}>
                    {item.render ? <Image src={`/images/${item.render}`} h="100%" fit="contain" /> : null}
                  </Box>
                  <Box h={80}>
                    {item.schemes?.[0] ? <Image src={`/images/${item.schemes[0]}`} h="100%" fit="contain" /> : null}
                  </Box>
                  <Box h={80}>
                    {item.schemes?.[1] ? <Image src={`/images/${item.schemes[1]}`} h="100%" fit="contain" /> : null}
                  </Box>
                </SimpleGrid>

                {/* Номер страницы */}
                <Text pos="absolute" bottom={10} right={15} size="10px" c="dimmed" fw={900}>
                  {pageNum < 10 ? `0${pageNum}` : pageNum}
                </Text>

              </Paper>
            </Box>

          </Box>
        )})}

        {/* --- 3. ФИНАЛЬНЫЙ СЛАЙД --- */}
        <Box className="snap-slide" bg="#000000" c="white">
           <Flex direction="column" align="center" justify="center" h="100%">
              <Title order={2} style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }} tracking={5} tt="uppercase" mb="xl" ta="center">
                ИНДИВИДУАЛЬНЫЙ<br/>ПОДХОД
              </Title>
              <Text c="dimmed" mb={50} tracking={2} tt="uppercase" size="sm">Свяжитесь с нами для заказа</Text>
              
              <Group gap="xl">
                <ActionIcon variant="transparent" c="#ff6600" size="xl" component="a" href="https://wa.me/77476509747" target="_blank">
                  <IconBrandWhatsapp size={60} stroke={1.5} />
                </ActionIcon>
                <ActionIcon variant="transparent" c="white" size="xl" component="a" href="https://instagram.com/ayteam_mebel" target="_blank">
                  <IconBrandInstagram size={60} stroke={1.5} />
                </ActionIcon>
              </Group>
           </Flex>
        </Box>

      </Box>
    </MantineProvider>
  );
}