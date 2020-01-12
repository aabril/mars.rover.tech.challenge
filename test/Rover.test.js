const Rover = require('../src/Rover')

test('when input "L" cardinal should spin to the 90 degrees cardinal anticlockwise ', () => {
    const rover = new Rover()
    rover.move('L')
    expect(rover.getPosition.heading).toBe("W")
    rover.move('L')
    expect(rover.getPosition.heading).toBe("S")
})