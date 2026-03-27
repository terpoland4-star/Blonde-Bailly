self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("bb-cache").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/shop.html",
        "/cart.html",
        "/css/style.css",
        "/js/app.js"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
