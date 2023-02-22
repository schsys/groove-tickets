import { Admin, Resource } from 'react-admin';

import { UserDetail } from './user/user-detail';
import { UserEdit } from './user/user-edit';

import { Dashboard } from './dashboard/dashboard';
import { dataProvider } from './data-provider';

import { YazzLayout } from './layout';
import { CustomerDetail } from './customer/customer-detail';
import { CustomerEdit } from './customer/customer-edit';


const App = () => (
    <Admin layout={YazzLayout} dataProvider={dataProvider} dashboard={Dashboard}>
        <Resource
            name="user"
            list={UserDetail}
            edit={UserEdit}
            recordRepresentation="userName"
        />
        <Resource
            name="customers"
            list={CustomerDetail}
            edit={CustomerEdit}
        />
    </Admin>
);

export default App;
