import { PageShell, PageHeader } from "@/components/layout";

export default function DashboardPage() {
  return (
    <PageShell>
      <PageHeader
        title="Farm Dashboard"
        description="Monitor weather conditions and get recommendations for your farm."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">
            Set up your farm profile to get started.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
