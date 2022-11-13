package main

import (
	"database/sql"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	_, err := sql.Open("sqlite3", "./alliance.db")
	if err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("/submit", func(w http.ResponseWriter, r *http.Request) {
		// TODO: Handle form submission!
	})

	log.Printf("Starting Alliance HTTP server...\n")
	if err := http.ListenAndServe(":8081", nil); err != nil {
		log.Fatal(err)
	}
}
