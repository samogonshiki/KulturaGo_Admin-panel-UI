import React, { useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './provider/dataProvider';
import authProvider from './provider/authProvider';
import LoginPage from './Login';
import { EventList, EventCreate, EventEdit } from './events';

const App: React.FC = () => {
    return (
        <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            loginPage={LoginPage}
        >
            <Resource
                name="events"
                list={EventList}
                create={EventCreate}
                edit={EventEdit}
            />
        </Admin>
    );
};

export default App;