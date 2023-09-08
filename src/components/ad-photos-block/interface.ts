interface AdPhotosBlockProps {
  activeImg: number;
  photos: string[] | [];
  setActiveImg: (v: number) => void;
  title?: string;
  isBankZemel: boolean;
}

export default AdPhotosBlockProps;
