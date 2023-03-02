import { Admin, Resource } from 'react-admin';
import { dataProvider } from './data-provider';
import { YazzLayout } from './layout';
import { CustomerList } from './customer/customer-list';
import { ReviewList } from './review/review-list';
import { ReviewShow } from './review/review-show';
import { OrderList } from './order/order-list';
import { OrderShow } from './order/order-show';
import { CustomerEdit } from './customer/customer-edit';

const App = () => (
    <Admin layout={YazzLayout} dataProvider={dataProvider}>
        <Resource
            name="customers"
            list={CustomerList}
            edit={CustomerEdit}
        />
        <Resource
            name="orders"
            list={OrderList}
            show={OrderShow}
        />
        <Resource
            name="reviews"
            list={ReviewList}
            show={ReviewShow}
        />
    </Admin>
);

export default App;
