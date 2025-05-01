export const useCategoryList = () => {
  const config = useRuntimeConfig();
  const { locale } = useI18n();
  const categoryListData = useState(() => ({} as Record<string, any>));
  const isLoader = useLoader();

  const fetchData = async () => {
    if (!categoryListData.value[locale.value]) {
      try {
        const data = await $fetch(`${config.public.apiBase}/category_list/${locale.value}`);

        if (data) {
          categoryListData.value[locale.value] = data;
        }
      } catch (error) {
        console.error('Error fetching category list data:', error);
      } finally {
        isLoader.value = false;
      }
    }
  };

  // Ma'lumotni faqat bir marta olishni ta'minlash
  if (process.server) {
    fetchData();
  } else {
    watchEffect(() => {
      if (!categoryListData.value[locale.value]) {
        fetchData();
      }
    });
  }

  return { categoryListData: computed(() => categoryListData.value[locale.value] || null) };
};
