
const { HashRouter, Route, Switch, } = ReactRouterDOM;

import { SubView } from './components/SubView.js';


// ----------------------------------------------------------------------------------------->


function App() {
    

    return (

    React.createElement(HashRouter, null, React.createElement(Switch, null, React.createElement(Route, {
        path: "/",
        exact: true,
        render: () => React.createElement(SubView, {
        id: "/"
        })
    }), React.createElement(Route, {
        path: "/schedual",
        exact: true,
        render: () => React.createElement(SubView, {
        id: "schedual"
        })
    }), React.createElement(Route, {
        path: "/work",
        exact: true,
        render: () => React.createElement(SubView, {
        id: "work"
        })
    }), React.createElement(Route, {
        path: "/blog",
        render: () => React.createElement(SubView, {
        id: "blog"
        })
    }), React.createElement(Route, {
        path: "/work/:work",
        render: () => React.createElement(SubView, {
        id: "WorkView"
        })
    })))

    );
}


// ----------------------------------------------------------------------------------------->


const container = document.getElementById('App');

const root = ReactDOM.createRoot(container);

root.render(React.createElement(App, null));
