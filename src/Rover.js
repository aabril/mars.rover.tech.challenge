const cardinals = require('./utils/cardinals')

class Rover {
    constructor(id, x, y) {
        this.id = id
        this.heading = "N" // N, S, E, W : North, South, East, West
        this.x = x || 0
        this.y = y || 0
    }

    get getPosition() {
        return {
            heading: this.heading,
            x: this.x, 
            y: this.y
        }
    }

    spinAntiClockwise() {
        const currentIndex = cardinals.indexOf(this.heading)
        const isTheFirstItem = (currentIndex === 0)
        const lastItem = cardinals[cardinals.length-1]
        const previousItem = cardinals[currentIndex-1]
        const previousCardinal = (isTheFirstItem) ? lastItem : previousItem
        this.heading = previousCardinal
    }

    spinClockwise() {
        const currentIndex = cardinals.indexOf(this.heading)
        const isTheLastItem = (cardinals.length-1 === currentIndex)
        const firstItem = cardinals[0]
        const nextItem = cardinals[currentIndex+1]
        const nextCardinal = (isTheLastItem) ? firstItem : nextItem
        this.heading = nextCardinal
    }

    moveForward() {
        if(this.heading==="N") this.y = this.y + 1
        if(this.heading==="E") this.x = this.x + 1
        if(this.heading==="S") this.y = this.y - 1
        if(this.heading==="W") this.x = this.x - 1
    }

    spinAndMove(inputString) {
        inputString.split('').map(char => {
            if(char==="L") this.spinAntiClockwise()
            if(char==="R") this.spinClockwise()
            if(char==="M") this.moveForward()
        })
    }
    move(input) {
        this.spinAndMove(input)
    }
}

module.exports = Rover