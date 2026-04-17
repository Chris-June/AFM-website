import { mutation } from "./_generated/server";

const sampleArtworks = [
  {
    title: "Silent Reflections",
    artist: "Maria Chen",
    description: "A contemplative piece exploring the quiet moments of self-discovery and inner peace. The interplay of soft colors represents the gentle acceptance of one's own thoughts and emotions.",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop",
    type: "illustration" as const,
    attribution: "© Maria Chen, 2024. All rights reserved.",
    featured: true,
  },
  {
    title: "The Weight of Wings",
    artist: "James Morrison",
    description: "An exploration of the burden and beauty of hope. Wings that soar while carrying the weight of expectation, doubt, and the courage to continue flying despite it all.",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200&auto=format&fit=crop",
    type: "drawing" as const,
    attribution: "© James Morrison, 2024. All rights reserved.",
    featured: true,
  },
  {
    title: "Through the Storm",
    artist: "Aisha Patel",
    description: "A powerful visual narrative of resilience and survival. The storm represents life's challenges, while the emerging light symbolizes hope and the strength to persevere.",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200&auto=format&fit=crop",
    type: "illustration" as const,
    attribution: "© Aisha Patel, 2024. All rights reserved.",
    featured: true,
  },
  {
    title: "Finding Light",
    artist: "David Kim",
    description: "An animation-inspired piece capturing the moment of breakthrough. When darkness feels overwhelming, a single beam of light can illuminate the path forward.",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1200&auto=format&fit=crop",
    type: "animation" as const,
    attribution: "© David Kim, 2024. All rights reserved.",
    featured: true,
  },
  {
    title: "Inner Dialogue",
    artist: "Sarah Williams",
    description: "The conversation between who we are and who we want to become. Abstract forms dance together, representing the complex internal discussions that shape our identity.",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
    type: "drawing" as const,
    attribution: "© Sarah Williams, 2024. All rights reserved.",
    featured: false,
  },
  {
    title: "Fragments of Hope",
    artist: "Elena Rodriguez",
    description: "When life breaks us into pieces, art helps us gather the fragments and find beauty in the reconstruction. Each shard tells a story of survival and renewal.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    type: "illustration" as const,
    attribution: "© Elena Rodriguez, 2024. All rights reserved.",
    featured: false,
  },
  {
    title: "Emergence",
    artist: "Marcus Thompson",
    description: "The moment of breaking through the surface after being submerged in darkness. A celebration of the strength it takes to emerge transformed and renewed.",
    imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1200&auto=format&fit=crop",
    type: "drawing" as const,
    attribution: "© Marcus Thompson, 2024. All rights reserved.",
    featured: false,
  },
  {
    title: "The Quiet Battle",
    artist: "Jamie Park",
    description: "Not all wars are visible. This piece honors the invisible struggles fought daily by those living with mental health challenges, finding courage in quiet moments.",
    imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1200&auto=format&fit=crop",
    type: "illustration" as const,
    attribution: "© Jamie Park, 2024. All rights reserved.",
    featured: false,
  },
  {
    title: "Unwritten Stories",
    artist: "Riley Chen",
    description: "Every blank canvas holds infinite possibilities. This animation-inspired work celebrates the stories yet to be told and the courage to begin writing them.",
    imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1200&auto=format&fit=crop",
    type: "animation" as const,
    attribution: "© Riley Chen, 2024. All rights reserved.",
    featured: false,
  },
  {
    title: "Between the Lines",
    artist: "Jordan Taylor",
    description: "The spaces between what we say and what we feel. This drawing explores the unspoken emotions that exist in the margins of our daily lives.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    type: "drawing" as const,
    attribution: "© Jordan Taylor, 2024. All rights reserved.",
    featured: false,
  },
  {
    title: "Resilience in Blue",
    artist: "Alex Morgan",
    description: "A study in the color of calm and contemplation. Blue represents both the depths of struggle and the serenity of healing, intertwined in a dance of resilience.",
    imageUrl: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=1200&auto=format&fit=crop",
    type: "illustration" as const,
    attribution: "© Alex Morgan, 2024. All rights reserved.",
    featured: false,
  },
  {
    title: "Morning Rituals",
    artist: "Casey Liu",
    description: "The sacred practices that ground us. This piece celebrates the small, daily acts of self-care that become lifelines during difficult times.",
    imageUrl: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1200&auto=format&fit=crop",
    type: "drawing" as const,
    attribution: "© Casey Liu, 2024. All rights reserved.",
    featured: false,
  },
];

