package controllers

import (
	"context"
	"encoding/json"
	"net/http"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/flnacif/financeapp/pkg/models"
	"github.com/flnacif/financeapp/pkg/models/dto"
	"github.com/flnacif/financeapp/pkg/utils"
)

var NewOperation models.StockOperation

func getUserId(ctx context.Context) string {
	return ctx.Value("userContextClaims").(jwt.MapClaims)["sub"].(string)
}

func CreateOperation(w http.ResponseWriter, r *http.Request) {
	userId := getUserId(r.Context())
	stockOperationDto := &dto.StockOperationDto{}
	stockOperation := &models.StockOperation{}
	utils.ParseBody(r, stockOperationDto)
	stockOperation.Fill(stockOperationDto)
	stockOperation.UserStock = models.GetUserStock(userId, stockOperationDto.StockTicket)
	b := stockOperation.CreateStockOperation()
	res, _ := json.Marshal(b)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetOperations(w http.ResponseWriter, r *http.Request) {
	userId := getUserId(r.Context())
	newOperations := models.GetAllStockOperations(userId)
	res, _ := json.Marshal(newOperations)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetPositions(w http.ResponseWriter, r *http.Request) {
	userId := getUserId(r.Context())
	positionUser := models.GetPositions(userId)
	res, _ := json.Marshal(positionUser)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
