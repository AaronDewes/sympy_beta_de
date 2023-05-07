<script setup lang="ts">
import { registerStageCallback } from '../workerAPI'
import { useNotification } from 'naive-ui'

const notification = useNotification()
let loaded = false

function notifyLoading () {
  let baseContent = 'Pyodide wird heruntergeladen'
  let count = 1
  const reactive = notification.create({
    type: 'info',
    title: 'Einrichtung läuft',
    content: baseContent + ' ' + '.'.repeat(count),
    onAfterEnter: () => {
      const plusCount = () => {
        count = count % 3 + 1
        reactive.content = baseContent + ' ' + '.'.repeat(count)
        loaded || setTimeout(plusCount, 500)
      }
      setTimeout(plusCount, 500)
    }
  })
  return {
    setContent: function (newContent: string) {
      baseContent = newContent
    },
    destroy: () => reactive.destroy()
  }
}

function notifyLoaded () {
  notification.create({
    type: 'success',
    title: 'Waldrechnr ist bereit',
    content: 'Alle Berechnungen werden nun in deinem Browser ausgeführt.',
    duration: 3000,
    closable: true
  })
}

function notifyError (errorMsg: string) {
  notification.create({
    type: 'error',
    title: 'Ein Fehler ist aufgetreten',
    content: `${errorMsg}\nBitte überprüfe deine Internetverbindung und lade die Seite neu.`,
    closable: true
  })
}

const loadingNotification = notifyLoading()

registerStageCallback(({ stage, errorMsg }) => {
  switch (stage) {
    case 'PYODIDE_DOWNLOADED':
      loadingNotification.setContent('Pakete werden heruntergeladen')
      break
    case 'PKG_DOWNLOADED':
      loadingNotification.setContent('Kernel wird geladen')
      break
    case 'KERNEL_LOADED':
      loadingNotification.destroy()
      notifyLoaded()
      loaded = true
      break
    default:
      loadingNotification.destroy()
      notifyError(errorMsg!)
  }
})
</script>
