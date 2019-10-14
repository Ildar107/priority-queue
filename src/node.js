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
			this.right.parent = this;
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
		
		if(this.parent.left === this && this.parent.right !== null)
		{
			let rightChild = this.right;
			this.parent.right.parent = this;
			this.right = this.parent.right;
			this.parent.right = rightChild;
			if(this.parent.right !== null)
				this.parent.right.parent = this.parent;

			if(this.left !== null)
			{
				let leftChild =  this.left;
				leftChild.parent = this.parent;
				this.parent.left = leftChild;
				this.left = this.parent;
			}
			else
			{
				this.left = this.parent;
				this.parent.left = null;
			}
		}
		else if(this.parent.right === this && this.parent.left !== null)
		{
			let leftChild = this.left;
			this.parent.left.parent = this;
			this.left = this.parent.left;
			this.parent.left = leftChild;
			if(this.parent.left !== null)
				this.parent.left.parent = this.parent;

			if(this.right !== null)
			{
				let rightChild =  this.right;
				rightChild.parent = this.parent;
				this.parent.right = rightChild;
				this.right = this.parent;
			}
			else
			{
				this.right = this.parent;
				this.parent.right = null;
			}
		}
		else
		{
			this.left = this.parent;
		}
		var thirdLevel = this.parent.parent;

		if(thirdLevel !== null && thirdLevel.right === this.parent)
			thirdLevel.right = this;

		else if(thirdLevel !== null && thirdLevel.left === this.parent)
			thirdLevel.left = this;
			
		this.parent.parent = this;
		this.parent = thirdLevel;
	}
}

module.exports = Node;
