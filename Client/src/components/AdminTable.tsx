import { useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DataItem {
  _id?: number;
  name: string;
  date: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  collections?: any[];
}

interface AdminTableProps<T extends DataItem> {
  data: T[];
}

const AdminTable = <T extends DataItem>({ data }: AdminTableProps<T>) => {
  const columns: GridColDef[] = useMemo(() => {
    const defaultColumns: GridColDef[] = [
      { field: 'name', headerName: 'Name', width: 130 },
      { field: 'date', headerName: 'Date', width: 130 },
      { field: 'location', headerName: 'Location', width: 130 },
      { field: 'createdAt', headerName: 'Created At', width: 130 },
      { field: 'updatedAt', headerName: 'Updated At', width: 130 },
    ];

    if (data.some((item) => 'collections' in item)) {
      defaultColumns.push({
        field: 'collections',
        headerName: 'Collections',
        width: 130,
      });
    }

    return defaultColumns;
  }, [data]);

  return (
    <div style={{ height: 400, width: '70vw' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default AdminTable;