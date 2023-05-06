<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NInputGroup, NInput, NButton, NBadge, NH1, NA, NPopover, NRadioGroup, NRadioButton, NIcon, NSpace } from 'naive-ui'
import { Python } from '@vicons/fa'
import { Math } from '@vicons/tabler'
import BetaMathLive from './BetaMathLive.vue'

const input = ref<string>('')
const defaultInputType = 'LaTeX'
const inputType = ref(defaultInputType)
const router = useRouter()

function submit () {
  if (input.value) {
    router.push({ name: inputType.value, params: { expr: input.value } })
  }
}

const route = useRoute()
watchEffect(() => {
  input.value = route.params.expr as string || ''
  inputType.value = route.name === 'Python' ? 'Python' : defaultInputType
})

function mathliveInputCallback (value: string) {
  input.value = value
}
</script>

<template>
  <div
    class="input"
  >
    <n-h1>
      <router-link :to="'/'">
        <img
          src="/favicon.svg"
          alt=""

        >
        <n-badge value="Beta" type="info" :offset="[0, 6]">
          <n-a style="font-family: 'EB Garamond', serif">waldrechnr.</n-a>
        </n-badge>
      </router-link>
    </n-h1>
    <n-space vertical>
      <n-input-group>
        <n-input
          v-model:value="input"
          type="text"
          placeholder="Gib einen Ausdruck ein"
          clearable
          style="font-family: 'Droid Sans Mono', monospace"
          @keyup.enter="submit"
        />
        <n-popover>
          <template #trigger>
            <n-button
              type="primary"
              @click="submit"
            >
              =
            </n-button>
          </template>
          compute input
        </n-popover>
      </n-input-group>
      <n-radio-group v-model:value="inputType">
        <n-radio-button
          value="Python"
        >
        <n-radio-button value="LaTeX">
          <n-icon :component="Math" />
          LaTeX / Mathlive
        </n-radio-button>
          <n-icon :component="Python" />
          Python
        </n-radio-button>
      </n-radio-group>
      <beta-math-live
        v-show="inputType === 'LaTeX'"
        :input="input"
        :input-callback="mathliveInputCallback"
        :enter-callback="submit"
      />
    </n-space>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 0;
  text-align: center;
}

h1 a {
  text-decoration: none;
}

h1 a img {
  vertical-align: middle;
}

img {
  height: 75px
}

.input {
  width: calc(100vw - 24px);
  max-width: 584px;
  margin: auto;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
}
</style>
