"use strict";

const normalPresetIds = [
  "appearance_adequate",
  "hygiene_preserved",
  "clothing_adequate",
  "attitude_collaborative",
  "good_contact",
  "psychomotor_normal",
  "will_preserved",
  "lucid",
  "alert",
  "attention_preserved",
  "oriented_global",
  "memory_no_gross_changes",
  "language_no_relevant_changes",
  "thought_organized",
  "no_delusions",
  "mood_euthymic",
  "affect_congruent",
  "affect_modulated",
  "perception_no_referred_changes",
  "perception_no_observed_changes",
  "judgment_preserved",
  "insight_preserved",
  "denies_suicidal",
  "denies_homicidal"
];

const eemDomains = [
  {
    id: "appearance",
    title: "Aparência (autocuidado)",
    otherLabel: "Outro achado de aparência",
    options: [
      { id: "appearance_adequate", label: "Adequada", help: "Aparência geral compatível com o contexto da avaliação.", noteText: "aparência adequada ao contexto", common: true, conflicts: ["appearance_neglected"] },
      { id: "hygiene_preserved", label: "Higiene preservada", help: "Sem sinais relevantes de prejuízo no cuidado corporal.", noteText: "higiene preservada", common: true, conflicts: ["hygiene_impaired"] },
      { id: "clothing_adequate", label: "Vestimenta adequada", help: "Vestimentas compatíveis com o contexto da avaliação.", noteText: "vestimenta adequada ao contexto", common: true, conflicts: ["clothing_flashy", "clothing_bizarre", "clothing_dark_loose"] },
      { id: "appearance_neglected", label: "Descuidada", help: "Apresentação ou autocuidado abaixo do esperado para o contexto.", noteText: "aparência descuidada", common: false, conflicts: ["appearance_adequate"] },
      { id: "hygiene_impaired", label: "Higiene prejudicada", help: "Sinais de prejuízo no cuidado corporal ou higiene.", noteText: "higiene prejudicada", common: false, conflicts: ["hygiene_preserved"] },
      { id: "clothing_flashy", label: "Vestimentas chamativas", help: "Roupas ou apresentação excessivamente chamativas para o contexto.", noteText: "vestimentas chamativas", common: false, conflicts: ["clothing_adequate"] },
      { id: "clothing_bizarre", label: "Vestimentas bizarras", help: "Apresentação estranha, incongruente ou francamente desorganizada.", noteText: "vestimentas bizarras ou incongruentes", common: false, conflicts: ["clothing_adequate"] },
      { id: "clothing_dark_loose", label: "Vestimentas muito largas ou escuras", help: "Pode ser relevante em alguns quadros, conforme contexto clínico.", noteText: "vestimentas muito largas ou escuras", common: false, conflicts: ["clothing_adequate"] }
    ]
  },
  {
    id: "attitude_contact",
    title: "Atitude e contato",
    otherLabel: "Outro achado de atitude ou contato",
    options: [
      { id: "attitude_collaborative", label: "Colaborativa", help: "Participa da entrevista de forma adequada.", noteText: "atitude colaborativa", common: true, conflicts: ["attitude_poorly_collaborative", "attitude_hostile", "attitude_evasive", "attitude_oppositional"] },
      { id: "cooperative", label: "Cooperativa", help: "Coopera com perguntas e orientações durante a avaliação.", noteText: "cooperativo à entrevista", common: true, conflicts: ["attitude_oppositional", "attitude_hostile"] },
      { id: "good_contact", label: "Bom contato", help: "Contato interpessoal adequado durante a entrevista.", noteText: "bom contato interpessoal", common: true, conflicts: ["poor_contact", "avoid_eye_contact"] },
      { id: "attitude_poorly_collaborative", label: "Pouco colaborativa", help: "Participação limitada ou resistente durante a entrevista.", noteText: "atitude pouco colaborativa", common: false, conflicts: ["attitude_collaborative"] },
      { id: "attitude_hostile", label: "Hostil", help: "Atitude agressiva, beligerante ou francamente hostil.", noteText: "atitude hostil", common: false, conflicts: ["attitude_collaborative", "cooperative"] },
      { id: "attitude_evasive", label: "Evasiva", help: "Evita respostas diretas ou tangencia temas relevantes.", noteText: "atitude evasiva", common: false, conflicts: ["attitude_collaborative"] },
      { id: "attitude_oppositional", label: "Opositora", help: "Postura de oposição ativa às perguntas ou condução.", noteText: "atitude opositora", common: false, conflicts: ["attitude_collaborative", "cooperative"] },
      { id: "poor_contact", label: "Contato pobre", help: "Contato interpessoal empobrecido ou pouco responsivo.", noteText: "contato interpessoal pobre", common: false, conflicts: ["good_contact"] },
      { id: "avoid_eye_contact", label: "Evita contato visual", help: "Evita ou sustenta pouco o contato visual.", noteText: "evita contato visual", common: false, conflicts: ["good_contact"] },
      { id: "overfamiliar_contact", label: "Contato excessivamente familiar", help: "Contato com familiaridade excessiva para o contexto.", noteText: "contato excessivamente familiar", common: false }
    ]
  },
  {
    id: "psychomotricity",
    title: "Psicomotricidade",
    otherLabel: "Outra alteração psicomotora",
    options: [
      { id: "psychomotor_normal", label: "Sem alterações", help: "Sem alterações psicomotoras evidentes à observação.", noteText: "sem alterações psicomotoras evidentes", common: true, conflicts: ["psychomotor_restless", "psychomotor_slowed", "agitation", "retardation", "mannerisms", "stereotypies", "catatonia", "tics"] },
      { id: "psychomotor_restless", label: "Inquietude", help: "Aumento discreto de atividade motora ou inquietação.", noteText: "inquietude psicomotora", common: true, conflicts: ["psychomotor_normal"] },
      { id: "psychomotor_slowed", label: "Lentificação", help: "Redução observável da atividade psicomotora.", noteText: "lentificação psicomotora", common: true, conflicts: ["psychomotor_normal"] },
      { id: "agitation", label: "Agitação psicomotora", help: "Aumento intenso da atividade motora, com dificuldade de permanecer em repouso.", noteText: "agitação psicomotora", common: false, conflicts: ["psychomotor_normal"] },
      { id: "retardation", label: "Retardo psicomotor", help: "Lentificação psicomotora global mais marcada.", noteText: "retardo psicomotor", common: false, conflicts: ["psychomotor_normal"] },
      { id: "mannerisms", label: "Maneirismos", help: "Gestos ou movimentos estilizados, repetidos ou pouco naturais.", noteText: "maneirismos presentes", common: false, conflicts: ["psychomotor_normal"] },
      { id: "stereotypies", label: "Estereotipias", help: "Movimentos repetitivos e pouco propositivos.", noteText: "estereotipias presentes", common: false, conflicts: ["psychomotor_normal"] },
      { id: "catatonia", label: "Catatonia", help: "Sinais motores compatíveis com fenômenos catatônicos.", noteText: "sinais catatônicos", common: false, conflicts: ["psychomotor_normal"] },
      { id: "tics", label: "Tiques", help: "Movimentos ou vocalizações súbitas, breves e repetitivas.", noteText: "tiques observados", common: false, conflicts: ["psychomotor_normal"] }
    ]
  },
  {
    id: "will",
    title: "Volição",
    otherLabel: "Outro achado de volição",
    options: [
      { id: "will_preserved", label: "Preservada", help: "Iniciativa e direcionamento de ação preservados.", noteText: "volição preservada", common: true, conflicts: ["will_reduced", "hypobulia", "abulia"] },
      { id: "will_reduced", label: "Reduzida", help: "Redução global da iniciativa ou energia volitiva.", noteText: "volição reduzida", common: true, conflicts: ["will_preserved", "goal_directed_increase"] },
      { id: "hypobulia", label: "Hipobulia", help: "Diminuição da vontade ou iniciativa.", noteText: "hipobulia", common: false, conflicts: ["will_preserved"] },
      { id: "abulia", label: "Abulia", help: "Redução muito acentuada ou ausência de vontade.", noteText: "abulia", common: false, conflicts: ["will_preserved"] },
      { id: "goal_directed_increase", label: "Aumento da atividade dirigida a objetivos", help: "Aumento de atividade direcionada, especialmente se excessivo ou desproporcional.", noteText: "aumento da atividade dirigida a objetivos", common: false, conflicts: ["will_reduced"] }
    ]
  },
  {
    id: "consciousness",
    title: "Consciência e vigilância",
    otherLabel: "Outro achado de consciência",
    options: [
      { id: "lucid", label: "Lúcido", help: "Nível de consciência preservado para a entrevista.", noteText: "lúcido", common: true, conflicts: ["sleepy", "clouded", "confused", "lowered_consciousness"] },
      { id: "alert", label: "Vigil", help: "Mantém vigilância adequada durante a avaliação.", noteText: "vigil", common: true, conflicts: ["sleepy", "clouded", "lowered_consciousness"] },
      { id: "sleepy", label: "Sonolento", help: "Sonolência observável durante a avaliação.", noteText: "sonolento", common: false, conflicts: ["lucid", "alert"] },
      { id: "clouded", label: "Obnubilado", help: "Clareza da consciência reduzida.", noteText: "obnubilado", common: false, conflicts: ["lucid", "alert"] },
      { id: "confused", label: "Confuso", help: "Confusão durante a entrevista ou dificuldade de apreensão do contexto.", noteText: "confuso", common: false, conflicts: ["lucid"] },
      { id: "lowered_consciousness", label: "Rebaixamento do nível de consciência", help: "Sinais de rebaixamento do nível de consciência.", noteText: "rebaixamento do nível de consciência", common: false, conflicts: ["lucid", "alert"] }
    ]
  },
  {
    id: "attention",
    title: "Atenção",
    otherLabel: "Outro achado de atenção",
    options: [
      { id: "attention_preserved", label: "Preservada", help: "Atenção sustentada e dirigida preservada no exame.", noteText: "atenção preservada", common: true, conflicts: ["hypotenacious", "distractibility", "hypervigilance", "concentration_difficulty"] },
      { id: "hypotenacious", label: "Hipotenaz", help: "Dificuldade de manter a atenção no estímulo ou tarefa.", noteText: "atenção hipotenaz", common: true, conflicts: ["attention_preserved"] },
      { id: "distractibility", label: "Distratibilidade", help: "Atenção facilmente desviada por estímulos externos ou internos.", noteText: "distratibilidade", common: false, conflicts: ["attention_preserved"] },
      { id: "hypervigilance", label: "Hipervigilância", help: "Aumento do estado de alerta ou varredura do ambiente.", noteText: "hipervigilância", common: false, conflicts: ["attention_preserved"] },
      { id: "concentration_difficulty", label: "Dificuldade de concentração", help: "Dificuldade referida ou observada de concentração.", noteText: "dificuldade de concentração", common: false, conflicts: ["attention_preserved"] }
    ]
  },
  {
    id: "orientation",
    title: "Orientação",
    otherLabel: "Outro achado de orientação",
    options: [
      { id: "oriented_global", label: "Orientado globalmente", help: "Orientação global preservada.", noteText: "orientado globalmente", common: true, conflicts: ["disoriented_time", "disoriented_space", "disoriented_person", "disoriented_situation"] },
      { id: "oriented_time_space_person", label: "Orientado em tempo, espaço e pessoa", help: "Orientação temporal, espacial e autopsíquica preservada.", noteText: "orientado em tempo, espaço e pessoa", common: true, conflicts: ["disoriented_time", "disoriented_space", "disoriented_person"] },
      { id: "disoriented_time", label: "Desorientado em tempo", help: "Prejuízo de orientação temporal.", noteText: "desorientado em tempo", common: false, conflicts: ["oriented_global", "oriented_time_space_person"] },
      { id: "disoriented_space", label: "Desorientado em espaço", help: "Prejuízo de orientação espacial.", noteText: "desorientado em espaço", common: false, conflicts: ["oriented_global", "oriented_time_space_person"] },
      { id: "disoriented_person", label: "Desorientado quanto à pessoa", help: "Prejuízo de orientação autopsíquica.", noteText: "desorientado quanto à pessoa", common: false, conflicts: ["oriented_global", "oriented_time_space_person"] },
      { id: "disoriented_situation", label: "Desorientado quanto à situação", help: "Prejuízo de orientação quanto ao contexto ou situação atual.", noteText: "desorientado quanto à situação", common: false, conflicts: ["oriented_global"] }
    ]
  },
  {
    id: "memory",
    title: "Memória",
    otherLabel: "Outro achado de memória",
    options: [
      { id: "memory_no_gross_changes", label: "Sem alterações evidentes", help: "Sem alterações grosseiras de memória evidentes na entrevista.", noteText: "memória sem alterações evidentes", common: true, conflicts: ["recent_memory_impairment", "remote_memory_impairment", "amnesia"] },
      { id: "memory_recent_remote_preserved", label: "Recente e remota preservadas", help: "Memória para fatos recentes e remotos preservada.", noteText: "memória preservada para fatos recentes e remotos", common: true, conflicts: ["recent_memory_impairment", "remote_memory_impairment", "amnesia"] },
      { id: "recent_memory_impairment", label: "Prejuízo de memória recente", help: "Dificuldade para lembrar eventos recentes.", noteText: "prejuízo de memória recente", common: false, conflicts: ["memory_no_gross_changes", "memory_recent_remote_preserved"] },
      { id: "remote_memory_impairment", label: "Prejuízo de memória remota", help: "Dificuldade para lembrar eventos remotos.", noteText: "prejuízo de memória remota", common: false, conflicts: ["memory_no_gross_changes", "memory_recent_remote_preserved"] },
      { id: "amnesia", label: "Amnésia", help: "Lacuna mnésica referida ou observada.", noteText: "amnésia referida ou observada", common: false, conflicts: ["memory_no_gross_changes", "memory_recent_remote_preserved"] }
    ]
  },
  {
    id: "language_speech",
    title: "Linguagem e fala",
    otherLabel: "Outro achado de linguagem ou fala",
    options: [
      { id: "language_no_relevant_changes", label: "Sem alterações", help: "Sem alterações relevantes de linguagem observadas.", noteText: "linguagem sem alterações relevantes", common: true, conflicts: ["mutism", "bradilalia", "taquilalia", "speech_pressure", "echolalia", "dysarthria"] },
      { id: "spontaneous_speech", label: "Fala espontânea", help: "Fala espontânea e responsiva ao contexto.", noteText: "fala espontânea", common: true, conflicts: ["mutism"] },
      { id: "speech_usual_rhythm", label: "Ritmo habitual", help: "Ritmo de fala habitual.", noteText: "ritmo de fala habitual", common: true, conflicts: ["bradilalia", "taquilalia", "speech_pressure"] },
      { id: "mutism", label: "Mutismo", help: "Ausência ou redução marcada da fala.", noteText: "mutismo", common: false, conflicts: ["language_no_relevant_changes", "spontaneous_speech"] },
      { id: "bradilalia", label: "Bradilalia", help: "Fala com ritmo lentificado.", noteText: "bradilalia", common: false, conflicts: ["language_no_relevant_changes", "speech_usual_rhythm"] },
      { id: "taquilalia", label: "Taquilalia", help: "Fala acelerada.", noteText: "taquilalia", common: false, conflicts: ["language_no_relevant_changes", "speech_usual_rhythm"] },
      { id: "speech_pressure", label: "Pressão para falar", help: "Impulso aumentado para falar, com dificuldade de interrupção.", noteText: "pressão para falar", common: false, conflicts: ["language_no_relevant_changes", "speech_usual_rhythm"] },
      { id: "echolalia", label: "Ecolalia", help: "Repetição de palavras ou frases ditas por outra pessoa.", noteText: "ecolalia", common: false, conflicts: ["language_no_relevant_changes"] },
      { id: "dysarthria", label: "Disartria", help: "Alteração articulatória da fala.", noteText: "disartria", common: false, conflicts: ["language_no_relevant_changes"] }
    ]
  },
  {
    id: "thought_form",
    title: "Pensamento - forma e curso",
    otherLabel: "Outro achado de forma ou curso do pensamento",
    options: [
      { id: "thought_organized", label: "Organizado", help: "Pensamento organizado no encadeamento das ideias.", noteText: "pensamento organizado", common: true, conflicts: ["tangentiality", "circumstantiality", "loose_associations", "thought_block", "thought_disorganized"] },
      { id: "thought_course_preserved", label: "Curso preservado", help: "Curso do pensamento sem aceleração ou lentificação relevante.", noteText: "curso do pensamento preservado", common: true, conflicts: ["thought_accelerated", "thought_slowed", "flight_of_ideas", "thought_block"] },
      { id: "thought_accelerated", label: "Curso acelerado", help: "Aumento da velocidade do fluxo do pensamento.", noteText: "curso do pensamento acelerado", common: false, conflicts: ["thought_course_preserved"] },
      { id: "thought_slowed", label: "Curso lentificado", help: "Redução da velocidade do fluxo do pensamento.", noteText: "curso do pensamento lentificado", common: false, conflicts: ["thought_course_preserved"] },
      { id: "flight_of_ideas", label: "Fuga de ideias", help: "Passagem rápida entre ideias com associações superficiais.", noteText: "fuga de ideias", common: false, conflicts: ["thought_course_preserved"] },
      { id: "tangentiality", label: "Tangencialidade", help: "Respostas tangenciais, sem retorno claro ao ponto central.", noteText: "tangencialidade", common: false, conflicts: ["thought_organized"] },
      { id: "circumstantiality", label: "Circunstancialidade", help: "Excesso de detalhes antes de chegar ao ponto principal.", noteText: "circunstancialidade", common: false, conflicts: ["thought_organized"] },
      { id: "loose_associations", label: "Afrouxamento de associações", help: "Conexões pouco lógicas entre ideias.", noteText: "afrouxamento de associações", common: false, conflicts: ["thought_organized"] },
      { id: "thought_block", label: "Bloqueio do pensamento", help: "Interrupções súbitas do fluxo do pensamento.", noteText: "bloqueio do pensamento", common: false, conflicts: ["thought_organized", "thought_course_preserved"] },
      { id: "thought_disorganized", label: "Desorganização do pensamento", help: "Organização formal do pensamento prejudicada.", noteText: "desorganização do pensamento", common: false, conflicts: ["thought_organized"] }
    ]
  },
  {
    id: "thought_content",
    title: "Pensamento - conteúdo",
    otherLabel: "Outro conteúdo do pensamento",
    options: [
      { id: "no_delusions", label: "Sem delírios evidentes", help: "Sem conteúdo delirante evidente na entrevista.", noteText: "sem delírios evidentes", common: true, conflicts: ["persecutory_delusions", "grandiose_delusions", "reference_delusions"] },
      { id: "anxious_content", label: "Conteúdo ansioso", help: "Conteúdo do pensamento marcado por preocupações ou ansiedade.", noteText: "conteúdo ansioso", common: true },
      { id: "guilt_ideas", label: "Ideias de culpa", help: "Conteúdo de culpa excessiva ou persistente.", noteText: "ideias de culpa", common: false },
      { id: "ruin_ideas", label: "Ideias de ruína", help: "Conteúdo de ruína financeira, existencial ou catastrófica.", noteText: "ideias de ruína", common: false },
      { id: "low_self_worth_ideas", label: "Ideias de menos-valia", help: "Conteúdo de desvalor ou incapacidade.", noteText: "ideias de menos-valia", common: false },
      { id: "persecutory_delusions", label: "Delírios persecutórios", help: "Crenças delirantes de perseguição.", noteText: "delírios persecutórios", common: false, conflicts: ["no_delusions"] },
      { id: "grandiose_delusions", label: "Delírios de grandeza", help: "Crenças delirantes de poder, capacidade ou importância aumentados.", noteText: "delírios de grandeza", common: false, conflicts: ["no_delusions"] },
      { id: "reference_delusions", label: "Delírios de referência", help: "Crenças delirantes de referência pessoal em eventos externos.", noteText: "delírios de referência", common: false, conflicts: ["no_delusions"] },
      { id: "obsessive_ideation", label: "Ideação obsessiva", help: "Pensamentos intrusivos, repetitivos e de difícil controle.", noteText: "ideação obsessiva", common: false },
      { id: "excessive_worries", label: "Preocupações excessivas", help: "Preocupações persistentes ou desproporcionais.", noteText: "preocupações excessivas", common: false }
    ]
  },
  {
    id: "mood",
    title: "Humor",
    otherLabel: "Outro achado de humor",
    options: [
      { id: "mood_euthymic", label: "Eutímico", help: "Humor dentro de faixa habitual, sem polarização evidente.", noteText: "humor eutímico", common: true, conflicts: ["mood_anxious", "mood_depressed", "mood_irritable", "mood_euphoric", "mood_dysphoric", "mood_apathetic", "mood_labile"] },
      { id: "mood_anxious", label: "Ansioso", help: "Humor predominantemente ansioso.", noteText: "humor ansioso", common: true, conflicts: ["mood_euthymic"] },
      { id: "mood_depressed", label: "Deprimido", help: "Humor predominantemente deprimido.", noteText: "humor deprimido", common: true, conflicts: ["mood_euthymic"] },
      { id: "mood_irritable", label: "Irritável", help: "Humor irritável ou com baixa tolerância a frustração.", noteText: "humor irritável", common: false, conflicts: ["mood_euthymic"] },
      { id: "mood_euphoric", label: "Eufórico", help: "Humor expansivo ou eufórico.", noteText: "humor eufórico", common: false, conflicts: ["mood_euthymic"] },
      { id: "mood_dysphoric", label: "Disfórico", help: "Humor disfórico, com mal-estar afetivo predominante.", noteText: "humor disfórico", common: false, conflicts: ["mood_euthymic"] },
      { id: "mood_apathetic", label: "Apático", help: "Redução subjetiva ou observada da reatividade emocional.", noteText: "humor apático", common: false, conflicts: ["mood_euthymic"] },
      { id: "mood_labile", label: "Lábil", help: "Oscilações rápidas ou instáveis do humor.", noteText: "humor lábil", common: false, conflicts: ["mood_euthymic"] }
    ]
  },
  {
    id: "affect",
    title: "Afeto",
    otherLabel: "Outro achado de afeto",
    options: [
      { id: "affect_congruent", label: "Congruente", help: "Afeto congruente com o conteúdo relatado.", noteText: "afeto congruente", common: true, conflicts: ["affect_incongruent"] },
      { id: "affect_modulated", label: "Modulado", help: "Amplitude e variação afetiva preservadas.", noteText: "afeto modulado", common: true, conflicts: ["affect_blunted", "affect_restricted", "affect_hypermodulated"] },
      { id: "affect_blunted", label: "Embotado", help: "Redução importante da expressão afetiva.", noteText: "afeto embotado", common: false, conflicts: ["affect_modulated"] },
      { id: "affect_restricted", label: "Restrito", help: "Amplitude afetiva reduzida.", noteText: "afeto restrito", common: false, conflicts: ["affect_modulated"] },
      { id: "affect_incongruent", label: "Incongruente", help: "Afeto incongruente com conteúdo ou contexto.", noteText: "afeto incongruente", common: false, conflicts: ["affect_congruent"] },
      { id: "affect_labile", label: "Lábil", help: "Oscilações rápidas da expressão afetiva.", noteText: "afeto lábil", common: false },
      { id: "affect_hypermodulated", label: "Hipermodulado", help: "Expressão afetiva excessiva ou muito intensa.", noteText: "afeto hipermodulado", common: false, conflicts: ["affect_modulated"] }
    ]
  },
  {
    id: "perception",
    title: "Sensopercepção",
    otherLabel: "Outra alteração sensoperceptiva",
    options: [
      { id: "perception_no_referred_changes", label: "Sem alterações referidas", help: "Paciente não refere alterações sensoperceptivas.", noteText: "sem alterações sensoperceptivas referidas", common: true, conflicts: ["auditory_hallucinations", "visual_hallucinations", "tactile_hallucinations", "illusions", "depersonalization", "derealization"] },
      { id: "perception_no_observed_changes", label: "Sem alterações observadas", help: "Não há alterações sensoperceptivas observadas durante a avaliação.", noteText: "sem alterações sensoperceptivas observadas", common: true, conflicts: ["auditory_hallucinations", "visual_hallucinations", "tactile_hallucinations", "illusions"] },
      { id: "auditory_hallucinations", label: "Alucinações auditivas", help: "Percepções auditivas sem estímulo externo correspondente.", noteText: "alucinações auditivas", common: false, conflicts: ["perception_no_referred_changes", "perception_no_observed_changes"] },
      { id: "visual_hallucinations", label: "Alucinações visuais", help: "Percepções visuais sem estímulo externo correspondente.", noteText: "alucinações visuais", common: false, conflicts: ["perception_no_referred_changes", "perception_no_observed_changes"] },
      { id: "tactile_hallucinations", label: "Alucinações táteis", help: "Percepções táteis sem estímulo externo correspondente.", noteText: "alucinações táteis", common: false, conflicts: ["perception_no_referred_changes", "perception_no_observed_changes"] },
      { id: "illusions", label: "Ilusões", help: "Interpretações distorcidas de estímulos reais.", noteText: "ilusões", common: false, conflicts: ["perception_no_referred_changes", "perception_no_observed_changes"] },
      { id: "depersonalization", label: "Despersonalização", help: "Sensação de estranhamento de si mesmo.", noteText: "despersonalização", common: false, conflicts: ["perception_no_referred_changes"] },
      { id: "derealization", label: "Desrealização", help: "Sensação de estranhamento do ambiente ou da realidade.", noteText: "desrealização", common: false, conflicts: ["perception_no_referred_changes"] }
    ]
  },
  {
    id: "judgment",
    title: "Juízo crítico",
    otherLabel: "Outro achado de juízo crítico",
    options: [
      { id: "judgment_preserved", label: "Preservado", help: "Capacidade crítica preservada para a situação avaliada.", noteText: "juízo crítico preservado", common: true, conflicts: ["judgment_partially_preserved", "judgment_impaired", "judgment_current_compromised"] },
      { id: "judgment_partially_preserved", label: "Parcialmente preservado", help: "Capacidade crítica parcialmente preservada.", noteText: "juízo crítico parcialmente preservado", common: true, conflicts: ["judgment_preserved", "judgment_impaired"] },
      { id: "judgment_impaired", label: "Prejudicado", help: "Juízo crítico prejudicado.", noteText: "juízo crítico prejudicado", common: false, conflicts: ["judgment_preserved", "judgment_partially_preserved"] },
      { id: "judgment_current_compromised", label: "Comprometido para a situação atual", help: "Juízo crítico comprometido para decisões ou riscos atuais.", noteText: "juízo crítico comprometido para a situação atual", common: false, conflicts: ["judgment_preserved"] }
    ]
  },
  {
    id: "insight",
    title: "Insight",
    otherLabel: "Outro achado de insight",
    options: [
      { id: "insight_preserved", label: "Preservado", help: "Reconhecimento adequado de sintomas, contexto ou necessidade de cuidado.", noteText: "insight preservado", common: true, conflicts: ["insight_partial", "insight_absent", "insight_impaired"] },
      { id: "insight_partial", label: "Parcial", help: "Insight parcial sobre sintomas, contexto ou necessidade de cuidado.", noteText: "insight parcial", common: true, conflicts: ["insight_preserved", "insight_absent"] },
      { id: "insight_absent", label: "Ausente", help: "Ausência de reconhecimento do problema ou situação clínica.", noteText: "insight ausente", common: false, conflicts: ["insight_preserved", "insight_partial"] },
      { id: "insight_impaired", label: "Prejudicado", help: "Insight prejudicado.", noteText: "insight prejudicado", common: false, conflicts: ["insight_preserved"] }
    ]
  },
  {
    id: "risk",
    title: "Risco",
    otherLabel: "Outro achado de risco",
    options: [
      { id: "denies_suicidal", label: "Nega ideação suicida", help: "Nega ideação suicida no momento da avaliação.", noteText: "nega ideação suicida no momento", common: true, conflicts: ["passive_suicidal_ideation", "active_suicidal_ideation", "suicidal_plan", "suicidal_intent"] },
      { id: "denies_homicidal", label: "Nega ideação homicida", help: "Nega ideação homicida no momento da avaliação.", noteText: "nega ideação homicida no momento", common: true, conflicts: ["homicidal_ideation", "risk_to_others"] },
      { id: "passive_suicidal_ideation", label: "Ideação suicida passiva", help: "Ideias passivas de morte ou de não querer viver.", noteText: "ideação suicida passiva", common: false, conflicts: ["denies_suicidal"] },
      { id: "active_suicidal_ideation", label: "Ideação suicida ativa", help: "Ideação suicida ativa referida no momento.", noteText: "ideação suicida ativa", common: false, conflicts: ["denies_suicidal"] },
      { id: "suicidal_plan", label: "Plano suicida", help: "Plano suicida referido.", noteText: "plano suicida referido", common: false, conflicts: ["denies_suicidal"] },
      { id: "suicidal_intent", label: "Intenção suicida", help: "Intenção suicida referida.", noteText: "intenção suicida referida", common: false, conflicts: ["denies_suicidal"] },
      { id: "self_harm", label: "Autoagressão", help: "Autoagressão referida ou observada.", noteText: "autoagressão referida ou observada", common: false },
      { id: "homicidal_ideation", label: "Ideação homicida", help: "Ideação homicida referida.", noteText: "ideação homicida", common: false, conflicts: ["denies_homicidal"] },
      { id: "risk_to_others", label: "Risco a terceiros", help: "Risco atual ou potencial de dano a terceiros.", noteText: "risco a terceiros", common: false, conflicts: ["denies_homicidal"] }
    ]
  }
];

