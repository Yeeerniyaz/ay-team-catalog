/**
 * PROJECT: AY TEAM Fullscreen Showroom
 * VERSION: 8.0 (Mobile UX Perfection & Floating Dock)
 * ROLE: Senior Architect
 * DESCRIPTION: Идеальные пропорции на смартфоне, крупные чертежи-свайпы, кнопка Fullscreen и контакты.
 */

import React, { useState, useEffect } from 'react';
import { MantineProvider, Box, Flex, Image, Text, Title, ActionIcon, Paper, Tooltip } from '@mantine/core';
import { IconBrandWhatsapp, IconBrandInstagram, IconChevronDown, IconMaximize, IconMinimize, IconPhone } from '@tabler/icons-react';
import catalogData from './data.json';
import './index.css';

const theme = {
  fontFamily: 'Montserrat, sans-serif',
};

export default function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Логика перехода в полноэкранный режим (как F11)
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

  // Слушаем системные изменения полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <MantineProvider theme={theme}>
      
      {/* ПЛАВАЮЩАЯ ПАНЕЛЬ КОНТАКТОВ И УПРАВЛЕНИЯ (FLOATING DOCK) */}
      {/* Видна всегда, поверх всех слайдов */}
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

      {/* --- ГЛОБАЛЬНЫЙ КОНТЕЙНЕР ПРЕЗЕНТАЦИИ --- */}
      <Box className="snap-container">
        
        {/* --- 1. ТИТУЛЬНЫЙ СЛАЙД (ОБЛОЖКА) --- */}
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

        {/* --- 2. СЛАЙДЫ КАТАЛОГА --- */}
        {catalogData.map((item, index) => {
          const pageNum = index + 1;
          
          return (
          <Box key={item.id} className="snap-slide" bg="#ffffff">
            
            {/* --- ВЕРСИЯ ДЛЯ ПК (Landscape PDF Style) --- */}
            <Flex h="100%" visibleFrom="md">
              <Flex w={120} direction="column" align="center" justify="center" style={{ borderRight: '1px solid #f0f0f0' }} pos="relative" bg="#ffffff">
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

              <Flex w={400} direction="column" h="100%" style={{ borderLeft: '1px solid #f0f0f0' }} bg="#ffffff">
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

            {/* --- МОБИЛЬНАЯ ВЕРСИЯ (Portrait 100dvh Perfection) --- */}
            <Flex h="100%" direction="column" hiddenFrom="md" bg="#ffffff">
              
              {/* Шапка (10% высоты) */}
              <Flex h="10%" align="center" justify="center" style={{ borderBottom: '1px solid #f0f0f0' }}>
                <Title order={3} tt="uppercase" size="h4" c="#1B2E3D" tracking={3} fw={900}>
                  {item.name}
                </Title>
              </Flex>

              {/* Главное фото (55% высоты) */}
              <Box h="55%" w="100%" bg="#f8f9fa" style={{ overflow: 'hidden' }}>
                <Image src={`/images/${item.main}`} h="100%" w="100%" fit="cover" />
              </Box>

              {/* Нижний блок: Горизонтальный свайп крупных чертежей (35% высоты) */}
              <Box h="35%" w="100%" bg="#ffffff" style={{ borderTop: '1px solid #f0f0f0', position: 'relative' }}>
                
                {/* Подсказка для свайпа */}
                <Text pos="absolute" top={5} left={15} size="10px" c="dimmed" tt="uppercase" fw={700} tracking={2} zIndex={5}>
                  Свайп для чертежей →
                </Text>
                
                <Box className="horiz-scroll" h="100%" p="md">
                  {/* Рендер крупно */}
                  {item.render && (
                    <Box className="horiz-item">
                      <Image src={`/images/${item.render}`} h="100%" w="100%" fit="contain" />
                    </Box>
                  )}
                  {/* Схема 1 крупно */}
                  {item.schemes?.[0] && (
                    <Box className="horiz-item">
                      <Image src={`/images/${item.schemes[0]}`} h="100%" w="100%" fit="contain" />
                    </Box>
                  )}
                  {/* Схема 2 крупно */}
                  {item.schemes?.[1] && (
                    <Box className="horiz-item" pos="relative">
                      <Image src={`/images/${item.schemes[1]}`} h="100%" w="100%" fit="contain" />
                    </Box>
                  )}
                </Box>

                {/* Номер страницы */}
                <Text pos="absolute" bottom={10} left={15} size="12px" c="dimmed" fw={900}>
                  {pageNum < 10 ? `0${pageNum}` : pageNum} / {catalogData.length}
                </Text>
              </Box>

            </Flex>
          </Box>
        )})}

      </Box>
    </MantineProvider>
  );
}