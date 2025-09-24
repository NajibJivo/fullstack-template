window.addEventListener("DOMContentLoaded", initApp);

const BASE_URL = "http://localhost:8080";
const BOOKS_URL = `${BASE_URL}/api/books`;

// === Sort globals ===
let currentSortKey = "id";
let isAscending = true;


// ===== Entry Point =====
function initApp() {
    reloadAndRender();
    setupEventListeners();
}

// ===== Utility Functions =====

function setupEventListeners() {
    const tableBody = document.querySelector("#book-table-body");
    tableBody.addEventListener("click", handleTableClick);
    const form = document.querySelector("#book-form");
    form.addEventListener("submit", handleFormSubmit);

    document.querySelector("thead").addEventListener("click", handleSortClick);
}

async function reloadAndRender() {
    const books = await getBooks();

    // SORT HERE
    // const sortedBooks = books.sort();
    const sortedBooks = books.sort(sortBy(currentSortKey, isAscending));
    renderTable(sortedBooks);

    updateSortIndicator();

}

function updateSortIndicator() {
    const thElems = document.querySelectorAll("th[data-label]");
    thElems.forEach(el => {
        el.textContent = el.getAttribute("data-label");
        if (el.getAttribute("data-key") === currentSortKey) {
            if (isAscending) {
                el.textContent += "\u25B2";
            } else {
                el.textContent += "\u25BC";
            }
        }
    });
}

// <th data-key="id" data-label="ID">ID ▲</th>

// ascending: ▲ (`\u25B2`)
// descending: ▼ (`\u25BC`)

function sortBy(key, isAsc) {
    return (a, b) => {
        const aKey = a[key];
        const bKey = b[key];

        if (typeof aKey === "number" && typeof bKey === "number") {
            return isAsc ? aKey - bKey : bKey - aKey;
        }

        return isAsc ? aKey.localeCompare(bKey) : bKey.localeCompare(aKey);

    };
}

// ===== Event handlers =====

async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const book = {
        title: formData.get("title"),
        author: formData.get("author"),
        isbn: formData.get("isbn")
    };
    if (formData.get("id")) {
        // Update existing book
        await updateBook(formData.get("id"), book);
    } else {
        // Create new book
        await createBook(book);
    }
    form.reset();
    await reloadAndRender();
}

async function handleTableClick(event) {
    const target = event.target;
    if (target.classList.contains("edit-button")) {
        const row = target.closest("tr");
        const bookId = row.getAttribute("data-id");
        // console.log(`Edit book with ID: ${bookId}`);
        const bookToUpdate = {
            id: bookId,
            title: row.children[1].textContent,
            author: row.children[2].textContent,
            isbn: row.children[3].textContent
        };
        fillBookEditForm(bookToUpdate);
    } else if (target.classList.contains("delete-button")) {
        const row = target.closest("tr");
        const bookId = row.getAttribute("data-id");
        await deleteBook(bookId);
    }
    await reloadAndRender();
}

async function handleSortClick(event) {
    const th = event.target.closest("th");
    if (th === null | th === undefined) {
        return;
    }

    const key = th.getAttribute("data-key");

    if (!key) {
        return;
    }

    if (key === currentSortKey) {
        isAscending = !isAscending;
    } else {
        currentSortKey = key;
        isAscending = true;
    }
    await reloadAndRender();
}

// ===== Rendering =====

function renderTable(books) {
    const tableBody = document.querySelector("#book-table-body");
    tableBody.innerHTML = "";
    books.forEach(renderRow);
}

function renderRow(book) {
    const tableBody = document.querySelector("#book-table-body");
    const html = /*html*/ `
        <tr data-id="${book.id}">
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </td>
        </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", html);
}


function fillBookEditForm(book) {
    document.querySelector("#id").value = book.id;
    document.querySelector("#title").value = book.title;
    document.querySelector("#author").value = book.author;
    document.querySelector("#isbn").value = book.isbn;
}

// ===== API - CRUD operations =====
async function getBooks() {
    const response = await fetch(BOOKS_URL);
    const books = await response.json();
    return books;
}

async function deleteBook(id) {
    const response = await fetch(`${BOOKS_URL}/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.status = response.status;
        error.statusText = response.statusText;
        error.url = response.url;
        throw error;
    }
    return;
}

async function createBook(book) {
    const response = await fetch(BOOKS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(book)
    });
    if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.status = response.status;
        error.statusText = response.statusText;
        error.url = response.url;
        throw error;
    }
    const createdBook = await response.json();
    return createdBook;
}

async function updateBook(id, book) {
    const response = await fetch(`${BOOKS_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(book)
    });
    if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.status = response.status;
        error.statusText = response.statusText;
        error.url = response.url;
        throw error;
    }
    const updatedBook = await response.json();
    return updatedBook;
}