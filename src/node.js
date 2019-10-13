class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left === null)
		{	
			this.left = node;
			this.left.parent = this;
		}
		else if(this.right === null)
		{
			this.right = node;
			this.left.parent = this;
		}
	}

	removeChild(node) {
		if( this.left === node)
			this.left = null;
		else if(this.right === node)
			this.right = null;
		else
			throw new Error();

		node.parent = null;
	}

	remove() {
		if(this.parent === null)
			return;

		this.parent.removeChild(this);
	}

	swapWithParent() {
		if(this.parent === null)
			return;
		
		this.parent.parent = this;
		// if(this.parent.left === this)
		// {
		// 	this.parent.right.parent = this;
		// 	this.left = this.parent
		// 	this.right = this.parent.right;
		// }
		// else
		// {
		// 	this.parent.left.parent = this;
		// 	this.right = this.parent;
		// 	this.left = this.parent.left;
		// }
		// 	this.parent.left = this.parent.right = null;
		// 	this.parent = null;
	}
}

module.exports = Node;
