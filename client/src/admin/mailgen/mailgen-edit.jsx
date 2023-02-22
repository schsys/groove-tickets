import { Edit, SimpleForm, TextInput, SelectInput, required } from 'react-admin';
import { Box } from '@mui/material';
import { CustomToolbar } from '../custom-toolbar';

export const MailgenEdit = () => (
    <Edit>
        <SimpleForm toolbar={<CustomToolbar />}>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="productName"
                        validate={required()}
                        fullWidth
                    />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="productLink"
                        validate={required()}
                        fullWidth
                    />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="productCopyright"
                        validate={required()}
                        fullWidth
                    />
                </Box>
            </Box>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <SelectInput source="theme"
                        label="Theme"
                        optionValue="name"
                        choices={[
                            { id: "Default", name: "default" },
                            { id: "Neopolitan", name: "neopolitan" },
                            { id: "Salted", name: "salted" },
                            { id: "Cerberus", name: "cerberus" },
                        ]}
                        validate={required()}
                        fullWidth
                    />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="greeting"
                        validate={required()}
                        fullWidth
                    />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="signature"
                        validate={required()}
                        fullWidth
                    />
                </Box>
            </Box>
        </SimpleForm>
    </Edit>
);
