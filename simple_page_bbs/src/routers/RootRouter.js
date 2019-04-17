import React, { Fragment } from 'react';

import { Switch, Route } from 'react-router-dom';

const RootRouter = () => (
    <Fragment>
        <Switch>
            <Route exact path="/" render={() => <h1>HOME</h1>} />
            <Route exact path="/bbs/list" render={() => <h1>BBS LIST</h1>} />
            <Route exact path="/bbs/view" render={() => <h1>BBS VIEW</h1>} />
        </Switch>
    </Fragment>
);

export default RootRouter;