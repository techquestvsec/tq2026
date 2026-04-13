/* ═══════════════════════════════════════════════════════════
   sprites.js — Unified Tech + Anime Sprite System
   TechQuest 2026
   · Always exactly one sprite on screen
   · 8-second auto-dismiss (then immediately replaced)
   · 20% chance of anime character, 80% tech sprite
   · 6 tech sprites pool (axiom, glitch, nova, byte, kernel, drift)
═══════════════════════════════════════════════════════════ */
(function () {

/* ══════════════════════════════════════════════════
   LINE POOL — ~300 lines total
══════════════════════════════════════════════════ */
const LINES = [
  // ── SITE-AWARE
  "Have you registered yet? Just asking.",
  "Bro just go register already.",
  "Have you seen the Events page? Some wild stuff there.",
  "The Arena games are actually insane, not gonna lie.",
  "I heard Bug Fix is harder than it looks.",
  "TechQuest 2026. You excited? You should be.",
  "The leaderboard is live. Are you on it?",
  "Have you played Type Racer yet? It's unhinged.",
  "Sudoku goes up to 9x9. Good luck with that.",
  "Minesweeper. A classic. A trap.",
  "Memory Match at a tech fest. Poetic.",
  "Cinematic Cuts sounds genuinely cool.",
  "DigiClay in Blender? That's a whole commitment.",
  "Weave The Web — HTML and CSS only. Respect.",
  "Debate round got a live crisis round. No pressure.",
  "Scavenger Hunt is going to be chaos. Good chaos.",
  "Ham The Jam. 60 seconds. One topic. Let's go.",
  "Beat D Beats — FL Studio at a school event. Iconic.",
  "Pixelated: recreating images in ASCII. Absolutely unhinged.",
  "Lead The Stick — pivot animators rise up.",

  // ── WELLNESS
  "Drink water. Right now. I'm serious.",
  "Have you blinked recently? Blink.",
  "Stand up. Stretch. I'll wait.",
  "Your posture. Fix it. I saw that.",
  "Sleep is not a personality flaw.",
  "When did you last eat a real meal? Just checking.",
  "Eyes off screen for 20 seconds. Doctor's orders.",
  "You've been scrolling for a while. Breathe.",
  "Hydration: not optional.",
  "Your neck. Tilt it left. Now right. There you go.",
  "Have you gone outside today? Asking for a friend.",
  "Snack break. You deserve it.",
  "Sunlight exists. Just saying.",
  "Your eyes are doing a lot of work right now. Rest them.",
  "Deep breath in. Hold. Out. Good. Now drink water.",
  "Shoulders down from your ears. There. Better.",
  "If you've been sitting for an hour, stand for 5 mins.",
  "Room temperature or warm water. Not ice cold. Trust me.",
  "A 10 minute walk will fix more than you think.",
  "You are allowed to not be productive every single second.",

  // ── UNHINGED FACTS
  "A platypus is just a duck designed by committee.",
  "Crows remember your face. Forever.",
  "Sand is just small rocks having a rough time.",
  "Somewhere, a pigeon is judging you.",
  "Cereal came before milk. Think about it.",
  "Cleopatra lived closer to the iPhone than the pyramids.",
  "Stairs are just ramps with commitment issues.",
  "Your skeleton is always slightly damp.",
  "Owls can't move their eyeballs. Only their whole head.",
  "Lobsters were once considered peasant food.",
  "The word 'noodle' has no clear etymology. Noodle.",
  "Technically a strawberry isn't a berry. A banana is.",
  "Honey never expires. Found in 3000 year old tombs.",
  "A group of flamingos is called a flamboyance.",
  "Wombats produce cube-shaped droppings. That's engineering.",
  "Sharks are older than trees. Let that sink in.",
  "Octopuses have three hearts. All three are judging you.",
  "A day on Venus is longer than a year on Venus.",
  "Butterflies taste with their feet. Elegant.",
  "There are more trees on Earth than stars in the Milky Way.",
  "Bananas are radioactive. Slightly. But still.",
  "Sloths can hold their breath longer than dolphins.",
  "Lightning is five times hotter than the sun's surface.",
  "The Pringles inventor is buried in a Pringles can.",
  "Cats purr at a frequency that promotes bone healing.",
  "Turtles can breathe through their butts. Officially.",
  "Antarctica is technically the largest desert on Earth.",
  "A snail can sleep for 3 years. Goals.",
  "Figs are full of wasps. You're welcome.",
  "The loudest animal on Earth is a shrimp.",
  "Elephants are the only animals that can't jump. Wisely.",
  "You share 60% of your DNA with a banana.",
  "Hippos sweat pink. That's their sunscreen.",
  "A group of pugs is called a grumble.",
  "Polar bears have transparent fur. Looks white though.",
  "Penguins propose with pebbles. Respect.",
  "Glass is technically a supercooled liquid.",
  "The original name for ping-pong was whiff-whaff.",
  "Nintendo was founded in 1889. They made playing cards.",
  "The first computer bug was a literal moth.",
  "WiFi doesn't actually stand for Wireless Fidelity.",
  "A jiffy is a real unit of time. 1/100th of a second.",
  "Oxford University is older than the Aztec Empire.",
  "The ampersand used to be the 27th letter of the alphabet.",
  "Typewriters were invented before the telephone.",
  "Space smells like seared steak and raspberries.",
  "There is a jellyfish species that is biologically immortal.",
  "The dot over a lowercase i is called a tittle.",
  "Hot water freezes faster than cold water. Nobody knows why.",
  "More possible chess games than atoms in the universe.",
  "The sky has no color. It just scatters blue light.",
  "Clams are older than dinosaurs. Still going strong.",
  "Koalas have fingerprints nearly identical to humans.",
  "A shrimp's heart is in its head.",
  "Humans share 85% of their DNA with zebrafish.",
  "Cows have best friends and get stressed when separated.",
  "A group of cats is called a clowder.",
  "Dolphins sleep with one eye open.",
  "Seahorses are monogamous and hold hands while sleeping.",

  // ── EXISTENTIAL
  "Are you the main character? Statistically, no.",
  "Nobody truly knows what a qubit actually is.",
  "The moon landing was real. Relax.",
  "A hotdog is technically a sandwich.",
  "Technically, you're always in the future.",
  "Is this website judging you? Maybe.",
  "You've scrolled this far. What are you looking for?",
  "What even is RAM? Like actually?",
  "Does a website dream when no one is visiting?",
  "You and I are both made of stardust. Awkward.",
  "Is debugging just arguing with yourself?",
  "At what point does a ship of Theseus become a new ship?",
  "If you save a file and no one opens it, does it exist?",
  "We're all just code running on meat computers.",
  "What is a font, really, when you think about it.",
  "The universe is 13.8 billion years old. You just scrolled past a div.",
  "Every loading screen is a tiny existential pause.",
  "Is dark mode just white mode with depression?",
  "You can never truly delete something from the internet.",
  "Is debugging just arguing with your past self?",
  "If no one reads the comments, do they count?",
  "What came first: the algorithm or the data?",
  "At what point does autocorrect become the real author?",
  "Is a cached version of you still you?",
  "The recursion goes deeper than you think.",
  "You are reading this. This is reading you.",
  "What if the real RAM was the friends we made along the way.",
  "Every website is just a letter we wrote to the void.",

  // ── DRY TECH HUMOUR
  "undefined is not a function. And that is on you.",
  "The real bugs were the friends we made along the way.",
  "Semicolons: optional until they're not.",
  "It compiled. I am surprised too.",
  "Loop runs once. Loop runs forever. No in between.",
  "The best code is code you don't have to write.",
  "git blame yourself.",
  "console.log('why') is a classic debugging strategy.",
  "Arrays start at 0. Get over it.",
  "The documentation lied. Again.",
  "Naming things is the second hardest problem in CS.",
  "The first hardest is cache invalidation.",
  "Off by one error. Classic. Timeless.",
  "Works in dev. Dies in prod. Always.",
  "Copy-paste is not a design pattern. Officially.",
  "The code worked yesterday. Untouched. Broken today.",
  "Tabs vs spaces. We don't talk about it.",
  "sudo make me a sandwich.",
  "It's not a bug, it's an undocumented feature.",
  "A program is never finished, only abandoned.",
  "Any code written by someone else is legacy code.",
  "First rule of optimisation: don't. Second: not yet.",
  "Programming is 10% writing code, 90% figuring out why it doesn't work.",
  "The fastest code is the code that never runs.",

  // ── CROSSOVER CHAOS
  "I heard Gojo was spotted near the events hall.",
  "Goku is looking for Kakashi. No one has seen him.",
  "Have you seen Zoro? He went to the bathroom 3 hours ago.",
  "Sukuna just walked past the arena. Everyone pretended not to notice.",
  "Luffy tried to register for every event simultaneously.",
  "Vegeta refused to participate. Said the competition wasn't worthy.",
  "Naruto is running late. He's been running for 40 minutes in the same place.",
  "Levi was seen cleaning the arena floor. Unprompted.",
  "Light Yagami signed up for the quiz. Everyone else withdrew.",
  "Frieza tried to sponsor TechQuest. We said no.",
  "Kakashi showed up an hour late with a Sharingan and no explanation.",
  "Gohan wanted to join but his mom said study first.",
  "Shanks is just vibing near the canteen. Doing nothing. Winning.",
  "Sasuke entered alone. Sat in the corner. Refused to team up.",
  "Nobara rated the event hall 10/10. High standards confirmed.",
  "Piccolo is meditating on the rooftop. Do not disturb.",
  "Itadori ate 4 plates at the canteen and is somehow still hungry.",
  "Megumi summoned a shadow dog in the parking lot. Security is baffled.",
  "Gojo challenged every judge simultaneously. They declined.",
  "Nami is already calculating prize money she hasn't won yet.",
  "Zoro tried to navigate to the events hall. He ended up on the roof.",
  "Frieza entered the Type Racer event. His fingers are unsettling.",
  "Vegeta keeps insisting he would have won if he tried.",
  "Naruto ate all the ramen at the canteen. Alone. In one sitting.",
  "Goku got lost looking for the strongest participant. He found Sukuna.",
  "Light Yagami has already written everyone's name down. Allegedly.",
  "Levi finished cleaning the arena 40 minutes before anyone arrived.",
  "Luffy said the prize doesn't matter he just wants to have fun.",
  "Shanks told everyone to believe in themselves then took a nap.",
  "Piccolo entered Debate. Spoke once. Won. Left.",
  "Gohan scored 100% in the quiz. His dad has no idea what a quiz is.",
  "Kakashi read his book through the entire code review. Still caught all the bugs.",
  "Nobara is here and she is not losing to anyone.",
  "Sasuke submitted his code with no comments. Zero. On purpose.",
  "Sukuna called the Minesweeper too easy. He was right.",
  "Itadori did the Type Racer with one hand. Still top 3.",
  "Megumi's shadow hound keeps following participants. Unexplained.",
  "Gojo blindfolded himself for the Memory Match. Still won.",
  "Zoro got into the wrong event. Somehow excelled anyway.",
  "Nami plotted the most efficient path through all events in 3 minutes.",
  "Vegeta said Tetris is beneath him. He played it for 2 hours.",
  "Luffy made 40 friends before the event even started.",
  "Frieza is still standing in the registration queue. Too scared to tell him it closed.",
  "Light Yagami is writing the results before they're announced.",
  "Piccolo arrived first. Left last. Said nothing.",
  "Levi scored perfect attendance. No one asked him to.",
  "Shanks bet on a random student to win the whole thing. Might be right.",
  "Kakashi is late but somehow already knows everything that happened.",
  "Goku just wants to fight the Sudoku. Not solve it. Fight it.",
  "Nobara said the prizes aren't impressive enough. She's right.",
];

/* ══════════════════════════════════════════════════
   TECH SPRITES — exactly 6, randomly picked each time
══════════════════════════════════════════════════ */
const TECH_SPRITES = ['axiom', 'glitch', 'nova', 'byte', 'kernel', 'drift'];

const TECH_HTML = {
  axiom:  `<div class="axiom-antenna"></div><div class="axiom-head"><div class="axiom-visor"></div></div><div class="axiom-body"><div class="axiom-chest"></div></div><div class="axiom-arm-l"></div><div class="axiom-arm-r"></div><div class="axiom-leg-l"></div><div class="axiom-leg-r"></div>`,
  glitch: `<div class="glitch-ant-l"></div><div class="glitch-ant-r"></div><div class="glitch-head"><div class="glitch-eye-l"></div><div class="glitch-eye-r"></div></div><div class="glitch-body"></div><div class="glitch-arm-l"></div><div class="glitch-arm-r"></div><div class="glitch-leg-l"></div><div class="glitch-leg-r"></div>`,
  nova:   `<div class="nova-helmet"><div class="nova-visor"><div class="nova-reflect"></div></div></div><div class="nova-body"></div><div class="nova-pack"></div><div class="nova-arm-l"></div><div class="nova-arm-r"></div><div class="nova-boot-l"></div><div class="nova-boot-r"></div><div class="nova-flame-l"></div><div class="nova-flame-r"></div>`,
  byte:   `<div class="byte-head"><div class="byte-eye-l"></div><div class="byte-eye-r"></div></div><div class="byte-body"><div class="byte-circuit"></div><div class="byte-circuit-2"></div></div><div class="byte-arm-l"></div><div class="byte-arm-r"></div><div class="byte-leg-l"></div><div class="byte-leg-r"></div>`,
  kernel: `<div class="kernel-ear-l"></div><div class="kernel-ear-r"></div><div class="kernel-head"><div class="kernel-eye-l"></div><div class="kernel-eye-r"></div><div class="kernel-nose"></div><div class="kernel-whisker-l"></div><div class="kernel-whisker-r"></div></div><div class="kernel-body"><div class="kernel-collar"></div></div><div class="kernel-pack"><div class="kernel-pack-led"></div></div><div class="kernel-tail"></div><div class="kernel-leg-l"></div><div class="kernel-leg-r"></div>`,
  drift:  `<div class="drift-body-main"><div class="drift-eye-l"></div><div class="drift-eye-r"></div><div class="drift-pupil-l"></div><div class="drift-pupil-r"></div></div><div class="drift-tail-1"></div><div class="drift-tail-2"></div><div class="drift-tail-3"></div><div class="drift-laptop"><div class="drift-screen"></div></div>`,
};

/* ══════════════════════════════════════════════════
   ANIME CHARACTERS — 20% spawn probability
══════════════════════════════════════════════════ */
const ANIME_CHARS = [
  { id:'gojo',        name:'Gojo Satoru',       color:'#a8d8ff', line:"Throughout Heaven and Earth, I alone am the honoured one.", html:`<div class="gojo-hair"></div><div class="gojo-face"></div><div class="gojo-blindfold"></div><div class="gojo-smile"></div><div class="gojo-body"></div><div class="gojo-collar"></div><div class="gojo-arm-l"></div><div class="gojo-arm-r"></div><div class="gojo-leg-l"></div><div class="gojo-leg-r"></div>` },
  { id:'gojo-purple', name:'Gojo Satoru',       color:'#c088ff', line:"Nah, I'd win.", isPurple:true, html:`<div class="gojo-hair"></div><div class="gojo-face"></div><div class="gojo-blindfold"></div><div class="gojo-smile"></div><div class="gojo-body"></div><div class="gojo-collar"></div><div class="gojo-arm-l"></div><div class="gojo-arm-r"></div><div class="gojo-leg-l"></div><div class="gojo-leg-r"></div><div class="gojo-orb"></div>` },
  { id:'sukuna',      name:'Ryomen Sukuna',     color:'#cc2222', line:"Know your place.", html:`<div class="sukuna-spike-1"></div><div class="sukuna-spike-2"></div><div class="sukuna-spike-3"></div><div class="sukuna-hair"></div><div class="sukuna-face"></div><div class="sukuna-tattoo-l"></div><div class="sukuna-tattoo-r"></div><div class="sukuna-extra-eyes"></div><div class="sukuna-body"></div><div class="sukuna-arm-l"></div><div class="sukuna-arm-r"></div><div class="sukuna-leg-l"></div><div class="sukuna-leg-r"></div>` },
  { id:'yuji',        name:'Yuji Itadori',      color:'#e88080', line:"I don't want to regret the way I lived.", html:`<div class="yuji-hair"></div><div class="yuji-face"></div><div class="yuji-eyes"><div class="yuji-eye"></div><div class="yuji-eye"></div></div><div class="yuji-body"></div><div class="yuji-stripe"></div><div class="yuji-arm-l"></div><div class="yuji-arm-r"></div><div class="yuji-leg-l"></div><div class="yuji-leg-r"></div>` },
  { id:'megumi',      name:'Megumi Fushiguro',  color:'#4a4a8a', line:"I'd rather save an interesting few than a lot of boring people.", html:`<div class="megumi-hair"></div><div class="megumi-bang"></div><div class="megumi-face"></div><div class="megumi-frown"></div><div class="megumi-body"></div><div class="megumi-arm-l"></div><div class="megumi-arm-r"></div><div class="megumi-shadow"></div><div class="megumi-leg-l"></div><div class="megumi-leg-r"></div>` },
  { id:'nobara',      name:'Nobara Kugisaki',   color:'#b05020', line:"I'm in love with myself, my life and my fate.", html:`<div class="nobara-hair"></div><div class="nobara-bun"></div><div class="nobara-face"></div><div class="nobara-body"></div><div class="nobara-hammer"></div><div class="nobara-arm-l"></div><div class="nobara-leg-l"></div><div class="nobara-leg-r"></div>` },
  { id:'goku',        name:'Son Goku',           color:'#ff6600', line:"I am the hope of the universe.", html:`<div class="goku-aura"></div><div class="goku-spike-1"></div><div class="goku-spike-2"></div><div class="goku-spike-3"></div><div class="goku-spike-4"></div><div class="goku-hair"></div><div class="goku-face"></div><div class="goku-scar"></div><div class="goku-body"></div><div class="goku-belt"></div><div class="goku-arm-l"></div><div class="goku-arm-r"></div><div class="goku-leg-l"></div><div class="goku-leg-r"></div>` },
  { id:'vegeta',      name:'Vegeta',             color:'#ffffff', line:"It's over 9000!!", html:`<div class="vegeta-hair"></div><div class="vegeta-face"></div><div class="vegeta-scowl"></div><div class="vegeta-armor"></div><div class="vegeta-armor-trim"></div><div class="vegeta-arm-l"></div><div class="vegeta-arm-r"></div><div class="vegeta-leg-l"></div><div class="vegeta-leg-r"></div>` },
  { id:'gohan',       name:'Gohan',              color:'#ff8800', line:"I'm the one who's going to destroy you.", html:`<div class="gohan-aura"></div><div class="gohan-spike"></div><div class="gohan-hair"></div><div class="gohan-face"></div><div class="gohan-body"></div><div class="gohan-arm-l"></div><div class="gohan-arm-r"></div><div class="gohan-leg-l"></div><div class="gohan-leg-r"></div>` },
  { id:'piccolo',     name:'Piccolo',            color:'#3a8a3a', line:"Train harder than you think possible.", html:`<div class="piccolo-antenna-l"></div><div class="piccolo-antenna-r"></div><div class="piccolo-cape"></div><div class="piccolo-head"></div><div class="piccolo-turban"></div><div class="piccolo-face"></div><div class="piccolo-body"></div><div class="piccolo-arm-l"></div><div class="piccolo-arm-r"></div><div class="piccolo-leg-l"></div><div class="piccolo-leg-r"></div>` },
  { id:'frieza',      name:'Frieza',             color:'#d0a0ff', line:"I am the most powerful being in the universe.", html:`<div class="frieza-aura"></div><div class="frieza-crown"></div><div class="frieza-head"></div><div class="frieza-face"></div><div class="frieza-eyes"><div class="frieza-eye"></div><div class="frieza-eye"></div></div><div class="frieza-body"></div><div class="frieza-tail"></div><div class="frieza-arm-l"></div><div class="frieza-arm-r"></div><div class="frieza-leg-l"></div><div class="frieza-leg-r"></div>` },
  { id:'luffy',       name:'Monkey D. Luffy',   color:'#cc2200', line:"I'm gonna be King of the Pirates!", html:`<div class="luffy-hat"></div><div class="luffy-hat-top"></div><div class="luffy-hat-band"></div><div class="luffy-face"></div><div class="luffy-scar"></div><div class="luffy-smile"></div><div class="luffy-body"></div><div class="luffy-arm-l"></div><div class="luffy-arm-r"></div><div class="luffy-leg-l"></div><div class="luffy-leg-r"></div>` },
  { id:'zoro',        name:'Roronoa Zoro',       color:'#3a8a3a', line:"Nothing happened.", html:`<div class="zoro-hair"></div><div class="zoro-bandana"></div><div class="zoro-face"></div><div class="zoro-scar"></div><div class="zoro-body"></div><div class="zoro-sword-1"></div><div class="zoro-sword-2"></div><div class="zoro-sword-3"></div><div class="zoro-arm-l"></div><div class="zoro-arm-r"></div><div class="zoro-leg-l"></div><div class="zoro-leg-r"></div>` },
  { id:'nami',        name:'Nami',               color:'#e07020', line:"Just shut up and leave it to me.", html:`<div class="nami-hair"></div><div class="nami-hair-long"></div><div class="nami-face"></div><div class="nami-body"></div><div class="nami-staff"></div><div class="nami-staff-top"></div><div class="nami-arm-l"></div><div class="nami-leg-l"></div><div class="nami-leg-r"></div>` },
  { id:'shanks',      name:'Shanks',             color:'#cc2020', line:"Don't cry. It's not your fault.", html:`<div class="shanks-hair"></div><div class="shanks-face"></div><div class="shanks-scar"></div><div class="shanks-cape"></div><div class="shanks-body"></div><div class="shanks-arm"></div><div class="shanks-stump"></div><div class="shanks-leg-l"></div><div class="shanks-leg-r"></div>` },
  { id:'naruto',      name:'Naruto Uzumaki',     color:'#f0c030', line:"I never go back on my word. That's my ninja way!", html:`<div class="naruto-chakra"></div><div class="naruto-spike-l"></div><div class="naruto-spike-r"></div><div class="naruto-hair"></div><div class="naruto-face"></div><div class="naruto-whisker-l1"></div><div class="naruto-whisker-l2"></div><div class="naruto-whisker-r1"></div><div class="naruto-whisker-r2"></div><div class="naruto-body"></div><div class="naruto-spiral"></div><div class="naruto-arm-l"></div><div class="naruto-arm-r"></div><div class="naruto-leg-l"></div><div class="naruto-leg-r"></div>` },
  { id:'sasuke',      name:'Sasuke Uchiha',      color:'#2a2a8a', line:"I have long since closed my eyes. My only goal is in the darkness.", html:`<div class="sasuke-hair"></div><div class="sasuke-bang"></div><div class="sasuke-face"></div><div class="sasuke-scowl"></div><div class="sasuke-sharingan"></div><div class="sasuke-body"></div><div class="sasuke-arm-l"></div><div class="sasuke-arm-r"></div><div class="sasuke-leg-l"></div><div class="sasuke-leg-r"></div>` },
  { id:'kakashi',     name:'Kakashi Hatake',     color:'#c8c8c8', line:"Those who abandon their comrades are worse than trash.", html:`<div class="kakashi-hair"></div><div class="kakashi-headband"></div><div class="kakashi-headband-plate"></div><div class="kakashi-mask"></div><div class="kakashi-eye"></div><div class="kakashi-sharingan"></div><div class="kakashi-vest"></div><div class="kakashi-body"></div><div class="kakashi-arm-l"></div><div class="kakashi-arm-r"></div><div class="kakashi-leg-l"></div><div class="kakashi-leg-r"></div>` },
  { id:'levi',        name:'Levi Ackerman',      color:'#a0a0b0', line:"No matter what happens, no regrets.", html:`<div class="levi-undercut"></div><div class="levi-hair"></div><div class="levi-face"></div><div class="levi-frown-l"></div><div class="levi-frown-r"></div><div class="levi-cloak"></div><div class="levi-body"></div><div class="levi-blade-l"></div><div class="levi-blade-r"></div><div class="levi-leg-l"></div><div class="levi-leg-r"></div>` },
  { id:'light',       name:'Light Yagami',       color:'#aa8844', line:"I'll take a potato chip... and eat it.", html:`<div class="light-hair"></div><div class="light-face"></div><div class="light-smirk"></div><div class="light-body"></div><div class="light-tie"></div><div class="light-note"></div><div class="light-arm-l"></div><div class="light-leg-l"></div><div class="light-leg-r"></div>` },
];

/* ══════════════════════════════════════════════════
   SCREEN POSITIONS — corners & edges, avoids top nav
══════════════════════════════════════════════════ */
const POSITIONS = [
  { bottom:'90px',  right:'22px' },
  { bottom:'90px',  left: '22px' },
  { bottom:'200px', right:'22px' },
  { bottom:'200px', left: '22px' },
  { top:   '80px',  right:'22px' },
  { top:   '80px',  left: '22px' },
  { top:   '160px', right:'22px' },
  { top:   '160px', left: '22px' },
];

/* ══════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════ */
function triggerPurpleTint() {
  const tint = document.createElement('div');
  tint.style.cssText = `position:fixed;inset:0;z-index:9998;pointer-events:none;
    background:radial-gradient(ellipse at 50% 40%,rgba(192,136,255,0.09) 0%,rgba(140,80,255,0.05) 50%,transparent 75%);
    animation:purpleTint 2.4s ease forwards;`;
  if (!document.getElementById('purpleTintStyle')) {
    const st = document.createElement('style');
    st.id = 'purpleTintStyle';
    st.textContent = `@keyframes purpleTint{0%{opacity:0}15%{opacity:1}70%{opacity:1}100%{opacity:0}}`;
    document.head.appendChild(st);
  }
  document.body.appendChild(tint);
  setTimeout(() => tint.remove(), 2500);
}

function typewrite(el, text, speed = 36) {
  el.textContent = '';
  let i = 0;
  const iv = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(iv);
  }, speed);
}

