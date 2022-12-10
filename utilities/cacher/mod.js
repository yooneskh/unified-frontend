

function clone(thing) {
  return JSON.parse(JSON.stringify(thing));
}

export class YCacher {

  constructor() {
    this.cache = new Map();
    this.preempts = new Map();
  }


  has(key) {
    return this.cache.has(key) || this.preempts.has(key);
  }

  async get(key) {
    if (this.cache.has(key)) {
      return clone(this.cache.get(key));
    }
    else if (this.preempts.has(key)) {
      return await this.preempts.get(key);
    }
  }


  set(key, value) {
    this.cache.set(
      key,
      Object.freeze(clone(value))
    );
  }

  delete(key) {
    this.cache.delete(key);
  }


  preempt(key, promise) {

    if (this.cache.has(key)) {
      return this.get(key);
    }

    if (this.preempts.has(key)) {
      return this.preempts.get(key);
    }

    const preemptPromise = new Promise(resolve => {
      promise().then(result => {

        this.set(key, result);
        this.preempts.delete(key);

        resolve(this.get(key));

      });
    });

    this.preempts.set(key, preemptPromise);
    return preemptPromise;

  }

}
