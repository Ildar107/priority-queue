const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		let node = new Node(data,priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if(this.isEmpty())
			return;
		let node = this.detachRoot();
		this.restoreRootFromLastInsertedNode(node);
		return node.data;
	}

	detachRoot() {
		var node = this.root;
		this.root = null;
		var index = this.parentNodes.findIndex(x => x === node);
		if(index >= 0)
			this.parentNodes.shift();
		return node;
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastInsertedNode = this.parentNodes.pop();

		if(detached.left !== null)
			detached.left.parent = lastInsertedNode;
		if(detached.right !== null)
			detached.right.parent = lastInsertedNode;
			
		lastInsertedNode.left = detached.left;
		lastInsertedNode.right = detached.right;
		this.root = lastInsertedNode;
		this.parentNodes.unshift(lastInsertedNode);
	}

	size() {
		
	}

	isEmpty() {
		return this.root === null;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if(this.root === null)
		{
			this.root = node;
		}
		else
		{
			let parent = this.parentNodes[0];
			parent.appendChild(node);
			if(parent.left !== null && parent.right !== null)
				this.parentNodes.shift();
		}
		this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
		if(node.parent !== null && node.priority > node.parent.priority)
		{
			var prevIndex = this.parentNodes.findIndex(x => x === node);
			var nextIndex = this.parentNodes.findIndex(x => x === node.parent);
			this.parentNodes[prevIndex] = node.parent;
			this.parentNodes[nextIndex] = node;
			if(node.parent === this.root)
				this.root = node;
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
