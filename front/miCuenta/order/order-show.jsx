import {
    Show,
    DateField,
    Labeled,
    TextField,
    Toolbar,
    useRecordContext,
    SaveButton,
    useShowContext,
    SimpleShowLayout
} from 'react-admin';
import { Card, CardContent, Box, Grid, Typography } from '@mui/material';

import { OrderTotals } from './order-totals';
import { OrderDetail } from './order-detail';

export const OrderShow = () => {
    return (
        <Show component="div">
            <OrderForm />
        </Show>
    );
}

const ToolbarOnlySave = ({ status }) => {
    if (!status || ['Completed', 'Canceled'].some(s => s === status)) {
        return <></>;
    }

    return (
        <Toolbar>
            <SaveButton label="Save" />
        </Toolbar>
    )
};

const Spacer = () => <Box m={1}>&nbsp;</Box>;

const OrderForm = () => {
    const { record } = useShowContext();

    return (
        <SimpleShowLayout>
            <Box maxWidth="50em">
                <Card>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                    Order
                                </Typography>
                                <Grid item xs={12} sm={12} md={6}>
                                    <Labeled source="orderDate" label="Order Date">
                                        <DateField source="orderDate" />
                                    </Labeled>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <Labeled source="id" label="Order Number">
                                        <TextField source="id" />
                                    </Labeled>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Labeled source="status" label="Status">
                                            <TextField source="status" />
                                        </Labeled>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Spacer />

                        <Typography variant="h6" gutterBottom>
                            Items
                        </Typography>
                        <div>
                            <OrderDetail />
                        </div>
                        <Spacer />

                        <Typography variant="h6" gutterBottom>
                            Totals
                        </Typography>
                        <div>
                            <OrderTotals />
                        </div>
                    </CardContent>
                    <ToolbarOnlySave status={record?.status} />
                </Card>
            </Box>
        </SimpleShowLayout>
    );
};
