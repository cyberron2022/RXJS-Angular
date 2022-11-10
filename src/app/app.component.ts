import { Component, OnInit, VERSION } from '@angular/core';
import { of, from, map, tap, take, Observable } from 'rxjs';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  ngOnInit() {
    // of(1, 2, 3, 4, 5).subscribe((item) => {
    //   console.log(item);
    // });

    // from([10, 20, 30, 40, 50]).subscribe({
    //   next: (item) => console.log('Result Item: ', item),
    //   error: (err) => console.log('Error', err),
    //   complete: () => console.log('Completed'),
    // });

    // of('apple1', 'apple2', 'apple3').subscribe({
    //   next: (item) => console.log('Result Item: ', item),
    //   error: (err) => console.log('Error', err),
    //   complete: () => console.log('Completed'),
    // }).unsubscribe;

    of(20, 15, 10, 5, 0, 23, 33, 44, 51)
      .pipe(
        tap((item) => {
          let x: number = item;
          x = x * 2;
          x = x - 10;
          if (x > 0) console.log('emitted items', item);
        }),
        map((item: number) => item * 2),
        map((item: number) => item - 10),

        map((item: number) => {
          if (item < 0 || item === 0) {
            throw new Error('zero and negative value detected');
          } else {
            return item;
          }
        }),
        take(5) // get 5 items only (20 ,15 , 10 , 5 , 0)
      )
      .subscribe({
        next: (item) => console.log(`Result Item: ${item}`), // success result
        error: (err) => console.log(`${err}`), //catch the error from PIPE using map
        complete: () => console.log('Completed'), // unsubscribed the subscription
      }).unsubscribe;
  }
}

export function mapping(fn: any) {
  return (input: any) =>
    new Observable((observer) => {
      return input.subscribe({
        next: (value: any) => observer.next(fn(value)),
        error: (err: any) => observer.error(err),
        complete: () => observer.complete(),
      });
    });
}
