import React from 'react';
import { X } from '@/shared/icons';
import styled from '@emotion/styled';
import * as vars from '@/vars';
import { Search } from '@/icons/Search';
import { Plus } from '@/icons/Plus';

interface MenuSearchProps {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  placeholder?: string;
  icon?: 'search' | 'add';
}

const Wrapper = styled.div`
  position: relative;
  max-width: 100%;
`;

const Main = styled.input`
  background-color: ${({ theme }) => theme.background.mainFurthers};
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  width: 100%;
  min-width: 0;
  height: 36px;
  padding: 0 12px 0 44px;
  font-size: 14px;
  outline: 0;
  position: relative;
  border-color: transparent;
  border-width: 1px;
  border-style: solid;
  transition: ${vars.transition};
  &::placeholder {
    color: ${({ theme }) => theme.dimmed};
  }
  :focus {
    border-color: ${({ theme }) => theme.active};
  }
`;

const IconContainerStyle = styled.span`
  position: absolute;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const SearchIconContainer = styled(IconContainerStyle)`
  margin-left: 15px;
  color: ${({ theme }) => theme.disabled};
`;

const XIconContainer = styled(IconContainerStyle)`
  width: 36px;
  right: 12px;
  cursor: pointer;
`;

export const SearchInput = React.forwardRef<HTMLInputElement, MenuSearchProps>(
  (
    {
      value,
      onChange,
      onClear,
      onSubmit,
      placeholder = 'Search...',
      icon = 'search',
    },
    ref,
  ) => {
    return (
      <Wrapper>
        <SearchIconContainer>
          {icon === 'search' && <Search />}
          {icon === 'add' && <Plus />}
        </SearchIconContainer>
        {value && (
          <XIconContainer onClick={onClear}>
            <X width={10} height={10} />
          </XIconContainer>
        )}
        <Main
          ref={ref}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit();
            }
          }}
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Wrapper>
    );
  },
);
