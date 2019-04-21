import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import CategoryNavBar from 'components/category/CategoryNavBar';

import PostListContainer from 'containers/PostListContainer';

const RootRouter = () => (
    <Fragment>
        <CategoryNavBar />
        <Switch>
            <Route exact path="/" render={() => <h1>HOME</h1>} />
            <Route exact path="/bbs/list" component={PostListContainer} />
            <Route exact path="/bbs/view" render={() => <h1>BBS VIEW</h1>} />
        </Switch>
    </Fragment>
);

export default RootRouter;