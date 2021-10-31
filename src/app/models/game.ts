export class Game {     // alle eigenschaften vom Spiel in einer Datei
    public players: string[] = [];    // genauer validiert. string[].( genauerere definition )
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('clubs_' + i)
            this.stack.push('diamonds_' + i)
            this.stack.push('hearts_' + i)
            this.stack.push('spade_' + i)
        }
        shuffle(this.stack);
    }
}

function shuffle(array: any[]) {    // any steht für jeden typ. // Sortiert das Kartendeck
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}