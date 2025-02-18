const fs = require('fs');
const [n, ...input] = fs.readFileSync("./input.txt").toString().trim().split("\n");

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  extractMax() {
    if (this.heap.length === 0) return 0;
    if (this.heap.length === 1) {
      return this.heap.pop()
    }

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
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let leftChild = index * 2 + 1;
      let rightChild = index * 2 + 2;
      let swap = index;

      if (leftChild < length && this.heap[leftChild] > this.heap[swap]) {
        swap = leftChild;
      }

      if (rightChild < length && this.heap[rightChild] > this.heap[swap]) {
        swap = rightChild;
      }

      if (index === swap) break;

      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }
}

const maxHeap = new MaxHeap();
const answer = [];

input.forEach((val) => {
  const num = parseInt(val);
  if (num === 0) {
    answer.push(maxHeap.extractMax());
  } else {
    maxHeap.insert(num)
  }
});

console.log(answer.join('\n'));