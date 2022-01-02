import { Iitem } from '../_models/item';
export interface IResponse {
  status: string;
  copyright: string;
  section: string;
  last_updated: Date;
  num_results: number;
  results: Iitem[];
}
