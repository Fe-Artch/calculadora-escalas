"use strict";

const wursOptions = [
  { value: 0, label: "0 - Nada ou muito pouco", detail: "Not at all or very slightly" },
  { value: 1, label: "1 - Levemente", detail: "Mildly" },
  { value: 2, label: "2 - Moderadamente", detail: "Moderately" },
  { value: 3, label: "3 - Bastante", detail: "Quite a bit" },
  { value: 4, label: "4 - Muito", detail: "Very much" }
];

const asrsOptions = [
  { value: 0, label: "0 - Nunca", detail: "Never" },
  { value: 1, label: "1 - Raramente", detail: "Rarely" },
  { value: 2, label: "2 - Às vezes", detail: "Sometimes" },
  { value: 3, label: "3 - Frequentemente", detail: "Often" },
  { value: 4, label: "4 - Muito frequentemente", detail: "Very often" }
];

const snapOptions = [
  { value: 0, label: "0 - Nem um pouco" },
  { value: 1, label: "1 - Só um pouco" },
  { value: 2, label: "2 - Bastante" },
  { value: 3, label: "3 - Demais" }
];

const phq9Options = [
  { value: 0, label: "0 - Nenhuma vez", detail: "Not at all" },
  { value: 1, label: "1 - Vários dias", detail: "Several days" },
  { value: 2, label: "2 - Mais da metade dos dias", detail: "More than half the days" },
  { value: 3, label: "3 - Quase todos os dias", detail: "Nearly every day" }
];

const phq9ImpactOptions = [
  { value: 0, label: "0 - Não dificultou", detail: "Not difficult at all" },
  { value: 1, label: "1 - Dificultou um pouco", detail: "Somewhat difficult" },
  { value: 2, label: "2 - Dificultou muito", detail: "Very difficult" },
  { value: 3, label: "3 - Dificultou extremamente", detail: "Extremely difficult" }
];

const baiOptions = [
  { value: 0, label: "0 - Absolutamente não" },
  { value: 1, label: "1 - Levemente", detail: "Não me incomodou muito" },
  { value: 2, label: "2 - Moderadamente", detail: "Foi muito desagradável mas pude suportar" },
  { value: 3, label: "3 - Gravemente", detail: "Dificilmente pude suportar" }
];

const bdiOptions = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" }
];

const cgiSchOptions = [
  { value: 1, label: "1 - Normal/Ausente", detail: "Normal / ausente" },
  { value: 2, label: "2 - Limítrofe", detail: "Limítrofe" },
  { value: 3, label: "3 - Leve", detail: "Leve" },
  { value: 4, label: "4 - Moderado", detail: "Moderado" },
  { value: 5, label: "5 - Marcado", detail: "Marcado" },
  { value: 6, label: "6 - Grave", detail: "Grave" },
  { value: 7, label: "7 - Extremo", detail: "Entre os mais graves / extremamente grave" }
];

const panssOptions = [
  { value: 1, label: "1 Ausente", detail: "Ausente" },
  { value: 2, label: "2 Mínimo", detail: "Mínimo" },
  { value: 3, label: "3 Leve", detail: "Leve" },
  { value: 4, label: "4 Moderado", detail: "Moderado" },
  { value: 5, label: "5 Mod. grave", detail: "Moderadamente grave" },
  { value: 6, label: "6 Grave", detail: "Grave" },
  { value: 7, label: "7 Extremo", detail: "Extremo" }
];

function createBdiOptions(labels) {
  return labels.map((label, value) => ({ value, label: `${value} - ${label}` }));
}

const wursQuestions = [
  { pt: "Ativo, inquieto, sempre em movimento.", en: "Active, restless, always on the go" },
  { pt: "Medo de coisas.", en: "Afraid of things" },
  { pt: "Problemas de concentração, distrai-se facilmente.", en: "Concentration problems, easily distracted", adhdSubscore: true },
  { pt: "Ansioso, preocupado.", en: "Anxious, worrying", adhdSubscore: true },
  { pt: "Nervoso, agitado.", en: "Nervous, fidgety", adhdSubscore: true },
  { pt: "Desatento, sonhando acordado.", en: "Inattentive, daydreaming", adhdSubscore: true },
  { pt: "Irascível, pavio curto.", en: "Hot- or short-tempered, low boiling point", adhdSubscore: true },
  { pt: "Tímido, sensível.", en: "Shy, sensitive" },
  { pt: "Explosões de temperamento, acessos de raiva.", en: "Temper outbursts, tantrums", adhdSubscore: true },
  { pt: "Dificuldade em persistir, falha em terminar as coisas começadas.", en: "Trouble with stick-to-it-tiveness, failing to finish things started", adhdSubscore: true },
  { pt: "Teimoso, determinado.", en: "Stubborn, strong-willed", adhdSubscore: true },
  { pt: "Triste, deprimido ou infeliz.", en: "Sad or blue, depressed, unhappy", adhdSubscore: true },
  { pt: "Incauto, audacioso, envolvido em travessuras.", en: "Incautious, dare-devilish, involved in pranks" },
  { pt: "Não sente prazer nas coisas, insatisfeito com a vida.", en: "Not getting a kick out of things, dissatisfied with life" },
  { pt: "Desobediente com os pais, rebelde, respondão.", en: "Disobedient with parents, rebellious, sassy", adhdSubscore: true },
  { pt: "Baixa opinião de si mesmo.", en: "Low opinion of myself", adhdSubscore: true },
  { pt: "Irritável.", en: "Irritable", adhdSubscore: true },
  { pt: "Extrovertido, amigável, gostava da companhia de pessoas.", en: "Outgoing, friendly" },
  { pt: "Desleixado, desorganizado.", en: "Sloppy, disorganized" },
  { pt: "Instável, altos e baixos.", en: "Moody, ups and downs", adhdSubscore: true },
  { pt: "Zangado.", en: "Angry", adhdSubscore: true },
  { pt: "Amigos, popular.", en: "Friends, popular" },
  { pt: "Bem organizado, arrumado, limpo.", en: "Well-organized, tidy, neat" },
  { pt: "Age sem pensar, impulsivo.", en: "Acting without thinking, impulsive", adhdSubscore: true },
  { pt: "Tendência a ser imaturo.", en: "Tendency to be immature", adhdSubscore: true },
  { pt: "Sentimentos de culpa, arrependido.", en: "Guilty feelings, regretful", adhdSubscore: true },
  { pt: "Perder o controle de si mesmo.", en: "Losing control of myself", adhdSubscore: true },
  { pt: "Tendência a agir de forma irracional.", en: "Tendency to be or act irrational", adhdSubscore: true },
  { pt: "Impopular com outras crianças, não mantinha amizades.", en: "Unpopular with other children, didn't keep friends", adhdSubscore: true },
  { pt: "Mal coordenado, não participava de esportes.", en: "Poorly coordinated" },
  { pt: "Medo de perder o controle de si mesmo.", en: "Afraid of losing control of self" },
  { pt: "Bem coordenado, escolhido primeiro em jogos.", en: "Well-coordinated" },
  { pt: "Maria-rapaz (apenas para mulheres).", en: "Tomboyish - for women only" },
  { pt: "Fugir de casa.", en: "Running away from home" },
  { pt: "Meter-se em brigas.", en: "Getting into fights" },
  { pt: "Provocar outras crianças.", en: "Teasing other children" },
  { pt: "Líder, mandão.", en: "Leader, bossy" },
  { pt: "Dificuldade em acordar.", en: "Difficulty getting awake" },
  { pt: "Seguidor, deixava-se levar demais.", en: "Follower, led around too much" },
  { pt: "Dificuldade em ver o ponto de vista alheio.", en: "Trouble seeing things from someone else's point of view", adhdSubscore: true },
  { pt: "Problemas com autoridades, problemas na escola, visitas à diretoria.", en: "Trouble with authorities, school, visits to principal's office", adhdSubscore: true },
  { pt: "Problemas com a polícia.", en: "Trouble with police" },
  { pt: "Dores de cabeça.", en: "Headaches" },
  { pt: "Dores de estômago.", en: "Stomachaches" },
  { pt: "Prisão de ventre.", en: "Constipation" },
  { pt: "Diarreia.", en: "Diarrhea" },
  { pt: "Alergias alimentares.", en: "Food allergies" },
  { pt: "Outras alergias.", en: "Other allergies" },
  { pt: "Xixi na cama.", en: "Bedwetting" },
  { pt: "No geral, um bom aluno, rápido.", en: "Overall a good student, fast" },
  { pt: "No geral, um mau aluno, aprendizado lento.", en: "Overall a poor student, slow learner", adhdSubscore: true },
  { pt: "Lento para aprender a ler.", en: "Slow in learning to read" },
  { pt: "Leitor lento.", en: "Slow reader" },
  { pt: "Dificuldade em inverter letras.", en: "Trouble reversing letters" },
  { pt: "Problemas com ortografia.", en: "Problems with spelling" },
  { pt: "Problemas com matemática ou números.", en: "Trouble with mathematics or numbers", adhdSubscore: true },
  { pt: "Letra ruim.", en: "Bad handwriting" },
  { pt: "Capaz de ler bem, mas nunca gostou de ler.", en: "Able to read well but never enjoyed reading" },
  { pt: "Não atingia o seu potencial.", en: "Not achieving up to potential", adhdSubscore: true },
  { pt: "Repetir séries.", en: "Repeating grades" },
  { pt: "Suspenso ou expulso.", en: "Suspended or expelled" }
];

