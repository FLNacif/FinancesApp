package models

type UserStockWallet struct {
	Id          int
	WalletId    int `gorm:"NOT NULL INDEX;UNIQUE_INDEX:idx_unique_stock_wallet"`
	Wallet      *Wallet
	UserStockId int `gorm:"NOT NULL INDEX;UNIQUE_INDEX:idx_unique_stock_wallet"`
	UserStock   *UserStock
}

func (so *UserStockWallet) TableName() string {
	return "finance_user_stock_wallet"
}
