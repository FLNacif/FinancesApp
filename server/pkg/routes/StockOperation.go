package routes

import (
	"net/http"

	"github.com/flnacif/financeapp/pkg/controllers"
	"github.com/flnacif/financeapp/pkg/middlewares"
	"github.com/gorilla/mux"
)

var RegisterStockOperationsRoutes = func(router *mux.Router) {
	router.Handle("/stockoperation/getalloperations", middlewares.AuthMiddleware(http.HandlerFunc(controllers.GetOperations))).Methods("GET")
	router.Handle("/stockoperation/getpositions", middlewares.AuthMiddleware(http.HandlerFunc(controllers.GetPositions))).Methods("GET")
	router.Handle("/stockoperation/save", middlewares.AuthMiddleware(http.HandlerFunc(controllers.CreateOperation))).Methods("post")
}
