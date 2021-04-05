namespace SpriteKind{
    export const BlackTile = SpriteKind.create()
    export const WhiteTile = SpriteKind.create()
    export const Selector = SpriteKind.create()
    export const BlackChecker = SpriteKind.create()
    export const WhiteChecker = SpriteKind.create()
    //export const BlackLady = SpriteKind.create()
    //export const WhiteLady = SpriteKind.create()
}

scene.setBackgroundColor(6)

// Globals
let checkertiles = [ [] as Sprite[]] //Chessboard
let selector = sprites.create(assets.image`Selector_grn`,SpriteKind.Selector)
selector.z = 10
let black = {checkers: [] as Sprite[], startSide:0}
let white = {checkers: [] as Sprite[], startSide:1}

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
    //selector.z = 10

}


controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    if (selectorPos["x"] - tileWidth >= 0){
        selectorPos["x"] -= tileWidth
        UpdateSelectorPos()
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    if (selectorPos["x"] + tileWidth <= 160){
        selectorPos["x"] += tileWidth
        UpdateSelectorPos()
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
    if (selectorPos["y"] - tileHeight >= 0){
        selectorPos["y"] -= tileHeight
        UpdateSelectorPos()
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function() {
    if (selectorPos["y"] + tileHeight <= 120){
        selectorPos["y"] += tileHeight
        UpdateSelectorPos()
    }
})

UpdateSelectorPos()
}


{// ### Selector selecting

//Checker selecting
sprites.onOverlap(SpriteKind.Selector, SpriteKind.BlackChecker, function(sprite: Sprite, otherSprite: Sprite) {
    if (ply == "black"){
        if (controller.A.isPressed()) {
            Deselect()
            selected = otherSprite
            DetermineMoves(selected)
        }
    }
})
sprites.onOverlap(SpriteKind.Selector, SpriteKind.WhiteChecker, function(sprite: Sprite, otherSprite: Sprite) {
    if (ply == "white"){
        if (controller.A.isPressed()) {
            Deselect()
            selected = otherSprite           
            DetermineMoves(selected)
        }
    }
})

//Target selecting & movement
sprites.onOverlap(SpriteKind.Selector, SpriteKind.BlackTile, function(sprite: Sprite, otherSprite: Sprite) {
     if(otherSprite.image.equals(assets.image`Green_tile`)){
         selector.setImage(assets.image`Selector_red`)
        if (controller.A.isPressed()) {
            selected.setPosition(otherSprite.x, otherSprite.y)
            Deselect()
            if (ply =="white"){
                ply = "black"
            }
            else
            {ply = "white"}

        }
    }
    else{
        selector.setImage(assets.image`Selector_grn`)
    }
})

    sprites.onOverlap(SpriteKind.Selector, SpriteKind.WhiteTile, function(sprite: Sprite, otherSprite: Sprite) {
        selector.setImage(assets.image`Selector_grn`)
    })


 function Deselect(){
    selected = null 
    for (let i = 0; i < checkertiles.length; i++) {
        for ( let j = 0; j < checkertiles[i].length; j++)
        if (checkertiles[i][j].image.equals(assets.image`Green_tile`)){
            checkertiles[i][j].setImage(assets.image`Black_tile`)
        }
    }
 
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function(){
    Deselect()
})
}

{// ### Moves determination
let lastTouchedBlack:Sprite = null
const way = 1000
const wayX = [way, -way, way, -way]
const wayY = [way-100, way-100, -way+100, -way+100]

    function DetermineMoves(forwhat:Sprite) {
        if (forwhat != null){
            for (let i=0;i<4;i++){
                let projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . f f . . . . . . .
                . . . . . . . f f . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                `, selected, wayX[i], wayY[i])
                //projectile.setFlag(SpriteFlag.Invisible, true)
            }
        }
    }
    // Selected tile ghosting
    /*sprites.onOverlap(SpriteKind.Selector, SpriteKind.BlackTile, function(sprite: Sprite, otherSprite: Sprite) {
        lastTouchedBlack = otherSprite
        lastTouchedBlack.setFlag(SpriteFlag.Ghost, true)
    })
        sprites.onOverlap(SpriteKind.Selector, SpriteKind.WhiteTile, function(sprite: Sprite, otherSprite: Sprite) {
        lastTouchedBlack.setFlag(SpriteFlag.Ghost, false)
    })*/

 // Ignore the tile you are on, ladies have infinite range
    sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BlackTile, function(sprite: Sprite, otherSprite: Sprite) {
        if (!otherSprite.overlapsWith(selector)){
            otherSprite.setImage(assets.image`Green_tile`)
            if (!selected.image.equals(assets.image`White_lady`) || !selected.image.equals(assets.image`Black_lady`)){
                sprite.destroy()
            }
        }
        
    })

 // Occupied tiles can't be green
    sprites.onOverlap(SpriteKind.BlackChecker, SpriteKind.BlackTile, function(sprite: Sprite, otherSprite: Sprite) {
        otherSprite.setImage(assets.image`Black_tile`)
    })
    sprites.onOverlap(SpriteKind.WhiteChecker, SpriteKind.BlackTile, function(sprite: Sprite, otherSprite: Sprite) {
        otherSprite.setImage(assets.image`Black_tile`)
    })
}

game.onUpdate(function() {
    
})
