
const { HashRouter, Route, Switch, } = ReactRouterDOM;

import { SubView } from './components/SubView.js';


// ----------------------------------------------------------------------------------------->


function App() {
    

    return (

        <HashRouter>
            <Switch>

                <Route path="/" exact render={() => <SubView id='/' />}/>
                <Route path="/about" exact render={() => <SubView id='about' />}/>
                <Route path="/schedual" exact render={() => <SubView id='schedual' />}/>
                <Route path="/work" exact render={() => <SubView id='work' />}/>

                <Route path="/blog" render={() => <SubView id='blog' />}/>
                
                <Route path="/work/:work" render={() => <SubView  id='WorkView'/>}/>

            </Switch>
        </HashRouter>

    );
}


// ----------------------------------------------------------------------------------------->


const container = document.getElementById('App');

const root = ReactDOM.createRoot(container);

root.render(<App />);
