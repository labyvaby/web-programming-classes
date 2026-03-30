export default function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        <div className="absolute inset-0 w-12 h-12 rounded-full blur-md bg-primary/20 animate-pulse" />
      </div>
    </div>
  );
}
