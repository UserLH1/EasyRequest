package uvt.form.project.service;

import org.springframework.stereotype.Service;
import uvt.form.project.model.Student;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

@Service
public class GenerareCerereBursa {

    public void generareSiSalvareCerereDeBursa(Student student) {
        String cerereDeBursaTemplate = "CERERE DE BURSĂ\n" +
                "Nume: " + student.getNume() + "\n" +
                "Prenume: " + student.getPrenume() + "\n" +
                "Telefon: " + student.getTelefon() + "\n" +
                "Anul de Studiu: " + student.getAnulDeStudiu() + "\n" +
                "Număr Matricol: " + student.getNumarMatricol() + "\n";

        String numeFisier = "cerere_de_bursa.txt";
        String caleFisier = System.getProperty("user.dir") + "/" + numeFisier;

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(caleFisier))) {
            writer.write(cerereDeBursaTemplate);
            System.out.println("Șablonul a fost salvat cu succes în fișierul: " + caleFisier);
        } catch (IOException e) {
            e.printStackTrace();
            System.err.println("Eroare la salvarea șablonului în fișier.");
        }
    }
}
