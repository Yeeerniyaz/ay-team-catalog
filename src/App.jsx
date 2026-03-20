/**
 * PROJECT: AY TEAM Avant-Garde Showroom
 * VERSION: 12.0 (Smart Typography, Interactive Zoom & Fixed Contacts)
 * ROLE: Senior Architect
 * DESCRIPTION: Полноэкранная презентация. Умный заголовок слева, система Зума на ПК, фиксированные контакты.
 */

import React, { useState, useEffect } from 'react';
import { 
  MantineProvider, Box, Flex, Image, Text, Title, ActionIcon, Paper, Tooltip, Group, createTheme, rem
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useDisclosure, useWindowScroll, useMediaQuery } from '@mantine/hooks';
import { 
  IconBrandWhatsapp, IconBrandInstagram, IconChevronDown, 
  IconMaximize, IconMinimize, IconPhone, IconZoomIn, IconZoomOut 
} from '@tabler/icons-react';
import catalogData from './data.json';
import './index.css';

const avantGardeTheme = createTheme({
  primaryColor: 'dark',
  fontFamily: 'Montserrat, sans-serif',
  headings: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 900,
  },
  colors: {
    dark: [
      '#C1C2C5', '#A6A7AB', '#909296', '#5C5F66', '#373A40',
      '#2C2E33', '#25262B', '#1A1B1E', '#141517', '#000000'
    ],
  },
  components: {
    Button: {
      defaultProps: { radius: 0, size: 'lg' },
      styles: { 
        root: { 
          textTransform: 'uppercase', 
          letterSpacing: '2px', 
          transition: 'all 0.3s ease' 
        } 
      },
    },
    Tooltip: {
      defaultProps: { radius: 0, withArrow: true }
    }
  }
});

// Настройки пропорций для мобильной версии (как в v11)
const MOBILE_LAYOUT = {
  header: '10%',
  mainImage: '65%',
  thumbnails: '25%'
};

