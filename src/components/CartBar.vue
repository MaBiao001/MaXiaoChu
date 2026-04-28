<template>
  <div>
    <!-- Bottom Bar -->
    <div
      class="fixed bottom-0 left-0 right-0 z-40 bg-warm-100 border-t border-warm-200 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] lg:left-60"
    >
      <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          @click="showPanel = true"
          class="flex items-center gap-3"
        >
          <div class="relative">
            <div class="w-11 h-11 rounded-full bg-accent/15 flex items-center justify-center text-accent-dark">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <span
              v-if="totalCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-clay text-white text-[10px] font-bold flex items-center justify-center border-2 border-white"
            >
              {{ totalCount }}
            </span>
          </div>
          <div class="text-left">
            <div class="text-xs text-warm-400">已选菜品</div>
            <div class="text-sm font-bold text-warm-800">¥{{ totalPrice }}</div>
          </div>
        </button>

        <button
          @click="showPanel = true"
          :disabled="totalCount === 0"
          :class="[
            'px-6 py-2.5 rounded-xl text-sm font-medium transition-all',
            totalCount > 0
              ? 'bg-accent-dark text-white hover:bg-accent active:scale-95'
              : 'bg-warm-100 text-warm-400 cursor-not-allowed'
          ]"
        >
          去结算
        </button>
      </div>
    </div>

    <!-- Cart Panel -->
    <Teleport to="body">
      <Transition name="slide">
        <div
          v-if="showPanel"
          class="fixed inset-0 z-50 flex justify-end"
        >
          <div class="absolute inset-0 bg-warm-900/40 backdrop-blur-sm" @click="showPanel = false" />
          <div class="relative w-full max-w-md h-full bg-warm-100 shadow-2xl flex flex-col">
            <div class="flex items-center justify-between px-6 py-4 border-b border-warm-200">
              <h2 class="text-lg font-bold text-warm-800">购物车</h2>
              <button
                @click="showPanel = false"
                class="w-8 h-8 rounded-full bg-warm-50 text-warm-500 flex items-center justify-center hover:bg-warm-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <div class="flex-1 overflow-y-auto p-6">
              <div v-if="items.length === 0" class="text-center py-20">
                <div class="text-5xl mb-4">🛒</div>
                <p class="text-warm-400 text-sm">购物车是空的</p>
                <p class="text-warm-300 text-xs mt-1">快去挑选心仪的菜品吧</p>
              </div>

              <div v-else class="space-y-4">
                <div
                  v-for="item in items"
                  :key="item.dish.id"
                  class="flex gap-4 p-3 bg-warm-50 rounded-2xl border border-warm-100"
                >
                  <img
                    :src="item.dish.image"
                    :alt="item.dish.name"
                    class="w-20 h-20 rounded-xl object-cover shrink-0 bg-warm-100"
                  />
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <h4 class="font-bold text-warm-800 text-sm truncate">{{ item.dish.name }}</h4>
                      <button
                        @click="$emit('remove', item.dish.id)"
                        class="text-warm-300 hover:text-clay transition-colors shrink-0"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <p class="text-xs text-warm-400 mt-0.5 truncate">{{ item.dish.description }}</p>
                    <div class="flex items-center justify-between mt-2">
                      <span class="text-accent-dark font-bold text-sm">¥{{ item.dish.price }}</span>
                      <div class="flex items-center gap-2">
                        <button
                          @click="$emit('update-qty', item.dish.id, item.quantity - 1)"
                          class="w-7 h-7 rounded-lg border border-warm-200 bg-warm-100 text-warm-600 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                          </svg>
                        </button>
                        <span class="text-sm font-medium text-warm-700 w-6 text-center">{{ item.quantity }}</span>
                        <button
                          @click="$emit('update-qty', item.dish.id, item.quantity + 1)"
                          class="w-7 h-7 rounded-lg border border-warm-200 bg-warm-100 text-warm-600 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="items.length > 0" class="p-6 border-t border-warm-200 bg-warm-50">
              <div class="flex items-center justify-between mb-4">
                <span class="text-warm-500 text-sm">共 {{ totalCount }} 件</span>
                <span class="text-xl font-bold text-warm-800">¥{{ totalPrice }}</span>
              </div>
              <button
                @click="$emit('clear'); showPanel = false"
                class="w-full py-3 bg-accent-dark text-white rounded-xl font-medium text-sm hover:bg-accent transition-colors active:scale-[0.98]"
              >
                提交订单
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  items: { type: Array, default: () => [] },
  totalCount: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 }
})

defineEmits(['update-qty', 'remove', 'clear'])

const showPanel = ref(false)
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from .fixed.inset-0,
.slide-leave-to .fixed.inset-0 {
  opacity: 0;
}
.slide-enter-from .relative,
.slide-leave-to .relative {
  transform: translateX(100%);
}
</style>
