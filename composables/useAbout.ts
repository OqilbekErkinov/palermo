export const useAbout = () => {
  const config = useRuntimeConfig();
  const { locale } = useI18n();
  const aboutData = useState(() => ({} as Record<string, any>));
  const isLoader = useLoader();

  const fetchData = async () => {
    isLoader.value = true;
    if (!aboutData.value[locale.value]) {
      try {
        const data = await $fetch(`${config.public.apiBase}/aboutpg/${locale.value}`);

        if (data) {
          aboutData.value[locale.value] = data;
        }
      } catch (error) {
        console.error('Error fetching about page data:', error);
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
      if (!aboutData.value[locale.value]) {
        fetchData();
      }
    });
  }

  return { aboutData: computed(() => aboutData.value[locale.value] || null) };
};
