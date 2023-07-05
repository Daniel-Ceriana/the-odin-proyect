const mainList = document.body.querySelector(".books-list");

const addButton = document.querySelector(".add-book");
const addBookForm = document.querySelector(".add-book-form");

const submitButton = document.querySelector(".submit-book");

let myLibrary = [];

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    //automatically adds this book to "myLibrary" array 
    addBookToLibrary(this);
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read? "read": "not read yet"}`;
}

function addBookToLibrary(userBook) {
    //validations
    if (userBook) {
        myLibrary.push(userBook);
    }
}


let bookOne = new Book("titulo uno", "YO", 303, true);
let bookTwo = new Book("titulo Dos", "VOS", 302, false);


myLibrary.forEach(book => {
    mainList.innerHTML += (
        ` <section class="book-card">
                    <article class="book-card__title">
                        <label for="title">Title: </label>
                        <span class="book-card__title--label">${book.title} </span>
                    </article>
                    <article class="book-card__author">
                        <label for="author">Author: </label>
                        <span class="book-card__author--label">${book.author}</span>
                    </article>
                    <article class="book-card__pages">
                        <label for="pages">Pages: </label>
                        <span class="book-card__pages--label">${book.pages}</span>
                    </article>
                    <article class="book-card__read">
                        <label for="read">Read: </label>
                        <span class="book-card__read--label">${book.read}</span>
                    </article>`
    );
});






addButton.addEventListener("click", (e) => {

    if (addBookForm.style.display != "flex") {
        addBookForm.style.display = "flex";
    } else {
        addBookForm.style.display = "none";
    }
})

submitButton.addEventListener("click", (e) => {

    e.preventDefault();
    console.log(e.target);
})