import styled from 'styled-components';

export const StyledNullAdsMain = styled.div`
  max-width: 1150px;
  margin: 20px auto;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  border-radius: 5px;
  color: #242629;
  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.07);
  transition: box-shadow 0.3s ease-in-out;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 16px 0;
`;

export const StyledNullAdsBlock = styled.div`
  display: flex;
  justify-content: center;
`;

export const NullAdsImage = styled(StyledNullAdsBlock)`
  margin-bottom: 28px;
`;
export const NullAdsTitle = styled(StyledNullAdsBlock)`
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
  margin-bottom: 8px;
  @media (max-width: 700px) {
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
  }
`;
export const NullAdsDescription = styled(StyledNullAdsBlock)`
  max-width: 480px;
  margin-bottom: 24px;
  text-align: center;
`;
