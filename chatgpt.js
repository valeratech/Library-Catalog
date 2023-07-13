// Book(title, author, pages, date, summary, read, bookID)

function createBook(title, author, pages, date, summary, read, bookID) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.date = date;
    this.summary = summary;
    this.read = read;
    this.id = bookID;
}

const book1 = new createBook('The Art of War', 'Sun Tzu', 256, null, ` The Art Of War has been 
considered the definitive text on military strategy and warfare ever since being written in ancient China around 500 BC, 
inspiring businesses, athletes, and of course generals to beat their opponents and competition the right way until 
today.`, false, 1);


const book2 = new createBook('Dune', 'Frank Herbert', 576, '1965-08-01', `Set on the desert planet Arrakis, Dune is 
the story of the boy Paul Atreides, who would become the mysterious man known as Muad'Dib. He would avenge the 
traitorous plot against his noble family--and would bring to fruition humankind's most ancient and unattainable dream.
A stunning blend of adventure and mysticism, environmentalism and politics.`, true, 2);

const book3 = new createBook('Pride and Prejudice', 'Jane Austen', 276, '1813-01-28', `The 
story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, 
education, and marriage in the society of the landed gentry of the British Regency. Elizabeth is the second of five 
daughters of a country gentleman, Mr. Bennet, living in Longbourn.`, false, 3);

const book4 = new createBook('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 223,
'1997-06-26', `Harry Potter has no idea how famous he is. That's because he's being raised by his 
miserable aunt and uncle who are terrified Harry will learn that he's really a wizard, just as his parents were. 
But everything changes when Harry is summoned to attend an infamous school for wizards, and he begins to discover 
some clues about his illustrious birthright.`, false, 4);

const myLibrary = [];
let bookID = 20220;

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);
createTile();

const filter = document.querySelector('#filter');
const readSelect = document.querySelector('#read');
const addBook = document.querySelector('#add-book');
const bookForm = document.querySelector('.book-form');
const displayTiles = document.querySelector('.display-tiles');
const newBook = document.querySelector('.new-book');
const exitForm = document.querySelector('.close-form');

filter.addEventListener('keyup', filterBook);
readSelect.addEventListener('change', sortRead);
addBook.addEventListener('click', addBookToLibrary);
bookForm.addEventListener('mouseover', checkFormValidation);
displayTiles.addEventListener('change', toggleReadStatus);
displayTiles.addEventListener('click', removeBook);
newBook.addEventListener('click', openForm);
exitForm.addEventListener('click', closeForm);

function filterBook(e) {
    const inputBox = filter.value.toLowerCase();
    const tiles = document.querySelectorAll('.display-tile-front');

    tiles.forEach((tile) => {
        const title = tile.firstElementChild.textContent.toLowerCase();
        const author = tile.firstElementChild.nextElementSibling.textContent.toLowerCase();

        if (title.indexOf(inputBox) !== -1 || author.indexOf(inputBox) !== -1) {
            tile.parentElement.style.display = 'block';
        } else {
            tile.parentElement.style.display = 'none';
        }
    });
}

function sortRead() {
    console.log(readSelect.value);
    myLibrary.forEach((book) => {
        console.log(book.read);
    });
}

function checkFormValidation() {
    const formTitle = document.querySelector('.form-title');
    const formAuthor = document.querySelector('.form-author');
    const formPages = document.querySelector('.form-pages');
    const formDate = document.querySelector('.form-date');
    const addBook = document.querySelector('#add-book');

    const isValid =
        bookForm.checkValidity() &&
        formAuthor.checkValidity() &&
        formPages.checkValidity() &&
        formDate.checkValidity();

    addBook.className = isValid ? 'add-book-style' : 'add-book-disable';
}

function addBookToLibrary(e) {
    e.preventDefault();
    const isValid = checkFormValidation();

    if (isValid) {
        const form = document.querySelector('.book-form');
        const inputs = form.querySelectorAll(':scope input');
        const status = document.querySelector('.status');
        const textArea = document.querySelector('textarea');

        const title = inputs[0].value;
        const author = inputs[1].value;
        const pages = inputs[2].value;
        const date = inputs[3].value;
        const summary = textArea.value;
        const read = status.value === 'true';

        myLibrary.push(new createBook(title, author, pages, date, summary, read, bookID));
        bookID++;
        createTile(read);
        addRemoveMsg();
        bookCount();
        clearForm();
    }
}

function addRemoveMsg() {
    const mainDisplay = document.querySelector('.display');
    const catalogMsg = document.querySelector('.catalog-message');

    if (myLibrary.length === 0) {
        if (!catalogMsg) {
            const addCatalogMsg = document.createElement('div');
            addCatalogMsg.className = 'catalog-message';
            addCatalogMsg.innerHTML = `<h2>There are no books in your catalog</h2>
            <p><em>Select the add symbol in the bottom right corner to add books</em></p>`;
            mainDisplay.appendChild(addCatalogMsg);
        }
    } else if (myLibrary.length === 1 && catalogMsg) {
        catalogMsg.remove();
    }
}

function bookCount() {
    const totalBooks = document.querySelectorAll('.book-log p');
    totalBooks[0].textContent = `Total Book: ${myLibrary.length}`;

    let readBook = 0;
    let unreadBook = 0;

    for (const book of myLibrary) {
        if (book.read) {
            readBook++;
        } else {
            unreadBook++;
        }
    }

    totalBooks[1].textContent = `Read: ${readBook}`;
    totalBooks[2].textContent = `Not Read: ${unreadBook}`;
}

