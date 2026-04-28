<template>
  <div
    @click="!isEditMode && $emit('click')"
    :class="[
      'group rounded-2xl border overflow-hidden transition-all duration-300',
      isEditMode
        ? 'bg-warm-900/60 border-warm-200/80 cursor-default'
        : 'bg-warm-100 border-warm-200 cursor-pointer hover:shadow-lg hover:shadow-warm-200/50 hover:-translate-y-1'
    ]"
  >
    <div class="relative aspect-square overflow-hidden bg-warm-100">
      <img
        :src="dish.image"
        :alt="dish.name"
        :class="[
          'w-full h-full object-cover transition-transform duration-500',
          !isEditMode && 'group-hover:scale-105'
        ]"
        loading="lazy"
      />
      <!-- Normal mode: add to cart -->
      <div v-if="!isEditMode" class="absolute top-3 right-3">
        <button
          @click.stop="$emit('add-to-cart')"
          class="w-9 h-9 rounded-full bg-warm-800/90 backdrop-blur text-accent-dark shadow-md flex items-center justify-center hover:bg-accent hover:text-white transition-colors active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <!-- Edit mode: overlay actions -->
      <div v-else class="absolute inset-0 bg-warm-900/40 flex items-center justify-center gap-3 opacity-0 hover:opacity-100 transition-opacity">
        <button
          @click.stop="$emit('edit')"
          class="px-4 py-2 bg-warm-100 rounded-xl text-sm font-medium text-warm-700 shadow-lg hover:bg-accent hover:text-white transition-colors"
        >
          编辑
        </button>
        <button
          @click.stop="$emit('delete')"
          class="px-4 py-2 bg-warm-100 rounded-xl text-sm font-medium text-red-500 shadow-lg hover:bg-red-500 hover:text-white transition-colors"
        >
          删除
        </button>
      </div>
    </div>

    <div class="p-4">
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-bold text-warm-800 text-base leading-tight">{{ dish.name }}</h3>
        <span class="text-accent-dark font-bold text-base whitespace-nowrap">¥{{ dish.price }}</span>
      </div>

      <p class="text-warm-400 text-xs mt-1.5 line-clamp-1">{{ dish.description }}</p>

      <div class="mt-3 flex flex-wrap gap-1.5">
        <span
          v-for="(ing, i) in dish.ingredients.slice(0, 3)"
          :key="i"
          class="text-[11px] px-2 py-0.5 bg-warm-50 text-warm-500 rounded-md border border-warm-200"
        >
          {{ ing }}
        </span>
        <span v-if="dish.ingredients.length > 3" class="text-[11px] px-1 py-0.5 text-warm-400">
          +{{ dish.ingredients.length - 3 }}
        </span>
      </div>

      <div class="mt-3 pt-3 border-t border-warm-100">
        <div class="flex items-center gap-1.5 text-warm-400 text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span class="line-clamp-1">{{ dish.steps.length }} 个步骤 · {{ dish.ingredients.length }} 种食材</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  dish: { type: Object, required: true },
  isEditMode: { type: Boolean, default: false }
})
defineEmits(['click', 'add-to-cart', 'edit', 'delete'])
</script>
