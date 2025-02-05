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

	// Apply CORS middleware to all routes
	r.Use(middleware.CORSMiddleware)

	// API Routes
	api := r.PathPrefix("/api").Subrouter()

	// Роути для управління персоналом
	api.HandleFunc("/employees", middleware.AuthMiddleware(handlers.GetEmployees)).Methods("GET", "OPTIONS")
	api.HandleFunc("/employees", middleware.AuthMiddleware(handlers.CreateEmployee)).Methods("POST", "OPTIONS")
	api.HandleFunc("/employees/{id}", middleware.AuthMiddleware(handlers.GetEmployee)).Methods("GET", "OPTIONS")
	api.HandleFunc("/employees/{id}", middleware.AuthMiddleware(handlers.UpdateEmployee)).Methods("PUT", "OPTIONS")
	api.HandleFunc("/employees/{id}", middleware.AuthMiddleware(handlers.DeleteEmployee)).Methods("DELETE", "OPTIONS")

	// Роути для проектів
	api.HandleFunc("/projects", middleware.AuthMiddleware(handlers.GetProjects)).Methods("GET", "OPTIONS")
	api.HandleFunc("/projects", middleware.AuthMiddleware(handlers.CreateProject)).Methods("POST", "OPTIONS")
	api.HandleFunc("/projects/{id}", middleware.AuthMiddleware(handlers.GetProject)).Methods("GET", "OPTIONS")
	api.HandleFunc("/projects/{id}", middleware.AuthMiddleware(handlers.UpdateProject)).Methods("PUT", "OPTIONS")
	api.HandleFunc("/projects/{id}", middleware.AuthMiddleware(handlers.DeleteProject)).Methods("DELETE", "OPTIONS")

	// Роути для доступів
	api.HandleFunc("/access", middleware.AuthMiddleware(handlers.GetAccess)).Methods("GET", "OPTIONS")
	api.HandleFunc("/access", middleware.AuthMiddleware(handlers.CreateAccess)).Methods("POST", "OPTIONS")
	api.HandleFunc("/access/{id}", middleware.AuthMiddleware(handlers.UpdateAccess)).Methods("PUT", "OPTIONS")
	api.HandleFunc("/access/{id}", middleware.AuthMiddleware(handlers.DeleteAccess)).Methods("DELETE", "OPTIONS")

	// Роути для запитів на доступ
	api.HandleFunc("/access-requests", middleware.AuthMiddleware(handlers.GetAccessRequests)).Methods("GET", "OPTIONS")
	api.HandleFunc("/access-requests", middleware.AuthMiddleware(handlers.CreateAccessRequest)).Methods("POST", "OPTIONS")
	api.HandleFunc("/access-requests/{id}", middleware.AuthMiddleware(handlers.UpdateAccessRequest)).Methods("PUT", "OPTIONS")

	// Роути для персональних запитів на доступ
	api.HandleFunc("/my-access-requests", middleware.AuthMiddleware(handlers.GetMyAccessRequests)).Methods("GET", "OPTIONS")

	// Роути для налаштувань
	api.HandleFunc("/settings", middleware.AuthMiddleware(handlers.GetSettings)).Methods("GET", "OPTIONS")
	api.HandleFunc("/settings", middleware.AuthMiddleware(handlers.UpdateSettings)).Methods("PUT", "OPTIONS")

	// Access request routes
	api.HandleFunc("/access-requests", middleware.AuthMiddleware(middleware.AdminOnly(handlers.GetAccessRequests))).Methods("GET", "OPTIONS")
	api.HandleFunc("/access-requests/{id}", middleware.AuthMiddleware(middleware.AdminOnly(handlers.UpdateAccessRequestStatus))).Methods("PATCH", "OPTIONS")

	// Serve static files
	fs := http.FileServer(http.Dir("public"))
	r.PathPrefix("/js/").Handler(http.StripPrefix("/js/", http.FileServer(http.Dir("public/js"))))
	r.PathPrefix("/css/").Handler(http.StripPrefix("/css/", http.FileServer(http.Dir("public/css"))))
	r.PathPrefix("/").Handler(fs)

	log.Printf("Сервер запущено на порту :3001")
	log.Fatal(http.ListenAndServe(":3001", r))
}
