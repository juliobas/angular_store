import { Component, Input, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration: number = 0;
  @Input({required: true}) message: string = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    // NO ASYNC CALLS IN CONSTRUCTOR
    // Before render
    // Called only once
    console.log("constructor");
    console.log("-".repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    // Before and during render
    console.log("ngOnChanges");
    console.log("-".repeat(10));
    console.log(changes);
    const duration = changes['duration'];
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSomething();
    }
  }

  ngOnInit() {
    // After render
    // Called only once
    // async, then, subscribe
    console.log("ngOnInit");
    console.log("-".repeat(10));
    console.log('duration => ', this.duration);
    console.log('message => ', this.message);
    this.counterRef = window.setInterval(() => {
      console.log('run interval');
      this.counter.update(statePrev => statePrev + 1);
    }, 1000);
  }

  ngAfterViewInit() {
    // After render
    // childs are rendered
    console.log("ngAfterViewInit");
    console.log("-".repeat(10));
  }

  ngOnDestroy() {
    // Before destroy
    // Called only once
    console.log("ngOnDestroy");
    console.log("-".repeat(10));
    window.clearInterval(this.counterRef);
  }

  doSomething() {
    console.log('change duration');
    // async
  }
}
