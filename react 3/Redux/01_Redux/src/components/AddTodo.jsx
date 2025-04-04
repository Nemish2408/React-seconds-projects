import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todos/todosSlice'

const AddTodo = () => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        if (!input.trim()) {
            setError('Task cannot be empty');
            return;
        }
        dispatch(addTodo(input));
        setInput('');
        setError('');
    };

    return (
      <div style={{ marginBottom: '25px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ 
            position: 'relative',
            display: 'flex',
            boxShadow: isFocused ? '0 0 0 2px rgba(24, 144, 255, 0.2)' : '0 2px 6px rgba(0, 0, 0, 0.05)',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            border: error ? '1px solid #ff4d4f' : isFocused ? '1px solid #40a9ff' : '1px solid #e8e8e8',
          }}>
            <input 
              value={input}
              onChange={e => {
                setInput(e.target.value);
                if (error) setError('');
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder='Add a new task...'
              style={{
                flex: '1', 
                padding: '14px 16px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '8px 0 0 8px',
                outline: 'none',
                backgroundColor: '#fff'
              }}
            />
            <button 
              type='submit' 
              style={{ 
                padding: '0 20px',
                fontSize: '15px',
                fontWeight: '500', 
                background: '#1890ff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '0 8px 8px 0', 
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.background = '#40a9ff'}
              onMouseOut={(e) => e.target.style.background = '#1890ff'}
            >
              Add Task
            </button>
          </div>
          {error && 
            <div style={{ 
              color: '#ff4d4f', 
              fontSize: '14px', 
              marginTop: '8px', 
              paddingLeft: '16px' 
            }}>
              {error}
            </div>
          }
        </form>
      </div>
    );
};

export default AddTodo