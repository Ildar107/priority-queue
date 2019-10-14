const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = null) {
		this.maxSize = maxSize === null ? 30 : maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if(this.heap.count === this.maxSize)
			throw new Error();
		this.heap.push(data, priority);
	}

	shift() {
		if(this.heap.isEmpty())
			throw new Error();
		return this.heap.pop();
	}

	size() {
		return this.heap.count;
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
