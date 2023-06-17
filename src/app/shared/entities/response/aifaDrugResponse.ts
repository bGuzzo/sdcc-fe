import { AifaDrug } from "../aifaDrug";

export interface AifaDrugResponse {
    
    drugs: Array<AifaDrug>;

    size: number;

    page: number;
}