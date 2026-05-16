import { useState, useEffect, useRef } from "react";

const LESSONS = [
  { id:1, title:"Short Vowels", icon:"🌾", color:"#4ADE80", colorDark:"#052E16", colorBorder:"#166534",
    biome:"THE PLAINS VILLAGE", mob:"Zombie 🧟", material:"Oak Wood", materialIcon:"🪵",
    realBtn:"🪵 CHOP THE LOG", mobBtn:"🧟 SPAWN ZOMBIE",
    realWin:"Log collected!", mobWin:"A Zombie shambled in!",
    questHook:"You've spawned in the Plains at dawn. Zombies are advancing. Read the signs on every tree to hold them off.",
    miniLesson:{
      heading:"Short Vowels — The Foundation",
      explanation:"Every word needs a vowel. Short vowels make a quick, clipped sound. Five vowels, five sounds. Learn these and you can read thousands of words.",
      rows:[
        {vowel:"A",sound:'"ah"',examples:["cat","hat","map","tap","jam"]},
        {vowel:"E",sound:'"eh"',examples:["bed","red","net","peg","vet"]},
        {vowel:"I",sound:'"ih"',examples:["sit","hit","pin","tip","big"]},
        {vowel:"O",sound:'"oh"',examples:["hop","mop","dog","top","log"]},
        {vowel:"U",sound:'"uh"',examples:["bug","run","cup","mud","fun"]},
      ],
      tip:"One vowel in the middle = short sound. Say each sound separately — C... A... T — then smash them together: CAT.",
    }
  },
  { id:2, title:"Silent E", icon:"✨", color:"#C084FC", colorDark:"#1A0033", colorBorder:"#6B21A8",
    biome:"THE ENCHANTING FOREST", mob:"Witch 🧙", material:"Magic Wood", materialIcon:"✨",
    realBtn:"✨ ENCHANT IT", mobBtn:"🧙 SUMMON WITCH",
    realWin:"Enchantment stored!", mobWin:"The Witch cackled!",
    questHook:"Deep in the Enchanting Forest, trees glow with magic E runes. These E's are silent — but they change everything behind them.",
    miniLesson:{
      heading:"The Magic E — Silent but Powerful",
      explanation:"When a word ends in E, the E is completely silent. But it reaches back through the word and makes the vowel say its name (the long sound). One silent letter changes everything.",
      rows:[
        {vowel:"A+E",sound:'"ay"',examples:["cake","lake","name","tape","cave"]},
        {vowel:"I+E",sound:'"eye"',examples:["bike","hide","time","vine","fire"]},
        {vowel:"O+E",sound:'"oh"',examples:["hope","note","bone","rope","home"]},
        {vowel:"U+E",sound:'"you"',examples:["cube","mule","tune","cute","rule"]},
      ],
      tip:"Cover the E and read the word. Uncover it — hear it change. The E is magic. It works from the end.",
    }
  },
  { id:3, title:"SH Words", icon:"🌊", color:"#38BDF8", colorDark:"#0C1A2E", colorBorder:"#0369A1",
    biome:"THE OCEAN COAST", mob:"Drowned 🧌", material:"Prismarine", materialIcon:"🌊",
    realBtn:"⚓ CLAIM IT", mobBtn:"🧌 THE DROWNED RISES",
    realWin:"Found on the seafloor!", mobWin:"A Drowned emerged!",
    questHook:"Diving off the Ocean Coast, looking for prismarine on the seafloor. The Drowned are lurking. SH signs mark the safe diving spots.",
    miniLesson:{
      heading:"SH — Two Letters, One Sound",
      explanation:"When S and H meet, they stop making their own sounds and merge into one. You hear SH everywhere near the ocean.",
      rows:[
        {vowel:"SH start",sound:'"shh"',examples:["ship","shop","shell","shark","shore"]},
        {vowel:"SH end",sound:'"shh"',examples:["brush","crush","flash","wish","fish"]},
      ],
      tip:'Put your finger to your lips — that\'s the SH sound. SH...IP. SH...ELL. SH...ARK.',
    }
  },
  { id:4, title:"CH Words", icon:"🔥", color:"#FB923C", colorDark:"#2E0A00", colorBorder:"#9A3412",
    biome:"THE NETHER", mob:"Blaze 🔥", material:"Blaze Rod", materialIcon:"🔥",
    realBtn:"🔥 GRAB THE ROD", mobBtn:"🔥 BLAZE ATTACKS",
    realWin:"Blaze Rod snatched!", mobWin:"The Blaze fired up!",
    questHook:"You've entered the Nether. Blazes are everywhere. CH signs mark the safe paths through the fortress. Read them fast or get burned.",
    miniLesson:{
      heading:"CH — The Nether Sound",
      explanation:"CH makes a sharp sound — like a blaze firing. C and H create a sound neither makes alone.",
      rows:[
        {vowel:"CH start",sound:'"ch"',examples:["chip","chop","chat","chest","charm"]},
        {vowel:"CH end",sound:'"ch"',examples:["lunch","much","rich","bench","torch"]},
      ],
      tip:'Say "ch-ch-ch" like a blaze spinning up. CH...IP. CH...EST. CH...AIN.',
    }
  },
  { id:5, title:"TH Words", icon:"⚡", color:"#818CF8", colorDark:"#0F0A2E", colorBorder:"#4338CA",
    biome:"THE THUNDER PLAINS", mob:"Charged Creeper ⚡", material:"Lightning Rod", materialIcon:"⚡",
    realBtn:"⚡ CONDUCT IT", mobBtn:"⚡ CREEPER CHARGES",
    realWin:"Lightning stored!", mobWin:"Charged Creeper activated!",
    questHook:"A thunderstorm is rolling across the Plains and Creepers are getting struck by lightning. Read the TH signs to find the rods before BOOM.",
    miniLesson:{
      heading:"TH — Tongue Out, Two Ways",
      explanation:"TH is the only English sound that needs your tongue between your teeth. Two versions: soft (no buzz) and hard (with buzz).",
      rows:[
        {vowel:"Soft TH",sound:"just air",examples:["thin","think","three","thumb","thank"]},
        {vowel:"Hard TH",sound:"add voice",examples:["that","this","them","then","there"]},
      ],
      tip:"Stick tongue between teeth and blow. Soft TH = just air. Hard TH = add your voice.",
    }
  },
  { id:6, title:"WH Words", icon:"💨", color:"#94A3B8", colorDark:"#0A0E12", colorBorder:"#334155",
    biome:"THE TRIAL CHAMBERS", mob:"Breeze 💨", material:"Wind Charge", materialIcon:"💨",
    realBtn:"💨 CATCH THE CHARGE", mobBtn:"💨 BREEZE BLOWS PAST",
    realWin:"Wind Charge captured!", mobWin:"The Breeze spun away!",
    questHook:"Inside the Trial Chambers hunting Wind Charges. WH signs are carved into every door. Read them to open the next room.",
    miniLesson:{
      heading:"WH — Wind at the Start",
      explanation:"WH sounds just like W. It shows up on almost every question word in English.",
      rows:[
        {vowel:"Question WH",sound:"like W",examples:["what","where","when","why","which","who"]},
        {vowel:"Action WH",sound:"like W",examples:["whip","whiz","whack","wheel","while"]},
      ],
      tip:'Learn the six question words: WHAT WHERE WHEN WHY WHICH WHO. When you see WH, just say W.',
    }
  },
  { id:7, title:"R-Controlled: AR", icon:"⭐", color:"#F97316", colorDark:"#1E0800", colorBorder:"#9A3412",
    biome:"THE BADLANDS MESA", mob:"Husk 🏜️", material:"Gold Ore", materialIcon:"⭐",
    realBtn:"⛏ MINE THE GOLD", mobBtn:"🏜️ HUSK ATTACKS",
    realWin:"Gold vein struck!", mobWin:"A Husk lurched forward!",
    questHook:"Badlands Mesa, full of exposed gold. Husks patrol the mine shafts. AR signs mark the safe tunnels.",
    miniLesson:{
      heading:"AR — R Kidnaps the Vowel",
      explanation:"When R comes after A, it changes the vowel completely. The A stops saying 'ah' and blends with R into the pirate sound: AR.",
      rows:[{vowel:"AR",sound:'"ar" — like a pirate',examples:["car","star","farm","park","barn","dark","yard"]}],
      tip:'AAARRRR. Now add letters: C-AR. ST-AR. F-AR-M. The R is bossy — it takes over.',
    }
  },
  { id:8, title:"ER, IR, UR", icon:"⚙️", color:"#9CA3AF", colorDark:"#0A0A0A", colorBorder:"#374151",
    biome:"THE DEEP MINE", mob:"Cave Spider 🕷️", material:"Iron Ore", materialIcon:"⚙️",
    realBtn:"⚙️ SMELT THE IRON", mobBtn:"🕷️ SPIDER DROPS",
    realWin:"Iron ingot smelted!", mobWin:"Cave Spider scuttled in!",
    questHook:"Deep in the mine. Cave Spiders guard three tunnels — ER, IR, and UR. All three lead to iron.",
    miniLesson:{
      heading:"ER IR UR — Three Spellings, One Sound",
      explanation:"ER, IR, and UR all make the EXACT SAME SOUND. Three spellings, one sound. Memorize which team each word is on.",
      rows:[
        {vowel:"ER",sound:'"er"',examples:["her","fern","verb","stern"]},
        {vowel:"IR",sound:'"er"',examples:["bird","girl","first","shirt"]},
        {vowel:"UR",sound:'"er"',examples:["burn","hurt","turn","curl"]},
      ],
      tip:"When reading: say 'er' for all three. Three tunnels to the same iron vein.",
    }
  },
  { id:9, title:"R-Controlled: OR", icon:"🏔️", color:"#78909C", colorDark:"#080C10", colorBorder:"#37474F",
    biome:"THE STONY PEAKS", mob:"Mountain Goat 🐐", material:"Copper Ore", materialIcon:"🏔️",
    realBtn:"⛏ BREAK THE COPPER", mobBtn:"🐐 GOAT RAMS YOU",
    realWin:"Copper chunk collected!", mobWin:"The Goat charged!",
    questHook:"Stony Peaks. Mountain Goats will ram you off the edge. OR signs mark the safe ledges.",
    miniLesson:{
      heading:"OR — Round Mouth, Strong Sound",
      explanation:"When R comes after O, they fuse into one round powerful sound.",
      rows:[{vowel:"OR",sound:'"or"',examples:["fork","corn","horn","sport","storm","short"]}],
      tip:'Make your mouth round like an O, let R round it out: OR. F-OR-K. C-OR-N.',
    }
  },
  { id:10, title:"Vowel Teams: AI & AY", icon:"🌧️", color:"#22C55E", colorDark:"#052E16", colorBorder:"#15803D",
    biome:"THE SWAMP BIOME", mob:"Slime 🟩", material:"Slimeball", materialIcon:"🌧️",
    realBtn:"🌧️ COLLECT IT", mobBtn:"🟩 SLIME SPLITS",
    realWin:"Slimeball collected!", mobWin:"The Slime split into two!",
    questHook:"It's raining in the Swamp. AI and AY signs mark which lily pads hold Slimeballs — and which hold Slimes.",
    miniLesson:{
      heading:"AI and AY — Long A, Two Spellings",
      explanation:"AI and AY both say the long A sound. Two vowels together usually make the first one say its name.",
      rows:[
        {vowel:"AI",sound:'"ay"',examples:["rain","train","sail","wait","brain"]},
        {vowel:"AY",sound:'"ay"',examples:["play","say","stay","clay","spray"]},
      ],
      tip:"AI lives in the MIDDLE of words. AY comes at the END. Both say long A.",
    }
  },
  { id:11, title:"Vowel Teams: EE & EA", icon:"🐟", color:"#22D3EE", colorDark:"#001A20", colorBorder:"#0891B2",
    biome:"THE OCEAN MONUMENT", mob:"Guardian 🐟", material:"Prismarine Shard", materialIcon:"🐟",
    realBtn:"🌊 CLAIM THE SHARD", mobBtn:"🐟 GUARDIAN FIRES",
    realWin:"Prismarine shard secured!", mobWin:"The Guardian shoots a laser!",
    questHook:"Raiding the Ocean Monument. Guardians guard every room. EE and EA signs on the treasure chests. Read them before your air runs out.",
    miniLesson:{
      heading:"EE and EA — Long E (Watch Out!)",
      explanation:"EE almost always says long E. EA usually does too — but can also say short E in some words.",
      rows:[
        {vowel:"EE",sound:'"ee" — always',examples:["tree","feet","sleep","green","sheep"]},
        {vowel:"EA (long)",sound:'"ee"',examples:["beach","teach","lean","steam","dream"]},
        {vowel:"EA (short!)",sound:'"eh"',examples:["bread","head","dead","spread"]},
      ],
      tip:"EE is always long E. EA: try long E first. If wrong, try short E.",
    }
  },
  { id:12, title:"Vowel Teams: OA & OW", icon:"🌨️", color:"#94A3B8", colorDark:"#080C14", colorBorder:"#475569",
    biome:"THE SNOWY TUNDRA", mob:"Stray 🏹", material:"Packed Ice", materialIcon:"🌨️",
    realBtn:"🧊 COLLECT THE ICE", mobBtn:"🏹 STRAY FIRES ARROW",
    realWin:"Packed ice collected!", mobWin:"Slowness arrow fired!",
    questHook:"Freezing tundra. Strays fire slowness arrows. OA and OW signs mark safe ice to mine.",
    miniLesson:{
      heading:"OA and OW — Long O, Two Spellings",
      explanation:"OA almost always says long O. OW can say long O OR the 'ow' sound.",
      rows:[
        {vowel:"OA",sound:'"oh"',examples:["boat","coat","road","soap","toast"]},
        {vowel:"OW (long O)",sound:'"oh"',examples:["snow","blow","grow","show","crow"]},
        {vowel:"OW (ow!)",sound:'"ow"',examples:["cow","now","town","crown","down"]},
      ],
      tip:"OA = always long O. OW = try long O first. If wrong, try 'ow.'",
    }
  },
  { id:13, title:"Vowel Teams: OO", icon:"🌕", color:"#A78BFA", colorDark:"#100A1A", colorBorder:"#6D28D9",
    biome:"THE END DIMENSION", mob:"Enderman 👁️", material:"End Stone", materialIcon:"🌕",
    realBtn:"🌕 COLLECT END STONE", mobBtn:"👁️ ENDERMAN STARES",
    realWin:"End stone broken!", mobWin:"The Enderman locked eyes!",
    questHook:"The End. Dark, eerie, covered in Endermen. OO signs float in the air — some long OO (moon above) and some short OO (book in your pack).",
    miniLesson:{
      heading:"OO — Two Sounds in the Same Letters",
      explanation:"OO makes two different sounds. Long OO and short OO. Both spelled OO.",
      rows:[
        {vowel:"Long OO",sound:'"oo" — lips forward',examples:["moon","food","cool","spoon","bloom"]},
        {vowel:"Short OO",sound:'"oo" — relaxed',examples:["book","cook","look","good","wood"]},
      ],
      tip:"Try long OO first. If wrong, try short OO. MOON works. BOOK clicks with short OO.",
    }
  },
  { id:14, title:"OI OY OU OW", icon:"🌿", color:"#4ADE80", colorDark:"#052E16", colorBorder:"#16A34A",
    biome:"THE JUNGLE TEMPLE", mob:"Ocelot 🐆", material:"Bamboo", materialIcon:"🌿",
    realBtn:"🌿 GRAB THE BAMBOO", mobBtn:"🐆 OCELOT POUNCES",
    realWin:"Bamboo collected!", mobWin:"The Ocelot vanished!",
    questHook:"Hacking through the Jungle Temple. OI, OY, OU, and OW signs mark the paths through the vines.",
    miniLesson:{
      heading:"OI OY OU OW — Four Spellings, Two Sounds",
      explanation:"OI and OY both say 'oy.' OU and OW both say 'ow.'",
      rows:[
        {vowel:"OI",sound:'"oy" — middle',examples:["coin","soil","join","point"]},
        {vowel:"OY",sound:'"oy" — end',examples:["boy","toy","joy","royal"]},
        {vowel:"OU",sound:'"ow" — middle',examples:["cloud","shout","found","round"]},
        {vowel:"OW",sound:'"ow" — end',examples:["cow","town","crown","down"]},
      ],
      tip:"OI/OY = 'oy.' OU/OW = 'ow.' OI and OU in the middle. OY and OW at the end.",
    }
  },
  { id:15, title:"FL, SL & BL Blends", icon:"💜", color:"#E879F9", colorDark:"#1A0520", colorBorder:"#A21CAF",
    biome:"THE LUSH CAVE", mob:"Axolotl 🦎", material:"Amethyst Shard", materialIcon:"💜",
    realBtn:"💜 COLLECT THE CRYSTAL", mobBtn:"🦎 AXOLOTL PLAYS DEAD",
    realWin:"Amethyst shard collected!", mobWin:"The Axolotl played dead!",
    questHook:"The Lush Cave — the most beautiful biome underground. Amethyst crystals everywhere. FL, SL, and BL signs glow on the clusters.",
    miniLesson:{
      heading:"L Blends — Fast and Smooth",
      explanation:"A blend is two consonants working together, each keeping its own sound, pushed so fast they almost sound like one.",
      rows:[
        {vowel:"FL",sound:"F+L fast",examples:["flash","flip","flame","flung"]},
        {vowel:"SL",sound:"S+L fast",examples:["slip","slam","sleep","sled"]},
        {vowel:"BL",sound:"B+L fast",examples:["black","bloom","blaze","blast"]},
      ],
      tip:"Say two letters slowly: F... L. Speed up until no gap: FL. Add vowel: FL...ASH. Fast and smooth.",
    }
  },
  { id:16, title:"CR, SP & ST Blends", icon:"🧱", color:"#9CA3AF", colorDark:"#080808", colorBorder:"#4B5563",
    biome:"THE STRONGHOLD", mob:"Silverfish 🐛", material:"Stone Brick", materialIcon:"🧱",
    realBtn:"⛏ MINE THE BRICK", mobBtn:"🐛 SILVERFISH SWARMS",
    realWin:"Stone brick claimed!", mobWin:"Silverfish swarmed!",
    questHook:"You found the Stronghold. Silverfish hide inside the stone bricks. CR, SP, and ST signs mark the safe blocks.",
    miniLesson:{
      heading:"CR SP ST — Fast Attacks",
      explanation:"CR pairs a stop sound with R. SP and ST pair S with a stop sound.",
      rows:[
        {vowel:"CR",sound:"C+R fast",examples:["crab","crash","crack","crush"]},
        {vowel:"SP",sound:"S+P fast",examples:["spin","spot","spark","spell"]},
        {vowel:"ST",sound:"S+T fast",examples:["stop","step","stick","stone"]},
      ],
      tip:"Zip the letters: C-R → CR → CR...ACK. SP...IN. ST...ONE.",
    }
  },
  { id:17, title:"TR, DR & GR Blends", icon:"🌲", color:"#86EFAC", colorDark:"#052E16", colorBorder:"#16A34A",
    biome:"THE DARK OAK FOREST", mob:"Evoker 🧝", material:"Dark Oak Log", materialIcon:"🌲",
    realBtn:"🪓 CHOP THE OAK", mobBtn:"🧝 EVOKER SUMMONS VEXES",
    realWin:"Dark Oak collected!", mobWin:"Vexes incoming!",
    questHook:"Dark Oak Forest. Thick and shadowy. Evokers patrol with Vexes. TR, DR, and GR signs are carved into the bark.",
    miniLesson:{
      heading:"TR DR GR — R Blends Slide",
      explanation:"R loves to slide right into the vowel sound. It almost pulls the vowel toward it.",
      rows:[
        {vowel:"TR",sound:"T+R fast",examples:["trap","trick","tree","trust"]},
        {vowel:"DR",sound:"D+R fast",examples:["drop","drive","drool","drum"]},
        {vowel:"GR",sound:"G+R fast",examples:["grab","green","groom","grow"]},
      ],
      tip:"R blends lean forward. T...R → TR → TR...AP. Let R slide into the vowel.",
    }
  },
  { id:18, title:"3-Letter Blends", icon:"🚀", color:"#DDD6FE", colorDark:"#150A1A", colorBorder:"#7C3AED",
    biome:"THE END CITY", mob:"Shulker 📦", material:"Shulker Shell", materialIcon:"🚀",
    realBtn:"📦 CRACK THE SHELL", mobBtn:"📦 SHULKER FIRES",
    realWin:"Shulker Shell secured!", mobWin:"Homing bullet incoming!",
    questHook:"The End City, floating above the void. Shulkers everywhere. STR, SPL, SPR, and SCR signs float on the towers.",
    miniLesson:{
      heading:"Three-Letter Blends — Expert Mode",
      explanation:"Three consonants in a row, all keeping their sounds, all blending at full speed. You've made it to the End City.",
      rows:[
        {vowel:"STR",sound:"S+T+R",examples:["strap","street","strong","string"]},
        {vowel:"SPL",sound:"S+P+L",examples:["splash","split","splat"]},
        {vowel:"SPR",sound:"S+P+R",examples:["spring","spray","sprint"]},
        {vowel:"SCR",sound:"S+C+R",examples:["scream","scrub","scroll"]},
      ],
      tip:"Build from front. S → ST → STR → STRAP. Three-letter blends are expert level — and you're here.",
    }
  },
  { id:19, title:"FINAL BOSS", icon:"🐉", color:"#F87171", colorDark:"#1A0000", colorBorder:"#991B1B",
    biome:"THE END — DRAGON FIGHT", mob:"Ender Dragon 🐉", material:"Dragon Egg", materialIcon:"🐉",
    realBtn:"⚔️ STRIKE THE DRAGON", mobBtn:"🐉 DRAGON BREATHES FIRE",
    realWin:"Hit! The Dragon screeches!", mobWin:"A void breath attack!",
    questHook:"This is it. The Ender Dragon. All patterns from all biomes appear here. Your entire reading toolkit is the weapon.",
    miniLesson:{
      heading:"Final Boss — Your Full Toolkit",
      explanation:"Every pattern you've learned might appear. Short vowels, Silent E, digraphs, R-controlled vowels, vowel teams, blends — all of it.",
      rows:[
        {vowel:"When it looks hard",sound:"",examples:["stop","breathe","find the pattern"]},
        {vowel:"Check for patterns",sound:"",examples:["vowel team?","R vowel?","blend?","silent E?"]},
        {vowel:"Say it out loud",sound:"",examples:["always","every time","no exceptions"]},
      ],
      tip:"Read the whole word. Look at the vowels first. Find the pattern. You know more than you think. The Dragon doesn't stand a chance.",
    }
  },
];

