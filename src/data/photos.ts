/**
 * Photographies de la piste 3 (cas 1) et de la carte atelier du cas 3.
 *
 * Provenance : Unsplash (https://unsplash.com), licence Unsplash — usage gratuit,
 * commercial ou non, sans autorisation requise (https://unsplash.com/license).
 * Fichiers téléchargés depuis le CDN public images.unsplash.com, recadrés en
 * 960 × 600, sans métadonnées EXIF/XMP. Identifiant d'origine conservé ci-dessous ;
 * le nom du photographe est à confirmer sur la page de chaque photo.
 *
 * Ces photos illustrent des situations : elles ne représentent ni des salariés,
 * ni des consultants, ni des usagers de l'Apec.
 */
export interface Photo {
  file: string
  alt: string
  unsplashId: string
}

const P = (file: string, unsplashId: string, alt: string): Photo => ({
  file: `photos/${file}.jpg`,
  unsplashId,
  alt,
})

export const PHOTOS = {
  atelierPostIt: P('atelier-post-it', '1552664730-d307ca884978', 'Une animatrice présente des idées sur un mur de post-it à un petit groupe assis autour d’une table.'),
  atelierOrdinateurs: P('atelier-ordinateurs', '1542744173-8e7e53415bb0', 'Un groupe travaille sur des ordinateurs portables autour d’une grande table, un intervenant au fond de la salle.'),
  entretienFaceAFace: P('entretien-face-a-face', '1551836022-d5d88e9218df', 'Deux femmes échangent de part et d’autre d’une table de réunion, l’une prend des notes.'),
  relectureEcran: P('relecture-ecran', '1531482615713-2afd69097998', 'Deux personnes relisent ensemble un document à l’écran d’un ordinateur.'),
  conversation: P('conversation', '1517245386807-bb43f82c33c4', 'Gros plan sur les mains de deux personnes en discussion, devant un ordinateur portable.'),
  posteDeTravail: P('poste-de-travail', '1499750310107-5fef28a66643', 'Un ordinateur portable, un carnet et une tasse sur un bureau en bois.'),
  jeunesDiplomes: P('jeunes-diplomes', '1523240795612-9a054b0db644', 'Trois jeunes adultes rient ensemble devant un ordinateur dans une bibliothèque.'),
  equipeJeune: P('equipe-jeune', '1525130413817-d45c1d127c42', 'Trois jeunes professionnels discutent autour d’un ordinateur portable.'),
  collegues: P('collegues', '1600880292203-757bb62b4baf', 'Deux collègues se tapent dans la main au-dessus d’un bureau.'),
  formationSalle: P('formation-salle', '1521737604893-d14cc237f11d', 'Plusieurs personnes travaillent sur ordinateur dans une salle lumineuse.'),
  cadreSouriante: P('cadre-souriante', '1573497019940-1c28c88b4f3e', 'Portrait d’une femme souriante, cheveux bouclés, dans un environnement de bureau.'),
  reunionTable: P('reunion-table', '1517048676732-d65bc937f952', 'Des personnes prennent des notes autour d’une table de réunion.'),
  bureauEquipe: P('bureau-equipe', '1556761175-b413da4baf72', 'Une équipe échange dans un open space, autour d’écrans.'),
  travailEquipe: P('travail-equipe', '1522071820081-009f0129c71c', 'Une équipe travaille sur des ordinateurs portables autour d’une table.'),
} satisfies Record<string, Photo>

/** Photo associée à chaque service dans la piste 3. */
export const SERVICE_PHOTO: Record<string, Photo> = {
  'atelier-entretiens': PHOTOS.atelierPostIt,
  'atelier-iag': PHOTOS.atelierOrdinateurs,
  'entretien-programme': PHOTOS.entretienFaceAFace,
  candidature: PHOTOS.relectureEcran,
  'simulateur-entretien': PHOTOS.posteDeTravail,
  'creer-cv': PHOTOS.posteDeTravail,
  cep: PHOTOS.conversation,
  'evolution-interne': PHOTOS.collegues,
  formation: PHOTOS.formationSalle,
  reconversion: PHOTOS.cadreSouriante,
  'premier-emploi': PHOTOS.jeunesDiplomes,
  'profil-debutant': PHOTOS.equipeJeune,
  'premier-salaire': PHOTOS.posteDeTravail,
  'conseil-recrutement': PHOTOS.reunionTable,
  'publication-offre': PHOTOS.bureauEquipe,
  preselection: PHOTOS.travailEquipe,
}

export const ALL_PHOTOS: Photo[] = Object.values(PHOTOS)
