package dto

import (
	"time"
)

type StockOperationDto struct {
	Id          int64
	StockTicket string
	Shares      uint
	AvgPrice    float64
	Date        time.Time
}
