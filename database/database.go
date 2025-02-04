package database

import (
	"log"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// TODO: Implement database connection
	log.Println("Database connection initialized")
}
