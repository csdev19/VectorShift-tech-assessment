// filterNode.js

import React from 'react';
import { BaseNode } from './BaseNode';
import { TextInput, SelectInput } from '../components/inputs';

const FilterNodeComponent = ({ id, state, updateState }) => {
  return (
    <BaseNode.Container variant="filter" size="medium">
      <BaseNode.InputHandle id="data" nodeId={id} />

      <BaseNode.Header>Filter</BaseNode.Header>

      <BaseNode.Content>
        <BaseNode.Field>
          <SelectInput
            label="Filter Type"
            value={state.filterType}
            onChange={(e) => updateState('filterType', e.target.value)}
            options={[
              { value: 'contains', label: 'Contains' },
              { value: 'equals', label: 'Equals' },
              { value: 'startsWith', label: 'Starts With' },
              { value: 'endsWith', label: 'Ends With' },
              { value: 'regex', label: 'Regex' },
              { value: 'length', label: 'Length' }
            ]}
          />
        </BaseNode.Field>

        <BaseNode.Field>
          <TextInput
            label="Filter Value"
            value={state.filterValue}
            onChange={(e) => updateState('filterValue', e.target.value)}
            placeholder="Enter filter value..."
          />
        </BaseNode.Field>

        <BaseNode.Field>
          <SelectInput
            label="Case Sensitive"
            value={state.caseSensitive}
            onChange={(e) => updateState('caseSensitive', e.target.value)}
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' }
            ]}
          />
        </BaseNode.Field>
      </BaseNode.Content>

      <BaseNode.CustomContent>
        {state.filterType} "{state.filterValue || '...'}"
      </BaseNode.CustomContent>

      <BaseNode.OutputHandle id="filtered" nodeId={id} style={{ top: '30%' }} />
      <BaseNode.OutputHandle id="rejected" nodeId={id} style={{ top: '70%' }} />
    </BaseNode.Container>
  );
};

// Define default state
FilterNodeComponent.defaultState = {
  filterType: 'contains',
  filterValue: '',
  caseSensitive: 'false'
};

// Export with state management
export const FilterNode = BaseNode.withState(FilterNodeComponent);