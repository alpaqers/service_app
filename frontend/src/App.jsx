import { useEffect, useState } from "react";
import { apiGet } from "./api/client";

export default function App() {
  const [status, setStatus] = useState("Ładowanie...");
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet("/klienci")
      .then((data) => setStatus(JSON.stringify(data)))
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold">Test API</h1>

      {error ? (
        <p className="mt-4 text-red-600">Błąd: {error}</p>
      ) : (
        <p className="mt-4">Odpowiedź z backendu: {status}</p>
      )}
    </div>
  );
}
