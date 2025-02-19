const fs = require('fs');
const [n, first, ...input] = fs.readFileSync('./input.txt').toString().trim().split('\n');

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  getMax() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  getLen() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return max;
  }

  bubbleUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] >= this.heap[index]) break;
      [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
      index = parent;
    }
  }

  bubbleDown() {
    const length = this.heap.length;
    let index = 0;

    while (true) {
      let swap = index;
      let leftChild = index * 2 + 1;
      let rightChild = index * 2 + 2;

      if (leftChild < length && this.heap[leftChild] > this.heap[swap]) swap = leftChild;

      if (rightChild < length && this.heap[rightChild] > this.heap[swap]) swap = rightChild;

      if (index === swap) break;

      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  getMin() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  getLen() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] <= this.heap[index]) break;
      [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
      index = parent;
    }
  }

  bubbleDown() {
    const length = this.heap.length;
    let index = 0;

    while (true) {
      let swap = index;
      let leftChild = index * 2 + 1;
      let rightChild = index * 2 + 2;

      if (leftChild < length && this.heap[leftChild] < this.heap[swap]) swap = leftChild;

      if (rightChild < length && this.heap[rightChild] < this.heap[swap]) swap = rightChild;

      if (index === swap) break;

      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }
}

const minHeap = new MinHeap();
const maxHeap = new MaxHeap();
const answer = [];

maxHeap.insert(first);
answer.push(first);

input.forEach((val) => {
  const num = parseInt(val);
  const mid = maxHeap.getMax();

  if (num < mid) {
    maxHeap.insert(num);
    if (maxHeap.getLen() - minHeap.getLen() > 1) minHeap.insert(maxHeap.extractMax());
  } else {
    minHeap.insert(num);
    if (minHeap.getLen() - maxHeap.getLen() > 0) maxHeap.insert(minHeap.extractMin());
  }

  answer.push(maxHeap.getMax());
});

console.log(answer.join('\n'));