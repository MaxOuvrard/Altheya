export default function Home() {
  return (
    <main
      className="flex flex-1 min-h-screen flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#f1f0ec" }}
    >
      <div className="flex flex-col items-center gap-8 text-center max-w-lg">

        {/* Logo / Nom */}
        <div className="flex flex-col items-center gap-3">
          <h1
            className="text-6xl uppercase"
            style={{
              fontFamily: "Graphie",
              fontWeight: 700,
              color: "#29292e",
              letterSpacing: "0.3em",
            }}
          >
            Altheya
          </h1>
          <p
            className="text-xs uppercase"
            style={{
              fontFamily: "Graphie",
              fontWeight: 400,
              color: "#b5a09d",
              letterSpacing: "0.25em",
            }}
          >
            tatouage thérapeutique
          </p>
          <div
            className="w-16 h-px mt-2"
            style={{ backgroundColor: "#b5a09d" }}
          />
        </div>

        {/* Message */}
        <div className="flex flex-col items-center gap-4">
          <p
            className="text-sm uppercase tracking-[0.2em]"
            style={{
              fontFamily: "Graphie",
              fontWeight: 400,
              color: "#b5a09d",
            }}
          >
            Site en développement
          </p>
          <p
            className="text-base leading-relaxed"
            style={{
              fontFamily: "Graphie",
              fontWeight: 400,
              color: "#29292e",
              opacity: 0.6,
            }}
          >
            Quelque chose de beau est en cours de création.
            <br />
            Revenez bientôt.
          </p>
        </div>

      </div>
    </main>
  );
}
