
if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('./babelCompiler.js')
        .then( reg => {
            if (reg.installing) {
                const sw = reg.installing || reg.waiting;
                sw.onstatechange = function() {
                    if (sw.state === 'installed') {
                        window.location.reload();
                    }
                }
            }
            else if (reg.active) {
//                console.log('service worker activated')
            }
        })
        .catch(err => console.error('Service Worker registration failed:', err));

}