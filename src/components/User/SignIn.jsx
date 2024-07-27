import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../features/authSlice";
import { theme } from "../../theme";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets"; // Import ikony kota
