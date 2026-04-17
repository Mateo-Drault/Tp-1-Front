import { useState } from "react";

const juegos = [
  {
    id: "the-last-of-us-2",
    nombre: "The Last of Us Part II",
    año: 2020,
    dev: "Naughty Dog",
    rating: 4.1,
    imagen: "/Portada_Parte_II_limpia.webp",
  },
  {
    id: "ghost-of-tsushima",
    nombre: "Ghost of Tsushima",
    año: 2020,
    dev: "Sucker Punch",
    rating: 4.2,
    imagen: "/Ghost.jpeg",
  },
  {
    id: "cyberpunk-2077",
    nombre: "Cyberpunk 2077",
    año: 2020,
    dev: "CD Projekt Red",
    rating: 3.9,
    imagen: "/Punk.jpg",
  },
  {
    id: "final-fantasy-7",
    nombre: "Final Fantasy VII Remake",
    año: 2020,
    dev: "Square Enix",
    rating: 4.0,
    imagen: "/Final.webp",
  },
   { id: "kerbal", nombre: "Kerbal Space Program", imagen: "/kerbal.avif", rating: 4.2 },
  { id: "rdr2", nombre: "Red Dead Redemption 2", imagen: "/reddead.avif", rating: 4.8 },
  { id: "hollow-knight", nombre: "Hollow Knight", imagen: "/hollow.jpg", rating: 4.7 },
  { id: "silksong", nombre: "Silksong", imagen: "/silk.jpg", rating: 4.5 },
  { id: "stardew", nombre: "Stardew Valley", imagen: "/stardew.png", rating: 4.6 },
  { id: "isaac", nombre: "The Binding of Isaac", imagen: "/isaac.jpg", rating: 4.5 },
  { id: "balatro", nombre: "Balatro", imagen: "/bala.jpg", rating: 4.4 },
  { id: "gow", nombre: "God of War (2018)", imagen: "/god.avif", rating: 4.8 },
  { id: "witcher3", nombre: "The Witcher 3", imagen: "/witcher.jpg", rating: 4.9 },
  { id: "sekiro", nombre: "Sekiro", imagen: "/sekiro.jpg", rating: 4.7 },
  { id: "ds3", nombre: "Dark Souls 3", imagen: "/dark.webp", rating: 4.6 },
  { id: "elden", nombre: "Elden Ring", imagen: "/elden.avif", rating: 4.9 },
  { id: "re4", nombre: "Resident Evil 4 Remake", imagen: "/re4.jpg", rating: 4.7 },
  { id: "skyrim", nombre: "Skyrim", imagen: "/skyrim.png", rating: 4.6 },
  { id: "cuphead", nombre: "Cuphead", imagen: "/cuphead.jpg", rating: 4.5 },
  { id: "slay", nombre: "Slay the Spire", imagen: "/slay.avif", rating: 4.6 },
  { id: "gungeon", nombre: "Enter the Gungeon", imagen: "/enter.jpg", rating: 4.4 },
  { id: "celeste", nombre: "Celeste", imagen: "/celeste.avif", rating: 4.8 },
  { id: "stanley", nombre: "The Stanley Parable", imagen: "/stanley.jpg", rating: 4.5 },
  { id: "deep-rock", nombre: "Deep Rock Galactic", imagen: "/deep.webp", rating: 4.6 },
  { id: "darkest", nombre: "Darkest Dungeon", imagen: "/dark.jpg", rating: 4.4 },
  { id: "doom", nombre: "DOOM Eternal", imagen: "/doom.avif", rating: 4.7 },
  { id: "fortnite", nombre: "Fortnite", imagen: "/fortnite.jpg", rating: 3.8 },
  { id: "slime", nombre: "Slime Rancher", imagen: "/slime.png", rating: 4.3 },
  { id: "subnautica", nombre: "Subnautica", imagen: "/subnautica.webp", rating: 4.7 },
  { id: "brotato", nombre: "Brotato", imagen: "/brotato.jpg", rating: 4.2 },
  { id: "minecraft", nombre: "Minecraft", imagen: "/minecraft.jpg", rating: 5.0 },
  { id: "roblox", nombre: "Roblox", imagen: "/roblox.jpg", rating: 3.5 },
  { id: "disco", nombre: "Disco Elysium", imagen: "/disco.webp", rating: 4.9 },
  { id: "hotline", nombre: "Hotline Miami", imagen: "/hotline.jpg", rating: 4.6 },
  { id: "jumpking", nombre: "Jump King", imagen: "/jump.webp", rating: 4.0 },
  { id: "baldurs", nombre: "Baldur's Gate 3", imagen: "/baldur.jpeg", rating: 5.0 },
  { id: "ittakestwo", nombre: "It Takes Two", imagen: "/ittakes.webp", rating: 4.6 },
  { id: "overwatch2", nombre: "Overwatch 2", imagen: "/ow2.jpg", rating: 3.7 },
  { id: "zelda", nombre: "Zelda: Breath of the Wild", imagen: "/botw.jpg", rating: 4.9 },
  { id: "astrobot", nombre: "Astro Bot", imagen: "/astro.avif", rating: 4.5 }
  
];

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
          src={juego.imagen}
          alt={juego.nombre}
          style={{
            width: "100%",
            height: "260px",
            objectFit: "cover",
          }}
        />

        {/* overlay */}
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

        {/* info */}
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
            {juego.nombre}
          </h3>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Stars rating={juego.rating} />
            <span>{juego.rating.toFixed(1)}</span>
          </div>

          <p style={{ fontSize: "11px", color: "#aaa" }}>
            {juego.dev} · {juego.año}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function GameGrid() {
  return (
    <div
     style={{
      background: "#0d1117",
      minHeight: "100vh",
      padding: "40px",
      paddingTop: "100px"
    }}
    >
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
    </div>
  );
}