const WORD_PAIRS = [
  {l:1,w:"cat",r:true},{l:1,w:"bat",r:true},{l:1,w:"map",r:true},{l:1,w:"bed",r:true},{l:1,w:"red",r:true},
  {l:1,w:"sit",r:true},{l:1,w:"hop",r:true},{l:1,w:"bug",r:true},{l:1,w:"fun",r:true},{l:1,w:"cup",r:true},
  {l:1,w:"log",r:true},{l:1,w:"pin",r:true},{l:1,w:"mud",r:true},{l:1,w:"den",r:true},{l:1,w:"net",r:true},
  {l:1,w:"zat",r:false},{l:1,w:"vib",r:false},{l:1,w:"wug",r:false},{l:1,w:"dav",r:false},{l:1,w:"pof",r:false},
  {l:2,w:"cake",r:true},{l:2,w:"lake",r:true},{l:2,w:"name",r:true},{l:2,w:"bike",r:true},{l:2,w:"hide",r:true},
  {l:2,w:"hope",r:true},{l:2,w:"bone",r:true},{l:2,w:"cube",r:true},{l:2,w:"tune",r:true},{l:2,w:"vine",r:true},
  {l:2,w:"cute",r:true},{l:2,w:"rope",r:true},{l:2,w:"tape",r:true},{l:2,w:"vibe",r:true},
  {l:2,w:"zake",r:false},{l:2,w:"wope",r:false},{l:2,w:"fune",r:false},{l:2,w:"treke",r:false},
  {l:3,w:"shop",r:true},{l:3,w:"ship",r:true},{l:3,w:"shell",r:true},{l:3,w:"shark",r:true},{l:3,w:"shook",r:true},
  {l:3,w:"shelf",r:true},{l:3,w:"shine",r:true},{l:3,w:"shout",r:true},{l:3,w:"shed",r:true},{l:3,w:"shore",r:true},
  {l:3,w:"shug",r:false},{l:3,w:"shib",r:false},{l:3,w:"shorf",r:false},{l:3,w:"shult",r:false},
  {l:4,w:"chop",r:true},{l:4,w:"chip",r:true},{l:4,w:"chat",r:true},{l:4,w:"chest",r:true},{l:4,w:"cheer",r:true},
  {l:4,w:"charm",r:true},{l:4,w:"choke",r:true},{l:4,w:"chain",r:true},{l:4,w:"torch",r:true},{l:4,w:"lunch",r:true},
  {l:4,w:"chorg",r:false},{l:4,w:"cheft",r:false},{l:4,w:"chult",r:false},
  {l:5,w:"that",r:true},{l:5,w:"then",r:true},{l:5,w:"this",r:true},{l:5,w:"think",r:true},{l:5,w:"thing",r:true},
  {l:5,w:"thorn",r:true},{l:5,w:"thump",r:true},{l:5,w:"three",r:true},{l:5,w:"threw",r:true},{l:5,w:"thick",r:true},
  {l:5,w:"thorf",r:false},{l:5,w:"thelt",r:false},{l:5,w:"thub",r:false},
  {l:6,w:"whip",r:true},{l:6,w:"whiz",r:true},{l:6,w:"wheel",r:true},{l:6,w:"while",r:true},{l:6,w:"whack",r:true},
  {l:6,w:"when",r:true},{l:6,w:"where",r:true},{l:6,w:"which",r:true},{l:6,w:"what",r:true},{l:6,w:"whiff",r:true},
  {l:6,w:"whub",r:false},{l:6,w:"whork",r:false},{l:6,w:"whelt",r:false},
  {l:7,w:"car",r:true},{l:7,w:"star",r:true},{l:7,w:"farm",r:true},{l:7,w:"park",r:true},{l:7,w:"barn",r:true},
  {l:7,w:"dark",r:true},{l:7,w:"yard",r:true},{l:7,w:"sharp",r:true},{l:7,w:"chart",r:true},{l:7,w:"spark",r:true},
  {l:7,w:"zar",r:false},{l:7,w:"farp",r:false},{l:7,w:"garm",r:false},{l:7,w:"tark",r:false},
  {l:8,w:"her",r:true},{l:8,w:"fern",r:true},{l:8,w:"bird",r:true},{l:8,w:"girl",r:true},{l:8,w:"first",r:true},
  {l:8,w:"shirt",r:true},{l:8,w:"burn",r:true},{l:8,w:"hurt",r:true},{l:8,w:"turn",r:true},{l:8,w:"curl",r:true},
  {l:8,w:"derm",r:false},{l:8,w:"nurg",r:false},{l:8,w:"virl",r:false},
  {l:9,w:"fork",r:true},{l:9,w:"corn",r:true},{l:9,w:"horn",r:true},{l:9,w:"sport",r:true},{l:9,w:"storm",r:true},
  {l:9,w:"short",r:true},{l:9,w:"born",r:true},{l:9,w:"porch",r:true},{l:9,w:"cord",r:true},{l:9,w:"north",r:true},
  {l:9,w:"zork",r:false},{l:9,w:"gorn",r:false},{l:9,w:"torf",r:false},
  {l:10,w:"rain",r:true},{l:10,w:"train",r:true},{l:10,w:"sail",r:true},{l:10,w:"wait",r:true},{l:10,w:"brain",r:true},
  {l:10,w:"play",r:true},{l:10,w:"say",r:true},{l:10,w:"stay",r:true},{l:10,w:"clay",r:true},{l:10,w:"spray",r:true},
  {l:10,w:"zaim",r:false},{l:10,w:"waid",r:false},{l:10,w:"plaim",r:false},
  {l:11,w:"tree",r:true},{l:11,w:"feet",r:true},{l:11,w:"sleep",r:true},{l:11,w:"green",r:true},{l:11,w:"sheep",r:true},
  {l:11,w:"beach",r:true},{l:11,w:"teach",r:true},{l:11,w:"lean",r:true},{l:11,w:"steam",r:true},{l:11,w:"dream",r:true},
  {l:11,w:"dreeg",r:false},{l:11,w:"fleam",r:false},{l:11,w:"neel",r:false},
  {l:12,w:"boat",r:true},{l:12,w:"coat",r:true},{l:12,w:"road",r:true},{l:12,w:"soap",r:true},{l:12,w:"toast",r:true},
  {l:12,w:"snow",r:true},{l:12,w:"blow",r:true},{l:12,w:"grow",r:true},{l:12,w:"show",r:true},{l:12,w:"glow",r:true},
  {l:12,w:"zoam",r:false},{l:12,w:"troad",r:false},{l:12,w:"floam",r:false},
  {l:13,w:"moon",r:true},{l:13,w:"food",r:true},{l:13,w:"cool",r:true},{l:13,w:"spoon",r:true},{l:13,w:"bloom",r:true},
  {l:13,w:"book",r:true},{l:13,w:"cook",r:true},{l:13,w:"look",r:true},{l:13,w:"good",r:true},{l:13,w:"wood",r:true},
  {l:13,w:"doon",r:false},{l:13,w:"fook",r:false},{l:13,w:"gool",r:false},
  {l:14,w:"coin",r:true},{l:14,w:"soil",r:true},{l:14,w:"join",r:true},{l:14,w:"point",r:true},
  {l:14,w:"boy",r:true},{l:14,w:"toy",r:true},{l:14,w:"joy",r:true},{l:14,w:"royal",r:true},
  {l:14,w:"cloud",r:true},{l:14,w:"shout",r:true},{l:14,w:"found",r:true},{l:14,w:"cow",r:true},{l:14,w:"town",r:true},
  {l:14,w:"zoil",r:false},{l:14,w:"foy",r:false},{l:14,w:"troud",r:false},
  {l:15,w:"flash",r:true},{l:15,w:"flip",r:true},{l:15,w:"flame",r:true},{l:15,w:"flung",r:true},
  {l:15,w:"slip",r:true},{l:15,w:"slam",r:true},{l:15,w:"sleep",r:true},{l:15,w:"sled",r:true},
  {l:15,w:"black",r:true},{l:15,w:"bloom",r:true},{l:15,w:"blaze",r:true},{l:15,w:"blast",r:true},
  {l:15,w:"floom",r:false},{l:15,w:"slorp",r:false},{l:15,w:"blurg",r:false},
  {l:16,w:"crab",r:true},{l:16,w:"crash",r:true},{l:16,w:"crack",r:true},{l:16,w:"crush",r:true},
  {l:16,w:"spin",r:true},{l:16,w:"spot",r:true},{l:16,w:"spark",r:true},{l:16,w:"spell",r:true},
  {l:16,w:"stop",r:true},{l:16,w:"step",r:true},{l:16,w:"stick",r:true},{l:16,w:"stone",r:true},
  {l:16,w:"crunk",r:false},{l:16,w:"sporg",r:false},{l:16,w:"stulf",r:false},
  {l:17,w:"trap",r:true},{l:17,w:"trick",r:true},{l:17,w:"tree",r:true},{l:17,w:"troop",r:true},
  {l:17,w:"drop",r:true},{l:17,w:"drive",r:true},{l:17,w:"drool",r:true},{l:17,w:"drum",r:true},
  {l:17,w:"grab",r:true},{l:17,w:"green",r:true},{l:17,w:"groom",r:true},{l:17,w:"grow",r:true},
  {l:17,w:"droom",r:false},{l:17,w:"grulf",r:false},{l:17,w:"trift",r:false},
  {l:18,w:"strap",r:true},{l:18,w:"street",r:true},{l:18,w:"strong",r:true},{l:18,w:"string",r:true},
  {l:18,w:"splash",r:true},{l:18,w:"split",r:true},{l:18,w:"splat",r:true},
  {l:18,w:"spring",r:true},{l:18,w:"spray",r:true},{l:18,w:"sprint",r:true},
  {l:18,w:"scream",r:true},{l:18,w:"scrub",r:true},{l:18,w:"scroll",r:true},
  {l:18,w:"strulp",r:false},{l:18,w:"splorf",r:false},{l:18,w:"screlb",r:false},
  ...["shop","cake","star","rain","tree","boat","coin","flash","trap","strap","bird","moon","that","chip","wheel","hope","play","green","groom","spring","shell","vine","farm","wait","beach","road","joy","slam","scream","street"].map(w=>({l:19,w,r:true})),
  ...["shorg","vake","blorf","graim","bloam","zoil","splam","drorf","strulb"].map(w=>({l:19,w,r:false})),
];

function getPairs(id){return WORD_PAIRS.filter(p=>p.l===id);}
function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

// ── STORAGE HELPERS ──────────────────────────────────────────────────
const DEFAULT_PROGRESS={
  emeralds:0,completed:[],mobs:[],activeId:1,
  sightMastered:{},sightMissed:{},
  fluencyPBs:{},
  enchantMastered:{},
  tntMastered:{},
  compoundMastered:[],
  contractionMastered:[],
  vocabRevealed:{},vocabEarned:{},questDone:{},questEarned:{},
  lastSeen:null,
};
async function sg(key){try{const v=localStorage.getItem(key);return v?JSON.parse(v):null;}catch{return null;}}
async function ss(key,val){try{localStorage.setItem(key,JSON.stringify(val));}catch{}}
async function loadRoster(){return(await sg("wm:roster"))||[];}
async function saveRoster(r){await ss("wm:roster",r);}
async function loadProgress(name){return(await sg(`wm:p:${name}`))||{...DEFAULT_PROGRESS};}
async function saveProgress(name,prog){await ss(`wm:p:${name}`,{...prog,lastSeen:new Date().toISOString()});}

const BASE_CSS=`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Nunito:wght@400;700;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  .px{font-family:'Press Start 2P',monospace}
  .btn{font-family:'Press Start 2P',monospace;font-size:8px;padding:9px 13px;border:none;border-radius:3px;cursor:pointer;letter-spacing:1px;transition:filter .1s,transform .08s;display:inline-flex;align-items:center;gap:6px}
  .btn:active{transform:scale(.96)} .btn:disabled{opacity:.4;cursor:not-allowed}
  .btn-s{background:#111;color:#555;border:2px solid #222}.btn-s:hover{filter:brightness(1.4)}
  .btn-gold{background:#1a1000;color:#FFD700;border:2px solid #FFD700}.btn-gold:hover{filter:brightness(1.2)}
  .inp{background:#050505;border:3px solid #222;border-radius:3px;color:#eee;font-family:'Nunito',sans-serif;font-size:18px;padding:9px 12px;width:100%;outline:none}
  .tabs{display:flex;overflow-x:auto}
  .tab{font-family:'Press Start 2P',monospace;font-size:6px;padding:9px 8px;cursor:pointer;border:none;background:transparent;border-bottom:3px solid transparent;white-space:nowrap}
  .srow{display:flex;align-items:center;gap:10px;padding:8px 12px;background:#050505;border:2px solid #111;border-radius:3px;font-size:13px}
  .eg-chip{display:inline-block;border:2px solid;border-radius:2px;padding:3px 8px;margin:2px;font-size:11px;font-weight:700;letter-spacing:2px;font-family:'Press Start 2P',monospace}
  .lesson-row{display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid #111}
  .lesson-row:last-child{border-bottom:none}
  .lcrd{background:#060606;border:2px solid #111;border-radius:4px;padding:11px;cursor:pointer;transition:all .15s}
  .lcrd:hover:not(.lck){transform:translateY(-2px)}
  .lcrd.lck{opacity:.3;cursor:not-allowed}
  .block-card{border:4px solid;border-radius:2px;padding:22px;text-align:center;font-family:'Press Start 2P',monospace;font-size:24px;letter-spacing:3px;min-height:88px;display:flex;align-items:center;justify-content:center;transition:all .25s}
  .pbar{border:2px solid #222;border-radius:2px;height:11px;overflow:hidden;background:#050505}
  .pfill{height:100%;transition:width 1s linear}
  @keyframes pop{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}
`;

function themeCSS(L){return`
  body{background:radial-gradient(ellipse at 50% 0%,${L.colorDark} 0%,#020202 65%);color:#e0e0e0;font-family:'Nunito',sans-serif;min-height:100vh}
  .glow{color:${L.color};text-shadow:0 0 8px ${L.color},0 0 22px ${L.color}}
  .box{background:#0a0a0a;border:3px solid #1a1a1a;border-radius:4px;box-shadow:0 4px 0 #000}
  .box2{background:#080808;border:3px solid ${L.color};border-radius:4px;box-shadow:0 0 12px ${L.color}44,0 4px 0 #000}
  .btn-g{background:${L.colorDark};color:${L.color};border:2px solid ${L.color}}.btn-g:hover{filter:brightness(1.3)}
  .btn-mob{background:#1a0305;color:#ff6677;border:2px solid #7a1a22}.btn-mob:hover{filter:brightness(1.2)}
  .inp:focus{border-color:${L.color}}
  .tabs{border-bottom:3px solid ${L.colorBorder};background:#040404}
  .tab{color:#333}.tab:hover{color:#888}.tab.on{color:${L.color};border-bottom-color:${L.color}}
  .pfill{background:linear-gradient(90deg,${L.colorDark},${L.color})}
  .lcrd.act{border-color:${L.color}!important;box-shadow:0 0 10px ${L.color}33}
  .eg-chip{border-color:${L.colorBorder};background:${L.colorDark};color:${L.color}}
  .block-card{background:#060606;border-color:${L.colorBorder}}
`;
}

function StarsBg({color}){
  const s=Array.from({length:40},(_,i)=>({l:`${(i*37+13)%100}%`,t:`${(i*61+7)%100}%`,sz:1+i%3,op:.04+((i*7)%18)/100,em:i%7===0}));
  return(<div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
    {s.map((x,i)=><div key={i} style={{position:"absolute",borderRadius:"50%",left:x.l,top:x.t,width:x.sz,height:x.sz,background:x.em?color:"#fff",opacity:x.op}}/>)}
  </div>);
}

function Toast({msg,onDone}){
  useEffect(()=>{if(msg){const t=setTimeout(onDone,2600);return()=>clearTimeout(t);}},[msg,onDone]);
  if(!msg)return null;
  return(<div style={{position:"fixed",top:14,left:"50%",transform:"translateX(-50%)",zIndex:999,animation:"pop .2s ease-out",border:"3px solid currentColor",borderRadius:4,padding:"10px 18px",fontFamily:"'Press Start 2P',monospace",fontSize:8,background:"#0a0a0a",textAlign:"center",maxWidth:"88vw",boxShadow:"0 0 20px #0008"}}>{msg}</div>);
}

function MiniLesson({lesson,onReady}){
  const ml=lesson.miniLesson;
  return(<div>
    <div style={{background:lesson.colorDark,border:`3px solid ${lesson.colorBorder}`,borderRadius:4,padding:"11px 14px",marginBottom:12,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",right:-8,top:-8,fontSize:60,opacity:.07}}>{lesson.icon}</div>
      <div className="px" style={{fontSize:6,color:"#555",marginBottom:2,letterSpacing:2}}>ENTERING BIOME</div>
      <div className="px" style={{fontSize:10,color:lesson.color,marginBottom:3}}>{lesson.biome}</div>
      <div style={{fontSize:12,color:"#666"}}>vs <span style={{color:"#ff6677"}}>{lesson.mob}</span> · mining <span style={{color:lesson.color}}>{lesson.material} {lesson.materialIcon}</span></div>
    </div>
    <div style={{borderLeft:`4px solid #ff6677`,background:"#110303",padding:"10px 13px",borderRadius:"0 4px 4px 0",marginBottom:12,fontSize:14,lineHeight:1.7,fontStyle:"italic"}}>
      <span style={{color:"#ff6677",fontWeight:700,fontStyle:"normal"}}>⚠ QUEST: </span><span style={{color:"#c08080"}}>{lesson.questHook}</span>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:11}}>
      <span style={{fontSize:26}}>{lesson.icon}</span>
      <div>
        <div className="px" style={{fontSize:9,color:lesson.color}}>{ml.heading}</div>
        <div style={{fontSize:12,color:"#444"}}>Read this before you play</div>
      </div>
    </div>
    <div style={{borderLeft:`4px solid ${lesson.color}`,background:"#050505",padding:"10px 13px",borderRadius:"0 4px 4px 0",marginBottom:12,fontSize:15,lineHeight:1.7,color:"#888"}}>{ml.explanation}</div>
    <div className="box" style={{padding:13,marginBottom:11,background:"#040404"}}>
      {ml.rows.map((row,i)=>(
        <div key={i} className="lesson-row">
          <div style={{minWidth:85}}>
            <div className="px" style={{fontSize:8,color:lesson.color,lineHeight:1.7}}>{row.vowel}</div>
            {row.sound&&<div style={{fontSize:11,color:"#444",marginTop:2}}>says {row.sound}</div>}
          </div>
          <div style={{flex:1,display:"flex",flexWrap:"wrap"}}>
            {row.examples.map(ex=><span key={ex} className="eg-chip">{ex}</span>)}
          </div>
        </div>
      ))}
    </div>
    <div style={{background:lesson.colorDark,border:`2px solid ${lesson.colorBorder}`,borderRadius:4,padding:"11px 13px",marginBottom:16}}>
      <div className="px" style={{fontSize:7,color:lesson.color,marginBottom:4}}>💡 TIP</div>
      <div style={{fontSize:14,lineHeight:1.7,color:"#ddd"}}>{ml.tip}</div>
    </div>
    <button className="btn btn-g" style={{padding:"12px 22px",fontSize:9}} onClick={onReady}>⚔️ ENTER BIOME ▶</button>
  </div>);
}

function HUD({name,emeralds,sec,lesson,onLogout}){
  const pct=(sec%900)/900*100;const rem=900-(sec%900);
  return(<div className="box" style={{padding:"9px 13px",marginBottom:9,background:"#040404"}}>
    <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
      <div><div className="px" style={{fontSize:6,color:"#333"}}>BUILDER</div><div style={{fontSize:15,fontWeight:900}}>{name}</div></div>
      {lesson&&<div style={{padding:"0 10px",borderLeft:"2px solid #111"}}>
        <div className="px" style={{fontSize:6,color:"#333"}}>BIOME</div>
        <div style={{fontSize:12,fontWeight:700,color:lesson.color}}>{lesson.icon} {lesson.title}</div>
      </div>}
      <div style={{padding:"0 10px",borderLeft:"2px solid #111",borderRight:"2px solid #111"}}>
        <div className="px" style={{fontSize:6,color:"#333"}}>EMERALDS</div>
        <div className="px glow" style={{fontSize:18}}>💎 {emeralds}</div>
      </div>
      <div style={{flex:1,minWidth:110}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#444",marginBottom:2}}>
          <span>Next emerald</span><span style={{color:lesson?.color||"#4ADE80"}}>{Math.floor(rem/60)}:{String(rem%60).padStart(2,"0")}</span>
        </div>
        <div className="pbar"><div className="pfill" style={{width:`${pct}%`}}/></div>
      </div>
      <button className="btn btn-s" style={{fontSize:6}} onClick={onLogout}>← EXIT</button>
    </div>
  </div>);
}

function LessonsTab({completed,activeId,onSelect}){
  return(<div>
    <div className="px" style={{fontSize:8,color:"#4ADE80",marginBottom:8}}>🗺️ BIOME MAP — 19 WORLDS</div>
    <div style={{borderLeft:"4px solid #4ADE80",background:"#030803",padding:"9px 13px",borderRadius:"0 4px 4px 0",marginBottom:13,fontSize:14,lineHeight:1.7,color:"#4a7a4a"}}>
      <strong style={{color:"#eee"}}>How to use:</strong> Your tutor selects a lesson before each session. Each session starts with a mini lesson about that biome's sound pattern. Complete a biome to unlock the next one.
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8}}>
      {LESSONS.map((l,i)=>{
        const done=completed.includes(l.id);
        const locked=i>0&&!completed.includes(LESSONS[i-1].id);
        const active=activeId===l.id;
        return(<div key={l.id} className={`lcrd ${active?"act":""} ${locked?"lck":""}`}
          style={active?{borderColor:l.color}:{}} onClick={()=>!locked&&onSelect(l.id)}>
          <div style={{fontSize:18,marginBottom:2}}>{l.icon}</div>
          <div className="px" style={{fontSize:6,color:active?l.color:"#3a3a3a",marginBottom:2,lineHeight:1.6}}>
            {done?"✅ ":""}{l.title}</div>
          <div style={{fontSize:10,color:"#333",marginBottom:3}}>{l.biome}</div>
          <div style={{fontSize:10,color:"#6a2020"}}>vs {l.mob}</div>
          {locked&&<div style={{fontSize:9,color:"#1a1a1a",marginTop:4}}>🔒 locked</div>}
          {active&&<div className="px" style={{fontSize:5,color:l.color,marginTop:4}}>▶ ACTIVE</div>}
        </div>);
      })}
    </div>
  </div>);
}

function Craft({activeId,onEarn,onMob,onComplete}){
  const lesson=LESSONS.find(l=>l.id===activeId)||LESSONS[0];
  const [phase,setPhase]=useState("lesson");
  const [deck,setDeck]=useState([]);
  const [card,setCard]=useState(null);
  const [judged,setJudged]=useState(null);
  const [mobInput,setMobInput]=useState("");
  const [showMob,setShowMob]=useState(false);
  const [mobSaved,setMobSaved]=useState(null);
  const [score,setScore]=useState({real:0,mob:0,total:0});
  const [done,setDone]=useState(false);
  const [flash,setFlash]=useState(null);

  useEffect(()=>{setPhase("lesson");setDeck(shuffle(getPairs(lesson.id)));setCard(null);setJudged(null);setShowMob(false);setMobSaved(null);setMobInput("");setScore({real:0,mob:0,total:0});setDone(false);setFlash(null);},[activeId]);

  function draw(){const d=deck.length>0?deck:shuffle(getPairs(lesson.id));setDeck(d.slice(1));setCard(d[0]);setJudged(null);setShowMob(false);setMobSaved(null);setMobInput("");setFlash(null);}

  function judge(asReal){
    const actual=card.r;setScore(s=>({...s,total:s.total+1}));
    if(asReal&&actual){setJudged("right-real");setFlash("good");setScore(s=>({...s,real:s.real+1}));onEarn(1,`${lesson.materialIcon} ${lesson.realWin} +1 EMERALD!`);}
    else if(!asReal&&!actual){setJudged("right-mob");setFlash("good");setScore(s=>({...s,mob:s.mob+1}));setShowMob(true);}
    else if(asReal&&!actual){setJudged("wrong-real");setFlash("bad");}
    else{setJudged("wrong-mob");setFlash("bad");}
  }

  function saveMob(){const name=mobInput.trim()||card.w;setMobSaved(name);setShowMob(false);onMob(name,card.w,lesson.biome);}

  if(phase==="lesson") return <MiniLesson lesson={lesson} onReady={()=>setPhase("play")}/>;

  const wColor=judged==="right-real"?lesson.color:judged==="right-mob"?"#FFD700":judged&&judged.startsWith("wrong")?"#FF4455":"#eee";
  const cBorder=flash==="bad"?"#882233":flash==="good"?lesson.color:lesson.colorBorder;
  const cBg=flash==="good"?lesson.colorDark:flash==="bad"?"#1a0000":"#060606";

  return(<div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:10}}>
      <div><div className="px" style={{fontSize:8,color:lesson.color}}>⚒ CRAFT THE BLOCK</div>
        <div style={{fontSize:11,color:"#444",marginTop:2}}>{lesson.icon} {lesson.biome}</div></div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <div style={{fontSize:12,color:"#555"}}>{lesson.materialIcon} {score.real} · 👾 {score.mob}</div>
        <button className="btn btn-s" style={{fontSize:6}} onClick={()=>setPhase("lesson")}>📖 REVIEW</button>
      </div>
    </div>
    <div style={{borderLeft:`4px solid ${lesson.color}`,background:"#040404",padding:"9px 13px",borderRadius:"0 4px 4px 0",marginBottom:10,fontSize:14,lineHeight:1.7,color:"#666"}}>
      <strong style={{color:"#eee"}}>How to play:</strong> Sound out the word on the block <strong style={{color:"#eee"}}>out loud</strong> before pressing anything. Real word = {lesson.materialIcon} emerald. Mob word = name the creature!
    </div>
    <div className="block-card" style={{marginBottom:10,color:wColor,background:cBg,borderColor:cBorder,
      boxShadow:flash==="good"?`inset 0 0 40px ${lesson.colorDark},0 0 25px ${lesson.color}44`:flash==="bad"?"inset 0 0 30px #1a0000,0 0 15px #ff445522":"none"}}>
      {card?card.w.toUpperCase():<span style={{color:"#1a1a1a",fontSize:13,fontFamily:"'Nunito',sans-serif",fontStyle:"italic"}}>DRAW A CARD TO START</span>}
    </div>
    {judged==="right-real"&&<div style={{textAlign:"center",color:lesson.color,fontSize:15,fontWeight:900,marginBottom:8,textShadow:`0 0 10px ${lesson.color}`}}>{lesson.materialIcon} {lesson.realWin} +1 EMERALD!</div>}
    {judged==="right-mob"&&!showMob&&!mobSaved&&<div style={{textAlign:"center",color:"#FFD700",fontSize:15,fontWeight:900,marginBottom:8}}>👾 {lesson.mobWin} Name it below!</div>}
    {judged==="wrong-real"&&<div style={{textAlign:"center",color:"#FF4455",fontSize:14,fontWeight:700,marginBottom:8}}>That's a mob word! Nice try — draw again.</div>}
    {judged==="wrong-mob"&&<div style={{textAlign:"center",color:"#FF4455",fontSize:14,fontWeight:700,marginBottom:8}}>"{card?.w}" IS a real word! Good try — draw again.</div>}
    {mobSaved&&!showMob&&<div style={{textAlign:"center",marginBottom:8,color:"#FFD700",fontSize:14}}>👾 Added to bestiary: <strong>{mobSaved}</strong></div>}
    {showMob&&(<div className="box" style={{padding:12,marginBottom:10,borderColor:"#FFD700",background:"#0e0800"}}>
      <div style={{fontSize:14,fontWeight:700,marginBottom:6}}>👾 <strong style={{color:"#FFD700"}}>{card?.w.toUpperCase()}</strong> is a new mob! What does it do?</div>
      <input className="inp" placeholder="Give it a name and a power..." value={mobInput} onChange={e=>setMobInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveMob()} style={{marginBottom:8}}/>
      <div style={{display:"flex",gap:8}}>
        <button className="btn btn-gold" onClick={saveMob}>SAVE MOB 👾</button>
        <button className="btn btn-s" onClick={()=>{setShowMob(false);setMobSaved("(unnamed)");onMob("(unnamed)",card?.w||"",lesson.biome);}}>SKIP</button>
      </div>
    </div>)}
    {!showMob&&(<div style={{display:"flex",gap:9,flexWrap:"wrap",alignItems:"center"}}>
      {!card?<button className="btn btn-g" style={{padding:"11px 18px",fontSize:9}} onClick={draw}>🃏 DRAW A WORD BLOCK</button>
        :judged===null?<>
          <button className="btn btn-g" style={{padding:"10px 14px",fontSize:7,flexDirection:"column",alignItems:"center",gap:3}} onClick={()=>judge(true)}><span>✅ REAL WORD</span><span style={{fontSize:5,opacity:0.7}}>{lesson.realBtn}</span></button>
          <button className="btn btn-mob" style={{padding:"10px 14px",fontSize:7,flexDirection:"column",alignItems:"center",gap:3}} onClick={()=>judge(false)}><span>👾 MOB WORD</span><span style={{fontSize:5,opacity:0.7}}>{lesson.mobBtn}</span></button>
        </>:<button className="btn btn-g" onClick={draw}>NEXT BLOCK ▶</button>}
      {score.total>=6&&!done&&<button className="btn btn-gold" style={{marginLeft:"auto"}} onClick={()=>{onComplete(lesson.id,score);setDone(true);}}>LEAVE BIOME ★</button>}
    </div>)}
    {done&&(<div className="box2" style={{marginTop:12,padding:14,textAlign:"center"}}>
      <div className="px glow" style={{fontSize:9,marginBottom:6}}>BIOME COMPLETE! {lesson.icon}</div>
      <div style={{fontSize:14}}>You mined <strong style={{color:lesson.color}}>{score.real}</strong> {lesson.material} blocks and discovered <strong style={{color:"#FFD700"}}>{score.mob}</strong> new mobs.</div>
    </div>)}
  </div>);
}

function Mobs({mobs}){
  return(<div>
    <div className="px" style={{fontSize:8,color:"#4ADE80",marginBottom:8}}>👾 MOB BESTIARY</div>
    {mobs.length===0?<div className="box" style={{padding:36,textAlign:"center",background:"#040404"}}>
      <div style={{fontSize:32,marginBottom:8}}>👾</div>
      <div style={{fontSize:15,color:"#333"}}>The bestiary is empty. Play Craft the Block to discover new mobs!</div>
    </div>:<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:8}}>
      {mobs.map((m,i)=>(<div key={i} className="box" style={{padding:11,background:"#040404",borderColor:"#1a1000"}}>
        <div style={{fontSize:18,marginBottom:3}}>👾</div>
        <div className="px" style={{fontSize:7,color:"#FFD700",marginBottom:3,lineHeight:1.5}}>{m.name}</div>
        <div style={{fontSize:11,color:"#444"}}>word: <span style={{color:"#888"}}>{m.word}</span></div>
        {m.biome&&<div style={{fontSize:10,color:"#222",marginTop:2}}>{m.biome}</div>}
      </div>))}
    </div>}
  </div>);
}

