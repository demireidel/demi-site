export function Footer() {
  return (
    <footer className="border-t border-rule py-8 px-6">
      <div className="mx-auto max-w-[1200px] flex items-center justify-between max-md:flex-col max-md:gap-2">
        <p className="font-sans text-xs text-muted">
          &copy; {new Date().getFullYear()} Demian Reidel
        </p>
        <p className="font-sans text-xs text-muted/50">
          Buenos Aires &middot; New York
        </p>
      </div>
    </footer>
  );
}
