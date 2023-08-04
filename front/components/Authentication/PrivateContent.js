import { UserAuth } from "../../context/AuthContext";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getDetailedUser } from "../../common/integrations/api";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useHistory } from "react-router-dom";

export const PrivateContent = ({ children }) => {
    const history = useHistory();
    const { user } = UserAuth();

    const [apiUser, setApiUser] = useState({
        item: {},
        fetchStatus: "loading",
        error: null,
    });

    useEffect(() => {

        async function getApiUser(username) {
            const response = await getDetailedUser(username);
            setApiUser(response);
        }

        getApiUser(user.email);
    }, [user]);

    if (apiUser.fetchStatus === "loading") {
        return <>
            <Card sx={{ mt: 1 }}>
                <CardContent>
                    <p>Obteniendo datos...</p>
                </CardContent>
            </Card>
        </>
    }

    if (apiUser.fetchStatus === "failed") {
        return <>
            <Card sx={{ mt: 1 }}>
                <CardHeader title="Oops! Esto es embarazoso!" />
                <CardContent>
                    <p>{apiUser.error && apiUser.error.message}</p>
                    <NavLink to="/">Volver</NavLink>
                </CardContent>
            </Card>
        </>
    }

    if (apiUser.fetchStatus === "succeeded" && !apiUser.item.Customer) {
        return history.push({
            pathname: "/complete-register",
            state: { dbUser: { id: apiUser.item.id, userName: apiUser.item.userName } },
        });

    }

    return children({
        userId: apiUser.item.id,
        customerId: apiUser.item.Customer.id,
        customerName: apiUser.item.Customer.name
    });
};
