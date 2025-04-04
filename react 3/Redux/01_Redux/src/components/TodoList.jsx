import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Todo from './Todo';
import { toggleTodo, deleteTodo } from '../features/todos/todosSlice';
import { VisibilityFilters } from '../features/filters/filtersSlice';

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        default:
            throw new Error('Unknown filter: ' + filter);
    }
};

const EmptyState = ({ filter }) => {
  let message = "No tasks yet. Add your first task above!";
  let icon = "📝";
  
  if (filter === VisibilityFilters.SHOW_ACTIVE) {
    message = "No active tasks found.";
    icon = "🎉";
  } else if (filter === VisibilityFilters.SHOW_COMPLETED) {
    message = "No completed tasks yet.";
    icon = "✅";
  }
  
  return (
    <div style={{ 
      padding: '30px 20px', 
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      marginBottom: '20px',
      color: '#8c8c8c'
    }}>
      <div style={{ fontSize: '28px', marginBottom: '10px' }}>{icon}</div>
      <div>{message}</div>
    </div>
  );
};

const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);
    const visibilityFilter = useSelector(state => state.visibilityFilter);
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);

    if (visibleTodos.length === 0) {
        return <EmptyState filter={visibilityFilter} />;
    }

    return (
        <div>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0 0 20px 0' }}>
                {visibleTodos.map(todo => (
                    <Todo
                        key={todo.id}
                        {...todo}
                        onClick={() => dispatch(toggleTodo(todo.id))}
                        onDelete={() => dispatch(deleteTodo(todo.id))}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;