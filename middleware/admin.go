package middleware

import (
	"encoding/json"
	"net/http"
	"hr-management-system/models"
)

func AdminOnly(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user from context (you'll need to implement authentication middleware)
		user, ok := r.Context().Value("user").(models.User)
		if !ok {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(map[string]string{"error": "Unauthorized"})
			return
		}

		if user.Role != "admin" {
			w.WriteHeader(http.StatusForbidden)
			json.NewEncoder(w).Encode(map[string]string{"error": "Admin access required"})
			return
		}

		next.ServeHTTP(w, r)
	}
}
