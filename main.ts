namespace SpriteKind{
    export const BlackTile = SpriteKind.create()
    export const WhiteTile = SpriteKind.create()
    export const Selector = SpriteKind.create()
    export const BlackChecker = SpriteKind.create()
    export const WhiteChecker = SpriteKind.create()
    export const Marker = SpriteKind.create()
    export const Taker = SpriteKind.create()
    //export const BlackLady = SpriteKind.create()
    //export const WhiteLady = SpriteKind.create()
}

scene.setBackgroundColor(6)

// Globals
let checkertiles = [ [] as Sprite[]] //Chessboard
let selector = sprites.create(assets.image`Selector_grn`,SpriteKind.Selector)
selector.z = 10
let black = {checkers: [] as Sprite[], startSide:0} //player1
let white = {checkers: [] as Sprite[], startSide:1} //player2

let selected:Sprite = null
let ply = "white"


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
function UpdateSelectorPos(){
    selector.setPosition(selectorPos["x"], selectorPos["y"])

}

// Left
controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    if (selectorPos["x"] - tileWidth >= 0){
        selectorPos["x"] -= tileWidth
        UpdateSelectorPos()
    }
})
// Right
controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    if (selectorPos["x"] + tileWidth <= 160){
        selectorPos["x"] += tileWidth
        UpdateSelectorPos()
    }
})
// Up
controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
    if (selectorPos["y"] - tileHeight >= 0){
        selectorPos["y"] -= tileHeight
        UpdateSelectorPos()
    }
})
// Down
controller.down.onEvent(ControllerButtonEvent.Pressed, function() {
    if (selectorPos["y"] + tileHeight <= 120){
        selectorPos["y"] += tileHeight
        UpdateSelectorPos()
    }
})

UpdateSelectorPos()
}



