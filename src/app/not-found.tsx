import Link from "next/link";
import { CloudOff } from "lucide-react";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-sm">
          <div className="flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <CloudOff className="size-8 text-muted-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Page not found
          </h1>
          <p className="text-sm text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button render={<Link href="/" />}>Go home</Button>
            <Button variant="outline" render={<Link href="/dashboard" />}>
              Dashboard
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
