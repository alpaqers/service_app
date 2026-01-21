export function Layout({ children }) {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <div className="font-semibold">Serwis AGD/RTV</div>
  
            <nav className="flex gap-4 text-sm text-zinc-600">
              <a href="#" className="hover:text-zinc-900">Oferta</a>
              <a href="#" className="hover:text-zinc-900">Cennik</a>
              <a href="#" className="hover:text-zinc-900">Kontakt</a>
            </nav>
          </div>
        </header>
  
        <main className="mx-auto max-w-screen px-4 py-8">
          {children}
        </main>
      </div>
    );
  }
  