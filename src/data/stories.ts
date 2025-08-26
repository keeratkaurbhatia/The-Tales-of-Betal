export interface Story {
  id: string;
  title: string;
  theme: string;
  content: string;
  images: string[];
  audioUrl: string;
  subtitles: Array<{ start: number; end: number; text: string }>;
  question: string;
  options: string[];
  correctAnswer: number;
  moral: string;
}

export const stories: Story[] = [
  // Wisdom Stories
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
    audioUrl: '/audio/story-1.mp3',
    subtitles: [
      { start: 0, end: 5, text: 'Once upon a time, in a small village...' },
      { start: 5, end: 10, text: 'There lived an old man with three sons...' },
      { start: 10, end: 15, text: 'He wanted to test their wisdom...' },
      { start: 15, end: 20, text: 'Each son received a single grain of rice...' },
      { start: 20, end: 25, text: 'The third son chose kindness over profit...' },
      { start: 25, end: 30, text: 'And wisdom revealed its true nature...' },
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
  
  // Courage Stories
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
    audioUrl: '/audio/story-2.mp3',
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

  // Kindness Stories  
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
    audioUrl: '/audio/story-3.mp3',
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

  // Justice Stories
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
    audioUrl: '/audio/story-4.mp3',
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

  // Additional Wisdom Story
  {
    id: 'wisdom-2',
    title: 'The Student and the Empty Cup',
    theme: 'wisdom',
    content: `A proud student visited a wise teacher, boasting about his knowledge. The teacher invited him for tea and began pouring into the student's cup. He kept pouring even as the cup overflowed, spilling tea everywhere. "Stop!" cried the student. "The cup is full!" The teacher smiled and said, "Yes, and like this cup, you are full of your own ideas. How can I teach you anything until you first empty your cup?"`,
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    ],
    audioUrl: '/audio/story-5.mp3',
    subtitles: [
      { start: 0, end: 5, text: 'A proud student visited a wise teacher...' },
      { start: 5, end: 10, text: 'The teacher invited him for tea...' },
      { start: 10, end: 15, text: 'He kept pouring into the full cup...' },
      { start: 15, end: 20, text: 'Tea spilled everywhere...' },
      { start: 20, end: 25, text: 'The student protested...' },
      { start: 25, end: 30, text: 'The teacher revealed the lesson...' },
    ],
    question: 'What did the overflowing cup represent?',
    options: [
      'The teacher\'s carelessness',
      'The student\'s mind full of pride, leaving no room for new learning',
      'A waste of good tea',
      'The student\'s thirst'
    ],
    correctAnswer: 1,
    moral: 'To receive wisdom, one must first empty the mind of pride and preconceptions. True learning begins with humility.'
  },

  // Additional Courage Story
  {
    id: 'courage-2',
    title: 'The Village Girl and the Tiger',
    theme: 'courage',
    content: `When a fierce tiger threatened her village, young Kamala knew she had to act. Everyone said she was too small, too young, too weak. But Kamala studied the tiger's habits and discovered it was actually protecting its injured cub. Instead of fighting, she brought medicine and food. Slowly, she earned the tiger's trust. When the cub healed, both tigers left peacefully. The village learned that sometimes the greatest courage lies in choosing understanding over conflict.`,
    images: [
      'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop',
    ],
    audioUrl: '/audio/story-6.mp3',
    subtitles: [
      { start: 0, end: 5, text: 'A fierce tiger threatened the village...' },
      { start: 5, end: 10, text: 'Young Kamala decided to help...' },
      { start: 10, end: 15, text: 'She discovered the tiger\'s secret...' },
      { start: 15, end: 20, text: 'Instead of fighting, she showed compassion...' },
      { start: 20, end: 25, text: 'She earned the tiger\'s trust...' },
      { start: 25, end: 30, text: 'Peace was achieved through understanding...' },
    ],
    question: 'What made Kamala\'s approach different from everyone else\'s?',
    options: [
      'She was stronger than the others',
      'She sought to understand rather than fight',
      'She had magical powers',
      'She was not afraid'
    ],
    correctAnswer: 1,
    moral: 'True courage often means choosing compassion over conflict and seeking to understand rather than to conquer.'
  },

  // Additional Kindness Story
  {
    id: 'kindness-2',
    title: 'The Cobbler\'s Gift',
    theme: 'kindness',
    content: `Old Raman was a poor cobbler who mended shoes for mere pennies. One winter day, a child came to his shop with torn shoes but no money. Raman mended them for free and gave the child his own warm socks. That night, Raman's feet were cold, but his heart was warm. The next morning, he found a pair of beautiful new shoes outside his shop with a note: "For someone who walks in kindness." The child's grateful mother had worked all night to make them.`,
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    ],
    audioUrl: '/audio/story-7.mp3',
    subtitles: [
      { start: 0, end: 5, text: 'Old Raman was a poor but kind cobbler...' },
      { start: 5, end: 10, text: 'A child came with torn shoes...' },
      { start: 10, end: 15, text: 'Raman gave freely what little he had...' },
      { start: 15, end: 20, text: 'His feet were cold but heart was warm...' },
      { start: 20, end: 25, text: 'The next morning brought a surprise...' },
      { start: 25, end: 30, text: 'Kindness had returned multiplied...' },
    ],
    question: 'What did Raman receive in return for his kindness?',
    options: [
      'Money from the child',
      'Beautiful shoes and the joy of giving',
      'Fame in the village',
      'Nothing at all'
    ],
    correctAnswer: 1,
    moral: 'Kindness given freely, without expectation of return, often comes back to us in the most beautiful and unexpected ways.'
  },

  // Additional Justice Story
  {
    id: 'justice-2',
    title: 'The Two Brothers and the Inheritance',
    theme: 'justice',
    content: `Two brothers inherited their father's farm. The elder brother claimed the larger, fertile portion, leaving the younger with rocky soil. Instead of complaining, the younger brother worked harder, clearing stones and treating his land with care. Years passed. The elder brother's land, poorly maintained, became barren. The younger brother's careful cultivation made his rocky soil bloom. When the elder brother asked for help, the younger brother shared his harvest, saying, "Justice is not in taking what you think you deserve, but in giving what others need."`,
    images: [
      'https://images.unsplash.com/photo-1574263867128-7e929b168ac1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592982546994-be7a0bee475c?w=800&h=600&fit=crop',
    ],
    audioUrl: '/audio/story-8.mp3',
    subtitles: [
      { start: 0, end: 5, text: 'Two brothers inherited their father\'s farm...' },
      { start: 5, end: 10, text: 'The elder took the better portion...' },
      { start: 10, end: 15, text: 'The younger worked the rocky soil...' },
      { start: 15, end: 20, text: 'Hard work transformed the land...' },
      { start: 20, end: 25, text: 'The elder brother needed help...' },
      { start: 25, end: 30, text: 'True justice was shown through sharing...' },
    ],
    question: 'What does this story teach us about justice?',
    options: [
      'The strong should take from the weak',
      'Justice means giving what others need, not just taking what we think we deserve',
      'Hard work always pays off',
      'Older siblings deserve more'
    ],
    correctAnswer: 1,
    moral: 'True justice lies not in claiming what we believe we deserve, but in recognizing what others need and acting with compassion.'
  },

  // Two more stories to reach 10
  {
    id: 'wisdom-3',
    title: 'The Fisherman and the Golden Fish',
    theme: 'wisdom',
    content: `A simple fisherman caught a golden fish that promised to grant wishes in exchange for freedom. The fisherman\'s wife demanded a bigger house, then a palace, then to be queen, then goddess. Each time, the fisherman reluctantly returned to ask the fish. Finally, when she demanded to control the sun and moon, the fish said, "She who is never satisfied will lose even what she had." They found themselves back in their simple hut, but the fisherman was content—he had learned that happiness comes from within.`,
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&h=600&fit=crop',
    ],
    audioUrl: '/audio/story-9.mp3',
    subtitles: [
      { start: 0, end: 5, text: 'A fisherman caught a magical golden fish...' },
      { start: 5, end: 10, text: 'His wife\'s demands grew endless...' },
      { start: 10, end: 15, text: 'From house to palace to kingdom...' },
      { start: 15, end: 20, text: 'Her greed knew no bounds...' },
      { start: 20, end: 25, text: 'The fish\'s patience finally ended...' },
      { start: 25, end: 30, text: 'They returned to simple contentment...' },
    ],
    question: 'What was the fisherman\'s wife\'s biggest mistake?',
    options: [
      'Asking for too much money',
      'Never being satisfied with what she had',
      'Not trusting her husband',
      'Catching the fish herself'
    ],
    correctAnswer: 1,
    moral: 'Contentment is the greatest wealth. Those who are never satisfied with what they have will eventually lose everything in their endless pursuit of more.'
  },

  {
    id: 'kindness-3',
    title: 'The Monkey and the Crocodile\'s Heart',
    theme: 'kindness',
    content: `A clever monkey befriended a crocodile, sharing sweet fruits daily. The crocodile's wife, jealous of their friendship, demanded the monkey's heart, claiming it would cure her illness. Reluctantly, the crocodile invited the monkey for a ride, then revealed his wife's demand. The quick-thinking monkey said, "Oh! I left my heart on the tree for safekeeping. Let me fetch it." Once safely back on land, the monkey said, "My heart was always here, full of friendship for you. But real friends don't sacrifice each other." The crocodile realized his mistake and their friendship was restored.`,
    images: [
      'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441154464237-0e1310be7ec8?w=800&h=600&fit=crop',
    ],
    audioUrl: '/audio/story-10.mp3',
    subtitles: [
      { start: 0, end: 5, text: 'A monkey and crocodile were great friends...' },
      { start: 5, end: 10, text: 'The crocodile\'s wife grew jealous...' },
      { start: 10, end: 15, text: 'She demanded the monkey\'s heart...' },
      { start: 15, end: 20, text: 'The monkey used quick thinking...' },
      { start: 20, end: 25, text: 'He escaped and taught about true friendship...' },
      { start: 25, end: 30, text: 'Their bond became stronger than before...' },
    ],
    question: 'How did the monkey save himself and preserve the friendship?',
    options: [
      'By fighting the crocodile',
      'By using cleverness and teaching about true friendship',
      'By running away forever',
      'By giving his heart willingly'
    ],
    correctAnswer: 1,
    moral: 'True friendship means protecting each other from harm. Kindness and cleverness together can overcome jealousy and restore trust.'
  }
];