// ── 36 STORY PROBLEMS — one per school week ───────────────────────────────────
const STORIES = [
  // SEPTEMBER — Addition & Subtraction to 20
  { id:1, month:"September", week:1, icon:"🪵", title:"THE FIRST NIGHT",
    difficulty:"⭐",
    text:"You just spawned in a new world. It's your very first day in Minecraft and night is coming FAST.\n\nYou need to collect wood before the sun sets. You chop 6 oak logs from one tree, then 7 logs from another tree nearby.\n\nHow many logs do you have in total?\n\nYou need at least 10 logs to build a small shelter. Do you have enough?",
    answer:"6 + 7 = 13 logs total. Yes — you have enough! You need 10 and you have 13, so you have 3 extra logs.",
    bonus:"How many extra logs do you have after building?",
    bonusAnswer:"13 - 10 = 3 extra logs." },

  { id:2, month:"September", week:2, icon:"🐑", title:"THE SHEEP FARM",
    difficulty:"⭐",
    text:"You're building a sheep farm to get wool for beds. You have 5 white sheep in your pen already.\n\nYou find 4 more sheep wandering in a field and lead them back with wheat. Then a wolf scares 2 of your original sheep away.\n\nHow many sheep do you have now?",
    answer:"Start with 5. Add 4 → 9. Lose 2 → 7 sheep.",
    bonus:"Each sheep gives you 1 wool when you shear it. How many wool blocks do you have after shearing all of them?",
    bonusAnswer:"7 sheep × 1 wool each = 7 wool blocks." },

  { id:3, month:"September", week:3, icon:"🥕", title:"THE CARROT HARVEST",
    difficulty:"⭐",
    text:"You planted a garden with 3 rows of carrots. Each row has 4 carrot plants. A rabbit got into your garden and ate 5 carrots.\n\nHow many carrots do you have left?\n\nYou need 8 carrots to breed your rabbits. Do you have enough?",
    answer:"3 rows × 4 carrots = 12 carrots. Then 12 - 5 = 7 carrots left. You need 8, so NO — you are 1 carrot short.",
    bonus:"How many more carrots do you need to breed your rabbits?",
    bonusAnswer:"8 - 7 = 1 more carrot needed." },

  { id:4, month:"September", week:4, icon:"🧱", title:"THE DIRT HUT UPGRADE",
    difficulty:"⭐",
    text:"Your dirt hut has 4 walls. Each wall needs 8 stone bricks to replace the dirt. You already have 15 stone bricks in your chest.\n\nHow many total stone bricks do you need for all 4 walls?\n\nHow many more do you need to mine?",
    answer:"4 walls × 8 bricks = 32 bricks needed. You have 15, so 32 - 15 = 17 more bricks to mine.",
    bonus:"If you mine 5 bricks per trip to the cave, how many trips do you need?",
    bonusAnswer:"17 ÷ 5 = 3 full trips with 2 left over, so you need 4 trips total." },

  // OCTOBER — Multiplication intro & skip counting
  { id:5, month:"October", week:1, icon:"🕷️", title:"THE CAVE SPIDER NEST",
    difficulty:"⭐⭐",
    text:"Deep in the mine you find a spider spawner. Every 30 seconds it spawns 2 cave spiders.\n\nYou stand back and watch for 3 minutes. How many cave spiders have spawned?\n\nYou need 4 string to make a bow. Each cave spider drops 1 string. How many spiders do you need to defeat?",
    answer:"3 minutes = 6 intervals of 30 seconds. 6 × 2 = 12 cave spiders spawned. You need to defeat 4 spiders for 4 string.",
    bonus:"If you already have 2 string in your inventory, how many spiders do you still need to defeat?",
    bonusAnswer:"4 - 2 = 2 more spiders." },

  { id:6, month:"October", week:2, icon:"🎃", title:"THE PUMPKIN PATCH",
    difficulty:"⭐⭐",
    text:"It's October and you're building a pumpkin farm! You plant pumpkin seeds in 5 rows. Each row has 6 spots.\n\nHow many pumpkin seeds did you plant in total?\n\nPumpkins only grow on half the spots. How many pumpkins do you grow?",
    answer:"5 × 6 = 30 seeds planted. Half of 30 = 15 pumpkins grown.",
    bonus:"Each Jack-o-Lantern needs 1 pumpkin and 1 torch. How many torches do you need to make 15 Jack-o-Lanterns?",
    bonusAnswer:"15 torches — one for each Jack-o-Lantern." },

  { id:7, month:"October", week:3, icon:"🦇", title:"THE BAT CAVE",
    difficulty:"⭐⭐",
    text:"You found a cave full of bats. You count 4 groups of bats hanging from the ceiling. Each group has 8 bats.\n\nHow many bats total?\n\nWhen you run through the cave, half the bats fly away. How many are left?",
    answer:"4 × 8 = 32 bats total. 32 ÷ 2 = 16 bats fly away. 32 - 16 = 16 bats left.",
    bonus:"Bats don't drop anything. But they're good for telling you there's a cave nearby. If you explore 3 more caves and each has 32 bats, how many bats total across all 4 caves?",
    bonusAnswer:"4 caves × 32 bats = 128 bats total." },

  { id:8, month:"October", week:4, icon:"🍄", title:"THE MUSHROOM ISLAND",
    difficulty:"⭐⭐",
    text:"You sailed to a Mushroom Island! You find 7 mooshrooms (mushroom cows).\n\nYou milk each mooshroom with a bowl and get a bowl of mushroom stew. Mushroom stew restores 3 hunger bars.\n\nIf you're missing 15 hunger bars, how many bowls of stew do you need to eat?",
    answer:"15 ÷ 3 = 5 bowls of stew. You have 7 mooshrooms so you can get 7 bowls — more than enough!",
    bonus:"After eating 5 bowls, how many bowls are left over?",
    bonusAnswer:"7 - 5 = 2 bowls left over." },

  // NOVEMBER — Multiplication & Division
  { id:9, month:"November", week:1, icon:"🏹", title:"THE SKELETON ARMY",
    difficulty:"⭐⭐",
    text:"You're defending your base from a skeleton army! There are 24 skeletons in 4 equal groups attacking from different directions.\n\nHow many skeletons are in each group?\n\nYou have 36 arrows. If you shoot 3 arrows at each skeleton, how many skeletons can you defeat?",
    answer:"24 ÷ 4 = 6 skeletons per group. 36 ÷ 3 = 12 skeletons defeated.",
    bonus:"How many skeletons are still left after you use all your arrows?",
    bonusAnswer:"24 - 12 = 12 skeletons still coming." },

  { id:10, month:"November", week:2, icon:"🌾", title:"THE WHEAT TRADE",
    difficulty:"⭐⭐",
    text:"You're trading with a villager farmer. He buys wheat in stacks of 20 and gives you 1 emerald per stack.\n\nYou harvested 85 wheat from your farm. How many full stacks of 20 can you make? How much wheat is left over?\n\nHow many emeralds do you earn?",
    answer:"85 ÷ 20 = 4 full stacks with 5 wheat left over. You earn 4 emeralds.",
    bonus:"Emeralds cost 8 each to buy a bow from the fletcher. How many more emeralds do you need?",
    bonusAnswer:"8 - 4 = 4 more emeralds needed." },

  { id:11, month:"November", week:3, icon:"🛖", title:"THE VILLAGE REBUILD",
    difficulty:"⭐⭐",
    text:"A raid destroyed 6 houses in your village. Each house needs 45 bricks to rebuild.\n\nHow many bricks do you need in total?\n\nYou mine 15 bricks per trip to the quarry. How many trips do you need?",
    answer:"6 × 45 = 270 bricks total. 270 ÷ 15 = 18 trips to the quarry.",
    bonus:"If you bring a friend and they also mine 15 bricks per trip, how many trips does each person need to make?",
    bonusAnswer:"18 trips ÷ 2 people = 9 trips each." },

  { id:12, month:"November", week:4, icon:"🦃", title:"THE FEAST PREP",
    difficulty:"⭐⭐",
    text:"It's Thanksgiving in Minecraft! You're cooking a feast for 8 players on your server.\n\nYou need 3 cooked chicken per player, 2 baked potatoes per player, and 1 pumpkin pie per player.\n\nHow many of each food item do you need total?",
    answer:"Chicken: 8 × 3 = 24 cooked chicken. Potatoes: 8 × 2 = 16 baked potatoes. Pie: 8 × 1 = 8 pumpkin pies.",
    bonus:"Each pumpkin makes 1 pie slice. How many pumpkins do you need?",
    bonusAnswer:"8 pies = 8 pumpkins." },

  // DECEMBER — Larger numbers & money intro
  { id:13, month:"December", week:1, icon:"❄️", title:"THE ICE PALACE",
    difficulty:"⭐⭐⭐",
    text:"You're building an ice palace! The palace needs:\n• 120 blocks of packed ice for the walls\n• 48 blocks of blue ice for the floor\n• 36 ice blocks for the windows\n\nHow many total ice blocks do you need?\n\nYou mine 12 ice blocks per hour. How many hours do you need to mine?",
    answer:"120 + 48 + 36 = 204 total ice blocks. 204 ÷ 12 = 17 hours of mining.",
    bonus:"If you mine for 8 hours today, how many blocks do you still need to mine?",
    bonusAnswer:"8 × 12 = 96 blocks today. 204 - 96 = 108 blocks still needed." },

  { id:14, month:"December", week:2, icon:"🎁", title:"THE GIFT CHESTS",
    difficulty:"⭐⭐⭐",
    text:"You're putting presents in chests for the players on your server. You have 6 players. Each player gets:\n• 5 diamonds\n• 12 iron ingots\n• 3 golden apples\n\nHow many total diamonds, iron ingots, and golden apples do you need?",
    answer:"Diamonds: 6 × 5 = 30. Iron ingots: 6 × 12 = 72. Golden apples: 6 × 3 = 18.",
    bonus:"Each diamond is worth 5 emeralds at a market. What is the total emerald value of all the diamonds?",
    bonusAnswer:"30 diamonds × 5 emeralds = 150 emeralds." },

  { id:15, month:"December", week:3, icon:"⛄", title:"THE SNOW GOLEM ARMY",
    difficulty:"⭐⭐⭐",
    text:"You're building snow golems to protect your base! Each snow golem needs:\n• 2 snow blocks\n• 1 carved pumpkin\n\nYou want to build 15 snow golems.\n\nHow many snow blocks do you need? How many pumpkins? You have 22 snow blocks and 9 pumpkins — can you build all 15?",
    answer:"Snow blocks: 15 × 2 = 30. Pumpkins: 15 × 1 = 15. You have 22 snow blocks (need 30, short by 8) and 9 pumpkins (need 15, short by 6). You cannot build all 15.",
    bonus:"With what you have, how many snow golems CAN you make?",
    bonusAnswer:"22 snow blocks ÷ 2 = 11 golems from snow. 9 pumpkins = 9 golems. The pumpkins are the limit — you can make 9 snow golems." },

  { id:16, month:"December", week:4, icon:"🌟", title:"THE NEW YEAR FIREWORKS",
    difficulty:"⭐⭐⭐",
    text:"You're making fireworks for New Year's Eve! Each firework rocket needs 1 paper, 1 gunpowder, and 1 firework star.\n\nYou have:\n• 23 paper\n• 18 gunpowder\n• 31 firework stars\n\nHow many complete rockets can you make? What limits you?",
    answer:"Paper: 23 rockets. Gunpowder: 18 rockets. Stars: 31 rockets. Gunpowder is the limit — you can make 18 rockets.",
    bonus:"After the fireworks, you're left with leftover materials. How many paper and stars are leftover?",
    bonusAnswer:"Paper: 23 - 18 = 5 leftover. Stars: 31 - 18 = 13 leftover." },

  // JANUARY — Fractions intro
  { id:17, month:"January", week:1, icon:"💎", title:"THE DIAMOND MINE",
    difficulty:"⭐⭐⭐",
    text:"You found a diamond vein with 12 diamonds! You and your friend are mining together.\n\nYou agree to split the diamonds equally. How many does each person get?\n\nYour friend gives you 2 of their diamonds as a thank-you. Now how many do you each have?",
    answer:"12 ÷ 2 = 6 diamonds each. You get 2 more → you have 8. Friend gives away 2 → friend has 4.",
    bonus:"Diamonds are used to make armor. A full set takes 24 diamonds. Between you and your friend, do you have enough to make one full set?",
    bonusAnswer:"8 + 4 = 12 diamonds total. 12 is less than 24 — you don't have enough yet." },

  { id:18, month:"January", week:2, icon:"🍎", title:"THE APPLE ORCHARD",
    difficulty:"⭐⭐⭐",
    text:"You shook oak leaves and collected 24 apples! You want to share them with your village.\n\nYou give 1/2 of the apples to the farmer villager, 1/4 to the librarian, and keep the rest.\n\nHow many apples does each person get? How many do you keep?",
    answer:"1/2 of 24 = 12 apples to farmer. 1/4 of 24 = 6 apples to librarian. 24 - 12 - 6 = 6 apples you keep.",
    bonus:"If you turn your apples into golden apples (each needs 8 gold nuggets), how many gold nuggets do you need?",
    bonusAnswer:"6 × 8 = 48 gold nuggets." },

  { id:19, month:"January", week:3, icon:"🏔️", title:"THE MOUNTAIN EXPEDITION",
    difficulty:"⭐⭐⭐",
    text:"You're climbing the Stony Peaks. The mountain is 200 blocks tall.\n\nYou climb 60 blocks before lunch. After lunch you climb 3/4 of the remaining distance.\n\nHow far did you climb after lunch? How close to the top are you?",
    answer:"After lunch, remaining = 200 - 60 = 140 blocks. 3/4 of 140 = 105 blocks. Total climbed: 60 + 105 = 165 blocks. Remaining: 200 - 165 = 35 blocks to go.",
    bonus:"If you can climb 7 blocks per minute, how many minutes does it take to reach the top from where you stopped?",
    bonusAnswer:"35 ÷ 7 = 5 minutes." },

  { id:20, month:"January", week:4, icon:"⚗️", title:"THE POTION BREWERY",
    difficulty:"⭐⭐⭐",
    text:"You're brewing potions! Your brewing stand can make 3 potions at a time. You have enough ingredients for 30 potions total.\n\nHow many full batches can you brew?\n\nYou give 1/3 of your potions to your friend for helping you gather ingredients. How many potions do you keep?",
    answer:"30 ÷ 3 = 10 batches. 1/3 of 30 = 10 potions to friend. 30 - 10 = 20 potions you keep.",
    bonus:"Strength potions last 3 minutes. If you drink all 20 one after another, how long is your total strength boost in minutes? In hours and minutes?",
    bonusAnswer:"20 × 3 = 60 minutes = 1 hour." },

  // FEBRUARY — Word problems with larger numbers
  { id:21, month:"February", week:1, icon:"❤️", title:"THE HEARTS OF KINDNESS",
    difficulty:"⭐⭐⭐⭐",
    text:"You have 10 hearts (full health). Fighting a group of zombies, you take damage:\n• First zombie hits you for 1.5 hearts\n• Second zombie hits you for 2.5 hearts\n• Third zombie hits you for 1 heart\n\nHow many hearts do you have left? Is it safe to fight more zombies?",
    answer:"Total damage: 1.5 + 2.5 + 1 = 5 hearts of damage. 10 - 5 = 5 hearts remaining. With 5 hearts left, more fighting is risky.",
    bonus:"You eat a golden apple that restores 2 hearts. But your max is 10. If you had 5 hearts left, how many hearts after eating?",
    bonusAnswer:"5 + 2 = 7 hearts." },

  { id:22, month:"February", week:2, icon:"🏗️", title:"THE MEGA BUILD",
    difficulty:"⭐⭐⭐⭐",
    text:"You're building the BIGGEST house you've ever made: 15 blocks wide, 10 blocks deep, and 8 blocks tall.\n\nTo find how many blocks you need for just the 4 outer walls (not the roof or floor), you need to calculate the perimeter and multiply by the height.\n\nThe perimeter of a rectangle is 2 × (length + width). What's the perimeter? How many wall blocks total?",
    answer:"Perimeter: 2 × (15 + 10) = 2 × 25 = 50 blocks around the outside. 50 × 8 = 400 wall blocks.",
    bonus:"The roof needs 15 × 10 = 150 blocks. The floor also needs 150. How many total blocks for the whole structure?",
    bonusAnswer:"400 walls + 150 roof + 150 floor = 700 blocks total." },

  { id:23, month:"February", week:3, icon:"🐠", title:"THE AQUARIUM",
    difficulty:"⭐⭐⭐⭐",
    text:"You're building a giant aquarium! You caught:\n• 8 clownfish\n• 6 salmon\n• 12 tropical fish\n• 4 pufferfish\n\nHow many fish total?\n\nYou release 1/4 of the total back into the ocean because your tank is getting crowded. How many fish do you keep?",
    answer:"8 + 6 + 12 + 4 = 30 fish total. 1/4 of 30 = 7.5 — round down to 7 (you can't release half a fish). Keep 30 - 7 = 23 fish.",
    bonus:"Pufferfish are poisonous to the other fish. If each pufferfish harms 3 other fish, how many fish total are harmed?",
    bonusAnswer:"4 pufferfish × 3 = 12 fish harmed." },

  { id:24, month:"February", week:4, icon:"💌", title:"THE MESSAGE IN A BOTTLE",
    difficulty:"⭐⭐⭐⭐",
    text:"You wrote 48 notes and put them in bottles to send across the server's ocean.\n\nIf you send the same number of bottles from each of 6 different beaches, how many do you send from each beach?\n\nA dolphin retrieves 1/3 of all the bottles and brings them back. How many bottles come back?",
    answer:"48 ÷ 6 = 8 bottles per beach. 1/3 of 48 = 16 bottles returned by dolphins.",
    bonus:"How many bottles are still drifting in the ocean?",
    bonusAnswer:"48 - 16 = 32 bottles still drifting." },

  // MARCH — Geometry & measurement
  { id:25, month:"March", week:1, icon:"🌱", title:"THE SPRING GARDEN",
    difficulty:"⭐⭐⭐⭐",
    text:"Spring is here! You're planting a garden in a fenced area that is 12 blocks long and 8 blocks wide.\n\nWhat is the area of your garden? What is the perimeter (amount of fencing you need)?\n\nYou want to divide the garden into 4 equal sections for different crops. What is the area of each section?",
    answer:"Area: 12 × 8 = 96 square blocks. Perimeter: 2 × (12 + 8) = 40 blocks of fence. Each section: 96 ÷ 4 = 24 square blocks.",
    bonus:"If each square block grows 2 food items, how much food does the whole garden produce?",
    bonusAnswer:"96 × 2 = 192 food items." },

  { id:26, month:"March", week:2, icon:"🚀", title:"THE ROCKET TO THE MOON",
    difficulty:"⭐⭐⭐⭐",
    text:"You're using an Elytra and firework rockets to fly across the map! The map is 3,000 blocks from edge to edge.\n\nEach firework boost sends you 150 blocks forward. How many rockets do you need to cross the whole map?\n\nYou have 18 rockets. How far can you travel?",
    answer:"3,000 ÷ 150 = 20 rockets needed. With 18 rockets: 18 × 150 = 2,700 blocks traveled.",
    bonus:"How many blocks short of the other side will you be?",
    bonusAnswer:"3,000 - 2,700 = 300 blocks short." },

  { id:27, month:"March", week:3, icon:"🏰", title:"THE CASTLE MOAT",
    difficulty:"⭐⭐⭐⭐",
    text:"You're digging a moat around your castle! The castle is a square that is 20 blocks on each side. The moat is 3 blocks wide all the way around.\n\nThe outer edge of the moat makes a bigger square. How long is each side of the outer square?\n\nHow many blocks of water do you need to fill the moat? (The moat is 1 block deep.)",
    answer:"Outer square: 20 + 3 + 3 = 26 blocks per side. Outer area: 26 × 26 = 676. Inner area: 20 × 20 = 400. Moat area: 676 - 400 = 276 water blocks.",
    bonus:"The moat is actually 2 blocks deep. How many water blocks total?",
    bonusAnswer:"276 × 2 = 552 water blocks." },

  { id:28, month:"March", week:4, icon:"🗺️", title:"THE TREASURE MAP",
    difficulty:"⭐⭐⭐⭐",
    text:"You found a treasure map! The map shows the treasure is:\n• 350 blocks North\n• 120 blocks East\n• Then 200 blocks North again\n• Then 80 blocks West\n\nHow far North are you from where you started?\n\nHow far East are you from where you started?",
    answer:"North: 350 + 200 = 550 blocks North total. East-West: 120 East then 80 West = 120 - 80 = 40 blocks East of start.",
    bonus:"If you could fly in a straight line from start to treasure, about how far is it? (You can use rough estimation.)",
    bonusAnswer:"Roughly: 550 blocks North, 40 blocks East — the straight-line distance is about 551 blocks (mostly North)." },

  // APRIL — Multi-step word problems
  { id:29, month:"April", week:1, icon:"🌧️", title:"THE RAIN COLLECTOR",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"You built a system to collect rainwater in cauldrons. Each cauldron holds 3 water levels. You have 15 cauldrons.\n\nAfter a full rainstorm, 2/3 of your cauldrons are completely full. The rest are half full (1.5 water levels).\n\nHow many water levels do you have in total?",
    answer:"Full cauldrons: 2/3 of 15 = 10 cauldrons × 3 = 30 water levels. Half-full: 5 cauldrons × 1.5 = 7.5 water levels. Total: 30 + 7.5 = 37.5 water levels.",
    bonus:"Each water bucket holds 1 water level. How many full buckets can you fill?",
    bonusAnswer:"37.5 → 37 full buckets (can't fill half a bucket)." },

  { id:30, month:"April", week:2, icon:"🐣", title:"THE CHICKEN COOP",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"Your chickens lay eggs every 5 minutes. You have 8 chickens.\n\nIn one hour (60 minutes), how many eggs does each chicken lay? How many eggs total do all 8 chickens lay?\n\nYou throw each egg and there's a 1 in 8 chance of a chick hatching. If you throw all your eggs, about how many chicks do you expect?",
    answer:"Per chicken: 60 ÷ 5 = 12 eggs. Total: 8 × 12 = 96 eggs. Expected chicks: 96 ÷ 8 = 12 chicks.",
    bonus:"Baby chicks take 20 minutes to grow up. How long do you wait for 12 chicks to become adult chickens?",
    bonusAnswer:"All chicks grow at the same time — just 20 minutes." },

  { id:31, month:"April", week:3, icon:"🌊", title:"THE FISHING TOURNAMENT",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"You're in a fishing tournament! The scoring is:\n• Cod = 1 point\n• Salmon = 2 points\n• Tropical fish = 3 points\n• Pufferfish = 5 points\n• Enchanted book (treasure) = 10 points\n\nYou catch: 6 cod, 4 salmon, 2 tropical fish, 1 pufferfish, and 1 enchanted book.\n\nWhat is your total score?",
    answer:"Cod: 6×1=6. Salmon: 4×2=8. Tropical: 2×3=6. Puffer: 1×5=5. Book: 1×10=10. Total: 6+8+6+5+10 = 35 points.",
    bonus:"Your friend scored 28 points. By how many points did you win?",
    bonusAnswer:"35 - 28 = 7 points." },

  { id:32, month:"April", week:4, icon:"🌺", title:"THE FLOWER MARKET",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"You're selling flowers to villagers at your market. Your prices:\n• Dandelion = 1 emerald each\n• Poppy = 2 emeralds each\n• Blue Orchid = 3 emeralds each\n• Allium = 4 emeralds each\n\nA customer wants: 5 dandelions, 3 poppies, 2 blue orchids, and 1 allium. What do they owe you?",
    answer:"5×1=5, 3×2=6, 2×3=6, 1×4=4. Total: 5+6+6+4 = 21 emeralds.",
    bonus:"They pay with 25 emeralds. How much change do they get back?",
    bonusAnswer:"25 - 21 = 4 emeralds change." },

  // MAY — Challenge problems
  { id:33, month:"May", week:1, icon:"🏆", title:"THE RAID DEFENSE",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"A raid is coming in 3 waves.\n\n• Wave 1: 8 pillagers and 4 vindicators\n• Wave 2: 12 pillagers and 6 vindicators and 2 witches\n• Wave 3: 6 pillagers and 8 vindicators and 4 witches and 1 ravager\n\nHow many enemies total in the whole raid?\n\nYou have 90 arrows. You plan to use 2 arrows on each pillager and 3 arrows on each vindicator. Do you have enough for waves 1 and 2?",
    answer:"Total: (8+12+6)=26 pillagers, (4+6+8)=18 vindicators, (2+4)=6 witches, 1 ravager. Total = 26+18+6+1 = 51 enemies.\n\nWaves 1&2: (8+12)=20 pillagers × 2 = 40 arrows. (4+6)=10 vindicators × 3 = 30 arrows. Total = 70 arrows. You have 90 — yes!",
    bonus:"After waves 1 and 2, how many arrows do you have left for wave 3?",
    bonusAnswer:"90 - 70 = 20 arrows remaining." },

  { id:34, month:"May", week:2, icon:"⚡", title:"THE LIGHTNING ROD NETWORK",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"You're building a lightning rod network to protect a village of 24 houses. Each lightning rod protects a circle with a radius of 4 blocks.\n\nThe houses are spread across a 40×40 block area.\n\nYou place lightning rods in a grid pattern, 8 blocks apart. How many rods do you need to cover the grid? (Think about how many rods fit in each row and column.)",
    answer:"40 ÷ 8 = 5 spaces → 6 rods per row. 6 rods per column. 6 × 6 = 36 lightning rods total for a 40×40 area.",
    bonus:"Each lightning rod costs 3 copper ingots. How many copper ingots total?",
    bonusAnswer:"36 × 3 = 108 copper ingots." },

  { id:35, month:"May", week:3, icon:"🌙", title:"THE NIGHTLY SURVIVAL",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"In Minecraft, nighttime lasts 7 minutes. In that time, you need to fight off monsters.\n\nEvery minute, 3 zombies and 2 skeletons spawn near your base. After 7 minutes, how many zombies have spawned? How many skeletons?\n\nYou earn 1 emerald for every 5 enemies you defeat. If you defeat all of them, how many emeralds do you earn?",
    answer:"Zombies: 7 × 3 = 21. Skeletons: 7 × 2 = 14. Total enemies: 21 + 14 = 35. Emeralds: 35 ÷ 5 = 7 emeralds.",
    bonus:"Daytime is 10 minutes long. How many total Minecraft days pass in a real hour if one full day/night cycle = 17 minutes?",
    bonusAnswer:"60 ÷ 17 ≈ 3.5 — about 3 full days and part of a 4th." },

  { id:36, month:"May", week:4, icon:"🐉", title:"THE ENDER DRAGON FINALE",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"FINAL STORY PROBLEM! You're fighting the Ender Dragon.\n\nThe Dragon has 200 health points. It heals from 10 End Crystals — each crystal heals the Dragon for 5 health per second while active.\n\nYou destroy 6 crystals in the first minute. How many healing points did those 6 crystals give the Dragon during that first minute (before you destroyed them)? Assume each was active for 30 seconds on average.\n\nAfter destroying 6 crystals, how many are left healing the Dragon?",
    answer:"6 crystals × 5 health per second × 30 seconds = 900 total healing points given to the Dragon before you destroyed them.\n\n10 - 6 = 4 crystals still active.",
    bonus:"Your sword does 8 damage per hit. The Dragon has 200 HP. If the Dragon didn't regenerate, how many hits to defeat it?",
    bonusAnswer:"200 ÷ 8 = 25 hits exactly." },

  // ── SEPTEMBER SET B ─────────────────────────────────────────────────────────
  { id:37, month:"September", week:1, icon:"🌅", title:"THE SUNRISE SPRINT",
    difficulty:"⭐",
    text:"You spawned in a new world and the sun is rising. You have exactly 10 minutes of daylight before monsters start appearing at dusk.\n\nYou spend 3 minutes punching wood, 4 minutes building a shelter frame, and the rest collecting dirt to fill the walls.\n\nHow many minutes do you spend collecting dirt?\n\nIf you collect 6 dirt blocks per minute, how many dirt blocks do you have?",
    answer:"10 - 3 - 4 = 3 minutes collecting dirt. 3 × 6 = 18 dirt blocks.",
    bonus:"Your shelter needs 20 dirt blocks for the walls. Do you have enough? How many are you short?",
    bonusAnswer:"You need 20 but have 18. You are 2 blocks short." },

  { id:38, month:"September", week:2, icon:"🐄", title:"THE COW ROUNDUP",
    difficulty:"⭐",
    text:"You are trying to build a cow farm. You find 3 cows in the forest and 5 cows near a river.\n\nYou lead them all back with wheat. But on the way home, 2 cows wander into a swamp and get lost.\n\nHow many cows make it to your farm?\n\nEach cow gives you 2 pieces of leather when defeated. If you keep all your cows alive, how much leather can you get if you ever need it?",
    answer:"3 + 5 = 8 cows found. 8 - 2 = 6 cows make it home. 6 cows × 2 leather = 12 leather.",
    bonus:"Leather armor needs 24 pieces total for a full set. How many cows would you need to defeat?",
    bonusAnswer:"24 ÷ 2 = 12 cows." },

  { id:39, month:"September", week:3, icon:"🌻", title:"THE SUNFLOWER PLAINS",
    difficulty:"⭐",
    text:"You found a sunflower plains biome! There are sunflowers growing in 4 rows. Each row has 9 sunflowers.\n\nHow many sunflowers total?\n\nYou pick every other sunflower (every 2nd one) so the rest can keep growing. How many do you pick?",
    answer:"4 rows × 9 = 36 sunflowers total. Every other one: 36 ÷ 2 = 18 sunflowers picked.",
    bonus:"Sunflowers give yellow dye. If each sunflower gives 2 dye, how many yellow dye do you collect?",
    bonusAnswer:"18 × 2 = 36 yellow dye." },

  { id:40, month:"September", week:4, icon:"🔥", title:"THE FURNACE FACTORY",
    difficulty:"⭐",
    text:"You set up 4 furnaces to smelt iron ore into iron ingots. Each furnace can smelt 8 iron ore per load of coal.\n\nYou have 40 iron ore and 5 coal. Each piece of coal fuels one furnace load.\n\nHow many furnace loads can you run? How many iron ingots do you smelt in total?",
    answer:"5 coal = 5 furnace loads. Each load smelts 8 ore → 8 ingots. 5 × 8 = 40 ingots. (You have exactly enough ore — perfect!)",
    bonus:"Iron ingots are used to make iron armor. Boots need 4, leggings need 7, chestplate needs 8, helmet needs 5. How many ingots for a full iron set?",
    bonusAnswer:"4 + 7 + 8 + 5 = 24 ingots." },

  // ── OCTOBER SET B ───────────────────────────────────────────────────────────
  { id:41, month:"October", week:1, icon:"🕯️", title:"THE DARK MINE",
    difficulty:"⭐⭐",
    text:"You're exploring a dark cave. You place torches every 8 blocks to keep it lit so monsters don't spawn.\n\nThe cave tunnel is 96 blocks long. How many torches do you need to light the whole tunnel?\n\nYou have 15 torches in your inventory. Do you have enough?",
    answer:"96 ÷ 8 = 12 torches needed. You have 15. Yes — you have 3 extra!",
    bonus:"Each torch uses 1 stick and 1 coal. How many sticks and coal do you need to craft 12 torches?",
    bonusAnswer:"12 sticks and 12 coal." },

  { id:42, month:"October", week:2, icon:"💀", title:"THE WITHER SKULL COUNT",
    difficulty:"⭐⭐",
    text:"To spawn the Wither boss, you need 3 Wither Skeleton Skulls. Each Wither Skeleton has a 1 in 40 chance of dropping a skull.\n\nYou defeat 80 Wither Skeletons. About how many skulls do you expect to get?\n\nDo you have enough to spawn the Wither?",
    answer:"80 ÷ 40 = 2 skulls expected. You need 3, so probably NOT enough — you may need to keep fighting.",
    bonus:"You need 1 more skull. If you defeat 40 more, how many total skeletons have you defeated, and how many skulls do you now likely have?",
    bonusAnswer:"80 + 40 = 120 skeletons total. 120 ÷ 40 = 3 skulls expected. Enough!" },

  { id:43, month:"October", week:3, icon:"🌕", title:"THE FULL MOON FARM",
    difficulty:"⭐⭐",
    text:"In Minecraft, a full moon makes more slimes spawn. On a normal night, 6 slimes spawn in your swamp. On a full moon, 3 times as many spawn.\n\nThe moon cycle is 8 days. So 1 out of every 8 nights is a full moon.\n\nIn 24 nights, how many full moons happen? How many extra slimes do you get on those full moon nights?",
    answer:"24 ÷ 8 = 3 full moons. On full moon: 6 × 3 = 18 slimes. Extra slimes: 18 - 6 = 12 extra slimes per full moon. 3 full moons × 12 extra = 36 extra slimes.",
    bonus:"Each slime drops 0-2 slimeballs (average 1). If you fight all the slimes on the 3 full moon nights, about how many slimeballs do you collect?",
    bonusAnswer:"3 nights × 18 slimes × 1 ball each = 54 slimeballs." },

  { id:44, month:"October", week:4, icon:"🍂", title:"THE AUTUMN HARVEST",
    difficulty:"⭐⭐",
    text:"Your autumn farm has 5 different crops:\n• Wheat: 18 harvested\n• Potatoes: 24 harvested\n• Carrots: 30 harvested\n• Beetroot: 12 harvested\n• Pumpkins: 9 harvested\n\nHow many total crops did you harvest?\n\nYou want to put equal amounts of each crop into 3 chests. Can you divide them equally? Which crops divide evenly by 3?",
    answer:"Total: 18+24+30+12+9 = 93 crops. Divides evenly by 3: Wheat (18÷3=6 ✓), Potatoes (24÷3=8 ✓), Carrots (30÷3=10 ✓), Beetroot (12÷3=4 ✓), Pumpkins (9÷3=3 ✓). All of them divide evenly!",
    bonus:"How many of each crop goes in each chest?",
    bonusAnswer:"Wheat: 6, Potatoes: 8, Carrots: 10, Beetroot: 4, Pumpkins: 3." },

  // ── NOVEMBER SET B ──────────────────────────────────────────────────────────
  { id:45, month:"November", week:1, icon:"🏺", title:"THE ANCIENT CITY",
    difficulty:"⭐⭐",
    text:"You found an Ancient City deep underground. It has 5 loot chests. You open each chest and find:\n• Chest 1: 3 echo shards\n• Chest 2: 7 echo shards\n• Chest 3: 2 echo shards\n• Chest 4: 5 echo shards\n• Chest 5: 4 echo shards\n\nHow many echo shards total?\n\nA disc fragment is worth 3 echo shards in trade. How many trades can you make?",
    answer:"3+7+2+5+4 = 21 echo shards. 21 ÷ 3 = 7 trades.",
    bonus:"After 7 trades, how many echo shards are left?",
    bonusAnswer:"21 - (7×3) = 21 - 21 = 0 left — used them all exactly." },

  { id:46, month:"November", week:2, icon:"🛡️", title:"THE ARMOR STAND SHOP",
    difficulty:"⭐⭐",
    text:"You're opening an armor shop in your village. You have:\n• 5 iron helmets (worth 4 emeralds each)\n• 3 iron chestplates (worth 7 emeralds each)\n• 4 iron leggings (worth 6 emeralds each)\n• 6 iron boots (worth 3 emeralds each)\n\nWhat is the total value of your armor stock in emeralds?",
    answer:"Helmets: 5×4=20. Chestplates: 3×7=21. Leggings: 4×6=24. Boots: 6×3=18. Total: 20+21+24+18 = 83 emeralds.",
    bonus:"A customer buys 2 helmets, 1 chestplate, and 2 boots. How much do they pay?",
    bonusAnswer:"2×4 + 1×7 + 2×3 = 8+7+6 = 21 emeralds." },

  { id:47, month:"November", week:3, icon:"🗡️", title:"THE SWORD ENCHANTMENT",
    difficulty:"⭐⭐",
    text:"You're enchanting swords for your team. Each sword needs 30 experience levels to get the best enchantment.\n\nYou have 5 players on your team. How many total experience levels do you need for everyone?\n\nYou earn 3 experience levels per enemy defeated. How many enemies does the whole team need to defeat?",
    answer:"5 players × 30 levels = 150 experience levels needed. 150 ÷ 3 = 50 enemies to defeat.",
    bonus:"If each player fights equally, how many enemies does each player need to defeat?",
    bonusAnswer:"50 ÷ 5 = 10 enemies per player." },

  { id:48, month:"November", week:4, icon:"🍖", title:"THE FOOD SUPPLY",
    difficulty:"⭐⭐",
    text:"Your hunger bar has 20 hunger points (10 food icons, each worth 2 points). You are at 12 hunger points.\n\nYou eat:\n• A cooked porkchop (restores 8 points)\n• A cookie (restores 2 points)\n\nBut you can't go above 20. How many hunger points are you at after eating both? Did any food get wasted?",
    answer:"12 + 8 = 20 (porkchop fills you up). Then eating the cookie: already full at 20, so the cookie's 2 points are wasted.",
    bonus:"How many hunger points were wasted on the cookie?",
    bonusAnswer:"All 2 points were wasted — you were already full." },

  // ── DECEMBER SET B ──────────────────────────────────────────────────────────
  { id:49, month:"December", week:1, icon:"🌨️", title:"THE POWDER SNOW TRAP",
    difficulty:"⭐⭐⭐",
    text:"You're building a powder snow trap for griefers on your server! The trap area is 6 blocks wide and 6 blocks long.\n\nYou fill it with powder snow 2 blocks deep. How many powder snow blocks do you need?\n\nEach powder snow bucket fills exactly 1 block. You have 60 buckets. Is that enough?",
    answer:"6 × 6 = 36 blocks of floor area. 36 × 2 (deep) = 72 powder snow blocks needed. You only have 60 buckets — not enough! You need 12 more.",
    bonus:"How many more buckets do you need to complete the trap?",
    bonusAnswer:"72 - 60 = 12 more buckets." },

  { id:50, month:"December", week:2, icon:"🎶", title:"THE JUKEBOX COLLECTION",
    difficulty:"⭐⭐⭐",
    text:"You're collecting all 15 music discs in Minecraft. You already have 6.\n\nDiscs can be found by: killing skeletons that shoot creepers, trading with piglins, or finding them in chests.\n\nYou find 3 more in dungeon chests, trade for 2 with piglins, and get 1 from a skeleton-creeper kill.\n\nHow many total discs do you now have? How many are still missing?",
    answer:"6 + 3 + 2 + 1 = 12 discs. 15 - 12 = 3 discs still missing.",
    bonus:"Each disc trade with piglins costs you 1 gold ingot. You made 2 trades. How many gold ingots did you spend?",
    bonusAnswer:"2 gold ingots." },

  { id:51, month:"December", week:3, icon:"🏔️", title:"THE SKY BRIDGE",
    difficulty:"⭐⭐⭐",
    text:"You're building a sky bridge between two mountain peaks. The gap between the mountains is 75 blocks.\n\nYou build 3 blocks at a time before stopping to place a support pillar going down 20 blocks.\n\nHow many times do you stop to place a support pillar on the way across?\n\nHow many pillar blocks do you place in total?",
    answer:"75 ÷ 3 = 25 stops for pillars. 25 × 20 = 500 pillar blocks.",
    bonus:"The bridge itself uses 75 blocks of stone and 500 blocks for pillars. How many total blocks does the whole structure use?",
    bonusAnswer:"75 + 500 = 575 blocks." },

  { id:52, month:"December", week:4, icon:"✨", title:"THE BEACON PYRAMID",
    difficulty:"⭐⭐⭐",
    text:"You're building a Beacon pyramid! The pyramid layers need:\n• Level 1 (bottom): 9 iron blocks\n• Level 2: 25 iron blocks\n• Level 3: 49 iron blocks\n• Level 4 (top): 81 iron blocks\n\nHow many iron blocks total for the full 4-layer pyramid?\n\nEach iron block is made of 9 iron ingots. How many iron ingots total?",
    answer:"9+25+49+81 = 164 iron blocks. 164 × 9 = 1,476 iron ingots.",
    bonus:"Your iron farm produces 100 iron ingots per hour. How many hours until you have enough ingots?",
    bonusAnswer:"1,476 ÷ 100 = 14.76 hours — about 15 hours." },

  // ── JANUARY SET B ───────────────────────────────────────────────────────────
  { id:53, month:"January", week:1, icon:"🧊", title:"THE FROZEN RIVER",
    difficulty:"⭐⭐⭐",
    text:"A river near your base froze over completely in the cold snap. The frozen river is 80 blocks long and 12 blocks wide.\n\nHow many ice blocks cover the surface?\n\nYou skate across at 2 times your normal walking speed. If you normally walk 4 blocks per second, how fast do you skate? How long does it take to cross the 80-block river?",
    answer:"Surface: 80 × 12 = 960 ice blocks. Skating speed: 4 × 2 = 8 blocks per second. Crossing time: 80 ÷ 8 = 10 seconds.",
    bonus:"It takes 30 seconds to walk the same 80 blocks. How many seconds faster is skating?",
    bonusAnswer:"30 - 10 = 20 seconds faster." },

  { id:54, month:"January", week:2, icon:"🏹", title:"THE ARCHERY RANGE",
    difficulty:"⭐⭐⭐",
    text:"You set up an archery range to practice. You shoot at 5 targets that are 10, 20, 30, 40, and 50 blocks away.\n\nYou score points based on how far the target is: 1 point per 10 blocks of distance. So the closest target is worth 1 point, and the farthest is worth 5.\n\nIf you hit every target once, what is your total score?\n\nIf you hit the 50-block target twice and miss all others, what is that score?",
    answer:"All targets once: 1+2+3+4+5 = 15 points. Only the 50-block target twice: 5+5 = 10 points.",
    bonus:"Which gives a higher score? By how much?",
    bonusAnswer:"All targets: 15 points. Just the far target twice: 10 points. Hitting all targets wins by 5 points." },

  { id:55, month:"January", week:3, icon:"🐺", title:"THE WOLF PACK",
    difficulty:"⭐⭐⭐",
    text:"You tamed wolves to protect your base! You have 12 tamed wolves.\n\nEach wolf has 20 health points. A pack of zombies attacks and each zombie deals 2 damage per hit to the wolves.\n\nIf each wolf gets hit 4 times before scaring the zombie away, how much total damage did your wolf pack take?\n\nHow many total health points does your wolf pack have left?",
    answer:"Damage per wolf: 2 × 4 = 8 damage. Total damage: 12 wolves × 8 = 96 damage. Starting HP: 12 × 20 = 240. Remaining: 240 - 96 = 144 HP total.",
    bonus:"Raw chicken restores 4 HP per wolf. How many raw chickens do you need to fully heal all 12 wolves?",
    bonusAnswer:"Each wolf lost 8 HP. 12 × 8 = 96 HP to restore. 96 ÷ 4 = 24 raw chickens." },

  { id:56, month:"January", week:4, icon:"📦", title:"THE STORAGE SYSTEM",
    difficulty:"⭐⭐⭐",
    text:"You're organizing your storage room. You have 8 double chests. Each double chest holds 54 item stacks. Each stack holds up to 64 items.\n\nWhat is the maximum number of item stacks in your whole storage room?\n\nYou fill 3/4 of all stacks with cobblestone. How many cobblestone stacks do you have?",
    answer:"8 × 54 = 432 total stacks. 3/4 of 432 = 324 cobblestone stacks.",
    bonus:"How many individual cobblestone blocks is that if each stack is full at 64?",
    bonusAnswer:"324 × 64 = 20,736 cobblestone blocks." },

  // ── FEBRUARY SET B ──────────────────────────────────────────────────────────
  { id:57, month:"February", week:1, icon:"💐", title:"THE FLOWER SHOP",
    difficulty:"⭐⭐⭐⭐",
    text:"You open a flower shop in your village. You picked flowers for 3 days:\n• Day 1: 14 flowers\n• Day 2: 22 flowers\n• Day 3: 18 flowers\n\nWhat is the average number of flowers you picked per day?\n\nYou sell bouquets of 6 flowers each. How many complete bouquets can you make from all 3 days?",
    answer:"Total: 14+22+18 = 54 flowers. Average: 54 ÷ 3 = 18 flowers per day. Bouquets: 54 ÷ 6 = 9 bouquets.",
    bonus:"Each bouquet sells for 3 emeralds. How much do you earn?",
    bonusAnswer:"9 × 3 = 27 emeralds." },

  { id:58, month:"February", week:2, icon:"🦅", title:"THE PHANTOM PROBLEM",
    difficulty:"⭐⭐⭐⭐",
    text:"Phantoms spawn when you haven't slept for 3 in-game days. Each Minecraft day lasts 20 real-time minutes.\n\nYou started playing at 4:00 PM without sleeping. Phantoms start spawning after 3 days × 20 minutes.\n\nWhat real-world time will it be when phantoms start attacking?\n\nPhantoms deal 4 damage per swoop and swoop every 8 seconds. If you fight them for 2 minutes (120 seconds), how many times do they swoop?",
    answer:"3 × 20 = 60 minutes. 4:00 PM + 60 min = 5:00 PM. Swoops: 120 ÷ 8 = 15 swoops.",
    bonus:"If each swoop does 4 damage and you take every hit, what is your total damage from 15 swoops?",
    bonusAnswer:"15 × 4 = 60 damage total." },

  { id:59, month:"February", week:3, icon:"🌊", title:"THE CORAL REEF",
    difficulty:"⭐⭐⭐⭐",
    text:"You're building a coral reef garden! You have 6 types of coral and want to plant them in a 10×6 block grid.\n\nThere are 60 spots in the grid. You want to plant each type of coral in equal sections.\n\nHow many spots does each coral type get?\n\nYou only have enough of 4 coral types to fill their sections. The other 2 sections stay empty. What fraction of the grid is planted?",
    answer:"60 ÷ 6 = 10 spots per coral type. 4 sections planted out of 6 total sections. Fraction: 4/6 = 2/3 of the grid is planted.",
    bonus:"How many total coral blocks did you plant?",
    bonusAnswer:"4 × 10 = 40 coral blocks." },

  { id:60, month:"February", week:4, icon:"🔮", title:"THE ENCHANTING PLAN",
    difficulty:"⭐⭐⭐⭐",
    text:"You need to enchant your entire armor set and sword. The costs are:\n• Helmet: 12 levels\n• Chestplate: 30 levels\n• Leggings: 24 levels\n• Boots: 18 levels\n• Sword: 30 levels\n\nYou currently have 45 experience levels. How many total levels do you need? How many more levels do you need to earn?",
    answer:"Total needed: 12+30+24+18+30 = 114 levels. You have 45. Still needed: 114 - 45 = 69 more levels.",
    bonus:"You earn 5 levels per hour of playing. How many hours until you can enchant everything?",
    bonusAnswer:"69 ÷ 5 = 13.8 hours — about 14 hours." },

  // ── MARCH SET B ─────────────────────────────────────────────────────────────
  { id:61, month:"March", week:1, icon:"🌿", title:"THE BAMBOO FOREST",
    difficulty:"⭐⭐⭐⭐",
    text:"You found a bamboo forest! Bamboo grows 1 block per Minecraft day (20 real minutes). You plant 15 bamboo stalks.\n\nAfter 6 days, how tall is each bamboo stalk? How many total bamboo blocks do you have to harvest?\n\nBamboo maxes out at 16 blocks tall and stops growing. When does it stop if you plant it today?",
    answer:"After 6 days: 6 blocks tall each. Total: 15 × 6 = 90 bamboo blocks. Max height reached after 16 days.",
    bonus:"You need 64 bamboo to make scaffolding. How many days until you have enough from all 15 stalks?",
    bonusAnswer:"64 ÷ 15 ≈ 4.3 days — so after 5 full days you'll have 75 bamboo (enough)." },

  { id:62, month:"March", week:2, icon:"⚙️", title:"THE PISTON MACHINE",
    difficulty:"⭐⭐⭐⭐",
    text:"You're building a piston-powered machine. Each piston needs:\n• 3 wood planks\n• 4 cobblestone\n• 1 iron ingot\n• 1 redstone dust\n\nYou want to build 8 pistons. How much of each material do you need?\n\nYou have 30 wood planks. How many pistons can you make with just the wood you have?",
    answer:"8 pistons: 24 wood, 32 cobblestone, 8 iron ingots, 8 redstone. Wood alone: 30 ÷ 3 = 10 pistons max.",
    bonus:"If iron is the hardest to find and you only have 5 iron ingots, how many pistons can you actually build?",
    bonusAnswer:"5 ingots = 5 pistons (iron is the limiting resource)." },

  { id:63, month:"March", week:3, icon:"🏄", title:"THE BOAT RACE",
    difficulty:"⭐⭐⭐⭐",
    text:"You're racing boats across the server ocean! The race course is 500 blocks long.\n\nBoats travel at 8 blocks per second on the water. You start the race and hit a lily pad at 200 blocks, which breaks your boat and resets you to the start.\n\nYou rebuild and restart. How long does it take to travel the first 200 blocks? After restarting, how long to complete the full 500 blocks?",
    answer:"First 200 blocks: 200 ÷ 8 = 25 seconds (then crash). After restart, full 500 blocks: 500 ÷ 8 = 62.5 seconds.",
    bonus:"Total time wasted including the first failed attempt was 25 seconds. What was your total time from first start to finish?",
    bonusAnswer:"25 seconds (failed attempt) + 62.5 seconds = 87.5 seconds total." },

  { id:64, month:"March", week:4, icon:"🧲", title:"THE MAGNET MINECART",
    difficulty:"⭐⭐⭐⭐",
    text:"You built a minecart rail system through your mine. The track is 240 blocks long.\n\nA powered minecart travels 8 blocks per second. A regular minecart travels 4 blocks per second.\n\nHow long does each type take to travel the full 240 blocks?\n\nIf you ride the powered one to the mine and the regular one back, how long is the round trip?",
    answer:"Powered: 240 ÷ 8 = 30 seconds. Regular: 240 ÷ 4 = 60 seconds. Round trip: 30 + 60 = 90 seconds.",
    bonus:"How many total seconds faster is the powered cart than the regular cart for the same distance?",
    bonusAnswer:"60 - 30 = 30 seconds faster." },

  // ── APRIL SET B ─────────────────────────────────────────────────────────────
  { id:65, month:"April", week:1, icon:"🌈", title:"THE DYE FACTORY",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"You're running a dye factory! You want to dye 48 pieces of white wool into equal amounts of 6 different colors.\n\nHow many of each color do you make?\n\nRed dye comes from poppies (1 dye each). Yellow dye comes from dandelions (1 dye each). Blue dye comes from cornflowers (1 dye each).\n\nYou need to pick enough flowers for the red, yellow, and blue batches. How many flowers total?",
    answer:"48 ÷ 6 = 8 of each color. Red + yellow + blue = 3 colors × 8 = 24 flowers needed.",
    bonus:"Green dye requires smelting cactus. If you need 8 green dye, how many cactus do you need to smelt (1 cactus = 1 dye)?",
    bonusAnswer:"8 cactus." },

  { id:66, month:"April", week:2, icon:"🐢", title:"THE TURTLE SANCTUARY",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"You built a turtle sanctuary on the beach. You start with 6 turtles. Each turtle lays 4 eggs. Each egg has a 7 in 10 chance of hatching.\n\nHow many eggs total? About how many baby turtles do you expect to hatch?\n\nBaby turtles grow up in about 20 Minecraft days. There are 3 generations in a season. Starting with 6 turtles, how many adult turtles might you have after 3 generations?",
    answer:"Eggs: 6 × 4 = 24 eggs. Expected hatch: 24 × 0.7 = 16.8 ≈ 17 babies. After Gen 1: ~17 turtles. After Gen 2: 17 × 4 × 0.7 ≈ 47 turtles. After Gen 3: 47 × 4 × 0.7 ≈ 131 turtles.",
    bonus:"Each grown turtle can drop a scute. How many scutes could you collect from the 3rd generation turtles?",
    bonusAnswer:"About 131 scutes (1 per turtle)." },

  { id:67, month:"April", week:3, icon:"🏺", title:"THE SMITHING TABLE",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"You're upgrading your diamond armor to Netherite at the smithing table. Each piece needs:\n• 1 diamond armor piece\n• 1 Netherite ingot\n• 1 Smithing Template\n\nA full armor set is 4 pieces. You also want a Netherite sword.\n\nNetherite ingots are made from 4 Netherite scraps + 4 gold ingots. Each scrap comes from mining Ancient Debris.\n\nHow many Netherite ingots do you need? How many Netherite scraps? How many gold ingots?",
    answer:"5 items (4 armor + sword) = 5 Netherite ingots. 5 × 4 = 20 Netherite scraps. 5 × 4 = 20 gold ingots.",
    bonus:"Ancient Debris gives 1 scrap per block mined. How many Ancient Debris blocks must you find?",
    bonusAnswer:"20 Ancient Debris blocks." },

  { id:68, month:"April", week:4, icon:"🌸", title:"THE PINK SHEEP MYSTERY",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"Pink sheep are very rare — only about 1 in 164 sheep spawns naturally pink.\n\nIn your world, 820 sheep have spawned.\n\nAbout how many would you expect to be pink?\n\nYou actually found only 3 pink sheep. Is that more or less than expected? By how much?",
    answer:"Expected: 820 ÷ 164 = 5 pink sheep. You found 3. That's 2 fewer than expected.",
    bonus:"If you dye 10 regular sheep pink using pink dye, and also have your 3 natural ones, how many pink sheep do you now have?",
    bonusAnswer:"3 + 10 = 13 pink sheep." },

  // ── MAY SET B ───────────────────────────────────────────────────────────────
  { id:69, month:"May", week:1, icon:"🏅", title:"THE SPEEDRUN SCORE",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"You are speedrunning Minecraft — trying to defeat the Ender Dragon as fast as possible!\n\nYour personal best is 32 minutes and 15 seconds. The world record is 12 minutes and 37 seconds.\n\nHow much faster is the world record than your time? Give your answer in minutes and seconds.\n\nYou improve your time by 3 minutes and 20 seconds in your next run. What is your new personal best?",
    answer:"Difference: 32:15 - 12:37 = 19 minutes and 38 seconds faster. New PB: 32:15 - 3:20 = 28 minutes and 55 seconds.",
    bonus:"How much faster than the world record is your new PB?",
    bonusAnswer:"28:55 - 12:37 = 16 minutes and 18 seconds behind the world record." },

  { id:70, month:"May", week:2, icon:"🔭", title:"THE NETHER CALCULATOR",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"The Nether is 8 times smaller than the Overworld! Every 1 block you walk in the Nether = 8 blocks in the Overworld.\n\nYou need to get to a location 2,400 Overworld blocks away. If you travel through the Nether instead, how far do you walk in the Nether?\n\nWalking 8 blocks per second in the Nether, how long does the trip take in seconds? In minutes?",
    answer:"2,400 ÷ 8 = 300 Nether blocks to walk. 300 ÷ 8 = 37.5 seconds.",
    bonus:"How long would the same journey take walking in the Overworld at 4 blocks per second?",
    bonusAnswer:"2,400 ÷ 4 = 600 seconds = 10 minutes. The Nether saves you about 9 minutes 22 seconds!" },

  { id:71, month:"May", week:3, icon:"🌍", title:"THE GIANT WORLD",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"A Minecraft world is 60 million blocks wide (from edge to edge). You can only travel 4 blocks per second on foot.\n\nHow many seconds would it take to walk from one edge to the other?\n\nConvert that to minutes, then to hours, then to days.\n\nDoes this seem like something a real player could actually do?",
    answer:"60,000,000 ÷ 4 = 15,000,000 seconds. ÷60 = 250,000 minutes. ÷60 = 4,166.7 hours. ÷24 = 173.6 days of non-stop walking! No real player could do it.",
    bonus:"If you rode a horse at 9 blocks per second instead, how many days would it take?",
    bonusAnswer:"60,000,000 ÷ 9 = 6,666,667 seconds ÷ 86,400 = about 77 days of non-stop riding." },

  { id:72, month:"May", week:4, icon:"👑", title:"THE ULTIMATE CHALLENGE",
    difficulty:"⭐⭐⭐⭐⭐",
    text:"You've beaten the Ender Dragon AND the Wither. Now you're going for the true Minecraft crown.\n\nYou have collected:\n• 28 diamond blocks\n• 15 emerald blocks\n• 42 gold blocks\n• 8 Netherite blocks\n\nEach block = 9 ingots. How many individual ingots of each type do you have?\n\nWhat is the total number of all ingots combined?",
    answer:"Diamonds: 28×9=252. Emeralds: 15×9=135. Gold: 42×9=378. Netherite: 8×9=72. Total: 252+135+378+72 = 837 ingots.",
    bonus:"You donate half of your emerald ingots to villagers. How many do you keep, and how many blocks could you reform them into?",
    bonusAnswer:"135 ÷ 2 = 67 emerald ingots kept (round down). 67 ÷ 9 = 7 full blocks with 4 leftover ingots." },
];

