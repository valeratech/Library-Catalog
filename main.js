// Book(title, author, pages, date, summary, read, bookID)


const book1 = new createBook('The Art of War', 'Sun Tzu', 256, null, ` The Art Of War has been 
considered the definitive text on military strategy and warfare ever since being written in ancient China around 500 BC, 
inspiring businesses, athletes, and of course generals to beat their opponents and competition the right way until 
today.`, false, 1);


const book2 = new createBook('Dune', 'Frank Herbert', 576, '1965-08-01', `Set on the desert planet Arrakis, Dune is 
the story of the boy Paul Atreides, who would become the mysterious man known as Muad'Dib. He would avenge the 
traitorous plot against his noble family--and would bring to fruition humankind's most ancient and unattainable dream.
A stunning blend of adventure and mysticism, environmentalism and politics.`,
    true, 2);

const book3 = new createBook('Pride and Prejudice', 'Jane Austen', 276, '1813-01-28', `Th
e story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, 
education, and marriage in the society of the landed gentry of the British Regency. Elizabeth is the second of five 
daughters of a country gentleman, Mr. Bennet, living in Longbourn.`, true, 3);

const book4 = new createBook('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 223,
    '1997-06-26', `Harry Potter has no idea how famous he is. That's because he's being raised by his 
    miserable aunt and uncle who are terrified Harry will learn that he's really a wizard, just as his parents were. 
    But everything changes when Harry is summoned to attend an infamous school for wizards, and he begins to discover 
    some clues about his illustrious birthright.`, false, 4);

let myLibrary = [];
let bookID = 20220

myLibrary.push(book1);
createTile(false);
myLibrary.push(book2);
createTile(true);
myLibrary.push(book3);
createTile(false);
myLibrary.push(book4);
createTile(false);

bookCount();
console.log(myLibrary)

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
    e.preventDefault();
    // The :scope pseudo-class restores the expected behavior, only matching selectors on descendants of the base element:
    const form = document.querySelector('.book-form');
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
    addRemoveMsg();
    bookCount();
    console.log(myLibrary)
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

    myLibrary.forEach((book) => {
        myTitle.innerHTML = book.title;
        myAuthor.innerHTML = `Author:  ${book.author}`;
        myPages.innerHTML = `Pages:  ${book.pages}`;
        myPubDate.innerHTML = `Date Published:  ${book.date}`;
        myInsertDate.innerHTML = `Date Entered: ${insertDate.getFullYear()}-${insertDate.getMonth()}-${insertDate.getDate()}`;
        removeIcon.innerHTML = `&#x2715`;
        infoIcon.innerHTML = `&#9432;`;
        collapseInfo.innerHTML = `&#9432;`;
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
        myTile.appendChild(myTileFront)
        myTile.appendChild(myTileBack)
        myArticle.appendChild(myTile);

    });
}

const addBook = document.querySelector('.add-book');
addBook.addEventListener('click', addBookToLibrary);

/* RETREIVES THE INDEX OF THE SPECIFIC TILES WHERE THE BUTTON IS TOGGLED */
// Changes the state of the myLibrary array
const displayTiles = document.querySelector('.display-tiles');
displayTiles.addEventListener('change', (e) => {
    const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
    const child = e.target.parentNode.parentNode.parentNode.parentNode;
    const index = Array.prototype.indexOf.call(parent.children, child);
    /* It has to be background-image, not background-color, for gradients. */
    const pElements = child.querySelectorAll('p');
    const headElement = child.querySelector('h3');
    if (e.target.checked) {
        child.style.backgroundImage = 'linear-gradient(135deg, #3a5271 0%, #8bd8e2 100%)';
        myLibrary[index].read = true;
        pElements.forEach((paragraph) => {
            paragraph.style.color = '#ffffff';
        })
        headElement.style.color = '#ffffff'
        bookCount();
    } else {
        child.style.backgroundImage = 'linear-gradient(135deg, #e3e3e3 0%, #5d6874 100%)';
        myLibrary[index].read = false;
        pElements.forEach((paragraph) => {
            paragraph.style.color = '#201e1e';
        })
        headElement.style.color = '#201e1e';
        bookCount();
    }
    console.log(myLibrary)
});

// Event listener to remove Book from array and tiles
displayTiles.addEventListener('click', (e) => {
    /* RETREIVES THE INDEX OF THE SPECIFIC TILES WHERE THE BUTTON IS TOGGLED */
    const parent = e.target.parentNode.parentNode.parentNode;
    const child = e.target.parentNode.parentNode;
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


document.addEventListener('click', (e) => {
    if (e.target.className === "display-info") {
        e.target.parentNode.parentNode.style.transform = 'rotateY(180deg)';
        e.target.parentNode.parentNode.style.transform = 'preserve-3d';
        e.target.parentNode.parentNode.style.transition = 'transform 0.8s';
        e.target.parentNode.nextElementSibling.style.transform = 'rotateY(180deg)';

        // Set the backside of the card/container to display
        e.target.parentNode.nextElementSibling.style.display = 'block';
        // Set the frontside of the card/container to not display
        e.target.parentNode.style.display = 'none';
    } else if (e.target.className === "collapse-info") {
        e.target.parentNode.parentNode.style.transform = 'rotateY(360deg)';
        e.target.parentNode.parentNode.style.transform = 'preserve-3d';
        e.target.parentNode.parentNode.style.transition = 'transform 0.8s';
        // Set the frontside of the card/container to display
        e.target.parentNode.previousElementSibling.style.display = 'block';
        // Set the backside of the card/container to not display
        e.target.parentNode.style.display = 'none';
    }
})

// Form validation below
const signUpForm = document.getElementById('signUpForm');
const emailField = document.getElementById('emailField');
const okButton = document.getElementById('okButton');

emailField.addEventListener('keyup', function (event) {
    isValidEmail = emailField.checkValidity();

    if ( isValidEmail ) {
        okButton.disabled = false;
    } else {
        okButton.disabled = true;
    }
});

okButton.addEventListener('click', function (event) {
    signUpForm.submit();
});
