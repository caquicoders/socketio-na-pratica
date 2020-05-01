import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/pagina-1" component={Page1} />
    <Route path="/pagina-2" component={Page2} />
  </Switch>
);

export default Routes;
