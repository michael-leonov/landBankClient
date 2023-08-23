import styled from 'styled-components';

export const FilterBlock = styled.div`
  background-color: #fff;
  border-top: 1px solid #f2f4f6;
`;

export const FilterBtn = styled.button<{ open: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  position: relative;
  width: 100%;
  padding: 20px 40px 20px 20px;

  &::after {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${({ open }) => (open ? '0 3px 4px' : '4px 3px 0')};
    border-color: ${({ open }) =>
      open
        ? 'transparent transparent black transparent'
        : 'black transparent transparent transparent'};
    content: '';
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
`;
