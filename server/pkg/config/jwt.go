package config

import (
	"fmt"
	"regexp"

	jwt "github.com/dgrijalva/jwt-go"
)

func VerifyJWT(tokenJwt []byte) (*jwt.Token, error) {
	// trim possible whitespace from token
	tokenJwt = regexp.MustCompile(`\s*$`).ReplaceAll(tokenJwt, []byte{})

	// Parse the token. Load the key
	token, err := jwt.Parse(string(tokenJwt), func(t *jwt.Token) (interface{}, error) {
		data := loadKey(t.Header["kid"].(string))
		return jwt.ParseRSAPublicKeyFromPEM([]byte(data))
	})

	// Print an error if we can't parse for some reason
	if err != nil {
		return nil, fmt.Errorf("Couldn't parse token: %v", err)
	}

	// Is token invalid?
	if !token.Valid {
		return nil, fmt.Errorf("Token is invalid")
	}

	return token, nil
}

func loadKey(kid string) string {
	return GetAuthKey(kid)
}
