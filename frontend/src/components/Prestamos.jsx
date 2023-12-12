import React, { useEffect, useState } from 'react';
import Topbar from "./Topbar";
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {
    Box,
    Paper,
    TableCell,
    TextField,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Tooltip
} from '@mui/material'
const Prestamos = () => {
    const [articulo, setArticulo] = useState('');
    const [persona, setPersona] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [tableData, setTableData] = useState([]);
    const userData = useSelector(state => state.login);
    const rol = userData.userRol;
    const handleArticuloChange = (event) => {
        setArticulo(event.target.value);
    };

    const handlePersonaChange = (event) => {
        setPersona(event.target.value);
    };
    const handleFechaChange = (event) => {
        setFecha(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3030/addItemEXAMEN', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ articulo, persona, fecha })
            });
            if (response.ok) {
                handleTabla()
                alert("Inserción de datos correcta");
                setArticulo('')
                setPersona('')
                setFecha('')
            }
        } catch (err) {
            console.error("Error en la comunicación con el backend: ", err)
        }
    }
    const handleTabla = async () => {
        try {
            fetch('http://localhost:3030/getItemsEXAMEN')
                .then(response => {
                    // Verificar si la solicitud fue exitosa (código de estado 200-299)
                    if (!response.ok) {
                        throw new Error(`Error de red: ${response.status}`);
                    }
                    // Parsear la respuesta como JSON
                    return response.json();
                })
                .then(data => {
                    // Manejar los datos obtenidos
                    setTableData(data.data)
                    // Aquí puedes realizar cualquier operación que necesites con los datos
                })
                .catch(error => {
                    // Manejar errores de red o errores en la respuesta
                    console.error('Error en la solicitud:', error);
                });
        } catch (err) {
            console.error("Error obteniendo datos de la tabla")
        }
    }
    useEffect(() => {
        handleTabla()
    }, [])
    return (
        <div>
            <Topbar />
            <Paper elevation={3}>
                <Box component='form' autoComplete='off' onSubmit={handleSubmit}>
                    <Grid container alignItems="center">
                        <Grid style={{ marginLeft: '15px' }} item xs={2} md={2.5}>
                            <TextField
                                label='Artículo'
                                required
                                value={articulo}
                                onChange={handleArticuloChange}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={2} md={2.5}>
                            <TextField
                                label='Persona'
                                required
                                value={persona}
                                onChange={handlePersonaChange}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={2} md={2.5}>
                            <TextField
                                type='date'
                                label='Fecha'
                                required
                                value={fecha}
                                onChange={handleFechaChange}
                            >
                            </TextField>
                        </Grid>
                        {rol !== 'user' &&
                            <Grid item xs={2} md={1.5}>
                                <Tooltip title="Insertar datos en la tabla" arrow>
                                    <Button type="submit" variant="contained">
                                        Insertar
                                    </Button>
                                </Tooltip>
                            </Grid>
                        }
                    </Grid>
                </Box>
            </Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Artículo</TableCell>
                            <TableCell align="right">Persona</TableCell>
                            <TableCell align="right">Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow
                                key={row.articulo}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.articulo}
                                </TableCell>
                                <TableCell align="right">{row.persona}</TableCell>
                                <TableCell align="right">{row.fecha}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
export default Prestamos;