export default function handler(req, res) {
  const now = new Date();

  console.log("VISIT:", {
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
  });

  res.status(200).json({ success: true });
}
