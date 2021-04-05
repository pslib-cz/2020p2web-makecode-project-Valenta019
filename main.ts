namespace SpriteKind{
    export const BlackTile = SpriteKind.create()
    export const WhiteTile = SpriteKind.create()
} 


scene.setBackgroundColor(1)
let blacktiles = []
for (let i = 0; i < 8; i++) {
    let blacktilerow = []
    for (let j = 0; j < 8; j++) {
         blacktilerow[j] = sprites.create(img`
             f f f f f f f f f f f f f f f f
             f f f f f f f f f f f f f f f f
             f f f f f f f f f f f f f f f f
             f f f f f f f f f f f f f f f f
             f f f f f f f f f f f f f f f f
             f f f f f f f f f f f f f f f f
             f f f f f f f f f f f f f f f f
             f f f f f f f f f f f f f f f f
             f f f f f f f f f f f f f f f f
             f f f f f f f f f f f f f f f f
             f f f f f f f f f f f f f f f f
             f f f f f f f f f f f f f f f f
             f f f f f f f f f f f f f f f f
             f f f f f f f f f f f f f f f f
             f f f f f f f f f f f f f f f f
             f f f f f f f f f f f f f f f f
         `,SpriteKind.BlackTile)
    }
    blacktiles[i] = blacktilerow
}
