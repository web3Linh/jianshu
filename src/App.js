import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { 
  BrowserRouter as Router, 
  Route,
  Routes
} from 'react-router-dom';
import Header from './common/header';
import store from './store';
import {GlobalStyle } from './style';
import { GlobalStyleIcon } from './statics/iconfont/iconfont';
import Home from './pages/home';
import Detail from './pages/detail/loadable';
import Login from './pages/login';
import Write from './pages/write';

export default class App extends Component {
  render() {
    return (
     <>
      <Provider store={ store }>
       <GlobalStyle/>
       <GlobalStyleIcon/>
        <Router>
          <Header/>
          <Routes>
            <Route path='/' element={ <Home /> } exact></Route>
            <Route path='/detail' element={ <Detail /> } exact></Route>
            <Route path='/login' element={ <Login /> } exact></Route>
            <Route path='/write' element={ <Write /> } exact></Route>
          </Routes>
        </Router>
      </Provider>
     </>
    )
  }
}

