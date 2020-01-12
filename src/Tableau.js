const Rover = require('./Rover')
const isString = require('./utils/isString')
const uniqueId = require('./utils/uniqueId')
const cardinals = require('./utils/cardinals')

class Tableau {
    constructor() {
        this.queue = []
        this.rovers = []
        this.idSelected = null
    }

    createRover(id, x, y) {
        const roverId = id || uniqueId('rover_')
        const newRover = new Rover(roverId, x, y)
        this.rovers.push(newRover)
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

    instruction(input) {
        if(!isString(input)) return
        const inputType = this.getInputStringType(input)
        if(inputType==="movements") this.spinAndMove(input)
        // if(inputType==="firstStep") this.selectRobot()
        // if(inputType==="secondStep") this.s
        this.queue.push(input)
    }
}

module.exports = Tableau