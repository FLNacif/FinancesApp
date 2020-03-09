package controllers

import (
	"encoding/json"
	"server/pkg/utils"
	"net/http"
	"server/pkg/models"
	"github.com/gorilla/mux"
)

var NewUser models.User

func CreateUser(w http.ResponseWriter, r *http.Request) {
	user := &models.User{}
	utils.ParseBody(r, user)
	b:= user.CreateUser()
	res,_ := json.Marshal(b)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetUserByLogin(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	login := params["login"]

	newOperations:= models.GetUserByLogin(login)
	res, _ := json.Marshal(newOperations)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}