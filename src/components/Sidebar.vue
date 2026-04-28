<template>
  <aside class="hidden lg:flex flex-col w-60 h-screen bg-warm-100 border-r border-warm-200 fixed left-0 top-0 z-30">
    <div class="px-6 pt-8 pb-4">
      <div class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-md shadow-accent/20">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4C10.5 4 9.2 4.7 8.4 5.8C8.2 6.1 7.8 6.2 7.4 6C7.1 5.8 7 5.4 7.2 5.1C8.3 3.4 10.1 2.5 12 2.5C13.9 2.5 15.7 3.4 16.8 5.1C17 5.4 16.9 5.8 16.6 6C16.3 6.2 15.9 6.1 15.7 5.8C14.8 4.7 13.5 4 12 4Z" fill="white" fill-opacity="0.9"/>
            <path d="M19 8H5C3.3 8 2 9.3 2 11V13C2 16.9 5.1 20 9 20H15C18.9 20 22 16.9 22 13V11C22 9.3 20.7 8 19 8Z" fill="white" fill-opacity="0.9"/>
            <path d="M8 20V21.5C8 22.3 8.7 23 9.5 23H14.5C15.3 23 16 22.3 16 21.5V20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.6"/>
            <path d="M10 11V14M14 11V14" stroke="#b07d4b" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold text-warm-800 tracking-wide leading-tight">马小厨家宴</h1>
          <p class="text-[10px] text-warm-400 tracking-widest uppercase font-medium">Ma's Home Feast</p>
        </div>
      </div>
    </div>

    <div class="px-5 pb-3">
      <div class="relative">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-warm-400 text-sm">🔍</span>
        <input
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          type="text"
          placeholder="搜索菜名或用料..."
          class="w-full pl-9 pr-3 py-2.5 bg-warm-50 border border-warm-200 rounded-xl text-sm text-warm-700 placeholder:text-warm-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        />
      </div>
    </div>

    <nav class="flex-1 overflow-y-auto px-4 py-2 space-y-1">
      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="$emit('select', cat.id)"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
          activeCategory === cat.id
            ? 'bg-accent/10 text-accent-dark border border-accent/20'
            : 'text-warm-500 hover:bg-warm-50 hover:text-warm-700'
        ]"
      >
        <span class="text-lg">{{ cat.icon }}</span>
        <span>{{ cat.name }}</span>
        <span
          :class="[
            'ml-auto text-xs px-2 py-0.5 rounded-full',
            activeCategory === cat.id
              ? 'bg-accent/20 text-accent-dark'
              : 'bg-warm-100 text-warm-400'
          ]"
        >
          {{ cat.id === 'all' ? dishCount : dishCounts[cat.id] || 0 }}
        </span>
      </button>
    </nav>

    <!-- Admin Actions -->
    <div v-if="isEditMode" class="px-5 py-4 border-t border-warm-200 space-y-2">
      <button
        @click="$emit('add')"
        class="w-full py-2.5 bg-accent-dark text-white rounded-xl text-sm font-medium hover:bg-accent transition-colors active:scale-[0.98] flex items-center justify-center gap-1.5"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        新增菜品
      </button>
      <button
        @click="$emit('export')"
        class="w-full py-2 bg-warm-100 border border-warm-200 text-warm-500 rounded-xl text-xs font-medium hover:border-warm-300 transition-colors"
      >
        💾 导出 JSON 备份
      </button>
      <button
        @click="$emit('export-datajs')"
        class="w-full py-2 bg-warm-100 border border-warm-200 text-warm-500 rounded-xl text-xs font-medium hover:border-warm-300 transition-colors"
      >
        📄 更新 data.js
      </button>
      <label class="w-full py-2 bg-warm-100 border border-warm-200 text-warm-500 rounded-xl text-xs font-medium hover:border-warm-300 transition-colors flex items-center justify-center cursor-pointer">
        📁 导入数据备份
        <input type="file" accept=".json" class="hidden" @change="$emit('import-file', $event)" />
      </label>
    </div>

    <div class="px-5 py-4 border-t border-warm-200 text-xs text-warm-400 text-center">
      马小厨家宴 · 精选菜单
    </div>
  </aside>
</template>

<script setup>
defineProps({
  categories: { type: Array, required: true },
  activeCategory: { type: String, default: 'all' },
  dishCount: { type: Number, default: 0 },
  dishCounts: { type: Object, default: () => ({}) },
  modelValue: { type: String, default: '' },
  isEditMode: { type: Boolean, default: false }
})

defineEmits(['select', 'update:modelValue', 'add', 'export', 'export-datajs', 'import-file'])
</script>
