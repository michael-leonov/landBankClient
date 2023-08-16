import { PropsWithChildren } from 'react';

interface HomeBlockLinkProps extends PropsWithChildren {
  imgUrl: string;
  title: string;
  route: string;
}

export default HomeBlockLinkProps;
