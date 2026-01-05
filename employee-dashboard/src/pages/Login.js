// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Avatar,
// } from "@mui/material";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const validate = () => {
//     const newErrors = {};
//     if (!username.trim()) newErrors.username = "Username is required";
//     if (!password.trim()) newErrors.password = "Password is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = () => {
//     if (!validate()) return;

//     const newErrors = {};

//     if (username !== "admin") {
//       newErrors.username = "Invalid username";
//     }

//     if (password !== "admin123") {
//       newErrors.password = "Invalid password";
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     if (username === "admin" && password === "admin123") {
//       localStorage.setItem("auth", "true");
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", display: "flex" }}>
//       <Box
//         sx={{
//           width: { xs: "0%", md: "60%" },
//           backgroundImage: "url('/image.png')",
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           display: { xs: "none", md: "block" },
//         }}
//       />

//       <Box
//         sx={{
//           width: { xs: "100%", md: "40%" },
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background:
//             "linear-gradient(135deg, #032986 20%, #032986 60%, #2563eb 100%)",
//         }}
//       >
//         <Paper
//           elevation={0}
//           sx={{
//             p: 4,
//             width: 380,
//             borderRadius: 4,
//             boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
//             backdropFilter: "blur(10px)",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               flexDirection: "column",
//               mb: 4,
//             }}
//           >
//             <Avatar
//               src="/global.jpg"
//               alt="logo"
//               style={{
//                 width: 56,
//                 height: 56,
//                 mb: 1.5,
//                 boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
//               }}
//             />

//             <Typography variant="h5" fontWeight={700}>
//               Employee Login
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Sign in to continue
//             </Typography>
//           </Box>

//           <TextField
//             label="Username"
//             fullWidth
//             margin="normal"
//             value={username}
//             error={!!errors.username}
//             helperText={errors.username}
//             onChange={(e) => {
//               setUsername(e.target.value);
//               setErrors((prev) => ({ ...prev, username: "" }));
//             }}
//           />

//           <TextField
//             label="Password"
//             type={"password"}
//             fullWidth
//             margin="normal"
//             value={password}
//             error={!!errors.password}
//             helperText={errors.password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//               setErrors((prev) => ({ ...prev, password: "" }));
//             }}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             size="large"
//             sx={{
//               mt: 3,
//               py: 1.2,
//               borderRadius: 3,
//               fontWeight: 600,
//               background: "linear-gradient(90deg, #2563eb 0%, #1e3a8a 100%)",
//               boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
//             }}
//             onClick={handleLogin}
//           >
//             Login
//           </Button>
//         </Paper>
//       </Box>
//     </Box>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    const newErrors = {};
    if (username !== "admin") newErrors.username = "Invalid username";
    if (password !== "admin123") newErrors.password = "Invalid password";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem("auth", "true");
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundImage: `
          linear-gradient(
            rgba(2, 6, 23, 0.75),
            rgba(2, 6, 23, 0.75)
          ),
          url('/image.png')
        `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 380,
          p: 4,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.96)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            src="/global.jpg"
            alt="logo"
            sx={{
              width: 64,
              height: 64,
              mb: 1.5,
              boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
            }}
          />

          <Typography variant="h5" fontWeight={700}>
            Employee Login
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to continue
          </Typography>
        </Box>

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          error={!!errors.username}
          helperText={errors.username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrors((prev) => ({ ...prev, username: "" }));
          }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          error={!!errors.password}
          helperText={errors.password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            mt: 3,
            py: 1.2,
            borderRadius: 3,
            fontWeight: 600,
            background: "linear-gradient(90deg, #2563eb 0%, #1e3a8a 100%)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
