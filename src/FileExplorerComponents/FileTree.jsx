import React, { useState } from 'react';
import { AiFillFileAdd, AiFillFolderAdd } from 'react-icons/ai';
import { BiRename } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { FaFolder, FaFileAlt } from 'react-icons/fa';

const FileTree = ({
  nodeData,
  onAdd,
  onRename,
  onDelete,
  onSelectFile,
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState('');
  const [addingType, setAddingType] = useState(null);
  const [childName, setChildName] = useState('');

  const handleAdd = () => {
    if (childName.trim()) {
      onAdd(nodeData.id, addingType, childName);
      setChildName('');
      setAddingType(null);
    }
  };

  const handleRename = () => {
    if (newName.trim()) {
      onRename(nodeData.id, newName);
      setIsRenaming(false);
      setNewName('');
    }
  };

  return (
    <div className='ml-4 mt-2 border-l pl-3'>
      <div className='flex items-center gap-2 group py-1 hover:bg-gray-100 rounded-sm'>

        {/* Icon + Name or Rename Input */}
        {isRenaming ? (
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRename()}
            autoFocus
            className='border px-2 py-0.5 rounded text-sm'
          />
        ) : (
          <div
            className='flex items-center gap-2 cursor-pointer text-sm font-medium'
            onClick={() => {
              if (nodeData.type !== 'folder') {
                onSelectFile(nodeData);
              }
            }}
          >
            {nodeData.type === 'folder' ? (
              <FaFolder className='text-yellow-500' />
            ) : (
              <FaFileAlt className='text-gray-600' />
            )}
            <span>{nodeData.name}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
          <button
            className='text-blue-600 hover:text-blue-800'
            onClick={() => setAddingType('file')}
            title="Add File"
          >
            <AiFillFileAdd size={16} />
          </button>
          <button
            className='text-yellow-600 hover:text-yellow-800'
            onClick={() => setAddingType('folder')}
            title="Add Folder"
          >
            <AiFillFolderAdd size={16} />
          </button>
          <button
            className='text-green-600 hover:text-green-800'
            onClick={() => {setIsRenaming(true);setNewName(nodeData.name)}}
            title="Rename"
          >
            <BiRename size={16} />
          </button>
          <button
            className='text-red-600 hover:text-red-800'
            onClick={() => onDelete(nodeData.id)}
            title="Delete"
          >
            <MdDelete size={16} />
          </button>
        </div>
      </div>

      {/* Input for Adding Child */}
      {addingType && (
        <div className='ml-6 mt-1 flex items-center gap-1'>
          <input
            type='text'
            placeholder={`New ${addingType}`}
            value={childName}
            onChange={e => setChildName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            autoFocus
            className='border px-2 py-0.5 rounded text-sm'
          />
        </div>
      )}

      {/* Recursive rendering */}
      {nodeData.children?.map(child => (
        <FileTree
          key={child.id}
          nodeData={child}
          onAdd={onAdd}
          onRename={onRename}
          onDelete={onDelete}
          onSelectFile={onSelectFile}
        />
      ))}
    </div>
  );
};

export default FileTree
