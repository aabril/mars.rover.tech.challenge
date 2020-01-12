const Rover = require('../src/Rover')
const Tableau = require('../src/Tableau')

test('when input "L" cardinal should spin to the 90 degrees cardinal anticlockwise ', () => {
    const rover = new Rover()
    rover.move('L')
    expect(rover.getPosition.heading).toBe("W")
    rover.move('L')
    expect(rover.getPosition.heading).toBe("S")
    rover.move('L')
    expect(rover.getPosition.heading).toBe("E")
    rover.move('L')
    expect(rover.getPosition.heading).toBe("N")
    rover.move('L')
    expect(rover.getPosition.heading).toBe("W")
})

test('when input "R" cardinal should spin to the 90 degrees cardinal anticlockwise ', () => {
    const rover = new Rover()
    rover.move('R')
    expect(rover.getPosition.heading).toBe("E")
    rover.move('R')
    expect(rover.getPosition.heading).toBe("S")
    rover.move('R')
    expect(rover.getPosition.heading).toBe("W")
    rover.move('R')
    expect(rover.getPosition.heading).toBe("N")
    rover.move('R')
    expect(rover.getPosition.heading).toBe("E")
})

test('when input either "R" or "L", spin correctly as expected', () => {
    const rover = new Rover()
    rover.move('R')
    expect(rover.getPosition.heading).toBe("E")
    rover.move('L')
    expect(rover.getPosition.heading).toBe("N")
    rover.move('L')
    expect(rover.getPosition.heading).toBe("W")
    rover.move('R')
    expect(rover.getPosition.heading).toBe("N")
    rover.move('L')
    expect(rover.getPosition.heading).toBe("W")
    rover.move('L')
    expect(rover.getPosition.heading).toBe("S")
    rover.move('L')
    expect(rover.getPosition.heading).toBe("E")
    rover.move('L')
    expect(rover.getPosition.heading).toBe("N")
    rover.move('R')
    expect(rover.getPosition.heading).toBe("E")    
})

test('when input is a sequence of "R"s and "L"s should face the correct cardinal direction', () => {
    const rover = new Rover()
    rover.move('RLLLRLLRLLLL')
    expect(rover.getPosition.heading).toBe("S") 
    rover.move('LL')
    expect(rover.getPosition.heading).toBe("N") 
    rover.move('RLRLRLRLRL')
    expect(rover.getPosition.heading).toBe("N") 
    rover.move('RLRLRLRLRLRRR')
    expect(rover.getPosition.heading).toBe("W") 
})

test('"M" means move forward one grid point, and maintain the same heading.', () => {
    const rover = new Rover()
    rover.move('M')
    expect(rover.getPosition.x).toBe(0)
    expect(rover.getPosition.y).toBe(1) 
    rover.move('RMM')
    expect(rover.getPosition.x).toBe(2)
    expect(rover.getPosition.y).toBe(1) 
})

test("getInputStringType determines the step", () => {
    const tableau = new Tableau()
    expect(tableau.getInputStringType("")).toBe(false)
    expect(tableau.getInputStringType()).toBe(false)

    expect(tableau.getInputStringType("RRMM")).toBe("roverSpinMove")

    expect(tableau.getInputStringType("4 8")).toBe("roverSelect")
    expect(tableau.getInputStringType("12 12")).toBe("roverSelect")
    expect(tableau.getInputStringType("-4 8")).toBe("roverSelect")
    expect(tableau.getInputStringType("-4 -80")).toBe("roverSelect")

    expect(tableau.getInputStringType("800")).toBe(false)
    expect(tableau.getInputStringType("-666")).toBe(false)
    expect(tableau.getInputStringType("0")).toBe(false)
    expect(tableau.getInputStringType("something something")).toBe(false)

    expect(tableau.getInputStringType("4 8 N")).toBe("roverMove")
    expect(tableau.getInputStringType("-4 -8 E")).toBe("roverMove")
    expect(tableau.getInputStringType("400 -8 W")).toBe("roverMove")
    expect(tableau.getInputStringType("400 -8 S")).toBe("roverMove")

    expect(tableau.getInputStringType("400 -8 G")).toBe(false)
    expect(tableau.getInputStringType("400 -8 23423 W")).toBe(false)
    expect(tableau.getInputStringType("E -8 23423")).toBe(false)
})

test("A string with two coordinates separated by space set rover to be moved on the tableau", () => {
    const tableau = new Tableau()
    tableau.createRover("test_01", 1, 1)
    tableau.instruction('1 1')
    expect(tableau.idSelected).toBe("test_01")
})