export const useServices = () => {
  const config = useRuntimeConfig();
  const { locale } = useI18n();
  const servicesData = useState(() => ({} as Record<string, any>));
  const isLoader = useLoader();

  const fetchData = async () => {
    isLoader.value = true;
    if (!servicesData.value[locale.value]) {
      try {
        const data = await $fetch(`${config.public.apiBase}/serviceview/${locale.value}`);

        if (data) {
          servicesData.value[locale.value] = data;
        }
      } catch (error) {
        console.error('Error fetching serviceview page data:', error);
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
      if (!servicesData.value[locale.value]) {
        fetchData();
      }
    });
  }

  return { servicesData: computed(() => servicesData.value[locale.value] || null) };
};
