
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
}

addBookToLibrary("Test1", "testAutohor1", 234, true);
addBookToLibrary("Test12", "testAutohor12", 2342, false);

console.log(myLibrary[0]);

// console.log(theHobbit.info()); // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
