if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register(new URL('service-worker.js', import.meta.url), { type: 'module' })
    .then(function (registration) {
      console.log('ServiceWorker registration successful')
    }).catch(function (error) {
      console.log('ServiceWorker registration failed:', error)
    })
}
