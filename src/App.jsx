/**
 * PROJECT: AY TEAM Fullscreen Showroom
 * VERSION: 11.0 (Mobile Bottom Dock & Easy Proportions)
 * ROLE: Senior Architect
 * DESCRIPTION: Десктоп идеален. На мобилке кнопки снизу (Dock) + вынесены настройки пропорций экрана.
 */

import React, { useState, useEffect } from 'react';
import { MantineProvider, Box, Flex, Image, Text, Title, ActionIcon, Paper, Tooltip } from '@mantine/core';
import { IconBrandWhatsapp, IconBrandInstagram, IconChevronDown, IconMaximize, IconMinimize, IconPhone } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import catalogData from './data.json';
import './index.css';

const theme = {
  fontFamily: 'Montserrat, sans-serif',
};

// =====================================================================
// ⚙️ УПРАВЛЕНИЕ ПРОПОРЦИЯМИ (ТОЛЬКО ДЛЯ МОБИЛЬНОЙ ВЕРСИИ)
// Вы можете менять эти проценты. Главное, чтобы в сумме было 100%
// =====================================================================
const MOBILE_LAYOUT = {
  header: '10%',    // Высота блока с названием мебели (Шапка)
  mainImage: '65%', // Высота главного большого фото
  thumbnails: '25%' // Высота трех нижних миниатюр (рендер + схемы)
};
// =====================================================================

