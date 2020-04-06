package dto

type StockPositionDto struct {
	Code          string
	Price         float64
	Weight        int
	HaveShares    int
	AvgPrice      float64
	Invested      float64
	HaveMoney     float64
	HavePct       float64
	Action        string
	IdealPct      float64
	IdealMoney    float64
	MissingMoney  float64
	MissingShares int
	Variation     float64
}