function createTile(read) {
    const myArticle = document.querySelector('.display-tiles');

    myLibrary.forEach((book) => {
        const myTile = document.createElement('div');
        const myTileFront = document.createElement('div');
        const myTileBack = document.createElement('div');
        const myTitle = document.createElement('h3');
        const myAuthor = document.createElement('p');
        const myPages = document.createElement('p');
        const myPubDate = document.createElement('p');
        const myInsertDate = document.createElement('p');
        const myUl = document.createElement('ul');
        const insertDate = new Date();
        const removeIcon = document.createElement('span');
        const infoIcon = document.createElement('span');
        const collapseInfo = document.createElement('span');
        const mySummary = document.createElement('p');

        myTile.className = 'display-tile';
        myTitle.className = 'tile-heading';
        myAuthor.className = 'tile-field';
        myPages.className = 'tile-field';
        myPubDate.className = 'tile-field';
        myInsertDate.className = 'tile-field';
        removeIcon.className = 'remove-book';
        collapseInfo.className = 'collapse-info';
        infoIcon.className = 'display-info';
        myTileFront.className = 'display-tile-front';
        myTileBack.className = 'display-tile-back';

        myTitle.innerHTML = book.title;
        myAuthor.innerHTML = `Author:  ${book.author}`;
        myPages.innerHTML = `Pages:  ${book.pages}`;
        myPubDate.innerHTML = `Date Published:  ${book.date}`;
        myInsertDate.innerHTML = `Date Entered: ${insertDate.getFullYear()}-${insertDate.getMonth()}-${insertDate.getDate()}`;
        removeIcon.innerHTML = `&#x2715`;
        infoIcon.innerHTML = `<i id="front-flip" class="fa fa-info-circle"></i>`;
        collapseInfo.innerHTML = `<i id="back-flip" class="fa fa-info-circle"></i>`;
        mySummary.innerHTML = `<i>${book.summary}</i>`;

        if (read) {
            myUl.innerHTML = `<li><input type="checkbox" name="power" id="power" checked>
                          <label for="power"><span class="on">Read</span><span class="off">Unread</span></label></li>`;
            myTile.style.backgroundImage = 'linear-gradient(135deg, #3a5271 0%, #8bd8e2 100%)';
        } else {
            myUl.innerHTML = `<li><input type="checkbox" name="power" id="power">
                <label for="power"><span class="on">Read</span><span class="off">Unread</span></label></li>`;
            myTile.style.backgroundImage = 'linear-gradient(135deg, #e3e3e3 0%, #5d6874 100%)';
            myTitle.style.color = '#201e1e';
            myAuthor.style.color = '#201e1e';
            myPages.style.color = '#201e1e';
            myPubDate.style.color = '#201e1e';
            myInsertDate.style.color = '#201e1e';
            mySummary.style.color = '#201e1e';
        }

        myTileFront.appendChild(myTitle);
        myTileFront.appendChild(myAuthor);
        myTileFront.appendChild(myPages);
        myTileFront.appendChild(myPubDate);
        myTileFront.appendChild(myInsertDate);
        myTileFront.appendChild(myUl);
        myTileFront.appendChild(removeIcon);
        myTileFront.appendChild(infoIcon);
        myTileBack.appendChild(mySummary);
        myTileBack.appendChild(collapseInfo);
        myTile.appendChild(myTileFront);
        myTile.appendChild(myTileBack);
        myArticle.appendChild(myTile);
    });
}

function toggleReadStatus(e) {
    const target = e.target;

    if (target.matches('input[type="checkbox"][name="power"]')) {
        const parent = target.closest('.display-tile');
        const index = Array.prototype.indexOf.call(displayTiles.children, parent);
        const pElements = parent.querySelectorAll('p');
        const headElement = parent.querySelector('h3');

        if (target.checked) {
            parent.style.backgroundImage = 'linear-gradient(135deg, #3a5271 0%, #8bd8e2 100%)';
            myLibrary[index].read = true;
            pElements.forEach((paragraph) => {
                paragraph.style.color = '#ffffff';
            });
            headElement.style.color = '#ffffff';
        } else {
            parent.style.backgroundImage = 'linear-gradient(135deg, #e3e3e3 0%, #5d6874 100%)';
            myLibrary[index].read = false;
            pElements.forEach((paragraph) => {
                paragraph.style.color = '#201e1e';
            });
            headElement.style.color = '#201e1e';
        }

        bookCount();
    }
}

function removeBook(e) {
    if (e.target.className === 'remove-book') {
        const parent = e.target.closest('.display-tile');
        const index = Array.prototype.indexOf.call(displayTiles.children, parent);

        myLibrary.splice(index, 1);
        parent.remove();
        bookCount();
    }

    addRemoveMsg();
}

function openForm() {
    const formContainer = document.querySelector('.form-container');
    const form = document.querySelector('.book-form');
    formContainer.style.display = 'flex';
    form.style.display = 'flex';
}

function closeForm() {
    const formContainer = document.querySelector('.form-container');
    const form = document.querySelector('.book-form');
    formContainer.style.display = 'none';
    form.style.display = 'none';
}

function clearForm() {
    const form = document.querySelector('.book-form');
    const inputs = form.querySelectorAll(':scope input');
    const status = document.querySelector('.status');
    const textArea = document.querySelector('textarea');

    inputs.forEach((input) => {
        input.value = '';
    });

    textArea.value = '';
}

addRemoveMsg();
bookCount();