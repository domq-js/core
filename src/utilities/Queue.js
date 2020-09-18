/**
 * Control a sequence of objects
 *
 * @class Queue
 * @api private
 */
export default class Queue {
	/**
	 * Create a new `Queue` instance
	 *
	 * @constructor
	 * @api public
	 */
	constructor() {
		this.i = [];
	}

	/**
	 * Add an object to the end of
	 * the queue
	 *
	 * @param {*} item
	 * @api public
	 */
	enqueue( item ) {
		this.i.push( item );
	}

	/**
	 * Remove and return the first
	 * object in the queue, return
	 * null if none exist
	 *
	 * @return {*|Null}
	 * @api public
	 */
	dequeue() {
		return this.i.shift() || null;
	}

	/**
	 * Return the last item in the
	 * queue or null if none exist
	 *
	 * @return {*|Null}
	 * @api public
	 */
	getLast() {
		return this.i[ this.i.length - 1 ] || null;
	}

	/**
	 * Clear the queue
	 *
	 * @api public
	 */
	clear() {
		this.i.length = 0;
	}

	/**
	 * Is the queue empty?
	 *
	 * @return {Boolean}
	 * @api public
	 */
	isEmpty() {
		return this.i.length === 0;
	}
}


