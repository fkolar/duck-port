import {ChangeDetectorRef, Component, ElementRef, NgZone, OnInit} from '@angular/core';
import * as dh from './duck-hunt';

@Component({
  selector: 'app-duck-hunt',
  template: ``,
  styles: ['']
})
export class DuckHuntComponent implements OnInit {
  private game: any;
  score: number = 0;


  constructor(private elementRef: ElementRef, private ngZone: NgZone,
              private _cd: ChangeDetectorRef) {

  }


  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.game = new Game({
        spritesheet: 'sprites.json'
      });
      this.game.load(this.elementRef.nativeElement);
    });

    this.game.registerOnScoreChange((score: number) => {
      this.score = score
      console.log(this.score)
      this._cd.detectChanges();

    })
  }

}
