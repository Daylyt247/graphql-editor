import React, { useEffect, useMemo } from 'react';
import { fontFamily } from '@/vars';
import { useErrorsState, useTheme, useTreesState } from '@/state/containers';

import { SchemaEditorApi } from '@/editor/code/guild';
import { settings, theme as MonacoTheme } from '@/editor/code/monaco';
import { GqlSchemaEditor } from '@/editor/code/guild/editor/GqlSchemaEditor';
import { CodeContainer, ErrorLock } from '@/editor/code/style/Code';

export interface GqlCodePaneOuterProps {
  readonly?: boolean;
  placeholder?: string;
}

export type GqlCodePaneProps = {
  size: number | string;
  schema: string;
  gql: string;
  onChange: (v: string, isInvalid?: string) => void;
  libraries?: string;
} & GqlCodePaneOuterProps;

/**
 * React compontent holding GraphQL IDE
 */
export const GqlCodePane = (props: GqlCodePaneProps) => {
  const { schema, readonly, onChange, gql } = props;
  const { theme } = useTheme();
  const { selectedNodeId, setSelectedNodeId, allNodes } = useTreesState();
  const { lockCode, errorRowNumber } = useErrorsState();

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

  return (
    <CodeContainer>
      {theme && (
        <GqlSchemaEditor
          setGql={(e) => {
            onChange(e);
          }}
          gql={gql}
          height="100%"
          ref={ref}
          beforeMount={(monaco) =>
            monaco.editor.defineTheme('graphql-editor', MonacoTheme(theme))
          }
          onChange={(v) => {
            if (!props.readonly) onChange(v || '');
          }}
          schema={schema}
          options={codeSettings}
          select={(e) => {
            if (e) {
              const n = allNodes.nodes.find((an) => an.name === e);
              setSelectedNodeId(
                n && {
                  source: 'code',
                  value: {
                    id: n.id,
                    name: n.name,
                  },
                },
              );
            }
          }}
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
