export function useCart() {
  const favoriteItems = ref([])

  const toggleFavorite = (slug) => {
    if (favoriteItems.value.includes(slug)) {
      favoriteItems.value = favoriteItems.value.filter(item => item !== slug);
    } else {
      favoriteItems.value.push(slug);
    }
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems.value));
  };

  return {
    favoriteItems,
    toggleFavorite,
  };
}
