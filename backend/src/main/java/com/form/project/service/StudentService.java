package com.form.project.service;

import com.form.project.model.Student;

import java.util.List;

public interface StudentService
{
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
}
