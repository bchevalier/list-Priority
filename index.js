/**
 * PRIORITY LIST Class
 *
 * @author Brice Chevalier
 *
 * @comparisonFunction {function} comparison function that takes two parameters a and b and returns a number
 *
 * @desc
 *
 *    Method                Time Complexity
 *    ___________________________________
 *
 *    add                    O(n), O(1) if insertion at the beginning or at the end of the list
 *    remove                O(n), O(1) if removal at the beginning or at the end of the list
 *    getFirst            O(1)
 *    getLast                O(1)
 *    popFirst            O(1)
 *    popLast                O(1)
 *    getCount            O(1)
 *    apply                O(n)
 *    clear                O(n)
 *
 *    Memory Complexity in O(n)
 */


function Node(obj, previous, next) {
	this.object = obj;
	this.previous = previous;
	this.next = next;
}

function PriorityList(comparisonFunction) {
	this.count = 0;
	this.first = null;
	this.last = null;
	this.cmpFunc = comparisonFunction;
}



PriorityList.prototype.add = function (obj) {
	this.count += 1;
	var newNode = new Node(obj, null, null);
	if (this.first === null) {
		this.first = newNode;
		this.last = newNode;
		return newNode;
	}

	var cmpFirst = this.cmpFunc(obj, this.first.object);
	if (cmpFirst <= 0) {
		// insertion at the beginning of the list
		newNode.next = this.first;
		this.first.previous = newNode;
		this.first = newNode;
		return newNode;
	}

	var cmpLast = this.cmpFunc(obj, this.last.object);
	if (cmpLast >= 0) {
		// insertion at the end
		newNode.previous = this.last;
		this.last.next = newNode;
		this.last = newNode;
		return newNode;
	}

	var current;
	if (-cmpFirst > cmpLast) {
		current = this.first.next;
		while (this.cmpFunc(obj, current.object) > 0) {
			current = current.next;
		}

		// insertion before current
		newNode.next = current;
		newNode.previous = current.previous;
		newNode.previous.next = newNode;
		current.previous = newNode;
	} else {
		current = this.last.previous;
		while (this.cmpFunc(obj, current.object) < 0) {
			current = current.previous;
		}
		
		// insertion after current
		newNode.previous = current;
		newNode.next = current.next;
		newNode.next.previous = newNode;
		current.next = newNode;
	}
	return newNode;
};

PriorityList.prototype.removeByRef = function (node) {

	// Removing any reference to the node
	if (node.previous === null) {
		this.first = node.next;
	} else {
		node.previous.next = node.next;
	}
	if (node.next === null) {
		this.last = node.previous;
	} else {
		node.next.previous = node.previous;
	}

	// Removing any reference from the node to any other element of the list
	node.previous = null;
	node.next = null;

	this.count -= 1;
};

PriorityList.prototype.remove = function (obj) {
	var current = this.first;

	var cmpFirst = this.cmpFunc(obj, this.first.object);
	if (cmpFirst === 0) {

		// removing one of the this.first objects
		current = this.first;
		while (obj !== current.object) {
			current = current.next;
		}

		if (current === this.first) {
			this.first = this.first.next;
		}

		// Removing any reference to the node
		if (current.previous === null) {
			this.first = current.next;
		} else {
			current.previous.next = current.next;
		}
		if (current.next === null) {
			this.last = current.previous;
		} else {
			current.next.previous = current.previous;
		}

		// Removing any reference from the node to any other element of the list
		current.previous = null;
		current.next = null;

		this.count -= 1;
		return 1;
	}

	var cmpLast = this.cmpFunc(obj, this.last.object);
	if (cmpLast === 0) {

		// removing one of the this.last objects
		current = this.last;
		while (obj !== current.object) {
			current = current.previous;
		}


		if (current === this.last) {
			this.last = this.last.previous;
		}

		// Removing any reference to the node
		if (current.previous === null) {
			this.first = current.next;
		} else {
			current.previous.next = current.next;
		}
		if (current.next === null) {
			this.last = current.previous;
		} else {
			current.next.previous = current.previous;
		}

		// Removing any reference from the node to any other element of the list
		current.previous = null;
		current.next = null;

		this.count -= 1;
		return 1;
	}


	if (-cmpFirst > cmpLast) {
		current = this.first.next;
		while (this.cmpFunc(obj, current.object) > 0) {
			current = current.next;
		}

		while (obj !== current.object) {
			current = current.next;
		}

		// Removing any reference to the node
		if (current.previous === null) {
			this.first = current.next;
		} else {
			current.previous.next = current.next;
		}
		if (current.next === null) {
			this.last = current.previous;
		} else {
			current.next.previous = current.previous;
		}

		// Removing any reference from the node to any other element of the list
		current.previous = null;
		current.next = null;

		this.count -= 1;
		return 1;
	} else {
		current = this.last.previous;
		while (this.cmpFunc(obj, current.object) < 0) {
			current = current.previous;
		}

		while (obj !== current.object) {
			current = current.previous;
		}

		// Removing any reference to the node
		if (current.previous === null) {
			this.first = current.next;
		} else {
			current.previous.next = current.next;
		}
		if (current.next === null) {
			this.last = current.previous;
		} else {
			current.next.previous = current.previous;
		}

		// Removing any reference from the node to any other element of the list
		current.previous = null;
		current.next = null;

		this.count -= 1;
		return 1;
	}

	return 0;
};

PriorityList.prototype.popFirst = function () {
	var node = this.first;
	var pop = node.object;
	this.first = node.next;
	if (this.first !== null) {
		this.first.previous = null;
	}
	node.next = null;
	return pop;
};

PriorityList.prototype.popLast = function () {
	var node = this.last;
	var pop = node.object;
	this.last = node.previous;
	if (this.last !== null) {
		this.last.next = null;
	}
	node.previous = null;
	return pop;
};

PriorityList.prototype.getFirst = function () {
	return this.first;
};

PriorityList.prototype.getLast = function () {
	return this.last;
};

PriorityList.prototype.clear = function () {
	this.first = null;
	this.last = null;
};

PriorityList.prototype.getCount = function () {
	return this.count;
};

PriorityList.prototype.forEach = function (processingFunc, params) {
	for (var current = this.first; current; current = current.next) {
		processingFunc(current.object, params);
	}
};

PriorityList.prototype.forEachReverse = function (processingFunc, params) {
	for (var current = this.last; current; current = current.previous) {
		processingFunc(current.object, params);
	}
};

module.exports = PriorityList;