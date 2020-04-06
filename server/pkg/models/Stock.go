package models

type Stock struct {
	Id          int
	StockTicket string `gorm:"NOT NULL; INDEX; UNIQUE"`
	CNPJ        string
	Name        string
	TpMercado   int
	StockPrices *[]StockPrice `gorm:"foreignkey:StockId;"`
	UserStocks  *[]UserStock  `gorm:"foreignkey:StockId;"`
}

func (so *Stock) TableName() string {
	return "finance_stock"
}

func GetStocksByName(name string) []Stock {
	var stocks []Stock
	name = "%" + name + "%"
	db.Where("LOWER(stock_ticket) like LOWER(?) or LOWER(name) like LOWER(?)", name, name).Find(&stocks)
	return stocks
}
