import React from 'react'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import Footer from './components/Footer'
import { useSelector } from 'react-redux'

const App = () => {
  const todos = useSelector(state => state.todos);
  const completedCount = todos.filter(todo => todo.completed).length;
  const progress = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;
  
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      padding: '40px 20px'
    }}>
      <div style={{ 
        maxWidth: '650px', 
        width: '100%',
        margin: '0 auto',
        backgroundColor: 'white',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '25px 30px',
          backgroundColor: '#1890ff',
          color: 'white',
          position: 'relative'
        }}>
          <h1 style={{ 
            margin: '0 0 5px 0',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Task Manager
          </h1>
          <p style={{ margin: '0', opacity: '0.9', fontSize: '14px' }}>
            {todos.length === 0 ? 'No tasks yet' : 
              `${completedCount} of ${todos.length} tasks completed`}
          </p>
          
          {todos.length > 0 && (
            <div style={{ 
              marginTop: '15px',
              height: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                height: '100%',
                width: `${progress}%`,
                backgroundColor: 'white',
                borderRadius: '3px',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          )}
        </div>
        
        <div style={{ padding: '30px' }}>
          <AddTodo />
          <TodoList />
          <Footer />
        </div>
      </div>
      <div style={{ 
        textAlign: 'center', 
        marginTop: '20px', 
        color: '#8c8c8c', 
        fontSize: '14px' 
      }}>
        Made with Redux Toolkit
      </div>
    </div>
  )
}

export default App