package models

import (
	"github.com/flnacif/financeapp/pkg/config"
	"github.com/jinzhu/gorm"
)

var db *gorm.DB

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&StockOperation{})
	db.AutoMigrate(&StockPrice{})
	db.AutoMigrate(&Wallet{})
	db.AutoMigrate(&UserStockWallet{})
	db.AutoMigrate(&UserStock{})
	db.AutoMigrate(&Stock{})
}