export const seedArtworks = mutation({
  args: {},
  handler: async (ctx) => {
    const insertedIds = [];
    
    for (const artwork of sampleArtworks) {
      const id = await ctx.db.insert("artworks", artwork);
      insertedIds.push(id);
    }
    
    return { 
      success: true, 
      count: insertedIds.length,
      message: `Successfully seeded ${insertedIds.length} artworks to the gallery.` 
    };
  },
});

export const clearArtworks = mutation({
  args: {},
  handler: async (ctx) => {
    const allArtworks = await ctx.db.query("artworks").collect();
    
    for (const artwork of allArtworks) {
      await ctx.db.delete(artwork._id);
    }
    
    return { 
      success: true, 
      count: allArtworks.length,
      message: `Cleared ${allArtworks.length} artworks from the gallery.` 
    };
  },
});

const sampleWritings = [
  {
    title: "The Morning I Chose to Stay",
    author: "Elena Rodriguez",
    content: `Some days, the weight of the world feels like too much to carry.\n\nThe alarm rings, and I lie there, staring at the ceiling, wondering if today is the day I finally give up. The darkness whispers sweet lies about peace, about rest, about an end to the constant ache.\n\nBut then I remember: staying is an act of courage.\n\nThis morning, I chose to stay. I chose the difficult path of continuing, of breathing through the pain, of believing that somewhere, somehow, it gets better.\n\nI got out of bed. I made coffee. I watched the steam rise in the early light, and for a moment, just a moment, I felt gratitude.\n\nTo everyone fighting this invisible war: your staying is revolutionary. Your existence is resistance. And you are not alone.`,
    type: "poem" as const,
    attribution: "© Elena Rodriguez, 2024. All rights reserved.",
    featured: true,
  },
  {
    title: "Echoes of Silence",
    author: "Marcus Thompson",
    content: `In the silence, I hear everything.\n\nThe thoughts I bury during the day rise like ghosts at midnight, whispering every fear I've ever had. They tell me I'm not enough, that I never will be, that the mask I wear fools no one.\n\nBut lately, I've been learning to sit with the silence. To let the ghosts speak, acknowledge them, and then gently tell them: I am more than my worst thoughts about myself.\n\nThe silence isn't empty. It's full of answers, if we're brave enough to listen.\n\nTonight, the silence sounds like hope.`,
    type: "poem" as const,
    attribution: "© Marcus Thompson, 2024. All rights reserved.",
    featured: true,
  },
  {
    title: "Letters to My Anxiety",
    author: "Jamie Park",
    content: `Dear Anxiety,\n\nWe've been together so long I sometimes forget where you end and I begin. You've been my constant companion, my shadow, my unwelcome guest at every important moment.\n\nYou make my heart race before presentations. You turn simple decisions into impossible mazes. You rob me of sleep, of peace, of the ability to just be.\n\nBut I'm learning to write you into existence. To name you when you arrive. To say, "This is anxiety," rather than letting you masquerade as truth.\n\nAnd maybe, finally, I'm learning to let you go. Not by fighting you, but by accepting that you're a part of me—but not all of me.\n\nYou are a chapter, not the whole story.\n\nSincerely,\nJamie`,
    type: "poem" as const,
    attribution: "© Jamie Park, 2024. All rights reserved.",
    featured: false,
  },
  {
    title: "Unraveling",
    author: "Riley Chen",
    content: `They say healing is linear,\nbut I know it's a spiral—\nlooping back on itself,\ntouching old wounds\nwith gentler hands.\n\nSome days I'm the thread,\nother days the needle,\nmost days just trying\nto hold myself together\nenough to see the sunrise.\n\nBut the unraveling\nis where the light gets in.\nIt's where I learn\nthat broken things\ncan still be beautiful,\nthat I don't need\nto be whole to be worthy,\nthat mending\nis a kind of magic\nI carry in my own hands.`,
    type: "poem" as const,
    attribution: "© Riley Chen, 2024. All rights reserved.",
    featured: false,
  },
  {
    title: "Brushstrokes of Recovery",
    author: "Marcus Thompson",
    content: `Every painting became a conversation I couldn't have out loud.\n\nWhen words failed me, colors spoke. When I couldn't explain the weight on my chest, I mixed ultramarine and burnt sienna until the canvas held my grief. When joy felt impossible, I discovered that cadmium yellow could still make my heart lift, even just a little.\n\nThrough colors and textures, I found a language for grief, for healing, for the messy middle where transformation happens.\n\nArt didn't fix me—nothing fixes us, really. We're not broken machines in need of repair. We're humans in need of expression, connection, and the courage to feel everything fully.\n\nMy studio is my sanctuary. The smell of linseed oil, the texture of canvas, the infinite possibility of a blank page—these are my therapists, my confidants, my witnesses. They don't judge. They don't try to solve me. They simply hold space for whatever needs to emerge.\n\nAnd what emerged was me. Not the me I was before depression, but someone new. Someone who knows darkness intimately and chooses light anyway. Someone who understands that creativity isn't just about making things—it's about becoming.`,
    type: "blog" as const,
    attribution: "© Marcus Thompson, 2024. All rights reserved.",
    featured: true,
  },
  {
    title: "The Art of Letting Go",
    author: "Riley Chen",
    content: `Perfectionism was my armor. Art taught me to take it off.\n\nFor years, I believed that if I just tried hard enough, worked long enough, polished every detail to impossible shine, I would finally be worthy. Worthy of love, of success, of simply taking up space in the world.\n\nThe first time I painted with my non-dominant hand, everything was messy. Lines wandered, proportions failed, the result was objectively "bad." And yet, I felt something I hadn't felt in years: freedom.\n\nIn the studio, I learned that beauty exists in imperfection, and so do I.\n\nThe wabi-sabi philosophy—the Japanese concept of embracing imperfection—became my guiding light. The crack in the glaze, the asymmetry of handmade pottery, the accidental brushstroke that becomes the best part of the painting—these aren't flaws to fix. They're fingerprints of humanity.\n\nI'm learning to treat myself with the same grace I give my art. Some days I'm brilliant, some days I'm messy, most days I'm a work in progress. And that's exactly right.\n\nLetting go of perfection isn't giving up. It's giving myself permission to be real.`,
    type: "blog" as const,
    attribution: "© Riley Chen, 2024. All rights reserved.",
    featured: true,
  },
  {
    title: "Finding Stillness in Chaos",
    author: "Aisha Patel",
    content: `My mind is a crowded room. Thoughts banging against the walls, anxieties turning up the volume, to-do lists multiplying like rabbits. For years, I tried to organize the chaos, thinking if I just found the right system, the right planner, the right routine, I could finally feel at peace.\n\nIt took a breakdown to teach me that you can't organize your way out of an overwhelmed nervous system.\n\nMeditation felt impossible at first. Sit still? Focus on my breath? My brain laughed at the suggestion. But I started small—thirty seconds, a minute, five minutes. I learned that meditation isn't about emptying the mind; it's about changing your relationship with your thoughts.\n\nNow, every morning, before the world rushes in, I sit. I breathe. I watch the chaos without joining it. And slowly, I'm building a sanctuary inside myself that no external storm can destroy.`,
    type: "blog" as const,
    attribution: "© Aisha Patel, 2024. All rights reserved.",
    featured: false,
  },
  {
    title: "My Journey Through the Fog",
    author: "David Kim",
    content: `Depression is often described as darkness, but for me, it was fog.\n\nThick, gray, endless fog that dulled everything—colors, sounds, emotions, hope. I could see shapes moving around me, people living their lives, but everything felt distant, unreachable. The world continued, but I was stuck in stillness.\n\nMedication helped lift the fog, slowly, like a sunrise that takes hours instead of minutes. Therapy gave me tools to navigate when the fog rolled back in. But what saved me, truly, was realizing I didn't have to wait for the fog to clear to move forward.\n\nI started taking steps while still blind. Small steps. Messy steps. Some days I walked in circles. But I was moving.\n\nNow, when the fog comes—and it still does—I know it's temporary. I've walked through it before. I can walk through it again. And eventually, inevitably, the sun breaks through.`,
    type: "creative_writing" as const,
    attribution: "© David Kim, 2024. All rights reserved.",
    featured: false,
  },
  {
    title: "What My Plants Taught Me About Healing",
    author: "Sarah Williams",
    content: `It started with a succulent. Someone told me they were impossible to kill, and I needed that kind of hope in my life.\n\nI overwatered it, of course. And then I underwatered it, compensating. I put it in too much sun, then not enough. For weeks, it hung on, patient with my learning curve.\n\nWhen it finally started thriving—new growth, deeper color—I realized I'd been treating myself worse than I'd treated this plant.\n\nI don't overwater myself, but I overwork. I don't forget my sunlight, but I forget my joy. I've been expecting myself to bloom in impossible conditions, then blaming myself when I wilt.\n\nMy plants need water, light, good soil, and patience. So do I.\n\nNow I have seventeen plants. Each one is a reminder that growth takes time, that healing isn't linear, and that even when things look dormant, there's often root-work happening below the surface.\n\nI'm learning to be as gentle with myself as I am with my plants. And just like them, I'm slowly, stubbornly, beautifully—growing.`,
    type: "blog" as const,
    attribution: "© Sarah Williams, 2024. All rights reserved.",
    featured: false,
  },
  {
    title: "The Night I Learned to Breathe",
    author: "Jordan Taylor",
    content: `Panic attacks feel like drowning on dry land.\n\nI'd had them before, but this one was different. It lasted hours. My chest constricted, my vision narrowed, I was convinced I was dying. I ended up in the ER, convinced it was my heart.\n\nIt wasn't. It was my mind.\n\nThe doctor was kind. She taught me the 4-7-8 breathing technique right there. Four counts in, seven counts hold, eight counts out. Simple. Impossible. But I tried.\n\nThat night, lying awake, I practiced. In for four, hold for seven, out for eight. Over and over. My body fought me, screaming that we were in danger. But gradually, gradually, my nervous system began to believe we were safe.\n\nIt took two hours, but eventually, I slept.\n\nThat was the night I learned that healing isn't dramatic. It's breathing when everything in you wants to stop. It's choosing to believe you're safe even when your body disagrees. It's the thousand small moments of regulation that eventually rewire a dysregulated system.\n\nI still have panic attacks. But now I have tools. Now I know I can breathe through anything. And that knowledge—that I'm capable of surviving my own mind—is the most powerful medicine I've found.`,
    type: "creative_writing" as const,
    attribution: "© Jordan Taylor, 2024. All rights reserved.",
    featured: false,
  },
  {
    title: "Rebuilding: A Year in Reflection",
    author: "Alex Morgan",
    content: `One year ago, I was shattered.\n\nNot the poetic kind of brokenness you write about in songs. The real, ugly, can't-get-out-of-bed, lost-twenty-pounds, scared-my-family kind. The kind where you look in the mirror and don't recognize the hollow-eyed person staring back.\n\nI didn't know it then, but I was being demolished so I could be rebuilt.\n\nThe year that followed was the hardest of my life. Therapy three times a week. Medication adjustments. Learning to sleep again. Relearning how to eat, how to work, how to socialize, how to exist in a body that felt like enemy territory.\n\nBut somewhere around month eight, I noticed something: I was laughing. Real laughter, the kind that surprises you. And then I was creating again. And then, miracle of miracles, I was helping others who were where I'd been.\n\nThis is what recovery looks like. Not a straight line up, but a messy, circuitous journey that somehow, eventually, trends toward the light.\n\nI'm not who I was before. I'm someone new. Someone with scars, yes, but also with wisdom I couldn't have gained any other way. Someone who knows the value of being alive because I've stared at the alternative.\n\nIf you're in the demolished phase right now, please know: the rebuilding is coming. It takes time, more time than anyone wants, but it comes. And you, too, will be amazed by who you become.`,
    type: "blog" as const,
    attribution: "© Alex Morgan, 2024. All rights reserved.",
    featured: false,
  },
  {
    title: "On Being Enough",
    author: "Casey Liu",
    content: `I spent thirty years trying to be enough.\n\nGood enough grades, good enough job, good enough partner, good enough body, good enough friend. I chased "enough" like it was a finish line I could cross if I just ran faster.\n\nThe paradox of mental health recovery is that you have to accept yourself exactly as you are before you can change. You have to look at your mess, your flaws, your failures, your fears, and say: "This is me. And I am worthy of love anyway."\n\nNot "I will be worthy when I fix myself." Not "I will be enough when I achieve X." Right now. As is. Mess and all.\n\nThat acceptance doesn't mean giving up. It means fighting from a place of self-compassion rather than self-hatred. It means healing because you love yourself, not because you loathe yourself.\n\nI'm still learning this. Some days I forget and start chasing "enough" again. But then I catch myself, breathe, and remember:\n\nThere is no "enough." There is only me. And I am already everything I need to be.`,
    type: "creative_writing" as const,
    attribution: "© Casey Liu, 2024. All rights reserved.",
    featured: false,
  },
];

export const seedWritings = mutation({
  args: {},
  handler: async (ctx) => {
    const insertedIds = [];
    
    for (const writing of sampleWritings) {
      const id = await ctx.db.insert("writings", writing);
      insertedIds.push(id);
    }
    
    return { 
      success: true, 
      count: insertedIds.length,
      message: `Successfully seeded ${insertedIds.length} stories to the folio.` 
    };
  },
});

export const clearWritings = mutation({
  args: {},
  handler: async (ctx) => {
    const allWritings = await ctx.db.query("writings").collect();
    
    for (const writing of allWritings) {
      await ctx.db.delete(writing._id);
    }
    
    return { 
      success: true, 
      count: allWritings.length,
      message: `Cleared ${allWritings.length} stories from the folio.` 
    };
  },
});
