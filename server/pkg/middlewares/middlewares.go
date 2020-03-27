package middlewares

import (
	"context"
	"log"
	"net/http"
	"strings"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/flnacif/financeapp/pkg/config"
)

func AuthMiddleware(next http.HandlerFunc) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		authHeader := r.Header.Get("Authorization")
		jwtToken := strings.Split(authHeader, " ")[1]

		token, err := config.VerifyJWT([]byte(jwtToken))

		if err != nil {
			log.Println(err)
			log.Println("Token is not valid:", r.Header.Get("Authorization"))
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Unauthorized"))
		} else {
			claims := token.Claims.(jwt.MapClaims)
			log.Printf("Authorized request for: %s\n", claims["preferred_username"])
			ctx := context.WithValue(r.Context(), "userContextClaims", claims)

			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		}
	})
}
