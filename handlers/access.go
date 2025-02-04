package handlers

import (
	"net/http"
)

func CreateAccessRequest(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("CreateAccessRequest handler"))
}

func GetAccessRequests(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("GetAccessRequests handler"))
}

func UpdateAccessRequestStatus(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("UpdateAccessRequestStatus handler"))
}
