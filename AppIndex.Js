const elements = [
document.querySelector(".About"),
document.querySelector(".Portfolio"),
document.querySelector(".Resume-EN"), 
document.querySelector(".Resume-FR"),
document.querySelector(".Portfolio_Button"),

];

elements.forEach(n => {
    n.addEventListener("mouseout", () => RemoveOverlineElement(n));
    n.addEventListener("mouseover", () => AddOverlineElement(n));
});

function AddOverlineElement(Element){
    Element.querySelector("img").classList.remove("Hidden");
    Element.querySelector("img").classList.add("Show");
}

function RemoveOverlineElement(Element){
    Element.querySelector("img").classList.remove("Show");
    Element.querySelector("img").classList.add("Hidden")    
}

