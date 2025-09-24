import { useState, useEffect } from 'react';

const useFileTree = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const storageKey = `${user}treeData`;

    const [treeData, setTreeData] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved
            ? JSON.parse(saved)
            : {
                id: crypto.randomUUID(),
                name: 'Main Folder',
                type: 'folder',
                children: [],
            };
    });

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(treeData));
    }, [treeData]);

    const addData = (parentId, type, name) => {
        if (!name) return;
        const newNode = {
            id: crypto.randomUUID(),
            name,
            type,
            ...(type === 'folder' ? { children: [] } : { content: '' }),
        };

        const addChildToTree = (node) => {
            if (node.id === parentId) {
                node.children.push(newNode);
            } else if (node.children) {
                node.children.forEach(addChildToTree);
            }
        };

        const newTree = structuredClone(treeData);
        addChildToTree(newTree);
        setTreeData(newTree);
    };

    const renameNode = (nodeId, newName) => {
        const renameInTree = (node) => {
            if (node.id === nodeId) {
                node.name = newName;
            } else if (node.children) {
                node.children.forEach(renameInTree);
            }
        };

        const newTree = structuredClone(treeData);
        renameInTree(newTree);
        setTreeData(newTree);
    };

    const removeNode = (nodeId) => {
        const deleteFromTree = (node) => {
            if (!node.children) return;

            node.children = node.children.filter(child => child.id !== nodeId);
            node.children.forEach(deleteFromTree);
        };

        const newTree = structuredClone(treeData);
        if (newTree.id === nodeId) return; // prevent deleting root
        deleteFromTree(newTree);
        setTreeData(newTree);
    };

    const updateFileContent = (nodeId, newContent) => {
        const updateContent = (node) => {
            if (node.id === nodeId && node.type !== 'folder') {
                node.content = newContent;
            } else if (node.children) {
                node.children.forEach(updateContent);
            }
        };

        const newTree = structuredClone(treeData);
        updateContent(newTree);
        setTreeData(newTree);
    };

    return {
        treeData,
        addData,
        renameNode,
        removeNode,
        updateFileContent
    };
};

export default useFileTree;
