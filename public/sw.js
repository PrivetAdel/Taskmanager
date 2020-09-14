const CACHE_PREFIX = `taskmanager-cache`;
const CACHE_VER = `v12`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

const HTTP_STATUS_OK = 200;
const RESPONSE_SAFE_TYPE = `basic`;

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          `/`,
          `/index.html`,
          `/bundle.js`,
          `/css/normalize.css`,
          `/css/style.css`,
          `/fonts/HelveticaNeueCyr-Bold.woff`,
          `/fonts/HelveticaNeueCyr-Bold.woff2`,
          `/fonts/HelveticaNeueCyr-Medium.woff`,
          `/fonts/HelveticaNeueCyr-Medium.woff2`,
          `/fonts/HelveticaNeueCyr-Roman.woff`,
          `/fonts/HelveticaNeueCyr-Roman.woff2`,
          `/img/add-photo.svg`,
          `/img/close.svg`,
          `/img/sample-img.jpg`,
          `/img/wave.svg`
        ]);
      })
  );
});

self.addEventListener(`activate`, (evt) => {
  evt.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.map(
          (key) => {
            if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
              return caches.delete(key);
            }

            return null;
          }
        )
        .filter((key) => key !== null)
      )
    )
  );
});

const handleFetch = (evt) => {
  const {request} = evt;

  evt.respondWith(
    caches.match(request)
      .then((cacheResponse) => {
        if (cacheResponse) {
          return cacheResponse;
        }

        return fetch(request)
          .then((response) => {
            if (!response || response.status !== HTTP_STATUS_OK || response.type !== RESPONSE_SAFE_TYPE) {
              return response;
            }

            const clonedResponse = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => cache.put(request, clonedResponse));

            return response;
        });
      })
  );
};

self.addEventListener(`fetch`, handleFetch);
