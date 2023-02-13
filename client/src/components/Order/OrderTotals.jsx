import * as React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

import { TableCellRight } from './TableCellRight';
import formatCurrencyNumber from './format-currency';

export const OrderTotals = ({ totalAmount }) => {

    return (
        <Table sx={{ minWidth: '35em' }}>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                        Total
                    </TableCell>
                    <TableCellRight sx={{ fontWeight: 'bold' }}>
                        {formatCurrencyNumber(totalAmount)}
                    </TableCellRight>
                </TableRow>
            </TableBody>
        </Table>
    );
};
