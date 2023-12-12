import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
const InformePrestamos = (props) => {
    const col = [
        { title: "Articulo", field: "articulo" },
        { title: "Persona", field: "persona", filtering: false },
        { title: "Fecha", field: "fecha", filtering: false}
    ]
    return (
        <MaterialTable
            title="Informe de los préstamos"
            columns={col} data={props.tableData}
            //Esto de aquí abajo es lo nuevo. Dentro de options pondremos la parte de exportación
            options={{
                draggable: false,
                columnsButton: true,
                filtering: true,
                exportMenu: [
                    {
                        label: "Exportar a PDF",
                        exportFunc: (cols, datas) => ExportPdf(cols, datas, "InformePDFPrueba"),
                    },
                    {
                        label: "Exportar a CSV",
                        exportFunc: (cols, datas) => ExportCsv(cols, datas, "InformeCSVPrueba"),
                    },
                ],
            }}
        />)
}
export default InformePrestamos