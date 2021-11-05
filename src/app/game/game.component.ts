import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game | any;
  gameId: string | undefined;
  gameOver = false;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.newGame();
    this.route
      .params
      .subscribe((params) => {
        // console.log(params.id);
        this.gameId = params.id;

        this.firestore
          .collection('Games')    // an Games andocken
          .doc(this.gameId)         // die id holen
          .valueChanges()         // veränderte werte zurückbekommen
          .subscribe((game: any) => {  // abonniere game
            console.log("game update", game);

            this.game.currentPlayer = game.currentPlayer; // hier wird dem game mit der richtige id alle werte neu zugewiesen
            this.game.playedCards = game.playedCards;
            this.game.players = game.players;
            this.game.player_images = game.player_images;
            this.game.stack = game.stack;
            this.game.currendCard = game.currendCard;
            this.game.pickCardAnimation = game.pickCardAnimation;

          });
      });
  }



  saveGame() {
    this.firestore
      .collection('Games')    // an Games andocken
      .doc(this.gameId)
      .update(this.game.toJson());
  }

  newGame() {
    this.game = new Game();   // Der Inhalt aus game.ts wird der Variable game in zeile 13 zugeordnet.
  }
  takeCard() {
    if(this.game.stack.length == 0){
      this.gameOver = true;
    }
    else if (!this.game.pickCardAnimation) {    // wird auf false gesetzt. dadurch kann erst eine neue Karte gezogen werden wenn die Animation durch ist.
      this.game.currendCard = this.game.stack.pop();   // pop() gibts den letzten eintrag im Array raus
      this.game.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();

      setTimeout(() => {  // Animation zurücksetzen, damit es bei jedem Karten aufdecken funktioniert
        this.game.playedCards.push(this.game.currendCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000)   // 1000ms = 1s
    }
  }

  editPlayer(playerId: number) {
    console.log('edit player', playerId);

    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
        } else {
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('1.webp');
        this.saveGame();
      }

    });
  }

}

