package handlers

import (
	"net/http"
)

func GetEmployees(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("GetEmployees handler"))
}

func CreateEmployee(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("CreateEmployee handler"))
}

func GetEmployee(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("GetEmployee handler"))
}

func UpdateEmployee(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("UpdateEmployee handler"))
}

func DeleteEmployee(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("DeleteEmployee handler"))
}
