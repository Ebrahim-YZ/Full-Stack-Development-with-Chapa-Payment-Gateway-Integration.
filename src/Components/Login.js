import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, IconButton, MenuItem, Dialog, DialogContent, Card, CardContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [role, setRole] = useState('User'); // Default role is 'User'
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8001/login', {
                email: email.trim(),
                password: password.trim()
            });

            // Check the response status
            if (response.status === 200) {
                const token = response.data.token;  // Extract the token from the response
                // Store the token in localStorage
                localStorage.setItem('authToken', token);
                // alert('Login successful!');
                onLoginSuccess();
            }
        } catch (error) {
            // If the request fails, check the error response status
            if (error.response) {
                // The request was made and the server responded with a status code
                if (error.response.status === 400 || error.response.status === 401) {
                    alert('Invalid email or password');
                } else if (error.response.status === 500) {
                    alert('Internal server error. Please try again later.');
                }
            } else {
                // If the error doesn't have a response (e.g., network error)
                alert('An unknown error occurred. Please try again.');
            }
        }
    };





    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:8001/register', { username, email, password, role });
            alert('Registration successful');
            handleClose();
        } catch (error) {
            setRegisterError('Registration failed. Please try again.');
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{ backgroundColor: '#f0f0f0' }}
        >
            <Card sx={{ width: { xs: '90%', sm: '50%', md: '35%' }, padding: '20px' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom textAlign="center">
                       Pay With Chapa
                    </Typography>
                    <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {loginError && <Typography color="error">{loginError}</Typography>}
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
                        Login
                    </Button>
                    <Link component="button" variant="body2" onClick={handleOpen} sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
                        Create account
                    </Link>
                </CardContent>
            </Card>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Register</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* Role Dropdown */}
                    <TextField
                        select
                        label="Role"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                    </TextField>

                    {registerError && <Typography color="error">{registerError}</Typography>}

                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
                        Submit
                    </Button>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Login;
