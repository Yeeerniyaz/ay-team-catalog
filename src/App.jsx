/**
 * PROJECT: AY TEAM Fullscreen Showroom
 * VERSION: 7.0 (Scroll Snap Edition)
 * ROLE: Senior Architect
 * DESCRIPTION: Сайт работает как PDF-вьювер или Stories. Один свайп = одна модель.
 */

import React from 'react';
import { MantineProvider, Box, Flex, Image, Text, Title, ActionIcon, Group } from '@mantine/core';
import { IconBrandWhatsapp, IconBrandInstagram, IconChevronDown } from '@tabler/icons-react';
import catalogData from './data.json';
import './index.css';

const theme = {
  fontFamily: 'Montserrat, sans-serif',
};

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Box className="snap-container">
        
        {/* --- 1. ТИТУЛЬНЫЙ СЛАЙД (ОБЛОЖКА) --- */}
        <Box className="snap-slide" bg="#000000" c="white" pos="relative">
           {/* Легкий фоновый паттерн */}
           <Image 
             src="/images/ayteam_item_1_1.webp" 
             pos="absolute" top={0} left={0} w="100%" h="100%" fit="cover" opacity={0.15} 
           />
           <Flex direction="column" align="center" justify="center" h="100%" pos="relative" zIndex={2}>
              <Title order={1} style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }} tracking={10} tt="uppercase" fw={900}>
                AYTEAM
              </Title>
              <Text size="sm" tracking={8} mt="lg" c="dimmed" tt="uppercase">
                SHOWROOM 2026
              </Text>
           </Flex>
           {/* Подсказка для скролла */}
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
              {/* Левая панель с вертикальным текстом */}
              <Flex w={120} direction="column" align="center" justify="center" style={{ borderRight: '1px solid #f0f0f0' }} pos="relative" bg="#ffffff">
                <Title order={2} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '4px', textTransform: 'uppercase', color: '#1B2E3D', fontSize: '32px' }}>
                  {item.name}
                </Title>
                <Text pos="absolute" bottom={40} size="xs" c="dimmed" fw={700} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '2px' }}>
                  AY TEAM | DESIGN 2026
                </Text>
              </Flex>

              {/* Главное фото (Заливает весь центр) */}
              <Box flex={1} h="100%" bg="#f8f9fa">
                <Image src={`/images/${item.main}`} h="100%" w="100%" fit="cover" />
              </Box>

              {/* Правая колонка со схемами */}
              <Flex w={380} direction="column" h="100%" style={{ borderLeft: '1px solid #f0f0f0' }} bg="#ffffff">
                <Box h="33.33%" p="xl" style={{ borderBottom: '1px solid #f0f0f0' }}>
                  {item.render && <Image src={`/images/${item.render}`} h="100%" fit="contain" />}
                </Box>
                <Box h="33.33%" p="xl" style={{ borderBottom: '1px solid #f0f0f0' }}>
                  {item.schemes?.[0] && <Image src={`/images/${item.schemes[0]}`} h="100%" fit="contain" />}
                </Box>
                <Box h="33.33%" p="xl" pos="relative">
                  {item.schemes?.[1] && <Image src={`/images/${item.schemes[1]}`} h="100%" fit="contain" />}
                  {/* Нумерация страницы */}
                  <Text pos="absolute" bottom={20} right={20} size="sm" c="dimmed" fw={900}>
                    {pageNum < 10 ? `0${pageNum}` : pageNum}
                  </Text>
                </Box>
              </Flex>
            </Flex>

            {/* --- МОБИЛЬНАЯ ВЕРСИЯ (Portrait PDF Style) --- */}
            <Flex h="100%" direction="column" hiddenFrom="md" bg="#ffffff">
              {/* Шапка с названием */}
              <Flex h={70} align="center" justify="center" style={{ borderBottom: '1px solid #f0f0f0' }}>
                <Title order={3} tt="uppercase" size="h4" c="#1B2E3D" tracking={3} fw={900}>
                  {item.name}
                </Title>
              </Flex>

              {/* Главное фото */}
              <Box flex={1} w="100%" bg="#f8f9fa" style={{ overflow: 'hidden' }}>
                <Image src={`/images/${item.main}`} h="100%" w="100%" fit="cover" />
              </Box>

              {/* Нижний блок с миниатюрами */}
              <Flex h={160} w="100%" p="md" gap="md" style={{ borderTop: '1px solid #f0f0f0' }}>
                {item.render && (
                  <Box flex={1} style={{ overflow: 'hidden' }}>
                    <Image src={`/images/${item.render}`} h="100%" fit="contain" />
                  </Box>
                )}
                {item.schemes?.[0] && (
                  <Box flex={1} style={{ overflow: 'hidden' }}>
                    <Image src={`/images/${item.schemes[0]}`} h="100%" fit="contain" />
                  </Box>
                )}
                {item.schemes?.[1] && (
                  <Box flex={1} pos="relative" style={{ overflow: 'hidden' }}>
                    <Image src={`/images/${item.schemes[1]}`} h="100%" fit="contain" />
                    <Text pos="absolute" bottom={0} right={5} size="10px" c="dimmed" fw={900}>
                      {pageNum < 10 ? `0${pageNum}` : pageNum}
                    </Text>
                  </Box>
                )}
              </Flex>
            </Flex>

          </Box>
        )})}

        {/* --- 3. ФИНАЛЬНЫЙ СЛАЙД (КОНТАКТЫ) --- */}
        <Box className="snap-slide" bg="#000000" c="white">
           <Flex direction="column" align="center" justify="center" h="100%">
              <Title order={2} style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }} tracking={5} tt="uppercase" mb="xl" ta="center">
                ИНДИВИДУАЛЬНЫЙ<br/>ПОДХОД
              </Title>
              <Text c="dimmed" mb={50} tracking={2} tt="uppercase" size="sm">Свяжитесь с нами для заказа</Text>
              
              <Group gap="xl">
                {/* Оранжевый акцент для целевого действия */}
                <ActionIcon variant="transparent" c="#ff6600" size="xl" component="a" href="https://wa.me/77476509747" target="_blank" style={{ transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <IconBrandWhatsapp size={80} stroke={1.5} />
                </ActionIcon>
                <ActionIcon variant="transparent" c="white" size="xl" component="a" href="https://instagram.com/ayteam_mebel" target="_blank" style={{ transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <IconBrandInstagram size={80} stroke={1.5} />
                </ActionIcon>
              </Group>
           </Flex>
        </Box>

      </Box>
    </MantineProvider>
  );
}