export async function apiGet(path) {
    const res = await fetch(`/api${path}`);
  
    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }
  
    return res.json();
  }
  