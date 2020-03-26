package middlewares

import (
	"log"
	"net/http"
	"strings"

	"github.com/flnacif/financeapp/pkg/config"
)

func AuthMiddleware(next http.HandlerFunc) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		authHeader := r.Header.Get("Authorization")
		jwt := strings.Split(authHeader, " ")[1]

		token, err := config.VerifyJWT([]byte(jwt))

		if err != nil {
			log.Println(err)
			log.Println("Token is not valid:", r.Header.Get("Authorization"))
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Unauthorized"))
		} else {
			//log.Println("Authorized request: %s", "asd")
			log.Println(token.Claims)
			// TODO: withContext aqui
			next.ServeHTTP(w, r)
		}
	})
}
