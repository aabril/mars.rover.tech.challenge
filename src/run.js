const Tableau = require('./Tableau')
const tableau = new Tableau()
tableau.createRover("pepe", 1, 1)
tableau.createRover("marcos", 1, 2)
tableau.createRover("arturo", 1, 4)
tableau.createRover("maria", 3, 5)
tableau.createRover("lucia", 5, 3)

console.log(tableau.rovers)