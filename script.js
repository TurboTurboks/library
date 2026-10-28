
const myLibrary = [];


function Book(ID, title, author, pages, read) {
    this.ID = ID;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        let text = title + " by " + author + ", " + pages + "pages, " + (read ? "Read" : "Not read yet");
        return text;
    }
}

function addBookToLibrary(title, author, pages, read) {

    let ID = crypto.randomUUID();
    let newBook = new Book(ID, title, author, pages, read);
    myLibrary.push(newBook);

    return newBook;
}

addBookToLibrary("I am noumber four", "Pitakus Lor", 321, true);
addBookToLibrary("1949", "George Orwell", 342, false);


function createBookTab(book) {
    let newBook = document.createElement("div");

    let newBookTitle = document.createElement("h2");
    let newBookAuthor = document.createElement("h3");
    let newBookPages = document.createElement("p");
    let ReadText = document.createElement("h3");

    let newBookReadSwitchLabel = document.createElement("label");
    let newBookReadSwitchInput = document.createElement("input");
    let newBookReadSwitchSpan = document.createElement("span");

    let removeBook = document.createElement("button");

    newBook.className = "book_tab";

    newBookTitle.innerText = "Title: " + book.title;
    newBookAuthor.innerText = "Author: " + book.author;
    newBookPages.innerText = "Number of pages: " + book.pages;

    ReadText.innerText = "Read: ";
    newBookReadSwitchLabel.className = "switch";
    newBookReadSwitchInput.type = "checkbox";
    newBookReadSwitchSpan.className = "slider round";

    newBookReadSwitchInput.checked = book.read;

    removeBook.innerText = "Remove Book";
    removeBook.classList = "removeBook";

    newBookReadSwitchLabel.appendChild(newBookReadSwitchInput);
    newBookReadSwitchLabel.appendChild(newBookReadSwitchSpan);

    newBook.appendChild(newBookTitle);
    newBook.appendChild(newBookAuthor);
    newBook.appendChild(newBookPages);
    newBook.appendChild(ReadText);
    newBook.appendChild(newBookReadSwitchLabel);
    newBook.appendChild(removeBook);

    document.querySelector("main").appendChild(newBook);

    newBook.dataset.id = book.ID;

    newBookReadSwitchInput.addEventListener('click', () => {
        for (let x of myLibrary) {
            if (x.ID == book.ID) {
                x.read = !x.read;
            }
        }
    });

    removeBook.addEventListener("click", (event) => {
        const card = event.target.closest(".book_tab");
        const id = card.dataset.id;

        const index = myLibrary.findIndex(b => b.ID === id);
        if (index !== -1) myLibrary.splice(index, 1);

        card.remove();


        /*for (let x of myLibrary) {
            if (x.ID == book.ID) {
                newBook.remove(x);
                myLibrary.splice(myLibrary.findIndex(b => b.ID === book.ID), 1);
            }
        }*/
    });

}

myLibrary.forEach(createBookTab);

const addBookBtn = document.querySelector("#add-book-btn");
const bookDialog = document.querySelector("#book-dialog");
const closeDialog = document.querySelector("#close-dialog");

addBookBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

closeDialog.addEventListener("click", () => {
    bookDialog.close();
});

const bookForm = document.querySelector("#book-form");

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = Number(document.querySelector("#pages").value);
    const read = document.querySelector("#read").checked;

    const newBook = addBookToLibrary(title, author, pages, read);
    createBookTab(newBook);

    bookForm.reset();
    bookDialog.close();
});



