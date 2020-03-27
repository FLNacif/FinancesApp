package models

import (
	"time"

	"github.com/flnacif/financeapp/pkg/models/dto"
)

type StockOperation struct {
	Id       int64
	Stock    string `gorm:"NOT NULL"`
	Weight   uint
	Shares   uint      `gorm:"NOT NULL"`
	AvgPrice float64   `gorm:"NOT NULL"`
	Date     time.Time `gorm:"NOT NULL"`
	UserId   string    `gorm:"NOT NULL"`
}

func (so *StockOperation) TableName() string {
	return "finance_stock_operations"
}

func (so *StockOperation) CreateStockOperation() *StockOperation {
	db.NewRecord(so)
	db.Create(&so)
	return so
}

func GetAllStockOperations(userId string) []StockOperation {
	var StockOperations []StockOperation
	db.Where("user_id = ?", userId).Find(&StockOperations)
	return StockOperations
}

func GetPositions(userId string) []dto.StockPositionDto {
	position := []dto.StockPositionDto{}
	//position, err := db.Raw("SELECT * FROM stock_operations").Rows()
	return position
}
