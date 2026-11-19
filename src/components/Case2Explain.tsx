import { ExplainPanel } from './ExplainPanel'

export function Case2Explain() {
  return (
    <ExplainPanel
      events={[
        'onboarding_start',
        'onboarding_step_complete',
        'recommendation_view',
        'service_cta_click',
        'booking_start',
        'booking_complete_demo',
      ]}
      rubrics={{
        constat: (
          <p>
            Après la création d’un compte, une personne qui connaît peu l’offre doit identifier seule les
            ateliers, outils et accompagnements utiles. Le risque : un compte créé sans première action utile.
            C’est un point de vigilance, pas un constat chiffré.
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
            <li>Règles déterministes lisibles (pas d’IA) ; l’âge n’est ni demandé ni utilisé.</li>
            <li>Première action immédiate, aide humaine en alternative, page « Mes prochaines étapes ».</li>
          </ul>
        ),
        kpi: (
          <>
            <p><strong>KPI principal :</strong> part des nouveaux inscrits réalisant une première action utile (inscription à un atelier, rendez-vous, usage d’un outil) après l’accueil.</p>
            <p><strong>Secondaire :</strong> progression dans le guidage (étapes complétées).</p>
            <p><strong>Qualité :</strong> présence effective, satisfaction, adéquation du service.</p>
            <p><strong>Garde-fous :</strong> abandon du guidage, accès direct aux services, accessibilité.</p>
          </>
        ),
        equipes: (
          <ul>
            <li>Produit et DSI : déclenchement après inscription, stockage des préférences, RGPD.</li>
            <li>Consultants et équipes métier : pertinence des règles de recommandation.</li>
            <li>Marketing relationnel (CRM) : cohérence avec les emails de bienvenue.</li>
            <li>Webanalyste : définition de la « première action utile » et du marquage.</li>
          </ul>
        ),
      }}
    >
      <section className="explain__rubric explain__rubric--wide">
        <h3>Règles de recommandation (extrait)</h3>
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
        <p className="muted">Trois résultats maximum, départage dans un ordre fixe : le même jeu de réponses donne toujours le même résultat.</p>
      </section>
    </ExplainPanel>
  )
}

