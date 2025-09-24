import { createBook, getBooks, updateBook, deleteBook } from "./api/booksApi.js";
import { sortBy } from "./utils/sortUtils.js";

window.addEventListener("DOMContentLoaded", initApp);

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