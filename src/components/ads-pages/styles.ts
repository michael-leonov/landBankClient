import styled from 'styled-components';

export const PagesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 4px;
`;

export const Page = styled.button<{ active: boolean | string }>`
  font-size: ${({ active }) => (!active || active === 'false' ? '20px' : '26px')};
  cursor: pointer;
  width: ${({ active }) => (!active || active === 'false' ? '30px' : '40px')};
  height: ${({ active }) => (!active || active === 'false' ? '30px' : '40px')};
  text-align: center;
  border: 1px solid grey;
  color: ${({ active }) => (!active || active === 'false' ? '' : 'blue')};
  text-decoration: ${({ active }) => (!active || active === 'false' ? 'none' : 'underline')};
`;