function Stories({onEarn,initData={},onSaveProgress}){
  const [month,setMonth]=useState("September");
  const [set,setSet]=useState("A");
  const [active,setActive]=useState(0);
  const [revealed,setRevealedState]=useState({});
  const [earned,setEarned]=useState(initData.storiesEarned||{});
  useEffect(()=>{onSaveProgress?.({storiesEarned:earned});},[earned]);
  const months=["September","October","November","December","January","February","March","April","May"];
  const allMonthStories=STORIES.filter(s=>s.month===month);
  const setAStories=allMonthStories.filter(s=>s.id<=36);
  const setBStories=allMonthStories.filter(s=>s.id>36);
  const monthStories=set==="A"?setAStories:setBStories;

  function earn(id){
    if(!earned[id]){
      setEarned(e=>({...e,[id]:true}));
      onEarn(2,"📖 +2 EMERALDS for reading the story problem!");
    }
  }
  function toggleAnswer(id){setRevealedState(r=>({...r,[id]:!r[id]}));}
  function changeMonth(m){setMonth(m);setActive(0);}
  function changeSet(s){setSet(s);setActive(0);}

  const story=monthStories[active]||null;
  const DIFF_COLOR={"⭐":"#4ADE80","⭐⭐":"#22D3EE","⭐⭐⭐":"#A78BFA","⭐⭐⭐⭐":"#FB923C","⭐⭐⭐⭐⭐":"#F87171"};
  const dc=story?DIFF_COLOR[story.difficulty]||"#888":"#888";
  const earnedA=setAStories.filter(s=>earned[s.id]).length;
  const earnedB=setBStories.filter(s=>earned[s.id]).length;
  const totalEarned=Object.keys(earned).length;

  return(<div>
    <div className="px" style={{fontSize:8,color:"#4ADE80",marginBottom:6}}>📖 STORY PROBLEMS — 72 STORIES</div>
    <div style={{display:"flex",gap:6,marginBottom:10,alignItems:"center",flexWrap:"wrap"}}>
      <div style={{fontSize:12,color:"#555"}}>✅ Completed: <span style={{color:"#4ADE80",fontWeight:700}}>{totalEarned}/72</span></div>
      <div style={{flex:1}}/>
      <button className={`btn ${set==="A"?"btn-g":"btn-s"}`} style={{fontSize:7,padding:"6px 12px"}} onClick={()=>changeSet("A")}>
        SET A · Weeks 1–4 {earnedA>0&&`(${earnedA}✅)`}
      </button>
      <button className={`btn ${set==="B"?"btn-g":"btn-s"}`} style={{fontSize:7,padding:"6px 12px"}} onClick={()=>changeSet("B")}>
        SET B · More Stories {earnedB>0&&`(${earnedB}✅)`}
      </button>
    </div>
    <div style={{borderLeft:"4px solid #4ADE80",background:"#030803",padding:"8px 12px",borderRadius:"0 4px 4px 0",marginBottom:11,fontSize:13,lineHeight:1.7,color:"#4a7a4a"}}>
      <strong style={{color:"#eee"}}>How to use:</strong> Read out loud. Sound out every word. Hit <strong style={{color:"#eee"}}>I READ IT</strong> for emeralds. Solve the math with your tutor. Set A and Set B give you 2 stories per week all year!
    </div>

    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
      {months.map(m=>{
        const ms=STORIES.filter(s=>s.month===m);
        const me=ms.filter(s=>earned[s.id]).length;
        return(<button key={m} className={`btn ${month===m?"btn-g":"btn-s"}`} style={{fontSize:6,padding:"5px 8px"}}
          onClick={()=>changeMonth(m)}>{m.slice(0,3)}{me>0&&` ✅${me}`}</button>);
      })}
    </div>

    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:11}}>
      {monthStories.map((s,i)=>(
        <button key={s.id} className={`btn ${active===i?"btn-g":"btn-s"}`} style={{fontSize:6,padding:"5px 9px"}}
          onClick={()=>setActive(i)}>
          {s.icon} {i+1}{earned[s.id]?" ✅":""}
        </button>
      ))}
      {monthStories.length===0&&<div style={{fontSize:13,color:"#333",padding:4}}>No stories in this set for {month}.</div>}
    </div>

    {story&&(<>
      <div className="box" style={{padding:15,marginBottom:9,background:"#040404"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:9}}>
          <span style={{fontSize:24}}>{story.icon}</span>
          <div>
            <div className="px" style={{fontSize:8,color:"#4ADE80",lineHeight:1.6}}>{story.title}</div>
            <div style={{fontSize:12,color:dc}}>Difficulty: {story.difficulty}</div>
            <div style={{fontSize:11,color:"#333"}}>{story.month} · Set {set}</div>
          </div>
        </div>
        <div style={{fontSize:17,lineHeight:2.0,whiteSpace:"pre-wrap",color:"#ddd"}}>{story.text}</div>
      </div>

      {story.bonus&&(
        <div style={{background:"#0a0600",border:"2px solid #FF8C00",borderRadius:4,padding:"9px 12px",marginBottom:9}}>
          <div className="px" style={{fontSize:7,color:"#FF8C00",marginBottom:4}}>🌟 BONUS CHALLENGE</div>
          <div style={{fontSize:15,lineHeight:1.8,color:"#cc9933"}}>{story.bonus}</div>
        </div>
      )}

      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
        {!earned[story.id]
          ?<button className="btn btn-g" style={{fontSize:8}} onClick={()=>earn(story.id)}>💎 I READ IT! (+2 emeralds)</button>
          :<span style={{fontSize:13,color:"#4ADE80",padding:"9px 0"}}>✅ Emeralds collected!</span>
        }
        <button className="btn btn-s" style={{fontSize:7}} onClick={()=>toggleAnswer(story.id)}>
          {revealed[story.id]?"🙈 HIDE ANSWER":"🔍 SHOW ANSWER"}
        </button>
      </div>

      {revealed[story.id]&&(
        <div className="box" style={{padding:13,background:"#040404",borderColor:"#4ADE80"}}>
          <div className="px" style={{fontSize:7,color:"#4ADE80",marginBottom:5}}>ANSWER</div>
          <div style={{fontSize:15,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{story.answer}</div>
          {story.bonusAnswer&&(<>
            <div className="px" style={{fontSize:7,color:"#FF8C00",marginTop:9,marginBottom:4}}>🌟 BONUS ANSWER</div>
            <div style={{fontSize:14,lineHeight:1.7,color:"#cc9933"}}>{story.bonusAnswer}</div>
          </>)}
        </div>
      )}
    </>)}
  </div>);
}

