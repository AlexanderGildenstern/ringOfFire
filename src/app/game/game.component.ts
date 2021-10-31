import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currendCard: string = '';
  game: any;
  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();   // Der Inhalt aus game.ts wird der Variable game in zeile 13 zugeordnet.
  }
  takeCard() {
    if (!this.pickCardAnimation) {    // wird auf false gesetzt. dadurch kann erst eine neue Karte gezogen werden wenn die Animation durch ist.
      this.currendCard = this.game.stack.pop();   // pop() gibts den letzten eintrag im Array raus
      this.pickCardAnimation = true;

      setTimeout(() => {  // Animation zurücksetzen, damit es bei jedem Karten aufdecken funktioniert
        this.game.playedCards.push(this.currendCard);
        this.pickCardAnimation = false;
      }, 1000)   // 1000ms = 1s
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
  

    dialogRef.afterClosed().subscribe((name: string) => {
      this.game.players.push(name);
    });
  }

}

