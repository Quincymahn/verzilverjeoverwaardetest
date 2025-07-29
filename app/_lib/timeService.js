// File: app/_lib/timeService.js

/**
 * Fetches the time of the last entry from the custom API endpoint.
 * @returns {Promise<string|null>} A promise that resolves to the time string (HH:MM) or null.
 * @throws {Error} If the fetch request fails or the API returns an error.
 */
export async function getLastEntryTime() {
  try {
    const response = await fetch("/api/latest-entry-time"); // Calls your Next.js API route

    if (!response.ok) {
      // Try to parse error details from the response, otherwise use a generic message
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // If response is not JSON or another error occurs during parsing
        console.warn("Could not parse error response as JSON.", e);
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.time; // This will be the "HH:MM" string or null
  } catch (error) {
    console.error(
      "Failed to get last entry time (from timeService):",
      error.message
    );
    // Re-throw the original error or a new one with more context if needed
    // For example, you might want to ensure it's always an Error instance
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      "An unexpected error occurred while fetching the last entry time."
    );
  }
}
