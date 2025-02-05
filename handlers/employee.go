package handlers

import (
	"encoding/json"
	"net/http"
	"github.com/gorilla/mux"
)

type Employee struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	Position   string `json:"position"`
	Department string `json:"department"`
}

// Mock data
var employees = []Employee{
	{ID: 1, Name: "Іван Петров", Position: "Розробник", Department: "IT"},
	{ID: 2, Name: "Марія Іванова", Position: "Менеджер", Department: "HR"},
}

func GetEmployees(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(employees)
}

func CreateEmployee(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var employee Employee
	if err := json.NewDecoder(r.Body).Decode(&employee); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	employee.ID = len(employees) + 1
	employees = append(employees, employee)
	json.NewEncoder(w).Encode(employee)
}

func GetEmployee(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, employee := range employees {
		if string(employee.ID) == params["id"] {
			json.NewEncoder(w).Encode(employee)
			return
		}
	}
	http.Error(w, "Працівника не знайдено", http.StatusNotFound)
}

func UpdateEmployee(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for i, employee := range employees {
		if string(employee.ID) == params["id"] {
			var updatedEmployee Employee
			if err := json.NewDecoder(r.Body).Decode(&updatedEmployee); err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}
			updatedEmployee.ID = employee.ID
			employees[i] = updatedEmployee
			json.NewEncoder(w).Encode(updatedEmployee)
			return
		}
	}
	http.Error(w, "Працівника не знайдено", http.StatusNotFound)
}

func DeleteEmployee(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for i, employee := range employees {
		if string(employee.ID) == params["id"] {
			employees = append(employees[:i], employees[i+1:]...)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}
	http.Error(w, "Працівника не знайдено", http.StatusNotFound)
}
