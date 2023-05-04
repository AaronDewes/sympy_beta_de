<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NSpin, NA } from 'naive-ui'
import { getPyodideVersion, getSymPyVersion } from '../workerAPI'
import { homepage } from '../../package.json'

const pyodideVersion = ref<string>()
const sympyVersion = ref<string>()
const commit = '__COMMIT__'
const commitURL = `${homepage}/commit/${commit}`
const buildDate = new Intl.DateTimeFormat(navigator.language).format(new Date('__BUILD_DATE__'));

onMounted(async () => {
  pyodideVersion.value = await getPyodideVersion()
  sympyVersion.value = await getSymPyVersion()
})
</script>

<template>
  <div id="footer">
    <p>
      Pyodide-Version
      <template v-if="pyodideVersion">
        {{ pyodideVersion }}
      </template>
      <n-spin
        v-else
        size="small"
      />
      ·
      SymPy-Version
      <template v-if="sympyVersion">
        {{ sympyVersion }}
      </template>
      <n-spin
        v-else
        size="small"
      />
      <br>
      Commit <n-a
        :href="commitURL"
        target="_blank"
      >
        {{ commit.slice(0, 7) }}
      </n-a>· Erstellt am {{ buildDate }}
    </p>
    <p>
      &copy; 2013-2020 SymPy Development Team
      <br>&copy; 2021-2023 Qijia Liu
      <br>&copy; 2023 Aaron Dewes
    </p>
    <p>
      Dieses Projekt ist freie Open-Source-Software unter der GNU Affero General Public License v3:
      <n-a
        :href="homepage"
        target="_blank"
      >
        Waldrechnr auf GitHub
      </n-a>.
    </p>
  </div>
</template>