const eemForm = document.querySelector("#eem-form");
const eemDate = document.querySelector("#eem-date");
const eemSectionsArea = document.querySelector("#eem-sections");
const eemClearButton = document.querySelector("#eem-clear-button");
const eemNormalButton = document.querySelector("#eem-normal-button");
const eemExpandButton = document.querySelector("#eem-expand-button");
const eemCollapseButton = document.querySelector("#eem-collapse-button");
const eemFilterButton = document.querySelector("#eem-filter-button");
const eemResultArea = document.querySelector("#eem-result-area");
const eemSummaryOutput = document.querySelector("#eem-summary-output");
const eemCopyFeedback = document.querySelector("#eem-copy-feedback");

const eemOptionIndex = buildOptionIndex();

let eemState = createEemState();

function buildOptionIndex() {
  const index = {};
  eemDomains.forEach((domain) => {
    domain.options.forEach((option) => {
      index[option.id] = { domain: domain, option: option };
    });
  });
  return index;
}

function createEemState() {
  const expanded = {};
  const others = {};
  eemDomains.forEach((domain) => {
    expanded[domain.id] = false;
    others[domain.id] = "";
  });

  return {
    date: getTodayInputValue(),
    selected: new Set(),
    expanded: expanded,
    others: others,
    showChangedOnly: false,
    resultVisible: false
  };
}

function getTodayInputValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function makeElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  return element;
}

function renderEemPage() {
  eemDate.value = eemState.date;
  eemFilterButton.textContent = eemState.showChangedOnly ? "Mostrar todos" : "Mostrar apenas alterados";
  eemSectionsArea.innerHTML = "";

  const visibleDomains = eemDomains.filter((domain) => !eemState.showChangedOnly || domainHasAltered(domain));
  if (!visibleDomains.length) {
    eemSectionsArea.appendChild(makeElement("p", "eem-empty-state", "Nenhum domínio alterado."));
    return;
  }

  visibleDomains.forEach((domain) => {
    eemSectionsArea.appendChild(renderEemDomain(domain));
  });
}

function renderEemDomain(domain) {
  const card = makeElement("article", "eem-domain-card");
  card.dataset.eemDomain = domain.id;

  const header = makeElement("div", "eem-domain-header");
  header.appendChild(makeElement("h2", "", domain.title));

  const toggle = makeElement(
    "button",
    "eem-specific-toggle secondary",
    eemState.expanded[domain.id] ? "− específicas" : "+ específicas"
  );
  toggle.type = "button";
  toggle.dataset.eemToggleDomain = domain.id;
  toggle.setAttribute("aria-expanded", String(eemState.expanded[domain.id]));
  header.appendChild(toggle);
  card.appendChild(header);

  const chipRow = makeElement("div", "eem-chip-row");
  getVisibleOptions(domain).forEach((option) => {
    chipRow.appendChild(renderOption(domain, option, false));
  });
  card.appendChild(chipRow);

  if (eemState.expanded[domain.id]) {
    card.appendChild(renderSpecificPanel(domain));
  }

  return card;
}

