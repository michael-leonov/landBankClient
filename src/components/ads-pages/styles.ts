import styled, { css } from 'styled-components';

export const PagesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 4px;
`;

export const Page = styled.button<{ active: boolean | string }>`
  font-size: ${({ active }) => (!active || active === 'false' ? '20px' : '26px')};
  cursor: ${({ active }) => (!active || active === 'false' ? 'pointer' : 'auto')};
  width: ${({ active }) => (!active || active === 'false' ? '30px' : '40px')};
  height: ${({ active }) => (!active || active === 'false' ? '30px' : '40px')};
  text-align: center;
  border: 1px solid ${({ active }) => (!active || active === 'false' ? '#d9d9d9' : 'white')};
  color: ${({ active }) => (!active || active === 'false' ? '#1c1c1c' : 'white')};

  background-color: ${({ active }) => (!active || active === 'false' ? 'white' : '#1c1c1c')};

  &:hover {
    ${({ active }) =>
      (!active || active === 'false') &&
      css`
        text-decoration: underline;
        background-color: #f2f4f6;
      `}
  }
`;
