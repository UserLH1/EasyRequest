import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import universities from '../universities.json';

export default function FormularDetalii() {
  const [facultate, setFacultate] = useState('');
  const [specializare, setSpecializare] = useState('');
  const [anulDeStudiu, setAnulDeStudiu] = useState('');
  const [numarMatricol, setNumarMatricol] = useState('');
  const [facultati, setFacultati] = useState([]);
  const [specializari, setSpecializari] = useState([]);

  useEffect(() => {
    // Presupunând că universitățile sunt într-un format { 'Nume Facultate': ['Specializare1', 'Specializare2']}
    setFacultati(Object.keys(universities['Universitatea de Vest din Timisoara']));
  }, []);

  useEffect(() => {
    // Actualizați specializările când se schimbă facultatea
    if (facultate) {
      setSpecializari(universities['Universitatea de Vest din Timisoara'][facultate]);
    }
  }, [facultate]);

  // Restul logicilor formularului

  return (
    <form noValidate autoComplete="off">
      <Autocomplete
        options={facultati}
        getOptionLabel={(option) => option}
        renderInput={(params) => <TextField {...params} label="Alegeți Facultatea" />}
        value={facultate}
        onChange={(event, newValue) => {
          setFacultate(newValue);
          setSpecializare(''); // Resetați specializarea atunci când se schimbă facultatea
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Specializarea"
        value={specializare}
        onChange={(e) => setSpecializare(e.target.value)}
        fullWidth
        margin="normal"
        disabled={!facultate} // Dezactivați câmpul dacă nu este selectată nicio facultate
      />
      <TextField
        label="Anul de studiu"
        value={anulDeStudiu}
        onChange={(e) => setAnulDeStudiu(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Număr Matricol"
        value={numarMatricol}
        onChange={(e) => setNumarMatricol(e.target.value)}
        fullWidth
        margin="normal"
      />
      {/* Restul câmpurilor și butoanele formularului */}
    </form>
  );
}
