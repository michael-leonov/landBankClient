interface SideBarLink {
  title: string;
  link: string;
  id: number;
  content: JSX.Element;
}

interface SideBarMenuProps {
  links: SideBarLink[];
}

export default SideBarMenuProps;
