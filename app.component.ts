// app.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  interval$!: Observable<number>;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    // Do not initialize interval$ here
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  start() {
    console.log('Start button clicked');
    this.destroy$ = new Subject<void>();
    this.interval$ = interval(1000).pipe(
      takeUntil(this.destroy$)
    );
  }

  stop() {
    this.destroy$.next();
    console.log('Stop button clicked');
  }
}

