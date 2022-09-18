const book1 = new Book('Hobbit', 'Tolkien', 'Pages', true, 5);
let myLibrary = [book1];
let bookID = 20220
const addBook = document.querySelector('.add-book');
addBook.addEventListener('click', addBookToLibrary);

function Book(title, author, pages, read, bookID) {
    this.id = bookID;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(e) {
    e.preventDefault();
    console.log(myLibrary);
    const inputs = document.querySelectorAll('input');
    const status = document.querySelector('.status');
    const title = inputs[1].value;
    const author = inputs[2].value;
    const pages = inputs[3].value;
    const read = status.value;
    myLibrary.push(new Book(title, author, pages, read, bookID));
    bookID++;
    addTile();
}





