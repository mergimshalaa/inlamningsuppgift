import { IDefinitions } from "./IDefinition.interface";

export interface IMeaning {
    partOfSpeech: string;
    definitions: IDefinitions[];
    synonyms: string[];
    antonyms: string[];
  }