const wurs25Questions = [
  {
    factor: "inattentionSchool",
    en: "Concentration problems, easily distracted",
    pt: "Problemas de concentração, distrai-se facilmente."
  },
  {
    factor: "selfEsteemMood",
    en: "Anxious, worrying",
    pt: "Ansioso, preocupado."
  },
  {
    factor: "selfEsteemMood",
    en: "Nervous, fidgety",
    pt: "Nervoso, inquieto."
  },
  {
    factor: "inattentionSchool",
    en: "Inattentive, daydreaming",
    pt: "Desatento, sonhando acordado."
  },
  {
    factor: "impulsivityBehavior",
    en: "Hot- or short-tempered",
    pt: "Irascível, pavio curto."
  },
  {
    factor: "impulsivityBehavior",
    en: "Temper outbursts, tantrums",
    pt: "Explosões de temperamento, acessos de raiva."
  },
  {
    factor: "inattentionSchool",
    en: "Trouble with stick-to-it-tiveness, failing to finish things",
    pt: "Dificuldade em persistir nas tarefas."
  },
  {
    factor: "impulsivityBehavior",
    en: "Stubborn, strong-willed",
    pt: "Teimoso, determinado."
  },
  {
    factor: "selfEsteemMood",
    en: "Sad or blue, depressed, unhappy",
    pt: "Triste, deprimido ou infeliz."
  },
  {
    factor: "impulsivityBehavior",
    en: "Disobedient with parents, rebellious, sassy",
    pt: "Desobediente com os pais, rebelde."
  },
  {
    factor: "selfEsteemMood",
    en: "Low opinion of myself",
    pt: "Baixa opinião sobre si mesmo."
  },
  {
    factor: "impulsivityBehavior",
    en: "Irritable",
    pt: "Irritável."
  },
  {
    factor: "impulsivityBehavior",
    en: "Moody, ups and downs",
    pt: "Instável emocionalmente, altos e baixos."
  },
  {
    factor: "impulsivityBehavior",
    en: "Angry",
    pt: "Zangado."
  },
  {
    factor: "impulsivityBehavior",
    en: "Acting without thinking, impulsive",
    pt: "Agia sem pensar, impulsivo."
  },
  {
    factor: "inattentionSchool",
    en: "Tendency to be immature",
    pt: "Tendência a ser imaturo."
  },
  {
    factor: "selfEsteemMood",
    en: "Guilty feelings, regretful",
    pt: "Sentimentos de culpa, arrependimento."
  },
  {
    factor: "impulsivityBehavior",
    en: "Losing control of myself",
    pt: "Perder o controle de si mesmo."
  },
  {
    factor: "impulsivityBehavior",
    en: "Tendency to be or act irrational",
    pt: "Tendência a agir de forma irracional."
  },
  {
    factor: "impulsivityBehavior",
    en: "Unpopular with other children",
    pt: "Impopular com outras crianças."
  },
  {
    factor: "impulsivityBehavior",
    en: "Trouble seeing things from someone else's point of view",
    pt: "Dificuldade em ver o ponto de vista alheio."
  },
  {
    factor: "impulsivityBehavior",
    en: "Trouble with authorities, school, principal's office",
    pt: "Problemas com autoridades ou na escola."
  },
  {
    factor: "inattentionSchool",
    en: "Overall a poor student, slow learner",
    pt: "No geral, um mau aluno, aprendizado lento."
  },
  {
    factor: "inattentionSchool",
    en: "Trouble with mathematics or numbers",
    pt: "Problemas com matemática ou números."
  },
  {
    factor: "inattentionSchool",
    en: "Not achieving up to potential",
    pt: "Não atingia o seu potencial."
  }
];

const asrsQuestions = [
  {
    factor: "inattention",
    pt: "Com que frequência você comete erros por falta de atenção quando tem de trabalhar num projeto chato ou difícil?",
    en: "How often do you make careless mistakes when you have to work on a boring or difficult project?"
  },
  {
    factor: "inattention",
    pt: "Com que frequência você tem dificuldade para manter a atenção quando está fazendo algo chato ou repetitivo?",
    en: "How often do you have difficulty keeping your attention when you are doing boring or repetitive work?"
  },
  {
    factor: "inattention",
    pt: "Com que frequência você tem dificuldade para se concentrar no que as pessoas dizem, mesmo quando elas estão falando diretamente com você?",
    en: "How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?"
  },
  {
    factor: "inattention",
    pt: "Com que frequência você deixa um projeto pela metade depois de já ter feito as partes mais difíceis?",
    en: "How often do you have trouble finishing the fine points of a project, once the challenging parts have been done?"
  },
  {
    factor: "inattention",
    pt: "Com que frequência você tem dificuldade para fazer um trabalho que exige organização?",
    en: "How often do you have difficulty getting things in order when you have to do a task that requires organization?"
  },
  {
    factor: "inattention",
    pt: "Quando você precisa fazer algo que exige muita concentração, com que frequência você evita ou adia o início?",
    en: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?"
  },
  {
    factor: "inattention",
    pt: "Com que frequência você coloca as coisas fora do lugar ou tem dificuldade de encontrar as coisas em casa ou no trabalho?",
    en: "How often do you misplace or have difficulty finding things at home or at work?"
  },
  {
    factor: "inattention",
    pt: "Com que frequência você se distrai com atividades ou barulhos à sua volta?",
    en: "How often are you distracted by activity or noise around you?"
  },
  {
    factor: "inattention",
    pt: "Com que frequência você tem dificuldade para lembrar de compromissos ou obrigações?",
    en: "How often do you have difficulty remembering appointments or obligations?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você fica se mexendo na cadeira ou balançando as mãos ou os pés quando precisa ficar sentado(a) por muito tempo?",
    en: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você se levanta da cadeira em reuniões ou em outras situações onde deveria ficar sentado(a)?",
    en: "How often do you leave your seat in meetings or other situations in which you are expected to remain seated?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você se sente inquieto(a) ou agitado(a)?",
    en: "How often do you feel restless or fidgety?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você tem dificuldades para sossegar e relaxar quando tem tempo livre para você?",
    en: "How often do you have difficulty unwinding and relaxing when you have time to yourself?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você se sente ativo(a) demais e necessitando fazer coisas, como se estivesse com um motor ligado?",
    en: "How often do you feel overly active and compelled to do things, like you were driven by a motor?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você se pega falando demais em situações sociais?",
    en: "How often do you find yourself talking too much when you are in social situations?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Quando você está conversando, com que frequência você se pega terminando as frases das pessoas antes delas?",
    en: "When you're in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você tem dificuldade para esperar nas situações onde cada um tem a sua vez?",
    en: "How often do you have difficulty waiting your turn in situations when turn taking is required?"
  },
  {
    factor: "hyperactivityImpulsivity",
    pt: "Com que frequência você interrompe os outros quando eles estão ocupados?",
    en: "How often do you interrupt others when they are busy?"
  }
];

const snapQuestions = [
  { factor: "inattention", pt: "Não consegue prestar muita atenção a detalhes ou comete erros por descuido nos trabalhos da escola ou tarefas." },
  { factor: "inattention", pt: "Tem dificuldade de manter a atenção em tarefas ou atividades de lazer." },
  { factor: "inattention", pt: "Parece não estar ouvindo quando se fala diretamente com ela." },
  { factor: "inattention", pt: "Não segue instruções até o fim e não termina deveres da escola, tarefas ou obrigações." },
  { factor: "inattention", pt: "Tem dificuldade para organizar tarefas e atividades." },
  { factor: "inattention", pt: "Evita, não gosta ou não se envolve em tarefas que exigem esforço mental prolongado." },
  { factor: "inattention", pt: "Perde coisas necessárias para atividades (ex: brinquedos, lápis, livros)." },
  { factor: "inattention", pt: "Distrai-se com estímulos externos." },
  { factor: "inattention", pt: "É esquecido em atividades do dia-a-dia." },
  { factor: "hyperactivityImpulsivity", pt: "Mexe com as mãos ou os pés ou se remexe na cadeira." },
  { factor: "hyperactivityImpulsivity", pt: "Sai do lugar na sala de aula ou em outras situações em que se espera que fique sentado." },
  { factor: "hyperactivityImpulsivity", pt: "Corre de um lado para outro ou sobe demais nas coisas em situações inapropriadas." },
  { factor: "hyperactivityImpulsivity", pt: "Tem dificuldade em brincar ou envolver-se em atividades de lazer de forma calma." },
  { factor: "hyperactivityImpulsivity", pt: "Não para ou frequentemente está a mil por hora." },
  { factor: "hyperactivityImpulsivity", pt: "Fala em excesso." },
  { factor: "hyperactivityImpulsivity", pt: "Responde as perguntas de forma precipitada antes delas terem sido terminadas." },
  { factor: "hyperactivityImpulsivity", pt: "Tem dificuldade de esperar sua vez." },
  { factor: "hyperactivityImpulsivity", pt: "Interrompe os outros ou se intromete (ex: mete-se nas conversas ou jogos)." },
  { factor: "odd", pt: "Descontrola-se." },
  { factor: "odd", pt: "Discute com adultos." },
  { factor: "odd", pt: "Desafia ativamente ou se recusa a atender pedidos ou regras de adultos." },
  { factor: "odd", pt: "Faz coisas de propósito que incomodam outras pessoas." },
  { factor: "odd", pt: "Culpa os outros pelos seus erros ou mau comportamento." },
  { factor: "odd", pt: "É irritável ou facilmente incomodado pelos outros." },
  { factor: "odd", pt: "É zangado e ressentido." },
  { factor: "odd", pt: "É maldoso ou vingativo." }
];

