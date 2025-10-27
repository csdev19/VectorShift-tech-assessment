// delayNode.js

import React from 'react';
import { BaseNode } from './BaseNode';
import { NumberInput, SelectInput } from '../components/inputs';

const DelayNodeComponent = ({ id, state, updateState }) => {
  const getDelayDisplay = () => {
    switch (state.delayType) {
      case 'fixed':
        return `${state.delayMs}ms`;
      case 'random':
        return `${state.delayMs}-${state.maxDelay}ms`;
      case 'exponential':
        return `Exp: ${state.delayMs}ms`;
      default:
        return `${state.delayMs}ms`;
    }
  };

  return (
    <BaseNode.Container variant="delay" size="medium">
      <BaseNode.InputHandle id="input" nodeId={id} />

      <BaseNode.Header>Delay</BaseNode.Header>

      <BaseNode.Content>
        <BaseNode.Field>
          <NumberInput
            label="Delay (ms)"
            value={state.delayMs}
            onChange={(e) => updateState('delayMs', e.target.value)}
            placeholder="Enter delay in milliseconds..."
            min="0"
          />
        </BaseNode.Field>

        <BaseNode.Field>
          <SelectInput
            label="Delay Type"
            value={state.delayType}
            onChange={(e) => updateState('delayType', e.target.value)}
            options={[
              { value: 'fixed', label: 'Fixed' },
              { value: 'random', label: 'Random' },
              { value: 'exponential', label: 'Exponential Backoff' }
            ]}
          />
        </BaseNode.Field>

        <BaseNode.Field>
          <NumberInput
            label="Max Delay (ms)"
            value={state.maxDelay}
            onChange={(e) => updateState('maxDelay', e.target.value)}
            placeholder="Maximum delay..."
            min="0"
          />
        </BaseNode.Field>
      </BaseNode.Content>

      <BaseNode.CustomContent>
        {getDelayDisplay()}
      </BaseNode.CustomContent>

      <BaseNode.OutputHandle id="output" nodeId={id} />
    </BaseNode.Container>
  );
};

// Define default state
DelayNodeComponent.defaultState = {
  delayMs: '1000',
  delayType: 'fixed',
  maxDelay: '5000'
};

// Export with state management
export const DelayNode = BaseNode.withState(DelayNodeComponent);