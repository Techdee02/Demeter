export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-[var(--color-soil)]" style={{ fontFamily: 'var(--font-display)' }}>
          Demeter
        </h1>
        <p className="text-lg text-[var(--color-bark)]">
          AI-Powered Digital Twin for African Agriculture
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]"></div>
          <div className="w-12 h-12 rounded-lg bg-[var(--color-gold)]"></div>
          <div className="w-12 h-12 rounded-lg bg-[var(--color-leaf)]"></div>
        </div>
        <p className="text-sm text-[var(--color-bark)] mt-4">
          Project initialized ✓
        </p>
      </div>
    </div>
  );
}
