import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { settings } from './monaco';
import { fontFamily } from '@/vars';
import { useErrorsState, useTheme, useTreesState } from '@/state/containers';

import { SchemaEditorApi, SchemaEditor } from '@/editor/code/guild';
import { theme as MonacoTheme } from '@/editor/code/monaco';
import { OperationType } from 'graphql-js-tree';
import { CodeContainer, ErrorLock } from '@/editor/code/style/Code';
import { Maybe } from 'graphql-language-service';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';

export interface CodePaneOuterProps {
  readonly?: boolean;
}

export type CodePaneProps = {
  size: number | string;
  schema: string;
  onChange: (v: string) => void;
  libraries?: string;
  fullScreen?: boolean;
} & CodePaneOuterProps;

/**
 * React compontent holding GraphQL IDE
 */
export const CodePane = (props: CodePaneProps) => {
  const { schema, readonly, onChange, libraries, fullScreen } = props;
  const { theme } = useTheme();
  const { selectedNodeId, setSelectedNodeId, allNodes } = useTreesState();
  const { lockCode, errorRowNumber } = useErrorsState();
  const [temporaryString, setTemporaryString] = useState(schema);
  const debouncedTemporaryString = useDebouncedValue(temporaryString, 1200);

  const ref: React.ForwardedRef<SchemaEditorApi> = React.createRef();
  const codeSettings = useMemo(
    () => ({
      ...settings,
      fontFamily,
      readOnly: readonly,
    }),
    [readonly],
  );

  useEffect(() => {
    if (temporaryString !== schema) {
      onChange(debouncedTemporaryString);
    }
  }, [debouncedTemporaryString]);

  useEffect(() => {
    if (ref.current) {
      if (selectedNodeId?.source === 'code') {
        return;
      }
      selectedNodeId?.value?.name
        ? ref.current.jumpToType(selectedNodeId.value.name)
        : ref.current.deselect();
    }
  }, [selectedNodeId]);

  useEffect(() => {
    if (ref.current && errorRowNumber) {
      ref.current.jumpToError(errorRowNumber);
    }
  }, [errorRowNumber]);

  const selectFunction = useCallback(
    (
      e?:
        | Maybe<string>
        | Maybe<{ operation: 'Query' | 'Mutation' | 'Subscription' }>,
    ) => {
      if (fullScreen) return;
      if (e) {
        const op =
          typeof e === 'object' && e.operation
            ? (e.operation.toLowerCase() as OperationType)
            : undefined;
        const n = op
          ? allNodes.nodes.find((an) => an.type.operations?.includes(op))
          : allNodes.nodes.find((an) => an.name === e);
        setSelectedNodeId({
          source: 'code',
          value: n ? { id: n.id, name: n.name } : undefined,
        });
      }
    },
    [fullScreen, allNodes, setSelectedNodeId],
  );
  return (
    <CodeContainer>
      {theme && (
        <SchemaEditor
          height="100%"
          ref={ref}
          beforeMount={(monaco) =>
            monaco.editor.defineTheme('graphql-editor', MonacoTheme(theme))
          }
          onChange={(v) => {
            if (props.readonly) return;
            if (v === schema) return;
            setTemporaryString(v || '');
          }}
          onBlur={(v) => {
            if (props.readonly) return;
            if (v === schema) return;
            onChange(v);
          }}
          schema={schema}
          libraries={libraries}
          options={codeSettings}
          select={selectFunction}
        />
      )}
      {lockCode && (
        <ErrorLock
          onClick={() => {}}
        >{`Unable to parse GraphQL graph. Code editor is locked. Open graph editor to correct errors in GraphQL Schema. Message:\n${lockCode}`}</ErrorLock>
      )}
    </CodeContainer>
  );
};
