import DocPage from '../../components/layout/DocPage';
import { useI18n } from '../../i18n';

export default function LegalPage() {
  const { language } = useI18n();
  const content = {
    kg: {
      title: 'Реквизиттер',
      subtitle: 'Платформа боюнча юридикалык жана финансылык маалымат',
      sections: [
        { heading: 'Уюмдун аталышы', body: 'ИП htmllessons\nКаттоо номери: 123456789\nИНН: 12345678901234' },
        { heading: 'Юридикалык дарек', body: '720000, Кыргыз Республикасы, Бишкек ш., Мисал көч., 1, 1-офис' },
        { heading: 'Банк реквизиттери', body: 'Эсеп: KG000000000000000000\nБанк: ААК «Оптима Банк»\nБИК: OPTIKGFX\nВалюта: KGS' },
        { heading: 'Байланыш маалыматы', body: 'Email: support@htmllessons.kg\nTelegram: https://t.me/red_support_chat\nКолдоо убактысы: дүй-жума, 10:00–19:00 (Бишкек)' },
        { heading: 'Колдонулуучу укук', body: 'Колдонуучу менен платформанын ортосундагы мамиле Кыргыз Республикасынын мыйзамдары менен жөнгө салынат.' },
      ],
    },
    ru: {
      title: 'Реквизиты',
      subtitle: 'Юридическая и финансовая информация о платформе',
      sections: [
        { heading: 'Наименование организации', body: 'ИП htmllessons\nРегистрационный номер: 123456789\nИНН: 12345678901234' },
        { heading: 'Юридический адрес', body: '720000, Кыргызская Республика, г. Бишкек, ул. Примерная, д. 1, оф. 1' },
        { heading: 'Банковские реквизиты', body: 'Р/счёт: KG000000000000000000\nБанк: ОАО «Оптима Банк»\nБИК: OPTIKGFX\nВалюта: KGS (Кыргызский сом)' },
        { heading: 'Контактная информация', body: 'Email: support@htmllessons.kg\nTelegram: https://t.me/red_support_chat\nВремя работы поддержки: пн–пт, 10:00–19:00 (Бишкек)' },
        { heading: 'Применимое право', body: 'Все отношения между пользователем и платформой регулируются законодательством Кыргызской Республики. Споры рассматриваются в судах по месту нахождения платформы.' },
      ],
    },
    en: {
      title: 'Legal Details',
      subtitle: 'Legal and financial information about the platform',
      sections: [
        { heading: 'Organization name', body: 'IE htmllessons\nRegistration number: 123456789\nTIN: 12345678901234' },
        { heading: 'Legal address', body: '720000, Kyrgyz Republic, Bishkek, Example St., 1, office 1' },
        { heading: 'Bank details', body: 'Account: KG000000000000000000\nBank: OJSC “Optima Bank”\nBIC: OPTIKGFX\nCurrency: KGS (Kyrgyz som)' },
        { heading: 'Contact information', body: 'Email: support@htmllessons.kg\nTelegram: https://t.me/red_support_chat\nSupport hours: Mon-Fri, 10:00–19:00 (Bishkek)' },
        { heading: 'Applicable law', body: 'Relations between the user and platform are governed by the laws of the Kyrgyz Republic.' },
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
