// Book constructor function
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// create a new method toggleReadStatus for the object constructor Book.
// which is the opposite of this.read.
Book.prototype.toggleReadStatus = function () {
    if (this.read === 'read') {
        this.read = 'not read yet';
    } else {
        this.read = 'read';
    }
};

const myLibrary = [];

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const bodyWrap = document.querySelector('.body-wrap');
    
    // first version without the map function
    // let booksHTML = '';
    // for (let index = 0; index < myLibrary.length; index++) {
    //     const book = myLibrary[index];
    //     booksHTML += `
    //         <div class="book" data-index="${index}">
    //             <p><strong>Title:</strong> ${book.title}</p>
    //             <p><strong>Author:</strong> ${book.author}</p>
    //             <p><strong>Pages:</strong> ${book.pages}</p>
    //             <p><strong>Status:</strong> ${book.read}</p>
    //             <button class="remove-book-btn">Remove</button>
    //             <button class="toggle-read-btn">Toggle Read Status</button>
    //         </div>
    //     `;
    // }
    // bodyWrap.innerHTML = booksHTML;
    
    bodyWrap.innerHTML = myLibrary.map((book, index) => `
        <div class="book" data-index="${index}">
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Status:</strong> ${book.read}</p>
            <button class="remove-book-btn">Remove</button>
            <button class="toggle-read-btn">Toggle Read Status</button>
        </div>
    `).join('');

    document.querySelectorAll('.toggle-read-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            myLibrary[index].toggleReadStatus();
            displayBooks();
        });
    });

    document.querySelectorAll('.remove-book-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayBooks();
        });
    });
}

// Add a new book (this is a placeholder for testing

// document.getElementById('new-book-btn').addEventListener('click', () => {
//     const title = prompt('Enter the book title:');
//     const author = prompt('Enter the author:');
//     const pages = prompt('Enter the number of pages:');
//     const read = confirm('Have you read this book?') ? 'read' : 'not read yet';

//     addBookToLibrary(new Book(title, author, pages, read));
// });

// Event listeners for dialog and form
const dialog = document.getElementById('book-dialog');
const form = document.getElementById('book-form');
const newBookBtn = document.getElementById('new-book-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Open the dialog when "Add New Book" button is clicked
newBookBtn.addEventListener('click', () => dialog.showModal());

// Close the dialog when "Cancel" button is clicked
cancelBtn.addEventListener('click', () => dialog.close());

// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page

    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const read = form.read.value;

    addBookToLibrary(new Book(title, author, pages, read));

    form.reset(); // Reset the form fields
    dialog.close(); // Close the dialog
});

// Initial books (optional)
addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'read'));
addBookToLibrary(new Book('Knowing Wukong', 'Yukihiro Saito', 200, 'not read yet'));
addBookToLibrary(new Book('A Tale of Two Cities', 'Charles Dickens', 212, 'read'));
