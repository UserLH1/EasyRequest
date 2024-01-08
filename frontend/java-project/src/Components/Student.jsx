import React, { useState } from 'react';
import { Button, Container, Paper, TextField, Autocomplete } from "@mui/material";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Student() {
    const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [faculty, setFaculty] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [yearOfStudy, setYearOfStudy] = useState("");
    const [recipient, setRecipient] = useState("");
    const [purpose, setPurpose] = useState("");
    const [requestDate, setRequestDate] = useState("");
    // Presupunem că avem deja o listă de facultăți și specializări
    const faculties = ["Facultatea de Informatică", "Facultatea de Matematică", "Facultatea de Biologie"];
    const specializations = {
        "Facultatea de Informatică": ["Informatică Aplicată", "Inteligenta Artificială"],
        "Facultatea de Matematică": ["Matematică Pura", "Matematică Aplicată"],
        "Facultatea de Biologie": ["Biologie Moleculară", "Ecologie"],
    };

    // Restul codului a fost omis pentru claritate
    // ...

    return (
        <Container>
            <ToastContainer />
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}>
                    <u>Solicitari studenti</u>
                </h1>
                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        "& > :not(style)": { marginBottom: "20px" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="First Name"
                        variant="outlined"
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Student ID"
                        variant="outlined"
                        onChange={(e) => setStudentId(e.target.value)}
                        fullWidth
                    />
                    <Autocomplete
                        options={faculties}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => <TextField {...params} label="Faculty" />}
                        onChange={(event, value) => setFaculty(value)}
                        fullWidth
                    />
                    {faculty && (
                        <TextField
                            select
                            label="Specialization"
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                            SelectProps={{
                                native: true,
                            }}
                            fullWidth
                        >
                            {specializations[faculty]?.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                    )}
                    <TextField
                        label="Year of Study"
                        variant="outlined"
                        onChange={(e) => setYearOfStudy(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Recipient"
                        variant="outlined"
                        onChange={(e) => setRecipient(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Purpose"
                        variant="outlined"
                        onChange={(e) => setPurpose(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Request Date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setRequestDate(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" >
                        Submit
                    </Button>
                </Box>
            </Paper>
        </Container>);}
