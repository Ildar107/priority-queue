const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.count = 0;
	}

	push(data, priority) {
		let node = new Node(data,priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.count += 1;
	}

	pop() {
		if(this.isEmpty())
			return;
		const node = this.detachRoot();
		this.restoreRootFromLastInsertedNode(node);
		this.shiftNodeDown(this.root);
		this.count -= 1;
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
		if(this.parentNodes.length === 0)
			return;

		let lastInsertedNode = this.parentNodes.pop();
		if(detached.left === undefined)
			return;
		
		if(lastInsertedNode.parent !== null && lastInsertedNode.parent !== detached && lastInsertedNode.parent.right !== null)
		{
			let index = this.parentNodes.findIndex(x => lastInsertedNode.parent === x);
			if(index < 0)
			{
				this.parentNodes.push(lastInsertedNode.parent);
				this.parentNodes.sort((x,y) => x.priority < y.priority);
			}
		}
		if(lastInsertedNode.parent !== null && lastInsertedNode.parent.left === lastInsertedNode)
			lastInsertedNode.parent.left = null;
		if(lastInsertedNode.parent !== null && lastInsertedNode.parent.right === lastInsertedNode)
			lastInsertedNode.parent.right = null;
		lastInsertedNode.parent = null;
		if(detached.left !== null)
			detached.left.parent = lastInsertedNode;
		if(detached.right !== null)
			detached.right.parent = lastInsertedNode;
		
		if(detached.left !== lastInsertedNode)
			lastInsertedNode.left = detached.left;
		if(detached.right !== lastInsertedNode)
			lastInsertedNode.right = detached.right;

		this.root = lastInsertedNode;
		if(this.root.left === null || this.root.right === null)
			this.parentNodes.unshift(lastInsertedNode);
	}

	size() {
		return this.count;
	}

	isEmpty() {
		return this.root === null;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.count = 0;
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
			if(prevIndex >= 0)
				this.parentNodes[prevIndex] = node.parent;
			if(nextIndex >= 0)
				this.parentNodes[nextIndex] = node;
			if(node.parent === this.root)
				this.root = node;
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if(node === null)
			return;

		if(node.left !== null && node.left.priority > node.priority && (node.right !== null && node.left.priority > node.right.priority || node.right === null))
		{
			var prevIndex = this.parentNodes.findIndex(x => x === node.left);
			var nextIndex = this.parentNodes.findIndex(x => x === node);
			if(prevIndex >=0)
				this.parentNodes[prevIndex] = node;
			if(nextIndex >=0)
				this.parentNodes[nextIndex] = node.left;
			if(node === this.root)
				this.root = node.left;
			node.left.swapWithParent();
			this.shiftNodeDown(node);
		}
		else if(node.right !== null && node.right.priority > node.priority && (node.left !== null && node.right.priority > node.left.priority || node.left === null))
		{
			var prevIndex = this.parentNodes.findIndex(x => x === node.right);
			var nextIndex = this.parentNodes.findIndex(x => x === node);
			if(prevIndex >=0)
				this.parentNodes[prevIndex] = node;
			if(nextIndex >=0)
				this.parentNodes[nextIndex] = node.right;
			if(node === this.root)
				this.root = node.right;
			node.right.swapWithParent();
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
