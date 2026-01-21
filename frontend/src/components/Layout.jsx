import Header from "./Header";
import Footer from "./Footer";

export function Layout({ children }) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
  
        <main className="w-full">
          {children}
        </main>
        <Footer />
      </div>
    );
  }
  