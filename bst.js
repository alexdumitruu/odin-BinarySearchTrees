function Node() {
  let data = null;
  let leftChild = null;
  let rightChild = null;

  function getData() {
    return data;
  }
  function setData(newData) {
    data = newData;
  }

  function getLeftChild() {
    return leftChild;
  }
  function setLeftChild(newLeftChild) {
    leftChild = newLeftChild;
  }

  function getRightChild() {
    return rightChild;
  }
  function setRightChild(newRightChild) {
    rightChild = newRightChild;
  }

  return {
    getData,
    setData,
    getLeftChild,
    setLeftChild,
    getRightChild,
    setRightChild,
  };
}

function Tree(arr) {
  let root = buildTree();
  let array = arr;
  function buildTree(array) {}

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  
}
