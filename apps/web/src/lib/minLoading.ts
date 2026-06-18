const MIN_LOADING_MS = 400

export async function waitMinLoading(startTime: number): Promise<void> {
  const elapsed = Date.now() - startTime
  const remaining = MIN_LOADING_MS - elapsed
  if (remaining > 0) {
    await new Promise((resolve) => setTimeout(resolve, remaining))
  }
}
