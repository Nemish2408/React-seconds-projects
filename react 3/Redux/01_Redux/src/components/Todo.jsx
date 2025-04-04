import React, { useState } from 'react';

const Todo = ({ onClick, completed, text, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 16px',
        margin: '8px 0',
        backgroundColor: isHovered ? '#f9f9f9' : '#fff',
        borderRadius: '8px',
        border: '1px solid #f0f0f0',
        transition: 'all 0.2s',
        boxShadow: isHovered ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
        transform: isHovered ? 'translateY(-1px)' : 'none'
      }}
    >
      <div 
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          cursor: 'pointer',
        }}
      >
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            border: completed ? '0' : '2px solid #d9d9d9',
            backgroundColor: completed ? '#52c41a' : 'transparent',
            marginRight: '14px',
            transition: 'all 0.2s',
            flexShrink: 0
          }}
        >
          {completed && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="white"/>
            </svg>
          )}
        </div>
        <span style={{
          textDecoration: completed ? 'line-through' : 'none',
          color: completed ? '#8c8c8c' : '#000',
          transition: 'all 0.2s',
          fontSize: '16px',
          wordBreak: 'break-word'
        }}>
          {text}
        </span>
      </div>
      
      {onDelete && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '28px',
            height: '28px',
            background: isHovered ? '#fff0f0' : 'transparent',
            border: 'none',
            borderRadius: '6px',
            color: '#ff4d4f',
            cursor: 'pointer',
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.2s',
            marginLeft: '8px'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
          </svg>
        </button>
      )}
    </li>
  );
};

export default Todo;