function CashOut({emeralds,onCashOut}){
  const [amount,setAmount]=useState("");
  const [reward,setReward]=useState("");
  const [confirm,setConfirm]=useState(false);
  const [history,setHistory]=useState([]);
  const amt=parseInt(amount)||0;
  const canCash=amt>0&&amt<=emeralds&&reward.trim().length>0;
  function doRedeem(){setHistory(h=>[{amount:amt,reward:reward.trim()},...h]);onCashOut(amt);setAmount("");setReward("");setConfirm(false);}
  return(<div>
    <div className="px" style={{fontSize:8,color:"#FFD700",marginBottom:8}}>🏆 CASH OUT EMERALDS</div>
    <div style={{borderLeft:"4px solid #FFD700",background:"#080500",padding:"9px 13px",borderRadius:"0 4px 4px 0",marginBottom:13,fontSize:14,lineHeight:1.7,color:"#888"}}>
      <strong style={{color:"#eee"}}>How to use:</strong> When you earn a real reward, record it here. Type the reward and cost. Your tutor or mom approves — then emeralds come out of your jar.
    </div>
    <div className="box2" style={{padding:14,marginBottom:13,textAlign:"center"}}>
      <div className="px" style={{fontSize:7,color:"#444",marginBottom:3}}>YOUR EMERALD JAR</div>
      <div className="px glow" style={{fontSize:30}}>💎 {emeralds}</div>
    </div>
    {!confirm?(<div>
      <div style={{marginBottom:10}}><div style={{fontSize:15,fontWeight:700,marginBottom:5}}>What reward did you earn?</div>
        <input className="inp" placeholder="e.g. extra screen time, chose the movie..." value={reward} onChange={e=>setReward(e.target.value)}/></div>
      <div style={{marginBottom:12}}><div style={{fontSize:15,fontWeight:700,marginBottom:5}}>How many emeralds?</div>
        <input className="inp" type="number" min="1" max={emeralds} value={amount} onChange={e=>setAmount(e.target.value)}/>
        {amt>emeralds&&<div style={{fontSize:13,color:"#FF4455",marginTop:4}}>⚠ Only {emeralds} available.</div>}</div>
      <button className="btn btn-gold" style={{fontSize:9,padding:"11px 18px"}} onClick={()=>setConfirm(true)} disabled={!canCash}>🏆 REDEEM</button>
    </div>):(<div className="box" style={{padding:15,background:"#0e0800",borderColor:"#FFD700",textAlign:"center"}}>
      <div className="px" style={{fontSize:8,color:"#FFD700",marginBottom:8}}>CONFIRM CASH OUT</div>
      <div style={{fontSize:16,marginBottom:4}}>Spending <span className="px" style={{color:"#FFD700"}}>💎 {amt}</span></div>
      <div style={{fontSize:16,marginBottom:11}}>for: <strong>{reward}</strong></div>
      <div style={{fontSize:12,color:"#555",marginBottom:11}}>Your tutor or mom needs to approve this.</div>
      <div style={{display:"flex",gap:8,justifyContent:"center"}}>
        <button className="btn btn-gold" onClick={doRedeem}>✅ APPROVED</button>
        <button className="btn btn-s" onClick={()=>setConfirm(false)}>CANCEL</button>
      </div>
    </div>)}
    {history.map((h,i)=>(<div key={i} className="srow" style={{marginTop:6}}>
      <span>🏆</span><div style={{flex:1,color:"#FFD700",fontWeight:700}}>{h.reward}</div>
      <div className="px" style={{fontSize:8,color:"#FF4455"}}>-{h.amount} 💎</div>
    </div>))}
  </div>);
}


// ═══════════════════════════════════════════════════════════════════
// SKILL FORGE — 8 LITERACY SYSTEMS  (1st → 3rd grade progression)
// ═══════════════════════════════════════════════════════════════════

const SIGHT_WORDS = {
  "Pre-K": { icon:"🌱", color:"#4ADE80",
    words:["a","and","away","big","blue","can","come","down","find","for","funny","go","help","here",
           "I","in","is","it","jump","little","look","make","me","my","not","one","play","red","run",
           "said","see","the","three","to","two","up","we","where","yellow","you"] },
  "Primer": { icon:"🌿", color:"#22D3EE",
    words:["all","am","are","at","ate","be","black","brown","but","came","did","do","eat","four","get",
           "good","have","he","into","like","must","new","no","now","on","our","out","please","pretty",
           "ran","ride","saw","say","she","so","soon","that","there","they","this","too","under","want",
           "was","well","went","what","white","who","will","with","yes"] },
  "1st Grade": { icon:"🌾", color:"#A78BFA",
    words:["after","again","an","any","as","ask","by","could","every","fly","from","give","going","had",
           "has","her","him","his","how","just","know","let","live","may","of","old","once","open","over",
           "put","round","some","stop","take","thank","them","think","walk","were","when"] },
  "2nd Grade": { icon:"🌲", color:"#FB923C",
    words:["always","around","because","been","before","best","both","buy","call","cold","does","don't",
           "fast","first","five","found","gave","goes","green","its","made","many","off","or","pull","read",
           "right","sing","sit","sleep","tell","their","these","those","upon","us","use","very","wash",
           "which","why","wish","work","would","write","your"] },
  "3rd Grade": { icon:"🏔️", color:"#F87171",
    words:["about","better","bring","carry","clean","cut","done","draw","drink","eight","fall","far",
           "full","got","grow","hold","hot","hurt","if","keep","kind","laugh","light","long","much",
           "myself","never","only","own","pick","seven","shall","show","six","small","start","ten",
           "today","together","try","warm"] }
};

function SightWordPortal({onEarn,initData={},onSaveProgress}){
  const levels=Object.keys(SIGHT_WORDS);
  const [level,setLevel]=useState("Pre-K");
  const [queue,setQueue]=useState([]);
  const [idx,setIdx]=useState(0);
  const [phase,setPhase]=useState("start"); // start | flash | judge | done
  const [visible,setVisible]=useState(false);
  const [mastered,setMastered]=useState(initData.sightMastered||{});
  const [missed,setMissed]=useState(initData.sightMissed||{});
  const [earned,setEarned]=useState({});
  const [flashLen,setFlashLen]=useState(2000);
  useEffect(()=>{onSaveProgress?.({sightMastered:mastered,sightMissed:missed});},[mastered,missed]);

  const sw=SIGHT_WORDS[level];
  const masteredCount=Object.keys(mastered).filter(k=>k.startsWith(level+":")||(mastered[k]&&sw.words.includes(k))).length;
  const allWords=sw.words;
  const totalMastered=allWords.filter(w=>mastered[level+":"+w]).length;

  function startRound(){
    const notMastered=allWords.filter(w=>!mastered[level+":"+w]);
    const pool=notMastered.length>0?notMastered:allWords;
    const shuffled=[...pool].sort(()=>Math.random()-.5);
    setQueue(shuffled.slice(0,Math.min(10,shuffled.length)));
    setIdx(0);setPhase("flash");setVisible(false);
    setTimeout(()=>setVisible(true),200);
  }

  useEffect(()=>{
    if(phase!=="flash")return;
    const t=setTimeout(()=>{setVisible(false);setTimeout(()=>setPhase("judge"),300);},flashLen);
    return()=>clearTimeout(t);
  },[phase,idx,flashLen]);

  const word=queue[idx]||"";
  const key=level+":"+word;

  function judge(got){
    if(got){
      setMastered(m=>({...m,[key]:true}));
      if(!earned[key]){setEarned(e=>({...e,[key]:true}));onEarn(1,"🔮 +1 EMERALD! Portal word mastered!");}
    } else {
      setMissed(m=>({...m,[key]:(m[key]||0)+1}));
    }
    const next=idx+1;
    if(next>=queue.length){setPhase("done");}
    else{setIdx(next);setPhase("flash");setVisible(false);setTimeout(()=>setVisible(true),300);}
  }

  const pct=Math.round((totalMastered/allWords.length)*100);

  return(<div>
    <div className="px" style={{fontSize:8,color:"#C084FC",marginBottom:6}}>🔮 NETHER PORTAL — SIGHT WORDS</div>
    <div style={{borderLeft:"4px solid #C084FC",background:"#0a0010",padding:"8px 12px",borderRadius:"0 4px 4px 0",marginBottom:11,fontSize:13,lineHeight:1.7,color:"#886aaa"}}>
      <strong style={{color:"#eee"}}>How it works:</strong> A sight word flashes through the portal for {(flashLen/1000).toFixed(1)}s. Recognize it instantly? Step through! Still learning? The portal stays closed. Master all words to unlock the next level.
    </div>

    {/* Level selector */}
    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
      {levels.map(lv=>{
        const sw2=SIGHT_WORDS[lv];
        const mc=sw2.words.filter(w=>mastered[lv+":"+w]).length;
        const done=mc===sw2.words.length;
        return(<button key={lv} className={`btn ${level===lv?"btn-g":"btn-s"}`}
          style={{fontSize:6,padding:"5px 9px",borderColor:level===lv?sw2.color:undefined,color:level===lv?sw2.color:undefined}}
          onClick={()=>{setLevel(lv);setPhase("start");}}>
          {sw2.icon} {lv}{done?" ✅":` ${mc}/${sw2.words.length}`}
        </button>);
      })}
    </div>

    {/* Flash speed control */}
    <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:10,flexWrap:"wrap"}}>
      <span style={{fontSize:12,color:"#555"}}>Flash speed:</span>
      {[[3000,"Slow 3s"],[2000,"Normal 2s"],[1000,"Fast 1s"],[500,"Speedrun .5s"]].map(([ms,label])=>(
        <button key={ms} className={`btn ${flashLen===ms?"btn-g":"btn-s"}`} style={{fontSize:6,padding:"4px 7px"}}
          onClick={()=>setFlashLen(ms)}>{label}</button>
      ))}
    </div>

    {/* Progress bar */}
    <div style={{marginBottom:11}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#555",marginBottom:4}}>
        <span>{level} mastered</span><span style={{color:sw.color}}>{totalMastered}/{allWords.length} ({pct}%)</span>
      </div>
      <div className="pbar"><div className="pfill" style={{width:`${pct}%`,background:sw.color}}/></div>
    </div>

    {/* Portal */}
    {phase==="start"&&(<div style={{textAlign:"center",padding:20}}>
      <div style={{fontSize:48,marginBottom:8}}>🔮</div>
      <div style={{fontSize:15,color:"#555",marginBottom:14}}>{allWords.filter(w=>!mastered[level+":"+w]).length} words remaining in {level}</div>
      <button className="btn btn-g" style={{fontSize:9,padding:"12px 20px",borderColor:sw.color,color:sw.color}} onClick={startRound}>ENTER THE PORTAL ▶</button>
    </div>)}

    {(phase==="flash"||phase==="judge")&&(<div>
      <div style={{background:"#0a0010",border:`4px solid #7c3aed`,borderRadius:6,padding:30,textAlign:"center",marginBottom:12,minHeight:140,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",boxShadow:"0 0 40px #7c3aed55"}}>
        {phase==="flash"&&visible
          ?<div className="px" style={{fontSize:32,color:"#C084FC",textShadow:"0 0 20px #C084FC, 0 0 40px #C084FC",letterSpacing:6,animation:"pop .15s ease-out"}}>{word}</div>
          :<div style={{fontSize:32,color:"#333"}}>🔮</div>
        }
        <div style={{fontSize:12,color:"#444",marginTop:8}}>Word {idx+1} of {queue.length}</div>
      </div>
      {phase==="judge"&&(<div style={{display:"flex",gap:10,justifyContent:"center"}}>
        <button className="btn btn-g" style={{fontSize:8,padding:"12px 18px",borderColor:"#4ADE80",color:"#4ADE80"}} onClick={()=>judge(true)}>✅ GOT IT — STEP THROUGH</button>
        <button className="btn btn-mob" style={{fontSize:8,padding:"12px 18px"}} onClick={()=>judge(false)}>❌ STILL LEARNING</button>
      </div>)}
    </div>)}

    {phase==="done"&&(<div style={{textAlign:"center",padding:20}}>
      <div style={{fontSize:36,marginBottom:8}}>🌟</div>
      <div className="px" style={{fontSize:9,color:sw.color,marginBottom:8}}>ROUND COMPLETE!</div>
      <div style={{fontSize:14,color:"#888",marginBottom:12}}>Mastered: {totalMastered}/{allWords.length} {level} words</div>
      {Object.entries(missed).filter(([k])=>k.startsWith(level+":")).length>0&&(
        <div style={{marginBottom:12,textAlign:"left"}}>
          <div className="px" style={{fontSize:7,color:"#F87171",marginBottom:6}}>STILL PRACTICING:</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
            {Object.entries(missed).filter(([k])=>k.startsWith(level+":")).map(([k,c])=>(
              <span key={k} style={{background:"#1a0505",border:"2px solid #7a1a22",borderRadius:3,padding:"3px 8px",fontSize:13,fontFamily:"'Press Start 2P',monospace",color:"#F87171"}}>{k.split(":")[1]} ×{c}</span>
            ))}
          </div>
        </div>
      )}
      <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
        <button className="btn btn-g" style={{fontSize:8,borderColor:sw.color,color:sw.color}} onClick={startRound}>ANOTHER ROUND ↺</button>
        {levels.indexOf(level)<levels.length-1&&totalMastered===allWords.length&&(
          <button className="btn btn-gold" style={{fontSize:8}} onClick={()=>{setLevel(levels[levels.indexOf(level)+1]);setPhase("start");}}>NEXT LEVEL ▶</button>
        )}
      </div>
    </div>)}

    {/* Word review grid */}
    <div style={{marginTop:14}}>
      <div className="px" style={{fontSize:7,color:"#555",marginBottom:6}}>ALL {level.toUpperCase()} WORDS:</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
        {allWords.map(w=>(
          <span key={w} style={{padding:"3px 7px",fontSize:12,fontFamily:"'Press Start 2P',monospace",borderRadius:2,border:"2px solid",
            borderColor:mastered[level+":"+w]?"#4ADE80":"#222",
            background:mastered[level+":"+w]?"#052E16":"#050505",
            color:mastered[level+":"+w]?"#4ADE80":"#333"}}>{w}</span>
        ))}
      </div>
    </div>
  </div>);
}

// ── FLUENCY SPEEDRUN ──────────────────────────────────────────────────────────
const FLUENCY_PASSAGES = [
  { id:1, level:"Overworld", grade:"1st", icon:"🌾", wc:58, lexile:"200L",
    title:"The First Morning",
    text:"You wake up in a new world. The sun is just coming up. You look around and see trees and grass and flowers. A cow is standing near a pond. You hear birds in the trees. You feel happy because today is your first day in Minecraft. It is time to get to work. First you need wood. You walk to the trees and start to chop. Chop chop chop. The wood falls into your hands." },
  { id:2, level:"Overworld", grade:"1st", icon:"🌻", wc:62, lexile:"230L",
    title:"The Sheep and the Wheat",
    text:"There is a big green field near your house. Three white sheep are eating the grass. You want to make a bed, but you need wool. You pick up some wheat and hold it out. The sheep walk toward you. They like wheat very much. You lead them into your pen. Now you have a farm! You shear the sheep with your shears. The wool falls off in big fluffy chunks. You have six wool now. That is enough for a bed." },
  { id:3, level:"Forest", grade:"1st", icon:"🌲", wc:72, lexile:"270L",
    title:"Night Is Coming",
    text:"The sky is getting dark. You look at the sun and it is going down fast. You have been mining all day and you forgot to go home. Now you are far from your house. You can hear zombies in the distance. Your heart beats fast. You look around for a safe place. There is a small cave in the hillside. You run to it and start to place torches on the walls. You also block the entrance with dirt blocks. Now you are safe. You sit down and wait for the sun to come back up. It is a long night." },
  { id:4, level:"Forest", grade:"1st", icon:"🦅", wc:66, lexile:"290L",
    title:"Finding Iron",
    text:"You go down into your mine. The walls are made of stone. You swing your pickaxe and look for iron ore. Iron ore has little orange and brown spots in the gray stone. You find some! You mine six pieces of iron ore. You go back up to your furnace and put the ore inside with some coal. The fire burns hot and the iron melts. When it is done, you have six iron ingots. Now you can make better tools. Iron tools last much longer than stone ones." },
  { id:5, level:"Swamp", grade:"2nd", icon:"🐸", wc:78, lexile:"330L",
    title:"The Swamp at Night",
    text:"The swamp biome is a strange and eerie place after dark. The water is dark green and lily pads float on the surface. Frogs hop from pad to pad, making their deep croaking sounds. Slimes bounce through the shallow water, leaving trails of green slime behind them. They are not very dangerous, but they make an annoying sound when they bounce. The trees in the swamp are huge and twisted, with vines hanging down like curtains. If you want to find a witch's hut, the swamp is where you should look. But be careful. Witches are dangerous enemies who throw harmful potions." },
  { id:6, level:"Swamp", grade:"2nd", icon:"🧙", wc:81, lexile:"360L",
    title:"Trading with Villagers",
    text:"Villagers are one of the most useful things in Minecraft. Each villager has a job. Farmers grow crops. Librarians sell books. Blacksmiths make armor and weapons. Fletchers sell bows and arrows. When you trade with a villager, you give them emeralds and they give you items. As you keep trading with the same villager, they become better traders. Their prices go down and they unlock more items for sale. You can even cure a zombie villager by throwing a splash potion of weakness on it and then giving it a golden apple. The cured villager will be very grateful and give you much better trade deals." },
  { id:7, level:"Desert", grade:"2nd", icon:"🏜️", wc:84, lexile:"390L",
    title:"The Desert Temple",
    text:"Desert temples are one of the most exciting structures to discover in Minecraft. They are made of sandstone and terracotta and rise up above the sand dunes like ancient pyramids. Inside, there is a hidden chamber deep beneath the floor. To get there, you have to find a hidden pressure plate in the center of the main room. Whatever you do, do not step on it! If you do, it will set off a TNT explosion that destroys the treasure chests below. Instead, dig around the edges of the room until you find a way down. At the bottom, you will find four chests full of valuable loot. But watch out for the booby trap." },
  { id:8, level:"Mountains", grade:"2nd", icon:"🏔️", wc:88, lexile:"410L",
    title:"Taming a Wolf",
    text:"Wolves spawn naturally in forests and taiga biomes. They roam in small packs and are neutral toward players unless you attack them. To tame a wolf, you need bones, which drop from skeletons. Approach the wolf slowly and right-click it while holding a bone. Sometimes it takes only one bone, but other times you may need six or seven. You will know the wolf is tamed when a red collar appears around its neck and hearts float above its head. Once tamed, the wolf will follow you everywhere and fight any mobs that attack you. It is one of the most loyal companions in the game. You can also tell it to sit by right-clicking it again." },
  { id:9, level:"Deep Mine", grade:"3rd", icon:"💎", wc:96, lexile:"470L",
    title:"The Diamond Hunt",
    text:"Diamonds are the most sought-after resource in Minecraft, and finding them requires patience and strategy. Diamonds only generate below a Y-coordinate of sixteen in the game world, which means you need to dig deep into the earth. The best strategy is to branch mine at Y-level twelve, which is where diamonds spawn most frequently. Create a long tunnel and then dig branches off to the sides every two blocks. This maximizes the amount of stone you uncover. Bring torches to keep the area lit, since dangerous mobs spawn in darkness. You will also want a good pickaxe — at least iron, because a wooden or stone pickaxe cannot mine diamond ore. When you finally find a diamond, the blue glittering ore in the dark stone feels like pure treasure." },
  { id:10, level:"Nether", grade:"3rd", icon:"🔥", wc:101, lexile:"510L",
    title:"Surviving the Nether",
    text:"The Nether is one of the most dangerous dimensions in Minecraft, and entering it without the right equipment is a serious mistake. The air is hot and everything glows with an eerie orange and red light. Massive seas of lava stretch across the landscape, and terrifying creatures roam through the caverns and fortresses. Ghasts are large white jellyfish-like creatures that shoot explosive fireballs from a distance. Piglins are aggressive unless you are wearing gold armor, so always have at least one piece of gold equipment before entering. The Nether is eight times smaller than the Overworld, which makes it useful for fast travel. Every block you walk in the Nether equals eight blocks in the Overworld. This makes it possible to build rail systems and travel enormous distances very quickly." },
  { id:11, level:"The End", grade:"3rd", icon:"🐉", wc:108, lexile:"540L",
    title:"Facing the Ender Dragon",
    text:"The Ender Dragon is the final boss of Minecraft, and defeating it is one of the greatest achievements in the game. Before you enter the End dimension, you need to be thoroughly prepared. Bring the best armor you have, enchanted if possible, along with a bow and many arrows, several stacks of food, and materials to pillar up and block off attacks. When you arrive in the End, you will see a large central island floating in an endless dark void. Tall obsidian pillars rise from the island, and on top of each one sits a glowing End Crystal. These crystals heal the Dragon, so you must destroy them first. Shoot them with your bow or climb the pillars and break them by hand. Once all the crystals are destroyed, the Dragon can no longer heal and you can focus all your attacks on it. When it finally falls, an egg appears on a fountain of bedrock, and a gateway opens that leads you home."},
];

function FluencySpeedrun({onEarn,initData={},onSaveProgress}){
  const levels=["Overworld","Forest","Swamp","Desert","Mountains","Deep Mine","Nether","The End"];
  const [level,setLevel]=useState("Overworld");
  const [pid,setPid]=useState(1);
  const [running,setRunning]=useState(false);
  const [startTime,setStartTime]=useState(null);
  const [elapsed,setElapsed]=useState(0);
  const [errors,setErrors]=useState(0);
  const [pbs,setPbs]=useState(initData.fluencyPBs||{});
  const [history,setHistory]=useState([]);
  const [phase,setPhase]=useState("select");
  const [earned,setEarned]=useState({});
  useEffect(()=>{onSaveProgress?.({fluencyPBs:pbs});},[pbs]);

  const passage=FLUENCY_PASSAGES.find(p=>p.id===pid)||FLUENCY_PASSAGES[0];
  const levelPassages=FLUENCY_PASSAGES.filter(p=>p.level===level);

  useEffect(()=>{
    if(!running)return;
    const id=setInterval(()=>setElapsed(Date.now()-startTime),100);
    return()=>clearInterval(id);
  },[running,startTime]);

  function start(p){setPid(p.id);setErrors(0);setElapsed(0);setRunning(true);setStartTime(Date.now());setPhase("reading");}
  function finish(){
    setRunning(false);
    const secs=Math.max(1,elapsed/1000);
    const mins=secs/60;
    const cwpm=Math.round((passage.wc-errors)/mins);
    const entry={pid:passage.id,title:passage.title,secs:Math.round(secs),errors,cwpm,date:new Date().toLocaleDateString()};
    setHistory(h=>[entry,...h].slice(0,20));
    const pbKey=`${passage.id}`;
    const prev=pbs[pbKey];
    if(!prev||cwpm>prev){setPbs(p=>({...p,[pbKey]:cwpm}));}
    if(!earned[pbKey]){setEarned(e=>({...e,[pbKey]:true}));onEarn(3,"🏃 +3 EMERALDS! Speedrun complete!");}
    setPhase("results");
  }

  const GRADES={
    "1st":{min:40,max:60},
    "2nd":{min:90,max:110},
    "3rd":{min:115,max:130}
  };
  const gRange=GRADES[passage.grade]||{min:40,max:130};
  const lastRun=history.find(h=>h.pid===passage.id);
  const pb=pbs[passage.id];

  function cwpmColor(cwpm){
    if(cwpm>=gRange.max)return"#4ADE80";
    if(cwpm>=gRange.min)return"#FFD700";
    return"#F87171";
  }

  return(<div>
    <div className="px" style={{fontSize:8,color:"#22D3EE",marginBottom:6}}>🏃 FLUENCY SPEEDRUN</div>
    <div style={{borderLeft:"4px solid #22D3EE",background:"#000d12",padding:"8px 12px",borderRadius:"0 4px 4px 0",marginBottom:11,fontSize:13,lineHeight:1.7,color:"#226677"}}>
      <strong style={{color:"#eee"}}>How it works:</strong> Your tutor hits START. You read aloud as fast as you can without mistakes. They tap a key for each error. When done, hit FINISH to see your Correct Words Per Minute (CWPM). Beat your Personal Best!
    </div>
    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
      {levels.map(lv=>{
        const lp=FLUENCY_PASSAGES.filter(p=>p.level===lv);
        const bestLv=lp.filter(p=>pbs[p.id]).length;
        return(<button key={lv} className={`btn ${level===lv?"btn-g":"btn-s"}`} style={{fontSize:6,padding:"5px 8px"}}
          onClick={()=>{setLevel(lv);setPhase("select");}}>
          {lv}{bestLv>0&&` ✅${bestLv}`}
        </button>);
      })}
    </div>

    {/* Grade targets */}
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
      {Object.entries(GRADES).map(([g,r])=>(
        <div key={g} style={{background:"#060606",border:"2px solid #1a1a1a",borderRadius:3,padding:"5px 9px",fontSize:12}}>
          <span style={{color:"#555"}}>{g}: </span><span style={{color:"#FFD700",fontFamily:"'Press Start 2P',monospace",fontSize:9}}>{r.min}–{r.max}</span><span style={{color:"#555"}}> CWPM</span>
        </div>
      ))}
    </div>

    {phase==="select"&&(<div>
      {levelPassages.map(p=>{
        const myPb=pbs[p.id];
        const c=myPb?cwpmColor(myPb):"#444";
        return(<div key={p.id} className="box" style={{padding:12,marginBottom:8,cursor:"pointer",background:"#040404"}}
          onClick={()=>start(p)}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:20}}>{p.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:700,marginBottom:2}}>{p.title}</div>
              <div style={{fontSize:12,color:"#555"}}>{p.grade} Grade · {p.wc} words · Lexile {p.lexile}</div>
            </div>
            <div style={{textAlign:"right"}}>
              {myPb&&<div className="px" style={{fontSize:8,color:c}}>PB: {myPb}</div>}
              <div style={{fontSize:11,color:"#333",marginTop:3}}>tap to start</div>
            </div>
          </div>
        </div>);
      })}
    </div>)}

    {phase==="reading"&&(<div>
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10,flexWrap:"wrap"}}>
        <div className="px" style={{fontSize:12,color:"#22D3EE"}}>{(elapsed/1000).toFixed(1)}s</div>
        <div style={{flex:1}}/>
        <button className="btn btn-s" style={{fontSize:7}} onClick={()=>setErrors(e=>Math.max(0,e-1))}>◀ UNDO ERROR</button>
        <button className="btn btn-mob" style={{fontSize:8}} onClick={()=>setErrors(e=>e+1)}>✗ ERROR ({errors})</button>
        <button className="btn btn-gold" style={{fontSize:8}} onClick={finish}>DONE ★</button>
      </div>
      <div className="box" style={{padding:16,background:"#040404",marginBottom:8}}>
        <div className="px" style={{fontSize:7,color:"#22D3EE",marginBottom:8}}>{passage.title}</div>
        <div style={{fontSize:20,lineHeight:2.2,letterSpacing:.5,color:"#eee"}}>{passage.text}</div>
      </div>
      <div style={{fontSize:12,color:"#444",textAlign:"center"}}>Tutor: tap ERROR for each mispronounced or skipped word</div>
    </div>)}

    {phase==="results"&&lastRun&&(<div>
      <div style={{textAlign:"center",padding:"14px 0"}}>
        <div style={{fontSize:36,marginBottom:6}}>🏃</div>
        <div className="px" style={{fontSize:9,color:"#22D3EE",marginBottom:8}}>SPEEDRUN COMPLETE</div>
        <div className="px" style={{fontSize:22,color:cwpmColor(lastRun.cwpm),marginBottom:4}}>{lastRun.cwpm} CWPM</div>
        <div style={{fontSize:13,color:"#555",marginBottom:2}}>{lastRun.secs}s · {lastRun.errors} errors</div>
        <div style={{fontSize:13,color:"#555",marginBottom:10}}>Target for {passage.grade}: {gRange.min}–{gRange.max} CWPM</div>
        {lastRun.cwpm>=gRange.max&&<div style={{fontSize:16,color:"#4ADE80",marginBottom:8}}>🌟 FLUENCY GOAL ACHIEVED!</div>}
        {lastRun.cwpm<gRange.min&&<div style={{fontSize:14,color:"#888",marginBottom:8}}>Keep practicing! Re-read to beat your time.</div>}
        {pb&&lastRun.cwpm>=pb&&<div className="px" style={{fontSize:8,color:"#FFD700",marginBottom:8}}>🏆 NEW PERSONAL BEST!</div>}
        <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn btn-g" style={{fontSize:8}} onClick={()=>{start(passage);}}>RE-RUN THIS PASSAGE ↺</button>
          <button className="btn btn-s" style={{fontSize:7}} onClick={()=>setPhase("select")}>CHOOSE PASSAGE ◀</button>
        </div>
      </div>
      {history.filter(h=>h.pid===passage.id).length>1&&(<div style={{marginTop:12}}>
        <div className="px" style={{fontSize:7,color:"#333",marginBottom:6}}>THIS PASSAGE HISTORY:</div>
        {history.filter(h=>h.pid===passage.id).slice(0,5).map((h,i)=>(
          <div key={i} className="srow" style={{marginBottom:4}}>
            <span style={{color:cwpmColor(h.cwpm),fontFamily:"'Press Start 2P',monospace",fontSize:9}}>{h.cwpm}</span>
            <span style={{color:"#555"}}>CWPM</span>
            <span style={{color:"#444"}}>{h.secs}s · {h.errors} err</span>
            <span style={{color:"#222",marginLeft:"auto"}}>{h.date}</span>
          </div>
        ))}
      </div>)}
    </div>)}
  </div>);
}

