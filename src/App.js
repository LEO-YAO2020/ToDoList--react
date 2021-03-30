import React, {Component}from 'react'
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import './index.css'
import About from './view/about'
import Todo from './view/Todo'
import todoItem from './view/todoid'
function App() {
    return(
        <Router>
            <div className='head'>
                <ul>
                    <li><Link to="/todo">todo</Link></li>
                    <li><Link to="/about">about</Link></li>
                </ul>
            </div>
            <div>
                <Route path="/about" component={About}/>
                <Route path="/todo"  component={Todo}/>
                <Route path="/list/:id" exact component={todoItem}/>
            </div>
        </Router>
    )
}
export default App
