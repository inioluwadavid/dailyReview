import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuthContext} from './hooks/useAuthContext';


import './App.css';
import Navbar from './component/Navbar';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Footer from './component/Footer'
import Themeselection from './component/Themeselection';

function App() {
  const {authIsReady, user, mode } = useAuthContext()
 
  return (
    <div  className={`App ${mode}`}>
    {authIsReady && (
      <BrowserRouter>
        <Navbar/>
        <Themeselection />
        
        <Switch >
          <Route exact  path="/">
              {!user && <Redirect  to= "/login"/>}
              {user && (
                <Home/>
              )}
              
          </Route>
          <Route path="/signup">
                {!user && <Signup/>}
                {user && <Redirect to= "/" />}
          </Route>
          <Route path="/login">
               {!user && (<Login/>)} 
               {user && <Redirect to= '/' />}
          </Route>
        </Switch>
       
        <Footer/>
      </BrowserRouter>
    )}
    </div>
  );
}

export default App;
