import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] p-8">
      <div className="container-demeter">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl font-bold text-[var(--color-soil)] mb-3">
            Demeter UI Components
          </h1>
          <p className="text-lg text-[var(--color-bark)]">
            Core component library for the Digital Twin platform
          </p>
        </div>

        {/* Button Variants */}
        <Card className="mb-8" padding="lg">
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Button variants and sizes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-[var(--color-bark)] mb-3">Variants</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="success">Success</Button>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-bark)] mb-3">Sizes</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">🌾</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Variants */}
        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold text-[var(--color-soil)] mb-4">
            Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Standard card with border and shadow</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Card with larger shadow</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="outline">
              <CardHeader>
                <CardTitle>Outline Card</CardTitle>
                <CardDescription>Card with border only</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Input Fields */}
        <Card className="mb-8" padding="lg">
          <CardHeader>
            <CardTitle>Input Fields</CardTitle>
            <CardDescription>Text inputs with validation states</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-w-md">
              <Input placeholder="Default input" />
              <Input variant="error" placeholder="Error state input" />
              <Input variant="success" placeholder="Success state input" />
              <Input inputSize="sm" placeholder="Small input" />
              <Input inputSize="lg" placeholder="Large input" />
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="mb-8" padding="lg">
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Status badges and labels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-[var(--color-bark)] mb-3">Risk Status Badges</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="critical">Critical</Badge>
                  <Badge variant="severe">Severe</Badge>
                  <Badge variant="moderate">Moderate</Badge>
                  <Badge variant="low">Low Risk</Badge>
                  <Badge variant="healthy">Healthy</Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-bark)] mb-3">Standard Badges</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-bark)] mb-3">Sizes</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <div className="text-center">
          <Badge variant="healthy" size="lg">
            ✓ Core UI Components Complete | Task 3/18
          </Badge>
        </div>
      </div>
    </div>
  );
}
