import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
const DemoRouter = () => {
    return (
        <div className='container'>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Wellcome} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/person" component={Person} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="" component={NotFound} />
                </Switch>
            </Router>
        </div>
    )
}

const Header = () => {
    return (
        <nav className='navbar navbar-expand-sm bg-dark navbar-dark"'>
            <div className="container-fluid">
                <ul className="nav me-auto">
                    <li className="nav-item">
                        <Link className="navbar-brand text-white" to="/">React</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/person">Person</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/about">About us</Link>
                    </li>
                </ul>
                <button type='button' className='btn btn-primary '>Sign Up</button>
            </div>

        </nav>
    );
}

const Wellcome = () => {
    return (
        <div className='container'>
            <h4>Welcome Component!</h4>
        </div>
    );
}

const Home = () => {
    return (
        <div className='container'>
            <h4>Home Component</h4>
        </div>
    );
}

const Person = () => {
    return (
        <div className='container'>
            <h4>Person Component</h4>
        </div>
    );
}

const About = () => {
    return (
        <div className='container'>
            <h4>About Component</h4>
        </div>
    );
}

const NotFound = () => {
    return (
        <div className='container'>
            <h4>NotFound Component</h4>
        </div>
    );
}

export default DemoRouter;
