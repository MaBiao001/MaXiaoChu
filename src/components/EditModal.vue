<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-900/50 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <Transition name="scale">
          <div
            v-if="show"
            class="bg-warm-100 rounded-3xl w-full max-w-xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col"
          >
            <div class="flex items-center justify-between px-6 py-5 border-b border-warm-200 shrink-0">
              <h2 class="text-lg font-bold text-warm-800">{{ isEditing ? '编辑菜品' : '新增菜品' }}</h2>
              <button
                @click="$emit('close')"
                class="w-8 h-8 rounded-full bg-warm-50 text-warm-500 flex items-center justify-center hover:bg-warm-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <div class="flex-1 overflow-y-auto p-6 space-y-5">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-warm-400 uppercase tracking-wider mb-1.5">分类</label>
                  <select v-model="form.category" class="w-full px-3 py-2.5 bg-warm-50 border border-warm-200 rounded-xl text-sm text-warm-700 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20">
                    <option v-for="cat in categoryOptions" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-medium text-warm-400 uppercase tracking-wider mb-1.5">价格 (¥)</label>
                  <input v-model.number="form.price" type="number" min="0" class="w-full px-3 py-2.5 bg-warm-50 border border-warm-200 rounded-xl text-sm text-warm-700 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-warm-400 uppercase tracking-wider mb-1.5">菜名</label>
                <input v-model="form.name" type="text" class="w-full px-3 py-2.5 bg-warm-50 border border-warm-200 rounded-xl text-sm text-warm-700 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
              </div>

              <div>
                <label class="block text-xs font-medium text-warm-400 uppercase tracking-wider mb-1.5">菜品图片</label>
                <div class="flex gap-2">
                  <input v-model="form.imageUrl" type="text" placeholder="图片链接 URL" class="flex-1 px-3 py-2.5 bg-warm-50 border border-warm-200 rounded-xl text-sm text-warm-700 placeholder:text-warm-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
                  <label class="shrink-0 px-4 py-2.5 bg-warm-50 border border-warm-200 rounded-xl text-sm text-warm-500 cursor-pointer hover:border-warm-300 transition-colors">
                    本地上传
                    <input type="file" accept="image/*" class="hidden" @change="handleFileUpload" />
                  </label>
                </div>
                <div v-if="imagePreview" class="mt-3 relative w-full h-40 rounded-xl overflow-hidden border border-warm-200">
                  <img :src="imagePreview" class="w-full h-full object-cover" />
                  <button @click="clearImage" class="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-sm">×</button>
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-warm-400 uppercase tracking-wider mb-1.5">简介</label>
                <input v-model="form.description" type="text" class="w-full px-3 py-2.5 bg-warm-50 border border-warm-200 rounded-xl text-sm text-warm-700 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
              </div>

              <div>
                <label class="block text-xs font-medium text-warm-400 uppercase tracking-wider mb-1.5">食材（逗号分隔）</label>
                <input v-model="form.ingredients" type="text" placeholder="例如：五花肉, 马蹄, 鸡蛋" class="w-full px-3 py-2.5 bg-warm-50 border border-warm-200 rounded-xl text-sm text-warm-700 placeholder:text-warm-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
              </div>

              <div>
                <label class="block text-xs font-medium text-warm-400 uppercase tracking-wider mb-1.5">步骤（每行一步）</label>
                <textarea v-model="form.steps" rows="4" placeholder="第一步...&#10;第二步..." class="w-full px-3 py-2.5 bg-warm-50 border border-warm-200 rounded-xl text-sm text-warm-700 placeholder:text-warm-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 resize-y min-h-[80px]"></textarea>
              </div>
            </div>

            <div class="px-6 py-5 border-t border-warm-200 bg-warm-50 shrink-0 flex gap-3">
              <button
                @click="save"
                class="flex-1 py-3 bg-accent-dark text-white rounded-xl font-medium text-sm hover:bg-accent transition-colors active:scale-[0.98]"
              >
                保存
              </button>
              <button
                v-if="isEditing"
                @click="confirmDelete"
                class="px-6 py-3 bg-warm-100 border border-red-200 text-red-500 rounded-xl font-medium text-sm hover:bg-red-900/20 transition-colors"
              >
                删除
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { categories } from '../data.js'

const props = defineProps({
  show: { type: Boolean, default: false },
  dish: { type: Object, default: null }
})

const emit = defineEmits(['close', 'save', 'delete', 'show-toast', 'confirm-delete'])

const categoryOptions = categories.filter(c => c.id !== 'all')

const defaultForm = {
  category: 'dazhun',
  name: '',
  price: 0,
  imageUrl: '',
  description: '',
  ingredients: '',
  steps: ''
}

const form = ref({ ...defaultForm })
const pendingBase64 = ref(null)

const isEditing = computed(() => !!props.dish)

const imagePreview = computed(() => {
  if (pendingBase64.value) return pendingBase64.value
  if (form.value.imageUrl) return form.value.imageUrl
  return ''
})

watch(() => props.dish, (dish) => {
  pendingBase64.value = null
  if (dish) {
    form.value = {
      category: dish.category,
      name: dish.name,
      price: dish.price,
      imageUrl: dish.image.startsWith('data:') ? '' : dish.image,
      description: dish.description,
      ingredients: dish.ingredients.join(', '),
      steps: dish.steps.join('\n')
    }
    if (dish.image.startsWith('data:')) pendingBase64.value = dish.image
  } else {
    form.value = { ...defaultForm }
  }
}, { immediate: true })

function handleFileUpload(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    pendingBase64.value = ev.target.result
    form.value.imageUrl = ''
  }
  reader.readAsDataURL(file)
}

function clearImage() {
  pendingBase64.value = null
  form.value.imageUrl = ''
}

function save() {
  if (!form.value.name) {
    alert('请填写菜名')
    return
  }
  const payload = {
    category: form.value.category,
    name: form.value.name.trim(),
    price: Number(form.value.price) || 0,
    image: pendingBase64.value || form.value.imageUrl.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
    description: form.value.description.trim(),
    ingredients: form.value.ingredients.split(/[,，]/).map(s => s.trim()).filter(Boolean),
    steps: form.value.steps.split('\n').map(s => s.trim()).filter(Boolean)
  }
  emit('save', payload)
}

function confirmDelete() {
  if (confirm('确定要删除这道菜吗？')) {
    emit('delete')
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
</style>
