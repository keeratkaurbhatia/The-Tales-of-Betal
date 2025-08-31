#!/usr/bin/env python3
"""
Generate JSON data files for all stories with proper subtitle timing.
This script creates individual JSON files for each story in the public directory.
"""

import json
import os
import re
from typing import List, Dict, Any

def create_story_data(story_id: str, title: str, theme: str, content: str) -> Dict[str, Any]:
    """Create story data structure with proper paths and timing."""
    
    # Split content into sentences for subtitle timing using punctuation-aware regex
    normalized = re.sub(r"\s+", " ", content.strip())
    sentences = re.findall(r"[^.!?]+[.!?]", normalized)
    
    # Generate subtitles with proper timing (approximately 5-6 seconds per sentence)
    subtitles = []
    current_time = 0.0
    
    for sentence in sentences:
        if sentence.strip():
            # Estimate duration based on sentence length (roughly 150 words per minute)
            words = len(sentence.split())
            duration = max(3.0, min(8.0, words * 0.4))  # Between 3-8 seconds
            
            subtitles.append({
                "start": round(current_time, 1),
                "end": round(current_time + duration, 1),
                "text": sentence.strip()
            })
            current_time += duration
    
    # Generate image paths (6 scenes per story)
    images = [f"/generated_content/images/{story_id}_scene_{i:02d}.png" for i in range(1, 7)]
    
    return {
        "id": story_id,
        "title": title,
        "theme": theme,
        "content": content.strip(),
        "images": images,
        "audioUrl": f"/generated_content/audio/{story_id}_narration.mp3",
        "videoUrl": f"/generated_content/videos/{story_id}_video.mp4",
        "subtitles": subtitles
    }

