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

    isStringTypeSelect(inputString) {
        if(inputString.split(" ").length!=2) return false
        if(isNaN(inputString.split(" ")[0])) return false
        if(isNaN(inputString.split(" ")[1])) return false
        return true
    }

    isStringTypeMove(inputString) {
        if(inputString.split(" ").length!=3) return false
        if(isNaN(inputString.split(" ")[0])) return false
        if(isNaN(inputString.split(" ")[1])) return false
        if(!(cardinals.includes(inputString.split(" ")[2]))) return false 
        return true
    }

    getInputStringType(inputString) {
        if(!inputString) return false
        if(/^[L|M|R]*$/.test(inputString)) return "roverSpinMove"
        if(this.isStringTypeSelect(inputString)) return "roverSelect"
        if(this.isStringTypeMove(inputString)) return "roverMove"
        return false
    }

    selectRover(inputString) {
        const x = parseInt(inputString.split(" ")[0])
        const y = parseInt(inputString.split(" ")[1])
        const rover = this.rovers.find(rover => (rover.x === x) && (rover.y === y))
        this.idSelected = rover.id
    }

    instruction(input) {
        if(!isString(input)) return
        const inputType = this.getInputStringType(input)
        if(inputType==="movements") this.spinAndMove(input)
        if(inputType==="roverSelect") this.selectRover(input)
        // if(inputType==="secondStep") this.moveRover()
        this.queue.push(input) //TODO : the queue will be used later
    }
}

module.exports = Tableau