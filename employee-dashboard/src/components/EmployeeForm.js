import { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  Avatar,
  Stack,
  Grid,
  Switch,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const DEFAULT_IMAGE = "/global.jpg";

const initialForm = {
  id: null,
  name: "",
  gender: "",
  dob: "",
  state: "",
  active: true,
  image: DEFAULT_IMAGE,
};

export default function EmployeeForm({ open, employee, onSave, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (employee) {
      setForm(employee);
    } else {
      setForm(initialForm);
    }
  }, [employee, open]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.dob) newErrors.dob = "Date of birth is required";
    if (!form.state) newErrors.state = "State is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () =>
      setForm((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (hasSubmitted) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    if (!validate()) return;
    onSave(form);
    handleClose();
  };

  const handleClose = () => {
    setForm(initialForm);
    setErrors({});
    setHasSubmitted(false);
    onCancel();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
          },
        },
        backdrop: {
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(15, 23, 42, 0.4)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          px: 4,
          py: 3,
          fontWeight: 700,
          background: "linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%)",
          color: "#fff",
        }}
      >
        {form.id ? "Edit Employee" : "Add New Employee"}
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          backgroundColor: "#f8fafc",
        }}
      >
        <Grid container spacing={4}>
          <Stack alignItems="center" spacing={1}>
            <Box position="relative">
              <Avatar
                src={form.image}
                sx={{
                  width: 150,
                  height: 150,
                  boxShadow: 3,
                }}
              />

              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  width: 42,
                  height: 42,
                  bgcolor: "primary.main",
                  color: "#fff",
                  borderRadius: "50%",
                  boxShadow: 3,
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                <PhotoCameraIcon fontSize="small" />

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />
              </IconButton>
            </Box>

            <Typography variant="caption" color="text.secondary">
              Recommended: 400 × 400
            </Typography>
          </Stack>

          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <TextField
                label="Full Name"
                fullWidth
                value={form.name}
                error={hasSubmitted && !!errors.name}
                helperText={hasSubmitted ? errors.name : ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />

              <Stack spacing={2}>
                <TextField
                  select
                  label="Gender"
                  fullWidth
                  value={form.gender}
                  error={hasSubmitted && !!errors.gender}
                  helperText={hasSubmitted ? errors.gender : ""}
                  onChange={(e) => handleChange("gender", e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={form.dob ? dayjs(form.dob) : null}
                    onChange={(newValue) =>
                      handleChange(
                        "dob",
                        newValue ? newValue.format("YYYY-MM-DD") : ""
                      )
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: hasSubmitted && !!errors.dob,
                        helperText: hasSubmitted ? errors.dob : "",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Stack>

              <TextField
                select
                label="State"
                fullWidth
                value={form.state}
                error={hasSubmitted && !!errors.state}
                helperText={hasSubmitted ? errors.state : ""}
                onChange={(e) => handleChange("state", e.target.value)}
              >
                <MenuItem value="Telangana">Telangana</MenuItem>
                <MenuItem value="Karnataka">Karnataka</MenuItem>
                <MenuItem value="Maharashtra">Maharashtra</MenuItem>
              </TextField>

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  backgroundColor: "#f1f5f9",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Box>
                  <Typography fontWeight={600}>Account Status</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enable or disable employee access
                  </Typography>
                </Box>

                <Switch
                  checked={form.active}
                  color="primary"
                  onChange={(e) =>
                    setForm({ ...form, active: e.target.checked })
                  }
                />
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          px: 4,
          py: 3,
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <Button
          variant="outlined"
          size="large"
          onClick={handleClose}
          sx={{
            px: 4,
            borderRadius: 3,
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          size="large"
          sx={{
            px: 4,
            fontWeight: 600,
            borderRadius: 3,
            background: "linear-gradient(90deg, #2563eb 0%, #1e3a8a 100%)",
          }}
          onClick={handleSubmit}
        >
          {form.id ? "Update Employee" : "Create Employee"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
