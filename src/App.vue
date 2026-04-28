<template>
  <div class="min-h-screen bg-texture pb-20">
    <!-- Desktop Sidebar -->
    <Sidebar
      v-model="searchQuery"
      :categories="CATEGORIES"
      :active-category="activeCategory"
      :dish-count="filteredDishes.length"
      :dish-counts="dishCounts"
      :is-edit-mode="isEditMode"
      @select="activeCategory = $event"
      @add="openAddModal"
      @export="exportData"
      @export-datajs="exportToDataJs"
      @import-file="handleImportFile"
    />

    <!-- Main Content -->
    <main class="lg:ml-60">
      <!-- Mobile Header -->
      <div class="lg:hidden sticky top-0 z-20 bg-warm-900/80 backdrop-blur border-b border-warm-200">
        <div class="px-4 py-3 flex items-center gap-3">
          <div class="flex items-center gap-2 shrink-0">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4C10.5 4 9.2 4.7 8.4 5.8C8.2 6.1 7.8 6.2 7.4 6C7.1 5.8 7 5.4 7.2 5.1C8.3 3.4 10.1 2.5 12 2.5C13.9 2.5 15.7 3.4 16.8 5.1C17 5.4 16.9 5.8 16.6 6C16.3 6.2 15.9 6.1 15.7 5.8C14.8 4.7 13.5 4 12 4Z" fill="white" fill-opacity="0.9"/>
                <path d="M19 8H5C3.3 8 2 9.3 2 11V13C2 16.9 5.1 20 9 20H15C18.9 20 22 16.9 22 13V11C22 9.3 20.7 8 19 8Z" fill="white" fill-opacity="0.9"/>
              </svg>
            </div>
            <h1 class="text-lg font-bold text-warm-800 leading-tight">马小厨家宴</h1>
          </div>
          <div class="relative flex-1">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-warm-400 text-xs">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索菜名或用料..."
              class="w-full pl-8 pr-3 py-2 bg-warm-50 border border-warm-200 rounded-xl text-sm text-warm-700 placeholder:text-warm-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
            />
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button
              @click="toggleEditMode"
              :class="[
                'px-3 py-2 rounded-xl text-xs font-medium border transition-all',
                isEditMode
                  ? 'bg-accent/10 text-accent-dark border-accent/30'
                  : 'bg-warm-100 text-warm-500 border-warm-200'
              ]"
            >
              {{ isEditMode ? '完成' : '管理' }}
            </button>
          </div>
        </div>

        <!-- Mobile Category Tabs -->
        <div class="flex overflow-x-auto px-4 pb-3 gap-2 scrollbar-hide">
          <button
            v-for="cat in categories.filter(c => c.id !== 'all')"
            :key="cat.id"
            @click="activeCategory = activeCategory === cat.id ? 'all' : cat.id"
            :class="[
              'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border',
              activeCategory === cat.id
                ? 'bg-accent/10 text-accent-dark border-accent/30'
                : 'bg-white text-warm-500 border-warm-200'
            ]"
          >
            <span class="mr-1">{{ cat.icon }}</span>
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- Desktop Header -->
      <div class="hidden lg:flex items-center justify-between px-8 py-6">
        <div>
          <h2 class="text-2xl font-bold text-warm-800">
            {{ activeCategory === 'all' ? '全部菜品' : categories.find(c => c.id === activeCategory)?.name }}
          </h2>
          <p class="text-sm text-warm-400 mt-1">
            共 {{ filteredDishes.length }} 道精选菜品
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button
            v-if="isEditMode"
            @click="openAddModal"
            class="px-4 py-2.5 bg-accent-dark text-white rounded-xl text-sm font-medium hover:bg-accent transition-colors active:scale-95 flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            新增菜品
          </button>
          <button
            @click="toggleEditMode"
            :class="[
              'px-4 py-2.5 rounded-xl text-sm font-medium border transition-all',
              isEditMode
                ? 'bg-accent/10 text-accent-dark border-accent/30'
                : 'bg-white text-warm-500 border-warm-200 hover:border-warm-300'
            ]"
          >
            {{ isEditMode ? '完成管理' : '管理菜品' }}
          </button>
        </div>
      </div>

      <!-- Mobile Edit Actions -->
      <div v-if="isEditMode" class="lg:hidden px-4 py-3 flex gap-2">
        <button
          @click="openAddModal"
          class="flex-1 py-2.5 bg-accent-dark text-white rounded-xl text-sm font-medium hover:bg-accent transition-colors active:scale-95 flex items-center justify-center gap-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          新增菜品
        </button>
        <button
          @click="exportData"
          class="px-4 py-2.5 bg-warm-100 border border-warm-200 text-warm-500 rounded-xl text-sm font-medium hover:border-warm-300 transition-colors"
        >
          导出
        </button>
        <label class="px-4 py-2.5 bg-warm-100 border border-warm-200 text-warm-500 rounded-xl text-sm font-medium hover:border-warm-300 transition-colors cursor-pointer">
          导入
          <input type="file" accept=".json" class="hidden" @change="handleImportFile" />
        </label>
      </div>

      <!-- Dish Grid -->
      <div class="px-4 lg:px-8 py-4 lg:py-0">
        <div
          v-if="filteredDishes.length > 0"
          class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
        >
          <DishCard
            v-for="dish in filteredDishes"
            :key="dish.id"
            :dish="dish"
            :is-edit-mode="isEditMode"
            @click="openDish(dish)"
            @add-to-cart="addToCart(dish)"
            @edit="openEditModal(dish)"
            @delete="deleteDish(dish.id)"
          />
        </div>

        <div v-else class="text-center py-24">
          <div class="text-6xl mb-4">🍽️</div>
          <p class="text-warm-500 font-medium">没有找到相关菜品</p>
          <p class="text-warm-400 text-sm mt-1">换个关键词试试看</p>
        </div>
      </div>
    </main>

    <!-- Dish Detail Modal -->
    <DishModal
      :show="showModal"
      :dish="selectedDish"
      @close="showModal = false"
      @add-to-cart="addToCart(selectedDish)"
    />

    <!-- Edit Modal -->
    <EditModal
      :show="showEditModal"
      :dish="editingDish"
      @close="showEditModal = false"
      @save="handleSave"
      @delete="handleDelete"
      @show-toast="handleToastFromModal"
      @confirm-delete="showDeleteConfirm"
    />

    <!-- Cart Bar -->
    <CartBar
      :items="cartItems"
      :total-count="cartTotalCount"
      :total-price="cartTotalPrice"
      @update-qty="updateCartQty"
      @remove="removeFromCart"
      @clear="clearCart"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { categories, defaultDishes } from './data.js'
