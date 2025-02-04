package middleware

import (
	"context"
	"net/http"
	"hr-management-system/models"
)

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// TODO: Implement proper JWT token validation
		// This is a placeholder implementation
		user := models.User{
			Username: "admin",
			Role:     "admin",
		}

		ctx := context.WithValue(r.Context(), "user", user)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}
