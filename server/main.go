package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/flnacif/financeapp/pkg/routes"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"github.com/rs/cors"
)

var db *gorm.DB

func main() {
	r := mux.NewRouter()

	routes.RegisterStockOperationsRoutes(r)
	routes.RegisterStockRoutes(r)

	r.HandleFunc("/healthcheck", HealthCheck).Methods("GET")
	http.Handle("/", r)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
	})
	handler := c.Handler(r)

	fmt.Println("Listenning on http://localhost:8000/")
	log.Fatal(http.ListenAndServe(":8000", handlers.LoggingHandler(os.Stdout, handler)))
}

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode("Up and Running!")
}
