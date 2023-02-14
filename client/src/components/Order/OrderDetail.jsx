import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

import { TableCellRight } from './TableCellRight';
import formatCurrencyNumber from './format-currency';

export const OrderDetail = ({ cartItems }) => {

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Reference</TableCell>
                    <TableCellRight>Unit Price</TableCellRight>
                    <TableCellRight>Quantity</TableCellRight>
                    <TableCellRight>Total</TableCellRight>
                </TableRow>
            </TableHead>
            <TableBody>
                {cartItems?.map(item => (
                    <TableRow key={item.id}>
                        <TableCell>
                            {item.name}
                        </TableCell>
                        <TableCellRight>
                            {formatCurrencyNumber(item.Price)}
                        </TableCellRight>
                        <TableCellRight>{item.quantity}</TableCellRight>
                        <TableCellRight>{formatCurrencyNumber(Number(item.Price) * item.quantity)}
                        </TableCellRight>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
