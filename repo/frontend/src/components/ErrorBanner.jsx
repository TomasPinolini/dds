export default function ErrorBanner({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        marginTop: 12,
        padding: 10,
        border: "1px solid #f3b4b4",
        background: "#fff5f5",
        color: "#8a1f1f",
      }}
    >
      {message}
    </div>
  );
}
