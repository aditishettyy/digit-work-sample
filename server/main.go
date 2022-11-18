package main

import (
	"database/sql"
	"log"
	"net/http"
	"fmt"
	"strings"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := sql.Open("sqlite3", "./alliance.db")
	logErr(err)

	sqlStmt :=
	`
		CREATE TABLE IF NOT EXISTS user(
			id integer primary key,
			first_name text,
			last_name text,
			company text,
			email text,
			phone integer,
			notes text,
			created_at timestamp default current_timestamp
		);
	`
	_, err = db.Exec(sqlStmt)

	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
		return
	}

	http.HandleFunc("/submit", func(w http.ResponseWriter, r *http.Request) {
		if err := r.ParseForm(); err != nil {
			fmt.Fprintf(w, "ParseForm() err: %v", err)
			log.Fatal(err)
			return
		}

		first_name := strings.TrimSpace(r.FormValue("first_name"))
		last_name := strings.TrimSpace(r.FormValue("last_name"))
		company := strings.TrimSpace(r.FormValue("company"))
		email := strings.TrimSpace(r.FormValue("email"))
		phone := strings.TrimSpace(r.FormValue("phone"))
		notes := strings.TrimSpace(r.FormValue("notes"))
		
		tx, err := db.Begin()
        logErr(err)

		stmt, err := tx.Prepare("INSERT INTO user(first_name, last_name, company, email, phone, notes) values(?,?,?,?,?,?)")
        logErr(err)

        res, err := stmt.Exec(first_name, last_name, company, email, phone, notes)
        logErr(err)

		id, err := res.LastInsertId()
        logErr(err)

		resStr := fmt.Sprintf("%s%d", "new user has been created with id: ", id)

		tx.Commit()
		stmt.Close()

		w.Header().Set("Content-Type", "text/plain")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(resStr))
	})

	log.Printf("Starting Alliance HTTP server...\n")
	if err := http.ListenAndServe(":8081", nil); err != nil {
		log.Fatal(err)
	}
}

func logErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

