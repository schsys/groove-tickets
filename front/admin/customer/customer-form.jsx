import {
    TextInput,
    required,
    DateInput,
    NumberInput,
    ReferenceInput,
    SelectInput
} from "react-admin";
import { Box } from "@mui/material";

export const CustomerForm = () => {

    return <>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
            <Box flex={2}>
                <TextInput
                    source="name"
                    validate={required()}
                    fullWidth
                />
            </Box>
            <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                <DateInput source="birthDate" fullWidth />
            </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
            <Box flex={1}>
                <TextInput
                    source="address"
                    fullWidth
                />
            </Box>
            <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                <TextInput
                    source="city"
                    fullWidth
                />
            </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
            <Box flex={2}>
                <TextInput
                    source="state"
                    fullWidth
                />
            </Box>
            <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                <NumberInput
                    source="zip"
                    fullWidth
                />
            </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
            <Box flex={1}>
                <TextInput
                    source="telephone"
                    validate={required()}
                    fullWidth />
            </Box>
            <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                <NumberInput
                    source="document"
                    validate={required()}
                    fullWidth />
            </Box>
        </Box>
    </>
}
