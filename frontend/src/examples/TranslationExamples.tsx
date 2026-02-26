// Example: How to Add Translations to Your Component
// This file demonstrates the usage patterns - copy and adapt to your needs

'use client';

import { useTranslation, useTranslations } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';

// ============================================
// EXAMPLE 1: Single Text Translation
// ============================================
export function SimpleTranslationExample() {
  const title = useTranslation('Weather Forecast');
  const subtitle = useTranslation('7-day prediction for your farm');

  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

// ============================================
// EXAMPLE 2: Multiple Texts (Optimized)
// ============================================
export function BatchTranslationExample() {
  const t = useTranslations({
    header: 'Crop Health Dashboard',
    temperature: 'Temperature',
    humidity: 'Humidity',
    soilMoisture: 'Soil Moisture',
    rainfall: 'Rainfall',
    status: 'Status',
    healthy: 'Healthy',
    warning: 'Warning',
    critical: 'Critical',
  });

  return (
    <div>
      <h1>{t.header}</h1>
      <div>
        <label>{t.temperature}:</label> <span>28°C</span>
      </div>
      <div>
        <label>{t.humidity}:</label> <span>65%</span>
      </div>
      <div>
        <label>{t.soilMoisture}:</label> <span>45%</span>
      </div>
      <div>
        <label>{t.status}:</label> <span>{t.healthy}</span>
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 3: Dynamic/Programmatic Translation
// ============================================
export function DynamicTranslationExample() {
  const { language, t } = useLanguage();

  const handleTranslateMessage = async () => {
    const message = 'Your crops need watering in 48 hours';
    const translated = await t(message);
    alert(translated);
  };

  return (
    <div>
      <p>Current Language: {language}</p>
      <button onClick={handleTranslateMessage}>
        Translate Alert Message
      </button>
    </div>
  );
}

// ============================================
// EXAMPLE 4: Chart/Data Visualization Labels
// ============================================
export function ChartTranslationExample() {
  const labels = useTranslations({
    xAxisLabel: 'Date',
    yAxisLabel: 'Temperature (°C)',
    series1: 'Maximum',
    series2: 'Minimum',
    series3: 'Average',
    tooltipTemp: 'Temperature',
    tooltipDate: 'Date',
  });

  // Use these translated labels in your chart config
  const chartConfig = {
    xAxis: {
      label: labels.xAxisLabel,
    },
    yAxis: {
      label: labels.yAxisLabel,
    },
    series: [
      { name: labels.series1, data: [] },
      { name: labels.series2, data: [] },
      { name: labels.series3, data: [] },
    ],
  };

  return <div>{/* Your chart component here */}</div>;
}

// ============================================
// EXAMPLE 5: Button/Action Labels
// ============================================
export function ActionsTranslationExample() {
  const actions = useTranslations({
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    export: 'Export',
    viewDetails: 'View Details',
    downloadReport: 'Download Report',
  });

  return (
    <div className="flex gap-2">
      <button>{actions.save}</button>
      <button>{actions.cancel}</button>
      <button>{actions.edit}</button>
      <button>{actions.export}</button>
    </div>
  );
}

// ============================================
// BEST PRACTICES
// ============================================

// ✅ DO: Use batch translation for multiple related strings
function GoodExample() {
  const t = useTranslations({
    field1: 'First Name',
    field2: 'Last Name',
    field3: 'Email',
    submit: 'Submit',
  });
  return <form>{/* ... */}</form>;
}

// ❌ DON'T: Make separate API calls for each string
function BadExample() {
  const field1 = useTranslation('First Name');
  const field2 = useTranslation('Last Name');
  const field3 = useTranslation('Email');
  const submit = useTranslation('Submit');
  return <form>{/* ... */}</form>;
}

// ✅ DO: Keep original English text readable
const labels = useTranslations({
  irrigationSchedule: 'Irrigation Schedule',
  waterUsage: 'Water Usage',
});

// ❌ DON'T: Use cryptic keys
const labels2 = useTranslations({
  irr_sch: 'Irrigation Schedule',
  wat_usg: 'Water Usage',
});