const phq9Questions = [
  {
    pt: "Pouco interesse ou pouco prazer em fazer as coisas.",
    en: "Little interest or pleasure in doing things."
  },
  {
    pt: "Sentir-se para baixo, deprimido(a) ou sem perspectiva.",
    en: "Feeling down, depressed, or hopeless."
  },
  {
    pt: "Dificuldade para pegar no sono ou permanecer dormindo, ou dormir mais do que de costume.",
    en: "Trouble falling or staying asleep, or sleeping too much."
  },
  {
    pt: "Sentir-se cansado(a) ou com pouca energia.",
    en: "Feeling tired or having little energy."
  },
  {
    pt: "Falta de apetite ou comer demais.",
    en: "Poor appetite or overeating."
  },
  {
    pt: "Sentir-se mal consigo mesmo(a), ou achar que você é um fracasso ou que decepcionou você mesmo(a) ou sua família.",
    en: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down."
  },
  {
    pt: "Dificuldade para se concentrar nas coisas, como ler o jornal ou ver televisão.",
    en: "Trouble concentrating on things, such as reading the newspaper or watching television."
  },
  {
    pt: "Lentidão para se movimentar ou falar, a ponto de outras pessoas perceberem; ou o oposto, estar tão agitado(a) ou inquieto(a) que você fica andando de um lado para o outro mais do que de costume.",
    en: "Moving or speaking so slowly that other people could have noticed; or the opposite, being so fidgety or restless that you have been moving around a lot more than usual."
  },
  {
    pt: "Pensar que seria melhor estar morto(a), ou pensar em se ferir de alguma maneira.",
    en: "Thoughts that you would be better off dead, or of hurting yourself in some way."
  },
  {
    pt: "Se você marcou algum problema acima, o quanto esses problemas dificultaram seu trabalho, seus cuidados em casa ou sua relação com outras pessoas?",
    en: "If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
    scored: false,
    optional: true,
    options: phq9ImpactOptions
  }
];

// ATENÇÃO: textos oficiais protegidos por direitos autorais. Usar apenas com licença/autorização adequada. Evitar publicar este arquivo em repositório ou site público.
const baiQuestions = [
  { pt: "Dormência ou formigamento." },
  { pt: "Sensação de calor." },
  { pt: "Tremores nas pernas." },
  { pt: "Incapaz de relaxar." },
  { pt: "Medo que aconteça o pior." },
  { pt: "Atordoado ou tonto." },
  { pt: "Palpitação ou aceleração do coração." },
  { pt: "Sem equilíbrio." },
  { pt: "Aterrorizado." },
  { pt: "Nervoso." },
  { pt: "Sensação de sufocação." },
  { pt: "Tremores nas mãos." },
  { pt: "Trêmulo." },
  { pt: "Medo de perder o controle." },
  { pt: "Dificuldade de respirar." },
  { pt: "Medo de morrer." },
  { pt: "Assustado." },
  { pt: "Indigestão ou desconforto no abdômen." },
  { pt: "Sensação de desmaio." },
  { pt: "Rosto afogueado." },
  { pt: "Suor (não devido ao calor)." }
];

// ATENÇÃO: textos oficiais protegidos por direitos autorais. Usar apenas com licença/autorização adequada. Evitar publicar este arquivo em repositório ou site público.
const bdiQuestions = [
  {
    itemLabel: "1",
    pt: "Tristeza",
    options: createBdiOptions([
      "Não me sinto triste",
      "Eu me sinto triste",
      "Estou sempre triste e não consigo sair disto",
      "Estou tão triste ou infeliz que não consigo suportar"
    ])
  },
  {
    itemLabel: "2",
    pt: "Desânimo quanto ao futuro",
    options: createBdiOptions([
      "Não estou especialmente desanimado quanto ao futuro",
      "Eu me sinto desanimado quanto ao futuro",
      "Acho que nada tenho a esperar",
      "Acho o futuro sem esperanças e tenho a impressão de que as coisas não podem melhorar"
    ])
  },
  {
    itemLabel: "3",
    pt: "Fracasso",
    options: createBdiOptions([
      "Não me sinto um fracasso",
      "Acho que fracassei mais do que uma pessoa comum",
      "Quando olho pra trás, na minha vida, tudo o que posso ver é um monte de fracassos",
      "Acho que, como pessoa, sou um completo fracasso"
    ])
  },
  {
    itemLabel: "4",
    pt: "Prazer",
    options: createBdiOptions([
      "Tenho tanto prazer em tudo como antes",
      "Não sinto mais prazer nas coisas como antes",
      "Não encontro um prazer real em mais nada",
      "Estou insatisfeito ou aborrecido com tudo"
    ])
  },
  {
    itemLabel: "5",
    pt: "Culpa",
    options: createBdiOptions([
      "Não me sinto especialmente culpado",
      "Eu me sinto culpado grande parte do tempo",
      "Eu me sinto culpado na maior parte do tempo",
      "Eu me sinto sempre culpado"
    ])
  },
  {
    itemLabel: "6",
    pt: "Punição",
    options: createBdiOptions([
      "Não acho que esteja sendo punido",
      "Acho que posso ser punido",
      "Creio que vou ser punido",
      "Acho que estou sendo punido"
    ])
  },
  {
    itemLabel: "7",
    pt: "Decepção consigo mesmo",
    options: createBdiOptions([
      "Não me sinto decepcionado comigo mesmo",
      "Estou decepcionado comigo mesmo",
      "Estou enojado de mim",
      "Eu me odeio"
    ])
  },
  {
    itemLabel: "8",
    pt: "Autocrítica",
    options: createBdiOptions([
      "Não me sinto de qualquer modo pior que os outros",
      "Sou crítico em relação a mim por minhas fraquezas ou erros",
      "Eu me culpo sempre por minhas falhas",
      "Eu me culpo por tudo de mal que acontece"
    ])
  },
  {
    itemLabel: "9",
    pt: "Ideias de morte ou autoagressão",
    options: createBdiOptions([
      "Não tenho quaisquer idéias de me matar",
      "Tenho idéias de me matar, mas não as executaria",
      "Gostaria de me matar",
      "Eu me mataria se tivesse oportunidade"
    ])
  },
  {
    itemLabel: "10",
    pt: "Choro",
    options: createBdiOptions([
      "Não choro mais que o habitual",
      "Choro mais agora do que costumava",
      "Agora, choro o tempo todo",
      "Costumava ser capaz de chorar, mas agora não consigo, mesmo que o queira"
    ])
  },
  {
    itemLabel: "11",
    pt: "Irritabilidade",
    options: createBdiOptions([
      "Não sou mais irritado agora do que já fui",
      "Fico aborrecido ou irritado mais facilmente do que costumava",
      "Agora, eu me sinto irritado o tempo todo",
      "Não me irrito mais com coisas que costumavam me irritar"
    ])
  },
  {
    itemLabel: "12",
    pt: "Interesse por outras pessoas",
    options: createBdiOptions([
      "Não perdi o interesse pelas outras pessoas",
      "Estou menos interessado pelas outras pessoas do que costumava estar",
      "Perdi a maior parte do meu interesse pelas outras pessoas",
      "Perdi todo o interesse pelas outras pessoas"
    ])
  },
  {
    itemLabel: "13",
    pt: "Tomada de decisões",
    options: createBdiOptions([
      "Tomo decisões tão bem quanto antes",
      "Adio as tomadas de decisões mais do que costumava",
      "Tenho mais dificuldades de tomar decisões do que antes",
      "Absolutamente não consigo mais tomar decisões"
    ])
  },
  {
    itemLabel: "14",
    pt: "Aparência",
    options: createBdiOptions([
      "Não acho que de qualquer modo pareço pior do que antes",
      "Estou preocupado em estar parecendo velho ou sem atrativo",
      "Acho que há mudanças permanentes na minha aparência, que me fazem parecer sem atrativo",
      "Acredito que pareço feio"
    ])
  },
  {
    itemLabel: "15",
    pt: "Trabalho",
    options: createBdiOptions([
      "Posso trabalhar tão bem quanto antes",
      "É preciso algum esforço extra para fazer alguma coisa",
      "Tenho que me esforçar muito para fazer alguma coisa",
      "Não consigo mais fazer qualquer trabalho"
    ])
  },
  {
    itemLabel: "16",
    pt: "Sono",
    options: createBdiOptions([
      "Consigo dormir tão bem como o habitual",
      "Não durmo tão bem como costumava",
      "Acordo 1 a 2 horas mais cedo do que habitualmente e acho difícil voltar a dormir",
      "Acordo várias horas mais cedo do que costumava e não consigo voltar a dormir"
    ])
  },
  {
    itemLabel: "17",
    pt: "Cansaço",
    options: createBdiOptions([
      "Não fico mais cansado do que o habitual",
      "Fico cansado mais facilmente do que costumava",
      "Fico cansado em fazer qualquer coisa",
      "Estou cansado demais para fazer qualquer coisa"
    ])
  },
  {
    itemLabel: "18",
    pt: "Apetite",
    options: createBdiOptions([
      "O meu apetite não está pior do que o habitual",
      "Meu apetite não é tão bom como costumava ser",
      "Meu apetite é muito pior agora",
      "Absolutamente não tenho mais apetite"
    ])
  },
  {
    itemLabel: "19",
    pt: "Perda de peso",
    options: createBdiOptions([
      "Não tenho perdido muito peso se é que perdi algum recentemente",
      "Perdi mais do que 2 quilos e meio",
      "Perdi mais do que 5 quilos",
      "Perdi mais do que 7 quilos"
    ])
  },
  {
    itemLabel: "19a",
    pt: "Estou tentando perder peso de propósito, comendo menos?",
    scored: false,
    optional: true,
    options: [
      { value: 1, label: "Sim" },
      { value: 0, label: "Não" }
    ]
  },
  {
    itemLabel: "20",
    pt: "Preocupação com a saúde",
    options: createBdiOptions([
      "Não estou mais preocupado com a minha saúde do que o habitual",
      "Estou preocupado com problemas físicos, tais como dores, indisposição do estômago ou constipação",
      "Estou muito preocupado com problemas físicos e é difícil pensar em outra coisa",
      "Estou tão preocupado com meus problemas físicos que não consigo pensar em qualquer outra coisa"
    ])
  },
  {
    itemLabel: "21",
    pt: "Interesse por sexo",
    options: createBdiOptions([
      "Não notei qualquer mudança recente no meu interesse por sexo",
      "Estou menos interessado por sexo do que costumava",
      "Estou muito menos interessado por sexo agora",
      "Perdi completamente o interesse por sexo"
    ])
  }
];

