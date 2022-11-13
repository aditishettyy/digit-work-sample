package main

import (
	"database/sql"
	"log"
	"net/http"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := sql.Open("sqlite3", "./alliance.db")
	checkErr(err)

	sqlStmt :=
	`
		CREATE TABLE IF NOT EXISTS user(
			id integer primary key,
			first_name text,
			last_name text,
			company text,
			email text,
			phone integer,
			notes text
		);
	`
	_, err = db.Exec(sqlStmt)

	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
		return
	}

	http.HandleFunc("/submit", func(w http.ResponseWriter, r *http.Request) {
		// TODO: Handle form submission!
		log.Printf("SUBMIT")
		if err := r.ParseForm(); err != nil {
			fmt.Fprintf(w, "ParseForm() err: %v", err)
			log.Fatal(err)
			return
		}

		first_name := r.FormValue("first_name")
		last_name := r.FormValue("last_name")
		company := r.FormValue("company")
		email := r.FormValue("email")
		phone := r.FormValue("phone")
		notes := r.FormValue("notes")

		// fmt.Fprintf(w, "first_name = %s\n", first_name)
		// fmt.Fprintf(w, "last_name = %s\n", last_name)
		// fmt.Fprintf(w, "company = %s\n", company)
		// fmt.Fprintf(w, "email = %s\n", email)
		// fmt.Fprintf(w, "phone = %s\n", phone)
		// fmt.Fprintf(w, "notes = %s\n", notes)

		tx, err := db.Begin()
		// if err != nil {
		// 	log.Fatal(err)
		// }
		// stmt, err := tx.Prepare("insert into user(first_name, last_name) values('a', 'b')")
		// if err != nil {
		// 	log.Fatal(err)
		// }

		stmt, err := tx.Prepare("INSERT INTO user(first_name, last_name, company, email, phone, notes) values(?,?,?,?,?,?)")
        checkErr(err)

        res, err := stmt.Exec(first_name, last_name, company, email, phone, notes)
        checkErr(err)
		fmt.Println(res)

		tx.Commit()
		stmt.Close()
	})

	log.Printf("Starting Alliance HTTP server...\n")
	if err := http.ListenAndServe(":8081", nil); err != nil {
		log.Fatal(err)
	}
}

func checkErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
