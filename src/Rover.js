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
        if(inputString==="L") this.heading = "W"
    }
}

module.exports = Rover