package config

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	config "github.com/flnacif/financeapp/pkg/config/types"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var (
	db *gorm.DB
)

func GetAuthKey(kid string) string {
	var keycloakAuthKey config.AuthKeys
	resp, err := http.Get("http://localhost:8081/auth/realms/financeapp/protocol/openid-connect/certs")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	err = json.Unmarshal(body, &keycloakAuthKey)

	var authKey string
	for _, key := range keycloakAuthKey.Keys {
		if kid == key.Kid {
			authKey = key.X5C[0]
		}
	}
	if authKey == "" {
		panic("KeyId(Kid) not found!")
	}

	return "-----BEGIN RSA PRIVATE KEY-----\n" + authKey + "\n-----END RSA PRIVATE KEY-----"
}

func Connect() {
	d, err := gorm.Open("postgres", "host=127.0.0.1 port=5432 user=admin dbname=finance password=admin sslmode=disable")
	if err != nil {
		panic(err)
	}
	db = d
}

func GetDB() *gorm.DB {
	return db
}
