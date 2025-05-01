export const useBlogs = () => {
  const config = useRuntimeConfig();
  const { locale } = useI18n();
  const blogs = useState(() => ({} as Record<string, any>));
  const isLoader = useLoader();

  const fetchData = async () => {
    isLoader.value = true;
    if (!blogs.value[locale.value]) {
      try {
        const data = await $fetch(`${config.public.apiBase}/blogpage/${locale.value}`);

        if (data) {
          blogs.value[locale.value] = data;
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
      if (!blogs.value[locale.value]) {
        fetchData();
      }
    });
  }

  return { blogs: computed(() => blogs.value[locale.value] || null) };
};
