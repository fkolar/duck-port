import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  NgZone,
  OnInit
} from '@angular/core';
import {environment} from '../../environments/environment';


export interface GameConnector {
  onScore: EventEmitter<number>;

  play(): void;

  reset(): void;
}


@Component({
  selector: 'app-duck-hunt',
  template: ``,
  styles: ['']
})
export class DuckHuntComponent implements OnInit, GameConnector {
  private game: any;
  score: number = 0;

  onScore = new EventEmitter<any>();


  constructor(private elementRef: ElementRef, private ngZone: NgZone,
              private _cd: ChangeDetectorRef,
              private _injector: Injector) {
  }


  async ngOnInit(): Promise<void> {
    // @ts-ignore
    const dh = await import('duck-hunt');
    this.ngZone.runOutsideAngular(() => {

      this.game = new dh.Game({
        spritesheet: `${environment.host}/sprites.json`,
        host: environment.host
      });
      this.play();
    });

    this.game.registerOnScoreChange((score: number, toSave: boolean) => {
      this.score = score
      this.onScore.emit({
        score: score,
        canSave: toSave
      });
      this._cd.detectChanges();

    })
  }

  play(): void {
    this.game.load(this.elementRef.nativeElement);
  }

  reset(): void {
    if (this.game) {
      this.game.stopGame();
      this.game = undefined;
    }
  }
}
