// src/api.js

export const fetchPolicyResult = async (userInput) => {
  // Simulate network delay for realistic testing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock response following your agreed API contract
  return {
    explanation: "Based on local scheme guidelines, you qualify for agricultural credit support.",
    confidence: "88%",
    color: "GREEN" // Try changing to "YELLOW" or "RED" to test UI styles!
  };
};