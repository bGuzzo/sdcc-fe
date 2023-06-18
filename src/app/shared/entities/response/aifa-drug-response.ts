import { AifaDrug } from "../aifa-drug";

export interface AifaDrugResponse {
    
    drugs: Array<AifaDrug>;

    size: number;

    page: number;

    totalElement: number;
}