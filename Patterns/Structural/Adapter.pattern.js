
//! Adapter Pattern
//! Graphics Interface example, Vector vs Raster

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    toString() {
        return `x: ${this.x}  y: ${this.y}`
    }
}

class Line {
    constructor(start, end) {
        this.start = start
        this.end = end
    }
    toString() {
        return `line: ${this.start.toString()}, ${this.end.toString()}`
    }
}

class VectorObject extends Array {}
class VectorRectangle extends VectorObject {
    constructor(x,y, width, height){
        super()
        // .. coordinate manipulation to draw rectangle 
        this.push(new Line(new Point(x,y), new Point(x+width, y) ));
        this.push(new Line(new Point(x+width,y), new Point(x+width, y+height) ));
        this.push(new Line(new Point(x,y), new Point(x, y+height) ));
        this.push(new Line(new Point(x,y+height), new Point(x+width, y+height) ));this.push
    }
}

//! Existing Objects
let vectorObjects = [new VectorRectangle(1, 1, 10, 13), new VectorRectangle(15, 15, 11, 12)]


//! Existing Interface: Does not Accept Vectors
const drawPoint = point => {
    process.stdout.write('.')
}

class LineToPointAdapter extends Array {
    constructor(line) { 
        super();
        console.log(`${LineToPointAdapter.count++}: Generating point for ${line.toString()}`)

        let left = Math.min(line.start.x, line.end.x);
    let right = Math.max(line.start.x, line.end.x);
    let top = Math.min(line.start.y, line.end.y);
    let bottom = Math.max(line.start.y, line.end.y);

    if (right - left === 0)
    {
      for (let y = top; y <= bottom; ++y)
      {
        this.push(new Point(left, y));
      }
    }
    else if (line.end.y - line.start.y === 0)
    {
      for (let x = left; x <= right; ++x)
      {
        this.push(new Point(x, top));
      }
    }
    }
}

LineToPointAdapter.count = 0

let drawPoints = function()
{
  for (let vo of vectorObjects)
    for (let line of vo)
    {
      let adapter = new LineToPointAdapter(line);
      adapter.forEach(drawPoint);
    }
};

drawPoints();