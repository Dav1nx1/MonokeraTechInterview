export function Header() {
  return (
    <header className="px-2 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">Monokera</h1>
      </div>
      <div className="text-sm hidden md:flex">Public Technical Interview</div>
    </header>
  );
}
