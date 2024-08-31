const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = this.read === 'read' ? 'not read yet' : 'read';
};

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const bodyWrap = document.querySelector('.body-wrap');
    bodyWrap.innerHTML = ''; // Clear the display

    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.setAttribute('data-index', index);

        bookDiv.innerHTML = `
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Status:</strong> ${book.read}</p>
            <button class="remove-book-btn">Remove</button>
            <button class="toggle-read-btn">Toggle Read Status</button>
        `;

        // Remove book event listener
        bookDiv.querySelector('.remove-book-btn').addEventListener('click', () => {
            removeBookFromLibrary(index);
        });

        // Toggle read status event listener
        bookDiv.querySelector('.toggle-read-btn').addEventListener('click', () => {
            book.toggleReadStatus();
            displayBooks();
        });

        bodyWrap.appendChild(bookDiv);
    });
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

// Event listener for new book form submission
document.querySelector('#book-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked ? 'read' : 'not read yet';

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    // Reset form and hide it
    document.querySelector('#book-form').reset();
    document.querySelector('#book-form').style.display = 'none';
});

// Event listener for showing the new book form
document.querySelector('#new-book-btn').addEventListener('click', () => {
    document.querySelector('#book-form').style.display = 'block';
});

// Adding some initial books
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
const theWuKong = new Book("Knowing Wukong: Understand Black Myth: Wukong's Original Story: Journey to the West", "Yukihiro Saito", 200, 'not read yet');
const the2Cities = new Book('A Tale of Two Cities', 'Charles Dickens', 212, 'not read yet');

addBookToLibrary(theHobbit);
addBookToLibrary(theWuKong);
addBookToLibrary(the2Cities);
