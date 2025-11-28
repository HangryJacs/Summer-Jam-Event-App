/**
 * Formats a number with commas for display
 */
export const formatEntries = (entries: number): string => {
  return new Intl.NumberFormat('en-US').format(entries);
};

/**
 * Saves data to local storage and dispatches a storage event
 */
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    // Dispatch event to allow cross-component updates
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error saving to local storage', error);
  }
};

/**
 * Retrieves typed data from local storage
 */
export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from local storage', error);
    return null;
  }
};

/**
 * Generates a random pass ID for the user
 */
export const generatePassID = (): string => {
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `SJ26-${randomPart}`;
};

/**
 * Formats a date string to Australian format
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-AU', options);
};

/**
 * Triggers haptic feedback if available on device
 */
export const triggerVibration = (pattern: number | number[] = 10) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};
