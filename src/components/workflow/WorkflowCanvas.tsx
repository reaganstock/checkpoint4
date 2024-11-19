import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Connection,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { WorkflowNode } from './nodes/WorkflowNode';
import { WorkflowControls } from './WorkflowControls';
import { useWorkflowStore } from '../../stores/workflowStore';
import type { NodeType } from './nodes/types';

const nodeTypes = {
  workflowNode: WorkflowNode,
};

export function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { addNode, setSelectedNode } = useWorkflowStore();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      if (!type) return;

      const position = {
        x: event.clientX - 200,
        y: event.clientY - 100,
      };

      const newNode = {
        id: `${type}-${Date.now()}`,
        type: 'workflowNode',
        position,
        data: { type, label: type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') },
      };

      setNodes((nds) => [...nds, newNode]);
      addNode(newNode);
    },
    [setNodes, addNode]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: { id: string }) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="w-full h-full bg-slate-900">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        className="workflow-canvas"
      >
        <Background color="#334155" gap={16} />
        <Controls />
        <WorkflowControls />
      </ReactFlow>
    </div>
  );
}