const cgiSchInterpretations = {
  1: "Normal / ausente",
  2: "Limítrofe",
  3: "Leve",
  4: "Moderado",
  5: "Marcado",
  6: "Grave",
  7: "Entre os mais graves / extremamente grave"
};

const cgiSchQuestions = [
  { pt: "Sintomas positivos", domainType: "symptom" },
  { pt: "Sintomas negativos", domainType: "symptom" },
  { pt: "Sintomas depressivos", domainType: "symptom" },
  { pt: "Sintomas cognitivos", domainType: "symptom" },
  { pt: "Gravidade global da esquizofrenia", domainType: "global" }
];

const panssDomainLabels = {
  positive: "Escala Positiva",
  negative: "Escala Negativa",
  general: "Escala de Psicopatologia Geral"
};

const panssRatingLabels = {
  1: "Ausente",
  2: "Mínimo",
  3: "Leve",
  4: "Moderado",
  5: "Moderadamente grave",
  6: "Grave",
  7: "Extremo"
};

// ATENÇÃO: a PANSS é um instrumento protegido por direitos autorais/licenciamento. Esta implementação usa apenas os nomes breves dos itens e a estrutura de pontuação. Preencher descrições/âncoras oficiais apenas se possuir autorização/licença adequada. Evitar publicar este arquivo em repositório ou site público contendo material oficial.
const panssQuestions = [
  { code: "P1", pt: "Delírios", domain: "positive" },
  { code: "P2", pt: "Desorganização conceitual", domain: "positive" },
  { code: "P3", pt: "Comportamento alucinatório", domain: "positive" },
  { code: "P4", pt: "Excitação", domain: "positive" },
  { code: "P5", pt: "Grandiosidade", domain: "positive" },
  { code: "P6", pt: "Desconfiança e Perseguição", domain: "positive" },
  { code: "P7", pt: "Hostilidade", domain: "positive" },
  { code: "N1", pt: "Embotamento Afetivo", domain: "negative" },
  { code: "N2", pt: "Retraimento emocional", domain: "negative" },
  { code: "N3", pt: "Contato pobre", domain: "negative" },
  { code: "N4", pt: "Retraimento social passivo/apático", domain: "negative" },
  { code: "N5", pt: "Dificuldade pensamento abstrato", domain: "negative" },
  { code: "N6", pt: "Falta de espontaneidade e fluência", domain: "negative" },
  { code: "N7", pt: "Pensamento estereotipado", domain: "negative" },
  { code: "G1", pt: "Preocupação somática", domain: "general" },
  { code: "G2", pt: "Ansiedade", domain: "general" },
  { code: "G3", pt: "Culpa", domain: "general" },
  { code: "G4", pt: "Tensão", domain: "general" },
  { code: "G5", pt: "Maneirismo/postura", domain: "general" },
  { code: "G6", pt: "Depressão", domain: "general" },
  { code: "G7", pt: "Retardo motor", domain: "general" },
  { code: "G8", pt: "Falta de cooperação", domain: "general" },
  { code: "G9", pt: "Conteúdo incomum do pensamento", domain: "general" },
  { code: "G10", pt: "Desorientação", domain: "general" },
  { code: "G11", pt: "Déficit de atenção", domain: "general" },
  { code: "G12", pt: "Juízo e crítica", domain: "general" },
  { code: "G13", pt: "Distúrbio de volição", domain: "general" },
  { code: "G14", pt: "Mau controle de impulso", domain: "general" },
  { code: "G15", pt: "Preocupação", domain: "general" },
  { code: "G16", pt: "Esquiva social ativa", domain: "general" }
];

