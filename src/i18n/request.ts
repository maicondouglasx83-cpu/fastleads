import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Read the locale from the environment, defaulting to 'pt-BR'
  const locale = process.env.NEXT_PUBLIC_APP_LOCALE || 'pt-BR';

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    // Fallback to Portuguese (pt-BR) if the dictionary doesn't exist
    messages = (await import(`../../messages/pt-BR.json`)).default;
  }

  return {
    locale,
    messages
  };
});
