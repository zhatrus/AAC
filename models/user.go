package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `gorm:"uniqueIndex;not null"`
	Password string `not null`
	Email    string `gorm:"uniqueIndex;not null"`
	Role     string `gorm:"default:user"`
}

