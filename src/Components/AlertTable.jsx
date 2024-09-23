import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  TablePagination,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import '../Styles/AlertTable.css';

const AlertsTable = ({ alertData, searchTerm, sortConfig, setSortConfig, onStoreSelect, storeOptions, selectedStoreId }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = useMemo(() => {
    return alertData.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [alertData, searchTerm]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  const renderSortIcon = (column) => {
    if (sortConfig.key !== column) {
      return null;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUpwardIcon fontSize="small" />
    ) : (
      <ArrowDownwardIcon fontSize="small" />
    );
  };

  return (
    <>
      <TableContainer component={Paper} style={{overflow: "hidden"}}>
        <Table>
          <TableHead >
            <TableRow>
              <TableCell onClick={() => handleSort("id")} style={{ cursor: "pointer", fontWeight: "bold" }}>
                ID {renderSortIcon("id")}
              </TableCell>
              <TableCell onClick={() => handleSort("time")} style={{ cursor: "pointer",fontWeight: "bold" }}>
                Created Time {renderSortIcon("time")}
              </TableCell>
              <TableCell onClick={() => handleSort("severity")} style={{ cursor: "pointer", fontWeight: "bold" }}>
                Severity {renderSortIcon("severity")}
              </TableCell>
              <TableCell>
                <Select
                  value={selectedStoreId || "All Stores"}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    onStoreSelect(selectedValue === "All Stores" ? "" : selectedValue);
                    
                  }}

                >
                  <MenuItem style={{ cursor: "pointer", fontWeight: "bold" }} value="All Stores">All Stores</MenuItem>
                  {storeOptions.map((storeId) => (
                    <MenuItem key={storeId} value={storeId}>
                      {storeId}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell onClick={() => handleSort("title")} style={{ cursor: "pointer", fontWeight: "bold" }}>
                Event Title {renderSortIcon("title")}
              </TableCell>
              <TableCell onClick={() => handleSort("description")} style={{ cursor: "pointer", fontWeight: "bold" }}>
                Description {renderSortIcon("description")}
              </TableCell>
              <TableCell onClick={() => handleSort("assigned")} style={{ cursor: "pointer", fontWeight: "bold" }}>
                Created By {renderSortIcon("assigned")}
              </TableCell>
              <TableCell style={{ cursor: "pointer", fontWeight: "bold" }}>Event State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} className="popout-row">
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>
                  <Chip label={row.severity} color={row.severity === "Critical" ? "error" : "primary"} />
                </TableCell>
                <TableCell>{row.storeId}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.assigned}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small">
                    {row.state}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default AlertsTable;
