export default function truncateDescription(description, maxLength) {
  if (description.length <= maxLength) {
    return description;
  }

  const words = description.split(' ');
  let truncatedText = '';

  for (const word of words) {
    if ((truncatedText + word).length <= maxLength) {
      truncatedText += (truncatedText ? ' ' : '') + word;
    } else {
      break;
    }
  }

  return truncatedText + (truncatedText.length < description.length ? '...' : '');
}
