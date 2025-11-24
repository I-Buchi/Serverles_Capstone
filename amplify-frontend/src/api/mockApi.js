export async function getStats() {
  await new Promise((r) => setTimeout(r, 300));
  return { activePatients: 128, recentTranscriptions: 24, pendingReviews: 7 };
}

export async function getActivityChart() {
  await new Promise((r) => setTimeout(r, 300));
  return [
    { date: "2025-09-01", transcriptions: 5 },
    { date: "2025-09-05", transcriptions: 12 },
    { date: "2025-09-10", transcriptions: 7 },
    { date: "2025-09-15", transcriptions: 20 },
    { date: "2025-09-20", transcriptions: 15 },
    { date: "2025-09-25", transcriptions: 22 },
    { date: "2025-09-30", transcriptions: 18 },
  ];
}