export default function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 48em)'); // Проверка на мобилку

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.error(err));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <MantineProvider theme={theme}>
      
      {/* --- ПЛАВАЮЩЕЕ УПРАВЛЕНИЕ (GLASSMORPHISM DOCK) --- */}
      {/* На ПК - справа сбоку (вертикально). На МОБИЛКЕ - снизу по центру (горизонтально) */}
      <Paper
        pos="fixed"
        bottom={isMobile ? 20 : 40}
        left={isMobile ? '50%' : 'auto'}
        right={isMobile ? 'auto' : 40}
        zIndex={99999} 
        radius="xl"
        p="xs"
        bg="rgba(255, 255, 255, 0.4)" 
        style={{ 
          transform: isMobile ? 'translateX(-50%)' : 'none', // Центрируем на мобилке
          backdropFilter: 'blur(20px)', 
          WebkitBackdropFilter: 'blur(20px)', 
          border: '1px solid rgba(255,255,255,0.5)', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)' 
        }}
      >
        {/* Flex меняет направление: row (в ряд) на мобилке, column (в столбик) на ПК */}
        <Flex direction={isMobile ? 'row' : 'column'} gap="md" align="center" px={isMobile ? "sm" : 0}>
          <Tooltip label="На весь экран" position={isMobile ? "top" : "left"} withArrow>
            <ActionIcon size="xl" radius="xl" variant="transparent" c="dark.9" onClick={toggleFullscreen}>
              {isFullscreen ? <IconMinimize size={26} stroke={1.5} /> : <IconMaximize size={26} stroke={1.5} />}
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Позвонить" position={isMobile ? "top" : "left"} withArrow>
            <ActionIcon size="xl" radius="xl" variant="transparent" c="dark.9" component="a" href="tel:+77476509747">
              <IconPhone size={26} stroke={1.5} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="WhatsApp" position={isMobile ? "top" : "left"} withArrow>
            <ActionIcon size="xl" radius="xl" variant="transparent" c="#25D366" component="a" href="https://wa.me/77476509747" target="_blank">
              <IconBrandWhatsapp size={28} stroke={1.5} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Instagram" position={isMobile ? "top" : "left"} withArrow>
            <ActionIcon size="xl" radius="xl" variant="transparent" c="#E1306C" component="a" href="https://instagram.com/ayteam_mebel" target="_blank">
              <IconBrandInstagram size={28} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Paper>

      {/* --- ГЛОБАЛЬНЫЙ КОНТЕЙНЕР ПРЕЗЕНТАЦИИ --- */}
      <Box className="snap-container">
        
        {/* СЛАЙД 1: ОБЛОЖКА */}
        <Box className="snap-slide" bg="#000000" c="white" pos="relative">
           <Image 
             src="/images/ayteam_item_1_1.webp" 
             pos="absolute" top={0} left={0} w="100%" h="100%" fit="cover" opacity={0.2} 
           />
           <Flex direction="column" align="center" justify="center" h="100%" pos="relative" zIndex={2}>
              <Title order={1} style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }} tracking={10} tt="uppercase" fw={900}>
                AYTEAM
              </Title>
              <Text size="sm" tracking={8} mt="lg" c="dimmed" tt="uppercase" ta="center">
                SHOWROOM 2026
              </Text>
           </Flex>
           <Box pos="absolute" bottom={100} left={0} right={0} ta="center" zIndex={2}>
              <ActionIcon variant="transparent" c="white" size="xl" className="bounce" mx="auto">
                 <IconChevronDown size={40} />
              </ActionIcon>
           </Box>
        </Box>

        {/* СЛАЙДЫ КАТАЛОГА */}
        {catalogData.map((item, index) => {
          const pageNum = index + 1;
          
          return (
          <Box key={item.id} className="snap-slide" bg="#ffffff">
            
            {/* ====== ПК ВЕРСИЯ (Альбомная - ИДЕАЛЬНАЯ, БЕЗ ИЗМЕНЕНИЙ) ====== */}
            <Flex h="100%" visibleFrom="md">
              <Flex w={120} direction="column" align="center" justify="center" style={{ borderRight: '1px solid #f0f0f0' }} pos="relative">
                <Title order={2} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '4px', textTransform: 'uppercase', color: '#1B2E3D', fontSize: '32px' }}>
                  {item.name}
                </Title>
                <Text pos="absolute" bottom={40} size="xs" c="dimmed" fw={700} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '2px' }}>
                  AY TEAM | DESIGN 2026
                </Text>
              </Flex>

              <Box flex={1} h="100%" bg="#f8f9fa" p="xl">
                <Image src={`/images/${item.main}`} h="100%" w="100%" fit="contain" />
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

            {/* ====== МОБИЛЬНАЯ ВЕРСИЯ С УПРАВЛЕНИЕМ ПРОПОРЦИЯМИ ====== */}
            {/* Используем константу MOBILE_LAYOUT для высоты блоков */}
            <Flex h="100%" direction="column" hiddenFrom="md" bg="#ffffff" pos="relative" pb={isMobile ? 80 : 0}>
              
              {/* Шапка */}
              <Flex h={MOBILE_LAYOUT.header} align="center" justify="center" style={{ borderBottom: '1px solid #f0f0f0' }}>
                <Title order={3} tt="uppercase" size="h4" c="#1B2E3D" tracking={2} fw={900} ta="center" px="sm">
                  {item.name}
                </Title>
              </Flex>

              {/* Главное фото */}
              <Box h={MOBILE_LAYOUT.mainImage} w="100%" bg="#f8f9fa" p="sm">
                <Image src={`/images/${item.main}`} h="100%" w="100%" fit="contain" />
              </Box>

              {/* Миниатюры внизу */}
              <Flex h={MOBILE_LAYOUT.thumbnails} w="100%" p="xs" gap="xs" style={{ borderTop: '1px solid #f0f0f0' }} bg="#ffffff">
                <Box flex={1} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #f0f0f0' }} p={4}>
                  {item.render && <Image src={`/images/${item.render}`} h="100%" w="100%" fit="contain" />}
                </Box>
                <Box flex={1} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #f0f0f0' }} p={4}>
                  {item.schemes?.[0] && <Image src={`/images/${item.schemes[0]}`} h="100%" w="100%" fit="contain" />}
                </Box>
                <Box flex={1} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #f0f0f0' }} p={4} pos="relative">
                  {item.schemes?.[1] && <Image src={`/images/${item.schemes[1]}`} h="100%" w="100%" fit="contain" />}
                  <Text pos="absolute" top={2} right={5} size="10px" c="dimmed" fw={900}>
                    {pageNum < 10 ? `0${pageNum}` : pageNum}
                  </Text>
                </Box>
              </Flex>
            </Flex>

          </Box>
        )})}

        {/* ФИНАЛЬНЫЙ СЛАЙД */}
        <Box className="snap-slide" bg="#000000" c="white">
           <Flex direction="column" align="center" justify="center" h="100%" pb={80}>
              <Title order={2} style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }} tracking={5} tt="uppercase" mb="xl" ta="center">
                AYTEAM
              </Title>
              <Text c="dimmed" mb={50} tracking={2} tt="uppercase" size="sm" ta="center">Идеальная мебель<br/>для вашего интерьера</Text>
           </Flex>
        </Box>

      </Box>
    </MantineProvider>
  );
}