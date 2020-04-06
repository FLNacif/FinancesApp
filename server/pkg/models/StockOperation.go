package models

import (
	"time"

	"github.com/flnacif/financeapp/pkg/models/dto"
)

type StockOperation struct {
	Id          int64
	UserStock   *UserStock
	UserStockId int       `gorm:"NOT NULL; INDEX"`
	Shares      uint      `gorm:"NOT NULL"`
	AvgPrice    float64   `gorm:"NOT NULL"`
	Date        time.Time `gorm:"NOT NULL"`
}

func (so *StockOperation) TableName() string {
	return "finance_stock_operations"
}

func (so *StockOperation) CreateStockOperation() *StockOperation {
	db.NewRecord(so)
	db.Create(&so)
	return so
}

func (so *StockOperation) Fill(soDto *dto.StockOperationDto) {
	so.AvgPrice = soDto.AvgPrice
	so.Date = soDto.Date
	so.Shares = soDto.Shares
}

func GetAllStockOperations(userId string) []StockOperation {
	var StockOperations []StockOperation
	db.Where("user_id = ?", userId).Find(&StockOperations)
	return StockOperations
}

func GetPositions(userId string) []dto.StockPositionDto {
	positions := []dto.StockPositionDto{}
	db.Raw(`
	WITH base as (SELECT
		SUM(shares) as have_shares
		,SUM(shares * avg_price)/SUM(shares) as avg_price
		,SUM(shares * avg_price) as invested
		,(SELECT stock_ticket FROM "finance_stock" WHERE id = stock_id) as code
		,(SELECT weight FROM "finance_user_stock_weight" as sw WHERE user_id = ? and sw.stock_id = stock_id)
		,(SELECT price as price FROM "finance_stock_price" as sp WHERE sp.stock_id = stock_id ORDER BY price_date DESC LIMIT 1)
		,(SELECT price as price FROM "finance_stock_price" as sp WHERE sp.stock_id = stock_id ORDER BY price_date DESC LIMIT 1) * SUM(shares) as have_money
		FROM "finance_stock_operations"
		WHERE user_id = ?
		GROUP BY stock_id)
		SELECT 
		code
		, have_shares
		, avg_price
		, invested
		, weight
		, price
		, have_money
		, (have_money/SUM(have_money) OVER())*100 as have_pct
		, (price/avg_price)-1 as equity
		, (weight/SUM(weight) OVER())*100 as ideal_pct
		, (weight/SUM(weight) OVER())*(SUM(have_money) OVER()) as ideal_money
		, ((weight/SUM(weight) OVER())*(SUM(have_money) OVER()) - have_money) as missing_money
		, CAST(((weight/SUM(weight) OVER())*(SUM(have_money) OVER()) - have_money)/price AS INTEGER) as missing_shares
		FROM base
	`, userId, userId).Scan(&positions)

	return positions
}