import Sidebar from './components/Sidebar.vue'
import DishCard from './components/DishCard.vue'
import DishModal from './components/DishModal.vue'
import EditModal from './components/EditModal.vue'
import CartBar from './components/CartBar.vue'

const CATEGORIES = categories

/* ================= Data Persistence ================= */
const DISHES_KEY = 'maxiaochu_dishes_v3'

function loadDishes() {
  try {
    const raw = localStorage.getItem(DISHES_KEY)
    if (raw) {
      console.log('从 localStorage 加载菜品数据')
      return JSON.parse(raw)
    }
  } catch (e) { console.error('加载菜品数据失败', e) }
  console.log('使用默认菜品数据')
  return null
}

function saveDishes(data) {
  try {
    const jsonStr = JSON.stringify(data)
    // 检查是否超出配额（约 5MB）
    if (jsonStr.length > 4 * 1024 * 1024) {
      console.warn('数据过大，建议减少图片使用或导出备份')
      alert('存储空间不足，建议使用在线图片链接而非本地上传')
      return
    }
    localStorage.setItem(DISHES_KEY, jsonStr)
    console.log('菜品数据已保存到 localStorage', data.length, '道菜')
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.error('localStorage 存储空间已满')
      alert('存储空间已满！请使用图片链接而非本地上传，或先删除部分菜品')
    } else {
      console.error('保存菜品数据失败', e)
    }
  }
}

// 数据管理：优先从 localStorage 加载，没有则使用默认数据
const dishes = ref(loadDishes() || [...defaultDishes])
console.log('初始化 dishes，当前数量:', dishes.value.length)
watch(dishes, (newVal) => {
  console.log('dishes 发生变化，准备保存')
  saveDishes(newVal)
}, { deep: true })

// 搜索和筛选
const searchQuery = ref('')
const activeCategory = ref('all')

const filteredDishes = computed(() => {
  let result = dishes.value
  if (activeCategory.value !== 'all') {
    result = result.filter(dish => dish.category === activeCategory.value)
  }
  const query = searchQuery.value.toLowerCase().trim()
  if (query) {
    result = result.filter(dish => {
      return (
        dish.name?.toLowerCase().includes(query) ||
        dish.description?.toLowerCase().includes(query) ||
        dish.ingredients?.some(ing => ing.toLowerCase().includes(query))
      )
    })
  }
  return result
})

const dishCounts = computed(() => {
  const counts = {}
  dishes.value.forEach(dish => {
    counts[dish.category] = (counts[dish.category] || 0) + 1
  })
  return counts
})

/* ================= Modal ================= */
const showModal = ref(false)
const selectedDish = ref({})

function openDish(dish) {
  selectedDish.value = dish
  showModal.value = true
}

/* ================= Edit Mode ================= */
const isEditMode = ref(false)
const showEditModal = ref(false)
const editingDish = ref(null)

