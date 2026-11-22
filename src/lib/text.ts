/**
 * Espace insécable entre les deux derniers mots (pas de mot seul en fin de ligne),
 * et avant « : ; ? ! » (typographie française).
 */
export function nb(text: string): string {
  text = text.replace(/ ([:;?!])/g, '\u00a0$1')
  return text.replace(/\s+(\S+)\s*$/, ' $1')
}