const scales = [
  {
    id: "panss",
    name: "PANSS — Esquizofrenia",
    description:
      "Escala clínica para avaliação de sintomas positivos, sintomas negativos e psicopatologia geral na esquizofrenia. Deve ser preenchida pelo clínico com base na entrevista, exame do estado mental e informações disponíveis. O resultado não substitui avaliação clínica.",
    instruction:
      "Pontue cada item de 1 a 7 conforme a gravidade observada na avaliação clínica.",
    instructionEn:
      "Esta versão não salva dados. Anote os resultados no prontuário se desejar acompanhar evolução ao longo do tempo.",
    questions: panssQuestions,
    options: panssOptions,
    calculate(answers) {
      const scores = {
        type: "panss",
        positiveScore: 0,
        negativeScore: 0,
        generalScore: 0,
        totalScore: 0,
        compositeScore: 0,
        itemRatings: []
      };

      this.questions.forEach((question, index) => {
        const value = Number(answers[index]);
        const itemRating = {
          code: question.code,
          text: question.pt,
          domain: question.domain,
          value,
          label: panssRatingLabels[value]
        };

        scores.itemRatings.push(itemRating);

        if (question.domain === "positive") {
          scores.positiveScore += value;
        }

        if (question.domain === "negative") {
          scores.negativeScore += value;
        }

        if (question.domain === "general") {
          scores.generalScore += value;
        }
      });

      scores.totalScore = scores.positiveScore + scores.negativeScore + scores.generalScore;
      scores.compositeScore = scores.positiveScore - scores.negativeScore;

      return scores;
    },
    interpret() {
      return "A PANSS deve ser interpretada por subescalas e pelo padrão clínico dos itens, não apenas pelo total. Comparações longitudinais devem considerar o mesmo método de aplicação, treinamento do avaliador, adesão ao tratamento, risco, funcionamento, uso de substâncias e efeitos adversos.";
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      const itemSummary = scores.itemRatings
        .map((item) => `${item.code} | ${item.text} | ${item.value} | ${item.label}`)
        .join("\n");

      return [
        { label: "PANSS — Esquizofrenia", value: "Resultado por subescalas e itens." },
        { label: "Escore da Escala Positiva", value: `${scores.positiveScore} / 49` },
        { label: "Escore da Escala Negativa", value: `${scores.negativeScore} / 49` },
        { label: "Escore da Escala de Psicopatologia Geral", value: `${scores.generalScore} / 112` },
        { label: "Total PANSS", value: `${scores.totalScore} / 210`, className: "result-highlight" },
        { label: "Índice composto Positiva - Negativa", value: String(scores.compositeScore) },
        { label: "Resumo dos itens marcados", value: `Código | Item | Pontuação | Rótulo\n${itemSummary}` },
        { label: "Interpretação", value: interpretation },
        {
          label: "Respostas incompletas",
          value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma."
        }
      ];
    }
  },
  {
    id: "cgi-sch",
    name: "CGI-SCH — Esquizofrenia",
    description:
      "Escala de impressão clínica global específica para esquizofrenia. Avalia a gravidade atual dos sintomas positivos, negativos, depressivos, cognitivos e a gravidade global. Deve ser preenchida pelo clínico com base na entrevista, exame do estado mental, evolução e informações disponíveis. O resultado não substitui avaliação clínica.",
    instruction:
      "Classifique a gravidade atual do quadro em cada domínio, considerando sua impressão clínica global no momento da avaliação.",
    instructionEn:
      "Esta escala não salva dados. Anote os resultados no prontuário se desejar acompanhar evolução ao longo do tempo.",
    questions: cgiSchQuestions,
    options: cgiSchOptions,
    calculate(answers) {
      const domains = this.questions.slice(0, 4).map((question, index) => {
        const value = Number(answers[index]);

        return {
          label: question.pt,
          value,
          interpretation: cgiSchInterpretations[value]
        };
      });

      const globalValue = Number(answers[4]);
      const descriptiveMean =
        domains.reduce((total, domain) => total + domain.value, 0) / domains.length;

      return {
        type: "domainRatings",
        domains,
        globalRating: {
          label: "Gravidade global",
          value: globalValue,
          interpretation: cgiSchInterpretations[globalValue]
        },
        descriptiveMean
      };
    },
    interpret() {
      return "A média dos domínios é apenas descritiva. A CGI-SCH é uma escala de impressão clínica e deve ser interpretada clinicamente.";
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      const rows = [
        { label: "CGI-SCH — Esquizofrenia", value: "Resultado por domínios, sem soma total." }
      ];

      scores.domains.forEach((domain) => {
        rows.push({
          label: domain.label,
          value: `${domain.value} / 7 — ${domain.interpretation}`
        });
      });

      rows.push({
        label: scores.globalRating.label,
        value: `${scores.globalRating.value} / 7 — ${scores.globalRating.interpretation}`,
        className: "result-highlight"
      });

      rows.push({
        label: "Média descritiva dos domínios sintomáticos",
        value: `${scores.descriptiveMean.toFixed(1)} / 7`
      });

      rows.push({ label: "Interpretação", value: interpretation });
      rows.push({
        label: "Respostas incompletas",
        value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma."
      });
      rows.push({ label: "Observação clínica", value: this.clinicalNote });

      return rows;
    },
    clinicalNote:
      "A CGI-SCH é uma escala clínica de gravidade e acompanhamento em esquizofrenia. Interpretar junto com entrevista, exame do estado mental, funcionamento, risco, adesão, uso de substâncias e efeitos adversos."
  },
  {
    id: "bdi",
    name: "Inventário de Depressão de Beck (BDI)",
    description:
      "Inventário para avaliação da intensidade de sintomas depressivos na última semana, incluindo hoje. Usar conforme material/licença adquirida. O resultado não substitui avaliação clínica.",
    instruction:
      "Este questionário consiste em 21 grupos de afirmações. Depois de ler cuidadosamente cada grupo, escolha a afirmação que descreve melhor a maneira como você tem se sentido na última semana, incluindo hoje. Tome cuidado de ler todas as afirmações de cada grupo antes de fazer sua escolha.",
    instructionEn:
      "No instrumento original, se várias afirmações parecerem se aplicar igualmente bem, o paciente pode marcar mais de uma. Para esta versão digital simples, escolha a alternativa de maior pontuação entre as que se aplicam.",
    questions: bdiQuestions,
    options: bdiOptions,
    calculate(answers) {
      return answers.reduce(
        (scores, answer, index) => {
          const question = this.questions[index];

          if (question.scored === false) {
            scores.intentionalWeightLoss = answer;
            return scores;
          }

          scores.total += Number(answer);

          if (question.itemLabel === "9") {
            scores.item9 = Number(answer);
          }

          return scores;
        },
        {
          total: 0,
          item9: 0,
          intentionalWeightLoss: null
        }
      );
    },
    interpret(scores) {
      if (scores.total <= 9) {
        return "Ausência de depressão ou sintomas depressivos mínimos.";
      }

      if (scores.total <= 18) {
        return "Depressão leve a moderada.";
      }

      if (scores.total <= 29) {
        return "Depressão moderada a severa.";
      }

      return "Depressão severa.";
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      const rows = [
        { label: "Pontuação total BDI", value: `${scores.total} / 63` },
        { label: "Classificação de gravidade", value: interpretation },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." }
      ];

      if (scores.item9 > 0) {
        rows.push({
          label: "Aviso do item 9",
          value:
            "Item 9 positivo: avaliar risco suicida, presença de plano, intenção, acesso a meios, fatores de proteção e necessidade de conduta imediata.",
          className: "result-alert"
        });
      }

      if (scores.intentionalWeightLoss !== null) {
        rows.push({
          label: "Perda de peso intencional",
          value: scores.intentionalWeightLoss === 1 ? "Sim" : "Não"
        });
      }

      rows.push({ label: "Observação clínica curta", value: this.clinicalNote });

      return rows;
    },
    clinicalNote:
      "O BDI é um instrumento padronizado. Interpretar conforme manual/licença utilizada e contexto clínico. O resultado não substitui avaliação clínica."
  },
  {
    id: "bai",
    name: "Beck Anxiety Inventory (BAI) - Ansiedade",
    description:
      "Inventário para avaliação da intensidade de sintomas ansiosos durante a última semana, incluindo hoje. Usar conforme material/licença adquirida. O resultado não substitui avaliação clínica.",
    instruction:
      "Abaixo está uma lista de sintomas comuns de ansiedade. Por favor, leia cuidadosamente cada item da lista. Identifique o quanto você tem sido incomodado por cada sintoma durante a última semana, incluindo hoje.",
    questions: baiQuestions,
    options: baiOptions,
    calculate(answers) {
      return answers.reduce(
        (scores, answer) => {
          scores.total += Number(answer);
          return scores;
        },
        { total: 0 }
      );
    },
    interpret(scores) {
      if (scores.total <= 7) {
        return "Ansiedade mínima.";
      }

      if (scores.total <= 15) {
        return "Ansiedade leve.";
      }

      if (scores.total <= 25) {
        return "Ansiedade moderada.";
      }

      return "Ansiedade grave.";
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      return [
        { label: "Pontuação total BAI", value: `${scores.total} / 63` },
        { label: "Classificação de gravidade", value: interpretation },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." },
        { label: "Observação clínica curta", value: this.clinicalNote }
      ];
    },
    clinicalNote:
      "O BAI é um instrumento padronizado. Interpretar conforme manual/licença utilizada e contexto clínico. O resultado não substitui avaliação clínica."
  },
  {
    id: "phq-9",
    name: "Patient Health Questionnaire-9 (PHQ-9) - Depressão",
    description:
      "Escala breve de rastreio e acompanhamento de sintomas depressivos nas últimas 2 semanas.",
    instruction:
      "Durante as últimas 2 semanas, com que frequência você foi incomodado(a) por algum dos seguintes problemas?",
    instructionEn:
      "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
    questions: phq9Questions,
    options: phq9Options,
    calculate(answers) {
      return answers.reduce(
        (scores, answer, index) => {
          const question = this.questions[index];

          if (question.scored === false) {
            scores.impact = answer;
            return scores;
          }

          scores.total += Number(answer);

          if (index === 8) {
            scores.item9 = Number(answer);
          }

          return scores;
        },
        {
          total: 0,
          item9: 0,
          impact: null
        }
      );
    },
    interpret(scores) {
      if (scores.total <= 4) {
        return "Sintomas depressivos mínimos ou ausentes.";
      }

      if (scores.total <= 9) {
        return "Sintomas depressivos leves.";
      }

      if (scores.total <= 14) {
        return "Sintomas depressivos moderados.";
      }

      if (scores.total <= 19) {
        return "Sintomas depressivos moderadamente graves.";
      }

      return "Sintomas depressivos graves.";
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      const screeningMessage =
        scores.total >= 10
          ? "Resultado acima do ponto de corte usual para rastreio positivo de depressão. Correlacionar com avaliação clínica."
          : "Resultado abaixo do ponto de corte usual para rastreio positivo, mas não exclui depressão se houver suspeita clínica.";

      const rows = [
        { label: "Pontuação total PHQ-9", value: `${scores.total} / 27` },
        { label: "Gravidade", value: interpretation },
        { label: "Rastreio", value: screeningMessage },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." }
      ];

      if (scores.item9 > 0) {
        rows.push({
          label: "Aviso do item 9",
          value:
            "Item 9 positivo: avaliar risco suicida, presença de plano, intenção, acesso a meios, fatores de proteção e necessidade de conduta imediata.",
          className: "result-alert"
        });
      }

      if (scores.impact !== null) {
        const impactOption = phq9ImpactOptions.find((option) => option.value === scores.impact);
        rows.push({ label: "Impacto funcional", value: impactOption ? impactOption.label : String(scores.impact) });
      }

      rows.push({ label: "Observação clínica curta", value: this.clinicalNote });

      return rows;
    },
    clinicalNote:
      "O PHQ-9 é instrumento de rastreio e acompanhamento. O diagnóstico final é clínico."
  },
  {
    id: "wurs-25",
    name: "Wender Utah Rating Scale-25 (WURS-25)",
    description:
      "Como eu era quando criança. Avalie retrospectivamente o comportamento na infância, idealmente até os 7-12 anos.",
    questions: wurs25Questions,
    options: wursOptions,
    calculate(answers) {
      return answers.reduce(
        (scores, answer, index) => {
          const factor = this.questions[index].factor;

          scores.total += answer;
          scores[factor] += answer;

          return scores;
        },
        {
          total: 0,
          impulsivityBehavior: 0,
          inattentionSchool: 0,
          selfEsteemMood: 0
        }
      );
    },
    interpret(scores) {
      const messages = [];

      if (scores.total >= 46) {
        messages.push("Total >= 46: alta probabilidade de TDAH, com alta especificidade de 99%, minimizando falso-positivos.");
      }

      if (scores.total >= 39) {
        messages.push(
          "Total >= 39: ponto de corte ideal para distinguir TDAH de outros transtornos com sintomas similares, como bipolaridade ou borderline."
        );
      }

      if (scores.total >= 36) {
        messages.push("Total >= 36: sugestivo de TDAH, com alta sensibilidade de 96% no estudo original de Ward et al.");
      }

      if (messages.length === 0) {
        messages.push("Total < 36: abaixo dos pontos de corte informados para triagem retrospectiva de TDAH.");
      }

      return messages.join(" ");
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      return [
        { label: "Pontuação total", value: `${scores.total} de 100` },
        {
          label: "Fator 1 - Impulsividade / Problemas Comportamentais",
          value: `${scores.impulsivityBehavior} de 52`
        },
        {
          label: "Fator 2 - Desatenção / Problemas Escolares",
          value: `${scores.inattentionSchool} de 28`
        },
        {
          label: "Fator 3 - Autoestima / Humor Negativo",
          value: `${scores.selfEsteemMood} de 20`
        },
        { label: "Interpretação", value: interpretation },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." },
        { label: "Observação clínica curta", value: this.clinicalNote }
      ];
    },
    clinicalNote:
      "Esta escala é uma ferramenta de triagem retrospectiva e não substitui o diagnóstico médico clínico."
  },
  {
    id: "wurs-61",
    name: "Wender Utah Rating Scale - versão completa (WURS-61)",
    description:
      "Avalia retrospectivamente características da infância. Responda pensando em como o paciente se comportava quando criança.",
    questions: wursQuestions,
    options: wursOptions,
    calculate(answers) {
      return answers.reduce(
        (scores, answer, index) => {
          scores.total += answer;

          if (this.questions[index].adhdSubscore) {
            scores.adhdSubscore += answer;
          }

          return scores;
        },
        { total: 0, adhdSubscore: 0 }
      );
    },
    interpret(scores) {
      const messages = [];

      if (scores.adhdSubscore >= 46) {
        messages.push(
          "Subescore >= 46: classificação correta de 86% dos pacientes com TDAH, com 99% de especificidade."
        );
      }

      if (scores.adhdSubscore >= 36) {
        messages.push("Subescore >= 36: alta sensibilidade para triagem inicial.");
      }

      if (messages.length === 0) {
        messages.push("Subescore < 36: abaixo dos pontos de corte informados para triagem retrospectiva de TDAH.");
      }

      return messages.join(" ");
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      return [
        { label: "Pontuação total WURS-61", value: `${scores.total} de 244` },
        { label: "Subescore TDAH WURS-25", value: `${scores.adhdSubscore} de 100` },
        { label: "Interpretação do subescore TDAH", value: interpretation },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." },
        { label: "Observação clínica curta", value: this.clinicalNote }
      ];
    },
    clinicalNote:
      "A pontuação total WURS-61 fornece um perfil clínico qualitativo. A interpretação de TDAH deve usar o subescore de 25 itens e não substitui avaliação clínica."
  },
  {
    id: "asrs-18",
    name: "Adult ADHD Self-Report Scale v1.1 (ASRS-18)",
    description:
      "Avalia a frequência de sintomas de TDAH em adultos nos últimos 6 meses.",
    questions: asrsQuestions,
    options: asrsOptions,
    calculate(answers) {
      return answers.reduce(
        (scores, answer, index) => {
          const factor = this.questions[index].factor;

          scores.total += answer;
          scores[factor] += answer;
          scores.highestSubscale = Math.max(scores.inattention, scores.hyperactivityImpulsivity);

          return scores;
        },
        {
          total: 0,
          inattention: 0,
          hyperactivityImpulsivity: 0,
          highestSubscale: 0
        }
      );
    },
    interpret(scores) {
      if (scores.highestSubscale >= 21) {
        return "Maior escore >= 21: alta probabilidade de TDAH (sensibilidade de 92,2% e especificidade de 98,9%, conforme Leite, 2011).";
      }

      return "Maior escore < 21: baixa probabilidade de TDAH.";
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      return [
        { label: "Escore de Desatenção", value: `${scores.inattention} de 36` },
        {
          label: "Escore de Hiperatividade-Impulsividade",
          value: `${scores.hyperactivityImpulsivity} de 36`
        },
        { label: "Maior escore entre as subescalas", value: `${scores.highestSubscale} de 36` },
        { label: "Interpretação", value: interpretation },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." },
        { label: "Observação clínica curta", value: this.clinicalNote }
      ];
    },
    clinicalNote:
      "A ASRS-18 é um instrumento de rastreio. O diagnóstico final é clínico e deve ser feito por especialista."
  },
  {
    id: "asrs-6",
    name: "Adult ADHD Self-Report Scale Screener v1.1 (ASRS-6)",
    description:
      "Instrumento breve de triagem inicial para identificar probabilidade de TDAH em adultos nos últimos 6 meses.",
    questions: asrsQuestions.slice(0, 6),
    options: asrsOptions,
    calculate(answers) {
      return answers.reduce(
        (scores, answer) => {
          scores.total += answer;

          if (answer >= 3) {
            scores.positiveSymptoms += 1;
          }

          return scores;
        },
        {
          total: 0,
          positiveSymptoms: 0
        }
      );
    },
    interpret(scores) {
      const positiveByTotal = scores.total >= 14;
      const positiveBySymptoms = scores.positiveSymptoms >= 4;

      if (positiveByTotal || positiveBySymptoms) {
        return "Rastreio positivo: os resultados sugerem uma alta probabilidade de TDAH. Recomenda-se uma avaliação clínica detalhada com um especialista.";
      }

      return "Rastreio negativo: os resultados não atingem os pontos de corte informados para rastreio positivo.";
    },
    getResultRows(scores, interpretation, incompleteQuestions) {
      const totalStatus = scores.total >= 14 ? "positivo" : "negativo";
      const symptomStatus = scores.positiveSymptoms >= 4 ? "positivo" : "negativo";

      return [
        { label: "Soma de pontos", value: `${scores.total} de 24 (${totalStatus}; corte >= 14)` },
        {
          label: "Contagem de sintomas positivos",
          value: `${scores.positiveSymptoms} de 6 (${symptomStatus}; corte >= 4)`
        },
        { label: "Resultado final", value: interpretation },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." },
        { label: "Observação clínica curta", value: this.clinicalNote }
      ];
    },
    clinicalNote:
      "Aviso: esta é uma ferramenta de triagem inicial e não substitui o diagnóstico médico fundamentado na história de vida do paciente."
  },
  {
    id: "snap-iv-26",
    name: "SNAP-IV - versão de 26 itens",
    description:
      "Responda de acordo com o comportamento da criança nos últimos 6 meses. Se ela iniciou medicação recentemente, responda com base no comportamento anterior ao uso do remédio.",
    profiles: [
      { id: "child", label: "Criança (até 12 anos)" },
      { id: "adolescent", label: "Adolescente (13-17 anos)" }
    ],
    cutoffs: {
      child: {
        inattention: 6,
        hyperactivityImpulsivity: 6,
        odd: 4
      },
      adolescent: {
        inattention: 5,
        hyperactivityImpulsivity: 5,
        odd: 4
      }
    },
    subscales: {
      inattention: "Desatenção",
      hyperactivityImpulsivity: "Hiperatividade e Impulsividade",
      odd: "Transtorno de Oposição e Desafio - TOD"
    },
    questions: snapQuestions,
    options: snapOptions,
    calculate(answers) {
      return answers.reduce(
        (scores, answer, index) => {
          const factor = this.questions[index].factor;
          const symptomPresent = answer >= 2 ? 1 : 0;

          scores[factor] += symptomPresent;

          return scores;
        },
        {
          inattention: 0,
          hyperactivityImpulsivity: 0,
          odd: 0
        }
      );
    },
    interpret(scores, context) {
      const cutoffs = this.cutoffs[context.profile];
      const positiveSubscales = Object.keys(this.subscales).filter((subscaleId) => {
        return scores[subscaleId] >= cutoffs[subscaleId];
      });

      if (positiveSubscales.length === 0) {
        return "Nenhuma subescala atingiu o critério de mais sintomas que o esperado para o perfil selecionado.";
      }

      return `Critério de mais sintomas que o esperado atingido em: ${positiveSubscales
        .map((subscaleId) => this.subscales[subscaleId])
        .join(", ")}.`;
    },
    getResultRows(scores, interpretation, incompleteQuestions, context) {
      const cutoffs = this.cutoffs[context.profile];
      const selectedProfile = this.profiles.find((profile) => profile.id === context.profile);

      return [
        { label: "Perfil selecionado", value: selectedProfile.label },
        {
          label: "Desatenção",
          value: `${scores.inattention} de 9 sintomas presentes - ${
            scores.inattention >= cutoffs.inattention ? "critério atingido" : "critério não atingido"
          } (corte >= ${cutoffs.inattention})`
        },
        {
          label: "Hiperatividade e Impulsividade",
          value: `${scores.hyperactivityImpulsivity} de 9 sintomas presentes - ${
            scores.hyperactivityImpulsivity >= cutoffs.hyperactivityImpulsivity
              ? "critério atingido"
              : "critério não atingido"
          } (corte >= ${cutoffs.hyperactivityImpulsivity})`
        },
        {
          label: "Transtorno de Oposição e Desafio - TOD",
          value: `${scores.odd} de 8 sintomas presentes - ${
            scores.odd >= cutoffs.odd ? "critério atingido" : "critério não atingido"
          } (corte >= ${cutoffs.odd})`
        },
        { label: "Interpretação", value: interpretation },
        { label: "Respostas incompletas", value: incompleteQuestions.length ? `Itens incompletos: ${incompleteQuestions.join(", ")}.` : "Nenhuma." },
        { label: "Observação clínica curta", value: this.clinicalNote }
      ];
    },
    clinicalNote:
      "O SNAP-IV avalia apenas o Critério A. O diagnóstico de TDAH exige a presença de sintomas antes dos 12 anos, em dois ou mais ambientes, com prejuízo claro e ausência de outras condições que expliquem os sintomas."
  }
];

