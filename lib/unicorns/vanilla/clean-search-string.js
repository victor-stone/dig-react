
export default function cleanSearchString(str) {
  return str && str
          .replace(/[^a-zA-Z0-9\s_()\*\.]/g,'')
          .replace(/\b(with|the|a|an|for|to|in|of|at)\b/g,' ')
          .trim();
}

