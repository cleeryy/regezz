import type { Lesson } from '@/types/lesson'

export const advancedLessons2: Lesson[] = [
  {
    id: '16',
    slug: 'email-validation-deep',
    title: 'Email Validation (Deep Dive)',
    description: 'Master email validation with practical patterns. Understand what makes a valid email and what to validate.',
    tier: 'advanced',
    order: 16,
    prerequisites: ['10', '13'],
    content: [
      {
        type: 'text',
        content: 'Email validation is deceptively complex. You could spend days building the "perfect" validator, but practical patterns balance simplicity with correctness.'
      },
      {
        type: 'example',
        content: 'Simple email pattern',
        code: '\\w+@\\w+\\.\\w+',
        explanation: 'Basic pattern: word characters, @, word characters, dot, word characters. Matches "test@example.com" but also misses valid emails like "user+tag@sub.domain.co.uk".'
      },
      {
        type: 'text',
        content: 'A more practical approach: validate structure without being overly strict. Let the email service handle actual delivery validation.'
      },
      {
        type: 'example',
        content: 'Practical email pattern',
        code: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        explanation: 'Allows common characters in local part (letters, digits, dots, underscores, %, +, -), requires @, domain with dot, and TLD of at least 2 letters.'
      },
      {
        type: 'text',
        content: 'Key insight: The local part (before @) can contain + for tagging, dots, and even quotes in some systems. The domain can have multiple subdomains.'
      },
      {
        type: 'example',
        content: 'Handling subdomains',
        code: '^[\\w.+-]+@[\\w-]+(\\.[\\w-]+)+$',
        explanation: 'Allows multiple subdomains like "user@mail.server.company.co.uk". The pattern (\\.[\\w-]+)+ matches one or more domain segments.'
      },
      {
        type: 'text',
        content: 'Pro tip: Never try to validate the full RFC 5322 spec with regex. It\'s a maintenance nightmare. Use a simpler pattern and send a verification email.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• User registration forms: Validate email format before sending verification\n• Contact forms: Prevent malformed emails from reaching your inbox\n• Data import/ETL: Clean customer data by filtering invalid emails\n• Mailing list signups: Ensure deliverability by catching typos early\n• API endpoints: Validate email parameters before processing\n• Account recovery: Verify email format before sending reset links'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 13**: Email validation combines alternation (Lesson 13) for matching multiple TLD patterns with grouping (Lesson 10) for structure. The pattern `^[\\w.+-]+@[\\w-]+(\\.[\\w-]+)+$` uses alternation implicitly through character classes and grouping for the domain segments. This practical application shows how multiple regex features work together to solve real validation problems.'
      }
    ],
    exercise: {
      id: 'ex-16',
      instruction: 'Write a pattern that validates basic email structure: local part with letters/digits/dots/plus/hyphen, @, domain with at least one dot and 2+ letter TLD. Must match entire string.',
      pattern: '^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$',
      testCases: [
        { input: 'test@example.com', shouldMatch: true, explanation: 'Basic valid email' },
        { input: 'user.name@domain.org', shouldMatch: true, explanation: 'Dots in local part are valid' },
        { input: 'user+tag@example.com', shouldMatch: true, explanation: 'Plus sign for email tagging' },
        { input: 'user@mail.server.co.uk', shouldMatch: false, explanation: 'Pattern does not support multiple dots in domain (simplified email validation)' },
        { input: 'invalid-email', shouldMatch: false, explanation: 'Missing @ and domain' },
        { input: '@example.com', shouldMatch: false, explanation: 'Missing local part' },
        { input: 'user@', shouldMatch: false, explanation: 'Missing domain' },
        { input: 'user@domain', shouldMatch: false, explanation: 'Missing TLD (no dot)' },
        { input: 'user@domain.c', shouldMatch: false, explanation: 'TLD too short (needs 2+ chars)' },
        { input: 'user name@example.com', shouldMatch: false, explanation: 'Spaces not allowed' },
        { input: 'USER@EXAMPLE.COM', shouldMatch: true, explanation: 'Uppercase letters are valid' },
        { input: 'user@my-domain.com', shouldMatch: true, explanation: 'Hyphens in domain are valid' },
        { input: 'user123@domain456.com', shouldMatch: true, explanation: 'Numbers in both local and domain' }
      ],
      hints: [
        'Start with ^ and end with $ to match entire string',
        'Local part: [\\w.+-]+ allows letters, digits, underscores, dots, plus, hyphen',
        'Domain needs: @, domain name, dot, TLD of 2+ letters',
        'Don\'t forget: the domain part is [\\w-]+\\.[a-zA-Z]{2,}'
      ]
    },
    estimatedMinutes: 25,
    topics: ['email validation', 'practical patterns', 'input validation', 'TLD matching']
  },
  {
    id: '17',
    slug: 'url-parsing',
    title: 'URL Parsing & Extraction',
    description: 'Extract components from URLs: protocol, domain, path, query parameters. Real-world data extraction.',
    tier: 'advanced',
    order: 17,
    prerequisites: ['10', '11', '13'],
    content: [
      {
        type: 'text',
        content: 'URLs are structured data. With regex, you can extract specific parts like domain, path, or query parameters.'
      },
      {
        type: 'example',
        content: 'Basic URL structure',
        code: '^(https?):\\/\\/([^\\/]+)(\\/.*)?$',
        explanation: 'Group 1: protocol (http or https), Group 2: domain, Group 3: optional path. Matches "https://example.com/path" or just "https://example.com".'
      },
      {
        type: 'text',
        content: 'Query strings are tricky. They use key=value pairs separated by &. You can extract specific parameters.'
      },
      {
        type: 'example',
        content: 'Extract query parameter value',
        code: '[?&]id=([^&]+)',
        explanation: 'Matches ?id=value or &id=value. Captures the value (everything until next & or end). Use this to extract "123" from "?id=123&name=test".'
      },
      {
        type: 'example',
        content: 'Full URL breakdown',
        code: '^(https?):\\/\\/([\\w.-]+)(?::(\\d+))?(\\/[\\w./-]*)?(?:\\?([^#]*))?(?:#(.*))?$',
        explanation: 'Captures: 1=protocol, 2=domain, 3=optional port, 4=optional path, 5=optional query, 6=optional fragment. This handles most URLs.'
      },
      {
        type: 'text',
        content: 'For production, prefer the URL API in browsers. But regex is useful when parsing logs, config files, or when URL API isn\'t available.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Link shorteners: Extract destination URLs from shortened links for analytics\n• Web scraping: Parse URLs from HTML href attributes to build sitemaps\n• Security filtering: Detect malicious URLs by extracting domains for blocklist checks\n• Analytics tracking: Parse UTM parameters from campaign URLs\n• API routing: Extract resource IDs from RESTful URL patterns\n• Log analysis: Parse referrer URLs from server logs to understand traffic sources'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 11**: URL parsing heavily uses non-capturing groups (Lesson 11) to make protocols optional like `(https?://)?` without creating unnecessary capture groups. The pattern also uses alternation (Lesson 13) for matching http/https and optional groups (Lesson 10) for path, query, and fragment components. This is a perfect example of multiple regex features combining to solve a practical data extraction problem.'
      }
    ],
    exercise: {
      id: 'ex-17',
      instruction: 'Write a pattern with capturing groups that extracts: protocol, domain, and path from a URL. Example: "https://example.com/docs/api" → protocol="https", domain="example.com", path="/docs/api"',
      pattern: '^(https?):\\/\\/([\\w.-]+)(\\/.*)?$',
      testCases: [
          { input: 'https://example.com', shouldMatch: true, explanation: 'Groups: https, example.com, undefined' },
          { input: 'http://test.org/path/to/resource', shouldMatch: true, explanation: 'Groups: http, test.org, /path/to/resource' },
          { input: 'https://sub.domain.co.uk/docs', shouldMatch: true, explanation: 'Groups: https, sub.domain.co.uk, /docs' },
          { input: 'ftp://files.example.com', shouldMatch: false, explanation: 'ftp protocol not matched by https? (only http or https)' },
          { input: 'example.com', shouldMatch: false, explanation: 'Missing protocol' },
          { input: 'https://', shouldMatch: false, explanation: 'Missing domain' },
          { input: 'https://domain', shouldMatch: true, explanation: 'Groups: https, domain, undefined (no path required)' },
           { input: 'http://localhost:3000', shouldMatch: false, explanation: 'Port not supported in simplified URL pattern' },
           { input: 'https://example.com/path?key=value', shouldMatch: true, explanation: 'Query string included in path group' },
           { input: 'https://example.com/path#section', shouldMatch: true, explanation: 'Fragment included in path group' },
           { input: 'HTTP://example.com', shouldMatch: false, explanation: 'Protocol is case-sensitive (only lowercase http/https)' }
         ],
      hints: [
        'Use ^ to anchor at start',
        'Protocol group: (https?) matches http or https',
        'Domain group: ([\\w.-]+) allows letters, digits, dots, hyphens',
        'Path group: (\\/.*)? is optional, starts with /'
      ]
    },
    estimatedMinutes: 25,
    topics: ['URL parsing', 'grouping', 'optional groups', 'data extraction']
  },
  {
    id: '18',
    slug: 'log-analysis',
    title: 'Log File Analysis',
    description: 'Parse structured logs like Apache/Nginx access logs. Extract IPs, timestamps, URLs, status codes.',
    tier: 'advanced',
    order: 18,
    prerequisites: ['10', '13'],
    content: [
      {
        type: 'text',
        content: 'Log files are treasure troves of data. Regex can extract specific fields for analysis: IP addresses, timestamps, request paths, status codes.'
      },
      {
        type: 'example',
        content: 'Common Log Format (Apache)',
        code: '^(\\S+) \\S+ \\S+ \\[([^\\]]+)\\] "(\\w+) ([^ ]+) [^"]+" (\\d+) (\\d+)$',
        explanation: 'Captures: 1=IP, 2=timestamp, 3=method, 4=path, 5=status, 6=size. Example line: "192.168.1.1 - - [10/Oct/2024:13:55:36 +0000] "GET /index.html HTTP/1.1" 200 2326"'
      },
      {
        type: 'text',
        content: 'Let\'s break this down: \\S+ matches non-whitespace (IP address), \\[ and \\] are literal brackets around timestamp, "[^"]+" matches quoted strings.'
      },
      {
        type: 'example',
        content: 'Extract all IPs from logs',
        code: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b',
        explanation: 'Matches IPv4 addresses. Each octet is 1-3 digits. \\b ensures word boundaries so "1234.1.1.1" doesn\'t partially match.'
      },
      {
        type: 'example',
        content: 'Find HTTP errors (4xx and 5xx)',
        code: '" (?:4\\d{2}|5\\d{2}) ',
        explanation: 'Matches status codes starting with 4 or 5. The space and quote ensure we\'re matching the status field, not part of a URL.'
      },
      {
        type: 'text',
        content: 'Tip: When analyzing logs, combine regex with tools like grep, awk, or write a script. Regex extracts, tools process.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Security monitoring: Extract suspicious IPs attempting brute force attacks\n• Performance analysis: Find slow requests by matching high response times in logs\n• Debugging: Track specific user requests through log trails using session IDs\n• Compliance auditing: Extract all access to sensitive resources for GDPR/HIPAA\n• Error tracking: Count frequency of specific error codes to identify systemic issues\n• Capacity planning: Parse request rates over time to scale infrastructure appropriately'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 17**: Log analysis extends the URL parsing skills from Lesson 17 by applying them to structured log formats. While Lesson 17 focused on extracting URL components, this lesson shows how to parse entire log lines with multiple fields using capturing groups. The IP address pattern uses non-capturing groups (Lesson 11) and word boundaries (Lesson 9), demonstrating how regex features combine in real-world data extraction scenarios.'
      }
    ],
    exercise: {
      id: 'ex-18',
      instruction: 'Write a pattern that matches IPv4 addresses in the format "xxx.xxx.xxx.xxx" where each octet is 1-3 digits. Use word boundaries to avoid partial matches.',
      pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b',
      testCases: [
        { input: '192.168.1.1', shouldMatch: true, explanation: 'Valid IP address' },
        { input: '10.0.0.255', shouldMatch: true, explanation: 'Valid IP with max octet' },
        { input: '0.0.0.0', shouldMatch: true, explanation: 'Valid minimal IP' },
        { input: '255.255.255.255', shouldMatch: true, explanation: 'Valid max IP' },
        { input: '1.2.3.4', shouldMatch: true, explanation: 'Valid IP with single digits' },
        { input: '1924.168.1.1', shouldMatch: false, explanation: 'Octet too long (1924), word boundary prevents partial match' },
        { input: '192.168.1', shouldMatch: false, explanation: 'Only 3 octets' },
        { input: '192.168.1.1.5', shouldMatch: true, explanation: 'Matches "192.168.1.1" as substring (valid IP within longer string)' },
        { input: 'abc.168.1.1', shouldMatch: false, explanation: 'Letters in IP' },
         { input: 'Error at 192.168.1.1 reported', shouldMatch: true, explanation: 'IP embedded in text' },
         { input: '001.002.003.004', shouldMatch: true, explanation: 'Leading zeros are allowed (pattern doesn\'t validate numeric range)' },
         { input: '256.100.100.100', shouldMatch: true, explanation: 'Matches pattern but invalid IP (octet >255) - shows pattern limitation' },
         { input: '192.168.1.256', shouldMatch: true, explanation: 'Last octet >255 still matches pattern' }
       ],
      hints: [
        'Use word boundaries \\b on both sides',
        'Each octet is \\d{1,3} (1-3 digits)',
        'Use (?:...){3} to repeat the pattern "octet." three times',
        'Final octet doesn\'t need the dot after it'
      ]
    },
    estimatedMinutes: 30,
    topics: ['log parsing', 'IP addresses', 'data extraction', 'word boundaries']
  },
  {
    id: '19',
    slug: 'data-cleaning',
    title: 'Data Cleaning & Normalization',
    description: 'Clean messy data: normalize whitespace, remove special characters, standardize formats.',
    tier: 'advanced',
    order: 19,
    prerequisites: ['7', '9'],
    content: [
      {
        type: 'text',
        content: 'Real-world data is messy. Regex helps clean and normalize: remove extra whitespace, strip unwanted characters, standardize phone numbers and dates.'
      },
      {
        type: 'example',
        content: 'Remove extra whitespace',
        code: '\\s+',
        explanation: 'Matches one or more whitespace characters. Replace with a single space to normalize. "hello    world" → "hello world".'
      },
      {
        type: 'example',
        content: 'Remove non-alphanumeric characters',
        code: '[^a-zA-Z0-9]',
        explanation: 'Matches anything that\'s not a letter or digit. Replace with empty string to clean. "Hello, World! 123" → "HelloWorld123".'
      },
      {
        type: 'example',
        content: 'Normalize phone numbers',
        code: '^(\\d{3})[\\s.-]?(\\d{3})[\\s.-]?(\\d{4})$',
        explanation: 'Matches various formats: "123-456-7890", "123.456.7890", "123 456 7890", "1234567890". Captures groups for consistent output.'
      },
      {
        type: 'text',
        content: 'For phone numbers, the key is making separators optional: [\\s.-]? matches space, dot, or hyphen, or nothing at all.'
      },
      {
        type: 'example',
        content: 'Normalize date formats',
        code: '^(\\d{4})[-/](\\d{2})[-/](\\d{2})$',
        explanation: 'Matches "2024-03-15" or "2024/03/15". Captures year, month, day separately for consistent output.'
      },
      {
        type: 'example',
        content: 'Clean leading/trailing whitespace',
        code: '^\\s+|\\s+$',
        explanation: 'Matches whitespace at start OR end. Replace with empty string. Equivalent to .trim() in most languages.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• ETL pipelines: Clean imported data from CSV/Excel before database insertion\n• User input sanitization: Remove special characters from search queries to prevent injection\n• Data migration: Standardize phone numbers and addresses across legacy systems\n• Report generation: Normalize whitespace in free-text fields for consistent display\n• API integration: Clean third-party data that doesn\'t match your schema\n• Search indexing: Strip punctuation and normalize case for better full-text search'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 7**: Data cleaning applies character class mastery from Lesson 7 to real-world sanitization tasks. While Lesson 7 introduced `[a-z]` and `[^0-9]`, this lesson shows how to combine them with anchors (Lesson 9) and quantifiers (Lesson 6) to create powerful cleaning patterns. The phone number normalization pattern `^\\d{3}[\\s.-]?\\d{3}[\\s.-]?\\d{4}$` demonstrates optional separators, a technique that builds on all previous grouping and alternation concepts.'
      }
    ],
    exercise: {
      id: 'ex-19',
      instruction: 'Write a pattern that matches phone numbers in various formats: "123-456-7890", "123.456.7890", "123 456 7890", or "1234567890". The separators (space, dot, hyphen) are optional.',
      pattern: '^\\d{3}[\\s.-]?\\d{3}[\\s.-]?\\d{4}$',
      testCases: [
        { input: '123-456-7890', shouldMatch: true, explanation: 'Hyphen separators' },
        { input: '123.456.7890', shouldMatch: true, explanation: 'Dot separators' },
        { input: '123 456 7890', shouldMatch: true, explanation: 'Space separators' },
        { input: '1234567890', shouldMatch: true, explanation: 'No separators' },
        { input: '123-456.7890', shouldMatch: true, explanation: 'Mixed separators (still valid)' },
        { input: '(123) 456-7890', shouldMatch: false, explanation: 'Parentheses not supported' },
        { input: '123-456-789', shouldMatch: false, explanation: 'Last part has only 3 digits' },
        { input: '12-456-7890', shouldMatch: false, explanation: 'First part has only 2 digits' },
        { input: '+1-123-456-7890', shouldMatch: false, explanation: 'Country code not included in pattern' },
         { input: '  123-456-7890  ', shouldMatch: false, explanation: 'Has leading/trailing spaces (anchored)' },
         { input: '123 4567890', shouldMatch: true, explanation: 'Matches with space after first 3 digits (6 digits together matches middle+last)' },
         { input: '123-456-7890-', shouldMatch: false, explanation: 'Extra separator at end' },
         { input: '1-123-456-7890', shouldMatch: false, explanation: 'First part must be exactly 3 digits' }
       ],
      hints: [
        'Use ^ and $ to match entire string',
        'First part: \\d{3} for area code',
        'Separator: [\\s.-]? (optional space, dot, or hyphen)',
        'Pattern: 3 digits, optional separator, 3 digits, optional separator, 4 digits'
      ]
    },
    estimatedMinutes: 25,
    topics: ['data cleaning', 'normalization', 'phone numbers', 'optional separators']
  },
  {
    id: '20',
    slug: 'password-strength',
    title: 'Password Strength Validation',
    description: 'Validate password complexity: length, character types, common patterns to avoid.',
    tier: 'advanced',
    order: 20,
    prerequisites: ['9', '14'],
    content: [
      {
        type: 'text',
        content: 'Password validation often requires multiple rules: minimum length, uppercase, lowercase, digit, special character. Use lookaheads to check all conditions.'
      },
      {
        type: 'example',
        content: 'Minimum 8 characters',
        code: '^.{8,}$',
        explanation: 'Simple length check. . matches any character, {8,} means 8 or more. The anchors ^ and $ ensure the entire password is counted.'
      },
      {
        type: 'example',
        content: 'At least one uppercase letter',
        code: '^(?=.*[A-Z]).{8,}$',
        explanation: '(?=.*[A-Z]) is a positive lookahead: asserts that somewhere ahead there\'s an uppercase letter, without consuming characters.'
      },
      {
        type: 'text',
        content: 'Lookaheads are perfect for "AND" conditions. Each lookahead checks a different requirement at the same position.'
      },
      {
        type: 'example',
        content: 'Full password rules',
        code: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
        explanation: 'Requires: lowercase, uppercase, digit, special character, minimum 8 chars, and only allowed characters.'
      },
      {
        type: 'text',
        content: 'Common password mistakes to detect: sequential characters (abc, 123), repeated characters (aaa), dictionary words. These can be flagged as weak.'
      },
      {
        type: 'example',
        content: 'Detect sequential characters',
        code: '(?:abc|bcd|cde|123|234|345)',
        explanation: 'Matches common sequences. Add more patterns as needed. This helps identify weak passwords even if they meet other criteria.'
      },
      {
        type: 'text',
        content: 'Important: Always validate passwords on the server side. Client-side validation is for UX, not security.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• User registration: Enforce organization password policies before account creation\n• Password reset: Validate new passwords meet complexity requirements\n• Enterprise SSO: Integrate with corporate password standards\n• Compliance: Meet regulatory requirements like PCI-DSS, NIST guidelines\n• Breach prevention: Block common weak patterns and compromised passwords\n• Self-service portals: Provide real-time feedback as users type their password'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 14**: Password validation is a perfect showcase for lookaheads from Lesson 14. The pattern `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$` uses multiple positive lookaheads to enforce AND conditions - requiring lowercase, uppercase, and digits simultaneously. This builds on Lesson 19\'s input validation concepts but uses advanced lookaround techniques to check multiple constraints at the same position without consuming characters.'
      }
    ],
    exercise: {
      id: 'ex-20',
      instruction: 'Write a pattern that validates passwords with: minimum 8 characters, at least one uppercase letter, at least one lowercase letter, at least one digit. Use lookaheads.',
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$',
      testCases: [
        { input: 'Password123', shouldMatch: true, explanation: 'Valid: 11 chars, upper, lower, digit' },
        { input: 'PASSW0RD', shouldMatch: false, explanation: 'No lowercase letter' },
        { input: 'password123', shouldMatch: false, explanation: 'No uppercase letter' },
        { input: 'Password', shouldMatch: false, explanation: 'No digit' },
        { input: 'Pass1', shouldMatch: false, explanation: 'Only 5 characters (too short)' },
        { input: 'PASSWORD123', shouldMatch: false, explanation: 'No lowercase' },
        { input: 'password', shouldMatch: false, explanation: 'No uppercase, no digit' },
        { input: 'Abc123', shouldMatch: false, explanation: 'Only 6 characters' },
        { input: 'MySecurePass9', shouldMatch: true, explanation: 'Valid: 13 chars, all requirements met' },
  { input: ' A1', shouldMatch: false, explanation: 'Too short (only 3 characters)' },
         { input: 'P@ssw0rd', shouldMatch: true, explanation: 'Valid with special character' },
         { input: 'Abc12345', shouldMatch: true, explanation: 'Exactly 8 characters, meets all requirements' },
         { input: 'Pass word1', shouldMatch: true, explanation: 'Space is allowed (any character)' }
       ],
      hints: [
        'Start with ^ and end with $',
        'Use (?=.*[a-z]) lookahead for lowercase requirement',
        'Use (?=.*[A-Z]) lookahead for uppercase requirement',
        'Use (?=.*\\d) lookahead for digit requirement',
        'End with .{8,} to match 8+ characters'
      ]
    },
    estimatedMinutes: 30,
    topics: ['password validation', 'lookaheads', 'security', 'AND conditions']
  }
]
