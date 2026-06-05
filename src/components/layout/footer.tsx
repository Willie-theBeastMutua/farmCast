export function Footer() {
  return (
    <footer className="border-t border-border bg-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-xs text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} FarmCast. Weather data for smarter farming.
        </p>
      </div>
    </footer>
  );
}
