import SideBarLinksState from '../../../redux/slices/activeBarLinkSlice/interface';
import SideBarMenuProps from '../interface';

interface NavSliderProps extends SideBarMenuProps {
  activeSideBarLink: SideBarLinksState;
  onClickLinkHandler: (v: number) => void;
}

export default NavSliderProps;
