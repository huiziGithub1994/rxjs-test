class Scheduler {
  constructor() {
    this.pool = [];
    this.count = 0;
    this.threshold = 2;
  }

  add(task) {
    // 入
    let resolve = null;
    let reject = null;
    const wrap = new Promise((a, b) => {
      resolve = a;
      reject = b;
    }).then(task);
    this.pool.push({
      resolve,
      reject,
      wrap
    });

    if (this.count < this.threshold) {
      this.run();
    }
    return wrap;
  }

  remove() {
    // 出
    this.count++;
    return this.pool.shift();
  }

  async run() {
    // 消费
    if (this.pool.length === 0) return;
    const { resolve, wrap } = this.remove();
    resolve();
    await wrap.then(() => {
      this.count--;
      this.run();
    });
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
