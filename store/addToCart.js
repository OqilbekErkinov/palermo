import { defineStore } from "pinia";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([]);
  const { t } = useI18n();
  const toggleCart = (slug) => {
    if (cartItems.value.includes(slug)) {
      cartItems.value = cartItems.value.filter(item => item !== slug);
      toast.warning(t('product_removed_cart'),
          { position: 'bottom-right' }
    );
    } else {
      cartItems.value.push(slug);
      toast.success(t('product_added_cart'),
    { position: 'bottom-right' }
    );
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
  };

  onMounted(() => {
    cartItems.value = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
  })

  return {
    cartItems,
    toggleCart,
  };
});
