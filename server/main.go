package main

import (
	"encoding/json"
	"log"
	"fmt"
	"net/http"
	"server/pkg/routes"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var db *gorm.DB

func main() {
	r := mux.NewRouter()
	routes.RegisterStockOperationsRoutes(r)
	routes.RegisterUserRoutes(r)

	r.HandleFunc("/healthcheck", HealthCheck).Methods("GET")
	http.Handle("/", r)

	fmt.Println("Listenning on http://localhost:8000/")
	log.Fatal(http.ListenAndServe("localhost:8000", r))
}

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode("Up and Running!")
}