
//! Strategy Design Pattern 
//! Example Case: Text Processor 

const OutputFormat = Object.freeze({
    markdown: 3,
    html: 1
})

class TextProcessor {
    constructor(outputFormat){
        this.buffer = []
        this.setOutputFormat(outputFormat)
    }

    setOutputFormat(outputFormat){
        switch (outputFormat) {
            case OutputFormat.markdown:
                this.listStrategy = new MarkdownStrategy()
                break;
            case OutputFormat.html:
                this.listStrategy = new HtmlStrategy()
                break;
        }
    }

    appendList(items){
        console.log(this.listStrategy)
        this.listStrategy.start(this.buffer)

        for(let item of items){
            this.listStrategy.addListItem(this.buffer, item)
        }

        this.listStrategy.end(this.buffer)
    }

    clear() {this.buffer = [] }

    toString(){
        return this.buffer.join('\n')
    }
}

class ListStrategy {
    start(buffer){}
    end(buffer){}
    addListItem(buffer, item){}
}

class MarkdownStrategy extends ListStrategy {
    addListItem(buffer, item){
        buffer.push(` * ${item}`)
    }
}

class HtmlStrategy extends ListStrategy {
    start(buffer){
        buffer.push(`<ul>`)
    }
    end(buffer){
        buffer.push(`</ul>`)
    }
    addListItem(buffer, item){
        buffer.push(`  <li>${item}</li>`)
    }
}


const textProccessor = new TextProcessor(OutputFormat.markdown)
textProccessor.appendList(['ham', 'eggs', 'bacon'])

console.log(textProccessor.toString())

textProccessor.clear()
textProccessor.setOutputFormat(OutputFormat.html)
textProccessor.appendList(['grapefruit', 'sugar', 'orange juice'])

console.log(textProccessor.toString())
