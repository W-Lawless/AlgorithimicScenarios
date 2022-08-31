

//! Bridge Design Pattern

// State-Space Explosion: VC,VS vs RC,RS . . .  

// Shape - Square, Circle , Triangle . . .
// Renderers - Vector, Raster . . 


//! Pattern : 

class Shape { 
    constructor(renderer) {
        this.renderer = renderer;
    }
}

class Circle extends Shape {
    constructor(renderer, radius) {
        super(renderer)
        this.radius = radius;
    }

    draw() {
        this.renderer.renderCircle(this.radius)
    }
 }


 class Square { }

class VectorRender {
    renderCircle(radius) {
        console.log(`Draw vector circle R:${radius}`)
    }
 }
class RasterRender { 
    renderCircle(radius) {
        console.log(`Draw raster circle R:${radius}`)
    }
}

const raster = new RasterRender();
const vector = new VectorRender();

const circle = new Circle(vector, 5);
const circleTwo = new Circle(raster, 25);
circle.draw()
circleTwo.draw()

