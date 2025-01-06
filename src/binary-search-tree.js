const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor () {
    this._root = null
  }

  root() {
    return this._root
  }

  add(data) {
    const newNode = new Node(data)

    if (this._root === null) {
      this._root = newNode
    } else {
      this._addNode(this._root, newNode)
    }
  }

  _addNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this._addNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this._addNode(node.right, newNode)
      }
    }
  }

  has(data) {
    return this._hasNode(this._root, data)
  }

  _hasNode(node, data) {
    if (node === null) return false
    if (node.data === data) return true
    if (data < node.data) {
      return this._hasNode(node.left, data)
    } else {
      return this._hasNode(node.right, data)
    }
  }

  find(data) {
    return this._findNode(this._root, data)
  }

  _findNode(node, data) {
    if (node === null) return null
    if (node.data === data) return node

    if (data < node.data) {
      return this._findNode(node.left, data)
    } else {
      return this._findNode(node.right, data)
    }
  }

  remove(data) {
    this._root = this._removeNode(this._root, data)
  }

  _removeNode(node, data) {
    if (node === null) return null

    if (data < node.data) {
      node.left = this._removeNode(node.left, data)
      return node
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data)
      return node
    } else {
      if (node.left === null && node.right === null) {
        return null
      }
      if (node.left === null) {
        return node.right
      }
      if (node.right === null) {
        return node.left
      }

      const minRightNode = this._findMinNode(node.right)
      node.data = minRightNode.data
      node.right = this._removeNode(node.right, minRightNode.data)
      return node
    }
  }

  min() {
    if (this._root === null) return null
    const node = this._findMinNode(this._root)
    return node ? node.data : null
  }

  _findMinNode(node) {
    while (node !== null && node.left !== null) {
      node = node.left
    }
    return node
  }

  max() {
    if (this._root === null) return null
    const node = this._findMaxNode(this._root)
    return node ? node.data : null
  }

  _findMaxNode(node) {
    while (node !== null && node.right !== null) {
      node = node.right
    }
    return node
  }
}

module.exports = {
  BinarySearchTree
};