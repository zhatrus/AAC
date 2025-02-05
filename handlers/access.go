package handlers

import (
	"encoding/json"
	"net/http"
	"github.com/gorilla/mux"
)

type AccessRequest struct {
	ID        int    `json:"id"`
	Requestor string `json:"requestor"`
	Type      string `json:"type"`
	Status    string `json:"status"`
}

// Mock data
var accessRequests = []AccessRequest{
	{ID: 1, Requestor: "Іван Петров", Type: "VPN доступ", Status: "В очікуванні"},
	{ID: 2, Requestor: "Марія Іванова", Type: "Доступ до серверу", Status: "Схвалено"},
}

func CreateAccessRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var request AccessRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	request.ID = len(accessRequests) + 1
	request.Status = "Pending"
	accessRequests = append(accessRequests, request)
	json.NewEncoder(w).Encode(request)
}

func GetAccessRequests(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(accessRequests)
}

func UpdateAccessRequestStatus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var status struct {
		Status string `json:"status"`
	}
	if err := json.NewDecoder(r.Body).Decode(&status); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	
	for i, request := range accessRequests {
		if string(request.ID) == params["id"] {
			accessRequests[i].Status = status.Status
			json.NewEncoder(w).Encode(accessRequests[i])
			return
		}
	}
	http.Error(w, "Запит на доступ не знайдено", http.StatusNotFound)
}
