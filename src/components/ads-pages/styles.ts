import styled from 'styled-components';

export const PagesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 4px;
`;

export const Page = styled.div<{ active: boolean }>`
  font-size: ${({ active }) => (active ? '26px' : '20px')};
  cursor: pointer;
  width: ${({ active }) => (active ? '40px' : '30px')};
  height: ${({ active }) => (active ? '40px' : '30px')};
  text-align: center;
  border: 1px solid grey;
  color: ${({ active }) => (active ? 'blue  ' : '')};
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
`;
