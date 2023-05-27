"use client";

import { api } from "@/app/libs/api";
import { Box, Typography, TextField, Button, Alert} from "@mui/material";

import { useState, FormEvent } from "react"

const Page = () => {
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailField, setEmailField] = useState ('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!emailField) {
            setError('Preencha o seu Email')
            return;
        }

        setError('');
        setInfo('');
        setLoading(true);
        const result = await api.forgotPassword(emailField);
        setLoading(false);
         if (result.error){
            setError(result.error);
        } else {
            setInfo('Enviamos um e-mail para recuperação da sua Senha ');
        }

    };

    return (
        <>
            <Typography component='p' sx={{ 
                textAlign: 'center',
                mt: 2,
                color: '#555'
                }}>Deseja recuperar sua Senha?</Typography>
        
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField 
                label="Digite seu e-Mail"
                name="email"
                fullWidth
                autoFocus
                sx={{ mb: 2}}
                onChange={e => setEmailField(e.target.value)}
                value={emailField}
                disabled={loading}
                />
                <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                >{loading ? 'Carregando...': 'Recuperar a Senha'}</Button>

                {error && 
                <Alert variant="filled" severity="error" sx={{mt:3}}>{error}</Alert>
                }
                {info && 
                <Alert variant="filled" severity="success" sx={{mt:3}}>{info}</Alert>
                }
            </Box>
        </>
    );
}

export default Page;