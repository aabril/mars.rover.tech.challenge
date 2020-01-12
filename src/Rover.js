const cardinals = [ "N", "E", "S", "W" ]

class Rover {
    constructor() {
        this.heading = "N" // N, S, E, W : North, South, East, West
        this.x = 0
        this.y = 0
    }

    get getPosition() {
        return {
            heading: this.heading,
            x: this.x, 
            y: this.y
        }
    }

    moveAntiClockwise() {
        const currentIndex = cardinals.indexOf(this.heading)

        const isTheFirstItem = (currentIndex === 0)
        const lastItem = cardinals[cardinals.length-1]
        const previousItem = cardinals[currentIndex-1]

        const previousCardinal = (isTheFirstItem) ? lastItem : previousItem
        this.heading = previousCardinal
    }

    moveClockwise() {
        const currentIndex = cardinals.indexOf(this.heading)
            
        const isTheLastItem = (cardinals.length-1 === currentIndex)
        const firstItem = cardinals[0]
        const nextItem = cardinals[currentIndex+1]

        const nextCardinal = (isTheLastItem) ? firstItem : nextItem
        this.heading = nextCardinal
    }

    move(inputString) {
        if(inputString==="L") this.moveAntiClockwise()
        if(inputString==="R") this.moveClockwise()
        if(inputString.length>1) {
            inputString.split('').map(char => {
                if(char==="L") this.moveAntiClockwise()
                if(char==="R") this.moveClockwise()
            })
        }
    }
}

module.exports = Rover