function Node() {
  let data = null;
  let left = null;
  let right = null;

  return {
    data,
    left,
    right,
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

function Tree(array = []) {
  // let array = [];

  function buildTree(array) {
    const sortedArray = Sort().mergeSort(array);

    function buildBalancedTree(arr) {
      if (arr.length === 0) return null;

      const mid = Math.floor(arr.length / 2);
      const node = new Node();
      node.data(arr[mid]);

      node.left = buildBalancedTree(arr.slice(0, mid));
      node.right = buildBalancedTree(arr.slice(mid + 1));

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

  function insert(root, value) {
    if (root === null) return new Node(key);
    if (root.data === value) return root;

    if (value < root.data) root.left = insert(root.left, value);
    else if (value > root.data) root.right = insert(root.right, value);

    return root;
  }

  function deleteItem(root, value) {
    function getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
        curr = curr.left;
      }
      return curr;
    }

    if (root === null) {
        return root;
    }

    // If key to be searched is in a subtree
    if (root.data > value) {
        root.left = delNode(root.left, value);
    } else if (root.data < value) {
        root.right = delNode(root.right, value);
    } else {
        // If root matches with the given key

        // Cases when root has 0 children or 
        // only right child
        if (root.left === null) 
            return root.right;

        // When root has only left child
        if (root.right === null) 
            return root.left;

        // When both children are present
        let succ = getSuccessor(root);
        root.data = succ.data;
        root.right = delNode(root.right, succ.data);
    }
    return root;

  }

  

  return {
    buildTree,
    prettyPrint,
    insert,
    deleteItem,

  };
}

const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const root = tree.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
tree.prettyPrint(root);
