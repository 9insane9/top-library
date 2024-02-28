const newEntryBtn = document.querySelector(".new-entry");
const dialog = document.querySelector(".dialog");
const allInputs = document.querySelectorAll("input");

const book = {
    title: "",
    author: "", 
    pages: "",
    year: "",
    isRead: "",
    isReadToggle() {
        this.isRead === true ? this.isRead === false : this.isRead === true;
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

function addBookToLibrary() {
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const pages = parseInt(document.querySelector("#pages").value)
    const year = parseInt(document.querySelector("#year").value)
    
    let isRead = document.querySelector("#isRead")
    isRead.checked ? isRead = true : isRead = false

    let newBook = Object.create(book)

    newBook.title = title;
    newBook.author = author;
    newBook.pages = pages;
    newBook.year = year;
    newBook.isRead = isRead;
    
    myLibrary.push(newBook);
    console.log(myLibrary)


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
                dialog.showModal();
                console.log("opening box")
                break;
            case "close":
                dialog.close();
                console.log("closed")
                break;
            case "submit":
                addBookToLibrary()
                clearForm()
                break;
        }
        event.stopImmediatePropagation()
}))


