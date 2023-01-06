import React, { useState } from 'react';
import styled from '@emotion/styled';
import { NodeDirectiveOptionsMenu } from '@/shared/components/ContextMenu';
import { ParserField } from 'graphql-js-tree';
import { transition } from '@/vars';

interface NodeDirectiveProps {
  onDelete: () => void;
  isLocked?: boolean;
}

const NodeDirectiveBlock = styled.div`
  padding: 0.25rem 0.5rem;
  color: ${({ theme }) => theme.colors.directive};
  font-size: 12px;
  border-radius: 0.25rem;
  position: relative;
  cursor: pointer;
  transition: ${transition};
  :hover {
    color: ${({ theme }) => theme.error};
  }
`;

export const DirectivePlacement: React.FC<NodeDirectiveProps> = ({
  onDelete,
  children,
  isLocked,
}) => {
  return (
    <NodeDirectiveBlock
      onClick={(e) => {
        if (isLocked) {
          return;
        }
        e.stopPropagation();
        onDelete();
      }}
    >
      {children}
    </NodeDirectiveBlock>
  );
};

interface CreateNodeDirectiveProps {
  isLocked?: boolean;
  node: ParserField;
}
const CreateDirectiveBlock = styled.div`
  padding: 0.25rem 0.5rem;
  font-size: 12px;
  color: ${({ theme }) => theme.disabled};
  border-radius: 0.25rem;
  position: relative;
  cursor: pointer;
  border: 1px dashed currentColor;
  transition: ${transition};
  svg {
    fill: ${({ theme }) => theme.colors.directive};
  }
  :hover {
    color: ${({ theme }) => theme.colors.directive};
  }
`;

export const CreateNodeDirective: React.FC<CreateNodeDirectiveProps> = ({
  node,
  isLocked,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <CreateDirectiveBlock
      onClick={(e) => {
        if (isLocked) {
          return;
        }
        e.stopPropagation();
        setMenuOpen(true);
      }}
    >
      Add placement
      {menuOpen && (
        <NodeMenuContainer>
          <NodeDirectiveOptionsMenu
            node={node}
            hideMenu={() => setMenuOpen(false)}
          />
        </NodeMenuContainer>
      )}
    </CreateDirectiveBlock>
  );
};

const NodeMenuContainer = styled.div`
  position: fixed;
  z-index: 2;
  transform: translate(-0.25rem, 0.5rem);
`;