function getVisibleOptions(domain) {
  const options = [];
  domain.options.forEach((option) => {
    if (option.common || (!eemState.expanded[domain.id] && !option.common && eemState.selected.has(option.id))) {
      options.push(option);
    }
  });
  return options;
}

function renderSpecificPanel(domain) {
  const panel = makeElement("div", "eem-specific-panel");
  const specificOptions = domain.options.filter((option) => !option.common);

  if (specificOptions.length) {
    const optionGrid = makeElement("div", "eem-specific-grid");
    specificOptions.forEach((option) => {
      optionGrid.appendChild(renderOption(domain, option, true));
    });
    panel.appendChild(optionGrid);
  }

  const otherLabel = makeElement("label", "field-label eem-other");
  otherLabel.setAttribute("for", `eem-other-${domain.id}`);
  otherLabel.textContent = domain.otherLabel || "Outro";
  const otherInput = document.createElement("input");
  otherInput.id = `eem-other-${domain.id}`;
  otherInput.type = "text";
  otherInput.placeholder = "Descrever achado livre";
  otherInput.value = eemState.others[domain.id] || "";
  otherInput.dataset.eemOtherDomain = domain.id;
  otherLabel.appendChild(otherInput);
  panel.appendChild(otherLabel);

  return panel;
}