// ── ENCHANTING TABLE — SUFFIXES & PREFIXES ─────────────────────────────────
const AFFIXES = {
  suffixes:[
    { affix:"-ing", rule:"Drop nothing for most words. Drop the silent E before adding -ing.", color:"#4ADE80",
      examples:[{root:"play",result:"playing",mc:"The creeper was playing near your house."},
                {root:"mine",result:"mining",mc:"The player was mining for diamonds all night."},
                {root:"run",result:"running",mc:"He was running from the zombie horde.",note:"Double the final consonant for short vowel words."},
                {root:"jump",result:"jumping",mc:"The slime was jumping across the swamp."},
                {root:"make",result:"making",mc:"She was making a sword at the crafting table.",note:"Drop the E."}]},
    { affix:"-ed", rule:"For past tense. Drop the silent E, double consonants in short-vowel words.", color:"#22D3EE",
      examples:[{root:"craft",result:"crafted",mc:"He crafted a new pickaxe in the night."},
                {root:"mine",result:"mined",mc:"She mined forty blocks of iron ore."},
                {root:"stop",result:"stopped",mc:"The player stopped when she saw the dragon.",note:"Double the P."},
                {root:"look",result:"looked",mc:"He looked into the dark cave and saw eyes."},
                {root:"hike",result:"hiked",mc:"They hiked across the mountain biome.",note:"Drop the E."}]},
    { affix:"-er", rule:"Makes a comparison (bigger) or a person who does something (miner).", color:"#A78BFA",
      examples:[{root:"mine",result:"miner",mc:"The miner dug down to Y-level 12."},
                {root:"fast",result:"faster",mc:"The horse is faster than walking."},
                {root:"build",result:"builder",mc:"The builder made a castle out of quartz."},
                {root:"big",result:"bigger",mc:"The ender dragon is bigger than any other mob.",note:"Double the G."},
                {root:"explore",result:"explorer",mc:"The explorer found a woodland mansion.",note:"Drop the E."}]},
    { affix:"-est", rule:"Superlative — the most. Double consonants and drop E as with -er.", color:"#FB923C",
      examples:[{root:"fast",result:"fastest",mc:"The cheetah horse is the fastest in the plains."},
                {root:"big",result:"biggest",mc:"The deep dark is the biggest cave biome.",note:"Double the G."},
                {root:"safe",result:"safest",mc:"Your house is the safest place at night.",note:"Drop the E."},
                {root:"tall",result:"tallest",mc:"The tallest tree in the jungle reached 30 blocks."},
                {root:"strong",result:"strongest",mc:"The strongest boss in the game is the Wither."}]},
    { affix:"-ful", rule:"Means 'full of'. Just add -ful to the root word.", color:"#F87171",
      examples:[{root:"color",result:"colorful",mc:"The coral reef was colorful and beautiful."},
                {root:"care",result:"careful",mc:"Be careful when you open the ancient city chest."},
                {root:"wonder",result:"wonderful",mc:"The amethyst cave was wonderful to explore."},
                {root:"help",result:"helpful",mc:"Wolves are very helpful companions in battle."},
                {root:"power",result:"powerful",mc:"The Wither is a powerful and terrifying boss."}]},
    { affix:"-less", rule:"Means 'without'. Just add -less to the root word.", color:"#38BDF8",
      examples:[{root:"fear",result:"fearless",mc:"The fearless knight walked into the stronghold."},
                {root:"use",result:"useless",mc:"A wooden sword is useless against the Wither."},
                {root:"end",result:"endless",mc:"The End dimension seems endless and dark."},
                {root:"harm",result:"harmless",mc:"Bats are harmless — they just make noise."},
                {root:"hope",result:"hopeless",mc:"It felt hopeless to fight 20 zombies alone."}]},
    { affix:"-ness", rule:"Turns an adjective into a noun. Just add -ness.", color:"#818CF8",
      examples:[{root:"dark",result:"darkness",mc:"The darkness of the cave hid a treasure chest."},
                {root:"kind",result:"kindness",mc:"The villager showed kindness by giving extra bread."},
                {root:"soft",result:"softness",mc:"The softness of the wool made a cozy bed."},
                {root:"thick",result:"thickness",mc:"The thickness of the obsidian wall stopped the TNT."},
                {root:"bright",result:"brightness",mc:"The brightness of the beacon lit the whole area."}]},
    { affix:"-tion", rule:"Turns a verb into a noun. Often pronounced 'shun'.", color:"#F472B6",
      examples:[{root:"protect",result:"protection",mc:"Diamond armor gives the most protection."},
                {root:"create",result:"creation",mc:"His castle creation took three real-life days.",note:"Drop the E."},
                {root:"explore",result:"exploration",mc:"Exploration of the deep dark is very dangerous.",note:"Drop the E."},
                {root:"destroy",result:"destruction",mc:"The TNT caused massive destruction in the mine."},
                {root:"construct",result:"construction",mc:"The construction of the pyramid took many materials."}]},
  ],
  prefixes:[
    { affix:"un-", rule:"Means 'not' or 'opposite of'. Just add un- to the start.", color:"#4ADE80",
      examples:[{root:"happy",result:"unhappy",mc:"The villager was unhappy after the raid."},
                {root:"safe",result:"unsafe",mc:"It is unsafe to walk in the dark without torches."},
                {root:"lock",result:"unlock",mc:"You must unlock the next biome to explore it."},
                {root:"common",result:"uncommon",mc:"Pink sheep are uncommon in the game."},
                {root:"dead",result:"undead",mc:"Zombies and skeletons are undead creatures."}]},
    { affix:"re-", rule:"Means 'again'. Just add re- to the start.", color:"#22D3EE",
      examples:[{root:"build",result:"rebuild",mc:"You had to rebuild your house after the creeper."},
                {root:"plant",result:"replant",mc:"Replant your crops after every harvest."},
                {root:"spawn",result:"respawn",mc:"You will respawn at your bed if you die."},
                {root:"craft",result:"recraft",mc:"Recraft the item if you made a mistake."},
                {root:"fill",result:"refill",mc:"Refill your food supply before the long journey."}]},
    { affix:"pre-", rule:"Means 'before'. Just add pre- to the start.", color:"#A78BFA",
      examples:[{root:"heat",result:"preheat",mc:"Preheat your furnace before smelting the ore."},
                {root:"plan",result:"preplan",mc:"Preplan your raid defense before nightfall."},
                {root:"made",result:"premade",mc:"The template was premade for the village."},
                {root:"set",result:"preset",mc:"The preset world was already generated."},
                {root:"view",result:"preview",mc:"The preview showed what the biome would look like."}]},
    { affix:"mis-", rule:"Means 'wrongly' or 'badly'. Just add mis- to the start.", color:"#FB923C",
      examples:[{root:"place",result:"misplace",mc:"Don't misplace your diamond pickaxe in a chest!"},
                {root:"read",result:"misread",mc:"She misread the map and went the wrong way."},
                {root:"count",result:"miscount",mc:"He miscounted his arrows before the raid started."},
                {root:"use",result:"misuse",mc:"Don't misuse your TNT or you'll blow up your own base."},
                {root:"judge",result:"misjudge",mc:"He misjudged the height of the cliff and took damage."}]},
    { affix:"dis-", rule:"Means 'not' or 'opposite'. Often used for things you undo.", color:"#F87171",
      examples:[{root:"connect",result:"disconnect",mc:"Don't disconnect from the server during a boss fight."},
                {root:"appear",result:"disappear",mc:"Items disappear after five minutes on the ground."},
                {root:"agree",result:"disagree",mc:"The two players disagree about the best strategy."},
                {root:"cover",result:"discover",mc:"You discover diamonds at Y-level twelve."},
                {root:"like",result:"dislike",mc:"Most players dislike getting lost in the cave system."}]},
  ]
};

function EnchantTable({onEarn,initData={},onSaveProgress}){
  const [type,setType]=useState("suffixes");
  const [idx,setIdx]=useState(0);
  const [exIdx,setExIdx]=useState(0);
  const [phase,setPhase]=useState("teach"); // teach | quiz | done
  const [earned,setEarned]=useState({});
  const [mastered,setMastered]=useState(initData.enchantMastered||{});
  useEffect(()=>{onSaveProgress?.({enchantMastered:mastered});},[mastered]);

  const affixList=AFFIXES[type];
  const affix=affixList[idx];
  const ex=affix.examples[exIdx];
  const key=`${type}:${affix.affix}`;

  function nextEx(){
    if(exIdx<affix.examples.length-1){setExIdx(e=>e+1);}
    else{setPhase("quiz");}
  }
  function earnAffix(){
    if(!earned[key]){setEarned(e=>({...e,[key]:true}));onEarn(2,"📚 +2 EMERALDS! Affix mastered!");}
    setMastered(m=>({...m,[key]:true}));
    setPhase("done");
  }

  return(<div>
    <div className="px" style={{fontSize:8,color:"#C084FC",marginBottom:6}}>📚 ENCHANTING TABLE — AFFIXES</div>
    <div style={{borderLeft:"4px solid #C084FC",background:"#0a0010",padding:"8px 12px",borderRadius:"0 4px 4px 0",marginBottom:11,fontSize:13,lineHeight:1.7,color:"#886aaa"}}>
      <strong style={{color:"#eee"}}>How it works:</strong> A root word sits on the enchanting table. Drag an affix onto it to enchant the word. Read the new word in a Minecraft sentence. Earn emeralds for each affix mastered!
    </div>

    <div style={{display:"flex",gap:6,marginBottom:10}}>
      <button className={`btn ${type==="suffixes"?"btn-g":"btn-s"}`} style={{fontSize:7}} onClick={()=>{setType("suffixes");setIdx(0);setExIdx(0);setPhase("teach");}}>SUFFIXES (end)</button>
      <button className={`btn ${type==="prefixes"?"btn-g":"btn-s"}`} style={{fontSize:7}} onClick={()=>{setType("prefixes");setIdx(0);setExIdx(0);setPhase("teach");}}>PREFIXES (start)</button>
    </div>

    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:11}}>
      {affixList.map((a,i)=>(
        <button key={a.affix} className={`btn ${idx===i?"btn-g":"btn-s"}`}
          style={{fontSize:7,padding:"5px 9px",borderColor:idx===i?a.color:undefined,color:idx===i?a.color:undefined}}
          onClick={()=>{setIdx(i);setExIdx(0);setPhase("teach");}}>
          {a.affix}{mastered[`${type}:${a.affix}`]?" ✅":""}
        </button>
      ))}
    </div>

    {/* Enchanting table visual */}
    <div style={{background:"#0a0010",border:`3px solid ${affix.color}44`,borderRadius:6,padding:16,marginBottom:12,boxShadow:`0 0 20px ${affix.color}22`}}>
      <div className="px" style={{fontSize:7,color:affix.color,marginBottom:10,textAlign:"center"}}>{affix.affix.toUpperCase()} — {type==="suffixes"?"ADD TO END":"ADD TO START"}</div>

      {phase==="teach"&&(<div>
        <div style={{textAlign:"center",marginBottom:12}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 16px",border:`3px solid ${affix.color}`,borderRadius:4}}>
            {type==="prefixes"&&<span className="px" style={{color:affix.color,fontSize:14}}>{affix.affix}</span>}
            {type==="prefixes"&&<span style={{color:"#555",fontSize:18}}>+</span>}
            <span className="px" style={{color:"#eee",fontSize:16}}>{ex.root}</span>
            {type==="suffixes"&&<span style={{color:"#555",fontSize:18}}>+</span>}
            {type==="suffixes"&&<span className="px" style={{color:affix.color,fontSize:14}}>{affix.affix}</span>}
            <span style={{color:"#555",fontSize:18}}>=</span>
            <span className="px" style={{color:affix.color,fontSize:16,textShadow:`0 0 10px ${affix.color}`}}>{ex.result}</span>
          </div>
        </div>
        <div style={{background:"#060610",border:"2px solid #1a1a30",borderRadius:4,padding:"10px 13px",marginBottom:8,fontSize:16,lineHeight:1.8,color:"#ccc"}}>
          ⛏ <em>{ex.mc}</em>
        </div>
        {ex.note&&<div style={{fontSize:13,color:affix.color,marginBottom:8}}>📌 Rule: {ex.note}</div>}
        <div style={{fontSize:12,color:"#444",marginBottom:8}}>The rule: {affix.rule}</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button className="btn btn-g" style={{fontSize:7,borderColor:affix.color,color:affix.color}} onClick={nextEx}>
            {exIdx<affix.examples.length-1?`NEXT EXAMPLE (${exIdx+1}/${affix.examples.length}) ▶`:"START QUIZ ▶"}
          </button>
        </div>
      </div>)}

      {phase==="quiz"&&(<div>
        <div className="px" style={{fontSize:8,color:"#FFD700",marginBottom:8,textAlign:"center"}}>QUICK QUIZ</div>
        <div style={{fontSize:15,lineHeight:1.8,marginBottom:12,color:"#ccc"}}>
          Read all {affix.examples.length} words you learned. Say each one out loud:<br/>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:8}}>
            {affix.examples.map((e,i)=>(
              <span key={i} className="px" style={{fontSize:10,color:affix.color,border:`2px solid ${affix.color}44`,padding:"4px 8px",borderRadius:2}}>{e.result}</span>
            ))}
          </div>
        </div>
        <div style={{fontSize:14,color:"#888",marginBottom:11}}>Now use one in a sentence about Minecraft. Tell your tutor!</div>
        <button className="btn btn-gold" style={{fontSize:8}} onClick={earnAffix}>✅ I DID IT — ENCHANTMENT MASTERED</button>
      </div>)}

      {phase==="done"&&(<div style={{textAlign:"center",padding:12}}>
        <div style={{fontSize:32,marginBottom:6}}>✨</div>
        <div className="px" style={{fontSize:8,color:affix.color,marginBottom:6}}>ENCHANTED!</div>
        <div style={{fontSize:14,color:"#888",marginBottom:11}}>{affix.affix} is now in your enchanting book.</div>
        <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
          {idx<affixList.length-1&&<button className="btn btn-g" style={{fontSize:7,borderColor:affix.color,color:affix.color}} onClick={()=>{setIdx(i=>i+1);setExIdx(0);setPhase("teach");}}>NEXT AFFIX ▶</button>}
          <button className="btn btn-s" style={{fontSize:7}} onClick={()=>{setExIdx(0);setPhase("teach");}}>REVIEW AGAIN ↺</button>
        </div>
      </div>)}
    </div>
  </div>);
}

// ── TNT SYLLABLE BLAST ─────────────────────────────────────────────────────
const SYLLABLE_DATA = {
  "Closed": { color:"#F87171", desc:"Vowel is CLOSED IN by a consonant. Short vowel sound.", icon:"🧱",
    words:[{w:"nap-kin",hint:"Both syllables are closed — nap and kin"},
           {w:"bas-ket",hint:"bas has short A, ket has short E"},
           {w:"pil-grim",hint:"Two closed syllables"},
           {w:"rob-in",hint:"Short O in first syllable"},
           {w:"hel-met",hint:"Your armor! Two closed syllables"},
           {w:"cab-in",hint:"Where you start in survival mode"},
           {w:"vel-vet",hint:"Soft material, two closed syllables"},
           {w:"mag-net",hint:"Two closed — short A and short E"}]},
  "Open": { color:"#4ADE80", desc:"Vowel is OPEN at the end. Long vowel sound — says its name.", icon:"🚪",
    words:[{w:"ti-ger",hint:"Ti is open — the I says its name"},
           {w:"mu-sic",hint:"Mu is open — the U says its name"},
           {w:"ro-bot",hint:"Ro is open — the O says its name"},
           {w:"pi-lot",hint:"Pi is open — the I says its name"},
           {w:"to-tal",hint:"To is open — the O says its name"},
           {w:"si-lent",hint:"Si is open — the I says its name"},
           {w:"ba-con",hint:"Morning food! Ba is open"},
           {w:"mo-ment",hint:"Mo is open — the O says its name"}]},
  "Vowel-E": { color:"#C084FC", desc:"Silent E at the end makes the vowel say its NAME.", icon:"✨",
    words:[{w:"com-pete",hint:"Pete has the silent E magic"},
           {w:"con-crete",hint:"What paths are made of — crete is V-E"},
           {w:"ex-plode",hint:"Like TNT! Plode has silent E"},
           {w:"de-cide",hint:"Cide has silent E — long I"},
           {w:"in-vite",hint:"Vite has the magic E"},
           {w:"mis-take",hint:"Take has the magic E — long A"},
           {w:"dis-like",hint:"Like has the magic E — long I"},
           {w:"be-came",hint:"Came has the magic E — long A"}]},
  "Vowel Team": { color:"#22D3EE", desc:"Two vowels work TOGETHER as a team — stay in the same syllable.", icon:"🤝",
    words:[{w:"rain-coat",hint:"Rain and coat both have vowel teams"},
           {w:"green-house",hint:"EE team and OU team"},
           {w:"day-dream",hint:"AY team and EA team"},
           {w:"sea-food",hint:"EA team and OO team"},
           {w:"wait-ing",hint:"AI vowel team with -ing suffix"},
           {w:"re-peat",hint:"EA vowel team — repeat a passage!"},
           {w:"com-plain",hint:"AI vowel team in plain"},
           {w:"oat-meal",hint:"OA team and EA team"}]},
  "R-Controlled": { color:"#FB923C", desc:"R changes the vowel sound. AR, ER, IR, OR, UR stay together.", icon:"⭐",
    words:[{w:"gar-den",hint:"AR team stays together"},
           {w:"tur-key",hint:"UR team stays together"},
           {w:"per-fect",hint:"ER team stays together"},
           {w:"or-bit",hint:"OR team stays together"},
           {w:"cor-ner",hint:"OR team stays together"},
           {w:"har-vest",hint:"Harvest your crops! AR team"},
           {w:"for-tress",hint:"Nether fortress! OR team"},
           {w:"sur-face",hint:"Surface world! UR team"}]},
  "C+LE": { color:"#FFD700", desc:"Consonant + LE is ALWAYS the LAST syllable. The E is silent.", icon:"🕯️",
    words:[{w:"puz-zle",hint:"ZLE is the C+LE syllable"},
           {w:"can-dle",hint:"DLE is the C+LE syllable"},
           {w:"crum-ble",hint:"BLE is the C+LE syllable"},
           {w:"sim-ple",hint:"PLE is the C+LE syllable"},
           {w:"bun-dle",hint:"DLE is the C+LE syllable"},
           {w:"bat-tle",hint:"TLE is the C+LE syllable"},
           {w:"gig-gle",hint:"GLE is the C+LE syllable"},
           {w:"bub-ble",hint:"BLE is the C+LE syllable"}]},
};

