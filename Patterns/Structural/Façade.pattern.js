

//! Façade Pattern 
//! Hides underlying complexity through a simplified API

class CharacterBuffer extends Array {
    constructor(width, height){
        super();
        this.width = width;
        this.height = height;
        this.alloc = (width*height)
    }

    write(text, pos=0) {
        //output to console
    }
}

class Viewport {
    constructor(buffer=new CharacterBuffer()) {
        this.buffer = buffer;
        this.offset = 0;
    }

    append(text, pos=0) {
        this.buffer.write(text, pos + this.offset)
    }
}

//*Façade::

class Console {
    constructor() {
        this.buffer = new CharacterBuffer();
        this.viewport = new Viewport(this.buffer);
    }
}