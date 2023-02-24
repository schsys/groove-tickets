import { Datagrid, List, TextField } from 'react-admin';

export const MailgenList = () => (
    <List>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
            <TextField source="theme" />
            <TextField source="productName" />
            <TextField source="productLink" />
            <TextField source="productCopyright" />
            <TextField source="greeting" />
            <TextField source="signature" />
        </Datagrid>
    </List>
);
