import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVisibilityFilter, VisibilityFilters } from '../features/filters/filtersSlice';

const FilterLink = ({ filter, children }) => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(state => state.visibilityFilter);
  const active = filter === currentFilter;
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      onClick={() => dispatch(setVisibilityFilter(filter))}
      disabled={active}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        marginRight: '12px',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '6px',
        background: active ? '#e6f7ff' : isHovered ? '#f5f5f5' : 'transparent',
        color: active ? '#1890ff' : '#595959',
        cursor: active ? 'default' : 'pointer',
        fontWeight: active ? '500' : 'normal',
        fontSize: '14px',
        transition: 'all 0.2s',
        position: 'relative'
      }}
    >
      {children}
      {active && (
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '20px',
          height: '2px',
          backgroundColor: '#1890ff',
          borderRadius: '1px'
        }}></div>
      )}
    </button>
  );
};

export default FilterLink;