def main():
    """Generate JSON files for all stories."""
    
    # Story definitions
    stories = [
        # Wisdom Stories
        ("wisdom-1", "The Wise Old Man and the Three Sons", "wisdom", 
         "Once upon a time, in a small village, there lived an old man with three sons. The old man was known throughout the village for his wisdom and kindness. As he grew older, he wanted to test which of his sons would inherit his wisdom. He gave each son a single grain of rice and told them to make it multiply by the next full moon. The first son planted it and got a small harvest. The second son sold it and bought more rice. But the third son gave it to a hungry child, saying that kindness multiplies in ways grain cannot."),
        
        ("wisdom-2", "The Scholar and the Boatman", "wisdom",
         "A learned scholar was crossing a river with a simple boatman. The scholar boasted about his knowledge of astronomy, mathematics, and philosophy. Have you studied the stars he asked. No said the boatman. Then half your life is wasted declared the scholar. Suddenly, the boat hit a rock and began to sink. Can you swim asked the boatman urgently. No replied the terrified scholar. Then your whole life is wasted said the boatman as he swam them both to safety."),
        
        ("wisdom-3", "The Two Pots", "wisdom",
         "Two pots hung from a pole carried by a water bearer. One was made of brass, shiny and proud. The other was made of clay, humble and simple. The brass pot constantly boasted about its beauty and durability. Look how I shine it said. You are so plain and fragile. The clay pot remained silent. One day, they knocked against each other. The brass pot was unharmed, but it realized that if they kept colliding, the clay pot would break. From that day, the brass pot learned to be gentle and protective of its companion."),
        
        ("wisdom-4", "The Wise Judge and the Two Mothers", "wisdom",
         "Two women came before a wise judge, both claiming the same baby as their own. The judge listened to their arguments but could not determine the truth. Finally, he said, Since you both claim this child, I will cut the baby in half and give each of you a piece. One woman agreed, saying it was fair. The other woman cried out, No Give the baby to her I would rather lose my child than see him harmed The judge immediately gave the baby to the second woman, for only a true mother would sacrifice her own happiness for her child's safety."),
        
        ("wisdom-5", "The Farmer and the Snake", "wisdom",
         "A kind farmer found a snake freezing in the snow. Taking pity, he brought it home and warmed it by his fire. As the snake revived, it bit the farmer. Why did you bite me after I saved you asked the dying farmer. It is my nature replied the snake. You knew what I was when you picked me up. A wise old woman who witnessed this said, Kindness is a virtue, but wisdom knows when and where to apply it. Not all who suffer deserve our help if they will use it to harm others."),
        
        # Courage Stories
        ("courage-1", "The Little Sparrow and the Storm", "courage",
         "A little sparrow lived in a great banyan tree near a village. When a terrible storm threatened to destroy the village, all the bigger birds flew away to safety. But the little sparrow noticed an old woman who couldn't flee. Despite being tiny, the sparrow decided to help. Through the night, it flew back and forth, warning villagers and guiding them to safety. By morning, the sparrow had saved many lives, proving that courage isn't about size it's about the size of your heart."),
        
        ("courage-2", "The Young Drummer Boy", "courage",
         "In an ancient kingdom, a young drummer boy served in the royal army. When enemy forces surrounded their camp at night, the experienced soldiers were filled with fear. The boy, though scared, remembered his duty. He climbed the highest tower and beat his drum with all his might, creating echoes that made their small force sound like a vast army. The enemy, thinking they were outnumbered, retreated. The boy's courage and quick thinking saved the entire kingdom."),
        
        ("courage-3", "The Girl Who Faced the Tiger", "courage",
         "A young girl was walking through the forest when she encountered a fierce tiger blocking her path. Instead of running in panic, she remembered her grandmother's words Face your fears with respect, not aggression. She stood still, looked the tiger in the eyes, and spoke softly, Great tiger, I mean no harm to your domain. I seek only safe passage. The tiger, surprised by her calm courage, stepped aside and let her pass. Her bravery and respect had turned a predator into a protector."),
        
        ("courage-4", "The Lighthouse Keeper's Son", "courage",
         "During a terrible storm, the lighthouse keeper fell ill and could not light the beacon. Ships were approaching the dangerous rocks in the darkness. His young son, though afraid of heights and storms, climbed the tall lighthouse tower. Fighting against fierce winds and rain, he lit the great lamp. Throughout the night, he kept the light burning, guiding ship after ship to safety. By dawn, he had saved dozens of lives, proving that courage grows when others depend on us."),
        
        ("courage-5", "The Merchant's Daughter and the Bandits", "courage",
         "A merchant's daughter was traveling with a caravan when bandits attacked. While everyone else hid, she noticed the bandits were thin and desperate. Instead of cowering, she approached their leader and offered to share the caravan's food. We are not your enemies she said. We are all trying to survive. Her unexpected courage and compassion touched the bandit leader's heart. He called off the attack, and his men shared a meal with the caravan. From that day, those bandits became protectors of travelers instead of threats."),
        
        # Kindness Stories
        ("kindness-1", "The Magic Pot of the Poor Woman", "kindness",
         "In a poor village lived a woman with nothing but a small clay pot. One day, a hungry traveler knocked on her door. Though she had only a handful of rice, she shared half with him. The traveler revealed he was a sage and blessed her pot. From that day, the pot never emptied whatever she put in multiplied. But the woman never kept it all for herself. She fed every hungry person in the village, and her kindness fed hundreds."),
        
        ("kindness-2", "The Cobbler's Gift", "kindness",
         "A poor cobbler worked day and night to feed his family. One winter evening, a child came to his shop with torn shoes and no money. The cobbler could have turned him away, but instead, he mended the shoes and gave the child warm socks too. That night, the cobbler found a bag of gold coins outside his door. A note read Kindness to children is kindness to the future. This gift is from someone whose childhood you just brightened."),
        
        ("kindness-3", "The Water Bearer's Lesson", "kindness",
         "A water bearer carried two pots daily from the river to his master's house. One pot was perfect, the other had a crack and leaked water. The cracked pot felt ashamed and apologized for its flaw. The water bearer smiled and showed the pot the path they walked. On the side where the cracked pot hung, beautiful flowers bloomed, watered by the leaking drops. Your flaw he said has created beauty for everyone who walks this path. Even our imperfections can bring joy to others."),
        
        ("kindness-4", "The Baker's Daily Bread", "kindness",
         "A baker noticed a hungry street child watching his shop every morning. Instead of shooing the child away, he began leaving a small loaf outside his door each day. The child never knew who left it, but it kept him alive. Years later, that child became a successful merchant. He returned to find the old baker and built him a grand new bakery. You fed my body when I was hungry he said now let me feed your dreams."),
        
        ("kindness-5", "The Healing Garden", "kindness",
         "An old woman tended a small garden behind her hut. Whenever someone in the village fell ill, she would freely give her healing herbs. A greedy merchant offered to buy her entire garden for a large sum. Think of the wealth he said. The woman smiled and refused. My garden's true value is not in gold, but in the health and happiness it brings to my neighbors. Some treasures lose their power when sold. The merchant left confused, but the villagers understood her wisdom."),
        
        # Justice Stories
        ("justice-1", "The Honest Merchant's Scale", "justice",
         "A merchant in the marketplace was known for his honest scales while others cheated customers. When a drought came, dishonest merchants hoarded grain to sell at high prices. The honest merchant sold his grain at fair prices, even when he could have made more profit. Soon, his was the only shop people trusted. When the rains returned and grain became plentiful again, everyone remembered his fairness. His business prospered while the dishonest merchants lost their customers forever."),
        
        ("justice-2", "The King's Test of Truth", "justice",
         "A king wanted to find the most honest person in his kingdom to be his advisor. He disguised himself as a poor beggar and went from house to house asking for help. Most people turned him away or gave him scraps. But one humble farmer welcomed him warmly, shared his simple meal, and offered his own bed. When the king revealed his identity, the farmer was shocked. I helped you not because you were a king said the farmer but because you were a human in need. The king found his advisor."),
        
        ("justice-3", "The Stolen Mangoes", "justice",
         "Two boys, Ravi and Suresh, were accused of stealing mangoes from a neighbor's tree. The village elder investigated carefully. Ravi immediately blamed Suresh and demanded punishment for him. Suresh remained quiet but showed the elder his hands they were clean, while Ravi's were stained with mango juice. Moreover, Suresh had been helping his sick mother all morning, as several neighbors confirmed. The elder realized that the loudest accuser was often the guilty one trying to deflect blame."),
        
        ("justice-4", "The Fair Division", "justice",
         "Three brothers inherited their father's land but couldn't agree on how to divide it fairly. The eldest wanted the fertile fields, the middle brother wanted the forest, and the youngest wanted the riverside. They argued for months until a wise woman suggested a solution Each of you will divide the land into three parts as you see fit. Then, the other two will choose their portions first. Suddenly, each brother began to divide more fairly, knowing they might not get their first choice. All three ended up satisfied with the fair division."),
        
        ("justice-5", "The Truthful Witness", "justice",
         "In a court case, a poor man was accused of stealing from a rich merchant. Many witnesses came forward, but their stories contradicted each other. Finally, a simple washerman stepped forward. I saw everything he said quietly. The merchant dropped his purse, and this man picked it up and ran after him to return it. But the merchant was in his carriage and didn't hear him calling. The rich merchant, embarrassed by his false accusation, not only apologized but rewarded the honest man for his integrity."),

        # Additional one per theme (story 6)
        ("wisdom-6", "The Sage and the Mirror", "wisdom",
         "A traveler asked a sage, How do I find wisdom The sage handed him a mirror and said, Look until you stop seeing only yourself. Days later, the traveler returned, humbled. I saw my pride, my fears, my excuses. Then I began to see others. The sage smiled. Now you are ready. Wisdom begins when the self no longer fills the view."),

        ("courage-6", "The Bridge of Night", "courage",
         "An old rope bridge swayed over a gorge. At dusk, a healer carried medicine across for a sick child. Halfway through, a plank snapped. She froze, then remembered the child waiting. Breathing steadily, she crawled forward, testing each step. She reached the far side as stars rose, clutching the medicine and the courage she found between fear and love."),

        ("kindness-6", "The Lantern Left Burning", "kindness",
         "A widow placed a lantern at her gate each night, saying, May any traveler find their way. One stormy evening, she had only a little oil left, yet she lit it anyway. At dawn, she found a note Your light saved my life. Years later, a sturdy roof and storehouse were built for her by that same traveler, grateful beyond words."),

        ("justice-6", "The Scales in the Dark", "justice",
         "A judge asked two merchants to weigh their goods in a dark room. One cheated in the shadows the other measured fairly. When torches were lit, the judge said, Justice is not for the crowd to see it is for your own soul to carry. The honest merchant was favored, for justice begins where no one watches.")
    ]
    
    # Create output directory
    output_dir = "public/generated_content"
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate JSON file for each story
    for story_id, title, theme, content in stories:
        story_data = create_story_data(story_id, title, theme, content)
        
        output_file = os.path.join(output_dir, f"{story_id}_data.json")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(story_data, f, indent=2, ensure_ascii=False)
        
        print(f"Generated: {output_file}")
    
    print(f"\nGenerated {len(stories)} story data files!")
    print("Next steps:")
    print("1. Run the story generation notebook to create images, audio, and videos")
    print("2. The app will automatically load these JSON files for each story")

if __name__ == "__main__":
    main()