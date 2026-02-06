export default class Circle {
  constructor(p5, _size, _transformX, _transformY, _color, _boundarie){
    this._size = _size;
    this._transform = p5.createVector(_transformX, _transformY);
    this._color = _color;
    this._originalColor = _color;
    this._originalTransform = this._transform.copy();
    this._boundarie = _boundarie;
  }

  Show(p5)
  {
    p5.fill(this._color)
    p5.circle(this._transform.x, this._transform.y, this._size);

  }

  Hop(p5)
  {
    this._transform.x = this._transform.x + p5.random(-0.5,0.5)
    this._transform.y = this._transform.y + p5.random(-0.5,0.5)
  }

  FollowMousePosition(p5)
  {
    
    if(p5.dist(this._originalTransform.x, this._originalTransform.y, p5.mouseX, p5.mouseY) > 100)
    {
      if(this._transform != this._originalTransform)
      this._transform.x = this._originalTransform.x;
      this._transform.y = this._originalTransform.y;
      return;
    }
    
    if(p5.dist(this._originalTransform.x, this._originalTransform.y, p5.mouseX, p5.mouseY) < this._boundarie/2 - this._size/2 )
    {
      this._transform.x = p5.mouseX;
      this._transform.y = p5.mouseY;
    }
    else {
      var angle = p5.atan2(p5.mouseX  - this._originalTransform.x, p5.mouseY - this._originalTransform.y )
      var _newCoordiateX = (this._boundarie/2 - this._size/2) * p5.sin(angle)
      var _newCoordiateY = (this._boundarie/2 - this._size/2) * p5.cos(angle)

      this._transform.x = this._originalTransform.x + _newCoordiateX;
      this._transform.y = this._originalTransform.y + _newCoordiateY;
    }
  }

  DesactivateCircle(p5)
  {
    p5.noLoop()
  }


  ChangeCircleColorAroundMouse(p5){
    if(p5.dist(this._originalTransform.x, this._originalTransform.y, p5.mouseX, p5.mouseY) < 100 && this._color == this._originalColor)
    {
      var r = p5.random(255)
      var g = p5.random(255)
      var b = p5.random(255)
      if(this._originalColor == this._color)
      {
        this._color = p5.color(r, g, b)
      } 
    }
    else if (p5.dist(this._originalTransform.x, this._originalTransform.y, p5.mouseX, p5.mouseY) > 100)
    {
      this._color = this._originalColor
    }

  }

  ChangeCircleColor(p5)
  {
    var r = p5.random(255)
    var g = p5.random(255)
    var b = p5.random(255)
    if(this._originalColor == this._color)
    {
      this._color = p5.color(r, g, b)
    }
  }

  ResetCircleColor(p5){
    if(this._color != this._originalColor){
      this._color = this._originalColor

    }
  }

  ResetPosition(p5)
  {
    this._transform.x = this._originalTransform.x;
    this._transform.y = this._originalTransform.y;
  }

  RestorBaseColor(p5){
    this._color = this._originalColor
  }
}