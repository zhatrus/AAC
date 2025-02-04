package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"hr-management-system/database"
	"hr-management-system/handlers"
	"hr-management-system/middleware"
)

func main() {
	// Підключення до бази даних
	database.ConnectDatabase()

	r := mux.NewRouter()

	// Роути для управління персоналом
	r.HandleFunc("/api/employees", middleware.AuthMiddleware(handlers.GetEmployees)).Methods("GET")
	r.HandleFunc("/api/employees", middleware.AuthMiddleware(handlers.CreateEmployee)).Methods("POST")
	r.HandleFunc("/api/employees/{id}", middleware.AuthMiddleware(handlers.GetEmployee)).Methods("GET")
	r.HandleFunc("/api/employees/{id}", middleware.AuthMiddleware(handlers.UpdateEmployee)).Methods("PUT")
	r.HandleFunc("/api/employees/{id}", middleware.AuthMiddleware(handlers.DeleteEmployee)).Methods("DELETE")

	// Тут будуть інші роути
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/access-requests", middleware.AuthMiddleware(handlers.CreateAccessRequest)).Methods("POST")
	api.HandleFunc("/access-requests", middleware.AuthMiddleware(middleware.AdminOnly(handlers.GetAccessRequests))).Methods("GET")
	api.HandleFunc("/access-requests/{id}", middleware.AuthMiddleware(middleware.AdminOnly(handlers.UpdateAccessRequestStatus))).Methods("PATCH")

	log.Printf("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
