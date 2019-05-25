import React from 'react';
import {Route, Switch} from "react-router-dom";
import ArtistsBuilder from "./containers/ArtistsBuilder/ArtistsBuilder";
import Artist from "./containers/Artist/Artist";
import Album from "./containers/Album/Album";
import TrackHistory from "./containers/TrackHistory/TrackHistory";
import NewArtist from "./containers/NewArtist/NewArtist";
import NewAlbum from "./containers/NewAlbum/NewAlbum";
import NewTrack from "./containers/NewTrack/NewTrack";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={ArtistsBuilder}/>
            <Route path="/trackHistory" exact component={TrackHistory}/>
            <Route path="/artists/new" exact component={NewArtist}/>
            <Route path="/albums/new" exact component={NewAlbum}/>
            <Route path="/tracks/new" exact component={NewTrack}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/albums/:id" component={Album}/>
            <Route path="/artists/:id" component={Artist}/>
        </Switch>
    );
};

export default Routes;
