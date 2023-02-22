import * as React from 'react';
import { AppBar } from 'react-admin';
import Typography from '@mui/material/Typography';

export const YazzAppBar = (props) => (
    <AppBar
        sx={{
            "& .RaAppBar-title": {
                flex: 1,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
            }
        }}
        {...props}
    >
        <Typography
            variant="h6"
            color="inherit"
            className="MuiTypography-root MuiTypography-h6 RaAppBar-title css-e0wzc0-MuiTypography-root"
            id="react-admin-title"
        />
    </AppBar>
);