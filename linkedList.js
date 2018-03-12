class Node {
  constructor(value, next, prev) {
    this.value = value
    this.next = next || null
    this.prev = prev || null
  }
}
class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }
  insert(value, after) {
    const nodeToInsert = new Node(value) //我们要插入的 值为value的新节点
    if (!this.head) {
      this.head = nodeToInsert
      this.tail = nodeToInsert
      return
    }
    const node = this._findNode(after) //要插入的新节点前一个节点，即我们的新节点要跟在哪个节点后面
    if (!node)
      return
    const originalNext = node.next
    node.next = nodeToInsert
    nodeToInsert.prev = node
    if (originalNext) {
      nodeToInsert.next = originalNext
      originalNext.prev = nodeToInsert
    } else {
      this.tail = nodeToInsert
    }
  }
  //找某个值为value的node节点
  _findNode(value) {
    if (!this.head)
      return null
    if (this.head.value === value)
      return this.head
    let cur = this.head
    while (cur.next) {
      cur = cur.next
      if (cur.value === value)
        return cur
    }
    return null //循环到最后还没有找到的话 返回null
  }
  push(value) {
    const nodeToInsert = new Node(value, null)
    if (!this.tail) {
      this.head = nodeToInsert
      this.tail = nodeToInsert
    } else {
      this.tail.next = nodeToInsert
      nodeToInsert.prev = this.tail
      this.tail = nodeToInsert
    }
  }
  pop() {
    if (!this.tail) {
      return null
    }
    const originalTail = this.tail
    this.tail = originalTail.prev
    if(originalTail.prev){
      originalTail.prev.next = null
    }
    else {
    this.head = null
    }
    return originalTail.value
  }
  // 用于实现删除值为value的节点后一个节点
  remove(value) {
    const prevNode = this._findNode(value) //找到这个节点
    if (!prevNode)
      return
    if (prevNode.next) {
      const nextNode = prevNode.next.next //暂存被删除的节点的后一个节点
      if (!nextNode)
        this.tail = prevNode
      prevNode.next.next = null
      prevNode.next = nextNode
    }
  }
}
function LinkedListTest() {
  const arr = new Array(1000000)
  for (var i = 0; i < 1000000; i++) {
    arr[i] = i
  }
}
module.exports = LinkedList
