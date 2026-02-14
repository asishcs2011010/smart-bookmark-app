import { validateUrlFormat } from '../validation'

describe('URL Validation Tests', () => {
  
  describe('✅ Valid URLs - Should Pass', () => {
    
    test('auto-adds https:// to google.com', () => {
      const result = validateUrlFormat('google.com')
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('https://google.com')
      expect(result.error).toBe('')
    })

    test('auto-adds https:// to www.github.com', () => {
      const result = validateUrlFormat('www.github.com')
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('https://www.github.com')
      expect(result.error).toBe('')
    })

    test('accepts already valid https:// URL', () => {
      const result = validateUrlFormat('https://youtube.com')
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('https://youtube.com')
      expect(result.error).toBe('')
    })

    test('accepts http:// URL', () => {
      const result = validateUrlFormat('http://example.com')
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('http://example.com')
      expect(result.error).toBe('')
    })

    test('handles URLs with paths', () => {
      const result = validateUrlFormat('reddit.com/r/programming')
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('https://reddit.com/r/programming')
      expect(result.error).toBe('')
    })

    test('handles URLs with query parameters', () => {
      const result = validateUrlFormat('google.com/search?q=test')
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('https://google.com/search?q=test')
      expect(result.error).toBe('')
    })

    test('handles subdomains', () => {
      const result = validateUrlFormat('docs.google.com')
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('https://docs.google.com')
      expect(result.error).toBe('')
    })

    test('handles different TLDs (.in, .co.uk, etc)', () => {
      const result = validateUrlFormat('amazon.in')
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('https://amazon.in')
      expect(result.error).toBe('')
    })

    test('handles complex paths', () => {
      const result = validateUrlFormat('stackoverflow.com/questions/123/how-to-code')
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('https://stackoverflow.com/questions/123/how-to-code')
      expect(result.error).toBe('')
    })

    test('accepts localhost as special case', () => {
      const result = validateUrlFormat('localhost')
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('https://localhost')
      expect(result.error).toBe('')
    })

    test('handles ports in URL', () => {
      const result = validateUrlFormat('example.com:8080')
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('https://example.com:8080')
      expect(result.error).toBe('')
    })

    test('handles URL with hash/fragment', () => {
      const result = validateUrlFormat('github.com/user/repo#readme')
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('https://github.com/user/repo#readme')
      expect(result.error).toBe('')
    })
  })

  describe('❌ Invalid URLs - Should Fail', () => {
    
    test('rejects domain without TLD (justtext)', () => {
      const result = validateUrlFormat('justtext')
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('Invalid domain')
      expect(result.correctedUrl).toBe('')
    })

    test('rejects URL with spaces', () => {
      const result = validateUrlFormat('hello world')
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('Invalid URL format')
      expect(result.correctedUrl).toBe('')
    })

    test('rejects empty string', () => {
      const result = validateUrlFormat('')
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('URL is required')
      expect(result.correctedUrl).toBe('')
    })

    test('rejects whitespace only', () => {
      const result = validateUrlFormat('   ')
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('URL is required')
      expect(result.correctedUrl).toBe('')
    })

    test('rejects invalid protocol (ftp://)', () => {
      const result = validateUrlFormat('ftp://files.com')
      expect(result.isValid).toBe(false)
      // Since we auto-add https://, ftp:// becomes https://ftp://files.com which is invalid
      expect(result.error).toContain('Invalid')
      expect(result.correctedUrl).toBe('')
    })

    test('rejects malformed protocol', () => {
      const result = validateUrlFormat('htp://wrong.com')
      expect(result.isValid).toBe(false)
      // Since we auto-add https://, htp:// becomes https://htp://wrong.com which is invalid
      expect(result.error).toContain('Invalid')
      expect(result.correctedUrl).toBe('')
    })

    test('rejects single word without domain', () => {
      const result = validateUrlFormat('google')
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('Invalid domain')
      expect(result.correctedUrl).toBe('')
    })

    test('rejects special characters only', () => {
      const result = validateUrlFormat('!@#$%')
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('Invalid URL format')
      expect(result.correctedUrl).toBe('')
    })
  })

  describe('🔧 Edge Cases', () => {
    
    test('trims whitespace from input', () => {
      const result = validateUrlFormat('  google.com  ')
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('https://google.com')
    })

    test('handles URL with username and password', () => {
      const result = validateUrlFormat('https://user:pass@example.com')
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('https://user:pass@example.com')
    })

    test('handles international domains', () => {
      const result = validateUrlFormat('münchen.de')
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('https://münchen.de')
    })

    test('handles very long URLs', () => {
      const longUrl = 'example.com/' + 'a'.repeat(1000)
      const result = validateUrlFormat(longUrl)
      expect(result.isValid).toBe(true)
      expect(result.correctedUrl).toBe('https://' + longUrl)
    })
  })
})