const scaleSelect = document.querySelector("#scale-select");
const scaleDescription = document.querySelector("#scale-description");
const scaleForm = document.querySelector("#scale-form");
const questionsArea = document.querySelector("#questions-area");
const clearButton = document.querySelector("#clear-button");
const resultArea = document.querySelector("#result-area");
const resultList = document.querySelector("#result-list");

let answers = {};
let scaleContext = {};
let viewMode = "cards";
let incompleteQuestionIndexes = new Set();

function getSelectedScale() {
  return scales.find((scale) => scale.id === scaleSelect.value);
}

function getQuestionTitle(question) {
  return typeof question === "string" ? question : question.pt;
}

function getQuestionNumber(question, questionIndex) {
  if (typeof question === "string") {
    return String(questionIndex + 1);
  }

  return question.code || question.itemLabel || String(questionIndex + 1);
}

function populateScaleSelect() {
  scales.forEach((scale) => {
    const option = document.createElement("option");
    option.value = scale.id;
    option.textContent = scale.name;
    scaleSelect.appendChild(option);
  });
}

function renderQuestionText(legend, question, questionIndex) {
  const title = document.createElement("span");
  title.className = "question-title";
  title.textContent = `${getQuestionNumber(question, questionIndex)}. ${getQuestionTitle(question)}`;
  legend.appendChild(title);

  if (typeof question !== "string" && question.en) {
    const original = document.createElement("span");
    original.className = "question-original";
    original.textContent = question.en;
    legend.appendChild(original);
  }
}

