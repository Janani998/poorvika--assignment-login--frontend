import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import UpdatePassword from './UpdatePassword/UpdatePassword';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path = "/signup" exact component = {SignUp}/>
          <Route path = "/home" exact component = {Home}/>
          <Route path = "/updatepassword" exact component = {UpdatePassword}/>
          <Route path = "/" exact component = {SignIn}/>
          <Redirect to = "/"/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
