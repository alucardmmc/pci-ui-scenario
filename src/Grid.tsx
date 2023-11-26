import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import gridDateFormatter from "./helpers/gridDateFormatter";
import gridDateComparator from "./helpers/gridDateComparator";

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation" },
  { field: "discovery_date", headerName: "Discovery Date", filter: 'agDateColumnFilter', valueFormatter: gridDateFormatter, filterParams: {
      comparator: gridDateComparator,
    }, 
  },
  { field: "h_mag", headerName: "H (mag)", filter: 'agNumberColumnFilter' },
  { field: "moid_au", headerName: "MOID (au)", filter: 'agNumberColumnFilter' },
  { field: "q_au_1", headerName: "q (au)", filter: 'agNumberColumnFilter' },
  { field: "q_au_2", headerName: "Q (au)", filter: 'agNumberColumnFilter' },
  { field: "period_yr", headerName: "Period (yr)", filter: 'agNumberColumnFilter' },
  { field: "i_deg", headerName: "Inclination (deg)", filter: 'agNumberColumnFilter' },
  { field: "pha", headerName: "Potentially Hazardous" },
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, },
];

const NeoGrid = (): JSX.Element => {
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: 'agTextColumnFilter',
    };
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <AgGridReact
        defaultColDef={defaultColDef}
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
      />
    </div>
  );
};

export default NeoGrid;
