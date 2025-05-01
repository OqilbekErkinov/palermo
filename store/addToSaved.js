import { defineStore } from "pinia";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export const useSavedStore = defineStore("saved", () => {
  const favoriteItems = ref([]);
  const { t } = useI18n();

  const toggleFavorite = (slug) => {
    if (favoriteItems.value.includes(slug)) {
      favoriteItems.value = favoriteItems.value.filter(item => item !== slug);
      toast.warning(t('product_removed_save'),
          { position: 'bottom-right' }
    );
    } else {
      favoriteItems.value.push(slug);
      toast.success(t('product_added_save'),
          { position: 'bottom-right' }
    );
    }
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems.value));
  };

  onMounted(() => {
    favoriteItems.value = localStorage.getItem('favoriteItems') ? JSON.parse(localStorage.getItem('favoriteItems')) : [];
  })

  return {
    favoriteItems,
    toggleFavorite,
  };
});
