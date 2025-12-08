export function formatMovingTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  if (h > 0) {
    // hh:mm:ss
    return `${h}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`
  } else if (m > 0) {
    // m:ss
    return `${m}m ${s.toString().padStart(2, "0")}s`
  } else {
    // just seconds
    return `${s}s`
  }
}

export function formatPace(avgSpeed: number): string {
  if (!avgSpeed || avgSpeed <= 0) return "-"

  // seconds per km
  const secPerKm = 1000 / avgSpeed

  const minutes = Math.floor(secPerKm / 60)
  const seconds = Math.round(secPerKm % 60)

  return `${minutes}:${seconds.toString().padStart(2, "0")} /km`
}

export function formatDistance(distance: number): string {
    return `${(distance/1000).toFixed(2)}`
}

export function formatRideSpeed(avgSpeed: number): string {
  if (!avgSpeed || avgSpeed <= 0) return "-"

  // Converting m/s into KM/h
  const rideSpeed = avgSpeed * 3.6;

  return `${rideSpeed.toFixed(1)} Km/h`
}