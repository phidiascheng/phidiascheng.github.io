

importScripts('./assets/js/babel.min.7.7.js');


self.addEventListener('fetch', event => {

    const url = new URL(event.request.url);

    if (url.pathname.endsWith('.js')) {

        event.respondWith(
            fetch(event.request)
            .then(response => response.text())
            .then(sourceCode => {

                const transpiledCode = Babel.transform(sourceCode, {
                    presets: ['react'],
                    plugins: ['syntax-dynamic-import']
                }).code;

                return new Response(transpiledCode, {
                    headers: { 'Content-Type': 'application/javascript' },
                });
            })
        );
    }
});