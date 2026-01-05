import { Paper, Typography, Avatar, Box } from "@mui/material";

const StatCard = ({ title, value, color, icon }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        minWidth: 260,
        minHeight: 120,
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        transition: "all 0.3s ease",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 16px 35px rgba(0,0,0,0.08)",
        },
      }}
    >
      <Avatar
        sx={{
          bgcolor: `${color}20`,
          color: color,
          width: 56,
          height: 56,
          boxShadow: `0 6px 16px ${color}40`,
        }}
      >
        {icon}
      </Avatar>

      <Box>
        <Typography
          variant="subtitle2"
          sx={{ color: "text.secondary", fontWeight: 600 }}
        >
          {title}
        </Typography>

        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mt: 0.5, color: "#0f172a" }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatCard;
