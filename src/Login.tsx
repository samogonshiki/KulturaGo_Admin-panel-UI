import * as React from 'react';
import { Login, LoginForm } from 'react-admin';
import { Box, Card, CardContent, Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const MyLoginPage: React.FC = () => (
    <Login>
        <Card sx={{ minWidth: 300 }}>
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход в админ-панель
                    </Typography>
                </Box>
                <LoginForm />
            </CardContent>
        </Card>
    </Login>
);

export default MyLoginPage;