import React from 'react';
import { ToggleThemeButton, AppBar, defaultTheme } from 'react-admin';
import { Typography } from '@mui/material';

const darkTheme = {
    palette: { mode: 'dark' },
};

export const YazzAppBar = (props) => (
    <AppBar {...props}>
        <Typography flex="1" variant="h6" id="react-admin-title"></Typography>
        <ToggleThemeButton
            lightTheme={defaultTheme}
            darkTheme={darkTheme}
        />
    </AppBar>
);
