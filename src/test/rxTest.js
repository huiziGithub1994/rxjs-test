import * as Rx from "rxjs/Rx";
import { create } from "rxjs-spy";
import { Observable, Subject } from "rxjs/Rx";
import { pluck, share, pipe, shareReplay } from "rxjs/operators";
import { tag } from "rxjs-spy/operators/tag";
// const button = document.querySelector('button');
// const click = Rx.Observable.fromEvent(button,'click');
// click.subscribe(x => console.log(x))

const spy = create();

const routeEnd = new Subject();
const lastUrl = routeEnd.pipe(
  pluck("url"),
  shareReplay(1)
);

const initalSubscriber = lastUrl.subscribe(x => console.log(1, x));

routeEnd.next({ data: {}, url: "my-path" });
routeEnd.next({ data: {}, url: "your-path" });

const lateSubscriber = lastUrl.subscribe(x => console.log(2, x));
