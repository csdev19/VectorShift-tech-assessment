// apiNode.js

import React from 'react';
import { BaseNode } from './BaseNode';
import { TextInput, SelectInput, TextAreaInput } from '../components/inputs';

const ApiNodeComponent = ({ id, state, updateState }) => {
  const getHostname = (url) => {
    try {
      return new URL(url).hostname;
    } catch {
      return 'No URL';
    }
  };

  return (
    <BaseNode.Container variant="api" size="xlarge">
      <BaseNode.InputHandle id="trigger" nodeId={id} style={{ top: '25%' }} />
      <BaseNode.InputHandle id="data" nodeId={id} style={{ top: '50%' }} />
      <BaseNode.InputHandle id="config" nodeId={id} style={{ top: '75%' }} />

      <BaseNode.Header>API Call</BaseNode.Header>

      <BaseNode.Content>
        <BaseNode.Field>
          <TextInput
            label="URL"
            value={state.url}
            onChange={(e) => updateState('url', e.target.value)}
            placeholder="Enter API endpoint..."
          />
        </BaseNode.Field>

        <BaseNode.Field>
          <SelectInput
            label="Method"
            value={state.method}
            onChange={(e) => updateState('method', e.target.value)}
            options={[
              { value: 'GET', label: 'GET' },
              { value: 'POST', label: 'POST' },
              { value: 'PUT', label: 'PUT' },
              { value: 'DELETE', label: 'DELETE' },
              { value: 'PATCH', label: 'PATCH' }
            ]}
          />
        </BaseNode.Field>

        <BaseNode.Field>
          <TextAreaInput
            label="Headers"
            value={state.headers}
            onChange={(e) => updateState('headers', e.target.value)}
            placeholder="Enter JSON headers..."
            rows={2}
          />
        </BaseNode.Field>
      </BaseNode.Content>

      <BaseNode.CustomContent>
        {state.method} {getHostname(state.url)}
      </BaseNode.CustomContent>

      <BaseNode.OutputHandle id="success" nodeId={id} style={{ top: '30%' }} />
      <BaseNode.OutputHandle id="error" nodeId={id} style={{ top: '70%' }} />
    </BaseNode.Container>
  );
};

// Define default state
ApiNodeComponent.defaultState = {
  url: 'https://api.example.com/data',
  method: 'GET',
  headers: '{"Content-Type": "application/json"}'
};

// Export with state management
export const ApiNode = BaseNode.withState(ApiNodeComponent);