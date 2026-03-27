console.log("Blonde Bailly App Loaded");

// Installer PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log("Service Worker enregistré"));
}
