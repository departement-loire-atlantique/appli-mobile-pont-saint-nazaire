import { ApiEvent } from './event';

export const DECOUPAGE_ZONE = [
  {
    name: 'a',
    value: 47.297223983002525
  },
  {
    name: 'b',
    value: 47.29199519609625
  },
  {
    name: 'c',
    value: 47.28665490736053
  },
  {
    name: 'd',
    value: 47.28184540250855
  },
  {
    name: 'e',
    value: 47.275521401818374
  },
  {
    name: 'sud',
    value: 47.26928036636603
  }
];

export const langFr = {
  error: {
    titleStatus: 'ERREUR STATUS',
    bodyStatus: 'Status du pont temporairement indisponible. Veuillez réessayer ultérieurement.',
    titleCamera: 'ERREUR WEBCAM',
    bodyCamera: 'Webcam temporairement indiponible. Veuillez réessayer ultérieurement.',
    titleEvent: 'ERREUR EVENEMENT',
    bodyEvent: 'Evènement temporairement indiponible. Veuillez réessayer ultérieurement.',
    titleNotif: 'ERREUR NOTIFICATION',
    bodyNotif: 'Veuillez renouveller votre choix de notification'
  }
};

export const PSN_STATUS = {
  code_current_mode: 'm120',
  lib_current_mode: 'Déviation sens Saint-Nazaire - Saint-Brevin',
  next_mode: [
    {
      code_mode: 'M112',
      lib_mode: '2 voies sens Saint-Nazaire - Saint-Brevin',
      from: '2020-09-17T15:30:00 +0200'
    },
    {
      code_mode: 'M102',
      lib_mode: 'Voie centrale fermée',
      from: '2020-09-17T20:30:00 +0200'
    }
  ],
  close_from: '2020-09-18T20:30:00 +0200',
  closed_to: '2020-09-18T21:30:00 +0200',
};

export const EVENTS_MOCK = [/*{
  identifiant: 'E138626081400854970_1Haur1138626081400854526',
  datePublication: '2013-12-06T16:30:39 +0200',
  ligne1: 'Déviation',
  ligne2: 'D213 - MONTOIR-DE-BRETAGNE',
  ligne3: 'ST-BREVINS-LES-PINS, ST-NAZAIRE',
  ligne4: 'Fin prévisible : 06/12/2013 à 20h',
  ligne5: 'Route fermée / déviation',
  ligne6: 'Prudence',
  rattachement: 'Pont de Saint-Nazaire',
  nature: 'Deviation',
  type: 'Deviation',
  statut: 'en cours',
  longitude: '47.299',
  latitude: '6699841.260273831'
},*/
{
  identifiant: 'E138660201893538250_1Haur1138660201893538867',
  datePublication: '2013-12-06T16:35:35 +0200',
  ligne1: 'Véhicule en panne',
  ligne2: 'D213 - SAINT-BREVIN-LES-PINS',
  ligne3: 'ST-BREVINS-LES-PINS vers ST-NAZAIRE',
  ligne4: 'Fin prévisible : 06/12/2013 à 19h00',
  ligne5: 'Circulation sur 1 seule voie',
  ligne6: 'Prudence',
  rattachement: 'Pont de Saint-Nazaire',
  nature: 'VL en panne',
  type: 'VL en panne',
  statut: 'en cours',
  longitude: '47.276',
  latitude: '6698363.123107513'
},
{
  identifiant: 'E138626170999249700_1Haur113862617099924920',
  datePublication: '2013-12-06T16:45:11 +0200',
  ligne1: 'Vent >100km/h',
  ligne2: 'D213 - Pont de Saint-Nazaire',
  ligne3: 'ST-BREVINS-LES-PINS, ST-NAZAIRE',
  ligne4: 'Risque de rafales ',
  ligne5: 'Restriction de circulation en cours',
  ligne6: 'Prudence',
  rattachement: 'Pont de Saint-Nazaire',
  nature: 'Vent',
  type: 'Vent',
  statut: 'en cours',
  longitude: '47.298',
  latitude: '6699379.219872664'
}];


