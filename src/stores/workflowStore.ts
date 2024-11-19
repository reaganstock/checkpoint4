import { create } from 'zustand';
import type { Node, Edge } from 'reactflow';
import type { NodeData } from '../components/workflow/nodes/types';

interface WorkflowState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  addNode: (node: Node<NodeData>) => void;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
  removeNode: (nodeId: string) => void;
  setSelectedNode: (nodeId: string | null) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (edgeId: string) => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  addNode: (node) =>
    set((state) => ({ nodes: [...state.nodes, node] })),
  updateNode: (nodeId, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    })),
  removeNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    })),
  setSelectedNode: (nodeId) =>
    set({ selectedNodeId: nodeId }),
  addEdge: (edge) =>
    set((state) => ({ edges: [...state.edges, edge] })),
  removeEdge: (edgeId) =>
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== edgeId),
    })),
}));