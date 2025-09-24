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
      <div className='flex items-end justify-end'>
        <div className=' px-2 rounded border bg-red-600 text-white cursor-pointer' onClick={() => { LogOut() }}>logout</div>

      </div>

      <div className='flex'>
        <div className='w-1/2 p-4 border-r'>
          <h2 className='text-lg font-bold'>File Explorer</h2>
          <FileTree
            nodeData={treeData}
            onAdd={addData}
            onRename={renameNode}
            onDelete={removeNode}
            onSelectFile={handleSelectFile}
          />
        </div>

        <div className='w-1/2 p-4'>
          {selectedFile ? (
            <div>
              <h3 className='text-md font-semibold'>Editing: {selectedFile.name}</h3>
              <textarea
                className='w-full h-64 border p-2 mt-2'
                value={fileContent}
                onChange={e => setFileContent(e.target.value)}
              />
              <button
                className='mt-2 px-4 py-1 bg-blue-500 text-white rounded'
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          ) : (
            <p>Select a file to edit.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FileExplore;
