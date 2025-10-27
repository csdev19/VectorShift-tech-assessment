// services/api.js
// API service for backend communication

const API_BASE_URL = 'http://localhost:8000';

/**
 * Parse pipeline endpoint
 * @param {Object} pipeline - Pipeline data with nodes and edges
 * @returns {Promise<Object>} Analysis result with num_nodes, num_edges, is_dag
 */
export const parsePipeline = async (pipeline) => {
  console.log('Parsing pipeline:', pipeline);
  const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pipeline),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to parse pipeline: ${response.status} ${errorText}`);
  }

  return response.json();
};

/**
 * Check if backend is available
 * @returns {Promise<boolean>}
 */
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.ok;
  } catch {
    return false;
  }
};