function renderOption(domain, option, showHelp) {
  const label = makeElement("label", `eem-option eem-chip${eemState.selected.has(option.id) ? " selected" : ""}`);
  label.setAttribute("for", `eem-${domain.id}-${option.id}`);

  const input = document.createElement("input");
  input.id = `eem-${domain.id}-${option.id}`;
  input.type = "checkbox";
  input.checked = eemState.selected.has(option.id);
  input.dataset.eemOptionId = option.id;
  input.dataset.eemDomain = domain.id;
  input.dataset.eemSpecific = String(!option.common);
  label.appendChild(input);

  const body = makeElement("span", "eem-option-body");
  body.appendChild(makeElement("span", "eem-option-label", option.label));
  if (showHelp) {
    body.appendChild(makeElement("span", "eem-option-help", option.help));
  }
  label.appendChild(body);

  return label;
}

function updateEemState(event) {
  const target = event.target;

  if (target.dataset.eemField === "date") {
    eemState.date = target.value;
    return;
  }

  if (target.dataset.eemOtherDomain) {
    eemState.others[target.dataset.eemOtherDomain] = target.value;
    refreshResultIfVisible();
    return;
  }

  if (!target.dataset.eemOptionId) {
    return;
  }

  const optionId = target.dataset.eemOptionId;
  if (target.checked) {
    selectOption(optionId);
    if (target.dataset.eemSpecific === "true") {
      eemState.expanded[target.dataset.eemDomain] = false;
    }
  } else {
    eemState.selected.delete(optionId);
  }

  renderEemPage();
  refreshResultIfVisible();
}

