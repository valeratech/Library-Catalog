
function createBook(title, author, pages, date, summary, read, bookID) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.date = date;
    this.summary = summary;
    this.read = read;
    this.id = bookID;
}

function addBookToLibrary(e) {
    // e.preventDefault();
    // The :scope pseudo-class restores the expected behavior, only matching selectors on descendants of the base element:
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll(':scope input')

    const status = document.querySelector('.status');
    const textArea = document.querySelector('textarea')

    const title = inputs[0].value;
    const author = inputs[1].value;
    const pages = inputs[2].value;
    const date = inputs[3].value;
    const summary = textArea.value;
    const read = (status.value === 'true'); // convert value to a boolean

    myLibrary.push(new createBook(title, author, pages, date, summary, read, bookID));
    bookID++;
    createTile(read);
    console.log(myLibrary);
    addRemoveMsg();
    bookCount();
}

function addRemoveMsg() {
    if (myLibrary.length === 0) {
        const mainDisplay = document.querySelector('.display');
        const addCatalogMsg = document.createElement('div');
        addCatalogMsg.className = 'catalog-message'
        addCatalogMsg.innerHTML = `<h2>There are no books in your catalog</h2>
            <p><em>Select the add symbol in the bottom right corner to add books</em></p>`;
        mainDisplay.appendChild(addCatalogMsg);
    } else if (myLibrary.length === 1 && document.querySelector('.catalog-message')) {
        // condition checks if there is at least 1 tile and if catalog message already exists - then remove
        const catalogMsg = document.querySelector('.catalog-message');
        catalogMsg.remove();
    }
}

function bookCount() {
    // Code not efficient on resources but for demo purposes
    const totalBooks = document.querySelectorAll('.book-log p');
    totalBooks[0].textContent = `Total Book: ${myLibrary.length}`;
    let readBook = 0;
    let unreadBook = 0;
    for (book of myLibrary) {
        console.log(typeof book.read);
        if (book.read) {
            readBook += 1;
        } else {
            unreadBook += 1;
        }
    }
    totalBooks[1].textContent = `Read: ${readBook}`;
    totalBooks[2].textContent = `Not Read: ${unreadBook}`;
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
    const removeIcon = document.createElement('span');

    myTile.className = 'display-tile';
    myTitle.className = 'tile-heading';
    myAuthor.className = 'tile-field';
    myPages.className = 'tile-field';
    myPubDate.className = 'tile-field';
    myInsertDate.className = 'tile-field';
    removeIcon.className = 'remove-book';

    myLibrary.forEach((book) => {

        myTitle.textContent = book.title;
        myAuthor.innerHTML = `Author:  ${book.author}`;
        myPages.textContent = `Pages:  ${book.pages}`;
        myPubDate.textContent = `Date Published:  ${book.date}`;
        myInsertDate.textContent = `Date Entered: ${insertDate.getFullYear()}-${insertDate.getMonth()}-${insertDate.getDate()}`
        removeIcon.innerHTML = `&#x2715`

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
        myTile.appendChild(removeIcon);
        myArticle.appendChild(myTile);

        const mySummary = document.createElement('p');
        mySummary.textContent = `${book.summary}`
        mySummary.textContent = `${book.summary}`
        mySummary.className = 'tile-field';
    });
}

const addBook = document.querySelector('.add-book');
addBook.addEventListener('click', addBookToLibrary);

/* RETREIVES THE INDEX OF THE SPECIFIC TILES WHERE THE BUTTON IS TOGGLED */
// Changes the state of the myLibrary array
const displayTiles = document.querySelector('.display-tiles');
displayTiles.addEventListener('change', (e) => {
    const parent = e.target.parentNode.parentNode.parentNode.parentNode;
    const child = e.target.parentNode.parentNode.parentNode;
    const index = Array.prototype.indexOf.call(parent.children, child);
    /* It has to be background-image, not background-color, for gradients. */
    if (e.target.checked) {
        child.style.backgroundImage = 'linear-gradient(to right,  #406840, #a6dfa6)';
        myLibrary[index].read = true;
        console.log(myLibrary[index]);
        bookCount();
    } else {
        child.style.backgroundImage = 'linear-gradient(to right, #bababa, #969696)';
        myLibrary[index].read = false;
        console.log(myLibrary[index].read);
        console.log(myLibrary[index]);
        bookCount();
    }
});

// Event listener to remove Book from array and tiles
displayTiles.addEventListener('click', (e) => {
    /* RETREIVES THE INDEX OF THE SPECIFIC TILES WHERE THE BUTTON IS TOGGLED */
    const parent = e.target.parentNode.parentNode;
    const child = e.target.parentNode;
    const index = Array.prototype.indexOf.call(parent.children, child);

    if (e.target.className === 'remove-book') {
        // remove object from the myLibrary array as well as the DOM element
        myLibrary.splice(index, 1);
        child.remove();
        bookCount();
    }
    addRemoveMsg();

});

// Event listener to add Book to array and tiles
const newBook = document.querySelector('.new-book');
newBook.addEventListener('click',() => {
    const formContainer = document.querySelector('.form-container');
    const form = document.querySelector('.book-form');
    formContainer.style.display = 'flex';
    form.style.display = 'flex';
})

const closeForm = document.querySelector('.close-form');
closeForm.addEventListener('click', () => {
    const formContainer = document.querySelector('.form-container');
    const form = document.querySelector('.book-form');
    formContainer.style.display = 'none';
    form.style.display = 'none';
})

// Book(title, author, pages, date, summary, read, bookID)

const book1 = new createBook('The Art of War', 'Sun Tzu', 256, null, ` The Art Of War has been 
considered the definitive text on military strategy and warfare ever since being written in ancient China around 500 BC, 
inspiring businesses, athletes, and of course generals to beat their opponents and competition the right way until 
today.`, false, 1);


const book2 = new createBook('Dune', 'Frank Herbert', 576, '1965-08-01', `Set on the desert planet Arrakis, Dune is 
the story of the boy Paul Atreides, who would become the mysterious man known as Muad'Dib. He would avenge the 
traitorous plot against his noble family--and would bring to fruition humankind's most ancient and unattainable dream.
A stunning blend of adventure and mysticism, environmentalism and politics, Dune won the first Nebula Award for Best 
Novel, shared the Hugo Award, and formed the basis of what it undoubtedly the grandest epic in science fiction.`,
    true, 2);

let myLibrary = [];
let bookID = 20220

myLibrary.push(book1);
createTile(false);
myLibrary.push(book2);
createTile(true);

bookCount();