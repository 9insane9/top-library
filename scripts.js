const newEntryBtn = document.querySelector(".new-entry")
const dialog = document.querySelector(".dialog")
const allInputs = document.querySelectorAll("input")

const myLibrary = [
  {
    title: "How to Fry an Egg",
    author: "Lewis Brindley",
    pages: 213,
    year: 2025,
    isRead: false,
  },
  {
    title: "How to Fry another Egg",
    author: "Lewis Brindley",
    pages: 289,
    year: 2027,
    isRead: false,
  },
  {
    title: "How to Fry",
    author: "Lewis Brindley",
    pages: 13,
    year: 2028,
    isRead: true,
  },
]

renderBooks(myLibrary)

class Book {
  constructor() {
    this.title = document.querySelector("#title").value
    this.author = document.querySelector("#author").value
    this.pages = parseInt(document.querySelector("#pages").value)
    this.year = parseInt(document.querySelector("#year").value)
    this.isRead = document.querySelector("#isRead").checked
  }

  isReadToggle() {
    this.isRead = !this.isRead
  }
}

function clearForm() {
  document.querySelector("#title").value = ""
  document.querySelector("#author").value = ""
  document.querySelector("#pages").value = ""
  document.querySelector("#year").value = ""
  document.querySelector("#isRead").checked = false
}

allInputs.forEach((input) => {
  input.addEventListener("input", function () {
    this.setCustomValidity("")
    this.checkValidity()
  })
})

document.addEventListener("click", function (event) {
  switch (event.target.getAttribute("id")) {
    case "entry-icon":
      dialog.showModal()
      toggleRequiredAttribute()
      console.log("opening box")
      break
    case "closeIcon":
      toggleRequiredAttribute()
      dialog.close()
      clearForm()
      console.log("closed and cleared")
      break
    case "submit":
      event.preventDefault()

      if (checkIfValid()) {
        let myLibraryOld = structuredClone(myLibrary)
        myLibrary.push(new Book())

        if (myLibrary.length !== myLibraryOld.length) {
          renderBooks(myLibrary)
          clearForm()
          toggleRequiredAttribute()
          dialog.close()
        }
      } else {
        document.querySelector("#title").reportValidity()
        document.querySelector("#author").reportValidity()
      }
      break
  }
  event.stopImmediatePropagation()
})

function renderBooks(array) {
  const container = document.querySelector(".container-main")
  const oldBookGrid = document.querySelector(".book-grid")
  container.removeChild(oldBookGrid)

  const bookGrid = document.createElement("div")
  bookGrid.setAttribute("class", "book-grid")

  array.forEach((book, index) => {
    const bookEl = document.createElement("div")
    bookEl.setAttribute("class", "book")
    bookEl.setAttribute("data-", index)

    for (const [key, value] of Object.entries(book)) {
      if (key === "isRead") {
        const isReadLabelEl = document.createElement("p")
        const isReadBoxEl = document.createElement("input")

        isReadLabelEl.textContent = "Read"
        isReadLabelEl.setAttribute("class", "read-label")

        isReadBoxEl.setAttribute("class", "is-read")
        isReadBoxEl.setAttribute("type", "checkbox")

        if (value === true) {
          isReadBoxEl.checked = true
        }
        isReadBoxEl.addEventListener("click", () => {
          book.isReadToggle()
          console.log(myLibrary)
        })

        isReadLabelEl.appendChild(isReadBoxEl)
        bookEl.appendChild(isReadLabelEl)
      } else {
        const infoEl = document.createElement("p")
        infoEl.setAttribute("class", key)
        infoEl.textContent = value
        bookEl.appendChild(infoEl)

        if (infoEl.textContent === "NaN") {
          infoEl.textContent = "-"
        }

        if (key === "pages" && infoEl.textContent !== "-") {
          infoEl.textContent += " pages"
        }

        if (key === "author") {
          infoEl.textContent = "by " + infoEl.textContent
        }
      }
    }

    const deleteBtn = document.createElement("button")
    deleteBtn.setAttribute("class", "delete")

    const deleteIcon = document.createElement("img")
    deleteIcon.setAttribute("class", "deleteIcon")

    deleteIcon.addEventListener("click", () => {
      const bookIndex = parseInt(bookEl.getAttribute("data-"))
      myLibrary.splice(bookIndex, 1)
      renderBooks(myLibrary)
      console.log(myLibrary)
    })

    deleteBtn.appendChild(deleteIcon)

    bookEl.appendChild(deleteBtn)

    bookGrid.appendChild(bookEl)
  })

  container.appendChild(bookGrid)
}

function toggleRequiredAttribute() {
  let titleInput = document.querySelector("#title")
  let authorInput = document.querySelector("#author")

  titleInput.toggleAttribute("required")
  authorInput.toggleAttribute("required")

  console.log(`fields required ${titleInput.hasAttribute("required")}`) //
}

function checkIfValid() {
  const title = document.querySelector("#title")
  const author = document.querySelector("#author")

  if (title.validity.valueMissing) {
    title.setCustomValidity("Silly goose, a book must have a title")
    return false
  }

  if (author.validity.valueMissing) {
    author.setCustomValidity("Surely someone wrote the book")
    return false
  }

  return true
}
