import { Game } from './../model/game';
import { CardDeckService } from './../services/card-deck.service';
import { GameControllerComponent } from './../game-controller/game-controller.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  cards;
  hideFront: boolean;
  hideBack: boolean;
  cardDeck: string;
  game: Game = new Game();

  constructor(private router: Router, private _cardDeckService: CardDeckService, private route: ActivatedRoute) { }


  ngOnInit() {


    this.hideFront = false;
    this.hideBack = true;

    //console.log("Router data from new game:",this.);

    this.route.data
      .do(data => console.log("Chekc for key:", data.game))
      .subscribe(data => this.game = data.game);

    console.log("card set is...", this.game.cardSet);
    this.cardDeck = this.game.cardSet;
    this.cards = this._cardDeckService.getCards(this.cardDeck);

  }


  FlipCards() {
    console.log('flip the cards!');
    this.hideFront = true;
    this.hideBack = false;
  }



}


