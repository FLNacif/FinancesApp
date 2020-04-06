package models

type UserStock struct {
	Id               int
	UserId           string `gorm:"NOT NULL INDEX;UNIQUE_INDEX:idx_unique_user_stock"`
	Stock            *Stock
	StockId          int                `gorm:"NOT NULL INDEX;UNIQUE_INDEX:idx_unique_user_stock"`
	UserStockWallets *[]UserStockWallet `gorm:"foreignkey:UserStockId;"`
	Weight           uint
	StockOperations  *[]StockOperation `gorm:"foreignkey:UserStockId;"`
}

func (so *UserStock) TableName() string {
	return "finance_user_stock"
}

func GetUserStock(userId string, stockTicket string) *UserStock {
	var stock Stock
	db.Where(Stock{StockTicket: stockTicket}).First(&stock)
	var userStock *UserStock
	db.Where(UserStock{UserId: userId, StockId: stock.Id}).FirstOrCreate(userStock)
	return userStock
}
