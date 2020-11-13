export interface IResponseData {
  calculated: ICalculated[];
  metrics: string[];
}

interface ICalculated {
  for: ICalculatedFor;
  values: ICalculatedValue[];
}

interface ICalculatedFor {
  repositories: string[];
}

export interface ICalculatedValue {
  date: string;
  values: (string | number | null)[];
}