export default function App() {
  const [scroll] = useWindowScroll();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 48em)');

  // Стэйт для хранения масштаба картинок товаров. Ключ - ID товара, значение - масштаб.
  const [productScales, setProductScales] = useState({});

  // --- ЛОГИКА ПОЛНОЭКРАННОГО РЕЖИМА (F11) ---
  const toggleFullscreen = function() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(function(err) {
        console.error(`Ошибка при переходе в полный экран: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // --- ЛОГИКА ИНТЕРАКТИВНОГО ЗУМА (ТОЛЬКО ПК) ---
  const handleZoom = function(itemId, direction) {
    const currentScale = productScales[itemId] || 1;
    let newScale = currentScale;

    if (direction === 'in' && currentScale < 3) {
      newScale = currentScale + 0.5;
    } else if (direction === 'out' && currentScale > 1) {
      newScale = currentScale - 0.5;
    }

    setProductScales(function(prev) {
      return { ...prev, [itemId]: newScale };
    });
  };

  useEffect(function() {
    const handleFullscreenChange = function() {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return function() {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <MantineProvider theme={avantGardeTheme}>
      <Box bg="#ffffff" style={{ minHeight: '100vh' }}>
        
        {/* === ФИКСИРОВАННАЯ ПАНЕЛЬ КОНТАКТОВ (GLASSMORPHISM) === */}
        {/* Доступна всегда, на любом слайде. zIndex 99999 гарантирует нахождение поверх всего. */}
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
            transform: isMobile ? 'translateX(-50%)' : 'none',
            backdropFilter: 'blur(20px)', 
            WebkitBackdropFilter: 'blur(20px)', 
            border: '1px solid rgba(255,255,255,0.5)', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)' 
          }}
        >
          <Flex direction={isMobile ? 'row' : 'column'} gap="md" align="center" px={isMobile ? "sm" : 0}>
            <Tooltip label="На весь экран (F11)" position={isMobile ? "top" : "left"}>
              <ActionIcon size="xl" radius="xl" variant="transparent" c="dark.9" onClick={toggleFullscreen}>
                {isFullscreen ? <IconMinimize size={26} stroke={1.5} /> : <IconMaximize size={26} stroke={1.5} />}
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Позвонить" position={isMobile ? "top" : "left"}>
              <ActionIcon size="xl" radius="xl" variant="transparent" c="dark.9" component="a" href="tel:+77476509747">
                <IconPhone size={26} stroke={1.5} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="WhatsApp" position={isMobile ? "top" : "left"}>
              <ActionIcon size="xl" radius="xl" variant="transparent" c="#25D366" component="a" href="https://wa.me/77476509747" target="_blank">
                <IconBrandWhatsapp size={28} stroke={1.5} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Instagram" position={isMobile ? "top" : "left"}>
              <ActionIcon size="xl" radius="xl" variant="transparent" c="#E1306C" component="a" href="https://instagram.com/ayteam_mebel" target="_blank">
                <IconBrandInstagram size={28} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </Paper>

        {/* --- ГЛОБАЛЬНЫЙ КОНТЕЙНЕР ПРЕЗЕНТАЦИИ (SNAP SCROLL) --- */}
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
             <Box pos="absolute" bottom={isMobile ? 100 : 40} left={0} right={0} ta="center" zIndex={2}>
                <ActionIcon variant="transparent" c="white" size="xl" className="bounce" mx="auto">
                   <IconChevronDown size={40} />
                </ActionIcon>
             </Box>
          </Box>

          {/* СЛАЙДЫ КАТАЛОГА */}
          {catalogData.map(function(item, index) {
            const pageNum = index + 1;
            const currentZoom = productScales[item.id] || 1;
            
            return (
            <Box key={item.id} className="snap-slide" bg="#ffffff">
              
              {/* ====== ПК ВЕРСИЯ (Альбомная) ====== */}
              <Flex h="100%" visibleFrom="md">
                
                {/* Левая панель: Умная типографика */}
                <Flex 
                  w={140} 
                  direction="column" 
                  align="center" 
                  justify="center" 
                  style={{ borderRight: '1px solid #f0f0f0' }} 
                  pos="relative"
                  px="md"
                >
                  <Title 
                    order={2} 
                    style={{ 
                      writingMode: 'vertical-rl', 
                      transform: 'rotate(180deg)', 
                      letterSpacing: '4px', 
                      textTransform: 'uppercase', 
                      color: '#000000', 
                      fontSize: rem(32),
                      lineHeight: 1.1,
                      // Умное решение для длинного текста:
                      whiteSpace: 'normal', // Разрешаем перенос строки
                      maxHeight: '80vh',   // Ограничиваем высоту текста
                      overflow: 'hidden',   // Скрываем лишнее
                      textOverflow: 'ellipsis' // Добавляем многоточие
                    }}
                  >
                    {item.name || 'МОДЕЛЬ'}
                  </Title>
                  <Text pos="absolute" bottom={40} size="xs" c="dimmed" fw={700} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '2px' }}>
                    AY TEAM | COLLECTION 2026
                  </Text>
                </Flex>

                {/* Главное фото: Интерактивный Зум (ПК) */}
                <Box flex={1} h="100%" bg="#f8f9fa" p="xl" pos="relative" style={{ overflow: 'hidden' }}>
                  <Image 
                    src={`/images/${item.main}`} 
                    h="100%" 
                    w="100%" 
                    fit="contain" 
                    style={{ 
                      // Применяем масштаб из стэйта
                      transform: `scale(${currentZoom})`, 
                      transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      transformOrigin: 'center center' // Масштабируем от центра
                    }} 
                  />
                  
                  {/* Кнопки управления масштабом (Оверлей) */}
                  <Paper 
                    pos="absolute" 
                    top={20} 
                    right={20} 
                    radius="xl" 
                    p={6} 
                    bg="rgba(0,0,0,0.5)" 
                    style={{ backdropFilter: 'blur(5px)' }}
                    zIndex={10}
                  >
                    <Flex gap="xs">
                      <ActionIcon variant="transparent" c="white" onClick={function() { return handleZoom(item.id, 'in'); }} disabled={currentZoom >= 3}>
                        <IconZoomIn size={22} />
                      </ActionIcon>
                      <Box w={1} bg="rgba(255,255,255,0.2)" />
                      <ActionIcon variant="transparent" c="white" onClick={function() { return handleZoom(item.id, 'out'); }} disabled={currentZoom <= 1}>
                        <IconZoomOut size={22} />
                      </ActionIcon>
                    </Flex>
                  </Paper>
                </Box>

                {/* Правая колонка: Рендер + Схемы (Contain) */}
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

              {/* ====== МОБИЛЬНАЯ ВЕРСИЯ (Портретная - 100dvh) ====== */}
              {/* Зум нативный (pinch-to-zoom двумя пальцами) */}
              <Flex h="100%" direction="column" hiddenFrom="md" bg="#ffffff" pos="relative">
                
                {/* Шапка (10%высоты) */}
                <Flex h={MOBILE_LAYOUT.header} align="center" justify="center" style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <Title order={3} tt="uppercase" size="h4" c="#000000" tracking={2} fw={900} ta="center" px="sm">
                    {item.name}
                  </Title>
                </Flex>

                {/* Главное фото (65% высоты) */}
                <Box h={MOBILE_LAYOUT.mainImage} w="100%" bg="#f8f9fa" p="sm">
                  <Image src={`/images/${item.main}`} h="100%" w="100%" fit="contain" />
                </Box>

                {/* Миниатюры внизу (25% высоты) */}
                <Flex h={MOBILE_LAYOUT.thumbnails} w="100%" p="xs" gap="xs" style={{ borderTop: '1px solid #f0f0f0' }} bg="#ffffff">
                  <Box flex={1} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #f0f0f0' }} p={4}>
                    {item.render && <Image src={`/images/${item.render}`} h="100%" w="100%" fit="contain" />}
                  </Box>
                  <Box flex={1} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #f0f0f0' }} p={4}>
                    {item.schemes?.[0] && <Image src={`/images/${item.schemes[0]}`} h="100%" w="100%" fit="contain" />}
                  </Box>
                  <Box flex={1} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #f0f0f0' }} p={4} pos="relative">
                    {item.schemes?.[1] && <Image src={`/images/${item.schemes[1]}`} h="100%" w="100%" fit="contain" />}
                    {/* Номер страницы */}
                    <Text pos="absolute" top={2} right={5} size="10px" c="dimmed" fw={900}>
                      {pageNum < 10 ? `0${pageNum}` : pageNum}
                    </Text>
                  </Box>
                </Flex>
              </Flex>

            </Box>
          );
        })}

      </Box>

      </Box>
    </MantineProvider>
  );
}
