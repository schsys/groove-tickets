import { Admin, Resource } from 'react-admin';

import { UserDetail } from './user/user-detail';
import { UserEdit } from './user/user-edit';

import { ReviewList } from './review/review-list';
import { ReviewShow } from './review/review-show';
import { ReviewCreate } from './review/review-create';

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
        <Resource
            name="reviews"
            list={ReviewList}
            create={ReviewCreate}
            show={ReviewShow}
            recordRepresentation="stars"
        />
    </Admin>
);

export default App;
