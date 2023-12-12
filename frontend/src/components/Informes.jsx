import Topbar from "./Topbar";
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { Grid, Tooltip } from "@mui/material";
import InformeColeccion from "./InformeColeccion";
import InformePrestamos from "./InformePrestamos";
const Informes = () => {
    const [tableDataColeccion, setTableDataColeccion] = useState([]);
    const [tableDataPrestamos, setTableDataPrestamos] = useState([]);
    const [mostrarInformeColeccion, setMostrarInformeColeccion] = useState(false);
    const [mostrarInformePrestamos, setMostrarInformePrestamos] = useState(false);
    const handleMostrarInformeColeccion = () => {
        setMostrarInformeColeccion(true);
    };
    const handleMostrarInformePrestamos = () => {
        setMostrarInformePrestamos(true);
    };
    const handleTabla = async () => {
        try {
            fetch('http://localhost:3030/getItems')
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
                    setTableDataColeccion(data.data)
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
    const handleTablaPrestamos = async () => {
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
                    setTableDataPrestamos(data.data)
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
    useEffect(() => {
        handleTablaPrestamos()
    }, [])

    return (
        <div>
            <Topbar />
            {!mostrarInformeColeccion ?
                <Grid item md={15} container alignItems="center">
                    <Tooltip title="Mostrar Informe de la tabla" arrow>
                    <Button
                        style={{ display: 'block', margin: 'auto' }}
                        variant='contained'
                        onClick={handleMostrarInformeColeccion}
                    >
                        Informe Colección
                    </Button>
                    </Tooltip>
                </Grid>:
                 <div>
                    <InformeColeccion tableData={tableDataColeccion}/>
                </div>
            }
             {!mostrarInformePrestamos ?
                <Grid item md={15} container alignItems="center">
                    <Tooltip title="Mostrar Informe de la tabla" arrow>
                    <Button
                        style={{ display: 'block', margin: 'auto' }}
                        variant='contained'
                        onClick={handleMostrarInformePrestamos}
                    >
                        Informe Prestamos
                    </Button>
                    </Tooltip>
                </Grid>:
                 <div>
                    <InformePrestamos tableData={tableDataPrestamos}/>
                </div>
            }
        </div>
    )
}
export default Informes