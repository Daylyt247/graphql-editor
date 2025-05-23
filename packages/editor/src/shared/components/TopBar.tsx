import styled from '@emotion/styled';

import React, { useEffect, useRef } from 'react';
import { KeyboardActions, useIO } from '@/shared/hooks/io';

const TopBarComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 8px 25px 8px;
  height: 60px;
  position: absolute;
  z-index: 2;
  width: 100%;
  background-color: ${({ theme }) => theme.background.mainFurther}ee;
`;

export const TopBar: React.FC = ({ children }) => {
  const { mount } = useIO();

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const mounted = mount({
      [KeyboardActions.FindRelation]: () => {
        ref.current?.focus();
      },
    });
    return mounted.dispose;
  }, []);
  return <TopBarComponent>{children}</TopBarComponent>;
};
