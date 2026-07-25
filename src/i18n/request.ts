import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Read the locale from the environment, defaulting to 'pt-BR'
  const locale = process.env.NEXT_PUBLIC_APP_LOCALE || 'pt-BR';

  let messages;
  try {
    if (locale === 'pt-BR' || locale === 'pt' || locale === 'pt_BR') {
      messages = (await import(`../../messages/pt-BR.json`)).default;
    } else {
      messages = (await import(`../../messages/${locale}.json`)).default;
    }
  } catch (error) {
    messages = (await import(`../../messages/pt-BR.json`)).default;
  }

  return {
    locale,
    messages
  };
});
