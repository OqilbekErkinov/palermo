export const useFooter = () => {
  const config = useRuntimeConfig();
  const { locale } = useI18n();
  const footerData = useState(() => ({} as Record<string, any>));
  const isLoader = useLoader();

  const fetchData = async () => {
    isLoader.value = true;
    if (!footerData.value[locale.value]) {
      try {
        const data = await $fetch(`${config.public.apiBase}/footer/${locale.value}`);

        if (data) {
          footerData.value[locale.value] = data;
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        isLoader.value = false;
      }
    } else {
      isLoader.value = false;
    }
  };

  // Ma'lumotni faqat bir marta olishni ta'minlash
  if (process.server) {
    fetchData();
  } else {
    watchEffect(() => {
      if (!footerData.value[locale.value]) {
        fetchData();
      }
    });
  }

  return { footerData: computed(() => footerData.value[locale.value] || null) };
};
