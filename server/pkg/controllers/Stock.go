package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/flnacif/financeapp/pkg/models"
	"github.com/gorilla/mux"
)

func GetStocksByName(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	stocks := models.GetStocksByName(params["name"])
	res, _ := json.Marshal(stocks)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
