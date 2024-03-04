const newEntryBtn = document.querySelector(".new-entry");
const dialog = document.querySelector(".dialog");
const allInputs = document.querySelectorAll("input");

const bookProto = {
    title: "",
    author: "", 
    pages: "",
    year: "",
    isRead: "",
    isReadToggle() {
        this.isRead === true ? this.isRead = false : this.isRead = true;
    }
}

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
];
                                                                 /// SETUP
myLibrary.forEach(item => {                                      /// make sure the starting books have same protoype as new ones
    Object.setPrototypeOf(item, bookProto)
    console.log(item)
})
renderBooks(myLibrary);
///////////

function addBookToLibrary() {
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const pages = parseInt(document.querySelector("#pages").value)
    const year = parseInt(document.querySelector("#year").value)
    
    if (title !== "" && author !== "") {
        let isRead = document.querySelector("#isRead")
        isRead.checked ? isRead = true : isRead = false
    
        let newBook = Object.create(bookProto)
    
        newBook.title = title;
        newBook.author = author;
        newBook.pages = pages;
        newBook.year = year;
        newBook.isRead = isRead;
        
        myLibrary.push(newBook);
        console.log(myLibrary)////
    }
}

function clearForm() {
    let title = document.querySelector("#title")
    let author = document.querySelector("#author")
    let pages = document.querySelector("#pages")
    let year = document.querySelector("#year")
    let isRead = document.querySelector("#isRead")
    
        title.value = ""
        author.value = ""
        pages.value = ""
        year.value = ""
        isRead.checked = false;
}

allInputs.forEach(input =>
    addEventListener("click", function(event) {
        switch (event.target.getAttribute("id")) {
            case "new-entry":
                dialog.showModal()
                toggleRequiredAttribute();//
                console.log("opening box")////
                break;
            case "close":
                toggleRequiredAttribute()
                dialog.close();//
                clearForm();
                console.log("closed and cleared")////
                break;
            case "submit":
                let myLibraryOld = {}
                myLibraryOld = structuredClone(myLibrary)
                addBookToLibrary()

                if (myLibrary.length !== myLibraryOld.length) {
                    renderBooks(myLibrary)
                    clearForm()
                    toggleRequiredAttribute()
                    dialog.close()
                }
                
                break;
        }
        event.stopImmediatePropagation()
}))


function renderBooks (array) {
    const container = document.querySelector(".container-main");
    const oldBookGrid = document.querySelector(".book-grid");
    container.removeChild(oldBookGrid)

    const bookGrid = document.createElement("div");
    bookGrid.setAttribute("class", "book-grid");

    array.forEach((book, index) => {
        const bookEl = document.createElement("div");
        bookEl.setAttribute("class", "book");
        bookEl.setAttribute("data-", index);

        for (const [key, value] of Object.entries(book)) {
            if (key === "isRead") {
                const isReadEl = document.createElement("input");
                isReadEl.setAttribute("class", "is-read");
                isReadEl.setAttribute("type", "checkbox");    
                if (value === true) {
                    isReadEl.checked = true;
                }
                isReadEl.addEventListener("click", () => {
                    book.isReadToggle();
                    console.log(myLibrary)
                })
                bookEl.appendChild(isReadEl);

            } else {           
                const infoEl = document.createElement("p")
                infoEl.setAttribute("class", key)
                infoEl.textContent = value
                bookEl.appendChild(infoEl)
            }
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class", "delete");

        deleteBtn.addEventListener("click", () => {
            const bookIndex = parseInt(bookEl.getAttribute("data-"));
            myLibrary.splice(bookIndex, 1);
            renderBooks(myLibrary)
            console.log(myLibrary)////////
            
        })

        bookEl.appendChild(deleteBtn);

        bookGrid.appendChild(bookEl);
    })///
    
    container.appendChild(bookGrid);
}

function toggleRequiredAttribute() {
    let titleInput = document.querySelector("#title");
    let authorInput = document.querySelector("#author");

    titleInput.toggleAttribute("required")
    authorInput.toggleAttribute("required")

    console.log(titleInput.hasAttribute("required"))//
}