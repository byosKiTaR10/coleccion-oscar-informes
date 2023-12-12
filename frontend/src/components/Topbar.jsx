import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../store/storelogin';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AdbIcon from '@mui/icons-material/Adb'

import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const Topbar = () => {
    const pdfPath = process.env.PUBLIC_URL + '/Ojeda_Suárez_Óscar_EXUT4_Manual.pdf';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.login);
    const isLoggedin = userData.isAutenticated;
    const username = userData.userName;
    const rol = userData.userRol;
    useEffect(() => {
        if (!isLoggedin) {
            // Si no está autenticado, navegar a la página de inicio de sesión
            navigate('/')
        }
    }, [isLoggedin, navigate]);
    const handleLogout = () => {
        // Implementa la lógica de logout y cambia el estado del store
        dispatch(loginActions.logout())
        // Navegar a la página raíz
        navigate('/')
    };



    return (
        <div>
            <AppBar position='static'>
                <Container>
                    <Toolbar>
                        <Grid container alignItems="center">
                            <Grid style={{ display: 'flex', flexDirection: 'row', gap: '.5rem' }} item xs={2} md={2} lg={2}>
                                {rol === 'user' ?
                                    <InsertEmoticonIcon /> :
                                    <AdbIcon />}
                                <Typography>{username}</Typography>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2}>
                                <Link to='/home' style={{ color: 'white' }}>Inicio</Link>
                            </Grid>
                            {rol === 'admin' &&
                                <Grid item xs={2} md={2} lg={2}>
                                    <Link to='/Informes' style={{ color: 'white' }}>Informes</Link>
                                </Grid>}
                            <Grid item xs={2} md={2} lg={2}>
                                <Link to='/Prestamos' style={{ color: 'white' }}>Prestamos</Link>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2}>
                                <a href={pdfPath} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>Ayuda</a>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2}>
                                <Tooltip title="Cerrar sesión" arrow>
                                    <Button variant='contained' onClick={handleLogout}>Salir</Button>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}
export default Topbar