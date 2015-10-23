import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './pages/app.jsx';
import Publications from './pages/publications.jsx'
import NotFound from './pages/notFound.jsx';

var routes = (
    <Route name="app" path="/" handler={ App }>
        <Route name="publications" handler={ Publications } />
        <DefaultRoute handler={ Publications } />
        <NotFoundRoute handler={ NotFound } />
    </Route>
);

export default routes;
