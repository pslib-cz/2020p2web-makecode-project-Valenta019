{// ### Selector selecting

//Checker selecting
sprites.onOverlap(SpriteKind.Selector, SpriteKind.BlackChecker, function(sprite: Sprite, otherSprite: Sprite) {
    if (ply == "black"){
        if (controller.A.isPressed()) { 
            if (otherSprite != selected){             
            Deselect()
            selected = otherSprite
            determineMoves(selected)
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Selector, SpriteKind.WhiteChecker, function(sprite: Sprite, otherSprite: Sprite) {
    if (ply == "white"){
        if (controller.A.isPressed()) {
            if (otherSprite != selected){
            Deselect()
            selected = otherSprite           
            determineMoves(selected)
            }
        }
    }
})

function EndTurn() {
    if (ply == "white"){
        selector.setImage(assets.image`Selector_red`)
        ply = "black"
    }
    else {
        selector.setImage(assets.image`Selector_blu`)
        ply = "white"   
    }
}
game.onUpdate(function() {
    for (let item of sprites.allOfKind(SpriteKind.Taker)){
        if (item.vx == 0 && item.vy == 0){
            item.destroy()
            
            
        }
    }
})

sprites.onDestroyed(SpriteKind.Taker, function(sprite: Sprite) {
    Deselect()
    EndTurn()
})
    
let lastTarget:Sprite = null
//Target selecting & movement
sprites.onOverlap(SpriteKind.Selector, SpriteKind.BlackTile, function(sprite: Sprite, otherSprite: Sprite) {
    if(otherSprite.image.equals(assets.image`Green_tile`)){
         //selector.setImage(assets.image`Selector_red`) // Selector highlighting on green tiles, ditched
        if (controller.A.isPressed()) {
            if (lastTarget != otherSprite){
            lastTarget = otherSprite
                let taker = sprites.createProjectileFromSprite(img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . 2 2 . . . . . . .
                    . . . . . . . 2 2 . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, selected, 0 ,0)
                taker.setKind(SpriteKind.Taker)
                //taker.setFlag(SpriteFlag.Invisible, true)
                taker.follow(otherSprite)

            selected.setPosition(otherSprite.x, otherSprite.y)
                 
            /*Deselect()
            EndTurn()*/
            }
        }
    }
    /*else{ // Selector colour reverting
    if (ply == "white"){
        selector.setImage(assets.image`Selector_blu`)
    }
    else selector.setImage(assets.image`Selector_red`)
    }*/
})
sprites.onOverlap(SpriteKind.Taker, SpriteKind.BlackChecker, function(sprite: Sprite, otherSprite: Sprite) {

    if (ply == "white"){
    otherSprite.destroy()
    info.player2.changeScoreBy(1)
    sprite.destroy()
    }
})
sprites.onOverlap(SpriteKind.Taker, SpriteKind.WhiteChecker, function(sprite: Sprite, otherSprite: Sprite) {
    if (ply == "black"){
    otherSprite.destroy()
    info.player1.changeScoreBy(1)
    sprite.destroy()
    }
})
sprites.onDestroyed(SpriteKind.BlackChecker, function(sprite: Sprite) {
    let i = 0
    let nullCount = 0
    for(let item of black.checkers){
        if (item == sprite){
            black.checkers.set(i,null)
        }
        else if(item == null){
            nullCount++
        }
        i++
    }
    if (nullCount == black.checkers.length){
        game.over()
    }
    
})
sprites.onDestroyed(SpriteKind.WhiteChecker, function(sprite: Sprite) {
    let i = 0
    let nullCount = 0
    for(let item of white.checkers){
        if (item == sprite){
            white.checkers.set(i,null)
        }
        else if(item == null){
            nullCount++
        }
        i++
    }
    if (nullCount == white.checkers.length){
        game.over()
    }
    
})
// Selector colour reverting
/*sprites.onOverlap(SpriteKind.Selector, SpriteKind.WhiteTile, function(sprite: Sprite, otherSprite: Sprite) {
    if (ply == "white"){
        selector.setImage(assets.image`Selector_blu`)
    }
    else selector.setImage(assets.image`Selector_red`)
    
})*/

// Deselecting
 function Deselect(){
    selected = null
    for (let i = 0; i < checkertiles.length; i++) {
        for ( let j = 0; j < checkertiles[i].length; j++)
        if (checkertiles[i][j].image.equals(assets.image`Green_tile`)){
            checkertiles[i][j].setImage(assets.image`Black_tile`)
        }
    }
    lastTarget = null
 
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function(){
    Deselect()
})
}