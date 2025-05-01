<template>
  <div class="category">
    <div class="category-header">
      <div class="category-container">
        <div class="category-header__in">
          <div class="category-header__left">
            <div class="category-header__hamb" @click="isFilter = !isFilter">
              <IconsFilter />
            </div>
            <div class="category-header__search">
              <input v-model="search" @input="searchPr(1, 'search')" type="text" placeholder="Поисковой запрос...">
              <div class="category-header__search--icon">
                <IconsSearch />
              </div>
            </div>
          </div>
          <div class="category-header__menu">
            <button aria-label="Button" class="category-header__btn"
              @click="type = 'all'; getProducts(categorySlug, minPrice, maxPrice, search, type, currentPage)"
              :class="{ 'active': type === 'all' }">
              {{ $t('all') }}
            </button>
            <button aria-label="Button" class="category-header__btn"
              @click="type = 'filter_date'; getProducts(categorySlug, minPrice, maxPrice, search, type, currentPage)"
              :class="{ 'active': type === 'filter_date' }">
              {{ $t('new') }}
            </button>
            <button aria-label="Button" class="category-header__btn"
              @click="type = 'popular'; getProducts(categorySlug, minPrice, maxPrice, search, type, currentPage)"
              :class="{ 'active': type === 'popular' }">
              {{ $t('popular') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="category-container">
      <div class="category-content">
        <Transition>
          <div v-if="loader" class="category-content__loader">
            <div class="square" id="sq1"></div>
            <div class="square" id="sq2"></div>
            <div class="square" id="sq3"></div>
            <div class="square" id="sq4"></div>
            <div class="square" id="sq5"></div>
            <div class="square" id="sq6"></div>
            <div class="square" id="sq7"></div>
            <div class="square" id="sq8"></div>
            <div class="square" id="sq9"></div>
          </div>
          <h2 v-else-if="!products?.data?.products?.length && !loader" class="category-content__title">{{
            $t('list_empty') }}</h2>
          <div v-else>
            <h2 class="category-content__title">{{ $t('decoration_pasta') }}</h2>
            <div class="category-content__cards">
              <NuxtLink v-for="item in products?.data?.products" :key="item.id"
                :to="localePath(`/product/${item.slug}`)">
                <ProductCard :product="item" />
              </NuxtLink>
            </div>
            <div class="category-content__pagination">
              <div class="category-content__pagination--item" :class="{ 'disable': currentPage - 1 <= 0 }"
                @click="getProducts(categorySlug, minPrice, maxPrice, search, type, currentPage - 1)">
                <IconsArrowLeft />
              </div>
              <div v-if="pageCount > 0" class="category-content__pagination--item"
                :class="{ 'active': item === currentPage }" v-for="item in pageCount" :key="item"
                @click="getProducts(categorySlug, minPrice, maxPrice, search, type, item)">
                {{ item }}
              </div>
              <div class="category-content__pagination--item" v-if="lastPage > 2">
                ...
              </div>
              <div @click="getProducts(categorySlug, minPrice, maxPrice, search, type, lastPage)"
                :class="{ 'active': currentPage === lastPage }" class="category-content__pagination--item">
                {{ lastPage }}
              </div>
              <div :class="{ 'disable': currentPage >= lastPage }"
                @click="getProducts(categorySlug, minPrice, maxPrice, search, type, currentPage)"
                class="category-content__pagination--item">
                <IconsArrowRight />
              </div>
            </div>
          </div>
        </Transition>
      </div>

    </div>
    <div @click.stop class="category-filter" :class="{ active: isFilter }">
      <h3 class="category-filter__title">
        {{ $t('filter') }}
      </h3>
      <div class="category-filter__group">
        <h2 class="category-filter__group--title">
          {{ $t('material_type') }}
        </h2>
        <div class="category-filter__group--item">
          <input :checked="!categorySlug" @input="clearCategory()" type="radio" id="all"
            name="category-filter__group--item">
          <label for="all">{{ $t('all') }}</label>
        </div>
        <div class="category-filter__group--item" v-for="(item, index) in categoryListData?.data?.category_list"
          :key="index">
          <input @input="filtercategory(item.slug, $event)" type="radio" :id="`category-filter__group--item-${index}`"
            name="category-filter__group--item">
          <label :for="`category-filter__group--item-${index}`">{{ item.name }}</label>
        </div>
      </div>
      <div class="category-filter__group" v-if="min && max">
        <h2 class="category-filter__group--title">
          {{ $t('price_range') }}
        </h2>
        <div class="category-filter__group--item filter-column">
          <p class="category-filter__group--item--text">
            {{ $t('from') }} <span>{{ minPrice }} uzs</span> {{ $t('to') }} <span>{{ maxPrice }} uzs</span>
          </p>
          <MultiRangeSlider :ruler="false" :label="false" style="width: 100%;" :minValue="minPrice" :maxValue="maxPrice"
            :max="max" :min="min" :step="5" :rangeMargin="0" @input="UpdateValues" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import MultiRangeSlider from "multi-range-slider-vue";
const localePath = useLocalePath();
const isFilter = ref(false);
const config = useRuntimeConfig();
const { locale } = useI18n();
const { categoryListData } = useCategoryList();
const products = ref(null)
const currentPage = ref(1)
const lastPage = ref(null)
const pageCount = ref(null)
const categorySlug = ref(null)
const minPrice = ref(null)
const maxPrice = ref(null)
const search = ref(null)
const type = ref('all')
const loader = ref(false)
async function getProducts(category_slug, min_price, max_price, search, type, page) {
  loader.value = true;
  const params = new URLSearchParams();
  if (category_slug) params.append("category_slug", category_slug);
  if (min_price) params.append("min_price", min_price);
  if (max_price) params.append("max_price", max_price);
  if (search) params.append("search", search);
  if (type) params.append("type", type);
  if (page) params.append("page", page);
  const url = `${config.public.apiBase}/productfilter/${locale.value}/?${params.toString()}`;
  products.value = await $fetch(url);
  window.scrollTo(0, 0);
  currentPage.value = page;
  pageCount.value = Math.ceil(products?.value?.count / 6) - 1;
  lastPage.value = pageCount.value + 1;
  loader.value = false;
}



getProducts(categorySlug.value, minPrice.value, maxPrice.value, search.value, type.value, currentPage.value);

const debounceTimer = ref(null)
async function searchPr() {
  clearTimeout(debounceTimer.value)
  debounceTimer.value = setTimeout(() => {
    getProducts(categorySlug.value, minPrice.value, maxPrice.value, search.value, type.value, currentPage.value)
  }, 1000);
}

const min = ref(null);
const max = ref(null);
watch(
  () => categoryListData.value?.data?.prices,
  (newPrices) => {
    if (newPrices) {
      min.value = newPrices.min_price;
      max.value = newPrices.max_price;
      minPrice.value = newPrices.min_price;
      maxPrice.value = newPrices.max_price;
    }
  },
  { immediate: true }
);
const debounceTimer2 = ref(null)

async function UpdateValues(e) {
  clearTimeout(debounceTimer2.value)
  minPrice.value = e.minValue;
  maxPrice.value = e.maxValue;
  debounceTimer2.value = setTimeout(() => {
    getProducts(categorySlug.value, minPrice.value, maxPrice.value, search.value, type.value, currentPage.value)
  }, 1000);
};

function filtercategory(slug) {
  categorySlug.value = slug;
  getProducts(categorySlug.value, minPrice.value, maxPrice.value, search.value, type.value, currentPage.value);
}

function clearCategory() {
  categorySlug.value = null;
  getProducts(categorySlug.value, minPrice.value, maxPrice.value, search.value, type.value, currentPage.value);
}

onMounted(() => {
  window.addEventListener('click', (e) => {
    if (!(e.target).closest('.category-header__hamb')) {
      isFilter.value = false;
    }
  })
})
const route = useRoute()
useHead({
  link: [
    { rel: 'canonical', href: `https://palermo.divspan.uz/${route.path}` },
  ]
})
</script>

<style>
.multi-range-slider {
  display: flex;
  position: relative;
  border: 0;
  border-radius: 10px;
  padding: 10px 10px;
  box-shadow: none;
  flex-direction: column;
}

.multi-range-slider .bar-inner {
  background-color: #E3DACB !important;
  border: 0;
  box-shadow: 0;
}

.multi-range-slider .thumb::before {
  box-shadow: none !important;
  border: 0 !important;
  background-color: #E3DACB !important;
  border: 1px solid #9B9696 !important;
}
</style>