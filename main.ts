namespace SpriteKind{
    export const BlackTile = SpriteKind.create()
    export const WhiteTile = SpriteKind.create()
    export const Selector = SpriteKind.create()
    export const BlackChecker = SpriteKind.create()
    export const WhiteChecker = SpriteKind.create()
} 

scene.setBackgroundColor(6)
// Globals
let checkertiles = [] //Chessboard
let selector = sprites.create(assets.image`Selector_grn`,SpriteKind.Selector)
let black = {checkers: [] as Sprite[], startSide:0}
let white = {checkers: [] as Sprite[], startSide:1}




// ##### CHESSBOARD

{// ### Creating tiles
let colourCounter = 0
for (let i = 0; i < 8; i++) {
    
    let checkertilerow = []
    for (let j = 0; j < 8; j++) {
        if (colourCounter%2 == 0) {
         checkertilerow[j] = sprites.create(assets.image`Black_tile`,SpriteKind.BlackTile)}
         else {
                     checkertilerow[j] = sprites.create(assets.image`White_tile`,SpriteKind.WhiteTile)
         }
         colourCounter++
    }
    
    checkertiles[i] = checkertilerow

    colourCounter++
}
}

{// ### Positioning tiles
let horizontalTileSpace = 20
let verticalTileSpace = 15
let y = 7.5
for (let i = 0; i < checkertiles.length; i++) {
    let x = 10
    for (let j = 0; j < checkertiles[i].length; j++){
        checkertiles[i][j].setPosition(x, y)
        //console.log("tile positioned "+x)
        x += horizontalTileSpace  
    }
    //console.log("row positioned "+y)
    y += verticalTileSpace
}
}
// ##### CHECKERS

//Checker creation
{

let horizontalTileSpace = 20
let verticalTileSpace = checkertiles[0][0].height
let y = 0
let x = 0

for (let i = 0; i < checkertiles.length; i++) {

    for (let j = 0; j < checkertiles[i].length; j++){
        x = checkertiles[i][j].x 
        y = checkertiles[i][j].y

        if (checkertiles[i][j].kind() == SpriteKind.BlackTile) {
            if (black.startSide == 0 && y < verticalTileSpace*3){
                black.checkers.push(sprites.create(assets.image`Black_checker`,SpriteKind.BlackChecker))
                black.checkers[black.checkers.length-1].setPosition(x,y)

            }
            else if(y < verticalTileSpace*3){
                white.checkers.push(sprites.create(assets.image`White_checker`,SpriteKind.WhiteChecker))
                white.checkers[white.checkers.length-1].setPosition(x,y)
            }
            if (black.startSide == 1 && y < verticalTileSpace*5){
                black.checkers.push(sprites.create(assets.image`Black_checker`,SpriteKind.BlackChecker))
                black.checkers[black.checkers.length-1].setPosition(x,y)
            }
            else if(y > verticalTileSpace*5){
                white.checkers.push(sprites.create(assets.image`White_checker`,SpriteKind.WhiteChecker))
                white.checkers[white.checkers.length-1].setPosition(x,y)
            }
        
        }
        
    }

    
}
}



// ##### SELECTOR

let selectorPos = {x:checkertiles[0][0].x, y:checkertiles[0][0].y} //Position of the selector (set to a position of the first tile)

{ // ### Selector movement
let tileWidth = checkertiles[0][0].width
let tileHeight = checkertiles[0][0].height

controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    if (selectorPos["x"] - tileWidth >= 0){
        selectorPos["x"] -= tileWidth
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    if (selectorPos["x"] + tileWidth <= 160){
        selectorPos["x"] += tileWidth
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
    if (selectorPos["y"] - tileHeight >= 0){
        selectorPos["y"] -= tileHeight
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function() {
    if (selectorPos["y"] + tileHeight <= 120){
        selectorPos["y"] += tileHeight
    }
})
}



 // ### Think
game.onUpdate(function() {
    selector.setPosition(selectorPos["x"], selectorPos["y"])
    selector.z = 10

    
})
