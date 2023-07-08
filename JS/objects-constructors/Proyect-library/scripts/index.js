const mainList = document.body.querySelector(".books-list");

const addButton = document.querySelector(".add-book");
const addBookForm = document.querySelector(".add-book-form");

const submitButton = document.querySelector(".submit-book");

let myLibrary = [];


let bookOne = new Book("titulo uno", "YO", 303, true);
let bookTwo = new Book("titulo Dos", "VOS", 302, false);

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    //automatically adds this book to "myLibrary" array 
    this.index = addBookToLibrary(this);
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read? "read": "not read yet"}`;
}

function addBookToLibrary(book) {
    //validations
    //book.pages has to be positive, int number
    //title and author has to have something or it`s "unknown"
    if (book) {
        myLibrary.push(book);
        return myLibrary.length - 1;
    }
}

function removeBooksFromBody() {
    mainList.innerHTML = ""
}

function addBooksToBody(books) {
    books.forEach(book => {
        addBookToBody(book)
    });
}



function addBookToBody(book) {
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
                    </article>
                     <article> 
                        <input class="remove-btn" type="button" value="Remove" id="${book.index}">
                        <input class="read-btn" type="button" value="Read" id="${book.index}">
                     </article>
                    `


    );
    const removeBtn = document.querySelectorAll(`.remove-btn`);
    const readBtn = document.querySelectorAll(`.read-btn`);

    removeBtn.forEach(btn => {
        btn.removeEventListener("click", () => {})
    });
    readBtn.forEach(btn => {
        btn.removeEventListener("click", () => {})
    });

    removeBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            // it sets the book to undefined so that
            // i don`t change the index of every other book
            // it might not be memory friendly
            delete(myLibrary[e.target.id]);
            removeBooksFromBody()
            addBooksToBody(myLibrary);
        })
    });
    readBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if (myLibrary[e.target.id].read) {
                myLibrary[e.target.id].read = false
            } else {
                myLibrary[e.target.id].read = true
            }
            //it`s not efficient to remove all books and then add
            //them back
            removeBooksFromBody()
            addBooksToBody(myLibrary);
        })
    });

}







addButton.addEventListener("click", (e) => {

    if (addBookForm.style.display != "flex") {
        addBookForm.style.display = "flex";
    } else {
        addBookForm.style.display = "none";
    }
})

submitButton.addEventListener("click", (e) => {

    e.preventDefault();

    // Validate
    //title and author not too long.
    //if empty = "unknown".
    //pages has to be a valid number (positive, int) not too big
    //read is false by default
    let tempBookTitle = addBookForm.elements["title"].value;
    let tempBookAuthor = addBookForm.elements["author"].value;
    let tempBookPages = addBookForm.elements["pages"].value;
    let tempBookRead = addBookForm.elements["read"].value;

    const tempBook = new Book(
        tempBookTitle,
        tempBookAuthor,
        tempBookPages,
        tempBookRead);
    addBookToBody(tempBook);
    console.log(myLibrary);
})

addBooksToBody(myLibrary);

console.log(myLibrary);