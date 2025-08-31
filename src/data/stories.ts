export interface Story {
  id: string;
  title: string;
  theme: string;
  content: string;
  images: string[];
  audioUrl: string;
  videoUrl?: string;
  subtitles: Array<{ start: number; end: number; text: string }>;
  question: string;
  options: string[];
  correctAnswer: number;
  moral: string;
}

export const stories: Story[] = [
  // Wisdom Stories (5 total)
  {
    id: 'wisdom-1',
    title: 'The Wise Old Man and the Three Sons',
    theme: 'wisdom',
    content: `Once upon a time, in a small village, there lived an old man with three sons. The old man was known throughout the village for his wisdom and kindness. As he grew older, he wanted to test which of his sons would inherit his wisdom. He gave each son a single grain of rice and told them to make it multiply by the next full moon. The first son planted it and got a small harvest. The second son sold it and bought more rice. But the third son gave it to a hungry child, saying that kindness multiplies in ways grain cannot.`,
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/wisdom-1_narration.mp3',
    videoUrl: '/generated_content/videos/wisdom-1_video.mp4',
    subtitles: [
      { start: 0, end: 6.4, text: 'Once upon a time, in a small village, there lived an old man with three sons.' },
      { start: 6.4, end: 12.9, text: 'The old man was known throughout the village for his wisdom and kindness.' },
      { start: 12.9, end: 19.3, text: 'As he grew older, he wanted to test which of his sons would inherit his wisdom.' },
      { start: 19.3, end: 25.8, text: 'He gave each son a single grain of rice and told them to make it multiply by the next full moon.' },
      { start: 25.8, end: 32.2, text: 'The first son planted it and got a small harvest.' },
      { start: 32.2, end: 38.7, text: 'The second son sold it and bought more rice.' },
      { start: 38.7, end: 45.1, text: 'But the third son gave it to a hungry child, saying that kindness multiplies in ways grain cannot.' },
    ],
    question: 'Why did the old man choose the third son as the wisest?',
    options: [
      'Because he got the most rice',
      'Because he showed compassion and understood true value',
      'Because he was the youngest',
      'Because he was lucky'
    ],
    correctAnswer: 1,
    moral: 'True wisdom lies not in accumulating wealth, but in understanding that compassion and kindness are the greatest treasures we can cultivate.'
  },
  {
    id: 'wisdom-6',
    title: 'The Sage and the Mirror',
    theme: 'wisdom',
    content: `A traveler asked a sage, "How do I find wisdom?" The sage handed him a mirror and said, "Look until you stop seeing only yourself." Days later, the traveler returned, humbled. "I saw my pride, my fears, my excuses. Then I began to see others." The sage smiled. "Now you are ready. Wisdom begins when the self no longer fills the view."`,
    images: [
      '/generated_content/images/wisdom-6_scene_01.png',
      '/generated_content/images/wisdom-6_scene_02.png',
      '/generated_content/images/wisdom-6_scene_03.png',
    ],
    audioUrl: '/generated_content/audio/wisdom-6_narration.mp3',
    videoUrl: '/generated_content/videos/wisdom-6_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'A traveler asked a sage how to find wisdom.' },
      { start: 5, end: 10, text: 'The sage gave him a mirror to study himself.' },
      { start: 10, end: 15, text: 'He saw pride, fear, and excuses in his reflection.' },
      { start: 15, end: 20, text: 'When his view widened, he began to see others.' },
      { start: 20, end: 25, text: 'Thus begins the path to true wisdom.' },
    ],
    question: 'What was the sage teaching with the mirror?',
    options: [
      'To admire oneself',
      'To see beyond the self and understand others',
      'That mirrors are magical',
      'To avoid pride by never looking in mirrors'
    ],
    correctAnswer: 1,
    moral: 'Wisdom starts with honest self-reflection and grows when we learn to see beyond ourselves to the needs and truths of others.'
  },
  {
    id: 'wisdom-2',
    title: 'The Scholar and the Boatman',
    theme: 'wisdom',
    content: `A learned scholar was crossing a river with a simple boatman. The scholar boasted about his knowledge of astronomy, mathematics, and philosophy. "Have you studied the stars?" he asked. "No," said the boatman. "Then half your life is wasted!" declared the scholar. Suddenly, the boat hit a rock and began to sink. "Can you swim?" asked the boatman urgently. "No," replied the terrified scholar. "Then your whole life is wasted," said the boatman as he swam them both to safety.`,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/wisdom-2_narration.mp3',
    videoUrl: '/generated_content/videos/wisdom-2_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'A learned scholar was crossing a river with a simple boatman.' },
      { start: 5, end: 10, text: 'The scholar boasted about his vast knowledge.' },
      { start: 10, end: 15, text: 'He mocked the boatman for not studying the stars.' },
      { start: 15, end: 20, text: 'Suddenly, their boat hit a rock and began to sink.' },
      { start: 20, end: 25, text: 'The boatman asked if the scholar could swim.' },
      { start: 25, end: 30, text: 'Practical wisdom saved them both that day.' },
    ],
    question: 'What lesson did the scholar learn from the boatman?',
    options: [
      'That books are more important than experience',
      'That practical knowledge can be more valuable than theoretical learning',
      'That boatmen are smarter than scholars',
      'That swimming is the most important skill'
    ],
    correctAnswer: 1,
    moral: 'Knowledge without practical wisdom is incomplete. True intelligence combines learning with the ability to apply it in real situations.'
  },
  {
    id: 'courage-6',
    title: 'The Bridge of Night',
    theme: 'courage',
    content: `An old rope bridge swayed over a gorge. At dusk, a healer carried medicine across for a sick child. Halfway through, a plank snapped. She froze, then remembered the child waiting. Breathing steadily, she crawled forward, testing each step. She reached the far side as stars rose, clutching the medicine—and the courage she found between fear and love."`,
    images: [
      '/generated_content/images/courage-6_scene_01.png',
      '/generated_content/images/courage-6_scene_02.png',
      '/generated_content/images/courage-6_scene_03.png',
    ],
    audioUrl: '/generated_content/audio/courage-6_narration.mp3',
    videoUrl: '/generated_content/videos/courage-6_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'A healer crossed an old rope bridge at dusk.' },
      { start: 5, end: 10, text: 'A plank snapped and fear took hold.' },
      { start: 10, end: 15, text: 'She remembered the child who needed her.' },
      { start: 15, end: 20, text: 'Breathing steady, she tested each step forward.' },
      { start: 20, end: 25, text: 'She reached the far side beneath the stars.' },
    ],
    question: 'What helped the healer overcome fear?',
    options: [
      'Closing her eyes and running',
      'Her love and responsibility for the child',
      'Luck and chance',
      'Shouting for help'
    ],
    correctAnswer: 1,
    moral: 'Courage is choosing to act for others despite fear. Love steadies the trembling heart.'
  },
  {
    id: 'wisdom-3',
    title: 'The Two Pots',
    theme: 'wisdom',
    content: `Two pots hung from a pole carried by a water bearer. One was made of brass, shiny and proud. The other was made of clay, humble and simple. The brass pot constantly boasted about its beauty and durability. "Look how I shine!" it said. "You are so plain and fragile." The clay pot remained silent. One day, they knocked against each other. The brass pot was unharmed, but it realized that if they kept colliding, the clay pot would break. From that day, the brass pot learned to be gentle and protective of its companion.`,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/wisdom-3_narration.mp3',
    videoUrl: '/generated_content/videos/wisdom-3_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'Two pots hung from a water bearer\'s pole.' },
      { start: 5, end: 10, text: 'One was brass, shiny and proud.' },
      { start: 10, end: 15, text: 'The other was clay, humble and simple.' },
      { start: 15, end: 20, text: 'The brass pot constantly boasted about its beauty.' },
      { start: 20, end: 25, text: 'One day, they knocked against each other.' },
      { start: 25, end: 30, text: 'The brass pot learned the value of gentleness.' },
    ],
    question: 'What did the brass pot learn from this experience?',
    options: [
      'That it was stronger than the clay pot',
      'That true strength includes protecting those who are vulnerable',
      'That clay pots are useless',
      'That it should boast more about its qualities'
    ],
    correctAnswer: 1,
    moral: 'True strength is shown not in dominating others, but in protecting and caring for those who are more vulnerable than ourselves.'
  },
  {
    id: 'kindness-6',
    title: 'The Lantern Left Burning',
    theme: 'kindness',
    content: `A widow placed a lantern at her gate each night, saying, "May any traveler find their way." One stormy evening, she had only a little oil left, yet she lit it anyway. At dawn, she found a note: "Your light saved my life." Years later, a sturdy roof and storehouse were built for her by that same traveler, grateful beyond words."`,
    images: [
      '/generated_content/images/kindness-6_scene_01.png',
      '/generated_content/images/kindness-6_scene_02.png',
      '/generated_content/images/kindness-6_scene_03.png',
    ],
    audioUrl: '/generated_content/audio/kindness-6_narration.mp3',
    videoUrl: '/generated_content/videos/kindness-6_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'A widow lit a lantern at her gate each night.' },
      { start: 5, end: 10, text: 'She kept it burning even during a storm.' },
      { start: 10, end: 15, text: 'A traveler left a note: your light saved my life.' },
      { start: 15, end: 20, text: 'Years later, kindness returned as shelter and store.' },
      { start: 20, end: 25, text: 'Kindness lights the way for us all.' },
    ],
    question: 'What is the message of the lantern?',
    options: [
      'Light is expensive; save oil',
      'Small acts of kindness can save lives and return multiplied',
      'Travelers should carry their own lanterns',
      'Never help strangers'
    ],
    correctAnswer: 1,
    moral: 'Even small kindness given consistently can become someone’s lifeline—and kindness often returns when most needed.'
  },
  {
    id: 'wisdom-4',
    title: 'The Wise Judge and the Two Mothers',
    theme: 'wisdom',
    content: `Two women came before a wise judge, both claiming the same baby as their own. The judge listened to their arguments but could not determine the truth. Finally, he said, "Since you both claim this child, I will cut the baby in half and give each of you a piece." One woman agreed, saying it was fair. The other woman cried out, "No! Give the baby to her! I would rather lose my child than see him harmed!" The judge immediately gave the baby to the second woman, for only a true mother would sacrifice her own happiness for her child's safety.`,
    images: [
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516627145497-ae4099d4e6ed?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/wisdom-4_narration.mp3',
    videoUrl: '/generated_content/videos/wisdom-4_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'Two women came before a wise judge.' },
      { start: 5, end: 10, text: 'Both claimed the same baby as their own.' },
      { start: 10, end: 15, text: 'The judge proposed to cut the baby in half.' },
      { start: 15, end: 20, text: 'One woman agreed to this solution.' },
      { start: 20, end: 25, text: 'The other cried out to save the child.' },
      { start: 25, end: 30, text: 'True love revealed the real mother.' },
    ],
    question: 'How did the judge identify the real mother?',
    options: [
      'By asking for proof of birth',
      'By observing who truly loved the child enough to sacrifice for him',
      'By testing their knowledge of the baby',
      'By asking witnesses'
    ],
    correctAnswer: 1,
    moral: 'True love is selfless and always puts the beloved\'s welfare above one\'s own desires. Wisdom can reveal truth through understanding the heart.'
  },
  {
    id: 'justice-6',
    title: 'The Scales in the Dark',
    theme: 'justice',
    content: `A judge asked two merchants to weigh their goods in a dark room. One cheated in the shadows; the other measured fairly. When torches were lit, the judge said, "Justice is not for the crowd to see—it is for your own soul to carry." The honest merchant was favored, for justice begins where no one watches."`,
    images: [
      '/generated_content/images/justice-6_scene_01.png',
      '/generated_content/images/justice-6_scene_02.png',
      '/generated_content/images/justice-6_scene_03.png',
    ],
    audioUrl: '/generated_content/audio/justice-6_narration.mp3',
    videoUrl: '/generated_content/videos/justice-6_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'Two merchants weighed goods in a dark room.' },
      { start: 5, end: 10, text: 'One cheated when he thought no one could see.' },
      { start: 10, end: 15, text: 'The other measured fairly even in darkness.' },
      { start: 15, end: 20, text: 'Justice is a light you carry within.' },
      { start: 20, end: 25, text: 'Honesty was rewarded when torches were lit.' },
    ],
    question: 'Why did the judge trust the honest merchant?',
    options: [
      'He was richer',
      'He acted justly even when unseen',
      'He complimented the judge',
      'He threatened the other merchant'
    ],
    correctAnswer: 1,
    moral: 'Justice is not performance; it is integrity. True fairness shines most when no eyes are upon us.'
  },
  {
    id: 'wisdom-5',
    title: 'The Farmer and the Snake',
    theme: 'wisdom',
    content: `A kind farmer found a snake freezing in the snow. Taking pity, he brought it home and warmed it by his fire. As the snake revived, it bit the farmer. "Why did you bite me after I saved you?" asked the dying farmer. "It is my nature," replied the snake. "You knew what I was when you picked me up." A wise old woman who witnessed this said, "Kindness is a virtue, but wisdom knows when and where to apply it. Not all who suffer deserve our help if they will use it to harm others."`,
    images: [
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/wisdom-5_narration.mp3',
    videoUrl: '/generated_content/videos/wisdom-5_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'A kind farmer found a snake freezing in the snow.' },
      { start: 5, end: 10, text: 'He brought it home and warmed it by his fire.' },
      { start: 10, end: 15, text: 'As the snake revived, it bit the farmer.' },
      { start: 15, end: 20, text: 'The snake said it was simply its nature.' },
      { start: 20, end: 25, text: 'A wise woman witnessed this tragedy.' },
      { start: 25, end: 30, text: 'She spoke of wisdom in applying kindness.' },
    ],
    question: 'What was the wise woman\'s teaching?',
    options: [
      'Never help anyone in need',
      'Kindness should be balanced with wisdom and discernment',
      'All creatures are evil by nature',
      'Farmers should avoid snakes'
    ],
    correctAnswer: 1,
    moral: 'Compassion is a virtue, but wisdom teaches us to be discerning. Help those who will use your kindness to become better, not those who will exploit it.'
  },

  // Courage Stories (5 total)
  {
    id: 'courage-1',
    title: 'The Little Sparrow and the Storm',
    theme: 'courage',
    content: `A little sparrow lived in a great banyan tree near a village. When a terrible storm threatened to destroy the village, all the bigger birds flew away to safety. But the little sparrow noticed an old woman who couldn't flee. Despite being tiny, the sparrow decided to help. Through the night, it flew back and forth, warning villagers and guiding them to safety. By morning, the sparrow had saved many lives, proving that courage isn't about size—it's about the size of your heart.`,
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605106901227-991bd663255c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/courage-1_narration.mp3',
    videoUrl: '/generated_content/videos/courage-1_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'A little sparrow lived in a great banyan tree...' },
      { start: 5, end: 10, text: 'When a terrible storm approached...' },
      { start: 10, end: 15, text: 'All the big birds flew away...' },
      { start: 15, end: 20, text: 'But the sparrow stayed to help...' },
      { start: 20, end: 25, text: 'Through the night, it saved many lives...' },
      { start: 25, end: 30, text: 'Proving that courage comes from the heart...' },
    ],
    question: 'What made the little sparrow different from the other birds?',
    options: [
      'It was stronger than them',
      'It had a brave heart and cared for others',
      'It could fly faster',
      'It wasn\'t afraid of storms'
    ],
    correctAnswer: 1,
    moral: 'True courage is not the absence of fear, but acting with compassion despite your fears to help others in need.'
  },
  {
    id: 'courage-2',
    title: 'The Young Drummer Boy',
    theme: 'courage',
    content: `In an ancient kingdom, a young drummer boy served in the royal army. When enemy forces surrounded their camp at night, the experienced soldiers were filled with fear. The boy, though scared, remembered his duty. He climbed the highest tower and beat his drum with all his might, creating echoes that made their small force sound like a vast army. The enemy, thinking they were outnumbered, retreated. The boy's courage and quick thinking saved the entire kingdom.`,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/courage-2_narration.mp3',
    videoUrl: '/generated_content/videos/courage-2_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'A young drummer boy served in the royal army.' },
      { start: 5, end: 10, text: 'Enemy forces surrounded their camp at night.' },
      { start: 10, end: 15, text: 'Even experienced soldiers were filled with fear.' },
      { start: 15, end: 20, text: 'The boy climbed the highest tower.' },
      { start: 20, end: 25, text: 'His drumming created powerful echoes.' },
      { start: 25, end: 30, text: 'The enemy retreated, thinking they were outnumbered.' },
    ],
    question: 'How did the drummer boy save the kingdom?',
    options: [
      'By fighting the enemies directly',
      'By using his wits and courage to create an illusion of strength',
      'By calling for reinforcements',
      'By hiding until morning'
    ],
    correctAnswer: 1,
    moral: 'Courage combined with intelligence can overcome even the greatest odds. Sometimes the smallest person can make the biggest difference.'
  },
  {
    id: 'courage-3',
    title: 'The Girl Who Faced the Tiger',
    theme: 'courage',
    content: `A young girl was walking through the forest when she encountered a fierce tiger blocking her path. Instead of running in panic, she remembered her grandmother's words: "Face your fears with respect, not aggression." She stood still, looked the tiger in the eyes, and spoke softly, "Great tiger, I mean no harm to your domain. I seek only safe passage." The tiger, surprised by her calm courage, stepped aside and let her pass. Her bravery and respect had turned a predator into a protector.`,
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605106901227-991bd663255c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/courage-3_narration.mp3',
    videoUrl: '/generated_content/videos/courage-3_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'A young girl was walking through the forest.' },
      { start: 5, end: 10, text: 'She encountered a fierce tiger blocking her path.' },
      { start: 10, end: 15, text: 'Instead of running, she remembered her grandmother\'s wisdom.' },
      { start: 15, end: 20, text: 'She faced the tiger with calm respect.' },
      { start: 20, end: 25, text: 'The tiger was surprised by her courage.' },
      { start: 25, end: 30, text: 'It stepped aside and let her pass safely.' },
    ],
    question: 'What made the tiger let the girl pass?',
    options: [
      'She was too small to be a threat',
      'Her calm courage and respectful approach impressed the tiger',
      'The tiger was not hungry',
      'She had magical powers'
    ],
    correctAnswer: 1,
    moral: 'True courage is not about aggression or fearlessness, but about facing challenges with respect, wisdom, and inner strength.'
  },
  {
    id: 'courage-4',
    title: 'The Lighthouse Keeper\'s Son',
    theme: 'courage',
    content: `During a terrible storm, the lighthouse keeper fell ill and could not light the beacon. Ships were approaching the dangerous rocks in the darkness. His young son, though afraid of heights and storms, climbed the tall lighthouse tower. Fighting against fierce winds and rain, he lit the great lamp. Throughout the night, he kept the light burning, guiding ship after ship to safety. By dawn, he had saved dozens of lives, proving that courage grows when others depend on us.`,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/courage-4_narration.mp3',
    videoUrl: '/generated_content/videos/courage-4_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'During a terrible storm, the lighthouse keeper fell ill.' },
      { start: 5, end: 10, text: 'Ships were approaching dangerous rocks in darkness.' },
      { start: 10, end: 15, text: 'His young son was afraid but knew what he must do.' },
      { start: 15, end: 20, text: 'He climbed the tall tower fighting fierce winds.' },
      { start: 20, end: 25, text: 'Throughout the night, he kept the light burning.' },
      { start: 25, end: 30, text: 'By dawn, he had saved dozens of lives.' },
    ],
    question: 'What motivated the boy to overcome his fears?',
    options: [
      'His father\'s orders',
      'The knowledge that others depended on him for their safety',
      'The promise of a reward',
      'His love for climbing'
    ],
    correctAnswer: 1,
    moral: 'Courage is born from responsibility and love for others. When we know that lives depend on our actions, we find strength we never knew we had.'
  },
  {
    id: 'courage-5',
    title: 'The Merchant\'s Daughter and the Bandits',
    theme: 'courage',
    content: `A merchant's daughter was traveling with a caravan when bandits attacked. While everyone else hid, she noticed the bandits were thin and desperate. Instead of cowering, she approached their leader and offered to share the caravan's food. "We are not your enemies," she said. "We are all trying to survive." Her unexpected courage and compassion touched the bandit leader's heart. He called off the attack, and his men shared a meal with the caravan. From that day, those bandits became protectors of travelers instead of threats.`,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/courage-5_narration.mp3',
    videoUrl: '/generated_content/videos/courage-5_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'A merchant\'s daughter was traveling with a caravan.' },
      { start: 5, end: 10, text: 'Bandits attacked and everyone hid in fear.' },
      { start: 10, end: 15, text: 'She noticed the bandits looked desperate and hungry.' },
      { start: 15, end: 20, text: 'Instead of hiding, she offered to share their food.' },
      { start: 20, end: 25, text: 'Her courage and compassion touched the bandit leader.' },
      { start: 25, end: 30, text: 'The bandits became protectors instead of threats.' },
    ],
    question: 'What transformed the bandits from enemies to protectors?',
    options: [
      'Fear of the merchant\'s power',
      'The girl\'s courage to show compassion instead of hatred',
      'The promise of gold',
      'The threat of punishment'
    ],
    correctAnswer: 1,
    moral: 'The greatest courage is not in fighting enemies, but in seeing the humanity in those who oppose us and responding with compassion.'
  },

  // Kindness Stories (5 total)
  {
    id: 'kindness-1',
    title: 'The Magic Pot of the Poor Woman',
    theme: 'kindness',
    content: `In a poor village lived a woman with nothing but a small clay pot. One day, a hungry traveler knocked on her door. Though she had only a handful of rice, she shared half with him. The traveler revealed he was a sage and blessed her pot. From that day, the pot never emptied—whatever she put in multiplied. But the woman never kept it all for herself. She fed every hungry person in the village, and her kindness fed hundreds.`,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/kindness-1_narration.mp3',
    videoUrl: '/generated_content/videos/kindness-1_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'In a poor village lived a generous woman...' },
      { start: 5, end: 10, text: 'She shared her last rice with a stranger...' },
      { start: 10, end: 15, text: 'The stranger was a wise sage...' },
      { start: 15, end: 20, text: 'He blessed her humble pot...' },
      { start: 20, end: 25, text: 'The pot became magical, never emptying...' },
      { start: 25, end: 30, text: 'And she fed the entire village...' },
    ],
    question: 'What was the real magic in this story?',
    options: [
      'The magical pot that never emptied',
      'The woman\'s generous heart and willingness to share',
      'The sage\'s mystical powers',
      'The rice that multiplied'
    ],
    correctAnswer: 1,
    moral: 'Kindness shared returns multiplied. When we give from the heart, the universe conspires to help us give even more.'
  },
  {
    id: 'kindness-2',
    title: 'The Cobbler\'s Gift',
    theme: 'kindness',
    content: `A poor cobbler worked day and night to feed his family. One winter evening, a child came to his shop with torn shoes and no money. The cobbler could have turned him away, but instead, he mended the shoes and gave the child warm socks too. That night, the cobbler found a bag of gold coins outside his door. A note read: "Kindness to children is kindness to the future. This gift is from someone whose childhood you just brightened."`,
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/kindness-2_narration.mp3',
    videoUrl: '/generated_content/videos/kindness-2_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'A poor cobbler worked day and night.' },
      { start: 5, end: 10, text: 'A child came with torn shoes and no money.' },
      { start: 10, end: 15, text: 'The cobbler mended the shoes for free.' },
      { start: 15, end: 20, text: 'He even gave the child warm socks.' },
      { start: 20, end: 25, text: 'That night, he found gold coins outside.' },
      { start: 25, end: 30, text: 'Kindness to children had been rewarded.' },
    ],
    question: 'Why did the cobbler help the child without payment?',
    options: [
      'He expected a reward',
      'His kind heart couldn\'t bear to see a child suffer',
      'The child promised to pay later',
      'He had too many shoes'
    ],
    correctAnswer: 1,
    moral: 'Kindness to children is an investment in the future. When we care for the young, we nurture hope and goodness in the world.'
  },
  {
    id: 'kindness-3',
    title: 'The Water Bearer\'s Lesson',
    theme: 'kindness',
    content: `A water bearer carried two pots daily from the river to his master's house. One pot was perfect, the other had a crack and leaked water. The cracked pot felt ashamed and apologized for its flaw. The water bearer smiled and showed the pot the path they walked. On the side where the cracked pot hung, beautiful flowers bloomed, watered by the leaking drops. "Your flaw," he said, "has created beauty for everyone who walks this path. Even our imperfections can bring joy to others."`,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/kindness-3_narration.mp3',
    videoUrl: '/generated_content/videos/kindness-3_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'A water bearer carried two pots daily.' },
      { start: 5, end: 10, text: 'One pot was perfect, the other had a crack.' },
      { start: 10, end: 15, text: 'The cracked pot felt ashamed of its flaw.' },
      { start: 15, end: 20, text: 'The water bearer showed the pot the path.' },
      { start: 20, end: 25, text: 'Beautiful flowers bloomed where water had leaked.' },
      { start: 25, end: 30, text: 'Even flaws can create beauty for others.' },
    ],
    question: 'What did the water bearer teach the cracked pot?',
    options: [
      'That it should be replaced',
      'That even our flaws can bring beauty and joy to others',
      'That perfect pots are better',
      'That leaking is always bad'
    ],
    correctAnswer: 1,
    moral: 'Kindness sees beauty in imperfection. Our flaws and struggles can become sources of beauty and inspiration for others.'
  },
  {
    id: 'kindness-4',
    title: 'The Baker\'s Daily Bread',
    theme: 'kindness',
    content: `A baker noticed a hungry street child watching his shop every morning. Instead of shooing the child away, he began leaving a small loaf outside his door each day. The child never knew who left it, but it kept him alive. Years later, that child became a successful merchant. He returned to find the old baker and built him a grand new bakery. "You fed my body when I was hungry," he said, "now let me feed your dreams."`,
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/kindness-4_narration.mp3',
    videoUrl: '/generated_content/videos/kindness-4_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'A baker noticed a hungry street child.' },
      { start: 5, end: 10, text: 'He began leaving bread outside his door daily.' },
      { start: 10, end: 15, text: 'The child never knew who was helping him.' },
      { start: 15, end: 20, text: 'Years later, the child became successful.' },
      { start: 20, end: 25, text: 'He returned to find his secret benefactor.' },
      { start: 25, end: 30, text: 'Kindness had come full circle.' },
    ],
    question: 'Why did the baker help the child secretly?',
    options: [
      'He wanted recognition later',
      'True kindness doesn\'t seek credit or gratitude',
      'He was afraid of other beggars',
      'The child asked him to keep it secret'
    ],
    correctAnswer: 1,
    moral: 'The purest kindness is given without expectation of recognition or reward. Anonymous generosity plants seeds that bloom in unexpected ways.'
  },
  {
    id: 'kindness-5',
    title: 'The Healing Garden',
    theme: 'kindness',
    content: `An old woman tended a small garden behind her hut. Whenever someone in the village fell ill, she would freely give her healing herbs. A greedy merchant offered to buy her entire garden for a large sum. "Think of the wealth!" he said. The woman smiled and refused. "My garden's true value is not in gold, but in the health and happiness it brings to my neighbors. Some treasures lose their power when sold." The merchant left confused, but the villagers understood her wisdom.`,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/kindness-5_narration.mp3',
    videoUrl: '/generated_content/videos/kindness-5_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'An old woman tended a healing garden.' },
      { start: 5, end: 10, text: 'She freely gave herbs to anyone who was ill.' },
      { start: 10, end: 15, text: 'A greedy merchant offered to buy her garden.' },
      { start: 15, end: 20, text: 'She refused, explaining its true value.' },
      { start: 20, end: 25, text: 'The garden\'s power was in giving, not selling.' },
      { start: 25, end: 30, text: 'The villagers understood her wisdom.' },
    ],
    question: 'Why did the woman refuse to sell her garden?',
    options: [
      'The price was too low',
      'She understood that some gifts lose their power when commercialized',
      'She didn\'t trust the merchant',
      'She wanted to keep it for herself'
    ],
    correctAnswer: 1,
    moral: 'The greatest treasures are those that multiply when shared and diminish when hoarded. True wealth lies in our ability to heal and help others.'
  },

  // Justice Stories (5 total)
  {
    id: 'justice-1', 
    title: 'The Honest Merchant\'s Scale',
    theme: 'justice',
    content: `A merchant in the marketplace was known for his honest scales while others cheated customers. When a drought came, dishonest merchants hoarded grain to sell at high prices. The honest merchant sold his grain at fair prices, even when he could have made more profit. Soon, his was the only shop people trusted. When the rains returned and grain became plentiful again, everyone remembered his fairness. His business prospered while the dishonest merchants lost their customers forever.`,
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/justice-1_narration.mp3',
    videoUrl: '/generated_content/videos/justice-1_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'A merchant was known for his honesty...' },
      { start: 5, end: 10, text: 'While others cheated their customers...' },
      { start: 10, end: 15, text: 'During the drought, he remained fair...' },
      { start: 15, end: 20, text: 'People trusted only his shop...' },
      { start: 20, end: 25, text: 'When prosperity returned...' },
      { start: 25, end: 30, text: 'His honesty had built lasting success...' },
    ],
    question: 'Why did the honest merchant succeed in the end?',
    options: [
      'Because he had the most grain',
      'Because people trusted him and remembered his fairness',
      'Because he was lucky',
      'Because he charged the highest prices'
    ],
    correctAnswer: 1,
    moral: 'Honesty and justice may seem costly in the moment, but they build trust and reputation that last a lifetime.'
  },
  {
    id: 'justice-2',
    title: 'The King\'s Test of Truth',
    theme: 'justice',
    content: `A king wanted to find the most honest person in his kingdom to be his advisor. He disguised himself as a poor beggar and went from house to house asking for help. Most people turned him away or gave him scraps. But one humble farmer welcomed him warmly, shared his simple meal, and offered his own bed. When the king revealed his identity, the farmer was shocked. "I helped you not because you were a king," said the farmer, "but because you were a human in need." The king found his advisor.`,
    images: [
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516627145497-ae4099d4e6ed?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/justice-2_narration.mp3',
    videoUrl: '/generated_content/videos/justice-2_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'A king wanted to find the most honest person.' },
      { start: 5, end: 10, text: 'He disguised himself as a poor beggar.' },
      { start: 10, end: 15, text: 'Most people turned him away.' },
      { start: 15, end: 20, text: 'But one farmer welcomed him warmly.' },
      { start: 20, end: 25, text: 'When the king revealed his identity...' },
      { start: 25, end: 30, text: 'The farmer had shown true character.' },
    ],
    question: 'What quality did the king value most in his future advisor?',
    options: [
      'Intelligence and education',
      'Treating all people with equal dignity and kindness',
      'Wealth and status',
      'Recognition of royal authority'
    ],
    correctAnswer: 1,
    moral: 'True justice treats all people with equal dignity, regardless of their status. Character is revealed in how we treat those who can do nothing for us.'
  },
  {
    id: 'justice-3',
    title: 'The Stolen Mangoes',
    theme: 'justice',
    content: `Two boys, Ravi and Suresh, were accused of stealing mangoes from a neighbor's tree. The village elder investigated carefully. Ravi immediately blamed Suresh and demanded punishment for him. Suresh remained quiet but showed the elder his hands—they were clean, while Ravi's were stained with mango juice. Moreover, Suresh had been helping his sick mother all morning, as several neighbors confirmed. The elder realized that the loudest accuser was often the guilty one trying to deflect blame.`,
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/justice-3_narration.mp3',
    videoUrl: '/generated_content/videos/justice-3_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'Two boys were accused of stealing mangoes.' },
      { start: 5, end: 10, text: 'The village elder investigated carefully.' },
      { start: 10, end: 15, text: 'Ravi immediately blamed Suresh loudly.' },
      { start: 15, end: 20, text: 'But the evidence told a different story.' },
      { start: 20, end: 25, text: 'Suresh\'s hands were clean, Ravi\'s were stained.' },
      { start: 25, end: 30, text: 'Truth was revealed through careful observation.' },
    ],
    question: 'How did the elder discover the truth?',
    options: [
      'By believing the loudest voice',
      'By examining evidence and seeking witnesses rather than accepting accusations',
      'By punishing both boys equally',
      'By asking the mango tree owner'
    ],
    correctAnswer: 1,
    moral: 'Justice requires careful investigation, not quick judgments. The loudest accusation is not always the truest one.'
  },
  {
    id: 'justice-4',
    title: 'The Fair Division',
    theme: 'justice',
    content: `Three brothers inherited their father's land but couldn't agree on how to divide it fairly. The eldest wanted the fertile fields, the middle brother wanted the forest, and the youngest wanted the riverside. They argued for months until a wise woman suggested a solution: "Each of you will divide the land into three parts as you see fit. Then, the other two will choose their portions first." Suddenly, each brother began to divide more fairly, knowing they might not get their first choice. All three ended up satisfied with the fair division.`,
    images: [
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516627145497-ae4099d4e6ed?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/justice-4_narration.mp3',
    videoUrl: '/generated_content/videos/justice-4_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'Three brothers inherited their father\'s land.' },
      { start: 5, end: 10, text: 'They couldn\'t agree on how to divide it.' },
      { start: 10, end: 15, text: 'Each wanted the best portion for himself.' },
      { start: 15, end: 20, text: 'A wise woman suggested a clever solution.' },
      { start: 20, end: 25, text: 'Each would divide, but others would choose first.' },
      { start: 25, end: 30, text: 'Suddenly, all divisions became fair.' },
    ],
    question: 'Why did the wise woman\'s solution work?',
    options: [
      'It gave everyone what they originally wanted',
      'It made each person consider fairness since they might not get their first choice',
      'It was the fastest way to decide',
      'It favored the youngest brother'
    ],
    correctAnswer: 1,
    moral: 'True justice considers all perspectives. When we must live with the consequences of our decisions affecting others, we naturally become more fair.'
  },
  {
    id: 'justice-5',
    title: 'The Truthful Witness',
    theme: 'justice',
    content: `In a court case, a poor man was accused of stealing from a rich merchant. Many witnesses came forward, but their stories contradicted each other. Finally, a simple washerman stepped forward. "I saw everything," he said quietly. "The merchant dropped his purse, and this man picked it up and ran after him to return it. But the merchant was in his carriage and didn't hear him calling." The rich merchant, embarrassed by his false accusation, not only apologized but rewarded the honest man for his integrity.`,
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop',
    ],
    audioUrl: '/generated_content/audio/justice-5_narration.mp3',
    videoUrl: '/generated_content/videos/justice-5_video.mp4',
    subtitles: [
      { start: 0, end: 5, text: 'A poor man was accused of stealing.' },
      { start: 5, end: 10, text: 'Many witnesses gave contradictory stories.' },
      { start: 10, end: 15, text: 'A simple washerman stepped forward.' },
      { start: 15, end: 20, text: 'He had seen the man trying to return the purse.' },
      { start: 20, end: 25, text: 'The truth cleared the innocent man.' },
      { start: 25, end: 30, text: 'Honesty triumphed over false accusations.' },
    ],
    question: 'What made the washerman\'s testimony credible?',
    options: [
      'He was educated and well-spoken',
      'He told the simple truth without seeking personal gain',
      'He was friends with the accused',
      'He was paid to testify'
    ],
    correctAnswer: 1,
    moral: 'Truth has its own power and needs no embellishment. Justice prevails when honest witnesses have the courage to speak what they have seen.'
  }
];