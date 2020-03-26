package main

import (
	"os"
	"encoding/json"
	"log"
	"fmt"
	"net/http"
	"github.com/flnacif/financeapp/pkg/routes"
    "github.com/rs/cors"
	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var db *gorm.DB

func main() {
	r := mux.NewRouter()

	routes.RegisterStockOperationsRoutes(r)

	r.HandleFunc("/healthcheck", HealthCheck).Methods("GET")
	http.Handle("/", r)

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowCredentials: true,
		AllowedHeaders: []string{"*"},
		})
	handler := c.Handler(r)

	fmt.Println("Listenning on http://localhost:8000/")
	log.Fatal(http.ListenAndServe(":8000", handlers.LoggingHandler(os.Stdout, handler)))
}

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode("Up and Running!")
}