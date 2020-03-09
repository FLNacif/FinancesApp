package models

import (
	"time"
)

type StockOperation struct {
	Id int64
	Stock string
	Weight uint
	Shares uint
	AvgPrice float64
	Date time.Time
	UserId int64 `gorm:"NOT NULL"`
}

func (so *StockOperation) CreateStockOperation() *StockOperation {
	db.NewRecord(so)
	db.Create(&so)
	return so
}

func  GetAllStockOperations() []StockOperation {
	var StockOperations []StockOperation
	db.Find(&StockOperations)
	return StockOperations
}