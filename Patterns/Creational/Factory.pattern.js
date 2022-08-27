

//! Factory Design Pattern Example:
//! Geometry



class ProblemExample_Point {
    //? Case: An example where a developer may want two constructors
    //? Cartesian Coordinates
    constructor(x , y){ 
        this.x = x;
        this.y = y;
    }
    //! -- Second Constructor Not Allowed !! Constructor in seperate coordinate space(polar)
    // constructor(rho, theta) {
    //     this.x = rho * Math.cos(theta);
    //     this.y = rho * Math.sin(theta);
    // }
}

//* Naive Solution:

const CoordinateSystem = {
    cartesian: 0,
    polar: 1
}

class NaiveSolution_Point {
    constructor(a, b, cs=CoordinateSystem.cartesian){
        switch (cs) {
            case CoordinateSystem.cartesian:
                this.x = a; 
                this.y = b;
                break;
            case CoordinateSystem.polar:
                this.x = a * Math.cos(b)
                this.y = a * Math.sin(b)
                break;
        }
    }
}


//* Factory Pattern 

class FactorySolution_Point {
    
    //* Basic Constructor
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    //* Constructor
    static newCartesianPoint(x, y) {
        return new FactorySolution_Point(x, y)
    }

    static newPolarPoint(rho, theta) {
        return new FactorySolution_Point(
            rho * Math.cos(theta), 
            rho * Math.sin(theta) )
    }
}

const p = FactorySolution_Point.newCartesianPoint(4 ,5)
console.log(p)

//* -> { x: 4, y: 5 }

const p2 = FactorySolution_Point.newPolarPoint(5, Math.PI/2)
console.log(p2)

//* -> { x: 3.061616997868383e-16, y: 5 }


//* StandAlone Class 
//* Removal of static method and implementation of members 
//* generally useful only if a factory object is meant to 
//* store configuration parameters.

class PointFactory {
    static newCartesianPoint(x, y) {
        return new FactorySolution_Point(x, y)
    }

    static newPolarPoint(rho, theta) {
        return new FactorySolution_Point(
            rho * Math.cos(theta), 
            rho * Math.sin(theta) )
    }
}

//* Another technique: static method to return a factory
//* class Point {
//*     static get factory() { return new PointFactory }
//* }
//* const p = Point.factory.newCartesianPoint(3, 2)
