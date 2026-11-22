/**
 * Contrôle de build : tout lien générique vers un consultant mène au Rendez-vous conseil.
 *
 * Règle : un lien dont le texte est générique (« Échanger avec un consultant », « Prendre
 * rendez-vous avec un consultant », « Vous hésitez ? », « Aucune suggestion ne vous convient ? »…)
 * doit pointer vers /reserver/rendez-vous-conseil. Seuls les liens qui nomment un service précis
 * mènent à ce service. Le build échoue sinon, en particulier pour un lien générique vers /reserver/cep.
 *
 * Usage : node scripts/check-consultant-links.mjs [dossier] [--list]
 *   --list affiche tous les liens vers /reserver/ et /service/ avec leur cible.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.argv.find((a, i) => i > 1 && !a.startsWith('--')) ?? 'src'
const list = process.argv.includes('--list')

const GENERIC = /Échanger avec un consultant|Prendre rendez-vous avec un consultant|Vous hésitez|Aucune suggestion ne vous convient|Aucun ne vous correspond|Vous préférez en parler à quelqu’un|Je ne sais pas par où commencer/
const GENERIC_TARGET = '/reserver/rendez-vous-conseil'

const files = []
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(tsx|ts)$/.test(f)) files.push(p)
  }
}
walk(root)

/** Ouvre une balise JSX : renvoie la fin de la balise d'ouverture, en ignorant les « > » dans les {…} et les chaînes. */
function tagEnd(src, from) {
  let depth = 0
  let quote = null
  for (let i = from; i < src.length; i++) {
    const c = src[i]
    if (quote) { if (c === quote && src[i - 1] !== '\\') quote = null; continue }
    if (c === '"' || c === "'" || c === '`') quote = c
    else if (c === '{') depth++
    else if (c === '}') depth--
    else if (c === '>' && depth === 0) return i
  }
  return -1
}

const TARGET = /\b(?:to|href)=(?:"([^"]+)"|\{`([^`]+)`\}|\{'([^']+)'\}|\{([^}]+)\})/
const errors = []
const rows = []

for (const file of files) {
  const src = readFileSync(file, 'utf8')
  for (const m of src.matchAll(/<(Link|a)\b/g)) {
    const end = tagEnd(src, m.index + m[0].length)
    if (end < 0 || src[end - 1] === '/') continue
    const attrs = src.slice(m.index + m[0].length, end)
    const close = src.indexOf(`</${m[1]}>`, end)
    if (close < 0) continue
    const t = TARGET.exec(attrs)
    if (!t) continue
    const target = (t[1] ?? t[2] ?? t[3] ?? t[4]).trim()
    // Texte du lien : balises et expressions de mise en forme retirées.
    const text = src.slice(end + 1, close)
      .replace(/<[^>]*>/g, ' ')
      .replace(/\{'\\u00a0'\}|\{' '\}/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    const line = src.slice(0, m.index).split('\n').length
    const where = `${relative(process.cwd(), file)}:${line}`
    if (/\/reserver\/|\/service\//.test(target)) rows.push(`${where}\t${target}\t« ${text.slice(0, 70)} »`)
    if (GENERIC.test(text) && !target.includes(GENERIC_TARGET)) {
      errors.push(`${where} : lien générique « ${text} » → ${target} (attendu : ${GENERIC_TARGET})`)
    }
    if (target.includes('/reserver/cep') && GENERIC.test(text)) {
      errors.push(`${where} : lien générique vers /reserver/cep`)
    }
  }
}

if (list) console.log(rows.join('\n'))
if (errors.length) {
  console.error(`\nLiens vers un consultant : ${errors.length} erreur(s)\n` + errors.map((e) => `  - ${e}`).join('\n'))
  process.exit(1)
}
console.log(`Liens vers un consultant : OK (${files.length} fichiers contrôlés).`)
