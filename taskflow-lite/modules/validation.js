const MIN_LENGTH = 1;
const MAX_LENGTH = 120;

export function validateTaskInput(text) {
  const trimmed = text.trim();

  if (trimmed.length < MIN_LENGTH) {
    return { valid: false, message: "Task cannot be empty." };
  }

  if (trimmed.length > MAX_LENGTH) {
    return {
      valid: false,
      message: `Task must be ${MAX_LENGTH} characters or less.`,
    };
  }

  return { valid: true, value: trimmed };
}

export function getCharCount(text) {
  return `${text.length}/${MAX_LENGTH}`;
}

export function isNearLimit(text) {
  return text.length >= MAX_LENGTH - 10;
}
