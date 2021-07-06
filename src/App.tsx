import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ModuleContextProvider } from './context/ModuleContext';
import { AuthContextProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { AdminPanel } from './pages/AdminPanel';


export function App() {
  return (
    <BrowserRouter>
      <ModuleContextProvider>
        <Switch>
            <Route path="/" exact component={Home}/>
            <AuthContextProvider>
              <Route path="/login" component={Login}/>
              <Route path="/admin" component={AdminPanel}/>
            </AuthContextProvider>
        </Switch>
      </ModuleContextProvider>
    </BrowserRouter>
  );
}

