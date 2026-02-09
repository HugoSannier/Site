import PointInDiv from "./PointInDiv.js"
const header = document.querySelector("header")
const menuButtonsHeader = document.querySelectorAll(".menuButton.headerButton")
const menuButtonsFooter = document.querySelectorAll(".menuButton.footerButton")
const projectLabels = document.querySelectorAll(".label")
const footer = document.querySelector("footer")
const coloredElements = document.querySelectorAll(".coloredText")
const game1 = document.getElementById("game1")
const game2 = document.getElementById("game2")
const game3 = document.getElementById("game3")
const game4 = document.getElementById("game4")
const game5 = document.getElementById("game5")
var lastRndColor = "rgb(255, 146, 50)"



var pointInDivHeader = new PointInDiv(5, 10, 20, (243,243,243),(219,219,219), header)
var pointInDivGame1 = new PointInDiv(5, 20, 40, (243,243,243),(219,219,219), game1)
var pointInDivGame2 = new PointInDiv(5, 20, 40, (243,243,243),(219,219,219), game2)
var pointInDivGame3 = new PointInDiv(5, 20, 40, (243,243,243),(219,219,219), game3)
var pointInDivGame4 = new PointInDiv(5, 20, 40, (243,243,243),(219,219,219), game4)
var pointInDivGame5 = new PointInDiv(5, 20, 40, (243,243,243),(219,219,219), game5)
var pointInDivFooter = new PointInDiv(5, 10, 20, (243,243,243),(219,219,219), footer)
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

p5 = new p5(function(p5)
{
    p5.setup = function(p5) 
    {
        LoadAudioFiles(p5)
    }

    function LoadAudioFiles(p5)
    {
        OnButtonHoverAudio = p5.loadSound('//Assets/Sounds/Button__Hover.mp3')
    }

    function PlayButtonHoverAudio(p5)
    {
        OnButtonHoverAudio.localp5.play();
    }

})


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

    for (let i = 0; i < projectLabels.length; i++) {
        projectLabels[i].addEventListener('mouseenter',MouseEnteredProjectLabel)
        projectLabels[i].addEventListener('mouseleave',MouseLeftProjectLabel)
        
    }
    document.addEventListener('mousemove', StopCanvaIfMouseStopped)


    header.addEventListener('mouseenter',MouseEnteredHeader)
    header.addEventListener('mouseleave',MouseLeftHeader)

    game1.addEventListener('mouseenter', MouseEnteredGame1)
    game1.addEventListener('mouseleave', MouseLeftGame1)

    game2.addEventListener('mouseenter', MouseEnteredGame2)
    game2.addEventListener('mouseleave', MouseLeftGame2)

    game3.addEventListener('mouseenter', MouseEnteredGame3)
    game3.addEventListener('mouseleave', MouseLeftGame3)

    game4.addEventListener('mouseenter', MouseEnteredGame4)
    game4.addEventListener('mouseleave', MouseLeftGame4)

    game5.addEventListener('mouseenter', MouseEnteredGame5)
    game5.addEventListener('mouseleave', MouseLeftGame5)
    

    footer.addEventListener("mouseenter", MouseEnteredFooter)
    footer.addEventListener("mouseleave", MouseLeftFooter)

    var rndColor = GetRandomColor(colors);
    ChangeElementsColor(coloredElements, rndColor)

    window.addEventListener("resize", ResizeCanvas)
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

function MouseEnteredGame1(){
    pointInDivGame1.areCirclesFollowMouse = true;
    pointInDivGame1.activate()
}

function MouseLeftGame1(){
    pointInDivGame1.resetCirclesColor();
    pointInDivGame1.resetCirclesPosition();
    pointInDivGame1.areCirclesFollowMouse = false;
    pointInDivGame1.desactivate()
}

function MouseEnteredGame2(){
    pointInDivGame2.areCirclesFollowMouse = true;
    pointInDivGame2.activate()
}

function MouseLeftGame2(){
    pointInDivGame2.resetCirclesColor();
    pointInDivGame2.resetCirclesPosition();
    pointInDivGame2.areCirclesFollowMouse = false;
    pointInDivGame2.desactivate()
}

function MouseEnteredGame3(){
    pointInDivGame3.areCirclesFollowMouse = true;
    pointInDivGame3.activate()
}

function MouseLeftGame3(){
    pointInDivGame3.resetCirclesColor();
    pointInDivGame3.resetCirclesPosition();
    pointInDivGame3.areCirclesFollowMouse = false;
    pointInDivGame3.desactivate()
}

function MouseEnteredGame4(){
    pointInDivGame4.areCirclesFollowMouse = true;
    pointInDivGame4.activate()
}

function MouseLeftGame4(){
    pointInDivGame4.resetCirclesColor();
    pointInDivGame4.resetCirclesPosition();
    pointInDivGame4.areCirclesFollowMouse = false;
    pointInDivGame4.desactivate()
}

function MouseEnteredGame5(){
    pointInDivGame5.areCirclesFollowMouse = true;
    pointInDivGame5.activate()
}

function MouseLeftGame5(){
    pointInDivGame5.resetCirclesColor();
    pointInDivGame5.resetCirclesPosition();
    pointInDivGame5.areCirclesFollowMouse = false;
    pointInDivGame5.desactivate()
}

function MouseEnteredProjectLabel(e) {
    e.target.style.backgroundColor = lastRndColor;
}

function MouseLeftProjectLabel(e){
    e.target.style.backgroundColor = "white";
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

function ResizeCanvas(){

    location.reload()
}

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
    lastRndColor = color
}

