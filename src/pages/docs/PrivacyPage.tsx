import DocPage from '../../components/layout/DocPage';
import { useI18n } from '../../i18n';

export default function PrivacyPage() {
  const { language } = useI18n();
  const content = {
    kg: {
      title: 'Купуялуулук саясаты',
      subtitle: 'Сиздин маалыматтарды кантип иштетебиз жана коргойбуз',
      sections: [
        { heading: '1. Маалымат чогултуу', body: 'htmllessons сервис иши үчүн минималдуу керектүү маалыматты гана чогултат. Окуу прогресси localStorage ичинде сакталат жана серверге жөнөтүлбөйт.' },
        { heading: '2. Маалыматты колдонуу', body: 'Маалымат интерфейс орнотууларын жана окуу прогрессин көрсөтүү үчүн колдонулат. Платформа жеке маалыматтарды үчүнчү жакка сатпайт же бербейт.' },
        { heading: '3. Cookie файлдары', body: 'Сайттын туура иштеши үчүн техникалык cookie колдонулат. Аналитикалык cookie колдонуучуну түздөн-түз аныктабайт.' },
        { heading: '4. Жергиликтүү сактагыч', body: 'Сабактар жана курстар тууралуу маалымат браузердин localStorageсында сакталат. Кааласаңыз, браузер жөндөөлөрүнөн өчүрө аласыз.' },
        { heading: '5. Тышкы шилтемелер', body: 'Платформа YouTube шилтемелерин камтыйт. Бул шилтемелерге өткөндө тиешелүү сервистердин саясаттары колдонулат.' },
        { heading: '6. Колдонуучунун укуктары', body: 'Сиз иштетилген маалымат тууралуу маалымат суроого, маалыматты өчүрүүнү талап кылууга жана макулдукту кайтарып алууга укуктуусуз.' },
        { heading: '7. Саясатты жаңылоо', body: 'Бул купуялуулук саясаты мезгил-мезгили менен жаңыртылышы мүмкүн. Маанилүү өзгөрүүлөр тууралуу “Жаңылыктар” бөлүмүндө кабарлайбыз.' },
      ],
    },
    ru: {
      title: 'Политика конфиденциальности',
      subtitle: 'Как мы обрабатываем и защищаем ваши данные',
      sections: [
        { heading: '1. Сбор информации', body: 'Платформа htmllessons собирает минимально необходимый объём данных для обеспечения работы сервиса. Данные о прогрессе обучения хранятся исключительно в локальном хранилище браузера пользователя (localStorage) и не передаются на серверы платформы.' },
        { heading: '2. Использование данных', body: 'Собираемые данные используются исключительно для:\n• Отображения персонального прогресса обучения.\n• Сохранения настроек интерфейса.\n• Улучшения качества образовательных материалов (в агрегированном виде).\n\nПлатформа не продаёт и не передаёт персональные данные третьим лицам без вашего согласия.' },
        { heading: '3. Файлы cookie', body: 'Платформа использует технические cookie-файлы, необходимые для корректной работы сайта. Аналитические cookie используются в агрегированном виде и не позволяют идентифицировать личность пользователя.' },
        { heading: '4. Локальное хранилище', body: 'Все данные о пройденных уроках, прогрессе курсов и добавленных курсах хранятся в localStorage вашего браузера под ключом «htmllessons_v1». Вы можете удалить эти данные в любой момент, очистив данные сайта в настройках браузера.' },
        { heading: '5. Ссылки на внешние ресурсы', body: 'Платформа содержит ссылки на видеоматериалы YouTube. При переходе по этим ссылкам на вас распространяется политика конфиденциальности Google LLC. Платформа не несёт ответственности за политику конфиденциальности сторонних сайтов.' },
        { heading: '6. Права пользователя', body: 'Вы имеете право:\n• Запросить информацию о данных, которые мы обрабатываем.\n• Потребовать удаления ваших данных.\n• Отозвать согласие на обработку данных.\n\nДля реализации своих прав свяжитесь с нами: https://t.me/red_support_chat' },
        { heading: '7. Изменения политики', body: 'Мы можем обновлять настоящую Политику конфиденциальности. О существенных изменениях мы уведомим в разделе «Обновления». Дата последнего обновления: 1 января 2025 года.' },
      ],
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'How we process and protect your data',
      sections: [
        { heading: '1. Information collection', body: 'htmllessons collects only the minimum data required to provide the service. Learning progress is stored only in the user browser localStorage and is not sent to platform servers.' },
        { heading: '2. Data usage', body: 'Collected data is used only to show learning progress, save interface settings, and improve educational materials in aggregated form. We do not sell personal data.' },
        { heading: '3. Cookies', body: 'The platform uses technical cookies required for proper site operation. Analytical cookies are aggregated and do not identify a person directly.' },
        { heading: '4. Local storage', body: 'All lesson progress and added courses are stored in browser localStorage under the key “htmllessons_v1”. You can remove this data in browser settings.' },
        { heading: '5. External resources', body: 'The platform contains links to YouTube videos. Their own privacy policies apply when you open them.' },
        { heading: '6. User rights', body: 'You can request information about processed data, ask for deletion of your data, and withdraw consent.' },
        { heading: '7. Policy updates', body: 'We may update this Privacy Policy from time to time. Significant changes are announced in the “Updates” section.' },
      ],
    },
  } as const;
  const t = content[language];

  return (
    <DocPage
      title={t.title}
      subtitle={t.subtitle}
      sections={t.sections.map((section) => ({ ...section }))}
    />
  );
}