function selectOption(optionId) {
  const entry = eemOptionIndex[optionId];
  if (!entry) {
    return;
  }

  eemState.selected.add(optionId);
  const conflicts = entry.option.conflicts || [];
  conflicts.forEach((conflictId) => eemState.selected.delete(conflictId));

  Object.keys(eemOptionIndex).forEach((candidateId) => {
    const candidateConflicts = eemOptionIndex[candidateId].option.conflicts || [];
    if (candidateConflicts.indexOf(optionId) !== -1 && candidateId !== optionId) {
      eemState.selected.delete(candidateId);
    }
  });
}

function domainHasAltered(domain) {
  const otherText = (eemState.others[domain.id] || "").trim();
  if (otherText) {
    return true;
  }

  return domain.options.some((option) => eemState.selected.has(option.id) && normalPresetIds.indexOf(option.id) === -1);
}

function markNormalEem() {
  eemState.selected = new Set(normalPresetIds);
  eemDomains.forEach((domain) => {
    eemState.expanded[domain.id] = false;
    eemState.others[domain.id] = "";
  });
  eemState.showChangedOnly = false;
  renderEemPage();
  generateEemOutputs();
}

function clearEemState() {
  eemState = createEemState();
  eemResultArea.classList.add("hidden");
  eemSummaryOutput.textContent = "";
  eemCopyFeedback.textContent = "";
  renderEemPage();
}

