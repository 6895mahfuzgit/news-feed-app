import { ItemType } from './../_enums/Item-type.enum';
import { Multimedia } from "./multimedia";

export interface Item {
  section:             string;
  subsection:          string;
  title:               string;
  abstract:            string;
  url:                 string;
  uri:                 string;
  byline:              string;
  item_type:           ItemType;
  updated_date:        Date;
  created_date:        Date;
  published_date:      Date;
  material_type_facet: string;
  kicker:              string;
  des_facet:           string[];
  org_facet:           string[];
  per_facet:           string[];
  geo_facet:           string[];
  multimedia:          Multimedia[];
  short_url:           string;
}
