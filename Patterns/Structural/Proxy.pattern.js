

//! Proxy Pattern 

//* Value Proxy:
class Percentage {
    constructor(percent) {
        this.percent = percent; 
    }
    toString() { return `${this.percent}%`; }

    valueOf() {
        return this.percent / 100 
    }
}

const fivePercent = new Percentage(5);
console.log(`5% of 50 is ${50*fivePercent}`)

//* Percentage is a proxy class for the primitive number class to provide proper functionality

//* Property Proxy:
class Property {
    constructor(value, name=''){
        this._value = value;
        this.name = name;
    }

    get value() { return this._value; }
    set value(newValue) {
        if (this._value === newValue) return
        console.log(`Assigning ${newValue} to ${this.name}`)
        this._value = newValue
    }
}

class Creature {
    constructor() {
        this._agility = new Property(10, 'agility')
    }

    get agility() { return this._agility.value }
    set agility(value) { this._agility.value = value }
}

let c = new Creature();
c.agility = 11;
c.agility = 17;
c.agility = 30;

//* Adds additional functionality to assignment of field within creature class through the property proxy.


//* Protection Proxy 

class Driver {
    constructor(age) { this.age = age}
}

class Car {
    constructor() { }
    drive() { console.log(`Car is Driving`) }
}

class CarProxy { 
    constructor(driver) { 
        this._car = new Car();
        this.driver = driver
    } 
    drive() {
        if (this.driver.age >= 16) this._car.drive();
        else console.log(`Illegal driver`)
    }
}

const legalDriver = new Driver(18);
const illegalDriver = new Driver(14);

const driverCheck = new CarProxy(legalDriver);
const driverCheck2 = new CarProxy(illegalDriver);
driverCheck.drive() //* -> Car is Driving
driverCheck2.drive() //* -> Illegal driver


//! Virtual Proxy Pattern

class Image {
  constructor(url) {
    this.url = url;
    console.log(`Loading image from ${this.url}`);
  }

  draw() {
    console.log(`Drawing image ${this.url}`);
  }
}

class LazyImage {
  constructor(url) { 
    this.url = url;
  }

  draw() {
    if (!this.image) this.image = new Image(this.url);
    this.image.draw();
  }
}

function drawImage(img) {
  console.log('About to draw the image');
  img.draw();
  console.log('Done drawing the image');
}

let img = new LazyImage('http://pokemon.com/pikachu.png');
drawImage(img);