function setAllSpecificPanels(expanded) {
  eemDomains.forEach((domain) => {
    eemState.expanded[domain.id] = expanded;
  });
  renderEemPage();
}

function toggleChangedOnly() {
  eemState.showChangedOnly = !eemState.showChangedOnly;
  renderEemPage();
}

function getDomainNoteTexts(domain) {
  const items = [];
  domain.options.forEach((option) => {
    if (eemState.selected.has(option.id)) {
      items.push(option.noteText);
    }
  });

  const otherText = (eemState.others[domain.id] || "").trim();
  if (otherText) {
    items.push(`${domainTitleForNote(domain)}: ${otherText}`);
  }

  return items;
}

function domainTitleForNote(domain) {
  return domain.title.replace(/\s*\(.+\)\s*/g, "").toLowerCase();
}

function joinNatural(items) {
  if (!items.length) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} e ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

function compactNormalPhrases(items) {
  const set = new Set(items);

  if (set.has("sem alterações sensoperceptivas referidas") && set.has("sem alterações sensoperceptivas observadas")) {
    items = items.filter((item) => item !== "sem alterações sensoperceptivas referidas" && item !== "sem alterações sensoperceptivas observadas");
    items.push("sem alterações sensoperceptivas referidas ou observadas");
  }

  if (set.has("juízo crítico preservado") && set.has("insight preservado")) {
    items = items.filter((item) => item !== "juízo crítico preservado" && item !== "insight preservado");
    items.push("juízo crítico e insight preservados");
  }

  if (set.has("nega ideação suicida no momento") && set.has("nega ideação homicida no momento")) {
    items = items.filter((item) => item !== "nega ideação suicida no momento" && item !== "nega ideação homicida no momento");
    items.push("nega ideação suicida ou homicida no momento");
  }

  return items;
}

