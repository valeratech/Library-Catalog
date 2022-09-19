// const book1 = new Book('Hobbit', 'Tolkien', 'Pages', true, 5);
let myLibrary = [];
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
    const inputs = document.querySelectorAll('input');
    const status = document.querySelector('.status');
    const textArea = document.querySelector('textarea')
    console.log(inputs);
    const title = inputs[1].value;
    const author = inputs[2].value;
    const pages = inputs[3].value;
    const date = inputs[4].value;
    const summary = textArea.value;
    const read = (status.value === 'true'); // convert value to a boolean

    myLibrary.push(new Book(title, author, pages, date, summary, read, bookID));
    bookID++;
    createTile(read);
}


function createTile(read) {
    const myArticle = document.querySelector('.display-tiles');

    const myTile = document.createElement('div');
    const myTitle = document.createElement('h3');
    const myAuthor = document.createElement('p');
    const myPages = document.createElement('p');
    const myPubDate = document.createElement('p');
    const myInsertDate = document.createElement('p');
    const myUl = document.createElement('ul');
    const insertDate = new Date();

    myTile.className = 'display-tile';
    myTitle.className = 'tile-heading';
    myAuthor.className = 'tile-field';
    myPages.className = 'tile-field';
    myPubDate.className = 'tile-field';
    myInsertDate.className = 'tile-field';

    myLibrary.forEach((book) => {
        // console.log(book);
        // console.log(book.title);
        myTitle.textContent = book.title;
        myAuthor.textContent = `Author:  ${book.author}`;
        myPages.textContent = `Pages:  ${book.pages}`;
        myPubDate.textContent = `Date Published:  ${book.date}`;
        myInsertDate.textContent = `Date Entered: ${insertDate.getFullYear()}-${insertDate.getMonth()}-${insertDate.getDate()}`

        if (read) {
            myUl.innerHTML = `<li><input type="checkbox" name="power" id="power" checked>
                          <label for="power"><span class="on">Read</span><span class="off">Unread</span></label></li>`;
            myTile.style.backgroundImage = 'linear-gradient(to right,  #406840, #a6dfa6)';
            // const myStatus = document.querySelector('input[type="checkbox"]');
            // console.log(myStatus);
        } else {
            myUl.innerHTML = `<li><input type="checkbox" name="power" id="power">
                <label for="power"><span class="on">Read</span><span class="off">Unread</span></label></li>`;
            myTile.style.backgroundImage = 'linear-gradient(to right, #bababa, #969696)';
            // const myStatus = document.getElementById("checkbox");
            // console.log(myStatus)
        }

        myTile.appendChild(myTitle);
        myTile.appendChild(myAuthor);
        myTile.appendChild(myPages);
        myTile.appendChild(myPubDate);
        myTile.appendChild(myInsertDate);
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
    /* RETREIVES THE INDEX OF THE SPECIFIC TILES WHERE THE BUTTON IS TOGGLED */
    const parent = e.target.parentNode.parentNode.parentNode.parentNode;
    const child = e.target.parentNode.parentNode.parentNode;
    const index = Array.prototype.indexOf.call(parent.children, child);
    /* It has to be background-image, not background-color, for gradients. */
    if (e.target.checked) {
        child.style.backgroundImage = 'linear-gradient(to right,  #406840, #a6dfa6)';
    } else {
        child.style.backgroundImage = 'linear-gradient(to right, #bababa, #969696)';
    }
});