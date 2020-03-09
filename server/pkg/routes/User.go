package routes

import (
	"server/pkg/controllers"
	"github.com/gorilla/mux"
)

var RegisterUserRoutes = func(router *mux.Router) {
    router.HandleFunc("/user/create", controllers.CreateUser).Methods("POST")
    router.HandleFunc("/user/{login}", controllers.GetUserByLogin).Methods("GET")
}