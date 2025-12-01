import React, { useState } from 'react';

// Task interface
export interface Task {
  id: string;
  title: string;
  type: 'Compliance Report' | 'Daily Dry Bulk Report' | 'Daily Terminal Report' | 'Investigation' | 'HR Inquiry' | 'Maintenance Review' | 'Safety Audit' | 'Other';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'In Progress' | 'Completed';
  dueDate: string;
  assignedTo: string;
  terminal: string;
  notes?: string;
  createdDate: string;
}

interface TaskTrackerProps {
  title?: string;
  defaultTerminal?: string;
  initialTasks?: Task[];
}

export const TaskTracker: React.FC<TaskTrackerProps> = ({ 
  title = 'Tasks',
  defaultTerminal = 'Columbus Terminal',
  initialTasks = []
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [expandedTaskIds, setExpandedTaskIds] = useState<Set<string>>(new Set());
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    type: 'Daily Dry Bulk Report',
    priority: 'Medium',
    status: 'Not Started',
    dueDate: '',
    assignedTo: '',
    terminal: defaultTerminal,
    notes: ''
  });

  const handleAddTask = () => {
    if (newTask.title && newTask.dueDate && newTask.assignedTo) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        type: newTask.type as any,
        priority: newTask.priority as any,
        status: newTask.status as any,
        dueDate: newTask.dueDate,
        assignedTo: newTask.assignedTo,
        terminal: newTask.terminal || defaultTerminal,
        notes: newTask.notes,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setTasks([task, ...tasks]);
      setNewTask({
        title: '',
        type: 'Daily Dry Bulk Report',
        priority: 'Medium',
        status: 'Not Started',
        dueDate: '',
        assignedTo: '',
        terminal: defaultTerminal,
        notes: ''
      });
      setIsAddingTask(false);
    }
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const taskStats = {
    total: tasks.length,
    highPriority: tasks.filter(t => t.priority === 'High').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length
  };

  return (
    <div style={{ 
      padding: '1.5rem 1.25rem', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1.25rem',
      background: 'var(--background-color)'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingBottom: '0.75rem',
        borderBottom: '2px solid var(--border-color)'
      }}>
        <h2 style={{ 
          fontSize: '1.125rem', 
          fontWeight: 700, 
          color: 'var(--text-primary)', 
          margin: 0,
          letterSpacing: '-0.025em'
        }}>
          {title}
        </h2>
        <button
          onClick={() => setIsAddingTask(!isAddingTask)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: isAddingTask ? '#ef4444' : 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.8125rem',
            fontWeight: 600,
            transition: 'all 0.2s ease',
            boxShadow: isAddingTask ? '0 2px 8px rgba(239, 68, 68, 0.25)' : '0 2px 8px rgba(255, 107, 53, 0.25)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = isAddingTask ? '0 4px 12px rgba(239, 68, 68, 0.3)' : '0 4px 12px rgba(255, 107, 53, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = isAddingTask ? '0 2px 8px rgba(239, 68, 68, 0.25)' : '0 2px 8px rgba(255, 107, 53, 0.25)';
          }}
        >
          {isAddingTask ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
              Cancel
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              New Task
            </>
          )}
        </button>
      </div>

      {/* Task Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '0.875rem'
      }}>
        <div style={{ 
          padding: '1rem',
          background: 'var(--card-background)',
          borderRadius: '10px',
          border: '1px solid var(--border-color)',
          textAlign: 'center',
          transition: 'all 0.2s ease',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: 'var(--primary-color)',
            lineHeight: 1
          }}>{taskStats.total}</div>
          <div style={{ 
            fontSize: '0.6875rem', 
            color: 'var(--text-secondary)', 
            marginTop: '0.375rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 600
          }}>Total</div>
        </div>
        <div style={{ 
          padding: '1rem',
          background: 'var(--card-background)',
          borderRadius: '10px',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          textAlign: 'center',
          transition: 'all 0.2s ease',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#ef4444',
            lineHeight: 1
          }}>{taskStats.highPriority}</div>
          <div style={{ 
            fontSize: '0.6875rem', 
            color: 'var(--text-secondary)', 
            marginTop: '0.375rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 600
          }}>High Priority</div>
        </div>
        <div style={{ 
          padding: '1rem',
          background: 'var(--card-background)',
          borderRadius: '10px',
          border: '1px solid rgba(251, 146, 60, 0.2)',
          textAlign: 'center',
          transition: 'all 0.2s ease',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(251, 146, 60, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#fb923c',
            lineHeight: 1
          }}>{taskStats.inProgress}</div>
          <div style={{ 
            fontSize: '0.6875rem', 
            color: 'var(--text-secondary)', 
            marginTop: '0.375rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 600
          }}>In Progress</div>
        </div>
        <div style={{ 
          padding: '1rem',
          background: 'var(--card-background)',
          borderRadius: '10px',
          border: '1px solid rgba(74, 222, 128, 0.2)',
          textAlign: 'center',
          transition: 'all 0.2s ease',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 222, 128, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#4ade80',
            lineHeight: 1
          }}>{taskStats.completed}</div>
          <div style={{ 
            fontSize: '0.6875rem', 
            color: 'var(--text-secondary)', 
            marginTop: '0.375rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 600
          }}>Completed</div>
        </div>
      </div>

      {/* Add Task Form */}
      {isAddingTask && (
        <div style={{
          padding: '1.25rem',
          background: 'var(--card-background)',
          border: '2px solid var(--primary-color)',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(255, 107, 53, 0.12)',
          animation: 'slideDown 0.3s ease'
        }}>
          <h3 style={{ 
            fontSize: '0.9375rem', 
            fontWeight: 700, 
            color: 'var(--text-primary)', 
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
            Create New Task
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                color: 'var(--text-secondary)', 
                marginBottom: '0.375rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Task Title *
              </label>
              <input
                type="text"
                placeholder="Enter task title..."
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  background: 'var(--background-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                color: 'var(--text-secondary)', 
                marginBottom: '0.375rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Task Type *
              </label>
              <select
                value={newTask.type}
                onChange={(e) => setNewTask({ ...newTask, type: e.target.value as any })}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  background: 'var(--background-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="Compliance Report">📋 Compliance Report</option>
                <option value="Daily Dry Bulk Report">📊 Daily Dry Bulk Report</option>
                <option value="Daily Terminal Report">📈 Daily Terminal Report</option>
                <option value="Investigation">🔍 Investigation</option>
                <option value="HR Inquiry">👥 HR Inquiry</option>
                <option value="Maintenance Review">🔧 Maintenance Review</option>
                <option value="Safety Audit">⚠️ Safety Audit</option>
                <option value="Other">📝 Other</option>
              </select>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  color: 'var(--text-secondary)', 
                  marginBottom: '0.375rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Priority *
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.875rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--background-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="High">🔴 High Priority</option>
                  <option value="Medium">🟡 Medium Priority</option>
                  <option value="Low">🟢 Low Priority</option>
                </select>
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  color: 'var(--text-secondary)', 
                  marginBottom: '0.375rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Due Date *
                </label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.875rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--background-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                color: 'var(--text-secondary)', 
                marginBottom: '0.375rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Assigned To *
              </label>
              <input
                type="text"
                placeholder="Enter assignee name..."
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  background: 'var(--background-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                color: 'var(--text-secondary)', 
                marginBottom: '0.375rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Notes
              </label>
              <textarea
                placeholder="Add any additional notes..."
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  background: 'var(--background-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <button
              onClick={handleAddTask}
              disabled={!newTask.title || !newTask.dueDate || !newTask.assignedTo}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                background: (!newTask.title || !newTask.dueDate || !newTask.assignedTo) ? 'var(--border-color)' : '#4ade80',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: (!newTask.title || !newTask.dueDate || !newTask.assignedTo) ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: 700,
                transition: 'all 0.2s ease',
                boxShadow: (!newTask.title || !newTask.dueDate || !newTask.assignedTo) ? 'none' : '0 2px 8px rgba(74, 222, 128, 0.25)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                if (newTask.title && newTask.dueDate && newTask.assignedTo) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 222, 128, 0.35)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = (!newTask.title || !newTask.dueDate || !newTask.assignedTo) ? 'none' : '0 2px 8px rgba(74, 222, 128, 0.25)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              Create Task
            </button>
          </div>
        </div>
      )}

      {/* Task List */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.5rem',
        paddingRight: '0.5rem'
      }}>
        {tasks.length === 0 ? (
          <div style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            background: 'var(--card-background)',
            borderRadius: '8px',
            border: '2px dashed var(--border-color)'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" style={{ margin: '0 auto 1rem' }}>
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
              No tasks yet. Create your first task to get started!
            </p>
          </div>
        ) : (
          tasks.map(task => {
            const priorityColor = task.priority === 'High' ? '#ef4444' : task.priority === 'Medium' ? '#fb923c' : '#10b981';
            const isExpanded = expandedTaskIds.has(task.id);
            
            return (
              <div
                key={task.id}
                style={{
                  background: 'var(--card-background)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  borderLeft: `4px solid ${priorityColor}`,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  overflow: 'hidden'
                }}
              >
                {/* Task Row - Always Visible */}
                <div
                  onClick={() => {
                    const newExpanded = new Set(expandedTaskIds);
                    if (isExpanded) {
                      newExpanded.delete(task.id);
                    } else {
                      newExpanded.add(task.id);
                    }
                    setExpandedTaskIds(newExpanded);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    padding: '0.875rem 1rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 107, 53, 0.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {/* Left Side: Expand Icon + Title */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    flex: 1,
                    minWidth: 0
                  }}>
                    {/* Expand Icon */}
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="var(--text-secondary)" 
                      strokeWidth="2"
                      style={{
                        transition: 'transform 0.2s ease',
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        flexShrink: 0
                      }}
                    >
                      <path d="M9 18l6-6-6-6"/>
                    </svg>

                    {/* Task Title */}
                    <div style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: 600, 
                      color: 'var(--text-primary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1
                    }}>
                      {task.title}
                    </div>
                  </div>

                  {/* Right Side: Due Date */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {new Date(task.dueDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric'
                    })}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{
                    padding: '1rem',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid var(--border-color)',
                    background: 'rgba(0, 0, 0, 0.01)'
                  }}>
                    {/* Tags and Actions Row */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.875rem',
                      gap: '0.75rem',
                      flexWrap: 'wrap'
                    }}>
                      {/* Left Side: Badges */}
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {/* Type Badge */}
                        <span style={{
                          display: 'inline-block',
                          padding: '0.375rem 0.75rem',
                          background: 'rgba(255, 107, 53, 0.1)',
                          color: 'var(--primary-color)',
                          borderRadius: '6px',
                          fontSize: '0.6875rem',
                          fontWeight: 600
                        }}>
                          {task.type}
                        </span>

                        {/* Priority Badge */}
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          padding: '0.375rem 0.75rem',
                          background: task.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : task.priority === 'Medium' ? 'rgba(251, 146, 60, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                          color: priorityColor,
                          borderRadius: '6px',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          <span style={{ 
                            width: '6px', 
                            height: '6px', 
                            borderRadius: '50%', 
                            background: priorityColor 
                          }}/>
                          {task.priority}
                        </span>

                        {/* Status Dropdown */}
                        <select
                          value={task.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleUpdateTask(task.id, { status: e.target.value as any });
                          }}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            padding: '0.375rem 0.625rem',
                            background: task.status === 'Completed' ? '#4ade80' : task.status === 'In Progress' ? '#fb923c' : '#94a3b8',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            outline: 'none'
                          }}
                        >
                          <option value="Not Started">⏸️ Not Started</option>
                          <option value="In Progress">▶️ In Progress</option>
                          <option value="Completed">✓ Completed</option>
                        </select>
                      </div>

                      {/* Right Side: Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTask(task.id);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          padding: '0.375rem 0.75rem',
                          background: 'transparent',
                          color: '#ef4444',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          transition: 'all 0.2s ease',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#ef4444';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.borderColor = '#ef4444';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#ef4444';
                          e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                        </svg>
                        Delete
                      </button>
                    </div>

                    {/* Details Grid */}
                    <div style={{ 
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gap: '0.625rem',
                      fontSize: '0.8125rem',
                      marginBottom: task.notes ? '0.875rem' : 0
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        color: 'var(--text-secondary)',
                        fontWeight: 600 
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                        Assigned:
                      </div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                        {task.assignedTo}
                      </div>

                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        color: 'var(--text-secondary)',
                        fontWeight: 600 
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        Due Date:
                      </div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                        {new Date(task.dueDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric',
                          weekday: 'short'
                        })}
                      </div>

                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        color: 'var(--text-secondary)',
                        fontWeight: 600 
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        Terminal:
                      </div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                        {task.terminal}
                      </div>
                    </div>

                    {/* Notes */}
                    {task.notes && (
                      <div style={{ 
                        marginTop: '0.875rem',
                        padding: '0.75rem',
                        background: 'var(--card-background)',
                        borderRadius: '6px',
                        fontSize: '0.8125rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        borderLeft: '3px solid var(--primary-color)'
                      }}>
                        <div style={{ fontWeight: 600, marginBottom: '0.375rem', color: 'var(--text-primary)' }}>
                          Notes:
                        </div>
                        {task.notes}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
