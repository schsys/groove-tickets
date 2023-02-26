import React, { useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { getDetailedUser } from '../common/integrations/api';

import { Admin, Resource } from 'react-admin';

import { YazzLayout } from "./layout/yazz-layout";

import { CategoryList } from './category/category-list';
import { CategoryEdit } from './category/category-edit';
import { CategoryCreate } from './category/category-create';

import { LocationList } from './location/location-list';
import { LocationEdit } from './location/location-edit';
import { LocationCreate } from './location/location-create';

import { ArtistList } from './artist/artist-list';
import { ArtistEdit } from './artist/artist-edit';
import { ArtistCreate } from './artist/artist-create';

import { ProductList } from './product/product-list';
import { ProductCreate } from './product/product-create';
import { ProductEdit } from './product/product-edit';

import { UserList } from './user/user-list';
import { UserCreate } from './user/user-create';
import { UserEdit } from './user/user-edit';

import { CustomerList } from './customer/customer-list';
import { CustomerCreate } from './customer/customer-create';
import { CustomerEdit } from './customer/customer-edit';

import { OrderList } from './order/order-list';
import { OrderEdit } from './order/order-edit';

import { Dashboard } from './dashboard/dashboard';
import { dataProvider } from './data-provider';
// import { authProvider } from './auth-provider';

import { ReviewList } from './review/review-list';
import { ReviewShow } from './review/review-show';
import { ReviewCreate } from './review/review-create';

import { MailgenList } from "./mailgen/mailgen-list";
import { MailgenEdit } from "./mailgen/mailgen-edit";

import Loader from "../components/Loader/Loader";

const App = () => {
    const { user } = UserAuth();

    const [apiUser, setApiUser] = useState({
        item: {},
        fetchStatus: 'loading',
        error: null
    });

    useEffect(() => {
        console.log('Admin useEffect()');

        async function getApiUser(username) {
            const response = await getDetailedUser(username);

            setApiUser(response);
        }

        getApiUser(user.email)

    }, [user]);

    if (apiUser.fetchStatus === 'loading') {
        return <>
            <Loader />
        </>
    }

    if (apiUser.fetchStatus === 'failed') {
        return <>
            <p>Oops! Esto es embarazoso! </p>
            <p>{apiUser.error && apiUser.error.message}</p>
            <NavLink to="/">Volver</NavLink>
        </>
    }

    if (apiUser.fetchStatus === 'succeeded' && apiUser.item.role !== 'Admin') {
        return <>
            <Redirect to="/micuenta" />
        </>
    }

    return (
        <Admin layout={YazzLayout} dataProvider={dataProvider} dashboard={Dashboard}>
            <Resource
                name="categories"
                list={CategoryList}
                edit={CategoryEdit}
                create={CategoryCreate}
                recordRepresentation="name"
            />
            <Resource
                name="locations"
                list={LocationList}
                edit={LocationEdit}
                create={LocationCreate}
                recordRepresentation="name"
            />
            <Resource
                name="artists"
                list={ArtistList}
                edit={ArtistEdit}
                create={ArtistCreate}
                recordRepresentation="name"
            />
            <Resource
                name="products"
                list={ProductList}
                edit={ProductEdit}
                create={ProductCreate}
                recordRepresentation="name"
            />
            <Resource
                name="users"
                list={UserList}
                edit={UserEdit}
                create={UserCreate}
                recordRepresentation="userName"
            />
            <Resource
                name="customers"
                list={CustomerList}
                edit={CustomerEdit}
                create={CustomerCreate}
                recordRepresentation="name"
            />
            <Resource
                name="orders"
                list={OrderList}
                edit={OrderEdit}
                recordRepresentation={(record) => `${record.id}`}
            />
            <Resource
                name="reviews"
                list={ReviewList}
                show={ReviewShow}
                recordRepresentation="stars"
            />
            <Resource
                name="mailgen"
                list={MailgenList}
                edit={MailgenEdit}
            />
        </Admin>
    );

}

export default App;
