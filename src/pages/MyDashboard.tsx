import React, { useState, useEffect } from 'react';
import '../styles/pages/MyDashboard.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface Shortcut {
  id: string;
  label: string;
  path: string;
  icon: string;
}

const defaultShortcuts: Shortcut[] = [
  { id: '1', label: 'Dry Bulk Terminal', path: '/drybulk/terminal/overview', icon: '📦' },
  { id: '2', label: 'Fleet Trucks', path: '/drybulk/fleet/trucks', icon: '🚛' },
  { id: '3', label: 'Dispatch Loads', path: '/drybulk/dispatch/loads', icon: '📋' },
  { id: '4', label: 'Daily Reports', path: '/drybulk/reporting/dry-bulk', icon: '📊' },
  { id: '5', label: 'Liquid Operations', path: '/liquid/overview', icon: '💧' },
  { id: '6', label: 'Tank Wash', path: '/tankwash/overview', icon: '🧼' },
];

export const MyDashboard: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  // Load todos from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('myDashboard_todos');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load todos:', e);
      }
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    if (todos.length > 0 || localStorage.getItem('myDashboard_todos')) {
      localStorage.setItem('myDashboard_todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: newTodoText.trim(),
        completed: false,
        createdAt: Date.now(),
      };
      setTodos([newTodo, ...todos]);
      setNewTodoText('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="my-dashboard">
      <div className="my-dashboard__header">
        <h1 className="my-dashboard__title">My Dashboard</h1>
        <p className="my-dashboard__subtitle">Your personalized workspace</p>
      </div>

      <div className="my-dashboard__grid">
        {/* Todo List Widget */}
        <div className="my-dashboard__widget my-dashboard__widget--todos">
          <div className="widget__header">
            <h2 className="widget__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
              My Tasks
            </h2>
            <span className="widget__count">{todos.filter(t => !t.completed).length}</span>
          </div>
          
          <div className="todos__input-container">
            <input
              type="text"
              className="todos__input"
              placeholder="Add a new task..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="todos__add-btn" onClick={addTodo}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </div>

          <div className="todos__list">
            {todos.length === 0 ? (
              <div className="todos__empty">No tasks yet. Add one above!</div>
            ) : (
              todos.map(todo => (
                <div key={todo.id} className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
                  <input
                    type="checkbox"
                    className="todo-item__checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="todo-item__text">{todo.text}</span>
                  <button className="todo-item__delete" onClick={() => deleteTodo(todo.id)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Shortcuts Widget */}
        <div className="my-dashboard__widget my-dashboard__widget--shortcuts">
          <div className="widget__header">
            <h2 className="widget__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              Quick Access
            </h2>
          </div>
          
          <div className="shortcuts__grid">
            {defaultShortcuts.map(shortcut => (
              <a key={shortcut.id} href={`#${shortcut.path}`} className="shortcut-card">
                <span className="shortcut-card__icon">{shortcut.icon}</span>
                <span className="shortcut-card__label">{shortcut.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Active Loads Summary */}
        <div className="my-dashboard__widget my-dashboard__widget--stat">
          <div className="widget__header">
            <h2 className="widget__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              Active Loads
            </h2>
          </div>
          <div className="stat-card__content">
            <div className="stat-card__value">24</div>
            <div className="stat-card__label">In Transit</div>
            <div className="stat-card__detail">
              <span>8 Pending Pickup</span>
              <span>3 Delayed</span>
            </div>
          </div>
        </div>

        {/* Fleet Status Summary */}
        <div className="my-dashboard__widget my-dashboard__widget--stat">
          <div className="widget__header">
            <h2 className="widget__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              Fleet Status
            </h2>
          </div>
          <div className="stat-card__content">
            <div className="stat-card__value">42/50</div>
            <div className="stat-card__label">Available Trucks</div>
            <div className="stat-card__detail">
              <span>5 In Maintenance</span>
              <span>3 Off Duty</span>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="my-dashboard__widget my-dashboard__widget--alerts">
          <div className="widget__header">
            <h2 className="widget__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Recent Alerts
            </h2>
          </div>
          <div className="alerts__list">
            <div className="alert-item alert-item--warning">
              <span className="alert-item__icon">⚠️</span>
              <div className="alert-item__content">
                <div className="alert-item__title">Maintenance Due</div>
                <div className="alert-item__time">Truck #247 - 2 hours ago</div>
              </div>
            </div>
            <div className="alert-item alert-item--info">
              <span className="alert-item__icon">ℹ️</span>
              <div className="alert-item__content">
                <div className="alert-item__title">Load Assignment</div>
                <div className="alert-item__time">3 new loads - 4 hours ago</div>
              </div>
            </div>
            <div className="alert-item alert-item--success">
              <span className="alert-item__icon">✅</span>
              <div className="alert-item__content">
                <div className="alert-item__title">Delivery Complete</div>
                <div className="alert-item__time">Load #1842 - 5 hours ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="my-dashboard__widget my-dashboard__widget--schedule">
          <div className="widget__header">
            <h2 className="widget__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Today's Schedule
            </h2>
          </div>
          <div className="schedule__list">
            <div className="schedule-item">
              <div className="schedule-item__time">09:00</div>
              <div className="schedule-item__content">
                <div className="schedule-item__title">Morning Dispatch Meeting</div>
                <div className="schedule-item__location">Conference Room A</div>
              </div>
            </div>
            <div className="schedule-item">
              <div className="schedule-item__time">14:30</div>
              <div className="schedule-item__content">
                <div className="schedule-item__title">Fleet Inspection</div>
                <div className="schedule-item__location">Terminal Yard</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
