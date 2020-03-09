package controllers

import (
	"encoding/json"
	"server/pkg/utils"
	"net/http"
	"server/pkg/models"
)

var NewOperation models.StockOperation

func CreateOperation(w http.ResponseWriter, r *http.Request) {
	stockOperation := &models.StockOperation{}
	utils.ParseBody(r, stockOperation)
	b:= stockOperation.CreateStockOperation()
	res,_ := json.Marshal(b)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetOperations(w http.ResponseWriter, r *http.Request) {
	newOperations:= models.GetAllStockOperations()
	res, _ := json.Marshal(newOperations)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}