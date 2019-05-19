package main

import (
	"html/template"
	"log"
	"net/http"
	"path"
	"os"
)

var (
	// компилируем шаблоны, если не удалось, то выходим
	template1 = template.Must(template.ParseFiles(path.Join("templates", "index.html")))
)
           

func main() {
        log.SetOutput(os.Stdout)

	// для отдачи сервером статичных файлов из папки static
	fs := http.FileServer(http.Dir("./templates"))
	http.Handle("/templates/", http.StripPrefix("/templates/", fs))
	http.HandleFunc("/", postHandler)
	log.Println("Listening...")
	http.ListenAndServe(":3000", nil)
}

type ViewData struct{
    Title string
}

func postHandler(w http.ResponseWriter, r *http.Request) {

	data := ViewData{
			 Title : "Hello World",
		 }

	// обработчик запросов
	if err := template1.Execute(w, data); err != nil {
		log.Println(err.Error())
		http.Error(w, http.StatusText(500), 500)
	} else {
		log.Println("response sended")
	}
}
