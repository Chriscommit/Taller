import './App.scss';
import './assets/css/reset.scss'

import { Switch, Route } from 'react-router-dom'
import Header from './components/header/header'
import Home from './features/home'
import Offers from './features/offers'
import Products from './features/products/products'
import About from './features/about'
import Basket from './features/basket'
import Login from './features/login'
import Logout from './features/logout'
import Register from './features/register'
import Footer from './components/footer/footer'

function App() {

  return (
    <div className="App">
      <Header/>
        <Switch>
          <Route exact path='/' component={ Home }/>
          <Route exact path='/home' component={ Home }/>
          <Route exact path='/offers' component={ Offers }/>
          <Route exact path='/about' component={ About }/>
          <Route exact path='/login' component={ Login }/>
          <Route exact path='/logout' component={ Logout }/>
          <Route exact path='/register' component={ Register }/>
          <Route exact path='/products' component={ Products }/>
          <Route exact path='/basket' component={ Basket }/>
          {/* <Route exact path='/admin' component={ Admin }/> */}
          {/* <Route exact path='/account' component={ Account }/> */}
        </Switch>
      <Footer/>
    </div>
  )
}

export default App;