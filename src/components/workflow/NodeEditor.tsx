import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkflowStore } from '../../stores/workflowStore';
import { NodeConfig } from './nodes/NodeConfig';

interface NodeEditorProps {
  platform: string;
}

export function NodeEditor({ platform }: NodeEditorProps) {
  const { selectedNodeId, nodes, updateNode } = useWorkflowStore();
  const selectedNode = nodes.find(node => node.id === selectedNodeId);

  if (!selectedNode) return null;

  const handleNodeUpdate = (updates: any) => {
    updateNode(selectedNode.id, updates);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedNodeId}
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="w-96 bg-slate-900 border-l border-slate-800/50 overflow-y-auto"
      >
        <NodeConfig
          data={selectedNode.data}
          onChange={handleNodeUpdate}
          platform={platform as any}
        />
      </motion.div>
    </AnimatePresence>
  );
}