import FiltersByPropListProps from '../interface';

type AreaUnitFilterType = Pick<FiltersByPropListProps, 'register' | 'setValue'>;

interface AreaUnitFilterProp extends AreaUnitFilterType {
  setAreaState: (v: string) => void;
}

export default AreaUnitFilterProp;
