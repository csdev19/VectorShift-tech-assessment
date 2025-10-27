// outputNode.js

import React from 'react';
import { BaseNode } from './BaseNode';
import { TextInput, SelectInput } from '../components/inputs';

const OutputNodeComponent = ({ id, state, updateState }) => {
  return (
    <BaseNode.Container variant="output" size="medium">
      <BaseNode.InputHandle id="value" nodeId={id} />

      <BaseNode.Header>Output</BaseNode.Header>

      <BaseNode.Content>
        <BaseNode.Field>
          <TextInput
            label="Name"
            value={state.outputName}
            onChange={(e) => updateState('outputName', e.target.value)}
          />
        </BaseNode.Field>

        <BaseNode.Field>
          <SelectInput
            label="Type"
            value={state.outputType}
            onChange={(e) => updateState('outputType', e.target.value)}
            options={[
              { value: 'Text', label: 'Text' },
              { value: 'File', label: 'Image' }
            ]}
          />
        </BaseNode.Field>
      </BaseNode.Content>
    </BaseNode.Container>
  );
};

// Define default state
OutputNodeComponent.defaultState = {
  outputName: (id) => id.replace('customOutput-', 'output_'),
  outputType: 'Text'
};

// Export with state management
export const OutputNode = BaseNode.withState(OutputNodeComponent);