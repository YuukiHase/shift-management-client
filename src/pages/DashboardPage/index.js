import React from 'react';
import { useSelector } from 'react-redux';
import TabBarManager from 'components/TabBarManager';
import TabBarStaff from 'components/TabBarStaff';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import NotFoundPage from 'pages/NotFoundPage';

export default function DashboardPage(props) {
    const match = useRouteMatch();
    const user = useSelector(state => state.login.user);
    return (
        (user.role === 'MANAGER') ?
            <Switch>
                <Route exact path={match.url} component={TabBarManager} />
                <Route component={NotFoundPage} />
            </Switch> :
            <Switch>
                <Route exact path={match.url} component={TabBarStaff} />
                <Route component={NotFoundPage} />
            </Switch>
    );
}