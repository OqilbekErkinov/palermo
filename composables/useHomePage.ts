export const useHomePage = () => {
  const config = useRuntimeConfig();
  const { locale } = useI18n();
  const homePageData = useState(() => ({} as Record<string, any>));
  const isLoader = useLoader();

  const fetchData = async () => {
    isLoader.value = true;
    if (!homePageData.value[locale.value]) {
      try {
        const data = await $fetch(`${config.public.apiBase}/homepg/${locale.value}`);

        if (data) {
          homePageData.value[locale.value] = data;
        }
      } catch (error) {
        console.error('Error fetching home page data:', error);
      } finally {
        isLoader.value = false;
      }
    } else {
      isLoader.value = false;
    }
  };

  if (process.server) {
    fetchData();
  } else {
    watchEffect(() => {
      if (!homePageData.value[locale.value]) {
        fetchData();
      }
    });
  }

  return { homePageData: computed(() => homePageData.value[locale.value] || null) };
};
