import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilterLink from './FilterLink';
import { VisibilityFilters } from '../features/filters/filtersSlice';
import { clearCompleted } from '../features/todos/todosSlice';

const Footer = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const completedCount = todos.filter(todo => todo.completed).length;
  const remainingCount = todos.length - completedCount;
  const hasCompletedTodos = completedCount > 0;
  const [isHovered, setIsHovered] = React.useState(false);

  if (todos.length === 0) {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 0 0',
      borderTop: '1px solid #f0f0f0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
          Active
          {remainingCount > 0 && (
            <span style={{
              fontSize: '12px',
              background: '#f5f5f5',
              borderRadius: '10px',
              padding: '2px 6px',
              marginLeft: '5px'
            }}>
              {remainingCount}
            </span>
          )}
        </FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
          Completed
          {completedCount > 0 && (
            <span style={{
              fontSize: '12px',
              background: '#f5f5f5',
              borderRadius: '10px',
              padding: '2px 6px',
              marginLeft: '5px'
            }}>
              {completedCount}
            </span>
          )}
        </FilterLink>
      </div>
      
      {hasCompletedTodos && (
        <button
          onClick={() => dispatch(clearCompleted())}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            padding: '6px 12px',
            border: 'none',
            borderRadius: '6px',
            background: isHovered ? '#fff1f0' : 'transparent',
            color: isHovered ? '#ff4d4f' : '#8c8c8c',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: '5px' }}>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" 
                  fill="currentColor"/>
          </svg>
          Clear completed
        </button>
      )}
    </div>
  );
};

export default Footer;