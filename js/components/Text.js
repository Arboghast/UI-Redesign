/**
 * Text Viewer Scene
 */
export class Text {

  textContainer;
  text;
  interval;
  index;
  ranges;
  words;
  instance;
  pageFlip;
  

  constructor() {
    this.createTextContainer();
    this.textContainer.classList.add("text-container");
    
    this.instance = new Mark(this.text); //init Mark.js

    this.text.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget varius purus, nec rutrum nunc. Integer convallis diam ac lacus bibendum, sed eleifend neque iaculis. Sed ut libero accumsan, lobortis arcu et, venenatis eros. Phasellus eu tortor metus. Phasellus euismod nunc eu rhoncus mollis. Mauris faucibus eleifend feugiat. Morbi quam augue, finibus vel laoreet non, dictum a quam. Aliquam sit amet accumsan dui."
    console.log(this.textContainer);
  }

  //init page-flip.js
  loadPageFlipper(){
    this.pageFlip = new St.PageFlip(this.textContainer, { 
      width: 1200, //dimensions of the nest hub max display resolution
      height: 800,
      startPage: 1,
      useMouseEvents: false
    });
    this.pageFlip.loadFromHTML(document.querySelectorAll(".my-page"));
  }

  test(){
    this.loadPageFlipper();
    console.log(this.textContainer);
  }

  createTextContainer(){
    this.textContainer = document.createElement("div");
    this.textContainer.classList.add("text-container");
    this.textContainer.id = "book";
    let page1 = document.createElement("div");
    page1.classList.add("my-page");
    let page2 = document.createElement("div");
    page2.classList.add("my-page");

    let container = document.createElement("div");
    container.classList.add("contain");

    this.text = document.createElement("p");
    this.text.id = "special";
    this.text.classList.add("title"); //testing

    container.appendChild(this.text);
    page2.appendChild(container);
    this.textContainer.appendChild(page1);
    this.textContainer.appendChild(page2);
  }

  flip() {
    this.pageFlip.turnToPrevPage();
    this.pageFlip.flipNext({ corner: "top" });
  }

  setText(newText) {
    this.text.innerText = newText;
  }

  setRanges(newRanges){
      this.index = 0;
      this.ranges = newRanges;
  }

  setWords(newWords){
      this.words = newWords;
  }

  startHighlighting() {
    this.interval = setInterval(() => {
        if(this.ranges[this.index]["length"] > this.ranges[this.index]["chars"])
        {
          this.index++;
          if(this.index >= this.ranges.length)
          {
            clearInterval(this.interval);
          }
        }
        else{
          this.ranges[this.index]["length"] += 1;
          this.highlight();
        }
      }, 50);
  }

  highlight() {
    this.instance.unmark();
    this.instance.markRanges(this.ranges);
    for (let i = 0; i < this.words.length; i++) {
      this.instance.mark(this.words[i], { className: "red-highlight" });
    }
  }

  clearHighlights(){
      this.instance.unmark();
  }

  getText() {
    return this.textContainer;
  }

}