const cardinals = [ "N", "E", "S", "W" ]

class Rover {
    constructor() {
        this.heading = "N" // N, S, E, W : North, South, East, West
        this.x = 0
        this.y = 0
        this.previousStep = 0
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

    isStringTypeFirst(inputString) {
        if(inputString.split(" ").length!=2) return false
        if(isNaN(inputString.split(" ")[0])) return false
        if(isNaN(inputString.split(" ")[1])) return false
        return true
    }

    isStringTypeSecond(inputString) {
        if(inputString.split(" ").length!=3) return false
        if(isNaN(inputString.split(" ")[0])) return false
        if(isNaN(inputString.split(" ")[1])) return false
        if(!(cardinals.includes(inputString.split(" ")[2]))) return false 
        return true
    }

    getInputStringType(inputString) {
        if(!inputString) return false
        if(/^[L|M|R]*$/.test(inputString)) return "movements"
        if(this.isStringTypeFirst(inputString)) return "firstStep"
        if(this.isStringTypeSecond(inputString)) return "secondStep"
        return false
    }

    spinAndMove(inputString) {
        inputString.split('').map(char => {
            if(char==="L") this.spinAntiClockwise()
            if(char==="R") this.spinClockwise()
            if(char==="M") this.moveForward()
        })
    }

    move(inputString) {
        const inputType = this.getInputStringType(inputString)
        if(inputType==="movements") this.spinAndMove(inputString)
        // if(inputType==="firstStep") this.selectRobot()
        // if(inputType==="secondStep") this.s
    }
}

module.exports = Rover