const book1 = new Book('Hobbit', 'Tolkien', 'Pages', true, 5);
let myLibrary = [book1];
let bookID = 20220

function Book(title, author, pages, date, summary, read, bookID) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.date = date;
    this.summary = summary;
    this.read = read;
    this.id = bookID;
}

function addBookToLibrary(e) {
    e.preventDefault();
    console.log(myLibrary);
    const inputs = document.querySelectorAll('input');
    const status = document.querySelector('.status');
    const textArea = document.querySelector('textarea')
    const title = inputs[2].value;
    const author = inputs[3].value;
    const pages = inputs[4].value;
    const date = inputs[5].value;
    const summary = textArea.value;
    const read = status.value;
    console.log(inputs);
    myLibrary.push(new Book(title, author, pages, date, summary, read, bookID));
    bookID++;
    addTile();
}

function addTile() {
    const myArticle = document.querySelector('.display-tiles');

    const myTile = document.createElement('div');
    const myTitle = document.createElement('h3');
    const myAuthor = document.createElement('p');
    const myPages = document.createElement('p');
    const myDate = document.createElement('p');
    const myUl = document.createElement('ul');

    myTile.className = 'display-tile';
    myTitle.className = 'tile-heading';
    myAuthor.className = 'tile-field';
    myPages.className = 'tile-field';
    myDate.className = 'tile-field';




    myLibrary.forEach((book) => {
        console.log(book);
        console.log(book.title);

        myTitle.textContent = book.title;
        myAuthor.textContent = `Author:  ${book.author}`;
        myPages.textContent = `Pages:  ${book.pages}`;
        myDate.textContent = `Date:  ${book.date}`;
        myUl.innerHTML = `<li><input type="checkbox" name="power" id="power">
                          <label for="power"><span class="on">Read</span><span class="off">Unread</span></label></li>`;

        myTile.appendChild(myTitle);
        myTile.appendChild(myAuthor);
        myTile.appendChild(myPages);
        myTile.appendChild(myDate);
        myTile.appendChild(myUl);
        myArticle.appendChild(myTile);

        const mySummary = document.createElement('p');
        mySummary.textContent = `${book.summary}`
        mySummary.textContent = `${book.summary}`
        mySummary.className = 'tile-field';

        // myTile.appendChild(mySummary); // Will specify summary info on the back of tile/card
    });
}

const addBook = document.querySelector('.add-book');
addBook.addEventListener('click', addBookToLibrary);

// const toggleRead = document.querySelectorAll('input[type="checkbox"]');
const displayTiles = document.querySelector('.display-tiles');
displayTiles.addEventListener('change', (e) => {
    console.log(e.target.checked);
    /* RETREIVES THE INDEX OF THE SPECIFIC TILES WHERE THE BUTTON IS TOGGLED */
    const parent = e.target.parentNode.parentNode.parentNode.parentNode;
    const child = e.target.parentNode.parentNode.parentNode;
    const index = Array.prototype.indexOf.call(parent.children, child);
    console.log(index);
    console.log(myLibrary);
});