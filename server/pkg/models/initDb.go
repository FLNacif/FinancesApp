package models

import (
	"server/pkg/config"
	"github.com/jinzhu/gorm"
)

var db *gorm.DB

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&User{}, &StockOperation{})
}
