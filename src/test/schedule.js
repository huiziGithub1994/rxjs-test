import { resolve } from "path";

class Scheduler {
  constructor() {
    this.tasks = [];
    this.count = 0;
  }
  add(task) {
    this.tasks.push(
      () =>
        new Promise(resolve => {
          task();
          resolve();
        })
    );
    this.runTask();
  }
  runTask() {
    if (this.count < 2 && this.tasks.length) {
      this.tasks[this.count]().then(() => {
        this.tasks.slice(this.count, 1);
        this.count--;
        this.runTask();
      });
      this.count++;
    }
  }
}

const timeout = time => new Promise(r => setTimeout(r, time));

const scheduler = new Scheduler();

const addTask = (time, log) =>
  scheduler.add(() => timeout(time).then(() => console.log(log)));

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);
