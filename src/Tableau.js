const Rover = require('./Rover')
const isString = require('./utils/isString')
const uniqueId = require('./utils/uniqueId')
const cardinals = require('./utils/cardinals')

class Tableau {
    constructor() {
        this.rovers = []
        this.xMax = null
        this.yMax = null
        this.firstInstruction = true
        this.idSelected = null
    }

    setTableauDimensions(inputString) {
        const inputArr = inputString.split(" ")
        this.xMax = parseInt(inputArr[0])
        this.yMax = parseInt(inputArr[1])
    }

    createRover(id, x, y) {
        const roverId = id || uniqueId('rover_')
        const newRover = new Rover(roverId, x, y)
        this.rovers.push(newRover)
    }

    isStringTypeSetDimensions(inputString) {
        const inputArr = inputString.split(" ")
        if(inputArr.length!=2) return false
        if(isNaN(inputArr[0])) return false
        if(isNaN(inputArr[1])) return false
        if(inputArr[0]<0) return false
        if(inputArr[1]<0) return false
        return true
    }

    isStringTypeSelect(inputString) {
        const inputArr = inputString.split(" ")
        if(!inputArr.length===3) return false
        if(isNaN(inputArr[0])) return false
        if(isNaN(inputArr[1])) return false
        if(inputArr[0]<0) return false
        if(inputArr[1]<0) return false
        if(!cardinals.includes(inputArr[2])) return false
        return true
    }

    isStringTypeMove(inputString) {
        const inputArr = inputString.split(" ")
        if(inputArr.length!=3) return false
        if(isNaN(inputArr[0])) return false
        if(isNaN(inputArr[1])) return false
        if(inputArr[0]<0) return false
        if(inputArr[1]<0) return false
        if(!(cardinals.includes(inputArr[2]))) return false 
        return true
    }

    getInputStringType(inputString) {
        if(!inputString) return false
        if(this.isStringTypeSetDimensions(inputString)) return "tableauSetDimensions"
        if(this.isStringTypeSelect(inputString)) return "roverSelect"
        if(/^[L|M|R]*$/.test(inputString)) return "roverSpinMove"
        return false
    }

    selectRover(inputString) {
        const x = parseInt(inputString.split(" ")[0])
        const y = parseInt(inputString.split(" ")[1])
        const rover = this.rovers.find(rover => (rover.x === x) && (rover.y === y))
        this.idSelected = (rover && rover.id) ? rover.id : null
    }

    spinAndMove(inputString) {
        this.rovers.find(rover => rover.id===this.idSelected).spinAndMove(inputString)
    }

    firstMovement(input, inputType) {
        if(this.firstInstruction && inputType==="tableauSetDimensions") this.setTableauDimensions(input)
        this.firstInstruction = false
    }

    instruction(input) {
        if(!isString(input)) return
        const inputType = this.getInputStringType(input)
        this.firstMovement(input, inputType)
        if(this.xMax===null && this.yMax===null) return false
        if(inputType==="roverSelect") this.selectRover(input)
        if(inputType==="roverSpinMove") this.spinAndMove(input)
    }
}

module.exports = Tableau