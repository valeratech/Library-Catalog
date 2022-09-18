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

function addTile() {
    const myArticle = document.querySelector('.display-tiles');

    const myTile = document.createElement('div');
    const myTitle = document.createElement('h3');
    const myAuthor = document.createElement('p');
    const myPages = document.createElement('p');

    myTile.className = 'display-tile';
    myTitle.className = 'tile-title';
    myAuthor.className = 'tile-author';
    myPages.className = 'title-page';

    myLibrary.forEach((book) => {
        console.log(book);
        console.log(book.title);

        myTitle.textContent = book.title
        myAuthor.textContent = `Author:  ${book.author}`
        myPages.textContent = `Pages:  ${book.pages}`

        myTile.appendChild(myTitle);
        myTile.appendChild(myAuthor);
        myTile.appendChild(myPages);
        myArticle.appendChild(myTile);
    });
}