function toggleEditMode() {
  isEditMode.value = !isEditMode.value
}

function openAddModal() {
  editingDish.value = null
  showEditModal.value = true
}

function openEditModal(dish) {
  editingDish.value = dish
  showEditModal.value = true
}

function handleSave(payload) {
  if (editingDish.value) {
    const index = dishes.value.findIndex(d => d.id === editingDish.value.id)
    if (index !== -1) {
      dishes.value[index] = { ...dishes.value[index], ...payload }
    }
    alert('菜品已更新')
  } else {
    const newId = dishes.value.length > 0 
      ? Math.max(...dishes.value.map(d => d.id)) + 1 
      : 1
    dishes.value.push({ ...payload, id: newId })
    alert('菜品已添加')
  }
  showEditModal.value = false
}

function handleDelete() {
  if (editingDish.value) {
    const id = editingDish.value.id
    dishes.value = dishes.value.filter(d => d.id !== id)
    delete cart.value[String(id)]
    alert('菜品已删除')
    showEditModal.value = false
  }
}

function showDeleteConfirm() {
  if (confirm('确定要删除这道菜吗？')) {
    handleDelete()
  }
}

function handleToastFromModal(message) {
  // Toast 处理（目前用 alert 代替）
  if (message) alert(message)
}

/* ================= Export / Import ================= */
function exportData() {
  const data = JSON.stringify({ dishes: dishes.value, cart: cart.value }, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `maxiaochu_menu_${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function exportToDataJs() {
  const dishesCode = JSON.stringify(dishes.value, null, 2)
    .replace(/"/g, "'")
    .replace(/\n/g, '\n  ')
  
  const dataJsContent = `export const categories = [
  { id: 'all', name: '全部', icon: '🍽️' },
  { id: 'dazhun', name: '大荤', icon: '🥩' },
  { id: 'xiaozhun', name: '小荤', icon: '🍗' },
  { id: 'sucai', name: '素菜', icon: '🥬' },
  { id: 'liangban', name: '凉拌', icon: '🥗' },
  { id: 'zhushi', name: '主食', icon: '🍚' },
  { id: 'yinpin', name: '饮品', icon: '🍹' },
]

export const defaultDishes = ${dishesCode}
`

  navigator.clipboard.writeText(dataJsContent).then(() => {
    alert('✅ data.js 代码已复制到剪贴板！\n\n请打开 src/data.js，全选删除后粘贴替换即可。')
  }).catch(() => {
    // 降级方案：下载到文件
    const blob = new Blob([dataJsContent], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.js'
    a.click()
    URL.revokeObjectURL(url)
    alert('已下载为 data.js 文件，请替换 src/data.js 文件内容。')
  })
}

function handleImportFile(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    try {
      const imported = JSON.parse(ev.target.result)
      let newDishes, newCart = {}

      if (Array.isArray(imported)) {
        // 旧格式：纯 dishes 数组
        newDishes = imported
      } else if (imported && typeof imported === 'object') {
        // 新格式：包含 dishes 和 cart
        newDishes = imported.dishes
        newCart = imported.cart || {}
      }

      if (Array.isArray(newDishes) && newDishes.length > 0 && newDishes[0].name) {
        if (confirm(`确定导入 ${newDishes.length} 道菜品？当前数据将被覆盖。`)) {
          dishes.value = newDishes
          cart.value = newCart
        }
      } else {
        alert('文件格式不正确')
      }
    } catch (err) {
      alert('无法解析文件')
    }
    e.target.value = ''
  }
  reader.readAsText(file)
}

/* ================= Cart ================= */
const CART_KEY = 'weiyan_menu_cart_v2'

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) { console.error(e) }
  return {}
}
function saveCart(data) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(data))
  } catch (e) { console.error(e) }
}

const cart = ref(loadCart())
watch(cart, saveCart, { deep: true })

const cartItems = computed(() => {
  return Object.entries(cart.value)
    .map(([id, qty]) => {
      const dish = dishes.value.find(d => d.id === Number(id))
      return dish ? { dish, quantity: qty } : null
    })
    .filter(Boolean)
})

const cartTotalCount = computed(() =>
  Object.values(cart.value).reduce((sum, q) => sum + q, 0)
)

const cartTotalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.dish.price * item.quantity, 0)
)

function addToCart(dish) {
  const id = String(dish.id)
  cart.value[id] = (cart.value[id] || 0) + 1
}

function updateCartQty(dishId, qty) {
  const id = String(dishId)
  if (qty <= 0) {
    delete cart.value[id]
  } else {
    cart.value[id] = qty
  }
}

function removeFromCart(dishId) {
  delete cart.value[String(dishId)]
}

function clearCart() {
  cart.value = {}
  alert('订单已提交！')
}
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
