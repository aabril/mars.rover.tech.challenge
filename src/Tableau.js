const Rover = require('./Rover')
const isString = require('./utils/isString')
const uniqueId = require('./utils/uniqueId')

class Tableau {
    constructor() {
        this.queue = []
        this.rovers = []
    }

    createRover(id, x, y) {
        const roverId = id || uniqueId('rover_')
        const newRover = new Rover(id, x, y)
        this.rovers.push(newRover)
    }

    instruction(input) {
        if(!isString(input)) return
        this.queue.push(input)
    }
}

module.exports = Tableau