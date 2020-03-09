package routes

import (
	"server/pkg/controllers"
	"github.com/gorilla/mux"
)

var RegisterStockOperationsRoutes = func(router *mux.Router) {
    router.HandleFunc("/stockoperation/getalloperations", controllers.GetOperations).Methods("GET")
}