{// ### Moves determination
let determined = false
let lastTouchedBlack:Sprite = null
const width = selector.width
const height = selector.height
const wayx = [1,0,1,0]
let wayy = [1,1,0,0]
    function determineMoves(forwhat:Sprite) {

        const wayX = [forwhat.x + width, forwhat.x - width, forwhat.x + width, forwhat.x - width]
        let wayY = [forwhat.y + height, forwhat.y + height, forwhat.y - height, forwhat.y - height]
        let loops = 2

        if (forwhat != null){
            if(selected.image.equals(assets.image`Black_lady`) || selected.image.equals(assets.image`White_lady`)){
                loops = 4
            }
            else if (ply == "white" && white.startSide == 1 || ply == "black" && black.startSide == 1){
                wayY = [forwhat.y-height, forwhat.y-height]
                wayy = [0,0]
                loops = 2
            }
            else {
                wayY = [forwhat.y+height, forwhat.y+height]
                wayy = [1,1]
                loops = 2
            }

            for (let i = 0; i < loops; i++){
                let marker = sprites.createProjectileFromSprite(img`
                    . . . . 2 . . . . . 2 . . . . .
                    . . . 2 . 2 . . . . 2 . . . . .
                    . . 2 2 . 2 . . 2 2 2 . . . . .
                    . 2 2 2 2 . . 2 2 . 2 2 2 . . .
                    . 2 . 2 2 2 2 . . 2 2 2 2 . . .
                    . . 2 . 2 2 . 2 2 2 . 2 2 2 2 .
                    . 2 . 2 2 2 2 2 2 2 2 2 2 2 . .
                    . 2 2 2 . . 2 2 2 2 2 2 2 2 . .
                    . 2 2 . . 2 2 3 2 2 2 2 2 2 . .
                    2 . . . 2 2 . 2 2 2 2 . 2 2 . .
                    2 . . 2 2 2 . 2 2 2 . 2 . 2 . .
                    2 . 2 . . 2 2 2 2 . 2 . 2 . . .
                    2 2 . . . 2 2 . 2 2 . . 2 . . .
                    2 2 . . . 2 . 2 2 . . . 2 . . .
                    . . . . 2 2 2 2 . . . . 2 . . .
                    . . . . 2 . . . . . . 2 . . . .
                `, forwhat, wayx[i] ,wayy[i])
                marker.setPosition(wayX[i], wayY[i])
                //marker.setFlag(SpriteFlag.Invisible, true)
            }       
        }
    }
    function determineMovesExtended(forwhat:Sprite,x:number,y:number) {
        const wayX = [forwhat.x - width*2, forwhat.x + width*2]
        const wayY = [forwhat.y - height*2, forwhat.y + height*2]
        //let loops = 2

        if (forwhat != null){
            if(selected.image.equals(assets.image`Black_lady`) || selected.image.equals(assets.image`White_lady`)){
                //loops = 4
            }
            else if (ply == "white" && white.startSide == 1 || ply == "black" && black.startSide == 1){
                //wayY = [forwhat.y-height*2, forwhat.y-height*2]
                //loops = 2
            }
            else {
                //wayY = [forwhat.y+height*2, forwhat.y+height*2]
                //loops = 2
            }

            
            let marker = sprites.create(img`
                . . . . 3 . . . . . 3 . . . . .
                . . . 3 . 3 . . . . 3 . . . . .
                . . 3 3 . 3 . . 3 3 3 . . . . .
                . 3 3 3 3 . . 3 3 . 3 3 3 . . .
                . 3 . 3 3 3 3 . . 3 3 3 3 . . .
                . . 3 . 3 3 . 3 3 3 . 3 3 3 3 .
                . 3 . 3 3 3 3 3 3 3 3 3 3 3 . .
                . 3 3 3 . . 3 3 3 3 3 3 3 3 . .
                . 3 3 . . 3 3 3 3 3 3 3 3 3 . .
                3 . . . 3 3 . 3 3 3 3 . 3 3 . .
                3 . . 3 3 3 . 3 3 3 . 3 . 3 . .
                3 . 3 . . 3 3 3 3 . 3 . 3 . . .
                3 3 . . . 3 3 . 3 3 . . 3 . . .
                3 3 . . . 3 . 3 3 . . . 3 . . .
                . . . . 3 3 3 3 . . . . 3 . . .
                . . . . 3 . . . . . . 3 . . . .
            `, SpriteKind.Marker)
            console.log("Pozice "+wayX[x]+" "+wayY[y])
            marker.setPosition(wayX[x], wayY[y])
            console.log("Pozice "+marker.x+" "+marker.y)
            //marker.setFlag(SpriteFlag.Invisible, true)
                
        }
    }

    sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BlackTile, function(sprite: Sprite, otherSprite: Sprite) {
        
        if (otherSprite.z != -2 && otherSprite.z != -3){
            otherSprite.setImage(assets.image`Green_tile`)
        }
        if(ply == "black" && otherSprite.z == -3 || ply == "white" && otherSprite.z == -2){
            console.log("Rychlost "+sprite.vx+" "+sprite.vy)
            determineMovesExtended(selected, sprite.vx, sprite.vy)
        }

        sprite.destroy()
    })

        sprites.onOverlap(SpriteKind.Marker, SpriteKind.BlackTile, function(sprite: Sprite, otherSprite: Sprite) {
        
        if (otherSprite.z != -2 && otherSprite.z != -3){
            otherSprite.setImage(assets.image`Green_tile`)
        }
        if(ply == "black" && otherSprite.z == -3 || ply == "white" && otherSprite.z == -2){
            
        }

        sprite.destroy()
    })


 // Occupied tiles can't be green
    sprites.onOverlap(SpriteKind.BlackChecker, SpriteKind.BlackTile, function(sprite: Sprite, otherSprite: Sprite) {
        otherSprite.z = -2
        //otherSprite.setImage(assets.image`Black_tile`)
    })
    sprites.onOverlap(SpriteKind.WhiteChecker, SpriteKind.BlackTile, function(sprite: Sprite, otherSprite: Sprite) {
        otherSprite.z = -3
        //otherSprite.setImage(assets.image`Black_tile`)
    })


game.onUpdateInterval(500, function() {
    let blacktiles = sprites.allOfKind(SpriteKind.BlackTile)
    for(let i = 0; i < blacktiles.length; i++){
        blacktiles[i].z = -1
    }

})
// No TKing
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BlackChecker, function(sprite: Sprite, otherSprite: Sprite) {
    if(ply == "black" && otherSprite != selected){
        sprite.destroy()
    }
}) 
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.WhiteChecker, function(sprite: Sprite, otherSprite: Sprite) {
    if(ply == "white" && otherSprite != selected){
        sprite.destroy()
    }
}) 

}

