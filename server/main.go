package main

import (
	"database/sql"
	"log"
	"net/http"
	"fmt"
	// "io/ioutil"
	// "encoding/json"
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

		// reqBody, err := ioutil.ReadAll(r.Body)
		// if err != nil {
		// 	log.Fatal(err)
		// }
		// fmt.Printf("%s", reqBody)
		// log.Println(reqBody)

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
		
		log.Printf("first_name", first_name);
		log.Printf("last_name", last_name);

		tx, err := db.Begin()
        logErr(err)

		stmt, err := tx.Prepare("INSERT INTO user(first_name, last_name, company, email, phone, notes) values(?,?,?,?,?,?)")
        logErr(err)

        res, err := stmt.Exec(first_name, last_name, company, email, phone, notes)
        logErr(err)
		fmt.Println(res)

		tx.Commit()
		stmt.Close()

		log.Printf("Success")

		// w.Header().Set("Content-Type", "application/json")
		// w.WriteHeader(http.StatusCreated)
		// json.NewEncoder(w).Encode({ success: "true"})

		// w.WriteHeader(http.StatusNotFound)
		// w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		// resp := make(map[string]string)
		// resp["message"] = "Status Created"
		// jsonResp, err := json.Marshal(resp)
		// if err != nil {
		// 	log.Fatalf("Error happened in JSON marshal. Err: %s", err)
		// }
		// w.Write(jsonResp)
		w.Write([]byte("OK"))
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
