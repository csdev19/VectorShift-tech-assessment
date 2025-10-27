from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class NodeModel(BaseModel):
    id: str
    type: str
    position: Dict[str, Any]
    data: Dict[str, Any]

class EdgeModel(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class PipelineModel(BaseModel):
    nodes: List[NodeModel]
    edges: List[EdgeModel]

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the given nodes and edges form a directed acyclic graph (DAG).
    Uses depth-first search to detect cycles.
    """
    if not edges:
        # No edges means no cycles
        return True
    
    # Build adjacency list
    adjacency_list = defaultdict(list)
    all_nodes = set()
    
    for edge in edges:
        source = edge['source']
        target = edge['target']
        adjacency_list[source].append(target)
        all_nodes.add(source)
        all_nodes.add(target)
    
    # Color map: 0 = white (unvisited), 1 = gray (being processed), 2 = black (processed)
    colors = {node: 0 for node in all_nodes}
    
    def has_cycle(node):
        colors[node] = 1  # Mark as gray (being processed)
        
        for neighbor in adjacency_list[node]:
            if colors[neighbor] == 1:  # Back edge found
                return True
            elif colors[neighbor] == 0 and has_cycle(neighbor):
                return True
        
        colors[node] = 2  # Mark as black (processed)
        return False
    
    # Check all nodes for cycles
    for node in all_nodes:
        if colors[node] == 0:  # Unvisited node
            if has_cycle(node):
                return False
    
    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineModel):
    """
    Parse the pipeline and return analysis including DAG validation.
    """
    # Convert Pydantic models to dicts for easier processing
    nodes = [node.dict() for node in pipeline.nodes]
    edges = [edge.dict() for edge in pipeline.edges]
    
    # Count nodes and edges
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Check if it's a DAG
    is_dag_result = is_dag(nodes, edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }