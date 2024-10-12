import { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';

function Payment() {
    const [form, setForm] = useState({
        amount: '',
        currency: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const tx_ref = `${form.first_name}-${Date.now()}`;
    let return_url = null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                'http://localhost:8001/accept-payment',
                {
                    amount: form.amount,
                    currency: form.currency,
                    email: form.email,
                    first_name: form.first_name,
                    last_name: form.last_name,
                    phone_number: form.phone_number,
                    tx_ref,
                    // return_url,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            window.location.href = res.data.data.checkout_url;
            console.log(res);
            setForm({
                amount: '',
                currency: '',
                email: '',
                first_name: '',
                last_name: '',
                phone_number: '',
                tx_ref,
            });
        } catch (error) {
            console.log('Error', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Amount"
                            variant="outlined"
                            name="amount"
                            value={form.amount}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Currency"
                            variant="outlined"
                            name="currency"
                            value={form.currency}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="First Name"
                            variant="outlined"
                            name="first_name"
                            value={form.first_name}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            name="last_name"
                            value={form.last_name}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            name="phone_number"
                            value={form.phone_number}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            Pay
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}

export default Payment;
