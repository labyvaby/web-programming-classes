import DocPage from '../../components/layout/DocPage';
import { useI18n } from '../../i18n';

export default function AgreementPage() {
  const { language } = useI18n();
  const content = {
    kg: {
      title: 'Колдонуучулук келишим',
      subtitle: '2025-жылдын 1-январындагы редакция',
      sections: [
        { heading: '1. Жалпы жоболор', body: 'Бул Колдонуучулук келишим htmllessons платформасы менен колдонуучунун ортосундагы мамилени жөнгө салат. Платформаны колдонуу менен сиз бул шарттарга макул болосуз.' },
        { heading: '2. Келишимдин предмети', body: 'Платформа веб-иштеп чыгуу боюнча видео сабактарга, сүрөттөмөлөргө жана кошумча материалдарга жетүү мүмкүнчүлүгүн берет. Материалдар билим берүү максатында «кандай болсо ошондой» берилет.' },
        { heading: '3. Колдонуучунун укуктары жана милдеттери', body: 'Колдонуучу платформанын материалдарын жеке билим алуу үчүн колдонууга укуктуу.\n\nКолдонуучу үчүнчү жактарга кирүү укугун бербөөгө жана материалдарды уруксатсыз таратпоого милдеттүү.' },
        { heading: '4. Интеллектуалдык менчик', body: 'Платформадагы бардык материалдар интеллектуалдык менчик болуп саналат. Уруксатсыз көчүрүү жана колдонууга тыюу салынат.' },
        { heading: '5. Жоопкерчилик', body: 'Платформа материалдарды колдонуудагы кыйыр чыгымдар үчүн жооп бербейт. Жоопкерчилик колдонуучу төлөгөн сумма менен чектелет.' },
        { heading: '6. Өзгөртүүлөр', body: 'Платформа бул келишимге бир тараптуу өзгөртүү киргизе алат. Жаңы версия сайтта жарыялангандан кийин күчүнө кирет.' },
        { heading: '7. Байланыш', body: 'Суроолор боюнча колдоо кызматына жазыңыз: https://t.me/red_support_chat' },
      ],
    },
    ru: {
      title: 'Пользовательское соглашение',
      subtitle: 'Редакция от 1 января 2025 года',
      sections: [
        { heading: '1. Общие положения', body: 'Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между htmllessons (далее — «Платформа») и пользователем, получившим доступ к обучающим материалам, размещённым на платформе. Используя платформу, вы подтверждаете своё согласие с настоящим Соглашением.' },
        { heading: '2. Предмет соглашения', body: 'Платформа предоставляет пользователю доступ к образовательным материалам в виде видеоуроков, текстовых описаний, исходных кодов и дополнительных ресурсов по веб-разработке. Материалы предоставляются «как есть» в образовательных целях.' },
        { heading: '3. Права и обязанности пользователя', body: 'Пользователь имеет право:\n• Использовать материалы платформы в личных образовательных целях.\n• Обращаться в службу поддержки при возникновении вопросов.\n\nПользователь обязан:\n• Не передавать доступ к платформе третьим лицам.\n• Не копировать и не распространять материалы платформы без письменного согласия правообладателя.\n• Соблюдать нормы законодательства Кыргызской Республики.' },
        { heading: '4. Интеллектуальная собственность', body: 'Все материалы, размещённые на платформе, включая видеозаписи, код, тексты и дизайн, являются объектами интеллектуальной собственности платформы или её партнёров. Любое использование материалов без разрешения правообладателя запрещено.' },
        { heading: '5. Ответственность', body: 'Платформа не несёт ответственности за непрямые убытки, возникшие в результате использования или невозможности использования образовательных материалов. Максимальная ответственность платформы ограничена суммой, уплаченной пользователем за доступ к материалам.' },
        { heading: '6. Изменение соглашения', body: 'Платформа оставляет за собой право в одностороннем порядке вносить изменения в настоящее Соглашение. Новая редакция вступает в силу с момента публикации на сайте. Продолжая использовать платформу после изменений, вы соглашаетесь с новой редакцией.' },
        { heading: '7. Контакты', body: 'По всем вопросам, связанным с настоящим Соглашением, обращайтесь в службу поддержки: https://t.me/red_support_chat' },
      ],
    },
    en: {
      title: 'User Agreement',
      subtitle: 'Version dated January 1, 2025',
      sections: [
        { heading: '1. General provisions', body: 'This User Agreement governs relations between htmllessons and the user accessing educational materials on the platform. By using the platform, you agree to this Agreement.' },
        { heading: '2. Subject of the agreement', body: 'The platform provides access to educational materials in the form of video lessons, text descriptions, source code, and additional web development resources. Materials are provided “as is” for educational purposes.' },
        { heading: '3. User rights and obligations', body: 'The user has the right to use platform materials for personal educational purposes and to contact support.\n\nThe user must not share platform access with third parties or distribute materials without written permission.' },
        { heading: '4. Intellectual property', body: 'All materials on the platform, including videos, code, texts, and design, are intellectual property of the platform or its partners. Any unauthorized use is prohibited.' },
        { heading: '5. Liability', body: 'The platform is not liable for indirect damages arising from the use or inability to use educational materials. Maximum liability is limited to the amount paid by the user.' },
        { heading: '6. Agreement changes', body: 'The platform may unilaterally amend this Agreement. The new version takes effect upon publication on the website.' },
        { heading: '7. Contacts', body: 'For all questions related to this Agreement, contact support: https://t.me/red_support_chat' },
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
