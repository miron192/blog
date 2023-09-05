export function truncateTextTo130Words(text: string): string {
  // Split the input text into words
  const words = text.split(" ");

  // If the text has 130 words or less, return it as is
  if (words.length <= 130) {
    return text;
  }

  // Otherwise, truncate the text to 130 words and add "..."
  const truncatedWords = words.slice(0, 130);
  const truncatedText = truncatedWords.join(" ") + "...";

  return truncatedText;
}