/* ══════════════════════════════════════════════════
   SPAWN ENGINE
   - Exactly ONE sprite visible at all times
   - 8 second lifetime, then auto-replaced
   - dismiss(callback) safely removes current, then fires cb
══════════════════════════════════════════════════ */
let activeWrap  = null;
let dismissTimer = null;

function dismiss(callback) {
  clearTimeout(dismissTimer);
  dismissTimer = null;

  if (!activeWrap) {
    if (callback) callback();
    return;
  }

  const w = activeWrap;
  activeWrap = null;
  w.classList.add('leaving');

  setTimeout(() => {
    if (w.parentNode) w.parentNode.removeChild(w);
    if (callback) callback();
  }, 420);
}

function spawnNext() {
  // Brief natural gap so it doesn't feel like an instant swap
  setTimeout(spawnSprite, 500 + Math.random() * 500);
}

function spawnSprite() {
  dismiss(() => {
    // 20% anime, 80% tech
    const isAnime = Math.random() < 0.20;
    const pos     = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
    const isLeft  = !!pos.left;

    let bodyEl, line, bubbleColor = null, nameTag = '';

    if (isAnime) {
      const char = ANIME_CHARS[Math.floor(Math.random() * ANIME_CHARS.length)];
      bodyEl = document.createElement('div');
      bodyEl.className = `sprite-body ${char.id}`;
      bodyEl.innerHTML = char.html;
      line        = char.line;
      bubbleColor = char.color;
      nameTag     = char.name;
      if (char.isPurple) triggerPurpleTint();
    } else {
      // Randomly pick one of the 6 tech sprites
      const type = TECH_SPRITES[Math.floor(Math.random() * TECH_SPRITES.length)];
      bodyEl = document.createElement('div');
      bodyEl.className = `sprite-body ${type}`;
      bodyEl.innerHTML = TECH_HTML[type];
      line = LINES[Math.floor(Math.random() * LINES.length)];
    }

    // ── Wrapper
    const wrap = document.createElement('div');
    wrap.className = 'sprite-wrap';
    Object.assign(wrap.style, {
      position: 'fixed', zIndex: '9999',
      display: 'flex', flexDirection: 'column',
      alignItems: isLeft ? 'flex-start' : 'flex-end',
      gap: '7px',
      ...pos,
    });

    // ── Bubble
    const bubble = document.createElement('div');
    bubble.className =
      'sprite-bubble' +
      (isLeft  ? ' left-side'    : '') +
      (isAnime ? ' anime-bubble' : '');

    if (bubbleColor) {
      bubble.style.borderColor = bubbleColor + '55';
      bubble.style.boxShadow   = `0 4px 28px rgba(0,0,0,.7), 0 0 18px ${bubbleColor}22`;
    }

    // Name tag for anime characters
    if (nameTag) {
      const tag = document.createElement('div');
      tag.className   = 'anime-name-tag';
      tag.style.color = bubbleColor || '#c8ddf0';
      tag.textContent = '// ' + nameTag;
      bubble.appendChild(tag);
    }

    const txt = document.createElement('div');
    txt.className = 'bubble-text';

    const btn = document.createElement('button');
    btn.className   = 'dismiss-btn';
    btn.textContent = '×';
    btn.addEventListener('click', () => dismiss(spawnNext));

    bubble.append(txt, btn);

    if (isLeft) wrap.append(bodyEl, bubble);
    else        wrap.append(bubble, bodyEl);

    document.body.appendChild(wrap);
    activeWrap = wrap;

    typewrite(txt, line);

    // Auto-dismiss after exactly 8 seconds
    dismissTimer = setTimeout(() => dismiss(spawnNext), 8000);
  });
}

// ── Boot
setTimeout(spawnSprite, 1500);

// ── Pause when tab is hidden, resume when visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearTimeout(dismissTimer);
    dismiss();
  } else {
    setTimeout(spawnSprite, 1200);
  }
});

})();
