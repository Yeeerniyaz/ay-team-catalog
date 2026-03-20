/**
 * PROJECT: AY TEAM Premium Web Catalog
 * FILE: src/main.jsx
 * ROLE: Senior Architect
 * DESCRIPTION: Главная точка входа в приложение (Entry Point). 
 * Инициализация React 18, StrictMode для отлова багов и подключение глобальных стилей.
 */

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 1. ПОДКЛЮЧЕНИЕ ГЛОБАЛЬНЫХ СТИЛЕЙ
// Важно: стили Mantine должны идти ДО кастомных стилей (index.css), 
// чтобы наши кастомные классы всегда имели приоритет.
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css'; // Если мы используем карусель

// Наши премиальные стили и скроллбары
import './index.css';

// 2. ИМПОРТ ГЛАВНОГО КОМПОНЕНТА
import App from './App.jsx';

// 3. ИНИЦИАЛИЗАЦИЯ И РЕНДЕР ПРИЛОЖЕНИЯ
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Критическая ошибка: Корневой элемент 'root' не найден в index.html!");
}

const root = createRoot(rootElement);

root.render(
  // StrictMode намеренно рендерит компоненты дважды в dev-режиме, 
  // чтобы выявить побочные эффекты и устаревшие API. 
  // В production это никак не влияет на производительность.
  <StrictMode>
    <App />
  </StrictMode>
);

// Консольный лог для проверки успешного старта (можно убрать в production)
console.log('%c[AY TEAM ENGINE] %cИнициализация успешна. Добро пожаловать в Luxury Showroom.', 'color: #ff6600; font-weight: bold;', 'color: inherit;');