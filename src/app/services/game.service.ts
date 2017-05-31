import { Story } from 'app/model/story';
import { Game } from './../model/game';
//import { UserService } from './../shared/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import * as firebase from 'firebase/app';
//import { Subject } from "rxjs/Subject";


@Injectable()
export class GameService {

  constructor(private auth: AngularFireAuth,
    private db: AngularFireDatabase) { }
  
  //private gameSource = new Subject<Game>();
  //game$ = this.gameSource.asObservable();
  //public game: any;

  createGame(game: Game)  {
    game.createdBy = this.auth.auth.currentUser.displayName;
    game.createdDate = Date();
    game.status = "Open";
    console.log("createGame service, creating game: ", game.name);
    let storyPointGame = this.db.list("game");
    var newStoryRef = storyPointGame.push(game);
    game.$key = newStoryRef.key;
    
    
  }

  createStory(gameKey: string, story: Story) {
    story.createdBy = this.auth.auth.currentUser.displayName;
    story.createdDate = Date();
    story.status = "Open";
    let storyPointGameStory = this.db.list(`game/${gameKey}/stories`)
    storyPointGameStory.push(story);
  }

  getGames() : FirebaseListObservable<any[]> {
    console.log("getGames");
    return this.db.list("game", { query: { orderByChild: 'createDate' } });
  }

  getGameByKey(key: string) : FirebaseObjectObservable<any> {
    return this.db.object(`game/${key}`)
  }

  deleteGame(game: Game, key: string) {
  
    console.log("game name = ", game.name, key);
    //console.log("key: ", key)
    const gameToRemove = this.db.list(`game/${key}`)
    //const listToRemove = this.af.database.list(`shoppingLists/${store}`)
    gameToRemove.remove();
    //storeToRemove.remove();
  }
}
