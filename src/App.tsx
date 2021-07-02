import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ModuleContextProvider } from './context/ModuleContext';
import { Home } from './pages/Home';


export function App() {
  return (
    <BrowserRouter>
      <ModuleContextProvider>
        <Switch>
            <Route path="/" exact component={Home}/>
        </Switch>
      </ModuleContextProvider>
    </BrowserRouter>
  );
}

