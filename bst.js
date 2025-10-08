function Node() {
  let data = null;
  let left = null;
  let right = null;

  function getData() {
    return data;
  }
  function setData(newData) {
    data = newData;
  }

  function getLeftChild() {
    return left;
  }
  function setLeftChild(newLeftChild) {
    left = newLeftChild;
  }

  function getRightChild() {
    return right;
  }
  function setRightChild(newRightChild) {
    right = newRightChild;
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

function Sort() {
  function mergeSort(arr) {
    if (!arr || arr.length <= 1) return arr.slice();

    const middle = Math.floor(arr.length / 2);
    const arrLeft = mergeSort(arr.slice(0, middle));
    const arrRight = mergeSort(arr.slice(middle));

    return merge(arrLeft, arrRight);
  }

  function merge(left, right) {
    const result = [];
    let l = 0,
      r = 0;

    while (l < left.length && r < right.length) {
      if (left[l] < right[r]) {
        if (result[result.length - 1] !== left[l]) result.push(left[l]);
        l++;
      } else if (left[l] > right[r]) {
        if (result[result.length - 1] !== right[r]) result.push(right[r]);
        r++;
      } else {
        if (result[result.length - 1] !== left[l]) result.push(left[l]);
        l++;
        r++;
      }
    }

    while (l < left.length) {
      if (result[result.length - 1] !== left[l]) result.push(left[l]);
      l++;
    }
    while (r < right.length) {
      if (result[result.length - 1] !== right[r]) result.push(right[r]);
      r++;
    }

    return result;
  }

  return { mergeSort };
}

function Tree(array = [], root = null) {
  // let array = [];
  
  function getArray() { return array; }
  function setArray(newArray) { array = newArray; }

  function getRoot() { return root; }
  function setRoot(newRoot) { root = newRoot; }

  function buildTree(array) {
    const sortedArray = Sort().mergeSort(array);
    setArray(sortedArray);

    function buildBalancedTree(arr) {
      if (arr.length === 0) return null;

      const mid = Math.floor(arr.length / 2);
      const node = new Node();
      node.setData(arr[mid]);

      node.setLeftChild(buildBalancedTree(arr.slice(0, mid)));
      node.setRightChild(buildBalancedTree(arr.slice(mid + 1)));

      setRoot(node);
      return node;
    }

    return buildBalancedTree(sortedArray);
  }

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (!node) {
      return;
    }
    if (node.getRightChild()) {
      prettyPrint(
        node.getRightChild(),
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.getData()}`);
    if (node.getLeftChild()) {
      prettyPrint(
        node.getLeftChild(),
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  };

  function insert(value) {
    let currNode = root;

    if (currNode === null) {
      return currNode;
    }

    if (value <= currNode.getData()) {
      currNode.getLeftChild() = insert(currNode.getLeftChild().getData());
    }
    else currNode.getRightChild() = insert(currNode.getRightChild().getData());
  }

  function deleteItem(value) {

  }

  return {
    buildTree,
    prettyPrint,
    getArray,
    setArray,
    getRoot,
    setRoot,
    insert,

  };
}

const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const root = tree.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
tree.prettyPrint(root);
