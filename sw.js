const CACHE_NAME = "groupgen-offline-v2";







const FILES_TO_CACHE = [



  "./",



  "./index.html",



  "./manifest.json",



  "./icon-196.png",



  "./tailwind.css",







  /* JS libraries (cached for offline export) */



  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",



  "https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js",



  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",



  "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js",



  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",



  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"



];







/* INSTALL */



self.addEventListener("install", event => {



  event.waitUntil(



    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))



  );



  self.skipWaiting();



});







/* ACTIVATE */



self.addEventListener("activate", event => {



  event.waitUntil(



    caches.keys().then(keys =>



      Promise.all(



        keys.map(key => key !== CACHE_NAME && caches.delete(key))



      )



    )



  );



  self.clients.claim();



});







/* FETCH */



self.addEventListener("fetch", event => {



  event.respondWith(



    caches.match(event.request).then(response => {



      return response || fetch(event.request);



    })



  );



});



