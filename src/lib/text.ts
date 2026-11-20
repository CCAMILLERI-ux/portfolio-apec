/** Espace insécable entre les deux derniers mots : pas de mot seul en fin de ligne. */
export function nb(text: string): string {
  return text.replace(/\s+(\S+)\s*$/, ' $1')
}