function TNTBlast({onEarn,initData={},onSaveProgress}){
  const types=Object.keys(SYLLABLE_DATA);
  const [type,setType]=useState("Closed");
  const [idx,setIdx]=useState(0);
  const [phase,setPhase]=useState("teach"); // teach | blast | result
  const [earned,setEarned]=useState({});
  const [mastered,setMastered]=useState(initData.tntMastered||{});
  const [exploding,setExploding]=useState(false);
  // Lock current word AND options in state so they never shift mid-answer
  const [currentWord,setCurrentWord]=useState(null);
  const [options,setOptions]=useState([]);
  useEffect(()=>{onSaveProgress?.({tntMastered:mastered});},[mastered]);

  // Called whenever we need to load a specific word (by type + index)
  function loadWord(t,i){
    const sd=SYLLABLE_DATA[t];
    const w=sd.words[i];
    const correct=w.w;
    const letters=correct.replace(/-/g,""); // remove ALL hyphens
    const opts=[correct];
    for(let j=1;j<letters.length-1;j++){
      const opt=letters.slice(0,j)+"-"+letters.slice(j);
      if(!opts.includes(opt)&&opts.length<4)opts.push(opt);
    }
    setCurrentWord(w);
    setOptions(opts.sort(()=>Math.random()-.5));
    setPhase("teach");
  }

  // Initialize on mount
  useEffect(()=>{loadWord("Closed",0);},[]);

  if(!currentWord)return(<div style={{padding:20,textAlign:"center",color:"#555",fontFamily:"'Nunito',sans-serif",fontSize:14}}>Loading TNT Blast...</div>);

  const sd=SYLLABLE_DATA[type];
  const key=`${type}:${idx}`;
  const parts=currentWord.w.split("-");

  function tryBlast(split){
    // Ignore clicks during explosion animation — prevents double-tap overrides
    if(exploding) return;
    // Capture both key and currentWord NOW before any async state change
    const lockedKey=`${type}:${idx}`;
    const lockedWord=currentWord;
    const isCorrect=split===lockedWord.w;
    setExploding(true);
    setTimeout(()=>{
      setExploding(false);
      if(isCorrect){
        if(!earned[lockedKey]){setEarned(e=>({...e,[lockedKey]:true}));onEarn(1,"💥 +1 EMERALD! Syllable blasted!");}
        setMastered(m=>({...m,[lockedKey]:true}));
        setPhase("result");
      } else {
        setPhase("teach");
      }
    },800);
  }

  return(<div>
    <div className="px" style={{fontSize:8,color:"#FB923C",marginBottom:6}}>💥 TNT SYLLABLE BLAST</div>
    <div style={{borderLeft:"4px solid #FB923C",background:"#100500",padding:"8px 12px",borderRadius:"0 4px 4px 0",marginBottom:11,fontSize:13,lineHeight:1.7,color:"#886644"}}>
      <strong style={{color:"#eee"}}>How it works:</strong> A word appears on a TNT block. Choose where to split it into syllables. Get it right and the block EXPLODES at the right spot!
    </div>
    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:11}}>
      {types.map(t=>{
        const sd2=SYLLABLE_DATA[t];
        const mc=sd2.words.filter((w,i)=>mastered[`${t}:${i}`]).length;
        return(<button key={t} className={`btn ${type===t?"btn-g":"btn-s"}`}
          style={{fontSize:6,padding:"5px 8px",borderColor:type===t?sd2.color:undefined,color:type===t?sd2.color:undefined}}
          onClick={()=>{setType(t);setIdx(0);loadWord(t,0);}}>
          {sd2.icon} {t}{mc>0&&` ✅${mc}`}
        </button>);
      })}
    </div>

    <div style={{background:"#100500",border:`3px solid ${sd.color}55`,borderRadius:6,padding:14,marginBottom:10,boxShadow:`0 0 16px ${sd.color}22`}}>
      <div className="px" style={{fontSize:7,color:sd.color,marginBottom:6}}>{sd.icon} {type.toUpperCase()} SYLLABLE</div>
      <div style={{fontSize:13,color:"#886644",marginBottom:10}}>{sd.desc}</div>

      {/* TNT block */}
      <div style={{textAlign:"center",marginBottom:12}}>
        <div style={{display:"inline-block",background:"#1a0500",border:`4px solid ${sd.color}`,borderRadius:4,padding:"18px 26px",
          boxShadow:exploding?`0 0 40px ${sd.color}`:undefined,transition:"box-shadow .2s"}}>
          <div className="px" style={{fontSize:26,letterSpacing:6,color:exploding?sd.color:"#eee",textShadow:exploding?`0 0 20px ${sd.color}`:undefined}}>
            {currentWord.w.replace(/-/g,"")}
          </div>
          {exploding&&<div style={{fontSize:20,marginTop:6}}>💥</div>}
        </div>
      </div>

      {phase==="teach"&&(<>
        <div style={{fontSize:14,color:"#888",marginBottom:8,textAlign:"center"}}>Where does this word split?</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center",marginBottom:8}}>
          {options.map(opt=>(
            <button key={opt} className="btn btn-s"
              style={{fontSize:13,fontFamily:"'Press Start 2P',monospace",padding:"10px 14px",letterSpacing:2,
                opacity:exploding?0.4:1,pointerEvents:exploding?"none":"auto",transition:"opacity .2s"}}
              onClick={()=>tryBlast(opt)}>{opt}</button>
          ))}
        </div>
        <div style={{fontSize:12,color:"#444",textAlign:"center"}}>Hint: {currentWord.hint}</div>
      </>)}

      {phase==="result"&&(<div style={{textAlign:"center"}}>
        <div style={{fontSize:22,marginBottom:4}}>💥</div>
        <div className="px" style={{fontSize:9,color:sd.color,marginBottom:6}}>BLASTED!</div>
        <div className="px" style={{fontSize:16,color:sd.color,marginBottom:6,letterSpacing:4}}>{parts[0]} | {parts[1]}</div>
        <div style={{fontSize:13,color:"#888",marginBottom:11}}>{currentWord.hint}</div>
        <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
          {idx<sd.words.length-1
            ?<button className="btn btn-g" style={{fontSize:8,borderColor:sd.color,color:sd.color}} onClick={()=>{const ni=idx+1;setIdx(ni);loadWord(type,ni);}}>NEXT WORD ▶</button>
            :<button className="btn btn-gold" style={{fontSize:8}} onClick={()=>{setIdx(0);loadWord(type,0);}}>RESTART ↺</button>}
          {idx<sd.words.length-1&&<button className="btn btn-s" style={{fontSize:7}} onClick={()=>{setIdx(0);loadWord(type,0);}}>RESTART ↺</button>}
        </div>
      </div>)}
    </div>

    <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
      {sd.words.map((w,i)=>(
        <span key={i} style={{padding:"3px 8px",fontSize:11,fontFamily:"'Press Start 2P',monospace",borderRadius:2,border:"2px solid",
          borderColor:mastered[`${type}:${i}`]?sd.color:"#1a1a1a",
          background:mastered[`${type}:${i}`]?"#100500":"#050505",
          color:mastered[`${type}:${i}`]?sd.color:"#333"}}>{w.w}</span>
      ))}
    </div>
  </div>);
}

// ── CRAFTING TABLE — COMPOUND WORDS ─────────────────────────────────────────
const COMPOUNDS = [
  {a:"sun",b:"flower",result:"sunflower",icon:"🌻",mc:"Sunflowers always face east — use them like a compass!"},
  {a:"snow",b:"ball",result:"snowball",icon:"⛄",mc:"Throw snowballs at blazes to deal damage to them."},
  {a:"day",b:"light",result:"daylight",icon:"☀️",mc:"Daylight sensors power redstone circuits using sunlight."},
  {a:"fire",b:"work",result:"firework",icon:"🎆",mc:"Fireworks boost your elytra speed when you fly."},
  {a:"note",b:"book",result:"notebook",icon:"📓",mc:"Keep a notebook of your seed numbers so you never lose a good world."},
  {a:"book",b:"shelf",result:"bookshelf",icon:"📚",mc:"Bookshelves boost your enchanting table up to level 30."},
  {a:"bed",b:"rock",result:"bedrock",icon:"🪨",mc:"Bedrock is the indestructible bottom layer of every world."},
  {a:"sand",b:"stone",result:"sandstone",icon:"🏜️",mc:"Sandstone lines the walls of desert temples and pyramids."},
  {a:"water",b:"fall",result:"waterfall",icon:"💧",mc:"Stand in a waterfall to slow your descent from any height."},
  {a:"thunder",b:"storm",result:"thunderstorm",icon:"⛈️",mc:"During a thunderstorm, creepers struck by lightning become charged."},
  {a:"moon",b:"light",result:"moonlight",icon:"🌙",mc:"Moonlight does not stop hostile mobs from spawning at night."},
  {a:"fire",b:"place",result:"fireplace",icon:"🔥",mc:"Build a fireplace in your home using netherrack — it burns forever."},
  {a:"black",b:"smith",result:"blacksmith",icon:"⚒️",mc:"Blacksmith villagers sell armor, tools, and weapons."},
  {a:"chest",b:"plate",result:"chestplate",icon:"🛡️",mc:"A chestplate provides more armor points than any other piece."},
  {a:"over",b:"world",result:"overworld",icon:"🌍",mc:"The Overworld is the main dimension where every player spawns."},
  {a:"out",b:"post",result:"outpost",icon:"🗼",mc:"Pillager outposts spawn raids and are guarded by crossbow archers."},
  {a:"gold",b:"fish",result:"goldfish",icon:"🐠",mc:"Tropical fish in an aquarium can look just like goldfish."},
  {a:"rain",b:"bow",result:"rainbow",icon:"🌈",mc:"Rainbows appear in the sky after it stops raining."},
  {a:"grass",b:"land",result:"grassland",icon:"🌿",mc:"The grasslands biome is one of the most common places to spawn."},
  {a:"farm",b:"land",result:"farmland",icon:"🌱",mc:"Hoe dirt into farmland to plant seeds and grow crops."},
  {a:"trap",b:"door",result:"trapdoor",icon:"🚪",mc:"Trapdoors open and close with a button or lever signal."},
  {a:"fire",b:"ball",result:"fireball",icon:"💥",mc:"Ghasts shoot fireballs that explode on contact."},
  {a:"eye",b:"sight",result:"eyesight",icon:"👁️",mc:"Endermen have sharp eyesight — making eye contact makes them hostile."},
  {a:"star",b:"light",result:"starlight",icon:"⭐",mc:"The End dimension is lit only by starlight and the dragon's glow."},
];

function CompoundCrafter({onEarn,initData={},onSaveProgress}){
  const [idx,setIdx]=useState(0);
  const [phase,setPhase]=useState("craft"); // craft | result
  const [slots,setSlots]=useState([null,null]);
  const [output,setOutput]=useState(null);
  const [earned,setEarned]=useState({});
  const [mastered,setMastered]=useState(initData.compoundMastered||[]);
  const [wrong,setWrong]=useState(false);
  const [showAll,setShowAll]=useState(false);
  useEffect(()=>{onSaveProgress?.({compoundMastered:mastered});},[mastered]);

  const notMastered=COMPOUNDS.filter(c=>!mastered.includes(c.result));
  const current=notMastered[idx%Math.max(1,notMastered.length)]||COMPOUNDS[0];

  // Scramble slots — always guarantee current.a and current.b are present
  const [options,setOptions]=useState([]);
  useEffect(()=>{
    // Start with the two correct parts — they MUST be in the list
    const required=[current.a, current.b];
    // Pull distractor words from other compounds, avoiding duplicates
    const distractors=COMPOUNDS
      .filter(c=>c!==current)
      .flatMap(c=>[c.a,c.b])
      .filter(w=>!required.includes(w));
    const shuffledDistractors=[...new Set(distractors)].sort(()=>Math.random()-.5).slice(0,4);
    // Shuffle required + distractors together
    const all=[...required,...shuffledDistractors].sort(()=>Math.random()-.5);
    setOptions(all);
    setSlots([null,null]);setOutput(null);setWrong(false);
  },[idx,mastered.length]);

  function placeWord(word){
    if(slots[0]===null){setSlots([word,null]);}
    else if(slots[1]===null){
      const s=[slots[0],word];
      setSlots(s);
      const combined=s.join("");
      if(combined===current.result){
        setOutput(current);
        if(!earned[current.result]){setEarned(e=>({...e,[current.result]:true}));onEarn(2,"🔨 +2 EMERALDS! Compound word crafted!");}
        if(!mastered.includes(current.result))setMastered(m=>[...m,current.result]);
        setTimeout(()=>setPhase("result"),400);
      } else {
        setWrong(true);setTimeout(()=>{setSlots([null,null]);setWrong(false);},700);
      }
    }
  }

  return(<div>
    <div className="px" style={{fontSize:8,color:"#22D3EE",marginBottom:6}}>🔨 CRAFTING TABLE — COMPOUND WORDS</div>
    <div style={{borderLeft:"4px solid #22D3EE",background:"#000d12",padding:"8px 12px",borderRadius:"0 4px 4px 0",marginBottom:11,fontSize:13,lineHeight:1.7,color:"#226677"}}>
      <strong style={{color:"#eee"}}>How it works:</strong> Two word-blocks go into the crafting table. Put them in the right order to make a compound word. Just like crafting recipes!
    </div>

    <div style={{background:"#050510",border:"3px solid #22d3ee33",borderRadius:6,padding:16,marginBottom:10}}>
      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:14,justifyContent:"center",flexWrap:"wrap"}}>
        <div style={{background:"#0a0a1a",border:`3px solid ${wrong?"#F87171":slots[0]?"#22D3EE":"#1a1a2a"}`,borderRadius:4,padding:"14px 20px",minWidth:90,textAlign:"center",transition:"border-color .2s"}}>
          <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:14,color:slots[0]?"#22D3EE":"#333"}}>{slots[0]||"?"}</div>
        </div>
        <div style={{fontSize:18,color:"#333"}}>+</div>
        <div style={{background:"#0a0a1a",border:`3px solid ${wrong?"#F87171":slots[1]?"#22D3EE":"#1a1a2a"}`,borderRadius:4,padding:"14px 20px",minWidth:90,textAlign:"center",transition:"border-color .2s"}}>
          <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:14,color:slots[1]?"#22D3EE":"#333"}}>{slots[1]||"?"}</div>
        </div>
        <div style={{fontSize:18,color:"#333"}}>=</div>
        <div style={{background:"#0a1a0a",border:`3px solid ${output?"#4ADE80":"#1a2a1a"}`,borderRadius:4,padding:"14px 20px",minWidth:110,textAlign:"center"}}>
          <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:13,color:output?"#4ADE80":"#1a3a1a"}}>{output?output.result:"???"}</div>
        </div>
      </div>

      {phase==="craft"&&(<>
        {slots[0]&&<button className="btn btn-s" style={{fontSize:7,marginBottom:8}} onClick={()=>setSlots([null,null])}>CLEAR ✕</button>}
        <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center"}}>
          {options.map(w=>(
            <button key={w} className="btn btn-s" style={{fontSize:12,fontFamily:"'Press Start 2P',monospace",padding:"10px 14px",letterSpacing:1}}
              onClick={()=>placeWord(w)}>{w}</button>
          ))}
        </div>
        <div style={{fontSize:12,color:"#333",marginTop:8,textAlign:"center"}}>Tap words to fill the crafting slots in order</div>
      </>)}

      {phase==="result"&&output&&(<div style={{textAlign:"center"}}>
        <div style={{fontSize:26,marginBottom:4}}>{output.icon}</div>
        <div className="px" style={{fontSize:9,color:"#4ADE80",marginBottom:6}}>CRAFTED!</div>
        <div style={{fontSize:15,lineHeight:1.8,color:"#ccc",marginBottom:11}}>⛏ <em>{output.mc}</em></div>
        <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
          {notMastered.length>1
            ?<button className="btn btn-g" style={{fontSize:8}} onClick={()=>{setIdx(i=>(i+1)%Math.max(1,notMastered.length));setPhase("craft");}}>NEXT WORD ▶</button>
            :<button className="btn btn-gold" style={{fontSize:8}} onClick={()=>{setMastered([]);setIdx(0);setPhase("craft");}}>ALL DONE! RESTART ★</button>}
        </div>
      </div>)}
    </div>

    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
      <div style={{fontSize:12,color:"#555"}}>Crafted: {mastered.length}/{COMPOUNDS.length}</div>
      <button className="btn btn-s" style={{fontSize:6}} onClick={()=>setShowAll(s=>!s)}>{showAll?"HIDE":"SHOW ALL"}</button>
    </div>
    {showAll&&(<div style={{display:"flex",flexWrap:"wrap",gap:4}}>
      {COMPOUNDS.map(c=>(
        <span key={c.result} style={{padding:"3px 8px",fontSize:11,fontFamily:"'Press Start 2P',monospace",borderRadius:2,border:"2px solid",
          borderColor:mastered.includes(c.result)?"#4ADE80":"#1a1a1a",
          background:mastered.includes(c.result)?"#052E16":"#050505",
          color:mastered.includes(c.result)?"#4ADE80":"#333"}}>{c.result}</span>
      ))}
    </div>)}
  </div>);
}

// ── FURNACE — CONTRACTIONS ────────────────────────────────────────────────
const CONTRACTIONS = [
  {a:"do",b:"not",result:"don't",burns:"o",mc:"Don't step on the pressure plate!"},
  {a:"I",b:"am",result:"I'm",burns:"a",mc:"I'm going into the Nether today."},
  {a:"they",b:"are",result:"they're",burns:"a",mc:"They're building a huge castle on the server."},
  {a:"it",b:"is",result:"it's",burns:"i",mc:"It's dangerous to mine without a torch."},
  {a:"you",b:"are",result:"you're",burns:"a",mc:"You're the best builder on the server."},
  {a:"we",b:"are",result:"we're",burns:"a",mc:"We're going on a raid tonight at midnight."},
  {a:"I",b:"will",result:"I'll",burns:"wi",mc:"I'll craft a diamond sword before the fight."},
  {a:"he",b:"is",result:"he's",burns:"i",mc:"He's the one who found the stronghold."},
  {a:"she",b:"is",result:"she's",burns:"i",mc:"She's the best at finding diamonds."},
  {a:"can",b:"not",result:"can't",burns:"no",mc:"You can't break bedrock with any tool."},
  {a:"I",b:"have",result:"I've",burns:"ha",mc:"I've been mining for three hours straight."},
  {a:"they",b:"will",result:"they'll",burns:"wi",mc:"They'll attack your base if you don't prepare."},
  {a:"would",b:"not",result:"wouldn't",burns:"o",mc:"He wouldn't build a house out of dirt again."},
  {a:"could",b:"not",result:"couldn't",burns:"o",mc:"She couldn't carry any more items — inventory full!"},
  {a:"should",b:"not",result:"shouldn't",burns:"o",mc:"You shouldn't fight the Wither without full diamond armor."},
  {a:"there",b:"is",result:"there's",burns:"i",mc:"There's a skeleton spawner behind that wall."},
  {a:"we",b:"have",result:"we've",burns:"ha",mc:"We've explored every biome on this server."},
  {a:"that",b:"is",result:"that's",burns:"i",mc:"That's the most diamonds I've ever found!"},
  {a:"what",b:"is",result:"what's",burns:"i",mc:"What's inside the ancient city chest?"},
  {a:"let",b:"us",result:"let's",burns:"u",mc:"Let's go find the stronghold before nightfall."},
];

function FurnaceContractions({onEarn,initData={},onSaveProgress}){
  const [phase,setPhase]=useState("smelt"); // smelt | quiz | result
  const [earned,setEarned]=useState({});
  const [mastered,setMastered]=useState(initData.contractionMastered||[]);
  const [burning,setBurning]=useState(false);
  const [showHint,setShowHint]=useState(false);

  // Build first pick synchronously so there is never a null/loading flash
  function buildPick(masteredList){
    const pool=CONTRACTIONS.filter(c=>!masteredList.includes(c.result));
    const src=pool.length>0?pool:CONTRACTIONS;
    const next=src[Math.floor(Math.random()*src.length)];
    const opts=[next,...CONTRACTIONS.filter(c=>c.result!==next.result).sort(()=>Math.random()-.5).slice(0,3)]
      .map(c=>c.result).sort(()=>Math.random()-.5);
    return{next,opts};
  }
  const initMastered=initData.contractionMastered||[];
  const {next:initNext,opts:initOpts}=buildPick(initMastered);

  const [current,setCurrent]=useState(initNext);
  const [quizOptions,setQuizOptions]=useState(initOpts);

  useEffect(()=>{onSaveProgress?.({contractionMastered:mastered});},[mastered]);

  function pickNext(updatedMastered){
    const{next,opts}=buildPick(updatedMastered);
    setCurrent(next);
    setQuizOptions(opts);
    setShowHint(false);
    setPhase("smelt");
  }

  function smelt(){
    setBurning(true);
    setTimeout(()=>{setBurning(false);setPhase("quiz");},1200);
  }
  function checkAnswer(ans){
    if(ans===current.result){
      if(!earned[current.result]){setEarned(e=>({...e,[current.result]:true}));onEarn(2,"🔥 +2 EMERALDS! Contraction smelted!");}
      const updated=mastered.includes(current.result)?mastered:[...mastered,current.result];
      setMastered(updated);
      setPhase("result");
    } else {
      setShowHint(true);
    }
  }

  return(<div>
    <div className="px" style={{fontSize:8,color:"#FB923C",marginBottom:6}}>🔥 FURNACE — CONTRACTIONS</div>
    <div style={{borderLeft:"4px solid #FB923C",background:"#100500",padding:"8px 12px",borderRadius:"0 4px 4px 0",marginBottom:11,fontSize:13,lineHeight:1.7,color:"#886644"}}>
      <strong style={{color:"#eee"}}>How it works:</strong> Two words go into the furnace. The fire burns away some letters and replaces them with an apostrophe. The contraction smelts out!
    </div>

    <div style={{background:"#100500",border:"3px solid #FB923C44",borderRadius:6,padding:16,marginBottom:10}}>
      {phase==="smelt"&&(<div style={{textAlign:"center"}}>
        <div style={{display:"flex",gap:8,alignItems:"center",justifyContent:"center",marginBottom:14,flexWrap:"wrap"}}>
          <div style={{background:"#1a0500",border:"3px solid #FB923C",borderRadius:4,padding:"12px 18px"}}>
            <div className="px" style={{fontSize:13,color:"#eee"}}>{current.a}</div>
          </div>
          <div style={{fontSize:18,color:"#555"}}>+</div>
          <div style={{background:"#1a0500",border:"3px solid #FB923C",borderRadius:4,padding:"12px 18px"}}>
            <div className="px" style={{fontSize:13,color:"#eee"}}>{current.b}</div>
          </div>
        </div>
        <div style={{fontSize:24,marginBottom:6}}>{burning?"🔥":"🟧"}</div>
        {burning&&<div style={{fontSize:13,color:"#FB923C",animation:"pop .3s",marginBottom:6}}>Burning away "{current.burns}"...</div>}
        <button className="btn btn-g" style={{fontSize:8,borderColor:"#FB923C",color:"#FB923C"}} onClick={smelt} disabled={burning}>
          {burning?"SMELTING...":"🔥 SMELT IT"}
        </button>
      </div>)}

      {phase==="quiz"&&(<div style={{textAlign:"center"}}>
        <div style={{fontSize:14,color:"#888",marginBottom:10}}>What contraction was created?</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginBottom:10}}>
          {quizOptions.map(opt=>(
            <button key={opt} className="btn btn-s" style={{fontSize:12,fontFamily:"'Press Start 2P',monospace",padding:"10px 16px"}}
              onClick={()=>checkAnswer(opt)}>{opt}</button>
          ))}
        </div>
        {showHint&&<div style={{fontSize:13,color:"#F87171"}}>Not quite — think about what letters burned away! ({current.a} + {current.b})</div>}
      </div>)}

      {phase==="result"&&(<div style={{textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:10,flexWrap:"wrap"}}>
          <div className="px" style={{fontSize:12,color:"#555"}}>{current.a}</div>
          <div style={{fontSize:16,color:"#555"}}>+</div>
          <div className="px" style={{fontSize:12,color:"#555"}}>{current.b}</div>
          <div style={{fontSize:16,color:"#555"}}>→</div>
          <div className="px" style={{fontSize:16,color:"#FB923C",textShadow:"0 0 12px #FB923C"}}>{current.result}</div>
        </div>
        <div style={{fontSize:15,lineHeight:1.8,color:"#ccc",marginBottom:11}}>🔥 <em>{current.mc}</em></div>
        <div style={{fontSize:12,color:"#555",marginBottom:11}}>Letters that burned away: "{current.burns}"</div>
        <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
          {mastered.length<CONTRACTIONS.length
            ?<button className="btn btn-g" style={{fontSize:8,borderColor:"#FB923C",color:"#FB923C"}} onClick={()=>pickNext(mastered)}>NEXT ▶</button>
            :<button className="btn btn-gold" style={{fontSize:8}} onClick={()=>{setMastered([]);pickNext([]);}}>ALL DONE! RESTART ★</button>}
        </div>
      </div>)}
    </div>

    <div style={{fontSize:12,color:"#555",marginBottom:5}}>Mastered: {mastered.length}/{CONTRACTIONS.length}</div>
    <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
      {CONTRACTIONS.map(c=>(
        <span key={c.result} style={{padding:"3px 7px",fontSize:11,fontFamily:"'Press Start 2P',monospace",borderRadius:2,border:"2px solid",
          borderColor:mastered.includes(c.result)?"#FB923C":"#1a1a1a",
          background:mastered.includes(c.result)?"#100500":"#050505",
          color:mastered.includes(c.result)?"#FB923C":"#333"}}>{c.result}</span>
      ))}
    </div>
  </div>);
}

