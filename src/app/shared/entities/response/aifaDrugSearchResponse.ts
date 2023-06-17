import { AifaDrug } from "../aifaDrug";

export interface AifaDrugSearchReponse {

    drugs: Array<AifaDrug>;

    avgPrice: number;

    size: number;

    page: number;
}