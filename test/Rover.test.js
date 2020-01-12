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

test("getInputStringType have false by defauot", () => {
    const tableau = new Tableau()
    expect(tableau.getInputStringType("")).toBe(false)
    expect(tableau.getInputStringType()).toBe(false)
})

test("getInputStringType detects type spin", () => {
    const tableau = new Tableau()
    expect(tableau.getInputStringType("RRMM")).toBe("roverSpinMove")
})

test("getInputStringType detects tableau dimensions set", () => {
    const tableau = new Tableau()
    expect(tableau.getInputStringType("4 8")).toBe("tableauSetDimensions")
    expect(tableau.getInputStringType("12 12")).toBe("tableauSetDimensions")
})

test("getInputStringType detects rover selection", () => {
    const tableau = new Tableau()
    expect(tableau.getInputStringType("4 8 N")).toBe("roverSelect")
})

test("getInputStringType rejects any negative or unformatted input", () => {
    const tableau = new Tableau()
    expect(tableau.getInputStringType("-4 8")).toBe(false)
    expect(tableau.getInputStringType("-4 -80")).toBe(false)
    expect(tableau.getInputStringType("-666")).toBe(false)
    expect(tableau.getInputStringType("-4 -8 E")).toBe(false)
    expect(tableau.getInputStringType("400 -8 W")).toBe(false)
    expect(tableau.getInputStringType("400 -8 S")).toBe(false)
    expect(tableau.getInputStringType("400 -8 G")).toBe(false)
    expect(tableau.getInputStringType("400 -8 23423 W")).toBe(false)
    expect(tableau.getInputStringType("E -8 23423")).toBe(false)
    expect(tableau.getInputStringType("800")).toBe(false)
    expect(tableau.getInputStringType("0")).toBe(false)
    expect(tableau.getInputStringType("something something")).toBe(false)
})

test('The first instruction set to false after instruction is called', () => {
    const tableau = new Tableau()
    expect(tableau.firstInstruction).toBe(true)
    tableau.instruction('WHATEVER IS CALLED')
    expect(tableau.firstInstruction).toBe(false)
})

test('The fisrt input define tableau dimensions', () => {
    const tableau = new Tableau()
    expect(tableau.firstInstruction).toBe(true)
    tableau.instruction('100 80')
    expect(tableau.firstInstruction).toBe(false)
    expect(tableau.xMax).toBe(100)
    expect(tableau.yMax).toBe(80)
})


test("An input string of two coordinates and facing separated by space do NOT SELECT rover if does not exists", () => {
    const tableau = new Tableau()
    tableau.instruction('1 1 N')
    expect(tableau.idSelected).toBe(null)
})

test("An input string of two coordinates and facing separated by space SELECT rover if exists", () => {
    const tableau = new Tableau()
    tableau.createRover("testId_01", 1, 1)
    tableau.instruction('1 1 N')
    expect(tableau.idSelected).toBe("testId_01")
})