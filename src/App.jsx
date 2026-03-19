import { useState, useEffect } from 'react';
import '@mantine/core/styles.css';
import { 
  MantineProvider, Image, Text, Title, Button, Group, 
  Box, Flex, UnstyledButton, SimpleGrid, Stack, ScrollArea 
} from '@mantine/core';

// Импорт твоей сгенерированной базы
import catalogData from './data.json'; 

// Оригинальные импорты Vite
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';

export default function App() {
  const [count, setCount] = useState(0);
  
  // Стейт активного слайда
  const [currentIndex, setCurrentIndex] = useState(0);

  // Навигация (зацикленная)
  const nextItem = () => setCurrentIndex((prev) => (prev + 1) % catalogData.length);
  const prevItem = () => setCurrentIndex((prev) => (prev === 0 ? catalogData.length - 1 : prev - 1));

  // Поддержка клавиатуры (Стрелки Влево/Вправо)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextItem();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevItem();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeItem = catalogData[currentIndex];
  const progressPercent = ((currentIndex + 1) / catalogData.length) * 100;

  return (
    <MantineProvider defaultColorScheme="light">
      {/* w="100%" - убирает баг с горизонтальным скроллом от 100vw 
        h="100dvh" - динамическая высота, спасает от панелей мобильных браузеров
      */}
      <Box w="100%" h="100dvh" style={{ overflow: 'hidden' }} bg="#FFFFFF">
        
        {/* Индикатор прогресса наверху */}
        <Box w="100%" h={4} bg="gray.2">
          <Box h="100%" w={`${progressPercent}%`} bg="dark.9" style={{ transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
        </Box>

        {/* Разделение экрана */}
        <Flex h="calc(100dvh - 4px)" direction={{ base: 'column', lg: 'row' }}>
          
          {/* === ЛЕВАЯ ЧАСТЬ: ИЗОБРАЖЕНИЕ === */}
          <Box 
            w={{ base: '100%', lg: '65%' }} 
            h={{ base: '45%', lg: '100%' }} // На мобилке картинка занимает 45% экрана, оставляя место тексту
            pos="relative" 
            bg="#F8F9FA"
          >
            {/* Логотип */}
            <Box pos="absolute" top={{ base: 15, lg: 30 }} left={{ base: 15, lg: 40 }} style={{ zIndex: 10 }}>
              <Image 
                src="/logo.png" 
                alt="AY TEAM" 
                h={{ base: 20, lg: 30 }} 
                fit="contain"
                fallbackSrc="https://placehold.co/120x30/white/black?text=AY+TEAM" 
              />
            </Box>

            {/* Главное фото товара (жестко вписано) */}
            <Flex h="100%" w="100%" justify="center" align="center" p={{ base: '1rem', lg: '4rem' }}>
              <Image
                key={activeItem.id}
                src={`/images/${activeItem.main}`}
                h="100%"
                w="100%"
                fit="contain"
                alt={activeItem.name}
                style={{
                  filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.06))',
                  animation: 'fadeIn 0.5s ease-out'
                }}
              />
            </Flex>

            {/* Навигация */}
            <Flex pos="absolute" top={0} left={0} w="100%" h="100%" justify="space-between" align="center" px="md" style={{ pointerEvents: 'none' }}>
              <UnstyledButton 
                onClick={prevItem} 
                p="xl" 
                style={{ pointerEvents: 'auto', opacity: 0.3, transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0.3}
              >
                <Text size="3rem" fw={900} c="dark.9">←</Text>
              </UnstyledButton>

              <UnstyledButton 
                onClick={nextItem} 
                p="xl" 
                style={{ pointerEvents: 'auto', opacity: 0.3, transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0.3}
              >
                <Text size="3rem" fw={900} c="dark.9">→</Text>
              </UnstyledButton>
            </Flex>
          </Box>

          {/* === ПРАВАЯ ЧАСТЬ: СКРОЛЛИРУЕМАЯ ИНФОРМАЦИЯ === */}
          {/* ScrollArea спасает нас, если контент слишком длинный. Сам экран не дергается */}
          <ScrollArea 
            w={{ base: '100%', lg: '35%' }} 
            h={{ base: '55%', lg: '100%' }} 
            bg="#FFFFFF"
            type="hover"
            style={{ borderLeft: '1px solid #E9ECEF' }}
          >
            <Box p={{ base: '1.5rem', lg: '4rem' }} style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
              <Stack gap="xl" style={{ flexGrow: 1 }}>
                
                <Box>
                  <Group justify="space-between" align="center" mb="sm">
                    <Text c="gray.5" fw={800} tt="uppercase" ls={2} size="xs">
                      {activeItem.category || 'Premium Line'}
                    </Text>
                    <Text c="dark.9" fw={800} size="sm">
                      {currentIndex + 1} / {catalogData.length}
                    </Text>
                  </Group>
                  
                  <Title order={1} fw={900} size={{ base: '2.2rem', lg: '3rem' }} lh={1.1} c="dark.9" style={{ letterSpacing: '-1.5px' }}>
                    {activeItem.name}
                  </Title>
                  <Text c="gray.5" size="xs" tt="uppercase" fw={700} ls={2} mt="md">
                    Артикул: {activeItem.id}
                  </Text>
                </Box>

                {/* Блок схем */}
                <Box mt="auto">
                  <Text size="0.65rem" c="dark.9" mb="sm" tt="uppercase" fw={800} ls={1}>
                    Техническая спецификация
                  </Text>
                  <SimpleGrid cols={2} spacing="xs">
                    {activeItem.schemes.map((scheme, idx) => (
                      <Box key={idx} bg="#F8F9FA" p="xs" style={{ border: '1px solid #E9ECEF' }}>
                        <Image src={`/images/${scheme}`} h={{ base: 60, lg: 80 }} fit="contain" alt="Схема" />
                      </Box>
                    ))}
                    <Box bg="#F8F9FA" p="xs" style={{ border: '1px solid #E9ECEF' }}>
                      <Image src={`/images/${activeItem.render}`} h={{ base: 60, lg: 80 }} fit="contain" alt="Рендер" />
                    </Box>
                  </SimpleGrid>
                </Box>

                <Button
                  component="a"
                  href={`https://wa.me/77476509747?text=${encodeURIComponent(`Здравствуйте! Хочу заказать модель: ${activeItem.name} (ID: ${activeItem.id}).`)}`}
                  target="_blank"
                  color="dark.9"
                  size="xl"
                  radius={0}
                  fullWidth
                  fw={800}
                  tt="uppercase"
                  ls={2}
                  h={{ base: '3.5rem', lg: '4.5rem' }}
                >
                  Оформить заказ
                </Button>
              </Stack>

              {/* Системный подвал с Vite кнопкой */}
              <Flex justify="space-between" align="center" mt="2rem" pt="1.5rem" style={{ borderTop: '1px solid #F1F3F5' }}>
                <Group gap="xs">
                  <Button variant="subtle" color="gray.5" size="compact-xs" radius={0} onClick={() => setCount((c) => c + 1)}>
                    TEST: {count}
                  </Button>
                  <Image src={viteLogo} w={14} h={14} alt="Vite" style={{ opacity: 0.5 }} />
                  <Image src={reactLogo} w={14} h={14} alt="React" style={{ opacity: 0.5 }} />
                </Group>
                <Text c="gray.4" size="0.55rem" fw={800} tt="uppercase" ls={2}>
                  AY TEAM © 2026
                </Text>
              </Flex>
            </Box>
          </ScrollArea>

        </Flex>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>

      </Box>
    </MantineProvider>
  );
}