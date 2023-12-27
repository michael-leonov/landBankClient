import { ICalculatorResult } from '../../pages/calculator/interface';

export interface CalculatorFormProps {
  setResult: (v: ICalculatorResult | string | null) => void;
}
