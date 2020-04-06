package models

import (
	"time"
)

type StockPrice struct {
	Id        int
	Stock     Stock
	StockId   int       `gorm:"NOT NULL; INDEX"`
	PriceDate time.Time `gorm:"NOT NULL; INDEX"`
	Price     float64   `gorm:"NOT NULL"`
}

func (so *StockPrice) TableName() string {
	return "finance_stock_price"
}