function createQuestionText(question, questionIndex) {
  const wrapper = document.createElement("div");
  wrapper.className = "question-copy";

  const title = document.createElement("span");
  title.className = "question-title";
  title.textContent = `${getQuestionNumber(question, questionIndex)}. ${getQuestionTitle(question)}`;
  wrapper.appendChild(title);

  if (typeof question !== "string" && question.en) {
    const original = document.createElement("span");
    original.className = "question-original";
    original.textContent = question.en;
    wrapper.appendChild(original);
  }

  return wrapper;
}

function renderScaleSettings(scale) {
  if (!scale.profiles && !scale.instruction) {
    return;
  }

  const settings = document.createElement("section");
  settings.className = "scale-settings";

  if (scale.instruction) {
    const instruction = document.createElement("div");
    instruction.className = "scale-instruction";

    const instructionPt = document.createElement("p");
    instructionPt.className = "question-title";
    instructionPt.textContent = scale.instruction;
    instruction.appendChild(instructionPt);

    if (scale.instructionEn) {
      const instructionEn = document.createElement("p");
      instructionEn.className = "question-original";
      instructionEn.textContent = scale.instructionEn;
      instruction.appendChild(instructionEn);
    }

    settings.appendChild(instruction);
  }

  if (!scale.profiles) {
    questionsArea.appendChild(settings);
    return;
  }

  const title = document.createElement("h3");
  title.id = "profile-title";
  title.textContent = "Perfil avaliado";
  settings.setAttribute("aria-labelledby", "profile-title");

  const label = document.createElement("label");
  label.className = "field-label";
  label.setAttribute("for", "profile-select");
  label.textContent = "Selecione o perfil para aplicar os pontos de corte";

  const select = document.createElement("select");
  select.id = "profile-select";
  select.name = "profile";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Selecione o perfil";
  select.appendChild(placeholder);

  scale.profiles.forEach((profile) => {
    const option = document.createElement("option");
    option.value = profile.id;
    option.textContent = profile.label;
    option.selected = scaleContext.profile === profile.id;
    select.appendChild(option);
  });

  settings.append(title, label, select);
  questionsArea.appendChild(settings);
}

function renderViewControls(scale) {
  const controls = document.createElement("section");
  controls.className = "question-tools";

  const progress = document.createElement("p");
  progress.id = "progress-counter";
  progress.className = "progress-counter";
  controls.appendChild(progress);

  const switcher = document.createElement("div");
  switcher.className = "view-switcher";
  switcher.setAttribute("aria-label", "Visualizacao das perguntas");

  const label = document.createElement("span");
  label.textContent = "Visualizacao:";
  switcher.appendChild(label);

  [
    { id: "cards", label: "Cartoes" },
    { id: "table", label: "Tabela" }
  ].forEach((mode) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `view-button${viewMode === mode.id ? " active" : ""}`;
    button.dataset.viewMode = mode.id;
    button.textContent = mode.label;
    switcher.appendChild(button);
  });

  controls.appendChild(switcher);
  questionsArea.appendChild(controls);
  updateProgress(scale);
}

function createOptionInput(questionIndex, option) {
  const input = document.createElement("input");
  input.type = "radio";
  input.name = `question-${questionIndex}`;
  input.value = String(option.value);
  input.dataset.questionIndex = String(questionIndex);
  input.checked = answers[questionIndex] === option.value;

  return input;
}

function getQuestionOptions(scale, question) {
  return question.options || scale.options;
}

function shouldRenderGroupHeader(scale, question, questionIndex) {
  if (!question.domain) {
    return false;
  }

  if (questionIndex === 0) {
    return true;
  }

  return scale.questions[questionIndex - 1].domain !== question.domain;
}

function createGroupHeader(question) {
  const header = document.createElement("div");
  header.className = "question-group";
  header.textContent = panssDomainLabels[question.domain] || question.domain;
  return header;
}

function renderCardQuestions(scale) {
  scale.questions.forEach((question, questionIndex) => {
    if (shouldRenderGroupHeader(scale, question, questionIndex)) {
      questionsArea.appendChild(createGroupHeader(question));
    }

    const fieldset = document.createElement("fieldset");
    fieldset.className = `question${incompleteQuestionIndexes.has(questionIndex) ? " incomplete" : ""}`;
    fieldset.dataset.questionIndex = String(questionIndex);

    const legend = document.createElement("legend");
    renderQuestionText(legend, question, questionIndex);
    fieldset.appendChild(legend);

    const optionsWrapper = document.createElement("div");
    optionsWrapper.className = "options";

    getQuestionOptions(scale, question).forEach((option) => {
      const optionLabel = document.createElement("label");
      optionLabel.className = "option";

      const input = createOptionInput(questionIndex, option);

      const labelText = document.createElement("span");
      labelText.className = "option-text";
      labelText.textContent = option.label;

      if (option.detail) {
        const detail = document.createElement("small");
        detail.textContent = option.detail;
        labelText.appendChild(detail);
      }

      optionLabel.append(input, labelText);
      optionsWrapper.appendChild(optionLabel);
    });

    fieldset.appendChild(optionsWrapper);
    questionsArea.appendChild(fieldset);
  });
}

