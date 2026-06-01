import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://api-tp2-frontend-production.up.railway.app/api";

function Stars({ rating }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{
            color: s <= Math.round(rating) ? "#e8c84a" : "#333",
            fontSize: "14px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function GameCard({ juego }) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={`/juegos/${juego.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textDecoration: "none",
        color: "white",
        borderRadius: "6px",
        overflow: "hidden",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        transform: hover ? "scale(1.05)" : "scale(1)",
        boxShadow: hover
          ? "0 10px 30px rgba(0,0,0,0.7)"
          : "0 4px 10px rgba(0,0,0,0.4)",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={juego.cover || juego.image}
          alt={juego.name}
          style={{
            width: "100%",
            height: "260px",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.currentTarget.src = juego.image;
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
            opacity: hover ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            right: "10px",
            opacity: hover ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "14px" }}>
            {juego.name}
          </h3>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Stars rating={juego.rating} />
            <span>{juego.rating.toFixed(1)}</span>
          </div>

          <p style={{ fontSize: "11px", color: "#aaa" }}>
            {juego.released}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function GameGrid() {
  const [juegos, setJuegos] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Cargar juegos
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.append("search", query);
        params.append("page", page.toString());

        const res = await axios.get(`${API_URL}/games?${params}`);
        setJuegos(res.data.results);
      } catch (error) {
        console.error("Error cargando juegos:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchGames, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, page]);

  // Escuchar búsqueda desde navbar
  useEffect(() => {
    const handler = (e) => {
      setQuery(e.detail.toLowerCase());
      setPage(1);
    };
    window.addEventListener("checkpoint-search", handler);
    return () => window.removeEventListener("checkpoint-search", handler);
  }, []);

  return (
    <div
      style={{
        background: "#0d1117",
        minHeight: "100vh",
        padding: "40px",
        paddingTop: "100px",
      }}
    >
      {loading && <p style={{ textAlign: "center", color: "#999" }}>Cargando...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        {juegos.map((j) => (
          <GameCard key={j.id} juego={j} />
        ))}
      </div>

      {/* Paginación */}
      <div style={{ textAlign: "center", marginTop: "40px", display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          style={{ padding: "8px 16px", cursor: page === 1 ? "not-allowed" : "pointer" }}
        >
          ← Anterior
        </button>
        <span style={{ padding: "8px 16px" }}>Página {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}