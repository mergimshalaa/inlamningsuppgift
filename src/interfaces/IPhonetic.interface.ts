export interface IPhonetic {
    text: string;
    audio: string;
    license: {
      name: string;
      url: string;
    };
  }

  export interface IPhoneticsProps {
    word: string;
    phonetics: IPhonetic[];
  }
  
  export interface ILicenseProps {
    name: string;
    url: string;
  }