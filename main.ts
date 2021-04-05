namespace SpriteKind{
    export const BlackTile = SpriteKind.create()
    export const WhiteTile = SpriteKind.create()
} 

scene.setBackgroundColor(6)

let checkertiles = []
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
