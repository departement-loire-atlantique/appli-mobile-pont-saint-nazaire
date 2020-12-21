export interface Interstitial {
  idapp?: string;
  urltarget: string;
  duration?: any;
  every?: any;
  image1: string;
  image2?: string;
  type?: string;
}

export interface InterstitialData {
  interstitials: Interstitial[];
}
