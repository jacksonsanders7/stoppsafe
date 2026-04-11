import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/results?q=${encodeURIComponent(query)}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>ShopSafe</h1>
      <p style={styles.tagline}>Shop with a purpose.</p>

      <input
        style={styles.input}
        placeholder="Enter a cause or preference..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button style={styles.button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "120px",
    fontFamily: "Arial",
  },
  logo: {
    fontSize: "48px",
    color: "#1e40af",
  },
  tagline: {
    marginBottom: "20px",
    color: "#444",
  },
  input: {
    padding: "10px",
    width: "300px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#1e40af",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
