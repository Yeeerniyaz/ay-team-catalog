/**
 * PROJECT: AY TEAM Fullscreen Showroom
 * VERSION: 14.0 (Smart Typography & Maximum Conversion)
 * ROLE: Senior Architect
 * DESCRIPTION: Убрано обрезание (...). Добавлены огромные кнопки звонка на финальный экран.
 */

import React, { useState, useEffect } from 'react';
import { 
  MantineProvider, Box, Flex, Image, Text, Title, ActionIcon, Paper, Tooltip, Group, Modal, createTheme, Button 
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { 
  IconBrandWhatsapp, IconBrandInstagram, IconChevronDown, 
  IconMaximize, IconMinimize, IconPhone 
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
});

// =====================================================================
// ⚙️ УПРАВЛЕНИЕ ПРОПОРЦИЯМИ (ТОЛЬКО ДЛЯ МОБИЛЬНОЙ ВЕРСИИ)
// =====================================================================
const MOBILE_LAYOUT = {
  header: '10%',    
  mainImage: '65%', 
  thumbnails: '25%' 
};
// =====================================================================

export default function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 48em)');

  const [viewerOpened, { open: openViewer, close: closeViewer }] = useDisclosure(false);
  const [viewerData, setViewerData] = useState({ images: [], initialSlide: 0 });

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

  const handleImageClick = (item, clickedIndex) => {
    if (!isMobile) return; 

    const images = [item.main];
    if (item.render) images.push(item.render);
    if (item.schemes?.[0]) images.push(item.schemes[0]);
    if (item.schemes?.[1]) images.push(item.schemes[1]);
    
    setViewerData({ images, initialSlide: clickedIndex });
    openViewer();
  };

  return (
    <MantineProvider theme={avantGardeTheme}>
      
      {/* === ФИКСИРОВАННАЯ ПАНЕЛЬ (GLASSMORPHISM) === */}
      <Paper
        pos="fixed"
        bottom={isMobile ? 20 : 40}
        left={isMobile ? '50%' : 'auto'}
        right={isMobile ? 'auto' : 40}
        zIndex={9999} 
        radius="xl"
        p="xs"
        bg="rgba(255, 255, 255, 0.7)"
        style={{ 
          transform: isMobile ? 'translateX(-50%)' : 'none',
          backdropFilter: 'blur(20px)', 
          WebkitBackdropFilter: 'blur(20px)', 
          border: '1px solid rgba(255,255,255,0.8)', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
        }}
      >
        <Flex direction={isMobile ? 'row' : 'column'} gap="md" align="center" px={isMobile ? "sm" : 0}>
          <Tooltip label="На весь экран" position={isMobile ? "top" : "left"}>
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
           <Box pos="absolute" bottom={isMobile ? 100 : 40} left={0} right={0} ta="center" zIndex={2}>
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
            
            {/* ====== ПК ВЕРСИЯ (АЛЬБОМНАЯ С УМНЫМ ТЕКСТОМ) ====== */}
            <Flex h="100%" visibleFrom="md">
              <Flex 
                w={160} // Чуть расширили под перенос текста
                direction="column" 
                align="center" 
                justify="space-between" 
                py={40} 
                style={{ borderRight: '1px solid #f0f0f0' }} 
                pos="relative"
              >
                <Box flex={1} w="100%" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* УМНЫЙ ТЕКСТ: Никаких (...), плавно переносится на 2-ю линию */}
                  <Title 
                    order={2} 
                    style={{ 
                      writingMode: 'vertical-rl', 
                      transform: 'rotate(180deg)', 
                      letterSpacing: '4px', 
                      textTransform: 'uppercase', 
                      color: '#000000', 
                      fontSize: '32px',
                      lineHeight: 1.3,
                      whiteSpace: 'normal',   // ВАЖНО: Разрешаем перенос
                      wordWrap: 'break-word',
                      textAlign: 'center',
                      maxHeight: '75vh'
                    }}
                  >
                    {item.name}
                  </Title>
                </Box>

                <Text size="xs" c="dimmed" fw={700} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '2px', flexShrink: 0 }}>
                  AY TEAM | COLLECTION 2026
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

            {/* ====== МОБИЛЬНАЯ ВЕРСИЯ (С КЛИКАБЕЛЬНЫМИ ФОТО) ====== */}
            <Flex h="100%" direction="column" hiddenFrom="md" bg="#ffffff" pos="relative" pb={80}>
              <Flex h={MOBILE_LAYOUT.header} align="center" justify="center" style={{ borderBottom: '1px solid #f0f0f0' }}>
                <Title order={3} tt="uppercase" size="h4" c="#000000" tracking={2} fw={900} ta="center" px="sm">
                  {item.name}
                </Title>
              </Flex>

              <Box h={MOBILE_LAYOUT.mainImage} w="100%" bg="#f8f9fa" p="sm" onClick={() => handleImageClick(item, 0)} style={{ cursor: 'zoom-in' }}>
                <Image src={`/images/${item.main}`} h="100%" w="100%" fit="contain" />
              </Box>

              <Flex h={MOBILE_LAYOUT.thumbnails} w="100%" p="xs" gap="xs" style={{ borderTop: '1px solid #f0f0f0' }} bg="#ffffff">
                <Box flex={1} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #f0f0f0', cursor: 'zoom-in' }} p={4} onClick={() => handleImageClick(item, 1)}>
                  {item.render && <Image src={`/images/${item.render}`} h="100%" w="100%" fit="contain" />}
                </Box>
                <Box flex={1} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #f0f0f0', cursor: 'zoom-in' }} p={4} onClick={() => handleImageClick(item, 2)}>
                  {item.schemes?.[0] && <Image src={`/images/${item.schemes[0]}`} h="100%" w="100%" fit="contain" />}
                </Box>
                <Box flex={1} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #f0f0f0', cursor: 'zoom-in' }} p={4} pos="relative" onClick={() => handleImageClick(item, 3)}>
                  {item.schemes?.[1] && <Image src={`/images/${item.schemes[1]}`} h="100%" w="100%" fit="contain" />}
                  <Text pos="absolute" top={2} right={5} size="10px" c="dimmed" fw={900}>
                    {pageNum < 10 ? `0${pageNum}` : pageNum}
                  </Text>
                </Box>
              </Flex>
            </Flex>

          </Box>
        )})}

        {/* СЛАЙД: ФИНАЛЬНЫЕ КОНТАКТЫ (МАКСИМАЛЬНАЯ КОНВЕРСИЯ) */}
        <Box className="snap-slide" bg="#000000" c="white">
           <Flex direction="column" align="center" justify="center" h="100%" pb={80} px="md">
              <Title order={2} style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }} tracking={5} tt="uppercase" mb="md" ta="center">
                ЖДЕМ ВАШЕГО<br/>ЗВОНКА
              </Title>
              <Text c="dimmed" mb={40} tracking={2} tt="uppercase" size="sm" ta="center">Оформить индивидуальный заказ</Text>
              
              {/* ОГРОМНЫЕ КНОПКИ ДЛЯ ПРОДАЖ */}
              <Flex direction="column" gap="md" w="100%" maw={400}>
                
                <Button 
                  size="xl" 
                  radius="md" 
                  color="white" 
                  c="black" 
                  fullWidth 
                  leftSection={<IconPhone size={24} />}
                  component="a" 
                  href="tel:+77476509747"
                  style={{ height: '60px', fontSize: '18px' }}
                >
                  Позвонить сейчас
                </Button>

                <Button 
                  size="xl" 
                  radius="md" 
                  color="#25D366" 
                  fullWidth 
                  leftSection={<IconBrandWhatsapp size={24} />}
                  component="a" 
                  href="https://wa.me/77476509747"
                  target="_blank"
                  style={{ height: '60px', fontSize: '18px' }}
                >
                  Написать в WhatsApp
                </Button>

                <Button 
                  size="xl" 
                  radius="md" 
                  color="dark.8" 
                  fullWidth 
                  leftSection={<IconBrandInstagram size={24} />}
                  component="a" 
                  href="https://instagram.com/ayteam_mebel"
                  target="_blank"
                  style={{ height: '60px', fontSize: '18px', border: '1px solid #333' }}
                >
                  Перейти в Instagram
                </Button>

              </Flex>
           </Flex>
        </Box>

      </Box>

      {/* === ПОЛНОЭКРАННЫЙ ПРОСМОТРЩИК ФОТО (МОБИЛКА) === */}
      <Modal
        opened={viewerOpened}
        onClose={closeViewer}
        fullScreen
        withCloseButton
        zIndex={100000}
        overlayProps={{ backgroundOpacity: 0.95, blur: 10 }}
        styles={{
          content: { backgroundColor: 'rgba(0,0,0,0.95)' },
          header: { backgroundColor: 'transparent', borderBottom: 'none' },
          close: { color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }
        }}
      >
        <Carousel
          initialSlide={viewerData.initialSlide}
          withIndicators
          withControls={false} 
          loop
          height="100%"
          styles={{
            root: { flex: 1, display: 'flex', flexDirection: 'column' },
            viewport: { height: '100%', flex: 1 },
            container: { height: '100%' },
            slide: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
            indicator: { backgroundColor: 'rgba(255,255,255,0.5)', '&[data-active]': { backgroundColor: 'white' } }
          }}
        >
          {viewerData.images.map((src, idx) => (
            <Carousel.Slide key={idx}>
              <Image src={`/images/${src}`} fit="contain" w="100%" h="85vh" />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Modal>

    </MantineProvider>
  );
}