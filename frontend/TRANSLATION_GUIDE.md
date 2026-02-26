# Multilingual Support Documentation

## Overview
Demeter supports 4 languages: English, Igbo, Yoruba, and Hausa using Azure Translator API.

## Configuration
- **Azure Key**: Configured in `/lib/translator.ts`
- **Endpoint**: https://api.cognitive.microsofttranslator.com
- **Supported Languages**: 
  - `en` - English (default)
  - `ig` - Igbo (🇳🇬)
  - `yo` - Yoruba (🇳🇬)
  - `ha` - Hausa (🇳🇬)

## How It Works
1. User selects language from dropdown in navigation
2. Selection is saved to localStorage
3. On language change, page reloads to trigger re-translation
4. Azure Translator API translates content in real-time

## Usage in Components

### Option 1: Direct Translation Hook (Simple)
For translating single text strings:

```tsx
'use client';

import { useTranslation } from '@/hooks/useTranslation';

export function MyComponent() {
  const title = useTranslation('Welcome to Demeter');
  const description = useTranslation('AI-powered farming assistant');

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### Option 2: Batch Translation (Optimized)
For translating multiple strings at once (reduces API calls):

```tsx
'use client';

import { useTranslations } from '@/hooks/useTranslation';

export function MyComponent() {
  const t = useTranslations({
    title: 'Welcome to Demeter',
    description: 'AI-powered farming assistant',
    cta: 'Get Started',
    learnMore: 'Learn More',
  });

  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
      <button>{t.cta}</button>
      <a>{t.learnMore}</a>
    </div>
  );
}
```

### Option 3: Context API (Advanced)
For programmatic translation:

```tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function MyComponent() {
  const { language, setLanguage, t } = useLanguage();

  const handleClick = async () => {
    const translated = await t('Hello, World!');
    console.log(translated);
  };

  return (
    <div>
      <p>Current language: {language}</p>
      <button onClick={handleClick}>Translate</button>
    </div>
  );
}
```

## Important Notes

### 1. Client Components Only
Translation hooks only work in client components (use `'use client'` directive).

### 2. Performance Considerations
- Translations are cached per language
- Page reload ensures fresh translations
- Use `useTranslations` (plural) for batch operations to reduce API calls

### 3. Static vs Dynamic Content
- Static content (headings, labels): Use translation hooks
- Dynamic content from API: Consider translating on backend or caching translations

### 4. API Rate Limits
Azure Translator has rate limits. For production:
- Implement caching layer (Redis/database)
- Pre-translate common strings
- Use batch translation for large content

## Adding Language Selector
Already integrated in:
- ✅ Landing page navigation
- ✅ Dashboard navigation (all pages)

## Testing
1. Navigate to landing page or dashboard
2. Click language selector dropdown
3. Select Igbo, Yoruba, or Hausa
4. Page reloads with translated content

## Future Improvements
- [ ] Add translation caching (Redis)
- [ ] Pre-translate static content
- [ ] Add offline fallback
- [ ] Support more Nigerian languages (e.g., Fulfulde, Kanuri)
- [ ] Add region-specific dialects
