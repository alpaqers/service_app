import Header from "./Header";
import Footer from "./Footer";

export function Layout({ children }) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
  
        <main className="mx-auto w-screen px-4 py-8">
          {children}
        </main>
        <Footer />
      </div>
    );
  }
  