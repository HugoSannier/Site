import Circle from "./Circles.js"

export default class PointInDiv
{
  constructor(circleSize, circleGap, circleRange, backgroundColor, color, div)
  {
    const self = this;
    self.areCirclesFollowMouse = false;
    self.areCirclesHopping = false;
    self.circles = []
    self.isActivated = false;
    self.isButtonHovered = false;
    self.div = div
    
    
    this.p5 = new p5(function(p5)
    {
      const canvaSizeX = div.offsetWidth;
      const canvaSizeY = div.offsetHeight;

      p5.setup = function()
      {
        let canva = p5.createCanvas(canvaSizeX, canvaSizeY);
        FillWithCircle(p5, canvaSizeX, canvaSizeY, circleSize, circleGap, color)
        p5.noLoop()
        
      }

      p5.draw = function()
      {
        p5.background(backgroundColor);
        p5.strokeWeight(0)
        for (let i =0 ; i < self.circles.length; i++)
        {
          self.circles[i].Show(p5);
          if (self.areCirclesFollowMouse)
          {
            self.circles[i].FollowMousePosition(p5);
            if(!self.isButtonHovered)
              {
                self.circles[i].ChangeCircleColorAroundMouse(p5)
              }
            if(self.isButtonHovered)
            {
              self.circles[i].ChangeCircleColor(p5)

            }
          }

          if(self.areCirclesHopping)
          {
            self.circles[i].Hop(p5);
          }
        }
      }


      function FillWithCircle(p5, _areaX, _areaY, _circleSize, _circleGap, _color)
      {
        var _amountNeededX = p5.floor((_areaX - _circleGap/2) / (_circleSize + _circleGap));
        var _amountNeededY = p5.floor((_areaY - _circleGap/2) / (_circleSize + _circleGap));
        var _nextPositionX = _circleGap;
        var _nextPositionY = _circleGap;

        for (let j = 0; j <_amountNeededY ; j++){
          for (let i = 0; i <_amountNeededX ; i++)
          {

            var customCircle = new Circle(p5, _circleSize, _nextPositionX, _nextPositionY, _color, circleRange)
            _nextPositionX += _circleSize + _circleGap;
            self.circles.push(customCircle)
          }
          _nextPositionY += _circleSize + _circleGap;
          _nextPositionX = _circleGap;
        }
      } 

      
    }, div);    
  }

  
  SelfDestroy()
  {
    this.p5.removeElements()
    console.log("destroyed")

  }

  activate()
  {
    if(!this.isActivated)
    {
      this.p5.loop()
      this.isActivated = true
    }
  }

  desactivate()
  {
    if(this.isActivated)
    {
      this.p5.noLoop()
      this.isActivated = false
    }
  }

  resetCirclesColor() 
  {
    for(let i =0; i< this.circles.length; i++)
    {
      this.circles[i].RestorBaseColor()
    } 
  }

  resetCirclesPosition() 
  {
    for(let i =0; i< this.circles.length; i++)
    {
      this.circles[i].ResetPosition()
    } 
  }

  playSoundHover()
  {

  }

  
  
}








