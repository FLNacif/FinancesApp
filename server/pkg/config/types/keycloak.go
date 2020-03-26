package types

type AuthKeys struct {
	Keys []struct {
		Kid     string   `json:"kid"`
		Kty     string   `json:"kty"`
		Alg     string   `json:"alg"`
		Use     string   `json:"use"`
		N       string   `json:"n"`
		E       string   `json:"e"`
		X5C     []string `json:"x5c"`
		X5T     string   `json:"x5t"`
		X5TS256 string   `json:"x5t#S256"`
	} `json:"keys"`
}
