import React from 'react';
import { motion } from 'framer-motion';
import { WorkflowCanvas } from './WorkflowCanvas';
import { NodeEditor } from './NodeEditor';

interface WorkflowEditorProps {
  platform?: string;
  onChange?: (workflow: { nodes: any[]; edges: any[] }) => void;
}

export function WorkflowEditor({ platform = 'instagram', onChange }: WorkflowEditorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full"
    >
      <div className="flex flex-1">
        <div className="flex-1 relative">
          <WorkflowCanvas onChange={onChange} />
        </div>
        <NodeEditor platform={platform} />
      </div>
    </motion.div>
  );
}