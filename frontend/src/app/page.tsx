export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] p-8">
      <div className="container-demeter">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl font-bold text-[var(--color-soil)] mb-3">
            Demeter
          </h1>
          <p className="text-lg text-[var(--color-bark)]">
            AI-Powered Digital Twin for African Agriculture
          </p>
        </div>

        {/* Color Palette Section */}
        <div className="card-demeter p-8 mb-8">
          <h2 className="font-display text-2xl font-semibold text-[var(--color-soil)] mb-6">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-[var(--color-primary)]"></div>
              <p className="text-sm font-mono text-[var(--color-bark)]">Terracotta</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-[var(--color-gold)]"></div>
              <p className="text-sm font-mono text-[var(--color-bark)]">Savanna Gold</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-[var(--color-leaf)]"></div>
              <p className="text-sm font-mono text-[var(--color-bark)]">Deep Leaf</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-[var(--color-soil)]"></div>
              <p className="text-sm font-mono text-[var(--color-bark)]">Deep Soil</p>
            </div>
          </div>
        </div>

        {/* Risk Status Section */}
        <div className="card-demeter p-8 mb-8">
          <h2 className="font-display text-2xl font-semibold text-[var(--color-soil)] mb-6">
            Risk Status Colors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <div className="h-16 rounded-lg bg-critical"></div>
              <p className="text-sm font-mono text-critical">Critical</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-lg bg-severe"></div>
              <p className="text-sm font-mono text-severe">Severe</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-lg bg-moderate"></div>
              <p className="text-sm font-mono text-moderate">Moderate</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-lg bg-low"></div>
              <p className="text-sm font-mono text-low">Low Risk</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-lg bg-healthy"></div>
              <p className="text-sm font-mono text-healthy">Healthy</p>
            </div>
          </div>
        </div>

        {/* Typography Section */}
        <div className="card-demeter p-8 mb-8">
          <h2 className="font-display text-2xl font-semibold text-[var(--color-soil)] mb-6">
            Typography
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[var(--color-bark)] mb-1">Display Font (DM Sans)</p>
              <p className="font-display text-3xl text-[var(--color-soil)]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-bark)] mb-1">Body Font (Inter)</p>
              <p className="text-base text-[var(--color-soil)]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-bark)] mb-1">Monospace Font (JetBrains Mono)</p>
              <p className="font-mono text-base text-[var(--color-soil)]">
                const farm = &#123; id: 1, name: &quot;Amina&apos;s Farm&quot; &#125;;
              </p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="text-center">
          <p className="text-sm text-[var(--color-bark)]">
            ✓ Design tokens initialized | Task 2/18 complete
          </p>
        </div>
      </div>
    </div>
  );
}