function generateEemSummary() {
  const sentences = [];

  eemDomains.forEach((domain) => {
    let items = getDomainNoteTexts(domain);
    if (!items.length) {
      return;
    }

    items = compactNormalPhrases(items);
    sentences.push(`${capitalize(joinNatural(items))}.`);
  });

  if (!sentences.length) {
    return "Nenhum item do EEM selecionado.";
  }

  return `EEM: ${sentences.join(" ")}`;
}

function generateEemOutputs() {
  eemSummaryOutput.textContent = generateEemSummary();
  eemResultArea.classList.remove("hidden");
  eemCopyFeedback.textContent = "";
  eemState.resultVisible = true;
}

function refreshResultIfVisible() {
  if (eemState.resultVisible && !eemResultArea.classList.contains("hidden")) {
    eemSummaryOutput.textContent = generateEemSummary();
    eemCopyFeedback.textContent = "";
  }
}

async function copyTextToClipboard(text) {
  if (!text) {
    return false;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

function initEemPage() {
  if (!eemForm || !eemSectionsArea) {
    return;
  }

  renderEemPage();

  eemForm.addEventListener("change", updateEemState);
  eemForm.addEventListener("input", updateEemState);
  eemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    generateEemOutputs();
  });

  eemClearButton.addEventListener("click", clearEemState);
  eemNormalButton.addEventListener("click", markNormalEem);
  eemExpandButton.addEventListener("click", () => setAllSpecificPanels(true));
  eemCollapseButton.addEventListener("click", () => setAllSpecificPanels(false));
  eemFilterButton.addEventListener("click", toggleChangedOnly);

  eemSectionsArea.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-eem-toggle-domain]");
    if (!toggle) {
      return;
    }
    const domainId = toggle.dataset.eemToggleDomain;
    eemState.expanded[domainId] = !eemState.expanded[domainId];
    renderEemPage();
  });

  eemResultArea.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-output-type]");
    if (!button) {
      return;
    }

    try {
      await copyTextToClipboard(eemSummaryOutput.textContent);
      eemCopyFeedback.textContent = "Copiado.";
      window.setTimeout(() => {
        eemCopyFeedback.textContent = "";
      }, 2500);
    } catch (error) {
      eemCopyFeedback.textContent = "Não foi possível copiar automaticamente. Selecione e copie o texto manualmente.";
    }
  });
}

initEemPage();
