import { CrBlock, CroGrid } from './Coulisses'

export const CASE2_EVENTS = [
  'onboarding_start',
  'onboarding_step_complete',
  'recommendation_view',
  'service_cta_click',
  'booking_start',
  'booking_complete_demo',
]

export function Case2Coulisses() {
  return (
    <>
      <h3 className="coulisses__case">Cas 03 — Accompagner l’utilisateur à chaque étape de son inscription</h3>
      <CrBlock title="Scénario et cadre de la démo">
        <ul>
          <li>
            Scénario fictif : <strong>Alex</strong>, cadre expérimenté, vient de créer son compte pour chercher un
            emploi. Il connaît peu les ateliers, outils et accompagnements.
          </li>
          <li>La situation et les besoins sont pré-remplis d’après ce scénario ; tout est modifiable.</li>
          <li>L’âge n’est ni demandé ni utilisé : les recommandations reposent uniquement sur les réponses.</li>
          <li>« Mes prochaines étapes » utilise une sauvegarde locale de démonstration, effacée par « Réinitialiser la démo » (barre du haut). « Mon espace » est la page d’accueil de l’espace de démonstration.</li>
        </ul>
      </CrBlock>
      <CrBlock title="Prise de rendez-vous">
        <p>
          Prise de rendez-vous{'\u00a0'}: 17 motifs officiels de rendez-vous individuels regroupés en 5 besoins, avec une
          porte d’entrée pour les candidats qui ne savent pas par où commencer et un lien vers les ateliers pour ceux
          qui préfèrent le collectif. L’offre complète reste accessible en un{'\u00a0'}clic.
        </p>
      </CrBlock>
      <CrBlock title="Direction graphique">
        <p>
          De grandes icônes pour décider vite, des photos pour les services, où une personne accompagne, des
          illustrations pour l’accueil et le suivi. Hypothèse à tester : des recommandations plus humaines augmentent
          le taux d’inscriptions finalisées.
        </p>
      </CrBlock>
      <CroGrid
        rubrics={{
          constat: (
            <p>
              Après la création d’un compte, une personne qui connaît peu l’offre doit identifier seule les ateliers,
              outils et accompagnements utiles. Le risque : un compte créé sans première action utile. C’est un point
              de vigilance, pas un constat chiffré.
            </p>
          ),
          hypothese: (
            <p>
              Si l’on propose, sans l’imposer, un guidage court qui aboutit à une première action concrète, alors
              davantage de nouveaux inscrits pourraient utiliser un service. Hypothèse à tester.
            </p>
          ),
          modification: (
            <ul>
              <li>Choix entre « Me guider » et « Explorer librement ».</li>
              <li>Trois questions, puis trois recommandations maximum, chacune justifiée.</li>
              <li>Règles déterministes lisibles (pas d’IA).</li>
              <li>Première action immédiate, aide humaine en alternative, page « Mes prochaines étapes ».</li>
            </ul>
          ),
          kpi: (
            <>
              <p><strong>KPI principal :</strong> part des nouveaux inscrits réalisant une première action utile après l’accueil.</p>
              <p><strong>Secondaire :</strong> progression dans le guidage.</p>
              <p><strong>Qualité :</strong> présence effective, satisfaction, adéquation du service.</p>
              <p><strong>Garde-fous :</strong> abandon du guidage, accès direct aux services, accessibilité.</p>
            </>
          ),
          equipes: (
            <ul>
              <li>Produit et DSI : déclenchement après inscription, stockage des préférences, RGPD.</li>
              <li>Consultants et équipes métier : pertinence des règles.</li>
              <li>Marketing relationnel (CRM) : cohérence avec les emails de bienvenue.</li>
              <li>Webanalyste : définition de la « première action utile » et marquage.</li>
            </ul>
          ),
        }}
      />
      <CrBlock title="Règles de recommandation">
        <table className="data-table">
          <caption className="visually-hidden">Règles de recommandation</caption>
          <thead><tr><th scope="col">Si…</th><th scope="col">Alors on propose</th></tr></thead>
          <tbody>
            <tr><td>« Préparer un entretien » et entretien déjà programmé</td><td>Simulation individuelle avec un consultant</td></tr>
            <tr><td>« Préparer un entretien », pas encore d’entretien</td><td>Atelier entretiens (+ simulateur en complément)</td></tr>
            <tr><td>« Actualiser mon CV » ou « Valoriser mon expérience »</td><td>Conseil sur la candidature (+ outil CV)</td></tr>
            <tr><td>« Identifier mes possibilités », ou évolution / changement de voie</td><td>Conseil en évolution professionnelle</td></tr>
          </tbody>
        </table>
        <p>Trois résultats maximum, départage dans un ordre fixe : les mêmes réponses donnent toujours le même résultat.</p>
      </CrBlock>
    </>
  )
}
