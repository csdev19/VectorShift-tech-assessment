// components/Alert.js
// Alert component to display pipeline analysis results

import React from 'react';

export const Alert = ({ data, onClose }) => {
  if (!data) return null;

  const { num_nodes, num_edges, is_dag } = data;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: is_dag ? '#d4edda' : '#f8d7da',
        border: `1px solid ${is_dag ? '#c3e6cb' : '#f5c6cb'}`,
        borderRadius: '8px',
        padding: '16px 24px',
        minWidth: '300px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        animation: 'slideIn 0.3s ease-out',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8px',
        }}
      >
        <h3
          style={{
            margin: 0,
            color: is_dag ? '#155724' : '#721c24',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Pipeline Analysis
        </h3>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: is_dag ? '#155724' : '#721c24',
            padding: '0',
            lineHeight: '1',
          }}
        >
          ×
        </button>
      </div>

      <div
        style={{
          color: is_dag ? '#155724' : '#721c24',
          fontSize: '14px',
        }}
      >
        <p style={{ margin: '8px 0' }}>
          <strong>Nodes:</strong> {num_nodes}
        </p>
        <p style={{ margin: '8px 0' }}>
          <strong>Edges:</strong> {num_edges}
        </p>
        <p style={{ margin: '8px 0' }}>
          <strong>Is DAG:</strong>{' '}
          {is_dag ? (
            <span style={{ color: '#28a745', fontWeight: 'bold' }}>✓ Yes</span>
          ) : (
            <span style={{ color: '#dc3545', fontWeight: 'bold' }}>
              ✗ No (Cycle Detected)
            </span>
          )}
        </p>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
