function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read? "read": "not read yet"}`;
}

let bookOne = new Book("titulo uno", "YO", 303, true);
console.log(bookOne.info());