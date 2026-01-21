import Header from "./Header";

export function Layout({ children }) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
  
        <main className="mx-auto max-w-6xl px-4 py-8">
          {children}
        </main>
      </div>
    );
  }
  