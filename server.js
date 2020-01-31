var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);
let Grass = require("./grass")
let GrassEater = require("./grasseater")
let Predator = require("./predator")
let Water = require("./water")
let Fire = require("./fire")
let matrix = [];
let side = 20;
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let waterArr = [];
let fireArr = []
matrixGenerator(30, 15, 10, 3, 4, 4);
function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, waterCount, fireCount) {
    for (let index = 0; index < matrixSize; index++) {
        matrix[index] = [];
        for (let i = 0; i < matrixSize; i++) {
            matrix[index][i] = 0;
        }
    }
    for (let index = 0; index < grassCount; index++) {
        let x = Math.floor(random(0, matrixSize));
        let y = Math.floor(random(0, matrixSize));
        matrix[y][x] = 1;
    }
    for (let index = 0; index < grassEaterCount; index++) {
        let x = Math.floor(random(0, matrixSize));
        let y = Math.floor(random(0, matrixSize));
        matrix[y][x] = 2;
    }
    for (let index = 0; index < predatorCount; index++) {
        let x = Math.floor(random(0, matrixSize));
        let y = Math.floor(random(0, matrixSize));
        matrix[y][x] = 3;
    }
    for (let index = 0; index < waterCount; index++) {
        let x = Math.floor(random(0, matrixSize));
        let y = Math.floor(random(0, matrixSize));
        matrix[y][x] = 4;
    }
    for (let index = 0; index < fireCount; index++) {
        let x = Math.floor(random(0, matrixSize));
        let y = Math.floor(random(0, matrixSize));
        matrix[y][x] = 5;
    }
}

for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            let grass = new Grass(x, y);
            grassArr.push(grass);
        }
        else if (matrix[y][x] == 2) {
            let grassEater = new GrassEater(x, y);
            grassEaterArr.push(grassEater);
        }
        else if (matrix[y][x] == 3) {
            let predator = new Predator(x, y);
            predatorArr.push(predator);
        }
        else if (matrix[y][x] == 4) {
            let water = new Water(x, y);
            waterArr.push(water);
        }
        else if (matrix[y][x] == 5) {
            let fire = new Fire(x, y);
            fireArr.push(fire);
        }
    }
}

