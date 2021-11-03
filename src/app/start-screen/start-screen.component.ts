import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from '../models/game';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private router: Router, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  newGame(){
    // start game
    let game = new Game();
    this.firestore
    .collection('Games')
    .add(game.toJson())   //game.JSON an firestore übergeben.
    .then((gameInfo:any) => {     // then wird einmal aufgerufen und alle werte werden zurückgegeben. Auch die id

     // console.log(gameInfo);
  
     this.router.navigateByUrl('/game/' + gameInfo.id); // hier starten wir das neu erstelllte game mit der neuen url.id
    });    
    }
}
