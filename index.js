const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

openModalBtn.addEventListener("click", () => modal.showModal());
closeModalBtn.addEventListener("click", () => modal.close());

const library = [
  new Book("1984", "George Orwell", "Secker & Warburg", 328, true),
  new Book(
    "To Kill a Mockingbird",
    "Harper Lee",
    "J.B. Lippincott & Co.",
    281,
    false
  ),
  new Book(
    "The Great Gatsby",
    "F. Scott Fitzgerald",
    "Charles Scribner's Sons",
    180,
    true
  ),
  new Book(
    "One Hundred Years of Solitude",
    "Gabriel Garcia Marquez",
    "Harper & Row",
    417,
    false
  ),
  new Book("Moby Dick", "Herman Melville", "Harper & Brothers", 635, true),
];

function addBookToLibrary(newBook) {
  library.unshift(newBook);
  displayBooks();
}

function removeBookInLibrary(index) {
  library.splice(index, 1);
  displayBooks();
}

function Book(title, author, publishingHouse, numberOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.publishingHouse = publishingHouse;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

function createOperationCell(book) {
  const cell = document.createElement("td");
  cell.classList.add("operationCell");

  const statusBtn = document.createElement("button");
  statusBtn.id = "statusBtn";
  statusBtn.innerText = book.isRead ? "Read" : "Not Read";
  statusBtn.classList.toggle("read", book.isRead);
  statusBtn.classList.toggle("not-read", !book.isRead);
  statusBtn.addEventListener("click", function () {
    book.toggleReadStatus();
    displayBooks();
  });

  const removeBtn = document.createElement("button");
  removeBtn.id = "removeBtn";
  removeBtn.innerText = "Remove";
  removeBtn.addEventListener("click", function (event) {
    const rowIndex = event.currentTarget.closest("tr").dataset.index;
    removeBookInLibrary(rowIndex);
  });

  cell.appendChild(statusBtn);
  cell.appendChild(removeBtn);

  return cell;
}

function createTableCell(text) {
  const cell = document.createElement("td");
  cell.innerText = text;
  return cell;
}

function createTableRow(book, index) {
  const tableRow = document.createElement("tr");
  tableRow.dataset.index = index;

  tableRow.appendChild(createTableCell(book.title));
  tableRow.appendChild(createTableCell(book.author));
  tableRow.appendChild(createTableCell(book.publishingHouse));
  tableRow.appendChild(createTableCell(book.numberOfPages));
  tableRow.appendChild(createOperationCell(book));

  return tableRow;
}

const tbodyEl = document.querySelector("tbody");
const emptyMessageEl = document.getElementById("emptyMessage");
function displayBooks() {
  tbodyEl.innerHTML = "";

  if (library.length === 0) {
    emptyMessageEl.style.display = "block";
  } else {
    emptyMessageEl.style.display = "none";
    library.forEach((book, index) => {
      const tableRow = createTableRow(book, index);
      tbodyEl.appendChild(tableRow);
    });
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const publishingHouse = document.getElementById("publishingHouse").value;
  const numberOfPages = document.getElementById("numberOfPages").value;
  const isRead = document.getElementById("isRead").checked;

  const newBook = new Book(
    title,
    author,
    publishingHouse,
    parseInt(numberOfPages),
    isRead
  );

  addBookToLibrary(newBook);

  form.reset();

  modal.close();
});

displayBooks();
