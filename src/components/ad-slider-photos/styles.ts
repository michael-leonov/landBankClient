import styled from 'styled-components';
import { StyleSheet } from 'aphrodite';

export const AdSlideImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #dcdcdc;
`;

export const AdSlideImg = styled.img`
  width: 320px;
  height: 320px;
`;

export const BulletStyles = StyleSheet.create({
  styles: {
    cursor: 'pointer',
    display: 'inline-block',
    width: '32px',
    height: '5px',
    'background-color': '#93989D',
    opacity: 0.7,
    margin: '0 4px',
    'border-radius': '2px',
  },

  active: {
    'background-color': 'white',
    opacity: 1,
  },
});
