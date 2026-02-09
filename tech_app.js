import PointInDiv from "./PointInDiv.js"
const header = document.querySelector("header")
const menuButtonsHeader = document.querySelectorAll(".menuButton.headerButton")
const projectLabels = document.querySelectorAll(".label")
const menuButtonsFooter = document.querySelectorAll(".menuButton.footerButton")
const footer = document.querySelector("footer")
const project1 = document.getElementById("project1")
const project2 = document.getElementById("project2")
const project3 = document.getElementById("project3")
const project4 = document.getElementById("project4")
const coloredElements = document.querySelectorAll(".coloredText")
var lastRndColor = "rgb(255, 146, 50)"



var pointInDivHeader = new PointInDiv(5, 10, 20, (243,243,243),(219,219,219), header)
var pointInDivProject1 = new PointInDiv(5, 20, 40, (243,243,243),(219,219,219), project1)
var pointInDivProject2 = new PointInDiv(5, 20, 40, (243,243,243),(219,219,219), project2)
var pointInDivProject3 = new PointInDiv(5, 20, 40, (243,243,243),(219,219,219), project3)
var pointInDivProject4 = new PointInDiv(5, 20, 40, (243,243,243),(219,219,219), project4)
var pointInDivFooter = new PointInDiv(5, 10, 20, (243,243,243),(219,219,219), footer)
var currentActiveDivPoint


var previousMousePositionX = 0
var previousMousePositionY = 0

var isOverlayDisplayed = false
var overlay = document.querySelector(".overlay")
const ambienceVideoTrigger = document.getElementById("videoAmbienceTrigger")
const videoTriggers = document.querySelectorAll(".videoTrigger")
const videoCross = document.querySelector(".videoCross")
var currentDisplayedVideo

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

// p5 = new p5(function(p5)
// {
//     p5.setup = function(p5) 
//     {
//         LoadAudioFiles(p5)
//     }

//     function LoadAudioFiles(p5)
//     {
//         OnButtonHoverAudio = p5.loadSound('//Assets/Sounds/Button__Hover.mp3')
//     }

//     function PlayButtonHoverAudio(p5)
//     {
//         OnButtonHoverAudio.localp5.play();
//     }

// })


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

    for (let i = 0; i < videoTriggers.length; i++) {
        videoTriggers[i].addEventListener("click", HandleOverlayDisplay)
    }
    document.addEventListener('mousemove', StopCanvaIfMouseStopped)
    console.log(videoCross)
    
    
    header.addEventListener('mouseenter',MouseEnteredHeader)
    header.addEventListener('mouseleave',MouseLeftHeader)
    
    footer.addEventListener("mouseenter", MouseEnteredFooter)
    footer.addEventListener("mouseleave", MouseLeftFooter)
    
    project1.addEventListener("mouseenter", MouseEnteredProject1)
    project1.addEventListener("mouseleave", MouseLeftProject1)
    
    project2.addEventListener("mouseenter", MouseEnteredProject2)
    project2.addEventListener("mouseleave", MouseLeftProject2)

    project3.addEventListener("mouseenter", MouseEnteredProject3)
    project3.addEventListener("mouseleave", MouseLeftProject3)

    project4.addEventListener("mouseenter", MouseEnteredProject4)
    project4.addEventListener("mouseleave", MouseLeftProject4)

    videoCross.addEventListener('click', HandleOverlayDisplay)
    ambienceVideoTrigger.addEventListener("click",()=> {
        var ambienceVideo = document.getElementById("ambianceVideo")
        ambienceVideo.classList.add("show")
        currentDisplayedVideo = ambienceVideo
    })

    var rndColor = GetRandomColor(colors);
    lastRndColor = rndColor
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
    lastRndColor = rndColor
    ChangeElementsColor(coloredElements, rndColor)
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

//projects

function MouseEnteredProject1(){
    pointInDivProject1.activate();
    pointInDivProject1.areCirclesFollowMouse = true;
}

function MouseLeftProject1(){
    pointInDivProject1.areCirclesFollowMouse = false;
    pointInDivProject1.resetCirclesColor()
    pointInDivProject1.resetCirclesPosition()
    pointInDivProject1.desactivate();
}

function MouseEnteredProject2(){
    pointInDivProject2.activate();
    pointInDivProject2.areCirclesFollowMouse = true;
}

function MouseLeftProject2(){
    pointInDivProject2.areCirclesFollowMouse = false;
    pointInDivProject2.resetCirclesColor()
    pointInDivProject2.resetCirclesPosition()
    pointInDivProject2.desactivate();
}

function MouseEnteredProject3(){
    pointInDivProject3.activate();
    pointInDivProject3.areCirclesFollowMouse = true;
}

function MouseLeftProject3(){
    pointInDivProject3.areCirclesFollowMouse = false;
    pointInDivProject3.resetCirclesColor()
    pointInDivProject3.resetCirclesPosition()
    pointInDivProject3.desactivate();
}

function MouseEnteredProject4(){
    pointInDivProject4.activate();
    pointInDivProject4.areCirclesFollowMouse = true;
}

function MouseLeftProject4(){
    pointInDivProject4.areCirclesFollowMouse = false;
    pointInDivProject4.resetCirclesColor()
    pointInDivProject4.resetCirclesPosition()
    pointInDivProject4.desactivate();
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
    lastRndColor = rndColor
    
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
}

function HandleOverlayDisplay() {
    console.log(isOverlayDisplayed)

    if(isOverlayDisplayed){
        overlay.style.display = "none"
        isOverlayDisplayed = false;
        currentDisplayedVideo.classList.remove("show")
        return;


    }

    if(!isOverlayDisplayed){
        overlay.style.display = "block"
        isOverlayDisplayed = true;
        return;

    }
    
}

