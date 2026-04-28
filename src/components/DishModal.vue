<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-900/60 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <Transition name="scale">
          <div
            v-if="show"
            class="bg-warm-100 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
          >
            <div class="relative aspect-square bg-warm-100 shrink-0">
              <img :src="dish.image" :alt="dish.name" class="w-full h-full object-cover" />
              <button
                @click="$emit('close')"
                class="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <div class="flex-1 overflow-y-auto p-6">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-xl font-bold text-warm-800">{{ dish.name }}</h2>
                  <p class="text-sm text-warm-400 mt-1">{{ dish.description }}</p>
                </div>
                <div class="text-2xl font-bold text-accent-dark whitespace-nowrap">¥{{ dish.price }}</div>
              </div>

              <div class="mt-6">
                <h3 class="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-3">主要食材</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(ing, i) in dish.ingredients"
                    :key="i"
                    class="text-sm px-3 py-1.5 bg-warm-50 text-warm-600 rounded-lg border border-warm-200"
                  >
                    {{ ing }}
                  </span>
                </div>
              </div>

              <div class="mt-6">
                <h3 class="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-3">制作步骤</h3>
                <div class="space-y-3">
                  <div
                    v-for="(step, i) in dish.steps"
                    :key="i"
                    class="flex gap-3"
                  >
                    <div class="w-6 h-6 rounded-full bg-accent/15 text-accent-dark flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {{ i + 1 }}
                    </div>
                    <p class="text-sm text-warm-600 leading-relaxed">{{ step }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 border-t border-warm-200 bg-warm-50 shrink-0">
              <button
                @click="$emit('add-to-cart'); $emit('close')"
                class="w-full py-3.5 bg-accent-dark text-white rounded-xl font-medium text-sm hover:bg-accent transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                加入购物车
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  show: { type: Boolean, default: false },
  dish: { type: Object, default: () => ({}) }
})

defineEmits(['close', 'add-to-cart'])
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
