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

    move(inputString) {
        const cardinals = [ "N", "E", "S", "W" ]

        if(inputString==="L"){
            const currentIndex = cardinals.indexOf(this.heading)
            const previousCardinal = (currentIndex === 0) ? cardinals[cardinals.length-1] : cardinals[currentIndex-1]
            this.heading = previousCardinal
        }
    }
}

module.exports = Rover