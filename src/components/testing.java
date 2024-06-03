class TreeNode {
    int value;
    TreeNode left, right;

    TreeNode(int item) {
        value = item;
        left = right = null;
    }
}

class BinaryTree {
    TreeNode root;

    void inOrderTraversal(TreeNode node) {
        if (node == null) {
            return;
        }

        // Traverse the left subtree
        inOrderTraversal(node.left);

        // Visit the root node
        System.out.print(node.value + " ");

        // Traverse the right subtree
        inOrderTraversal(node.right);
    }

    public static void main(String[] args) {
        BinaryTree tree = new BinaryTree();

        // Construct the tree as per the given diagram
        tree.root = new TreeNode(48);
        tree.root.left = new TreeNode(12);
        tree.root.right = new TreeNode(-3);
        tree.root.left.left = new TreeNode(5);
        tree.root.left.right = new TreeNode(14);
        tree.root.right.right = new TreeNode(21);
        tree.root.right.right.right = new TreeNode(9);
        tree.root.right.right.right.left = new TreeNode(27);

        // Print the in-order traversal of the tree
        tree.inOrderTraversal(tree.root);
    }
}
