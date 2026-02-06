import PointInDiv from "./PointInDiv.js"
const header = document.querySelector("header")
const menuButtonsHeader = document.querySelectorAll(".menuButton.headerButton")
const menuButtonsFooter = document.querySelectorAll(".menuButton.footerButton")
const footer = document.querySelector("footer")
const coloredElements = document.querySelectorAll(".coloredText")
const reelGrid = document.querySelector(".reelGrid")


var pointInDivHeader = new PointInDiv(5, 10, 20, (243,243,243),(219,219,219), header)
var pointInDivFooter = new PointInDiv(5, 10, 20, (243,243,243),(219,219,219), footer)
var pointInDivReelGrid = new PointInDiv(5, 20, 40, (243,243,243),(219,219,219), reelGrid)
var currentActiveDivPoint


var previousMousePositionX = 0
var previousMousePositionY = 0

const colors = ["rgb(16, 196, 177)",
                "rgb(195, 81, 220)",
                "rgb(244, 163, 223)",
                "rgb(23, 122, 241)",
                "rgb(130, 207, 208)",
                "rgb(130, 207, 208)",
                "rgb(170, 70, 128)",
                "rgb(233, 99, 1)",
                "rgb(197, 64, 158)",
                "rgb(112, 228, 101)",
                "rgb(205, 75, 125)",
                "rgb(125, 74, 233)",
                "rgb(8, 144, 122)",
                "rgb(205, 0, 51)",
                "rgb(186, 162, 253)",]

var pickedColors = []

// Audio function




Init()



function Init(){

    //add event enter on Menu Buttons
    for (let i = 0; i< menuButtonsHeader.length; i++){
        menuButtonsHeader[i].addEventListener("mouseenter", MouseEnteredButtonHeader)
        menuButtonsHeader[i].addEventListener("mouseleave", MouseLeftButtonHeader)
    }

    for (let i = 0; i< menuButtonsFooter.length; i++){
        menuButtonsFooter[i].addEventListener("mouseenter", MouseEnteredButtonFooter)
        menuButtonsFooter[i].addEventListener("mouseleave", MouseLeftButtonFooter)
    }
    document.addEventListener('mousemove', StopCanvaIfMouseStopped)


    header.addEventListener('mouseenter',MouseEnteredHeader)
    header.addEventListener('mouseleave',MouseLeftHeader)

    footer.addEventListener("mouseenter", MouseEnteredFooter)
    footer.addEventListener("mouseleave", MouseLeftFooter)

    reelGrid.addEventListener("mouseenter", MouseEnteredReelGrid)
    reelGrid.addEventListener("mouseleave", MouseLeftReelGrid)

    var rndColor = GetRandomColor(colors);
    ChangeElementsColor(coloredElements, rndColor)

}

function StopCanvaIfMouseStopped(e)
{
    

    if(Math.abs(e.clientX - previousMousePositionX) > 2 ||Math.abs(e.clientY - previousMousePositionY) > 2)
    {
        previousMousePositionX = e.clientX;
        previousMousePositionY = e.clientY
        if(currentActiveDivPoint != undefined)
        {
            currentActiveDivPoint.activate()
        }
        
    } else
    {
        setTimeout(()=> 
        {
            if(currentActiveDivPoint != undefined && !currentActiveDivPoint.isButtonHovered)
            {
                currentActiveDivPoint.desactivate()
            }
        }, 500)
    }
}

// Header Interaction
function MouseEnteredHeader(){
    pointInDivHeader.activate()
    currentActiveDivPoint = pointInDivHeader;
    pointInDivHeader.areCirclesFollowMouse = true;
}

function MouseLeftHeader(){
    pointInDivHeader.areCirclesFollowMouse = false;
    pointInDivHeader.resetCirclesPosition();
    pointInDivHeader.resetCirclesColor();
    currentActiveDivPoint = undefined;
    pointInDivHeader.desactivate();
}

function MouseEnteredButtonHeader(e){
    //header
    pointInDivHeader.areCirclesHopping = true
    pointInDivHeader.isButtonHovered = true

    var rndColor = GetRandomColor(colors);
    e.target.style.backgroundColor = rndColor;
    ChangeElementsColor(coloredElements, rndColor)
    localp5.PlayButtonHoverAudio(localp5)
}

function MouseLeftButtonHeader(e){
    //header
    pointInDivHeader.resetCirclesColor();
    pointInDivHeader.areCirclesHopping = false;
    pointInDivHeader.isButtonHovered = false;

    //footer
    pointInDivFooter.resetCirclesColor();
    pointInDivFooter.resetCirclesPosition();
    pointInDivFooter.areCirclesHopping = false
    pointInDivFooter.areCirclesFollowMouse = false
    
    e.target.style.backgroundColor = "white";
}

//Reel Grid
function MouseEnteredReelGrid(){
    pointInDivReelGrid.activate()
    pointInDivReelGrid.areCirclesFollowMouse = true;;

}

function MouseLeftReelGrid(){
    pointInDivReelGrid.areCirclesFollowMouse = false;
    pointInDivReelGrid.resetCirclesPosition();
    pointInDivReelGrid.resetCirclesColor();
    pointInDivReelGrid.desactivate();
}


//Footer Interaction
function MouseEnteredFooter(){
    currentActiveDivPoint = pointInDivFooter;
    pointInDivFooter.areCirclesFollowMouse = true;
    pointInDivFooter.activate()
}

function MouseLeftFooter(){
    pointInDivFooter.areCirclesFollowMouse = false;
    pointInDivFooter.resetCirclesPosition();
    pointInDivFooter.desactivate()
    currentActiveDivPoint = undefined
    pointInDivFooter.resetCirclesColor();
}

function MouseEnteredButtonFooter(e){
    //footer
    pointInDivFooter.areCirclesHopping = true
    pointInDivFooter.isButtonHovered = true


    var rndColor = GetRandomColor(colors);
    e.target.style.backgroundColor = rndColor;
    
    ChangeElementsColor(coloredElements, rndColor)
}

function MouseLeftButtonFooter(e){
    //footer
    pointInDivFooter.areCirclesHopping = false
    pointInDivFooter.isButtonHovered = false

    e.target.style.backgroundColor = "white"
}

// Tool functions

function GetRandomColor(pool){
    var isNewColorFound = false
    
    
    while (!isNewColorFound) {
        var index = GetRandomInt(pool.length)   
        if(!pickedColors.includes(index))
        {
            pickedColors.push(index)
            isNewColorFound = true
        }
    }
    var color = pool[index];
    if(pickedColors.length > pool.length - 3)
    {
        pickedColors = []
    }
    return color
}

function GetRandomInt(max){
    var value = Math.floor(Math.random() * max)
    return value
}

function ChangeElementsColor(Elements, color){
    console.log(color)
    for (let i = 0; i < Elements.length; i++) {
        const element = Elements[i];
        element.style.color = color
        element.style.fill = color
        
    }
}

