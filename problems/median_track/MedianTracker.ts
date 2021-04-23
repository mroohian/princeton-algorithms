import { DefaultMinComparator, DefaultMaxComparator } from '../../ds/comparator/Comparator.ts';
import { PriorityQueue } from '../../ds/priority_queue/PriorityQueue.ts';

export class MedianTracker {
  #minPriorityQueue = new PriorityQueue<number>(DefaultMinComparator);
  #maxPriorityQueue = new PriorityQueue<number>(DefaultMaxComparator);

  public add(value: number): void {
    const min = this.#minPriorityQueue.peek() ?? Infinity;

    if (value > min) {
      this.#minPriorityQueue.push(value);
    } else {
      this.#maxPriorityQueue.push(value);
    }

    if (this.#minPriorityQueue.size > this.#maxPriorityQueue.size + 1) {
      this.#maxPriorityQueue.push(this.#minPriorityQueue.pop());
    } else if (this.#maxPriorityQueue.size > this.#minPriorityQueue.size + 1) {
      this.#minPriorityQueue.push(this.#maxPriorityQueue.pop());
    }
  }

  public median(): number {
    if (this.#minPriorityQueue.size > this.#maxPriorityQueue.size) {
      return this.#minPriorityQueue.peek() ?? NaN;
    } else if (this.#minPriorityQueue.size < this.#maxPriorityQueue.size) {
      return this.#maxPriorityQueue.peek() ?? NaN;
    }

    return (
      ((this.#minPriorityQueue.peek() ?? NaN) +
        (this.#maxPriorityQueue.peek() ?? NaN)) /
      2
    );
  }
}
