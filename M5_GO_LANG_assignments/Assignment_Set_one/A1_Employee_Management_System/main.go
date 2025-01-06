package main

import (
	"errors"
	"fmt"
)

type Employee struct {
	ID         int
	Name       string
	Age        int
	Department string
}

var employees []Employee

func addEmployee(id int, name string, age int, department string) error {
	for _, emp := range employees {
		if emp.ID == id {
			return errors.New("ID must be unique")
		}
	}
	if age <= 18 {
		return errors.New("Age must be greater than 18")
	}
	newEmployee := Employee{
		ID:         id,
		Name:       name,
		Age:        age,
		Department: department,
	}
	employees = append(employees, newEmployee)
	return nil
}
func searchEmployee(id int, name string) (*Employee, error) {
	for _, emp := range employees {
		if emp.ID == id || emp.Name == name {
			return &emp, nil
		}
	}
	return nil, errors.New("Employee not found")
}
func listEmployeesByDepartment(department string) []Employee {
	var deptEmployees []Employee
	for _, emp := range employees {
		if emp.Department == department {
			deptEmployees = append(deptEmployees, emp)
		}
	}
	return deptEmployees
}

const (
	HR = "HR"
	IT = "IT"
)

func countEmployees(department string) int {
	count := 0
	for _, emp := range employees {
		if emp.Department == department {
			count++
		}
	}
	return count
}
func main() {
	// Example Usage
	err := addEmployee(1, "bawana", 33, IT)
	if err != nil {
		fmt.Println(err)
	}
	err = addEmployee(2, "lavanya", 30, HR)
	if err != nil {
		fmt.Println(err)
	}
	emp, err := searchEmployee(1, "")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(emp)
	}
	itEmployees := listEmployeesByDepartment(IT)
	fmt.Println(itEmployees)
	hrCount := countEmployees(HR)
	fmt.Println(hrCount)
}
