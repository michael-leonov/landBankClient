import { StyleSheet } from 'aphrodite';
import styled from 'styled-components';

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
  active: {
    'background-color': 'white',
    opacity: 1,
  },

  styles: {
    'background-color': '#93989D',
    'border-radius': '2px',
    cursor: 'pointer',
    display: 'inline-block',
    height: '5px',
    margin: '0 4px',
    opacity: 0.7,
    width: '32px',
  },
});
