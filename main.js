const book1 = new Book('Hobbit', 'Tolkien', 'Pages', true, 5);
let myLibrary = [book1];
let bookID = 20220
const addBook = document.querySelector('.add-book');
addBook.addEventListener('click', addBookToLibrary);

function Book(title, author, pages, date, summary, read, bookID) {
    this.id = bookID;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.date = date;
    this.summary = summary;
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
    const date = inputs[4].value;
    const read = status.value;
    myLibrary.push(new Book(title, author, pages, date, read, bookID));
    bookID++;
    addTile();
}

function addTile() {
    const myArticle = document.querySelector('.display-tiles');

    const myTile = document.createElement('div');
    const myTitle = document.createElement('h3');
    const myAuthor = document.createElement('p');
    const myPages = document.createElement('p');
    const myDate = document.createElement('p')

    myTile.className = 'display-tile';
    myTitle.className = 'tile-heading';
    myAuthor.className = 'tile-field';
    myPages.className = 'tile-field';
    myDate.className = 'tile-field';

    myLibrary.forEach((book) => {
        console.log(book);
        console.log(book.title);

        myTitle.textContent = book.title;
        myAuthor.textContent = `Author:  ${book.author}`
        myPages.textContent = `Pages:  ${book.pages}`
        myDate.textContent = `Date:  ${book.date}`

        myTile.appendChild(myTitle);
        myTile.appendChild(myAuthor);
        myTile.appendChild(myPages);
        myTile.appendChild(myDate);
        myArticle.appendChild(myTile);
    });
}