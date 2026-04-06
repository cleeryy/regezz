/**
 * Intermediate Lessons 6-10 (Quantification + Structure Tiers)
 */

import type { Lesson } from '@/types/lesson'

export const intermediateLessons: Lesson[] = [
  {
    id: '6',
    slug: 'fixed-repetition',
    title: 'Fixed Repetition',
    description: 'Specify exact number of repetitions using curly braces. Control how many times a pattern repeats.',
    tier: 'quantification',
    order: 6,
    prerequisites: ['1', '4'],
    content: [
      {
        type: 'text',
        content: 'Curly braces `{}` let you specify exactly how many times a pattern should repeat. This is called **fixed repetition** - much more precise than "one or more" or "zero or more".'
      },
      {
        type: 'example',
        content: 'Match exactly 3 digits',
        code: '\\d{3}',
        explanation: '\\d matches a digit, {3} means exactly 3 times. So this matches exactly 3 digits in a row: "123", "555", "999".'
      },
      {
        type: 'text',
        content: '**Connection to previous lessons**: You learned \\d for digits (Lesson 3). Now you can say HOW MANY: `\\d{3}` instead of `\\d\\d\\d`. Much cleaner!'
      },
      {
        type: 'example',
        content: 'Match exactly 5 word characters',
        code: '\\w{5}',
        explanation: 'Matches exactly 5 word characters. "hello" matches, "world" matches, but "hi" (2 chars) or "hello world" (11 chars) don\'t match as a whole.'
      },
      {
        type: 'text',
        content: '**Range notation**: You can specify min and max repetitions:\n• `{3}` = exactly 3\n• `{2,4}` = 2 to 4 (inclusive)\n• `{3,}` = 3 or more (no upper limit)\n• `{0,5}` = up to 5 (including zero)'
      },
      {
        type: 'example',
        content: 'Match 2 to 4 digits',
        code: '\\d{2,4}',
        explanation: 'Matches at least 2 and at most 4 digits. So "12", "123", and "1234" all match, but "1" (too few) or "12345" (too many) do not.'
      },
      {
        type: 'example',
        content: 'Match at least 3 characters',
        code: '\\w{3,}',
        explanation: 'The comma without a maximum means "at least". So {3,} matches 3 or more word characters: "hello", "programming", etc.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• US phone area code: `\\d{3}` (exactly 3 digits)\n• Zip codes: `\\d{5}` for US, `\\d{5}(-\\d{4})?` for extended\n• Credit card numbers: `\\d{16}` for basic validation\n• Year validation: `\\d{4}` for 4-digit years\n• Password length: `.{8,}` for minimum 8 characters'
      },
      {
        type: 'example',
        content: 'US phone number area code',
        code: '\\d{3}',
        explanation: 'Area codes are exactly 3 digits. This pattern matches "415", "212", "650" in phone numbers like "415-555-1234".'
      }
    ],
    exercise: {
      id: 'ex-6',
      instruction: 'Write a pattern that matches exactly 2 digits. Your pattern should find pairs of digits in any text.',
      pattern: '\\d{2}',
      testCases: [
        { input: '12', shouldMatch: true, explanation: 'Exactly 2 digits' },
        { input: '123', shouldMatch: true, explanation: 'Matches first 2 digits "12"' },
        { input: '1', shouldMatch: false, explanation: 'Only 1 digit - needs exactly 2' },
        { input: 'a12b', shouldMatch: true, explanation: 'Matches "12" as two consecutive digits' },
        { input: 'ab', shouldMatch: false, explanation: 'No digits at all' },
        { input: '99 bottles', shouldMatch: true, explanation: 'Matches "99"' },
        { input: '5', shouldMatch: false, explanation: 'Single digit - not enough' },
        { input: '2024', shouldMatch: true, explanation: 'Matches first 2 digits "20"' },
        { input: 'a1b2c3', shouldMatch: false, explanation: 'Digits are not consecutive - need exactly 2 in a row' },
        { input: 'abc12', shouldMatch: true, explanation: 'Two digits at the end of string' },
        { input: '12!@#', shouldMatch: true, explanation: 'Digits followed by special characters' },
        { input: ' 12 ', shouldMatch: true, explanation: 'Digits with whitespace on both sides' },
        { input: '', shouldMatch: false, explanation: 'Empty string - no digits to match' },
        { input: '12abc', shouldMatch: true, explanation: 'Two digits at start followed by letters' },
        { input: '1 2', shouldMatch: false, explanation: 'Digits separated by space - not consecutive' },
        { input: '00', shouldMatch: true, explanation: 'Leading zeros are still digits' }
      ],
      hints: [
        'Use \\d to match a digit',
        'Add {2} to specify exactly 2 repetitions',
        'Your pattern: \\d{2} - two digits back-to-back'
      ]
    },
    estimatedMinutes: 15,
    topics: ['curly braces', 'fixed repetition', 'min-max range', 'quantifiers', 'precision']
  },
  {
    id: '7',
    slug: 'kleene-star-plus',
    title: 'Kleene Star and Plus',
    description: 'Match zero or more with *, or one or more with +. The most common repetition operators.',
    tier: 'quantification',
    order: 7,
    prerequisites: ['6'],
    content: [
      {
        type: 'text',
        content: 'The Kleene star `*` and plus `+` are the most frequently used repetition operators. They are shortcuts for common ranges and fundamental to most regex patterns.'
      },
      {
        type: 'example',
        content: 'The star operator: *',
        code: 'a*',
        explanation: 'Matches zero or more "a" characters. This matches "", "a", "aa", "aaa", and so on. Even the empty string! Use carefully - it can match nothing.'
      },
      {
        type: 'example',
        content: 'The plus operator: +',
        code: 'a+',
        explanation: 'Matches one or more "a" characters. This matches "a", "aa", "aaa", but NOT the empty string. More restrictive than *.'
      },
      {
        type: 'text',
        content: '**Remember**: `*` means "zero or more", `+` means "one or more". This is the key difference:\n• `*` can match nothing (empty string)\n• `+` requires at least one match'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 6**: You learned `{3}` for exactly 3, `{2,4}` for ranges. The `*` and `+` are shorthand: `*` = `{0,}` (zero or more), `+` = `{1,}` (one or more). Use these shortcuts for cleaner, more readable patterns.'
      },
      {
        type: 'example',
        content: 'Using with any character',
        code: '.*',
        explanation: '.* matches any sequence of characters (except newline by default). This is extremely powerful and common - but use carefully as it can match too much!'
      },
      {
        type: 'example',
        content: 'Using with word characters',
        code: '\\w+',
        explanation: '\\w+ matches a word - one or more word characters. This is how you match variable-length words like "hello", "regex", "pattern123".'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• **Text matching**: Match words of any length with `\\w+`\n• **File parsing**: Match entire lines with `.*` for log processing\n• **Data validation**: Require at least one character with `.+` (usernames, IDs)\n• **Whitespace handling**: Match optional spaces with `\\s*` (flexible formatting)\n• **HTML/JSON parsing**: Match content between tags with `.*?` (lazy version)\n• **Path matching**: Match directory components with `[^/]+` (one or more non-slashes)'
      },
      {
        type: 'example',
        content: 'Matching a filename with extension',
        code: '\\w+\\.txt',
        explanation: '\\w+ matches the filename (one or more word chars), then \\.txt matches the literal ".txt" extension. Matches "file.txt", "document.txt", "notes123.txt".'
      },
      {
        type: 'text',
        content: '**Common pattern**: `.*?` (lazy star) matches as little as possible. Useful for HTML/XML parsing: `<.+?>` matches ONE tag, not everything from first `<` to last `>`.'
      }
    ],
 exercise: {
  id: 'ex-7',
  instruction: 'Write a pattern that matches one or more digits. Your pattern should find sequences of consecutive digits in any text.',
  pattern: '\\d+',
  testCases: [
    { input: '123', shouldMatch: true, explanation: 'Matches all three digits as one sequence' },
    { input: '1', shouldMatch: true, explanation: 'Single digit matches' },
    { input: '', shouldMatch: false, explanation: 'Empty string does not match (need at least one digit)' },
    { input: 'a1b2c3', shouldMatch: true, explanation: 'Matches "1", "2", and "3" separately' },
    { input: 'abc', shouldMatch: false, explanation: 'No digits' },
    { input: '999', shouldMatch: true, explanation: 'Multiple digits match' },
    { input: '123abc', shouldMatch: true, explanation: 'Matches "123" at start' },
    { input: '0', shouldMatch: true, explanation: 'Zero is a digit and matches' },
    { input: '0000000000', shouldMatch: true, explanation: 'Many zeros match as one sequence (tests greedy matching)' },
    { input: '12a34', shouldMatch: true, explanation: 'Matches "12" and "34" separately (multiple digit sequences)' },
    { input: 'price: $123.45', shouldMatch: true, explanation: 'Matches "123" and "45" in real-world context' },
    { input: 'a', shouldMatch: false, explanation: 'Single letter, not a digit (distractor)' }
  ],
  hints: [
    'Use \\d to match a digit',
    'Add + to mean one or more',
    'Your pattern: \\d+ (two characters: backslash-d-plus)'
  ]
},
    estimatedMinutes: 15,
    topics: ['Kleene star', 'Kleene plus', 'zero or more', 'one or more', 'greedy repetition', 'shorthand quantifiers']
  },
  {
    id: '8',
    slug: 'optional-and-greedy-lazy',
    title: 'Optional and Greedy/Lazy',
    description: 'Make parts optional with ? and understand greedy vs lazy matching behavior.',
    tier: 'quantification',
    order: 8,
    prerequisites: ['7'],
        content: [
          {
            type: 'text',
            content: 'The question mark `?` makes the preceding element **optional** - it matches zero or one time. This is crucial for handling variations in patterns.'
          },
          {
            type: 'example',
            content: 'Optional character in spelling variations',
            code: 'colou?r',
            explanation: 'The u is optional. This matches both "color" (without u - American English) and "colour" (with u - British English). A single pattern handles both!'
          },
          {
            type: 'text',
            content: '**Connection to Lesson 7**: You learned `*` for "zero or more" and `+` for "one or more". The `?` is the third quantifier: it means "zero or one" - exactly 0 or 1 occurrence, no more. Equivalent to `{0,1}`.'
          },
          {
            type: 'text',
            content: '? is equivalent to {0,1} - zero or one occurrence. Use it when something is truly optional: maybe there, maybe not.'
          },
          {
            type: 'example',
            content: 'Phone number with optional area code',
            code: '(?:\\d{3}-)?\\d{3}-\\d{4}',
            explanation: 'Matches "555-1234" or "415-555-1234". The non-capturing group with ? makes the area code optional. Real flexibility for user input!'
          },
          {
            type: 'text',
            content: '**Greedy vs Lazy**: By default, quantifiers are **greedy** - they match as much as possible. Add a `?` AFTER a quantifier to make it **lazy** (match as little as possible). This is the second use of `?` in regex!'
          },
          {
            type: 'example',
            content: 'Greedy matching problem',
            code: '<.+>',
            explanation: 'Greedy: .+ matches as much as possible. In "<tag>content</tag>", it matches "<tag>content</tag>" as one big match (including both tags). Often NOT what you want!'
          },
          {
            type: 'example',
            content: 'Lazy matching solution',
            code: '<.+?>',
            explanation: 'Lazy: .+? matches as little as possible. In "<tag>content</tag>", it matches "<tag>" first, then separately "</tag>". Much better for parsing!'
          },
          {
            type: 'text',
            content: '**Real-world use cases:**\n• **Spelling variations**: Handle American/British English (color/colour), optional prefixes (http/https)\n• **Optional formatting**: Match phone numbers with or without area codes, dates with optional separators\n• **HTML/XML parsing**: Use lazy matching `.*?` to match individual tags instead of everything\n• **Configuration parsing**: Match optional whitespace `\\s*`, optional trailing slashes in paths\n• **Input validation**: Make certain fields optional while still validating format\n• **Log parsing**: Handle variations in log formats (optional timestamp formats, optional fields)'
          },
          {
            type: 'example',
            content: 'Matching URLs with optional protocol',
            code: '(?:https?:\\/\\/)?[\\w.-]+',
            explanation: 'Matches "example.com" or "http://example.com" or "https://example.com". The protocol is optional, making the pattern flexible for various input formats.'
          },
          {
            type: 'text',
            content: '**Use lazy quantifiers** when you want minimal matching, especially with nested or repeated structures. Greedy matching can accidentally consume too much text!'
          }
        ],
    exercise: {
      id: 'ex-8',
      instruction: 'Write a pattern that matches "color" or "colour" (u is optional)',
      pattern: 'colou?r',
       testCases: [
         { input: 'color', shouldMatch: true, explanation: 'Matches without the optional u' },
         { input: 'colour', shouldMatch: true, explanation: 'Matches with the optional u' },
         { input: 'colouur', shouldMatch: false, explanation: 'Two u\'s, pattern only allows zero or one' },
         { input: 'colr', shouldMatch: false, explanation: 'Missing o and u' },
         { input: 'colors', shouldMatch: true, explanation: 'Matches "color" as substring' },
         { input: 'COLOR', shouldMatch: false, explanation: 'Case-sensitive' },
         { input: 'colou', shouldMatch: false, explanation: 'Missing r' },
         { input: 'colourful', shouldMatch: true, explanation: 'Matches "colour" part' },
         { input: 'colorful', shouldMatch: true, explanation: 'Contains "color" as substring within longer word' },
         { input: 'Colour', shouldMatch: false, explanation: 'Uppercase C does not match (case-sensitive)' },
         { input: 'colur', shouldMatch: false, explanation: 'Missing "o" after "col" - breaks required sequence' },
          { input: 'coulour', shouldMatch: false, explanation: 'Extra "u" after "c" creates wrong sequence' },
          { input: 'COLOUR', shouldMatch: false, explanation: 'All uppercase - case-sensitive match fails' },
          { input: 'coloor', shouldMatch: false, explanation: 'Double "o" - extra letter not allowed' },
          { input: 'color123', shouldMatch: true, explanation: 'Digits after "color" - substring match still works' },
          { input: ' colour ', shouldMatch: true, explanation: 'Whitespace around "colour" - substring match still works' }
        ],
      hints: [
        'Use ? to make a character optional',
        'Place ? after the u',
        'Try: colou?r'
      ]
    },
    estimatedMinutes: 15,
    topics: ['optional matching', '? quantifier', 'greedy vs lazy', 'minimal matching']
  },
  {
    id: '9',
    slug: 'anchors',
    title: 'Anchors',
    description: 'Match positions, not characters. Use ^ and $ to anchor patterns to start and end of lines.',
    tier: 'structure',
    order: 9,
    prerequisites: ['1', '7'],
    content: [
      {
        type: 'text',
        content: 'Anchors match **positions** in text, not visible characters. They help you control where matches occur. Think of them as "line boundaries" rather than content.'
      },
      {
        type: 'example',
        content: 'Start of line anchor: ^',
        code: '^Hello',
        explanation: 'Matches "Hello" only at the beginning of a line (or string). The ^ asserts "this position must be the start of the line".'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 7**: You learned `+` for "one or more". Combine with anchors for powerful validation: `^\\d+$` matches strings that are ENTIRELY digits - no letters, spaces, or other characters allowed.'
      },
      {
        type: 'example',
        content: 'End of line anchor: $',
        code: 'world$',
        explanation: 'Matches "world" only at the end of a line (or string). The $ asserts "this position must be the end of the line".'
      },
      {
        type: 'text',
        content: 'Combine anchors to match entire lines exactly. This is crucial for validation: you often want to ensure input matches a pattern from start to finish, not just contains it.'
      },
      {
        type: 'example',
        content: 'Match entire line',
        code: '^Hello world$',
        explanation: 'Matches only if the entire line is exactly "Hello world" - starts with Hello and ends with world. No extra characters allowed.'
      },
      {
        type: 'text',
        content: '**Anchors are zero-width** - they don\'t consume characters or move the cursor. They just assert a position. This makes them powerful for validation without affecting what gets captured.'
      },
      {
        type: 'example',
        content: 'Validating numeric input',
        code: '^\\d+$',
        explanation: 'Matches a string that consists entirely of digits (start to end). This validates that input is all digits: "12345" ✓, "123abc" ✗, " 123" ✗ (has space).'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• **Form validation**: Ensure phone numbers, zip codes, IDs match exactly - no extra spaces or characters\n• **Log filtering**: Match lines that START with specific patterns (error types, timestamps)\n• **Data cleaning**: Find entries that DON\'T match expected format for correction\n• **Password validation**: Combine with other patterns to enforce full password rules\n• **File parsing**: Extract only lines that match a complete format'
      },
      {
        type: 'example',
        content: 'US zip code validation',
        code: '^\\d{5}(-\\d{4})?$',
        explanation: 'Matches "12345" or "12345-6789" exactly. The ^ and $ ensure the entire string is the zip code - no extra characters.'
      },
      {
        type: 'text',
        content: '**Common mistake**: Forgetting anchors when validating. Without them, "abc123def" would match `\\d+` even though it\'s not a valid number. With `^\\d+$`, it correctly rejects.'
      }
    ],
    exercise: {
      id: 'ex-9',
      instruction: 'Write a pattern that matches a string that starts with "test". Use the start anchor to ensure it\'s at the beginning.',
      pattern: '^test',
       testCases: [
         { input: 'test123', shouldMatch: true, explanation: 'Starts with "test"' },
         { input: 'this is a test', shouldMatch: false, explanation: '"test" is in the middle, not at start' },
         { input: 'test', shouldMatch: true, explanation: 'Exactly "test" at start' },
         { input: 'TEST', shouldMatch: false, explanation: 'Case-sensitive, uppercase does not match' },
         { input: 'mytest', shouldMatch: false, explanation: '"test" is at the end' },
         { input: ' testing', shouldMatch: false, explanation: 'Space before test' },
         { input: 'test-test', shouldMatch: true, explanation: 'Starts with test' },
         { input: 'tetest', shouldMatch: false, explanation: 'Starts with "te" not "test" - does not match the pattern' },
         { input: 'testing', shouldMatch: true, explanation: 'Starts with "test" (prefix of longer word)' },
         { input: 'test ', shouldMatch: true, explanation: 'Starts with "test" followed by space' },
         { input: '\ntest', shouldMatch: false, explanation: 'Newline before test - anchor requires start of string' },
          { input: 'something\ntest', shouldMatch: false, explanation: 'Test on second line does not match start anchor' },
          { input: '', shouldMatch: false, explanation: 'Empty string does not start with "test"' },
          { input: '\ttest', shouldMatch: false, explanation: 'Tab before test - anchor requires start of string' },
          { input: 'test\n', shouldMatch: true, explanation: 'Starts with test, newline after is fine' },
          { input: 'Test', shouldMatch: false, explanation: 'Uppercase T - case-sensitive' }
        ],
      hints: [
        'Use ^ to anchor to the start of the line',
        'Combine ^ with the pattern "test"',
        'Your pattern: ^test (5 characters total)'
      ]
    },
    estimatedMinutes: 15,
    topics: ['anchors', '^ start', '$ end', 'line boundaries', 'string validation', 'zero-width assertions']
  },
  {
    id: '10',
    slug: 'capturing-groups',
    title: 'Capturing Groups',
    description: 'Group patterns with parentheses and capture matched content for later use. Extract specific parts of matches.',
    tier: 'structure',
    order: 10,
    prerequisites: ['9'],
    content: [
      {
        type: 'text',
        content: 'Parentheses `()` create **capturing groups**. They group patterns together AND capture the matched text for later reference. This is one of the most powerful regex features.'
      },
      {
        type: 'example',
        content: 'Simple capturing group',
        code: '(\\d+)',
        explanation: 'The parentheses create a group. This matches and captures one or more digits. The captured text can be referenced later as "group 1".'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 9**: Anchors control WHERE matches occur. Capturing groups let you extract WHAT matched. Combine them for powerful validation + extraction: `^(\\d{3})-(\\d{4})$` validates AND captures area code + number separately.'
      },
      {
        type: 'text',
        content: '**Groups are numbered** by their opening parenthesis position, from left to right, starting at 1:\n• First `(` = group 1\n• Second `(` = group 2\n• Third `(` = group 3\n• And so on...'
      },
      {
        type: 'example',
        content: 'Multiple groups for phone numbers',
        code: '(\\d{3})-(\\d{4})',
        explanation: 'Two groups: group 1 captures the area code (3 digits), group 2 captures the last 4 digits. For "555-1234", group 1="555", group 2="1234".'
      },
      {
        type: 'text',
        content: 'Groups let you apply quantifiers to multiple characters and extract specific parts of a match. This is essential for parsing structured data.'
      },
      {
        type: 'example',
        content: 'Matching a date format',
        code: '(\\d{4})-(\\d{2})-(\\d{2})',
        explanation: 'Captures year, month, and day separately. For "2024-03-15": group 1="2024", group 2="03", group 3="15". Use these to validate or reformat dates.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• **Data extraction**: Parse logs, CSVs, APIs - extract specific fields\n• **Search & replace**: Reformat text using captured groups (e.g., swap first/last names)\n• **Validation with capture**: Validate format AND extract components (phone, email parts)\n• **URL parsing**: Extract protocol, domain, path, query parameters\n• **Log analysis**: Extract timestamp, level, message from structured logs\n• **File parsing**: Extract filename, extension, directory from paths'
      },
      {
        type: 'example',
        content: 'Parsing log entries',
        code: '(\\d{4}-\\d{2}-\\d{2}) (\\d{2}:\\d{2}:\\d{2}) \\[([A-Z]+)\\] (.*)',
        explanation: 'Captures timestamp, time, log level, and message separately. For "2024-03-15 14:32:01 [ERROR] Connection failed": group 1="2024-03-15", group 2="14:32:01", group 3="ERROR", group 4="Connection failed".'
      },
      {
        type: 'text',
        content: '**Captured groups are used for**: backreferences (match same text again), replacements (reformat text), and extraction (pull specific data from matches).'
      }
    ],
 exercise: {
  id: 'ex-10',
  instruction: 'Write a pattern with two groups that matches "area:number" where area is 3 digits and number is 4 digits. Capture each part separately. Example: "555-1234" → group 1="555", group 2="1234"',
  pattern: '(\\d{3})-(\\d{4})',
  testCases: [
    { input: '555-1234', shouldMatch: true, explanation: 'Matches with groups: 1="555", 2="1234"' },
    { input: '123-4567', shouldMatch: true, explanation: 'Matches with groups: 1="123", 2="4567"' },
    { input: '12-3456', shouldMatch: false, explanation: 'Area code must be 3 digits' },
    { input: '555-123', shouldMatch: false, explanation: 'Number must be 4 digits' },
    { input: '5551234', shouldMatch: false, explanation: 'Missing dash separator' },
    { input: '000-0000', shouldMatch: true, explanation: 'Matches with zeros' },
    { input: '999-9999', shouldMatch: true, explanation: 'Matches with nines' },
    { input: '555-12345', shouldMatch: true, explanation: 'Matches first 4 digits after dash' },
    { input: 'call 555-1234', shouldMatch: true, explanation: 'Matches phone embedded in text' },
    { input: '555-1234 999-0000', shouldMatch: true, explanation: 'Matches first phone number in sequence' },
    { input: '(555) 123-4567', shouldMatch: true, explanation: 'Matches "123-4567" as substring (pattern finds valid format)' },
    { input: '555-123', shouldMatch: false, explanation: 'Number too short (only 3 digits)' }
  ],
  hints: [
    'Use parentheses () to create groups',
    'First group: (\\d{3}) captures 3 digits',
    'Second group: (\\d{4}) captures 4 digits',
    'Separate with a dash: -(\\d{4})',
    'Full pattern: (\\d{3})-(\\d{4})'
  ]
},
    estimatedMinutes: 18,
    topics: ['capturing groups', 'parentheses', 'group numbering', 'pattern grouping', 'data extraction', 'parsing']
  }
]