function renderTableQuestions(scale) {
  const wrapper = document.createElement("div");
  wrapper.className = "table-wrapper";

  const table = document.createElement("table");
  table.className = "questions-table";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  const leadingHeaders = scale.id === "panss" ? ["Código", "Item", "Domínio"] : ["Item", "Pergunta"];

  leadingHeaders.forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headRow.appendChild(th);
  });

  scale.options.forEach((option) => {
    const th = document.createElement("th");
    th.textContent = option.label;
    headRow.appendChild(th);
  });

  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  scale.questions.forEach((question, questionIndex) => {
    if (shouldRenderGroupHeader(scale, question, questionIndex)) {
      const groupRow = document.createElement("tr");
      groupRow.className = "table-group-row";

      const groupCell = document.createElement("td");
      groupCell.colSpan = leadingHeaders.length + scale.options.length;
      groupCell.textContent = panssDomainLabels[question.domain] || question.domain;

      groupRow.appendChild(groupCell);
      tbody.appendChild(groupRow);
    }

    const row = document.createElement("tr");
    row.className = incompleteQuestionIndexes.has(questionIndex) ? "incomplete" : "";
    row.dataset.questionIndex = String(questionIndex);

    if (scale.id === "panss") {
      const codeCell = document.createElement("td");
      codeCell.className = "item-cell";
      codeCell.textContent = question.code;
      row.appendChild(codeCell);

      const itemCell = document.createElement("td");
      itemCell.className = "question-cell";
      itemCell.textContent = question.pt;
      row.appendChild(itemCell);

      const domainCell = document.createElement("td");
      domainCell.className = "domain-cell";
      domainCell.textContent = panssDomainLabels[question.domain];
      row.appendChild(domainCell);
    } else {
      const itemCell = document.createElement("td");
      itemCell.className = "item-cell";
      itemCell.textContent = getQuestionNumber(question, questionIndex);
      row.appendChild(itemCell);

      const questionCell = document.createElement("td");
      questionCell.className = "question-cell";
      questionCell.appendChild(createQuestionText(question, questionIndex));
      row.appendChild(questionCell);
    }

    getQuestionOptions(scale, question).forEach((option) => {
      const optionCell = document.createElement("td");
      optionCell.className = "radio-cell";
      const label = document.createElement("label");
      label.className = "table-radio";
      label.appendChild(createOptionInput(questionIndex, option));

      if (question.options) {
        const optionText = document.createElement("span");
        optionText.className = "table-option-text";
        optionText.textContent = option.label;
        label.appendChild(optionText);
      }

      optionCell.appendChild(label);
      row.appendChild(optionCell);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  wrapper.appendChild(table);
  questionsArea.appendChild(wrapper);
}

function renderQuestions(scale) {
  questionsArea.innerHTML = "";
  renderScaleSettings(scale);
  renderViewControls(scale);

  if (viewMode === "table") {
    renderTableQuestions(scale);
    return;
  }

  renderCardQuestions(scale);
}

function updateProgress(scale = getSelectedScale()) {
  const progress = document.querySelector("#progress-counter");

  if (!progress || !scale) {
    return;
  }

  const requiredQuestions = scale.questions.filter((question) => !question.optional);
  const answeredCount = scale.questions.reduce((total, question, questionIndex) => {
    if (question.optional) {
      return total;
    }

    return Object.prototype.hasOwnProperty.call(answers, questionIndex) ? total + 1 : total;
  }, 0);

  progress.textContent = `Respondidas: ${answeredCount} / ${requiredQuestions.length}`;
}

function updateIncompleteHighlight(questionIndex) {
  const currentItem = questionsArea.querySelector(`[data-question-index="${questionIndex}"]`);

  if (!currentItem) {
    return;
  }

  currentItem.classList.toggle("incomplete", incompleteQuestionIndexes.has(questionIndex));
}

function resetResult() {
  resultList.innerHTML = "";
  resultArea.classList.add("hidden");
}

function clearAnswers() {
  answers = {};
  scaleContext = {};
  incompleteQuestionIndexes.clear();
  scaleForm.reset();
  resetResult();

  const selectedScale = getSelectedScale();

  if (selectedScale) {
    renderQuestions(selectedScale);
  }
}

function appendResultRow(label, value, className = "") {
  const row = document.createElement("div");
  const term = document.createElement("dt");
  const description = document.createElement("dd");

  if (className) {
    row.className = className;
  }

  term.textContent = label;
  description.textContent = value;

  row.append(term, description);
  resultList.appendChild(row);
}

function showIncompleteResult(incompleteQuestions) {
  resultList.innerHTML = "";
  appendResultRow("Pendências", `Complete: ${incompleteQuestions.join(", ")}.`);
  appendResultRow("Observação clínica curta", "Complete todos os itens obrigatórios antes de interpretar o resultado.");
  resultArea.classList.remove("hidden");
}

function showResult(scale, scores, interpretation, incompleteQuestions, context) {
  resultList.innerHTML = "";

  scale.getResultRows(scores, interpretation, incompleteQuestions, context).forEach((row) => {
    appendResultRow(row.label, row.value, row.className);
  });

  resultArea.classList.remove("hidden");
}

function collectAnswers(scale) {
  const orderedAnswers = [];
  const incompleteQuestions = [];
  const incompleteIndexes = [];

  scale.questions.forEach((question, questionIndex) => {
    if (!Object.prototype.hasOwnProperty.call(answers, questionIndex)) {
      if (!question.optional) {
        incompleteQuestions.push(getQuestionNumber(question, questionIndex));
        incompleteIndexes.push(questionIndex);
      }

      orderedAnswers.push(null);
      return;
    }

    orderedAnswers.push(Number(answers[questionIndex]));
  });

  return { answers: orderedAnswers, incompleteQuestions, incompleteIndexes };
}

function collectContext(scale) {
  const context = {};
  const incompleteSettings = [];

  if (scale.profiles) {
    const profileSelect = document.querySelector("#profile-select");
    context.profile = profileSelect ? profileSelect.value : "";
    scaleContext.profile = context.profile;

    if (!context.profile) {
      incompleteSettings.push("perfil avaliado");
    }
  }

  return { context, incompleteSettings };
}

scaleSelect.addEventListener("change", () => {
  const selectedScale = getSelectedScale();
  answers = {};
  scaleContext = {};
  incompleteQuestionIndexes.clear();
  clearAnswers();

  if (!selectedScale) {
    scaleDescription.textContent = "";
    questionsArea.innerHTML = "";
    scaleForm.classList.add("hidden");
    return;
  }

  scaleDescription.textContent = selectedScale.description;
  renderQuestions(selectedScale);
  scaleForm.classList.remove("hidden");
});

scaleForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedScale = getSelectedScale();

  if (!selectedScale) {
    return;
  }

  const { answers, incompleteQuestions, incompleteIndexes } = collectAnswers(selectedScale);
  const { context, incompleteSettings } = collectContext(selectedScale);
  const incompleteItems = [
    ...incompleteSettings,
    ...incompleteQuestions.map((questionNumber) => `item ${questionNumber}`)
  ];

  if (incompleteItems.length > 0) {
    incompleteQuestionIndexes = new Set(incompleteIndexes);
    renderQuestions(selectedScale);
    showIncompleteResult(incompleteItems);
    return;
  }

  incompleteQuestionIndexes.clear();
  renderQuestions(selectedScale);
  const scores = selectedScale.calculate(answers, context);
  const interpretation = selectedScale.interpret(scores, context);

  showResult(selectedScale, scores, interpretation, incompleteQuestions, context);
});

questionsArea.addEventListener("change", (event) => {
  const target = event.target;
  const selectedScale = getSelectedScale();

  if (!selectedScale) {
    return;
  }

  if (target.matches('input[type="radio"][data-question-index]')) {
    const questionIndex = Number(target.dataset.questionIndex);
    answers[questionIndex] = Number(target.value);
    incompleteQuestionIndexes.delete(questionIndex);
    updateProgress(selectedScale);
    updateIncompleteHighlight(questionIndex);
    return;
  }

  if (target.matches("#profile-select")) {
    scaleContext.profile = target.value;
    resetResult();
  }
});

questionsArea.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view-mode]");

  if (!button) {
    return;
  }

  viewMode = button.dataset.viewMode;
  renderQuestions(getSelectedScale());
});

clearButton.addEventListener("click", clearAnswers);

populateScaleSelect();
