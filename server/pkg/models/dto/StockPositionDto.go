package dto

import (

)

type StockPositionDto struct {
	code string
	price float64
	weight int
	haveShares int
	avgPrice float64
	invested float64
	haveMoney float64
	action string
	idealPct float64
	idealMoney float64
	missingMoney float64
	missingShares int
	variation float64
}