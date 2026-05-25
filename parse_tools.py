import re
import random

with open('ai_tools_extract.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

tools = []
current_category = "General AI"
tool_id = 1

# Try to match the headings to get categories
# e.g. "🤖  Chat AI"
for line in lines:
    line = line.strip()
    if line.startswith('🤖') or line.startswith('💻') or line.startswith('🎨') or line.startswith('🎬') or line.startswith('🎤') or line.startswith('🌐') or line.startswith('📱') or line.startswith('⚡') or line.startswith('📊') or line.startswith('📚') or line.startswith('🧠') or line.startswith('🎵') or line.startswith('📈') or line.startswith('🛒') or line.startswith('🔒') or line.startswith('☁️') or line.startswith('🎮') or line.startswith('🧬') or line.startswith('📄') or line.startswith('📹'):
        cat_name = line.split('  ')[-1].strip()
        if "Directory" not in cat_name:
            current_category = cat_name
            
    if ' | ' in line and not line.startswith('Tool Name'):
        parts = line.split(' | ')
        if len(parts) >= 4:
            raw_name = parts[0].strip()
            # Fix duplicated names like "ChatGPTChatGPT" -> "ChatGPT"
            name = raw_name
            half = len(raw_name) // 2
            if raw_name[:half] == raw_name[half:]:
                name = raw_name[:half]
            
            pricing = parts[1].strip()
            plan_types = parts[2].strip()
            features = parts[3].strip()
            
            # Determine API availability and basic price num
            api_available = True if 'API' in pricing or 'API' in plan_types or 'API' in features else False
            
            price_num = 0
            if '$' in pricing:
                try:
                    nums = re.findall(r'\$(\d+)', pricing)
                    if nums:
                        price_num = int(nums[0])
                except:
                    pass
            
            tools.append({
                "id": tool_id,
                "name": name,
                "category": current_category,
                "pricing": pricing,
                "price_num": price_num,
                "speed_score": random.randint(60, 100),
                "context_length": random.choice([8000, 16000, 32000, 64000, 128000, 2000000]),
                "reasoning_score": random.randint(60, 100),
                "creativity_score": random.randint(60, 100),
                "api_available": api_available,
                "rating": round(random.uniform(4.0, 5.0), 1),
                "description": features
            })
            tool_id += 1

with open('backend/tools_data.py', 'w', encoding='utf-8') as f:
    f.write('SAMPLE_TOOLS = [\n')
    for t in tools:
        f.write(f"    {repr(t)},\n")
    f.write(']\n')

print(f"Successfully generated tools_data.py with {len(tools)} tools!")
