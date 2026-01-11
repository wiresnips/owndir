module.exports = {
  Queue,
  AsyncQueue,
  QueueStream
}

// seems a little odd that I had to build this myself, but here we are

function Queue (initialCapacity) {
  initialCapacity = initialCapacity || 32; // man, I dunno - gotta pick _something_ right?
  return {
    capacity: initialCapacity,
    size: 0,
    from: 0,
    queue: new Array(initialCapacity),

    // hook for ~shenanigans~: filter, map, trigger side-effects
    // if this is present, it will run when something is pulled, with one arg: the item
    // whatever is returned, is what will be pulled out of the queue
    // if it returns `undefined`, queue.pull won't return it at all - this is the filter mechanism
    onPull: null, 

    pull () {
      while (this.size > 0) {
        let item = this.queue[this.from];
        this.queue[this.from] = null;
        this.size--;
        this.from = (this.from + 1) % this.capacity;

        if (this.onPull) {
          item = this.onPull(item);
        }

        // allows onPull to act as a filter by returning undefined
        if (item !== undefined) {
          return item;
        }
      }

      return undefined;
    },

    push (item, ...args) {
      if (this.size == this.capacity) {
        this.grow();
      }
      this.queue[(this.from + this.size) % this.capacity] = item;
      this.size++;
    },

    grow () {
      const newCapacity = this.capacity * 2;
      const newQueue = new Array(newCapacity);
      for (let i = 0; i < this.size; i++) {
        newQueue[i] = this.queue[(this.from + i) % this.capacity];
      }
      this.capacity = newCapacity;
      this.queue = newQueue;
      this.from = 0;
    }
  }
}

function AsyncQueue (initialCapacity) {
  return {
    ...Queue(initialCapacity),

    waitlist: Queue(),

    async pullOrWait () {
      // console.log("AsyncQueue pullOrWait 1", { queue: this })
      const item = this.pull();
      if (item !== undefined) {
        return item;
      }
      return new Promise((resolve) => this.waitlist.push(resolve))
    },

    push (item) {
      // console.log("AsyncQueue push 1", { queue: this, item })

      // if we have a waitlist, resolve immediately
      if (this.waitlist.size > 0) {
        // if we have a filter/transform/side-effect, apply it
        if (this.onPull) {
          item = this.onPull(item);
        }
        // if the item didn't get filtered, resolve the next wait
        if (item !== undefined) {
          const resolveFn = this.waitlist.pull();
          resolveFn(item)
        }
        return;
      }

      if (this.size == this.capacity) {
        this.grow();
      }
      this.queue[(this.from + this.size) % this.capacity] = item;
      this.size++;
    }
  }
}


function QueueStream (initialCapacity, queueingStrat) {
  const queue = AsyncQueue(initialCapacity);
  queueingStrat = queueingStrat || { highwatermark: 1024 };
  
  const stream = new ReadableStream({
    async pull (controller) {
      // console.log("QueueStream pull 1", { queue })
      const chunk = await queue.pullOrWait();
      // console.log("QueueStream pull 2", { chunk })
      if (chunk) {
        return controller.enqueue(chunk);
      } else {
        return controller.close();
      }
    }
  }, queueingStrat)

  return {
    queue,
    stream
  }
}