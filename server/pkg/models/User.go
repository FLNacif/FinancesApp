package models

import (
	"time"
)

type User struct {
	Id int64
	Name string
	Email string
	Login string
	Password string
	CreatedAt time.Time
	StockOperations []StockOperation `gorm:"foreignkey:UserId;association_autoupdate:false;association_autocreate:false"`
}

func (u *User) CreateUser() *User {
	db.NewRecord(u)
	db.Create(&u)
	return u
}

func GetUserByLogin(login string) *User {
	var User *User
	db.Where("login = ?",login).First(&User)
	return User
}