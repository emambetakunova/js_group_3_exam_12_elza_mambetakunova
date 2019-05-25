import React from 'react';
import {Route, Switch} from "react-router-dom";
import Gallery from "./containers/Gallery/Gallery";
import AuthorList from "./containers/AuthorList/AuthorList";
import NewGallery from "./containers/NewGallery/NewGallery";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Gallery}/>
            <Route path="/gallery/new" exact component={NewGallery}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/gallery/?author=:id" component={AuthorList}/>
        </Switch>
    );
};

export default Routes;
