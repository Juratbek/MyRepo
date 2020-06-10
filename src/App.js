import React from 'react';
import './App.css';
import Summary from "./pages/summary/Summary";
import Detailed from "./pages/detailed/Detailed";
import Container from "reactstrap/es/Container";
import MyNavbar from "./Components/Navbar/Navbar";
import {Redirect, Route, Switch} from "react-router-dom";


function App() {
    return (
        <div>
            <Container>
                <MyNavbar/>
                <Switch>
                    <Route path="/detailed/:slug" exact component={Detailed}/>
                    <Route path="/detailed" exact component={Detailed}/>
                    <Route path="/" exact component={Summary}/>
                    <Redirect to="/"/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;
