````markdown
# ReadCraft — Word Miner

**ReadCraft is a Minecraft-based structured literacy app for readers at the 1st to 3rd grade level.** It builds phonics skills through speech sounds, sentence frames, dramatic reading, and story-connected writing, all inside the Tower of Tags narrative. No installs. Works in any browser.

## 🎮 Features

### 19 Biomes (Phonics Progression)
- **Short Vowels** → **Silent E** → **Digraphs (SH, CH, TH, WH)**
- **R-Controlled Vowels** → **Vowel Teams** → **Consonant Blends (2-letter & 3-letter)**
- **Final Boss:** Ender Dragon (mixed pattern review)

### 7 Skill Systems
1. **🔮 Nether Portal** – Sight words (Pre-K through 3rd grade)
2. **🏃 Fluency Speedrun** – CWPM reading speed practice
3. **📚 Enchanting Table** – Suffixes & prefixes morphology
4. **💥 TNT Syllable Blast** – Syllable pattern recognition
5. **🔨 Crafting Table** – Compound word decomposition
6. **🔥 Furnace** – Contractions & apostrophes
7. **📜 Quest Log** – Reading comprehension + Tier-2 vocabulary

### 72 Story Problems
- **36 original stories** (September–May, weeks 1–4)
- **36 alternate versions** (Set B for differentiation)
- Math-integrated word problems with Minecraft context
- Scaffolded answers and bonus challenges

### Teacher Dashboard
- ✅ Persistent student roster (localStorage)
- ✅ Real-time progress tracking per student
- ✅ Biome completion, skill mastery, emerald economy
- ✅ Last-seen tracking
- ✅ Add/remove students with one tap

### Emerald Reward System
- **+1** per sight word mastered
- **+2** per skill system lesson
- **+3** per fluency passage completed
- **+5** per biome completed (bonus)
- **+1** per 15 minutes of session time
- Redeemable for real-world rewards (parent-approved)

---

## 🚀 Deployment

### Option 1: GitHub Pages (Recommended for Free Hosting)

This repository is configured with automatic GitHub Pages deployment.

**Steps:**
1. Push code to `main` branch
2. GitHub Actions workflow triggers automatically
3. Built files deploy to `https://katherineawatkins.github.io/readcraft/`

**Enable GitHub Pages:**
1. Go to repository **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"
3. Save

**Manual deployment:**
```bash
npm run build
# dist/ folder is ready to deploy
```

### Option 2: Vercel (Recommended for Production)

Vercel provides zero-config deployment with automatic previews.

**Steps:**
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow prompts (select React/Vite when asked)
4. Your app deploys to `readcraft.vercel.app`

**Auto-deployment:**
- Every push to `main` triggers production deploy
- Every PR gets a preview deployment
- Rollbacks available in Vercel dashboard

**Environment variables** (if needed):
- Set in Vercel dashboard under **Settings** → **Environment Variables**

---

## 📦 Local Development

### Prerequisites
- Node.js 16+ (recommend 18 LTS)
- npm or yarn

