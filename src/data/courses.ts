export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration?: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  link: string;
  isVip?: boolean;
  isArchive?: boolean;
  type: 'intensive' | 'master-class' | 'user-added';
  previewVideoUrl?: string;
  lessons?: Lesson[];
  isUserAdded?: boolean;
}

export const coursesData: Course[] = [
  {
    id: 'verstka-dlya-vseh',
    title: 'Верстка для всех!',
    description: 'С 0 до публикации анимированного сайта. Научишься создавать современные, адаптивные сайты с анимациями и эффектами.',
    link: '/course/verstka-dlya-vseh',
    type: 'intensive',
    previewVideoUrl: 'https://www.youtube.com/embed/DOEtVdkKwcU',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Введение в HTML',
        description: 'Изучим структуру HTML-документа, основные теги и семантическую разметку. Создадим первую страницу с нуля.',
        videoUrl: 'https://www.youtube.com/embed/DOEtVdkKwcU',
        duration: '18:24',
        order: 1,
      },
      {
        id: 'lesson-2',
        title: 'CSS основы и Flexbox',
        description: 'Разберём каскадность, специфичность, блочную модель и систему Flexbox для создания современных макетов.',
        videoUrl: 'https://www.youtube.com/embed/eVZEwEQg4pg',
        duration: '24:10',
        order: 2,
      },
      {
        id: 'lesson-3',
        title: 'CSS Grid Layout',
        description: 'Создадим сложные сеточные макеты с помощью CSS Grid. Научимся совмещать Grid и Flexbox.',
        videoUrl: 'https://www.youtube.com/embed/JrKOHNRnRMg',
        duration: '21:45',
        order: 3,
      },
      {
        id: 'lesson-4',
        title: 'Анимации и переходы',
        description: 'Добавим плавные переходы, keyframe-анимации и трансформации для создания живого интерфейса.',
        videoUrl: 'https://www.youtube.com/embed/GKgOOuTL0po',
        duration: '16:33',
        order: 4,
      },
      {
        id: 'lesson-5',
        title: 'Адаптивный дизайн',
        description: 'Научимся делать сайты, которые отлично смотрятся на любом экране — от мобильного до большого монитора.',
        videoUrl: 'https://www.youtube.com/embed/ahYuxTRjY0g',
        duration: '19:52',
        order: 5,
      },
    ],
  },
  {
    id: 'arhiv-verstka-sajta-s-nulya',
    title: 'Верстка сайта с нуля',
    description: 'С 0 до выгрузки сайта в интернет',
    link: '/course/arhiv-verstka-sajta-s-nulya',
    isArchive: true,
    type: 'intensive',
    previewVideoUrl: 'https://www.youtube.com/embed/DOEtVdkKwcU',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Основы HTML и CSS',
        description: 'Начинаем с нуля — теги, стили, структура.',
        videoUrl: 'https://www.youtube.com/embed/DOEtVdkKwcU',
        duration: '20:00',
        order: 1,
      },
    ],
  },
  {
    id: 'javascript-dlya-vseh',
    title: 'JavaScript для всех!',
    description: 'С 0 до Front-end банковского приложения. Полный курс по JS от переменных до сложных паттернов.',
    link: '/course/javascript-dlya-vseh',
    type: 'intensive',
    previewVideoUrl: 'https://www.youtube.com/embed/UHqnpHEXtII',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Переменные и типы данных',
        description: 'Разберём var, let, const, примитивные типы и объекты. Поймём разницу между ними.',
        videoUrl: 'https://www.youtube.com/embed/UHqnpHEXtII',
        duration: '22:15',
        order: 1,
      },
      {
        id: 'lesson-2',
        title: 'Функции и стрелочные функции',
        description: 'Функции-декларации, выражения, стрелочные функции, замыкания и контекст this.',
        videoUrl: 'https://www.youtube.com/embed/IcgdjdeOziA',
        duration: '28:40',
        order: 2,
      },
      {
        id: 'lesson-3',
        title: 'Массивы и методы',
        description: 'map, filter, reduce, find — мощные методы для работы с массивами данных.',
        videoUrl: 'https://www.youtube.com/embed/nEabP9CYCAQ',
        duration: '25:18',
        order: 3,
      },
      {
        id: 'lesson-4',
        title: 'Асинхронный JS: Promises и async/await',
        description: 'Работа с асинхронным кодом, fetch API, обработка ошибок с try/catch.',
        videoUrl: 'https://www.youtube.com/embed/C7TgmKZRNF4',
        duration: '31:07',
        order: 4,
      },
    ],
  },
  {
    id: 'back-end-dlya-nachinayuschih',
    title: 'Back-end для начинающих',
    description: 'С 0 до Backend приложения для тренировок. Node.js, Express, базы данных.',
    link: '/course/back-end-dlya-nachinayuschih',
    type: 'intensive',
    previewVideoUrl: 'https://www.youtube.com/embed/243pQXC5Ebs',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Node.js — первые шаги',
        description: 'Установка and настройка окружения, модульная система, работа с файловой системой.',
        videoUrl: 'https://www.youtube.com/embed/243pQXC5Ebs',
        duration: '26:30',
        order: 1,
      },
      {
        id: 'lesson-2',
        title: 'Express.js и REST API',
        description: 'Создаём веб-сервер, роуты, middleware, обработку запросов и ответов.',
        videoUrl: 'https://www.youtube.com/embed/tKM44vPHU0U',
        duration: '34:22',
        order: 2,
      },
      {
        id: 'lesson-3',
        title: 'Работа с базой данных',
        description: 'Подключаем PostgreSQL, пишем SQL-запросы, используем ORM.',
        videoUrl: 'https://www.youtube.com/embed/p3RFMEixUOE',
        duration: '29:15',
        order: 3,
      },
    ],
  },
  {
    id: 'front-end-dlya-nachinayuschih',
    title: 'Front-end для начинающих',
    description: 'С 0 до Frontend приложения для тренировок. React, TypeScript, современные инструменты.',
    link: '/course/front-end-dlya-nachinayuschih',
    type: 'intensive',
    previewVideoUrl: 'https://www.youtube.com/embed/GeulXZP_kZ8',
    lessons: [
      {
        id: 'lesson-1',
        title: 'React — основы и JSX',
        description: 'Компоненты, JSX синтаксис, виртуальный DOM, первое React-приложение.',
        videoUrl: 'https://www.youtube.com/embed/GeulXZP_kZ8',
        duration: '23:44',
        order: 1,
      },
      {
        id: 'lesson-2',
        title: 'Props и State',
        description: 'Передача данных через props, управление состоянием с useState, поднятие состояния.',
        videoUrl: 'https://www.youtube.com/embed/iHQ7fwXTqik',
        duration: '27:08',
        order: 2,
      },
      {
        id: 'lesson-3',
        title: 'Хуки: useEffect и useCallback',
        description: 'Побочные эффекты, зависимости, оптимизация с useCallback и useMemo.',
        videoUrl: 'https://www.youtube.com/embed/s2fWu6YcNIg',
        duration: '30:55',
        order: 3,
      },
    ],
  },
  {
    id: 'vip-uskorenie-razrabotki-s-pomoschyu-ai',
    title: 'Ускорение с помощью AI',
    description: 'С 0 до внедрения нейросетей в разработку',
    link: '/course/vip-uskorenie-razrabotki-s-pomoschyu-ai',
    isVip: true,
    type: 'master-class',
    previewVideoUrl: 'https://www.youtube.com/embed/q8GverUrdE4',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Введение в AI-инструменты',
        description: 'Обзор инструментов: GitHub Copilot, ChatGPT, Claude. Как правильно писать промпты.',
        videoUrl: 'https://www.youtube.com/embed/q8GverUrdE4',
        duration: '15:20',
        order: 1,
      },
    ],
  },
  {
    id: 'uskorenie-razrabotki-s-pomoschyu-ai',
    title: 'Ускорение с помощью AI',
    description: 'С 0 до внедрения нейросетей в разработку',
    link: '/course/uskorenie-razrabotki-s-pomoschyu-ai',
    type: 'master-class',
    previewVideoUrl: 'https://www.youtube.com/embed/q8GverUrdE4',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Введение в AI-инструменты',
        description: 'Обзор инструментов: GitHub Copilot, ChatGPT, Claude. Как правильно писать промпты.',
        videoUrl: 'https://www.youtube.com/embed/q8GverUrdE4',
        duration: '15:20',
        order: 1,
      },
    ],
  },
  {
    id: 'vip-chistaya-arhitektura',
    title: 'Чистая архитектура',
    description: 'С 0 до чистой архитектуры',
    link: '/course/vip-chistaya-arhitektura',
    isVip: true,
    type: 'master-class',
    previewVideoUrl: 'https://www.youtube.com/embed/TxZwqVTaCmA',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Принципы SOLID',
        description: 'Разбираем каждый принцип SOLID с реальными примерами кода.',
        videoUrl: 'https://www.youtube.com/embed/TxZwqVTaCmA',
        duration: '35:12',
        order: 1,
      },
    ],
  },
  {
    id: 'chistaya-arhitektura',
    title: 'Чистая архитектура',
    description: 'С 0 до чистой архитектуры',
    link: '/course/chistaya-arhitektura',
    type: 'master-class',
    previewVideoUrl: 'https://www.youtube.com/embed/TxZwqVTaCmA',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Принципы SOLID',
        description: 'Разбираем каждый принцип SOLID с реальными примерами кода.',
        videoUrl: 'https://www.youtube.com/embed/TxZwqVTaCmA',
        duration: '35:12',
        order: 1,
      },
    ],
  },
  {
    id: 'vip-deploj-proekta-s-nulya',
    title: 'Деплой проекта с нуля',
    description: 'С 0 до деплоя проекта',
    link: '/course/vip-deploj-proekta-s-nulya',
    isVip: true,
    type: 'master-class',
    previewVideoUrl: 'https://www.youtube.com/embed/UaoRx_EmD70',
    lessons: [
      {
        id: 'lesson-1',
        title: 'VPS и первичная настройка',
        description: 'Аренда VPS, настройка SSH, установка Node.js и Nginx.',
        videoUrl: 'https://www.youtube.com/embed/UaoRx_EmD70',
        duration: '28:45',
        order: 1,
      },
    ],
  },
  {
    id: 'deploj-proekta-s-nulya',
    title: 'Деплой проекта с нуля',
    description: 'С 0 до деплоя проекта',
    link: '/course/deploj-proekta-s-nulya',
    type: 'master-class',
    previewVideoUrl: 'https://www.youtube.com/embed/UaoRx_EmD70',
    lessons: [
      {
        id: 'lesson-1',
        title: 'VPS и первичная настройка',
        description: 'Аренда VPS, настройка SSH, установка Node.js и Nginx.',
        videoUrl: 'https://www.youtube.com/embed/UaoRx_EmD70',
        duration: '28:45',
        order: 1,
      },
    ],
  },
  {
    id: 'vip-avtorizatsiya-4-0',
    title: 'Авторизация 4.0',
    description: 'С 0 до авторизации с JWT и соцсетями',
    link: '/course/vip-avtorizatsiya-4-0',
    isVip: true,
    type: 'master-class',
    previewVideoUrl: 'https://www.youtube.com/embed/fN25fMQZ2v0',
    lessons: [
      {
        id: 'lesson-1',
        title: 'JWT токены',
        description: 'Как работают JWT, структура токена, создание и проверка.',
        videoUrl: 'https://www.youtube.com/embed/fN25fMQZ2v0',
        duration: '22:30',
        order: 1,
      },
    ],
  },
  {
    id: 'vip-korzina-dlya-magazina',
    title: 'Корзина для магазина',
    description: 'С 0 до полноценной корзины',
    link: '/course/vip-korzina-dlya-magazina',
    isVip: true,
    type: 'master-class',
    previewVideoUrl: 'https://www.youtube.com/embed/fT2eXp9sQf4',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Состояние корзины',
        description: 'Управление состоянием корзины через Context API или Zustand.',
        videoUrl: 'https://www.youtube.com/embed/fT2eXp9sQf4',
        duration: '19:40',
        order: 1,
      },
    ],
  },
  {
    id: 'avtorizatsiya-4-0-maksimum',
    title: 'Авторизация 4.0: Максимум',
    description: 'С 0 до полной авторизации',
    link: '/course/avtorizatsiya-4-0-maksimum',
    type: 'master-class',
    previewVideoUrl: 'https://www.youtube.com/embed/0finVGfKvHU',
    lessons: [
      {
        id: 'lesson-1',
        title: 'OAuth2 и социальные сети',
        description: 'Авторизация через Google, GitHub и другие OAuth2 провайдеры.',
        videoUrl: 'https://www.youtube.com/embed/0finVGfKvHU',
        duration: '25:15',
        order: 1,
      },
    ],
  },
  {
    id: 'email-pisma-v-nestjs',
    title: 'Email письма в Nest.js',
    description: 'С 0 до email-рассылок через SMTP и шаблоны',
    link: '/course/email-pisma-v-nestjs',
    type: 'master-class',
    previewVideoUrl: 'https://www.youtube.com/embed/z1oW-iyHvA0',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Настройка Nodemailer',
        description: 'Установка и настройка Nodemailer, SMTP конфигурация.',
        videoUrl: 'https://www.youtube.com/embed/z1oW-iyHvA0',
        duration: '17:55',
        order: 1,
      },
    ],
  },
  {
    id: 'realizatsiya-filtrov',
    title: 'Реализация фильтров',
    description: 'С 0 до динамических фильтров',
    link: '/course/realizatsiya-filtrov',
    type: 'master-class',
    previewVideoUrl: 'https://www.youtube.com/embed/e-sm4OOXHBc',
    lessons: [
      {
        id: 'lesson-1',
        title: 'URL-параметры и фильтрация',
        description: 'Синхронизация фильтров с URL, debounce, оптимизация запросов.',
        videoUrl: 'https://www.youtube.com/embed/e-sm4OOXHBc',
        duration: '21:10',
        order: 1,
      },
    ],
  },
  {
    id: 'admin-panel-s-nulya',
    title: 'Админ-панель с нуля',
    description: 'С 0 до продвинутой админ-панели',
    link: '/course/admin-panel-s-nulya',
    type: 'master-class',
    previewVideoUrl: 'https://www.youtube.com/embed/jBAGz_mUqew',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Таблицы и пагинация',
        description: 'Создаём таблицы с сортировкой, фильтрацией и серверной пагинацией.',
        videoUrl: 'https://www.youtube.com/embed/jBAGz_mUqew',
        duration: '33:20',
        order: 1,
      },
    ],
  },
  {
    id: 'seo-optimizatsiya-s-nulya',
    title: 'SEO оптимизация с нуля',
    description: 'С 0 до SEO оптимизации проекта',
    link: '/course/seo-optimizatsiya-s-nulya',
    type: 'master-class',
    previewVideoUrl: 'https://www.youtube.com/embed/o6U5nN6_F8M',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Meta-теги и Open Graph',
        description: 'Правильная настройка meta-тегов, Open Graph для соцсетей, canonical URLs.',
        videoUrl: 'https://www.youtube.com/embed/o6U5nN6_F8M',
        duration: '16:48',
        order: 1,
      },
    ],
  },
  {
    id: 'realizatsiya-oplaty-ot-a-do-ya',
    title: 'Реализация оплаты',
    description: 'С 0 до системы оплаты',
    link: '/course/realizatsiya-oplaty-ot-a-do-ya',
    type: 'master-class',
    previewVideoUrl: 'https://www.youtube.com/embed/kYJj4P6359s',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Stripe интеграция',
        description: 'Подключаем Stripe, создаём платёжные сессии, обрабатываем вебхуки.',
        videoUrl: 'https://www.youtube.com/embed/kYJj4P6359s',
        duration: '38:05',
        order: 1,
      },
    ],
  },
];
