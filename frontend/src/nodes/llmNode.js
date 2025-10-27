// llmNode.js

import React from 'react';
import { BaseNode } from './BaseNode';

const LLMNodeComponent = ({ id }) => {
  return (
    <BaseNode.Container variant="llm" size="medium">
      <BaseNode.InputHandle id="system" nodeId={id} style={{ top: '33%' }} />
      <BaseNode.InputHandle id="prompt" nodeId={id} style={{ top: '67%' }} />

      <BaseNode.Header>LLM</BaseNode.Header>

      <BaseNode.Content>
        <BaseNode.CustomContent>
          This is a LLM.
        </BaseNode.CustomContent>
      </BaseNode.Content>

      <BaseNode.OutputHandle id="response" nodeId={id} />
    </BaseNode.Container>
  );
};

// Export without state management (no fields)
export const LLMNode = LLMNodeComponent;