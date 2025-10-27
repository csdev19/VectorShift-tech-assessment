// dataProcessingNode.js

import React from 'react';
import { BaseNode } from './BaseNode';
import { SelectInput, TextAreaInput } from '../components/inputs';

const DataProcessingNodeComponent = ({ id, state, updateState }) => {
  return (
    <BaseNode.Container variant="dataProcessing" size="xlarge">
      <BaseNode.InputHandle id="data1" nodeId={id} style={{ top: '20%' }} />
      <BaseNode.InputHandle id="data2" nodeId={id} style={{ top: '40%' }} />
      <BaseNode.InputHandle id="config" nodeId={id} style={{ top: '60%' }} />

      <BaseNode.Header>Data Processing</BaseNode.Header>

      <BaseNode.Content>
        <BaseNode.Field>
          <SelectInput
            label="Operation"
            value={state.operation}
            onChange={(e) => updateState('operation', e.target.value)}
            options={[
              { value: 'transform', label: 'Transform' },
              { value: 'aggregate', label: 'Aggregate' },
              { value: 'sort', label: 'Sort' },
              { value: 'group', label: 'Group By' },
              { value: 'merge', label: 'Merge' },
              { value: 'split', label: 'Split' }
            ]}
          />
        </BaseNode.Field>

        <BaseNode.Field>
          <TextAreaInput
            label="Script"
            value={state.script}
            onChange={(e) => updateState('script', e.target.value)}
            placeholder="Enter JavaScript processing code..."
            rows={4}
          />
        </BaseNode.Field>

        <BaseNode.Field>
          <SelectInput
            label="Output Format"
            value={state.outputFormat}
            onChange={(e) => updateState('outputFormat', e.target.value)}
            options={[
              { value: 'json', label: 'JSON' },
              { value: 'csv', label: 'CSV' },
              { value: 'xml', label: 'XML' },
              { value: 'text', label: 'Text' }
            ]}
          />
        </BaseNode.Field>
      </BaseNode.Content>

      <BaseNode.CustomContent>
        {state.operation} → {state.outputFormat}
      </BaseNode.CustomContent>

      <BaseNode.OutputHandle id="result" nodeId={id} style={{ top: '30%' }} />
      <BaseNode.OutputHandle id="error" nodeId={id} style={{ top: '70%' }} />
    </BaseNode.Container>
  );
};

// Define default state
DataProcessingNodeComponent.defaultState = {
  operation: 'transform',
  script: '// JavaScript code here\nreturn data.map(item => item.value);',
  outputFormat: 'json'
};

// Export with state management
export const DataProcessingNode = BaseNode.withState(DataProcessingNodeComponent);