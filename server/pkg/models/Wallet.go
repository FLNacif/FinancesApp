package models

type Wallet struct {
	Id              int
	Name            string
	UserId          string             `gorm:"NOT NULL; INDEX"`
	UserStockWallet *[]UserStockWallet `gorm:"foreignkey:WalletId;"`
}

func (so *Wallet) TableName() string {
	return "finance_wallet"
}
