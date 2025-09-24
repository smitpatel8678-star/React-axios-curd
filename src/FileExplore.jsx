import React, { useState } from 'react';
import FileTree from './FileExplorerComponents/FileTree';
import useFileTree from './FileExplorerComponents/useFileTree';
import { useNavigate } from 'react-router-dom';

const FileExplore = () => {
  const {
    treeData,
    addData,
    renameNode,
    removeNode,
    updateFileContent,
  } = useFileTree();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');

  const handleSelectFile = (file) => {
    setSelectedFile(file);
    setFileContent(file.content);
  };

  const handleSave = () => {
    updateFileContent(selectedFile.id, fileContent);
    alert('File saved!');
  };

  const LogOut = () => {
    localStorage.removeItem('user');
    navigate('/login'); // or '/' depending on your route
  };

  return (
    <>
      <div className="flex items-start justify-between p-6 bg-gray-800">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">File Editor</h1>
        </div>
        <div className="flex items-center">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition duration-300"
            onClick={() => { LogOut() }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex h-screen">
        {/* File Explorer */}
        <div className="w-1/3 p-6 border-r bg-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">File Explorer</h2>
          <FileTree
            nodeData={treeData}
            onAdd={addData}
            onRename={renameNode}
            onDelete={removeNode}
            onSelectFile={handleSelectFile}
          />
        </div>

        {/* File Editor */}
        <div className="w-2/3 p-6 bg-white">
          {selectedFile ? (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Editing: {selectedFile.name}</h3>
              <textarea
                className="w-full h-72 border border-gray-300 rounded-md p-4 mb-4 focus:ring-2 focus:ring-blue-500"
                value={fileContent}
                onChange={e => setFileContent(e.target.value)}
              />
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-gray-600">Select a file to edit.</p>
          )}
        </div>
      </div>

    </>
  );
};

export default FileExplore;
