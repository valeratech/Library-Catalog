let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = (read) => {
        if (read) {
            return "Read";
        } else {
            return "Not Read";
        }
    }
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read()}`;
    }
}

// function addBookToLibrary() {
//     // do stuff here
// }


const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
console.log(theHobbit.info());