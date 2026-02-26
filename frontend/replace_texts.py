#!/usr/bin/env python3
"""
Script to replace hardcoded English text with translation variables in page.tsx
"""

import re

FILE_PATH = '/workspaces/Demeter/frontend/src/app/page.tsx'

# Define replacements as (old_text, new_text) tuples
replacements = [
    # Navigation section
    (r'<a href="#problem".*?>Problem</a>', r'<a href="#problem" className="text-[14px] text-[#1B4332]/70 hover:text-[#1B4332] transition-colors">{nav.problem}</a>'),
    (r'<a href="#solution".*?>Solution</a>', r'<a href="#solution" className="text-[14px] text-[#1B4332]/70 hover:text-[#1B4332] transition-colors">{nav.solution}</a>'),
    (r'<a href="#story".*?>Story</a>', r'<a href="#story" className="text-[14px] text-[#1B4332]/70 hover:text-[#1B4332] transition-colors">{nav.story}</a>'),
    (r'<a href="#metrics".*?>Metrics</a>', r'<a href="#metrics" className="text-[14px] text-[#1B4332]/70 hover:text-[#1B4332] transition-colors">{nav.metrics}</a>'),
   
    # Scroll indicator
    (r'<span className="text-\[12px\] text-white/70">Scroll to explore</span>', r'<span className="text-[12px] text-white/70">{hero.scrollText}</span>'),
    
    # Problem section
    (r'<span className="text-\[13px\] font-medium text-\[#E2725B\]">The Crisis</span>', r'<span className="text-[13px] font-medium text-[#E2725B]">{problem.badge}</span>'),
    (r'Climate Volatility is Devastating<br />Smallholder Farmers', r'{problem.title1}<br />{problem.title2}'),
    (r'Without predictive tools, farmers make critical decisions in the dark—\s*often with catastrophic consequences\.', r'{problem.subtitle}'),
    (r'>\$4B\+</h3>', r'>{problem.stat1Value}</h3>'),
    (r'>Annual Maize Loss</p>', r'>{problem.stat1Title}</p>'),
    (r'>in Sub-Saharan Africa due to climate volatility and lack of predictive tools</p>', r'>{problem.stat1Desc}</p>'),
    (r'>30-50%</h3>', r'>{problem.stat2Value}</h3>'),
    (r'>Yield Loss</p>', r'>{problem.stat2Title}</p>'),
    (r'>from a single misjudged irrigation decision during a critical dry spell</p>', r'>{problem.stat2Desc}</p>'),
    (r'>0</h3>', r'>{problem.stat3Value}</h3>'),
    (r'>Days Warning</p>', r'>{problem.stat3Title}</p>'),
    (r'>Traditional methods provide no advance notice, leaving farmers reactive instead of proactive</p>', r'>{problem.stat3Desc}</p>'),
    
    # Solution section
    (r'<span className="text-\[13px\] font-medium text-\[#1B4332\]">The Solution</span>', r'<span className="text-[13px] font-medium text-[#1B4332]">{solution.badge}</span>'),
    (r'>Your Digital Farm Twin</h2>', r'>{solution.title}</h2>'),
    (r'>From sensor to SMS: Real-time intelligence that turns uncertainty into actionable insights\.</p>', r'>{solution.subtitle}</p>'),
    (r'title="ESP32 Sensors Capture Data"', r'title={solution.step1Title}'),
    (r'description="Soil moisture, temperature, and humidity readings every 15 minutes from your field\."', r'description={solution.step1Desc}'),
    (r'title="Real-Time Data Pipeline"', r'title={solution.step2Title}'),
    (r'description="LoRaWAN gateway transmits data to cloud infrastructure with <5s latency\."', r'description={solution.step2Desc}'),
    (r'title="ML Ensemble Predictions"', r'title={solution.step3Title}'),
    (r'description="Random Forest \+ XGBoost models generate 14-day stress forecasts with ±15% accuracy\."', r'description={solution.step3Desc}'),
    (r'title="SMS Guidance via Africa\'s Talking"', r'title={solution.step4Title}'),
    (r'description="Actionable advice delivered in Hausa: \'Irrigate Zone A in 48 hours to prevent 20% yield loss\.\'"', r'description={solution.step4Desc}'),
    (r'>Live Data</span>', r'>{solution.liveData}</span>'),
   (r'>Updated 2 min ago</span>', r'>{solution.updated}</span>'),
    
    # Story section
    (r'<span className="text-\[13px\] font-medium text-\[#E2725B\]">Real Impact</span>', r'<span className="text-[13px] font-medium text-[#E2725B]">{story.badge}</span>'),
    (r'>Meet Amina</h2>', r'>{story.title}</h2>'),
    (r'>A 38-year-old maize farmer from Kaduna State with 1\.5 hectares.*?</', r'>{story.subtitle}</'),
]

def replace_translations():
    print(f"Reading {FILE_PATH}...")
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_len = len(content)
    
    print("Applying replacements...")
    for old, new in replacements:
        matches = len(re.findall(old, content, re.DOTALL))
        if matches > 0:
            print(f"  Replacing {matches} occurrence(s) of: {old[:50]}...")
            content = re.sub(old, new, content, flags=re.DOTALL)
    
    if len(content) == original_len:
        print("⚠️  No changes made - check regex patterns")
        return False
    
    print(f"Writing changes to {FILE_PATH}...")
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Replacements complete!")
    return True

if __name__ == '__main__':
    replace_translations()
