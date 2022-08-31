

//! Decorator Pattern

class Shape {}

class Circle extends Shape {
    constructor(radius=0) {
        super()
        this.radius = radius
    }

    resize(factor) {
        this.radius *= factor
    }

    toString() {
        return `Circle of size radius:${this.radius}`
    }
}

class ColoredShape extends Shape {
    constructor(shape, color) {
        super();
        this.shape = shape
        this.color = color
    }

    toString() {
        return `${this.shape.toString()} has the color ${this.color}`
    }
}

const circle = new Circle(2)

console.log(circle.toString())

const redCircle = new ColoredShape(circle, 'red');
console.log(redCircle.toString())