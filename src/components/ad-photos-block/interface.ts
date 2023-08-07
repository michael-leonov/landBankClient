interface AdPhotosBlockProps {
  activeImg: number;
  photos: string[] | [];
  setActiveImg: (v: number) => void;
  title?: string;
}

export default AdPhotosBlockProps;
