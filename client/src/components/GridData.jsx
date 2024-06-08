import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import React, { useState } from "react";

function QuickSearchToolbar() {
  // return (
  //   <Box
  //     sx={{
  //       p: 0.5,
  //       pb: 0,
  //     }}
  //   >
  //     <GridToolbarQuickFilter />
  //   </Box>
  // );
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function GridData({ rows, columns, ...rest }) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        disableDensitySelector
        componentsProps={{
          filterPanel: {
            disableAddFilterButton: true,
            disableRemoveAllButton: true,
          },
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        slots={{ toolbar: QuickSearchToolbar, loadingOverlay: LinearProgress }}
        initialState={{
          pagination: {
            pageSize: 10,
          },
        }}
        rowsPerPageOptions={[5, 10, 25]}
        {...rest}
      />
    </Box>
  );
}
