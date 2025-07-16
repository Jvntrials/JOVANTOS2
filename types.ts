
export interface BloomsDistribution {
  remembering: number;
  understanding: number;
  applying: number;
  analyzing: number;
  evaluating: number;
  creating: number;
}

export interface TOSRow {
  topic: string;
  intendedOutcomes: string;
  totalItems: number;
  numberOfHours: number;
  bloomsDistribution: BloomsDistribution;
  itemPlacement: string; // e.g., "1, 5, 10"
  percentage: number;
}

export interface TOSTotals {
  totalItems: number;
  numberOfHours: number;
  bloomsDistribution: BloomsDistribution;
  percentage: number;
}

export interface TOSResult {
  tableRows: TOSRow[];
  totals: TOSTotals;
}
