import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteConfirmDialog({
  open,
  employee,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      onClose={onClose}
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
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(15, 23, 42, 0.45)",
          },
        },
      }}
    >
      {/* ================= HEADER ================= */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          fontWeight: 700,
          px: 3,
          py: 2,
          background: "linear-gradient(90deg, #fff1f2, #fee2e2)",
          borderBottom: "1px solid #fecaca",
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
            boxShadow: "0 4px 10px rgba(239,68,68,0.25)",
          }}
        >
          <DeleteIcon />
        </Box>
        Confirm Deletion
      </DialogTitle>

      {/* ================= BODY ================= */}
      <DialogContent sx={{ px: 3, py: 3 }}>
        <Typography variant="body1">
          Are you sure you want to delete the following employee?
        </Typography>

        <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 1.5 }}>
          {employee?.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
          This action is permanent and cannot be undone.
        </Typography>
      </DialogContent>

      <Divider />

      {/* ================= ACTIONS ================= */}
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          gap: 1.5,
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={onClose}
          sx={{
            borderRadius: 3,
            py: 1.25,
            fontWeight: 600,
            borderColor: "#cbd5f5",
            color: "#334155",
            "&:hover": {
              backgroundColor: "#f8fafc",
              borderColor: "#94a3b8",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{
            borderRadius: 3,
            py: 1.25,
            fontWeight: 700,
            background: "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)",
            boxShadow: "0 8px 18px rgba(239,68,68,0.35)",
            "&:hover": {
              background: "linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)",
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
