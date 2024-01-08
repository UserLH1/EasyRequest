import React, { useState } from 'react';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from '@mui/material';

export default function FormularDatePersonale() {
  const [nume, setNume] = useState('');
  const [prenume, setPrenume] = useState('');
  const [telefon, setTelefon] = useState('');
  const [criteriuBursa, setCriteriuBursa] = useState('');

  // Funcția de manipulare a trimitere formularului
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aici veți gestiona trimiterea datelor formularului către server sau la altă componentă
    console.log({ nume, prenume, telefon, criteriuBursa });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" fullWidth margin="normal">
        <TextField label="Nume" value={nume} onChange={(e) => setNume(e.target.value)} fullWidth margin="normal" required />
        <TextField label="Prenume" value={prenume} onChange={(e) => setPrenume(e.target.value)} fullWidth margin="normal" required />
        <TextField label="Telefon (format +40 700 000 000)" value={telefon} onChange={(e) => setTelefon(e.target.value)} fullWidth margin="normal" required />
        
        <FormLabel component="legend">Solicitați bursă socială pe criteriul:</FormLabel>
        <RadioGroup
          aria-label="criteriuBursa"
          name="criteriuBursa"
          value={criteriuBursa}
          onChange={(e) => setCriteriuBursa(e.target.value)}
        >
          <FormControlLabel value="orfan" control={<Radio required />} label="Studenți orfani de unul sau ambii părinți" />
          <FormControlLabel value="monoparental" control={<Radio />} label="Studenți care provin din familii monoparentale" />
          <FormControlLabel value="casadeCopii" control={<Radio />} label="Studenți proveniți din casele de copii (centrele de plasament) sau plasament familial" />
          <FormControlLabel value="medical" control={<Radio />} label="Studenți menționați la art. 17 alin. (1) punctul b) (cazuri medicale)" />
          <FormControlLabel value="venitMinim" control={<Radio />} label="Studenți care provin din familii al căror venituri lunare nete pe membru de familie sunt mai mici..." />
          <FormControlLabel value="altCriteriu" control={<Radio />} label="Studenți care provin din familii al căror venituri lunare nete pe membru de familie sunt mai mici..." />
        </RadioGroup>

        <Button type="submit" variant="contained" color="primary">
          Trimite
        </Button>
      </FormControl>
    </form>
  );
}
