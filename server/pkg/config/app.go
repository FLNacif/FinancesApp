package config

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var (
	db * gorm.DB
)


func Connect() {
	d, err := gorm.Open("postgres", "host=127.0.0.1 port=5432 user=admin dbname=financeapp password=admin sslmode=disable")
	if err != nil{
		panic(err)
	}
	db = d
}

func GetDB() *gorm.DB {
	return db
}