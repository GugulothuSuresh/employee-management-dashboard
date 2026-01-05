import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import StatCard from "../components/StatCard";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";

import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  Avatar,
  Grid,
  TablePagination,
} from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  dayjs.extend(customParseFormat);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openForm, setOpenForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem("employees")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.active).length;
  const inactiveEmployees = employees.filter((e) => !e.active).length;

  const handleSaveEmployee = (emp) => {
    if (emp.id) {
      setEmployees((prev) => prev.map((e) => (e.id === emp.id ? emp : e)));
    } else {
      setEmployees((prev) => [...prev, { ...emp, id: Date.now() }]);
    }
    setOpenForm(false);
    setSelectedEmployee(null);
  };

  const confirmDelete = (emp) => {
    setEmployeeToDelete(emp);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    setEmployees((prev) => prev.filter((e) => e.id !== employeeToDelete.id));
    setDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  const filteredEmployees = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filterGender || e.gender === filterGender) &&
      (!filterStatus || String(e.active) === filterStatus)
  );

  const paginatedEmployees = filteredEmployees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef2f7 0%, #e3eaf5 100%)",
        p: { xs: 2, md: 4 },
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 3,
          mb: 4,
          display: "flex",
          alignItems: "center",
          borderRadius: 3,
          justifyContent: "space-between",
          background: "linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%)",
          color: "#fff",
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Dashboard Overview
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Welcome to employee management portal.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            height: 45,
            px: 3,
            borderRadius: 3,
            fontWeight: 600,
            textTransform: "none",
            background: "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)",
            boxShadow: "0 6px 15px rgba(239, 68, 68, 0.35)",
            "&:hover": {
              background: "linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)",
              boxShadow: "0 8px 20px rgba(185, 28, 28, 0.45)",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
        >
          Logout
        </Button>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 4,
          background:
            "linear-gradient(180deg, rgba(248,250,252,1) 0%, rgba(241,245,249,1) 100%)",
          border: "1px solid #e5e7eb",
        }}
      >
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} lg={9}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <StatCard
                  title="Total Employees"
                  value={totalEmployees}
                  color="#3b82f6"
                  icon={<PeopleIcon />}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <StatCard
                  title="Active Employees"
                  value={activeEmployees}
                  color="#22c55e"
                  icon={<PersonIcon />}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <StatCard
                  title="Inactive Employees"
                  value={inactiveEmployees}
                  color="#f97316"
                  icon={<PersonOffIcon />}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              display: "flex",
              justifyContent: { xs: "stretch", lg: "flex-end" },
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                setSelectedEmployee(null);
                setOpenForm(true);
              }}
              sx={{
                height: 45,
                px: 4,
                borderRadius: 3,
                fontWeight: 600,
                whiteSpace: "nowrap",

                background: "linear-gradient(90deg, #2563eb 0%, #1e3a8a 100%)",
                boxShadow: "0 8px 20px rgba(37, 99, 235, 0.35)",

                "&:hover": {
                  background:
                    "linear-gradient(90deg, #1e40af 0%, #1e3a8a 100%)",
                },
              }}
            >
              + Add Employee
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: 3,
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          alignItems="stretch"
        >
          <TextField
            label="Search by Name"
            size="small"
            fullWidth
            sx={{ minWidth: 300 }}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            size="small"
            value={filterGender}
            sx={{ minWidth: 200 }}
            displayEmpty
            onChange={(e) => setFilterGender(e.target.value)}
          >
            <MenuItem value="">All Genders</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>

          <Select
            size="small"
            value={filterStatus}
            sx={{ minWidth: 200 }}
            displayEmpty
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
          </Select>

          <Button
            variant="contained"
            size="large"
            startIcon={<PrintIcon />}
            sx={{
              borderRadius: 3,
              background: "linear-gradient(90deg, #2563eb 0%, #1e3a8a 100%)",
            }}
            onClick={() => window.print()}
            slotProps={{
              backdrop: {
                sx: {
                  backdropFilter: "blur(6px)",
                  backgroundColor: "rgba(0, 0, 0, 0.25)",
                },
              },
            }}
          >
            Print
          </Button>
        </Stack>
      </Paper>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          boxShadow: "0 12px 35px rgba(0,0,0,0.07)",
          mb: 3,
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(to right, #245587ff, #3277bcff)",
                "& th": {
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#16478bff",
                  borderBottom: "2px solid #e5e7eb",
                  py: 1.75,
                  whiteSpace: "nowrap",
                },
              }}
            >
              {[
                "S.No",
                "Profile",
                "Full Name",
                "Gender",
                "DOB",
                "State",
                "Status",
                "Actions",
              ].map((h) => (
                <TableCell key={h} align="center">
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    No employees found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedEmployees.map((e, index) => (
                <TableRow
                  key={e.id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f8fafc",
                    },
                    "& td": {
                      borderBottom: "1px solid #f1f5f9",
                      py: 1.5,
                      whiteSpace: "nowrap",
                    },
                  }}
                >
                  <TableCell align="center">
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell>
                    <Avatar
                      src={e.image}
                      sx={{
                        width: 40,
                        height: 40,
                        mx: "auto",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{e.name}</TableCell>
                  <TableCell align="center">{e.gender}</TableCell>
                  <TableCell align="center">
                    {e.dob ? dayjs(e.dob).format("DD MMM YYYY") : "-"}
                  </TableCell>

                  <TableCell align="center">{e.state}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.75,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 999,
                        fontSize: 13,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        backgroundColor: e.active ? "#dcfce7" : "#fee2e2",
                        color: e.active ? "#166534" : "#991b1b",
                      }}
                    >
                      {e.active ? (
                        <PersonIcon fontSize="small" />
                      ) : (
                        <PersonOffIcon fontSize="small" />
                      )}
                      {e.active ? "Active" : "Inactive"}
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setSelectedEmployee(e);
                        setOpenForm(true);
                      }}
                      sx={{
                        mr: 1,
                        "&:hover": { backgroundColor: "rgba(37,99,235,0.1)" },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => confirmDelete(e)}
                      sx={{
                        "&:hover": { backgroundColor: "rgba(239,68,68,0.1)" },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Paper>
          <TablePagination
            component="div"
            count={filteredEmployees.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value, 5);
              setPage(0);
            }}
          />
        </Paper>
      </TableContainer>

      <EmployeeForm
        open={openForm}
        employee={selectedEmployee}
        onSave={handleSaveEmployee}
        onCancel={() => setOpenForm(false)}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        employee={employeeToDelete}
        onClose={() => {
          setDeleteDialogOpen(false);
          setEmployeeToDelete(null);
        }}
        onConfirm={handleDelete}
      />
    </Box>
  );
}