// ── VOCABULARY CHEST + QUEST LOG ─────────────────────────────────────────
const VOCAB_WORDS = [
  {word:"enormous",def:"Very, very big — much bigger than normal.",mc:"The ender dragon was enormous — bigger than ten players.",tier:"T2",level:"2nd"},
  {word:"cautious",def:"Being very careful because something might be dangerous.",mc:"Be cautious when you enter a cave — monsters might be inside.",tier:"T2",level:"2nd"},
  {word:"determined",def:"Having a strong will to do something, even when it is hard.",mc:"The determined player kept mining for three hours until she found diamonds.",tier:"T2",level:"2nd"},
  {word:"investigate",def:"To look carefully at something to find out more about it.",mc:"You should investigate every cave to find the stronghold.",tier:"T2",level:"2nd"},
  {word:"strategy",def:"A plan you make to achieve something or win.",mc:"Your strategy was to destroy the end crystals first.",tier:"T2",level:"2nd"},
  {word:"fortunate",def:"Lucky — having good things happen to you.",mc:"It was fortunate that the creeper missed and blew up just the ground.",tier:"T2",level:"2nd"},
  {word:"furious",def:"Extremely angry.",mc:"The Wither was furious after you shot it with arrows.",tier:"T2",level:"2nd"},
  {word:"scarce",def:"Hard to find because there is very little of it.",mc:"Ancient debris is scarce — you might mine 500 blocks without finding any.",tier:"T2",level:"3rd"},
  {word:"crucial",def:"Absolutely necessary — you cannot succeed without it.",mc:"Having food is crucial before any boss fight.",tier:"T2",level:"3rd"},
  {word:"dedicate",def:"To give a lot of time and effort to something.",mc:"He dedicated ten hours to building the perfect castle.",tier:"T2",level:"3rd"},
  {word:"treacherous",def:"Very dangerous and likely to cause harm.",mc:"The Nether is treacherous for players without fire resistance.",tier:"T2",level:"3rd"},
  {word:"persevere",def:"To keep going even when something is difficult.",mc:"You must persevere through 200 blocks of stone to reach diamond level.",tier:"T2",level:"3rd"},
  {word:"precise",def:"Exactly right — no room for error.",mc:"You need to be precise when you place TNT near your valuables.",tier:"T2",level:"3rd"},
  {word:"abundant",def:"Present in large amounts — more than enough.",mc:"Gravel is abundant near the ocean floor.",tier:"T2",level:"3rd"},
  {word:"concealed",def:"Hidden from view.",mc:"The dungeon was concealed behind a wall of stone.",tier:"T2",level:"3rd"},
  {word:"detect",def:"To discover or notice something that is hard to see.",mc:"You can detect ancient city locations by looking for sculk blocks.",tier:"T2",level:"3rd"},
  {word:"sequence",def:"A set of things that happen in a particular order.",mc:"The correct sequence is: mine ore, smelt it, craft tools, mine deeper.",tier:"T2",level:"3rd"},
  {word:"collaborate",def:"To work together with others toward a common goal.",mc:"You need to collaborate with your team to defeat the Wither.",tier:"T2",level:"3rd"},
  {word:"hazardous",def:"Dangerous and likely to cause harm.",mc:"Lava is hazardous to players who have no fire resistance.",tier:"T2",level:"3rd"},
  {word:"navigate",def:"To plan a route and find your way somewhere.",mc:"It is easy to navigate in the Nether if you mark your portal.",tier:"T2",level:"3rd"},
];

const QUEST_PASSAGES = [
  { id:1, level:"1st", icon:"🌾", title:"The Creeper Surprise",
    text:"Jake was mining coal when he heard a hiss. He turned around just in time to see a green creeper right behind him. He ran as fast as he could. The creeper exploded! The blast blew a big hole in the tunnel. Jake was safe because he ran fast enough. His heart was still beating hard. He sat down and ate some bread to feel better. Then he placed new torches in the hole and kept on mining.",
    q1:{q:"What happened in this story?",hint:"Tell the events in order."},
    q2:{q:"Why did Jake run when he heard the hiss?",hint:"Use a clue from the story to answer."},
    q3:{q:"What caused the hole in the tunnel?",hint:"Find the cause-and-effect."}},
  { id:2, level:"1st", icon:"🐑", title:"The Lost Sheep",
    text:"Mia had five sheep on her farm. One morning she counted them and only saw four. One sheep was missing! She looked in the field. She looked by the pond. She looked in the forest. Finally she found the sheep stuck between two trees. She pushed it gently back toward the farm. When she got home she put a fence all the way around so the sheep could not get out again.",
    q1:{q:"What was the problem in this story?",hint:"What went wrong?"},
    q2:{q:"Why did Mia put up a fence at the end?",hint:"Think about what she learned."},
    q3:{q:"What is the main idea of this story?",hint:"What is it mostly about?"}},
  { id:3, level:"2nd", icon:"🏰", title:"Building the Castle",
    text:"Zoe wanted to build the biggest castle on the server. She made a plan before she started. First she decided on the size — 50 blocks wide and 30 blocks tall. Then she gathered materials for three days: stone, oak wood, and glass. When she finally started building, she worked for six hours each day. Some players said it was too big. But Zoe was determined. After two weeks, the castle was finished. It had four towers, a great hall, and a moat filled with water. Everyone on the server came to see it.",
    q1:{q:"What steps did Zoe take to build her castle?",hint:"List what she did first, then, and finally."},
    q2:{q:"Why do you think Zoe made a plan before she started?",hint:"Think about what happens when you don't plan."},
    q3:{q:"What does the word 'determined' mean in this passage? How do you know?",hint:"Look for clues in what Zoe did."}},
  { id:4, level:"2nd", icon:"🔥", title:"First Time in the Nether",
    text:"Carlos stepped through the portal for the first time. Everything was red and orange. The air was hot. He could see rivers of lava far below. A ghast screamed overhead and shot a fireball at him. He dodged it just in time. His hands were shaking. He had read about the Nether in guides, but reading about it was very different from being inside it. He took a deep breath and reminded himself of his strategy: find a Nether fortress, collect blaze rods, and get out. He pulled out his map and started walking.",
    q1:{q:"How did Carlos feel in the Nether? How do you know?",hint:"Find words that describe his feelings."},
    q2:{q:"What does this passage tell you about the difference between reading about something and doing it?",hint:"This is an inferencing question."},
    q3:{q:"What was Carlos's strategy? Why is having a strategy important?",hint:"Find his plan and think about why it mattered."}},
  { id:5, level:"3rd", icon:"💎", title:"The Diamond Dilemma",
    text:"Priya found sixteen diamonds at Y-level twelve. It was the most she had ever found in one day. She also found her friend Marcus had been secretly mining in her claimed territory. The diamonds were in his tunnel, not hers. By the rules of the server, they were his to keep. She confronted him about mining in her area without asking. He apologized and said he had not noticed the border markers. After thinking it over, Priya decided to trust that he was telling the truth. They agreed to mark borders more clearly. In the end, Marcus gave her eight of the diamonds as a gesture of goodwill. Priya realized that being fair — even when you don't have to be — builds better friendships.",
    q1:{q:"What was the central conflict in this story?",hint:"What problem did Priya face?"},
    q2:{q:"Why did Marcus give Priya half the diamonds even though he didn't have to?",hint:"Think about what kind of person he was showing himself to be."},
    q3:{q:"What lesson does this story teach? Use evidence from the text.",hint:"Think about what Priya says at the end."}},
];

function VocabChest({onEarn,initData={},onSaveProgress}){
  const [subTab,setSubTab]=useState("vocab");
  const [revealed,setRevealed]=useState(initData.vocabRevealed||{});
  const [vocabEarned,setVocabEarned]=useState(initData.vocabEarned||{});
  const [questIdx,setQuestIdx]=useState(0);
  const [questDone,setQuestDone]=useState(initData.questDone||{});
  const [questEarned,setQuestEarned]=useState(initData.questEarned||{});
  const [filter,setFilter]=useState("all");
  useEffect(()=>{onSaveProgress?.({vocabRevealed:revealed,vocabEarned,questDone,questEarned});},[revealed,vocabEarned,questDone,questEarned]);

  const filtered=filter==="all"?VOCAB_WORDS:VOCAB_WORDS.filter(v=>v.level===filter);
  const passage=QUEST_PASSAGES[questIdx];

  function earnVocab(word){
    if(!vocabEarned[word]){setVocabEarned(e=>({...e,[word]:true}));onEarn(1,"📖 +1 EMERALD! New vocab word!");}
  }
  function completeQuest(id,qNum){
    const key=`${id}:${qNum}`;
    if(!questEarned[key]){setQuestEarned(e=>({...e,[key]:true}));onEarn(2,"📜 +2 EMERALDS! Quest complete!");}
    setQuestDone(d=>({...d,[key]:true}));
  }

  return(<div>
    <div className="px" style={{fontSize:8,color:"#FFD700",marginBottom:6}}>📜 QUESTS & VOCAB</div>
    <div style={{display:"flex",gap:6,marginBottom:10}}>
      <button className={`btn ${subTab==="vocab"?"btn-gold":"btn-s"}`} style={{fontSize:7}} onClick={()=>setSubTab("vocab")}>📚 VOCAB CHEST</button>
      <button className={`btn ${subTab==="quest"?"btn-gold":"btn-s"}`} style={{fontSize:7}} onClick={()=>setSubTab("quest")}>📜 QUEST LOG</button>
    </div>

    {subTab==="vocab"&&(<div>
      <div style={{borderLeft:"4px solid #FFD700",background:"#080500",padding:"8px 12px",borderRadius:"0 4px 4px 0",marginBottom:11,fontSize:13,lineHeight:1.7,color:"#886600"}}>
        <strong style={{color:"#eee"}}>Tier 2 Words</strong> — These words appear across many subjects in school. Knowing them unlocks reading comprehension at 3rd grade and beyond. Each word earns 1 emerald!
      </div>
      <div style={{display:"flex",gap:4,marginBottom:10,flexWrap:"wrap"}}>
        {["all","2nd","3rd"].map(f=>(
          <button key={f} className={`btn ${filter===f?"btn-gold":"btn-s"}`} style={{fontSize:6,padding:"4px 8px"}} onClick={()=>setFilter(f)}>{f==="all"?"ALL LEVELS":f+" Grade"}</button>
        ))}
      </div>
      <div style={{display:"grid",gap:8}}>
        {filtered.map(v=>(
          <div key={v.word} className="box" style={{padding:12,background:"#040400",cursor:"pointer"}} onClick={()=>{setRevealed(r=>({...r,[v.word]:!r[v.word]}));earnVocab(v.word);}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div className="px" style={{fontSize:11,color:"#FFD700",flex:1}}>{v.word}</div>
              <div style={{fontSize:11,color:"#555"}}>{v.level}</div>
              {vocabEarned[v.word]&&<span style={{color:"#4ADE80",fontSize:12}}>✅</span>}
            </div>
            {revealed[v.word]&&(<div style={{marginTop:9}}>
              <div style={{fontSize:15,lineHeight:1.7,color:"#ccc",marginBottom:6}}>{v.def}</div>
              <div style={{fontSize:14,lineHeight:1.7,color:"#666"}}>⛏ <em>{v.mc}</em></div>
            </div>)}
          </div>
        ))}
      </div>
    </div>)}

    {subTab==="quest"&&(<div>
      <div style={{borderLeft:"4px solid #FFD700",background:"#080500",padding:"8px 12px",borderRadius:"0 4px 4px 0",marginBottom:11,fontSize:13,lineHeight:1.7,color:"#886600"}}>
        <strong style={{color:"#eee"}}>Quest Log — Reading Comprehension</strong> Tutor reads the passage together. Then answer the 3 quests: Literal → Inference → Main Idea or Cause/Effect. Each quest earns 2 emeralds!
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
        {QUEST_PASSAGES.map((p,i)=>{
          const done=[1,2,3].filter(n=>questDone[`${p.id}:${n}`]).length;
          return(<button key={p.id} className={`btn ${questIdx===i?"btn-gold":"btn-s"}`} style={{fontSize:6,padding:"5px 9px"}} onClick={()=>setQuestIdx(i)}>
            {p.icon} {p.level}{done>0&&` ✅${done}/3`}
          </button>);
        })}
      </div>
      <div className="box" style={{padding:14,background:"#050400",marginBottom:10}}>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
          <span style={{fontSize:20}}>{passage.icon}</span>
          <div>
            <div className="px" style={{fontSize:7,color:"#FFD700"}}>{passage.title}</div>
            <div style={{fontSize:11,color:"#555"}}>{passage.level} Grade Level</div>
          </div>
        </div>
        <div style={{fontSize:17,lineHeight:2.0,color:"#ddd"}}>{passage.text}</div>
      </div>
      {[{n:1,q:passage.q1,label:"LITERAL"},{n:2,q:passage.q2,label:"INFERENCE"},{n:3,q:passage.q3,label:"MAIN IDEA / CAUSE + EFFECT"}].map(({n,q,label})=>{
        const key=`${passage.id}:${n}`;
        const done=questDone[key];
        return(<div key={n} style={{background:"#060400",border:`2px solid ${done?"#4ADE80":"#FFD700"}44`,borderRadius:4,padding:"10px 13px",marginBottom:8}}>
          <div className="px" style={{fontSize:6,color:"#FFD700",marginBottom:5}}>QUEST {n} — {label}</div>
          <div style={{fontSize:15,lineHeight:1.7,color:"#ccc",marginBottom:6}}>{q.q}</div>
          <div style={{fontSize:12,color:"#555",marginBottom:8}}>💡 Tutor hint: {q.hint}</div>
          {!done
            ?<button className="btn btn-gold" style={{fontSize:7,padding:"7px 12px"}} onClick={()=>completeQuest(passage.id,n)}>✅ QUEST COMPLETE (+2 emeralds)</button>
            :<span style={{fontSize:13,color:"#4ADE80"}}>✅ Quest completed!</span>}
        </div>);
      })}
    </div>)}
  </div>);
}

// ── SKILLS HUB (wrapper) ──────────────────────────────────────────────────
function SkillsHub({onEarn,progress,onSaveProgress}){
  const SKILL_TABS=[
    {id:"portal",label:"🔮 PORTAL",desc:"Sight Words"},
    {id:"speedrun",label:"🏃 SPEEDRUN",desc:"Fluency"},
    {id:"enchant",label:"📚 ENCHANT",desc:"Suffixes & Prefixes"},
    {id:"tnt",label:"💥 TNT",desc:"Syllables"},
    {id:"craft",label:"🔨 CRAFT",desc:"Compounds"},
    {id:"furnace",label:"🔥 FURNACE",desc:"Contractions"},
    {id:"quest",label:"📜 QUESTS",desc:"Comprehension + Vocab"},
  ];
  const [sk,setSk]=useState("portal");
  return(<div>
    <div className="px" style={{fontSize:8,color:"#4ADE80",marginBottom:8}}>⚡ SKILLS — 1ST → 3RD GRADE</div>
    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:12,padding:"8px 0",borderBottom:"2px solid #1a1a1a"}}>
      {SKILL_TABS.map(t=>(
        <button key={t.id} className={`btn ${sk===t.id?"btn-g":"btn-s"}`} style={{fontSize:6,padding:"5px 8px",flexDirection:"column",alignItems:"center",gap:2}}
          onClick={()=>setSk(t.id)}>
          <div>{t.label}</div>
          <div style={{fontSize:5,color:"#555",marginTop:2}}>{t.desc}</div>
        </button>
      ))}
    </div>
    {sk==="portal"&&<SightWordPortal onEarn={onEarn} initData={progress} onSaveProgress={onSaveProgress}/>}
    {sk==="speedrun"&&<FluencySpeedrun onEarn={onEarn} initData={progress} onSaveProgress={onSaveProgress}/>}
    {sk==="enchant"&&<EnchantTable onEarn={onEarn} initData={progress} onSaveProgress={onSaveProgress}/>}
    {sk==="tnt"&&<TNTBlast onEarn={onEarn} initData={progress} onSaveProgress={onSaveProgress}/>}
    {sk==="craft"&&<CompoundCrafter onEarn={onEarn} initData={progress} onSaveProgress={onSaveProgress}/>}
    {sk==="furnace"&&<FurnaceContractions onEarn={onEarn} initData={progress} onSaveProgress={onSaveProgress}/>}
    {sk==="quest"&&<VocabChest onEarn={onEarn} initData={progress} onSaveProgress={onSaveProgress}/>}
  </div>);
}

// ── TEACHER DASHBOARD ────────────────────────────────────────────────
function TeacherDashboard({roster,onSelect,onDelete,onAddNew}){
  const [newName,setNewName]=useState("");
  const [adding,setAdding]=useState(false);
  const [loadedData,setLoadedData]=useState({});

  useEffect(()=>{
    roster.forEach(async name=>{
      const p=await loadProgress(name);
      setLoadedData(d=>({...d,[name]:p}));
    });
  },[roster]);

  function handleAdd(){
    const n=newName.trim();
    if(!n)return;
    onAddNew(n);
    setNewName("");setAdding(false);
  }

  function sightPct(p){
    if(!p?.sightMastered)return 0;
    const all=Object.entries(SIGHT_WORDS).flatMap(([grade,g])=>g.words.map(w=>grade+":"+w));
    const done=all.filter(k=>p.sightMastered[k]);
    return Math.round(done.length/all.length*100);
  }
  function bestWPM(p){
    if(!p?.fluencyPBs)return 0;
    return Math.max(0,...Object.values(p.fluencyPBs));
  }
  function daysSince(iso){
    if(!iso)return null;
    const d=Math.floor((Date.now()-new Date(iso))/(1000*60*60*24));
    return d===0?"today":d===1?"yesterday":`${d} days ago`;
  }

  const LEVEL_COLORS={"#4ADE80":"1st","#22D3EE":"2nd","#A78BFA":"3rd"};

  return(<>
    <style>{BASE_CSS}{themeCSS(LESSONS[0])}</style>
    <StarsBg color="#4ADE80"/>
    <div style={{position:"relative",zIndex:1,maxWidth:700,margin:"0 auto",padding:"16px 12px 40px"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div className="px glow" style={{fontSize:13,marginBottom:6}}>⛏ WORD MINER</div>
        <div style={{fontSize:13,color:"#3a6a3a"}}>TEACHER DASHBOARD</div>
      </div>

      {/* Student cards */}
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
        {roster.length===0&&!adding&&(
          <div style={{textAlign:"center",padding:24,color:"#444",fontSize:14}}>No students yet. Add one below!</div>
        )}
        {roster.map(name=>{
          const p=loadedData[name]||DEFAULT_PROGRESS;
          const sp=sightPct(p);
          const wpm=bestWPM(p);
          const lc=p.completed?.length||0;
          const em=p.emeralds||0;
          const ls=daysSince(p.lastSeen);
          return(
            <div key={name} style={{background:"#050a05",border:"2px solid #1a3a1a",borderRadius:6,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",cursor:"pointer",transition:"border-color .2s"}}
              onClick={()=>onSelect(name)}
              onMouseOver={e=>e.currentTarget.style.borderColor="#4ADE80"}
              onMouseOut={e=>e.currentTarget.style.borderColor="#1a3a1a"}>
              {/* Avatar */}
              <div style={{width:44,height:44,borderRadius:4,background:"#0a1a0a",border:"3px solid #4ADE80",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
                {name[0].toUpperCase()}
              </div>
              {/* Info */}
              <div style={{flex:1,minWidth:160}}>
                <div className="px" style={{fontSize:8,color:"#4ADE80",marginBottom:4}}>{name}</div>
                <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  <span style={{fontSize:12,color:"#555"}}>💎 {em} emeralds</span>
                  <span style={{fontSize:12,color:"#555"}}>📚 {lc}/19 biomes</span>
                  <span style={{fontSize:12,color:"#555"}}>🔮 {sp}% sight</span>
                  {wpm>0&&<span style={{fontSize:12,color:"#555"}}>⏱ {wpm} WPM best</span>}
                </div>
              </div>
              {/* Last seen */}
              {ls&&<div style={{fontSize:11,color:"#333",textAlign:"right",flexShrink:0}}>{ls}</div>}
              {/* Stats bar */}
              <div style={{width:"100%",marginTop:6}}>
                <div style={{display:"flex",gap:3,height:5}}>
                  <div style={{flex:lc,background:"#4ADE80",borderRadius:2,minWidth:lc>0?4:0}}/>
                  <div style={{flex:19-lc,background:"#111",borderRadius:2}}/>
                </div>
                <div style={{fontSize:10,color:"#333",marginTop:3}}>Biome progress {lc}/19</div>
              </div>
              {/* Delete button */}
              <button onClick={e=>{e.stopPropagation();if(window.confirm(`Remove ${name}? Progress will be lost.`))onDelete(name);}}
                style={{background:"transparent",border:"1px solid #333",borderRadius:3,color:"#555",fontSize:10,padding:"3px 7px",cursor:"pointer",flexShrink:0}}>
                ✕
              </button>
            </div>
          );
        })}
      </div>

      {/* Add student */}
      {adding
        ?<div style={{background:"#050a05",border:"2px solid #4ADE80",borderRadius:6,padding:14}}>
          <div className="px" style={{fontSize:7,color:"#4ADE80",marginBottom:8}}>NEW STUDENT</div>
          <div style={{display:"flex",gap:8}}>
            <input className="inp" style={{fontSize:18,fontWeight:900,flex:1}} placeholder="Student name..." autoFocus
              value={newName} onChange={e=>setNewName(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&handleAdd()}/>
            <button className="btn btn-g" style={{fontSize:7}} onClick={handleAdd} disabled={!newName.trim()}>ADD ▶</button>
            <button className="btn btn-s" style={{fontSize:7}} onClick={()=>{setAdding(false);setNewName("");}}>✕</button>
          </div>
        </div>
        :<button className="btn btn-g" style={{fontSize:8,width:"100%",justifyContent:"center",padding:12}} onClick={()=>setAdding(true)}>+ ADD STUDENT</button>
      }

      <div style={{textAlign:"center",marginTop:16}}><span className="px" style={{fontSize:5,color:"#1a3a1a"}}>WORD MINER v6 · 19 BIOMES · 7 SKILL SYSTEMS · PERSISTENT PROGRESS</span></div>
    </div>
  </>);
}


export default function App(){
  // Screen: "loading" | "dashboard" | "game"
  const [screen,setScreen]=useState("loading");
  const [roster,setRoster]=useState([]);
  const [studentName,setStudentName]=useState(null);
  const [progress,setProgress]=useState({...DEFAULT_PROGRESS});
  const [tab,setTab]=useState("lessons");
  const [activeId,setActiveId]=useState(1);
  const [toast,setToast]=useState("");
  const [sec,setSec]=useState(0);

  // Load roster on mount
  useEffect(()=>{
    loadRoster().then(r=>{setRoster(r);setScreen("dashboard");});
  },[]);

  // Auto-save progress when it changes (debounced)
  useEffect(()=>{
    if(!studentName)return;
    const t=setTimeout(()=>saveProgress(studentName,progress),800);
    return()=>clearTimeout(t);
  },[progress,studentName]);

  // Session timer
  useEffect(()=>{
    if(screen!=="game")return;
    const id=setInterval(()=>setSec(s=>{
      const n=s+1;
      if(n>0&&n%900===0)handleEarn(1,"⏱ +1 EMERALD for 15 minutes!");
      return n;
    }),1000);
    return()=>clearInterval(id);
  },[screen]);

  async function selectStudent(name){
    const p=await loadProgress(name);
    setProgress(p);
    setStudentName(name);
    setActiveId(p.activeId||1);
    setTab("lessons");
    setSec(0);
    setScreen("game");
  }

  async function addStudent(name){
    if(roster.includes(name))return selectStudent(name);
    const newRoster=[...roster,name];
    setRoster(newRoster);
    await saveRoster(newRoster);
    await selectStudent(name);
  }

  async function deleteStudent(name){
    const newRoster=roster.filter(r=>r!==name);
    setRoster(newRoster);
    await saveRoster(newRoster);
    try{localStorage.removeItem(`wm:p:${name}`);}catch{}
  }

  function handleEarn(amt,msg){
    setProgress(p=>({...p,emeralds:(p.emeralds||0)+amt}));
    setToast(msg);
  }
  function handleMob(name,word,biome){
    setProgress(p=>({...p,mobs:[...(p.mobs||[]),{name,word,biome}]}));
    setToast(`👾 New mob: ${name}!`);
  }
  function handleComplete(lessonId){
    if(!(progress.completed||[]).includes(lessonId)){
      setProgress(p=>({...p,completed:[...(p.completed||[]),lessonId]}));
      handleEarn(5,`🏆 +5 BONUS EMERALDS! ${LESSONS.find(l=>l.id===lessonId)?.title} cleared!`);
    }
  }
  function handleCashOut(amount){
    setProgress(p=>({...p,emeralds:Math.max(0,(p.emeralds||0)-amount)}));
    setToast("🏆 Reward redeemed!");
  }
  function handleSelectLesson(id){
    setActiveId(id);
    setProgress(p=>({...p,activeId:id}));
    setTab("craft");
    const l=LESSONS.find(l=>l.id===id);
    setToast(`${l?.icon} Entering ${l?.biome}!`);
  }
  function handleSkillSave(data){
    setProgress(p=>({...p,...data}));
  }
  function goBack(){
    setScreen("dashboard");
    setStudentName(null);
  }

  if(screen==="loading") return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#010601",color:"#4ADE80",fontFamily:"'Press Start 2P',monospace",fontSize:10}}>
      ⛏ LOADING...
    </div>
  );

  if(screen==="dashboard") return(
    <TeacherDashboard
      roster={roster}
      onSelect={selectStudent}
      onAddNew={addStudent}
      onDelete={deleteStudent}
    />
  );

  // GAME SCREEN
  const AL=LESSONS.find(l=>l.id===activeId)||LESSONS[0];
  const TABS=[
    {id:"lessons",label:"🗺️ BIOMES"},
    {id:"craft",label:"⚒ CRAFT"},
    {id:"stories",label:"📖 STORIES"},
    {id:"skills",label:"⚡ SKILLS"},
    {id:"mobs",label:"👾 BESTIARY"},
    {id:"cashout",label:"🏆 CASH OUT"},
  ];

  return(<>
    <style>{BASE_CSS}{themeCSS(AL)}</style>
    <StarsBg color={AL.color}/>
    <Toast msg={toast} onDone={()=>setToast("")}/>
    <div style={{position:"relative",zIndex:1,maxWidth:700,margin:"0 auto",padding:"9px 9px 36px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0"}}>
        <button onClick={goBack} style={{background:"transparent",border:"1px solid #1a3a1a",borderRadius:3,color:"#3a6a3a",fontSize:8,padding:"5px 9px",cursor:"pointer",fontFamily:"'Press Start 2P',monospace"}}>
          ← ROSTER
        </button>
        <span className="px glow" style={{fontSize:10}}>⛏ WORD MINER</span>
        <div style={{width:70}}/>
      </div>
      <HUD name={studentName} emeralds={progress.emeralds||0} sec={sec} lesson={AL} onLogout={goBack}/>
      <div className="tabs" style={{borderBottom:`3px solid ${AL.colorBorder}`}}>
        {TABS.map(t=><button key={t.id} className={`tab ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}>{t.label}</button>)}
      </div>
      <div className="box" style={{padding:15,borderTopLeftRadius:0,borderTopRightRadius:0,borderTop:"none"}}>
        {tab==="lessons"&&<LessonsTab completed={progress.completed||[]} activeId={activeId} onSelect={handleSelectLesson}/>}
        {tab==="craft"&&<Craft activeId={activeId} onEarn={handleEarn} onMob={handleMob} onComplete={handleComplete}/>}
        {tab==="stories"&&<Stories onEarn={handleEarn} initData={progress} onSaveProgress={handleSkillSave}/>}
        {tab==="skills"&&<SkillsHub onEarn={handleEarn} progress={progress} onSaveProgress={handleSkillSave}/>}
        {tab==="mobs"&&<Mobs mobs={progress.mobs||[]}/>}
        {tab==="cashout"&&<CashOut emeralds={progress.emeralds||0} onCashOut={handleCashOut}/>}
      </div>
      <div style={{textAlign:"center",marginTop:9}}>
        <span className="px" style={{fontSize:5,color:"#111"}}>WORD MINER v6 · {studentName} · PROGRESS SAVED</span>
      </div>
    </div>
  </>);
}
