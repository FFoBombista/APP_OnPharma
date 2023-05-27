"use client";

import { api } from "@/app/libs/api";
import { Box, Typography, TextField, Button, Alert} from "@mui/material";

import { useState, FormEvent } from "react"

const Page = () => {
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordField, setPasswordField] = useState ('');
    const [passwordField2, setPasswordField2] = useState ('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!passwordField || !passwordField2) {
            setError('Preencha a senha')
            return;
        }
        if(passwordField !== passwordField2){
            setError('As senhas digitadas estão diferentes')
            return;
        }

        setError('');
        setInfo('');
        setLoading(true);
        const result = await api.redefinePassword(passwordField, '123');
        setLoading(false);
         if (result.error){
            setError(result.error);
        } else {
            setInfo('Senha redefinida, faça o Login agora.');
            setPasswordField('');
            setPasswordField2('');
        }

    };

    return (
        <>
            <Typography component='p' sx={{ 
                textAlign: 'center',
                mt: 2,
                color: '#555'
                }}>Ola **USUARIO, defina sua nova senha abaixo</Typography>
        
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField 
                label="Digite sua nova senha"
                name="password"
                type="password"
                fullWidth
                autoFocus
                sx={{ mb: 2}}
                onChange={e => setPasswordField(e.target.value)}
                value={passwordField}
                disabled={loading}
                />
                <TextField 
                label="Confirme sua nova senha"
                name="password"
                type="password"
                fullWidth
                autoFocus
                sx={{ mb: 2}}
                onChange={e => setPasswordField2(e.target.value)}
                value={passwordField2}
                disabled={loading}
                />
                <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                >{loading ? 'Carregando...': 'Definir nova Senha'}</Button>

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