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
  }
];