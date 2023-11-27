import { IMeaning } from "./IMeaning.interface";
import { IPhonetic } from "./IPhonetic.interface";

export interface IApiResponse {
    word: string;
    meanings: IMeaning[];
    phonetics: IPhonetic[];
    title: string;
    message: string;
    resolution: string;
  }