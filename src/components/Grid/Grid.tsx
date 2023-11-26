import { FC, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AgGridReact as AgGridReactType } from 'ag-grid-react/lib/agGridReact';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import Title from '../Title/Title';
import data from '../../near-earth-asteroids.json';
import gridDateFormatter from '../../helpers/gridDateFormatter';
import gridDateComparator from '../../helpers/gridDateComparator';
import gridYesNoValueGetter from '../../helpers/gridYesNoValueGetter';
import AsteroidData from '../../types/asteroidData';

import styles from './Grid.module.css';

const columnDefs: ColDef[] = [
    { field: 'designation', headerName: 'Designation' },
    {
        field: 'discovery_date',
        headerName: 'Discovery Date',
        filter: 'agDateColumnFilter',
        valueFormatter: gridDateFormatter,
        filterParams: {
            comparator: gridDateComparator,
        },
    },
    { field: 'h_mag', headerName: 'H (mag)', filter: 'agNumberColumnFilter' },
    {
        field: 'moid_au',
        headerName: 'MOID (au)',
        filter: 'agNumberColumnFilter',
    },
    { field: 'q_au_1', headerName: 'q (au)', filter: 'agNumberColumnFilter' },
    { field: 'q_au_2', headerName: 'Q (au)', filter: 'agNumberColumnFilter' },
    {
        field: 'period_yr',
        headerName: 'Period (yr)',
        filter: 'agNumberColumnFilter',
    },
    {
        field: 'i_deg',
        headerName: 'Inclination (deg)',
        filter: 'agNumberColumnFilter',
    },
    {
        field: 'pha',
        headerName: 'Potentially Hazardous',
        valueGetter: gridYesNoValueGetter,
    },
    { field: 'orbit_class', headerName: 'Orbit Class', enableRowGroup: true },
];

const NeoGrid: FC = () => {
    const gridRef = useRef<AgGridReactType>(null);
    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
            filter: 'agTextColumnFilter',
        };
    }, []);

    const handleCopyRowsToClipboard = () => {
        const copyData = gridRef.current!.api.getSelectedRows();
        const formattedData = copyData
            .map((row: any) => {
                const completeRow: AsteroidData = {
                    designation: row.designation,
                    discovery_date: gridDateFormatter({
                        value: row.discovery_date,
                    }),
                    h_mag: row?.h_mag,
                    moid_au: row?.moid_au,
                    q_au_1: row?.q_au_1,
                    q_au_2: row?.q_au_2,
                    period_yr: row?.period_yr,
                    i_deg: row?.i_deg,
                    pha: gridYesNoValueGetter({ data: { pha: row.pha } }),
                    orbit_class: row.orbit_class,
                };

                return Object.values(completeRow).join('\t');
            })
            .join('\n');

        navigator.clipboard
            .writeText(formattedData)
            .then(() => {})
            .catch((error) => {
                console.error(error);
            });
    };

    const handleClearSelectedRows = () => {
        gridRef.current!.api.deselectAll();
    };

    const handleClearFilterAndSort = () => {
        gridRef.current!.api.setFilterModel(null);
        gridRef.current!.columnApi.applyColumnState({
            defaultState: { sort: null },
        });
    };

    return (
        <>
            <div className={styles.top}>
                <Title text="Near-Earth Object Overview" />
                <button onClick={handleClearFilterAndSort}>
                    Clear Filters and Sorters
                </button>
            </div>
            <button onClick={handleCopyRowsToClipboard}>
                Copy Selected Rows
            </button>
            <button onClick={handleClearSelectedRows}>
                Clear Selected Rows
            </button>
            <div
                className="ag-theme-alpine"
                style={{ height: 900, width: 1920 }}>
                <AgGridReact
                    ref={gridRef}
                    defaultColDef={defaultColDef}
                    rowData={data}
                    columnDefs={columnDefs}
                    rowGroupPanelShow={'always'}
                    rowMultiSelectWithClick={true}
                    rowSelection={'multiple'}
                />
            </div>
        </>
    );
};

export default NeoGrid;
