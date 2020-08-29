import {Book} from './Book.js';
/**
 * Library Book Browser Scene
 */
export class Library{
    /**
     * Initializes the game with visual components.
     */

    libraryContainer = document.createElement("div"); //aka bookshelf
    books = document.createElement("div");
    shelf = document.createElement("div");
    bookObjects= [];

    constructor() {
        let left = document.createElement("div");
        let right = document.createElement("div");
        let reflect = document.createElement("div");

        this.shelf.classList.add("shelf");
        left.classList.add("bookend_left");
        right.classList.add("bookend_right");
        reflect.classList.add("reflection");

        this.shelf.appendChild(left);
        this.shelf.appendChild(right);
        this.shelf.appendChild(reflect);

        this.libraryContainer.setAttribute("id", "libraryContainer");
        this.libraryContainer.appendChild(this.shelf);
        this.addToLibrary([
        {title: "Lez Go!", imgSrc: "https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg"},
        {title: "Lemon Nation",imgSrc: "https://prodimage.images-bn.com/pimages/2940012449436_p0_v1_s550x406.jpg"},
        {title: "Trial of Fire", imgSrc: "https://images-na.ssl-images-amazon.com/images/I/41kxHZXkTfL.jpg"},
        {title: "Quantico",imgSrc: "https://cdn.shopify.com/s/files/1/0285/2821/4050/products/9780062877161.jpg?v=1597075765"}
        ])  

    }

    //consider using a queue
    addToLibrary(books){ 
        this.books.classList.add("books");
        for(let i = 0; i < books.length; i++)
        {
            let gw = new Book(books[i]["title"], books[i]["imgSrc"]);
            gw.setProgress(70);
            this.bookObjects.push(gw);
            this.books.appendChild(gw.getBook());
        }
        
        this.libraryContainer.prepend(this.books);
    }

    removeAnimation(){
        for(let i = 0; i < this.bookObjects.length; i++){
            this.bookObjects[i].removeAnimation();
        }
    }

    clearLibrary(){
        //removes the bookshelf container, assume only one
        if(this.libraryContainer.lastChild){
            this.libraryContainer.removeChild(this.libraryContainer.lastChild);
        }
    }

    getLibrary(){
        return this.libraryContainer;
    }

}