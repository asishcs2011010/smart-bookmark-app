// Validate URL format
export const validateUrlFormat = (inputUrl: string): { isValid: boolean; correctedUrl: string; error: string } => {
  if (!inputUrl.trim()) {
    return { isValid: false, correctedUrl: "", error: "URL is required" }
  }

  let urlToValidate = inputUrl.trim()

  // Auto-add https:// if no protocol
  if (!urlToValidate.startsWith('http://') && !urlToValidate.startsWith('https://')) {
    urlToValidate = 'https://' + urlToValidate
  }

  // Check if it's a valid URL format
  try {
    const urlObj = new URL(urlToValidate)
    
    // Must have a valid protocol
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, correctedUrl: "", error: "URL must use http:// or https://" }
    }

    // Must have a hostname
    if (!urlObj.hostname || urlObj.hostname === '') {
      return { isValid: false, correctedUrl: "", error: "Invalid URL format" }
    }

    // Check for valid domain format (at least one dot or localhost)
    if (!urlObj.hostname.includes('.') && urlObj.hostname !== 'localhost') {
      return { isValid: false, correctedUrl: "", error: "Invalid domain name. Example: google.com" }
    }

    return { isValid: true, correctedUrl: urlToValidate, error: "" }
  } catch (e) {
    return { isValid: false, correctedUrl: "", error: "Invalid URL format. Example: google.com or https://google.com" }
  }
}