import { RotatingLines } from 'react-loader-spinner';

const loadingTextBtn = (
  <>
    Загружаю..
    <RotatingLines
      strokeColor='grey'
      strokeWidth='5'
      animationDuration='0.75'
      width='15'
      visible={true}
    />
  </>
);

export default loadingTextBtn;
