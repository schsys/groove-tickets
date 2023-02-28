import { Admin, Resource } from 'react-admin';

import { dataProvider } from './data-provider';

import { YazzLayout } from './layout';

import { CustomerShow } from './customer/customer-show';
import { CustomerEdit } from './customer/customer-edit';

import { ReviewList } from './review/review-list';
import { ReviewShow } from './review/review-show';
// import { ReviewCreate } from './review/review-create';
// import { ReviewEdit } from './review/review-edit';

import { OrderList } from './order/order-list';

const App = () => (
    <Admin layout={YazzLayout} dataProvider={dataProvider}>
        <Resource
            name="customers"
            list={CustomerShow}
            edit={CustomerEdit}
        />
        <Resource
            name="orders"
            list={OrderList}
        />
        <Resource
            name="reviews"
            list={ReviewList}
            // edit={ReviewEdit}
            // create={ReviewCreate}
            show={ReviewShow}
        />
    </Admin>
);

export default App;
