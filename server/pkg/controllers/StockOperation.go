package controllers

import (
	"context"
	"encoding/json"
	"net/http"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/flnacif/financeapp/pkg/models"
	"github.com/flnacif/financeapp/pkg/utils"
)

var NewOperation models.StockOperation

func getUserId(ctx context.Context) string {
	return ctx.Value("userContextClaims").(jwt.MapClaims)["sub"].(string)
}

func CreateOperation(w http.ResponseWriter, r *http.Request) {
	userId := getUserId(r.Context())
	stockOperation := &models.StockOperation{}
	utils.ParseBody(r, stockOperation)
	stockOperation.UserId = userId
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
	newOperations := models.GetPositions(userId)
	res, _ := json.Marshal(newOperations)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
