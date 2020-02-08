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

matrix = matrixGenerator(30, 15, 50, 50, 50, 50);

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


function game() {
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

var rows = 35
var colums = 35

function restart(){
grassArr = [];
grassEaterArr = [];
predatorArr = [];
waterArr = [];
fireArr = [];
matrix = [];
for(var y = 0; y < rows; y++){
    matrix[y] = [];
    for(var x = 0; x , colums; x++){
        var a = Math.floor(Math.random() * 100);
        if(a >= 50 && a < 55){
            matrix[y][x] = 1;
        }
        else if(a >= 60 && a < 70){
            matrix[y][x] = 2;
        }
        else if(a >= 70 && a < 80){
            matrix[y][x] = 3;
        }
        else if(a >= 80 && a < 90){
            matrix[y][x] = 4
        }
        else if(a >= 90 && a < 100){
            matrix[y][x] = 5;
        }
        else {
            matrix[y][x] = 0;
        }
    }
}
for(var y = 0; y < matrix.length; y++){
    for(var x = 0; x < matrix.length; x++){
        if(matrix[y][x] == 1){
            var grass = new Grass(x, y, 1)
            grassArr.push(grass)
        }
        else if(matrix[y][x] == 2){
            var grer = new GrassEater(x, y, 2)
            grassEaterArr.push(grer)
        }
        else if(matrix[y][x] == 3){
            var pr = new Predator(x, y, 3)
            predatorArr.push(pr)
        }
        else if(matrix[y][x] == 4){
            var water = new Water(x, y, 4)
            waterArr.push(water)
        }
        else if(matrix[y][x] == 5){
            var fire = new Fire(x, y, 5)
            fireArr.push(fire)
        }
    }
}
}
var obj = {"info" : [] };

function main(){
    var file = "Statics.json";
    obj.info.push({"cnvac xoteri qanak" : grassHashiv})
    console.log(obj);
    fs.writeFileSync(file, JSON.stringify(obj,null,3))
    console.log(JSON.stringify(obj));
}
setInterval(main, 6000)
io.on("connection", function (socket) {
    socket.on("boom", function () {
        console.log("jku");
        
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix.length; x++) {
                if (x < 12 && y < 12) {
                    if (matrix[y][x] = 1) {
                        for (var i in grassArr) {
                            if (grassArr[i].x == x && grassArr[i].y == y) {
                                grassArr.splice(i, 1)
                            }
                        }
                    }
                    if (matrix[y][x] = 2) {
                        for (var i in grassEaterArr) {
                            if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                                grassEaterArr.splice(i, 1)
                            }
                        }
                    }
                    if (matrix[y][x] = 3) {
                        for (var i in predatorArr) {
                            if (predatorArr[i].x == x && predatorArr[i].y == y) {
                                predatorArr.splice(i, 1)
                            }
                        }
                    }
                    if (matrix[y][x] = 4) {
                        for (var i in waterArr) {
                            if (waterArr[i].x == x && waterArr[i].y == y) {
                                waterArr.splice(i, 1)
                            }
                        }
                    }
                    if (matrix[y][x] = 5) {
                        for (var i in fireArr) {
                            if (fireArr[i].x == x && fireArr[i].y == y) {
                                fireArr.splice(i, 1)
                            }
                        }
                    }
                    matrix[y][x] = 0;

                }
            }
        }
    })
    socket.on("noric", function(){
        restart();
    })
})

setInterval(game, 1000);