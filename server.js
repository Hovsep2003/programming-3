var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

let Grass = require("./Grass")
let GrassEater = require("./GrassEater")
let Predator = require("./Predator")
let Water = require("./Water")
let Fire = require("./Fire")





grassArr = [];
grassEaterArr = [];
predatorArr = [];
waterArr = [];
fireArr = [];

matrix = matrixGenerator(30, 15, 10, 10, 10, 20);

function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, waterCount, fireCount) {
    var matrix = [];
    for (let index = 0; index < matrixSize; index++) {
        matrix[index] = [];
        for (let i = 0; i < matrixSize; i++) {
            matrix[index][i] = 0;
        }
    }
    for (let index = 0; index < grassCount; index++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 1;
    }
    for (let index = 0; index < grassEaterCount; index++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 2;
    }
    for (let index = 0; index < predatorCount; index++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 3;
    }
    for (let index = 0; index < waterCount; index++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 4;
    }
    for (let index = 0; index < fireCount; index++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 5;
    }
    return matrix
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


function main() {
    for (let index = 0; index < grassArr.length; index++) {
        grassArr[index].mul();
    }
    for (let index = 0; index < waterArr.length; index++) {
        waterArr[index].mul();
    }
    for (let index = 0; index < grassEaterArr.length; index++) {
        grassEaterArr[index].eat();
    }
    for (let index = 0; index < predatorArr.length; index++) {
        predatorArr[index].eat();
    }
    for (let index = 0; index < fireArr.length; index++) {
        fireArr[index].eat();
    }

   
    
    
    io.sockets.emit("matrix", matrix);
    
}

io.on("connection", function(socket){
    socket.on("boom", function(){
    for(var y = 0; y < matrix.length; y++){
        for(var x = 0; x < matrix[y].length; x++){
            if
        }

    }
       })
       
   })

setInterval(main, 1000);