### Setup
```bash
# Clone repository
git clone https://github.com/katherineawatkins/readcraft.git
cd readcraft

# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build for Production
```bash
npm run build
npm run preview
```

Output is in the `dist/` folder.

---

## 🎯 How to Use (Teachers)

1. **Add a Student**
   - Click **+ ADD STUDENT** on the dashboard
   - Enter name, hit ADD

2. **Select a Biome**
   - Choose a lesson in the **BIOMES** tab
   - Click to unlock (must complete previous biomes)

3. **Start a Craft Session**
   - Read the mini-lesson together
   - Hit **ENTER BIOME**
   - Sound out each word (student reads aloud)
   - Tap ✅ REAL WORD (emerald) or 👾 MOB WORD (name it)
   - Complete 6+ words to earn completion bonus

4. **Track Progress**
   - Dashboard shows: emeralds, biomes, skill mastery, last-seen
   - Skills tab shows individual system progress
   - Bestiary tracks invented mob creatures

5. **Rewards**
   - Student earns emeralds throughout session
   - Parent approves real-world rewards
   - Student "cashes out" emeralds in **CASH OUT** tab

---

## 📚 Content Breakdown

### Phonics (19 Biomes)
| Biome | Focus | MOB | Material | Words |
|-------|-------|-----|----------|-------|
| Plains Village | Short Vowels | Zombie | Oak Wood | cat, bat, map, bed, red... |
| Enchanting Forest | Silent E | Witch | Magic Wood | cake, lake, hope, bike... |
| Ocean Coast | SH Words | Drowned | Prismarine | shop, shell, brush, wish... |
| Nether | CH Words | Blaze | Blaze Rod | chip, chop, lunch, torch... |
| Thunder Plains | TH Words | Charged Creeper | Lightning Rod | thin, that, them, thank... |
| Trial Chambers | WH Words | Breeze | Wind Charge | what, where, when, why... |
| Badlands Mesa | AR (R-controlled) | Husk | Gold Ore | car, star, farm, yard... |
| Deep Mine | ER/IR/UR | Cave Spider | Iron Ore | her, bird, turn, curl... |
| Stony Peaks | OR (R-controlled) | Mountain Goat | Copper Ore | fork, corn, horn, sport... |
| Swamp Biome | AI & AY | Slime | Slimeball | rain, play, wait, clay... |
| Ocean Monument | EE & EA | Guardian | Prismarine Shard | tree, beach, dream, bread... |
| Snowy Tundra | OA & OW | Stray | Packed Ice | boat, snow, road, crown... |
| End Dimension | Long OO & Short OO | Enderman | End Stone | moon, book, cool, good... |
| Jungle Temple | OI/OY/OU/OW | Ocelot | Bamboo | coin, boy, cloud, town... |
| Lush Cave | FL, SL, BL Blends | Axolotl | Amethyst Shard | flash, slip, black, bloom... |
| Stronghold | CR, SP, ST Blends | Silverfish | Stone Brick | crab, spin, stop, stick... |
| Dark Oak Forest | TR, DR, GR Blends | Evoker | Dark Oak Log | trap, drop, grab, green... |
| End City | 3-Letter Blends | Shulker | Shulker Shell | strap, splash, spring, scream... |
| The End | FINAL BOSS | Ender Dragon | Dragon Egg | All patterns review |

### Sight Words (5 Levels)
- Pre-K: 35 words (a, and, away, big, blue...)
- Primer: 45 words (all, am, are, at, ate...)
- 1st Grade: 40 words (after, again, an, any, as...)
- 2nd Grade: 40 words (always, around, because, been...)
- 3rd Grade: 35 words (about, better, bring, carry...)

### Story Problems (72 Total)
- **September–May** (9 months)
- **Weeks 1–4 each month** (4 weeks)
- **Set A + Set B** (2 versions per month for differentiation)
- **Difficulty progression:** ⭐ (1st) → ⭐⭐⭐⭐⭐ (3rd)
- **Math focus:** Addition/subtraction → Multiplication → Fractions → Geometry → Multi-step

### Fluency Passages (20 Total)
| Level | Grade | Lexile | WPM Target | Words |
|-------|-------|--------|------------|-------|
| Overworld | 1st | 200L–290L | 40–60 | 58–72 |
| Forest | 1st | 270L–390L | 40–60 | 62–84 |
| Swamp | 2nd | 330L–410L | 90–110 | 78–88 |
| Desert | 2nd | 390L | 90–110 | 84 |
| Deep Mine | 3rd | 470L–540L | 115–130 | 96–108 |

### Morphology Systems
- **Suffixes:** -ing, -ed, -er, -est, -ful, -less, -ness, -tion (8 × 5 examples = 40 words)
- **Prefixes:** un-, re-, pre-, mis-, dis- (5 × 5 examples = 25 words)
- **Syllable Patterns:** Closed, Open, Vowel-E, Teams, R-controlled, C+LE (6 × 8 = 48 words)
- **Compounds:** 24 Minecraft-themed compound words
- **Contractions:** 20 common contractions with furnace smelting mechanic

### Vocabulary & Comprehension
- **Tier-2 Words:** 20 words (abundant, cautious, crucial, detect, persevere...)
- **Comprehension Passages:** 5 stories with 3-question scaffolding (Literal → Inference → Main Idea)

---

## 🛠️ Tech Stack

- **Framework:** React 18.2.0
- **Build Tool:** Vite 5.0.0
- **Fonts:** Press Start 2P (pixel), Nunito (UI)
- **Storage:** Browser localStorage (no backend required)
- **Deployment:** GitHub Pages or Vercel

---

## 📁 Project Structure

```
readcraft/
├── index.html              # Entry HTML
├── package.json            # Dependencies
├── vite.config.js          # Vite config (with GitHub Pages base path)
├── vercel.json             # Vercel deployment config
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions auto-deploy workflow
├── src/
│   ├── main.jsx            # React entry point
│   └── WordMiner.jsx       # Main app component (all-in-one)
└── dist/                   # Built output (generated by npm run build)
```

---

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 License

ReadCraft © 2026 by Katherine Watkins. All rights reserved.

---

## 🤝 Support & Questions

For issues, feature requests, or deployments:
1. Check GitHub Issues
2. Create a new issue with detailed description
3. Tag with appropriate label (bug, enhancement, deployment)

**Happy reading! 📖⛏️**
````
Deployment trigger.
