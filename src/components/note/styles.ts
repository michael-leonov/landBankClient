import styled from 'styled-components';

export const NoteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  padding: 10px;
`;

export const NoteDescriptionWrapper = styled.div`
  display: flex;
  column-gap: 4px;
`;

export const Description = styled.p<{ width: number }>`
  word-wrap: break-word;
  width: ${({ width }) => `${width}px`};
`;

export const Index = styled.p`
  font-weight: bold;
`;

export const CreateAt = styled.p`
  margin-bottom: 4px;
`;

export const OperationWithNoteWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;
