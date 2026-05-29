import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export default function Reviews({ gameId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("checkpoint_token");
    setIsLoggedIn(!!token);
    fetchReviews();
  }, [gameId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/reviews/${gameId}`);
      setReviews(res.data);
    } catch (err) {
      setError("Error cargando reseñas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("checkpoint_token");

    if (!token) {
      setError("Debes iniciar sesión");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/reviews`,
        {
          game_id: gameId,
          rating: newReview.rating,
          comment: newReview.comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNewReview({ rating: 5, comment: "" });
      await fetchReviews();
    } catch (err) {
      setError(err.response?.data?.error || "Error al crear reseña");
    }
  };

  if (loading) return <p>Cargando reseñas...</p>;

  return (
    <div style={{ marginTop: "40px", maxWidth: "600px" }}>
      <h2>Reseñas</h2>

      {error && <p style={{ color: "#e74c3c" }}>{error}</p>}

      {isLoggedIn && (
        <form onSubmit={submitReview} style={{ marginBottom: "30px", padding: "20px", background: "#161b22", borderRadius: "8px" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Puntuación:
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: Number(e.target.value) })
              }
              style={{ marginLeft: "10px", padding: "5px" }}
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} ⭐
                </option>
              ))}
            </select>
          </label>

          <textarea
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            placeholder="Escribe tu reseña..."
            style={{
              width: "100%",
              height: "100px",
              padding: "10px",
              marginBottom: "10px",
              background: "#0d1117",
              color: "#cdd9e5",
              border: "1px solid #333",
              borderRadius: "4px",
            }}
          />

          <button
            type="submit"
            style={{
              background: "#e8c84a",
              color: "#000",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Publicar reseña
          </button>
        </form>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {reviews.map((review) => (
          <div
            key={review.id}
            style={{
              background: "#161b22",
              padding: "15px",
              borderRadius: "6px",
              borderLeft: "3px solid #e8c84a",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontWeight: "600" }}>{review.user_id}</span>
              <span>{"⭐".repeat(review.rating)}</span>
            </div>
            <p style={{ color: "#aaa", fontSize: "14px" }}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}