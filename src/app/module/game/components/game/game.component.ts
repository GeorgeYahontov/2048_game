import {Component, HostListener, OnInit} from '@angular/core';
import {Item} from "../../models/item";
import {GameService} from "../../servisces/game.service";

const colorMap:{[k:number]:string}={
  2: '#626567',
  4: '#424949',
  8: '#7E5109',
  16: '#196F3D',
  32: '#154360',
  64: '#9B59B6',
  128: '#78281F',
  256: '#C0392B',
  512: '#7D6608',
  1024: '#138D75',
  2048: '#45D3B9',
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  keyEventCodeMap:{[type:string]:string} = {
    ArrowRight: 'right',
    ArrowLeft: 'left',
    ArrowUp: 'up',
    ArrowDown: 'down',
  }
  gameService!: GameService;

  constructor(private readonly _gameService: GameService) { }

  ngOnInit(): void {
    this.gameService = this._gameService;
  }
  getStyles(item:Item):{[p:string]: string}{
    const top = (item.row * 110 - 100) + 'px';
    const left = (item.col * 110 - 100) + 'px';

    return {top,left, 'background-color': colorMap[item.value] || 'black'}
  }
  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent){
    if(this.keyEventCodeMap[event.code]){
      this.gameService[this.keyEventCodeMap[event.code]]()
    }
  }

}
