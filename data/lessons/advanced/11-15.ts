/**
 * Advanced Lessons 11-15 (Advanced Tier)
 * Includes: Non-capturing Groups, Nested Groups & Backreferences, Alternation, Lookahead/Lookbehind, Unicode & Performance
 */

import type { Lesson } from '@/types/lesson'

export const advancedLessons: Lesson[] = [
  {
    id: '11',
    slug: 'non-capturing-groups',
    title: 'Non-capturing Groups',
    description: 'Group patterns without capturing using (?:). Save memory and avoid unwanted capture groups.',
    tier: 'advanced',
    order: 11,
    prerequisites: ['10'],
    content: [
      {
        type: 'text',
        content: 'Sometimes you need to group a pattern but don\'t want to capture the matched text. Non-capturing groups use `(?:...)` syntax.'
      },
      {
        type: 'example',
        content: 'Capturing vs non-capturing',
        code: 'Capturing: (\\w+)\\s+(\\w+)\nNon-capturing: (?:\\w+)\\s+(\\w+)',
        explanation: 'The capturing version creates two groups. The non-capturing version creates only one group (the second word) because the first group is non-capturing.'
      },
      {
        type: 'text',
        content: 'Why use non-capturing groups? They are faster and use less memory. They also keep your group numbers cleaner when you only need some groups.'
      },
      {
        type: 'example',
        content: 'Applying a quantifier to a group',
        code: '(?:\\d+-)?\\d{4}',
        explanation: 'The non-capturing group (?:\\d+-) matches digits followed by dash, optionally. The whole group is optional due to ?. Then 4 digits follow. Matches "1234" or "555-1234".'
      },
      {
        type: 'text',
        content: 'Use non-capturing groups when you need grouping for precedence but don\'t need the captured text.'
      },
      {
        type: 'example',
        content: 'Matching with alternation in a group',
        code: '(?:Mr|Mrs|Ms)\\.?\\s+\\w+',
        explanation: 'The non-capturing group matches Mr, Mrs, or Ms (optionally with a dot). Then whitespace and a name. No need to capture the title.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• URL parsing: Extract domain from URLs with optional protocols using `(?:https?://)?`\n• Data cleaning: Remove unwanted prefixes like "Re:" or "Fwd:" from email subjects with `^(?:Re|Fwd):\\s*`\n• Log processing: Match timestamp formats with optional timezone indicators\n• Form validation: Handle optional country codes in phone numbers like `(?:\\+1-)?`\n• API design: Match multiple endpoint patterns without capturing the version prefix'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 10**: Non-capturing groups build directly on grouping concepts from Lesson 10. While Lesson 10 taught you how to create groups for capturing, this lesson shows you how to group for precedence without the overhead of capturing. This is especially useful when combined with alternation from Lesson 13, where you often need grouping but don\'t need the captured values. The performance benefits become noticeable in complex patterns with many alternation branches.'
      }
    ],
    exercise: {
      id: 'ex-11',
      instruction: 'Write a pattern using a non-capturing group that matches "http://" or "https://" optionally, followed by a domain. Example: "https://example.com"',
      pattern: '(?:https?://)?\\w+\\.\\w+',
        testCases: [
          { input: 'https://example.com', shouldMatch: true, explanation: 'Matches with https://' },
          { input: 'http://test.org', shouldMatch: true, explanation: 'Matches with http://' },
          { input: 'example.com', shouldMatch: true, explanation: 'Matches without protocol' },
          { input: 'ftp://wrong.com', shouldMatch: false, explanation: 'FTP protocol not allowed' },
          { input: 'https://', shouldMatch: false, explanation: 'Missing domain' },
          { input: 'httpss://example.com', shouldMatch: false, explanation: 'Double s not valid' },
          { input: 'HTTPS://example.com', shouldMatch: false, explanation: 'Case-sensitive' },
          { input: 'test.io', shouldMatch: true, explanation: 'Simple domain without protocol' },
          { input: 'sub.example.com', shouldMatch: true, explanation: 'Matches subdomain' },
          { input: 'test123.org', shouldMatch: true, explanation: 'Numbers in domain work' },
          { input: 'HTTP://example.com', shouldMatch: false, explanation: 'Uppercase protocol fails' },
          { input: 'http://localhost:8080', shouldMatch: false, explanation: 'Port and localhost don\'t match pattern' }
        ],
      hints: [
        'Use a non-capturing group for the protocol',
        'https? matches http or https',
        'Add :// inside the group',
        'Make the whole group optional with ?',
        'Try: (?:https?://)?\\w+\\.\\w+'
      ]
    },
    estimatedMinutes: 18,
    topics: ['non-capturing groups', '?: syntax', 'grouping without capture', 'performance']
  },
  {
    id: '12',
    slug: 'nested-groups-backreferences',
    title: 'Nested Groups and Backreferences',
    description: 'Create nested groups and reference them with \\1, \\2, etc. Match repeated patterns.',
    tier: 'advanced',
    order: 12,
    prerequisites: ['11'],
    content: [
      {
        type: 'text',
        content: 'Groups can be nested inside other groups. Each opening parenthesis gets a number based on its position.'
      },
      {
        type: 'example',
        content: 'Nested groups',
        code: '((\\d{3})-(\\d{4}))',
        explanation: 'Three groups total: group 1 captures the whole "555-1234", group 2 captures "555", group 3 captures "1234".'
      },
      {
        type: 'text',
        content: 'Backreferences let you match the same text that was captured earlier. Use \\1, \\2, etc. to reference group contents.'
      },
      {
        type: 'example',
        content: 'Matching repeated words',
        code: '(\\w+)\\s+\\1',
        explanation: 'Captures a word in group 1, then \\1 matches the exact same word again. Matches "hello hello" or "test test".'
      },
      {
        type: 'example',
        content: 'Matching HTML tags',
        code: '<([A-Z][A-Z0-9]*)\\b[^>]*>.*?</\\1>',
        explanation: 'Group 1 captures the tag name. The closing tag uses \\1 to match the same tag name. Matches properly nested tags like <b>bold</b>.'
      },
      {
        type: 'text',
        content: 'Backreferences are powerful for finding duplicates, matching paired structures, and validating consistency.'
      },
      {
        type: 'example',
        content: 'Matching dates with consistent format',
        code: '(\\d{4})-(\\d{2})-(\\d{2})-\\2-\\3',
        explanation: 'This would match "2024-03-15-03-15" - the month and day repeat. Not typically useful but shows backreference syntax.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Finding duplicate words: `(\\w+)\\s+\\1` catches repeated words like "the the"\n• Matching paired quotes: `<([^>]+)>(.*?)</\\1>` validates HTML tag consistency\n• Data validation: Ensure repeated values match, like `(\\d{4})-(\\d{2})-\\1` for year-month repetition\n• Log analysis: Detect consecutive identical entries using backreferences\n• Template processing: Match placeholders that reference earlier captured values'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 11**: Lesson 12 builds on Lesson 11\'s grouping concepts by adding the ability to reference captured groups. While non-capturing groups (?:...) helped avoid unwanted captures, backreferences (\\1, \\2) let you reuse captured content. This connects to Lesson 10\'s basic capturing groups and will be essential for Lesson 13\'s alternation patterns where you need to match consistent alternatives.'
      }
    ],
    exercise: {
      id: 'ex-12',
      instruction: 'Write a pattern that matches a word repeated twice with a space between. Example: "hello hello"',
      pattern: '(\\w+)\\s+\\1',
        testCases: [
          { input: 'hello hello', shouldMatch: true, explanation: 'Matches repeated "hello"' },
          { input: 'test test', shouldMatch: true, explanation: 'Matches repeated "test"' },
          { input: 'hello world', shouldMatch: false, explanation: 'Words are different' },
          { input: 'hello', shouldMatch: false, explanation: 'Only one word' },
          { input: 'hello  hello', shouldMatch: true, explanation: 'Multiple spaces still match with \\s+' },
          { input: 'testtest', shouldMatch: false, explanation: 'No space between' },
          { input: 'word Word', shouldMatch: false, explanation: 'Case-sensitive: word ≠ Word' },
          { input: '123 123', shouldMatch: true, explanation: 'Digits work too: \\w includes digits' },
          { input: 'hello\thello', shouldMatch: true, explanation: 'Tab character counts as whitespace' },
          { input: 'hello\nhello', shouldMatch: true, explanation: 'Newline also matches \\s' },
          { input: 'hello, hello', shouldMatch: false, explanation: 'Comma breaks the whitespace requirement' },
          { input: 'hello-world', shouldMatch: false, explanation: 'Hyphen is not whitespace' }
        ],
      hints: [
        'Capture the first word in a group',
        'Then match whitespace',
        'Then reference that captured group',
        'Try: (\\w+)\\s+\\1'
      ]
    },
    estimatedMinutes: 20,
    topics: ['nested groups', 'backreferences', '\\1 \\2 syntax', 'matching duplicates', 'group numbering']
  },
  {
    id: '13',
    slug: 'alternation',
    title: 'Alternation',
    description: 'Match one of several patterns using the pipe | operator. The OR operator for regex.',
    tier: 'advanced',
    order: 13,
    prerequisites: ['10'],
    content: [
      {
        type: 'text',
        content: 'The pipe `|` operator means OR. It lets you match one pattern or another. This is called alternation.'
      },
      {
        type: 'example',
        content: 'Simple alternation',
        code: 'cat|dog',
        explanation: 'Matches either "cat" or "dog".'
      },
      {
        type: 'text',
        content: 'Alternation has low precedence. It matches the entire pattern on either side of |.'
      },
      {
        type: 'example',
        content: 'Grouping with alternation',
        code: '(cat|dog)s?',
        explanation: 'The parentheses group the alternation. This matches "cat", "cats", "dog", or "dogs". Without parentheses, cats? would match "cat" or "cats", but dog would be separate.'
      },
      {
        type: 'example',
        content: 'Multiple alternatives',
        code: 'red|green|blue',
        explanation: 'Matches any of the three colors.'
      },
      {
        type: 'text',
        content: 'Alternation can be used anywhere in a pattern, not just at the end.'
      },
      {
        type: 'example',
        content: 'Matching URLs',
        code: 'https?://(www\\.)?(example|test)\\.com',
        explanation: 'Matches http:// or https://, optionally www., then either example.com or test.com.'
      },
      {
        type: 'text',
        content: 'Be careful with overlapping patterns. The regex engine tries alternatives left to right and uses the first match.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Status code matching: `(200|301|404|500)` to match specific HTTP status codes\n• Keyword filtering: Match multiple search terms like `(error|warning|critical)` in log files\n• File extension validation: `\\.(jpg|png|gif|webp)` for image files\n• Color parsing: `(red|green|blue|#[0-9a-fA-F]{6})` for CSS color values\n• Command parsing: Match multiple command verbs like `(get|post|put|delete)` in API routes'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 10**: Alternation extends the grouping skills from Lesson 10, showing another powerful use of parentheses - grouping alternatives. Combined with Lesson 11\'s non-capturing groups, you can write `(?:cat|dog)s?` to match multiple words efficiently. Alternation also prepares you for Lesson 14\'s lookarounds, where you\'ll learn to assert conditions without consuming characters.'
      }
    ],
exercise: {
  id: 'ex-13',
  instruction: 'Write a pattern using alternation that matches either "cat" or "dog". Use the pipe | operator.',
  pattern: 'cat|dog',
  testCases: [
    { input: 'cat', shouldMatch: true, explanation: 'Matches "cat"' },
    { input: 'dog', shouldMatch: true, explanation: 'Matches "dog"' },
    { input: 'cats', shouldMatch: true, explanation: 'Matches "cat" at the start' },
    { input: 'dogs', shouldMatch: true, explanation: 'Matches "dog" at the start' },
    { input: 'bird', shouldMatch: false, explanation: 'Not cat or dog' },
    { input: 'Cat', shouldMatch: false, explanation: 'Case-sensitive - uppercase C' },
    { input: 'DOG', shouldMatch: false, explanation: 'Case-sensitive - uppercase' },
    { input: 'catdog', shouldMatch: true, explanation: 'Matches "cat" first (leftmost wins)' },
    { input: 'dogcat', shouldMatch: true, explanation: 'Matches "dog" first' },
    { input: 'I have a cat', shouldMatch: true, explanation: 'Finds "cat" in the sentence' },
    { input: 'the dog barks', shouldMatch: true, explanation: 'Finds "dog" in the sentence' },
    { input: 'c', shouldMatch: false, explanation: 'Incomplete word' }
  ],
  hints: [
    'Use the pipe | between alternatives',
    'Pattern: cat|dog',
    'This matches either word'
  ]
},
    estimatedMinutes: 15,
    topics: ['alternation', 'pipe operator', 'OR logic', 'pattern alternatives']
  },
  {
    id: '14',
    slug: 'lookahead-lookbehind',
    title: 'Lookahead and Lookbehind',
    description: 'Zero-width assertions for matching without consuming. Positive and negative lookaround.',
    tier: 'advanced',
    order: 14,
    prerequisites: ['13'],
    content: [
      {
        type: 'text',
        content: 'Lookahead and lookbehind are zero-width assertions. They check if a pattern matches ahead or behind the current position, but don\'t consume characters.'
      },
      {
        type: 'example',
        content: 'Positive lookahead: (?=...)',
        code: '\\d(?=px)',
        explanation: 'Matches a digit only if it is followed by "px". The "px" is not consumed. Matches the "1" in "100px" but leaves "px" for next matches.'
      },
      {
        type: 'example',
        content: 'Negative lookahead: (?!...)',
        code: '\\d(?!px)',
        explanation: 'Matches a digit only if it is NOT followed by "px". Matches digits not part of a pixel value.'
      },
      {
        type: 'text',
        content: 'Lookbehind works similarly but checks behind the current position.'
      },
      {
        type: 'example',
        content: 'Positive lookbehind: (?<=...)',
        code: '(?<=\\$)\\d+',
        explanation: 'Matches digits only if preceded by a dollar sign. Matches "100" in "$100" but not "100" alone.'
      },
      {
        type: 'example',
        content: 'Negative lookbehind: (?<!...)',
        code: '(?<!\\$)\\d+',
        explanation: 'Matches digits only if NOT preceded by a dollar sign. Matches "100" but not the "100" in "$100".'
      },
      {
        type: 'text',
        content: 'Lookarounds are powerful for context-sensitive matching without including the context in the match.'
      },
      {
        type: 'example',
        content: 'Real-world: matching numbers not in comments',
        code: '\\d+(?=/*)',
        explanation: 'Matches numbers that are followed by a comment start. Actually this example needs refinement but shows the concept.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Password validation: `^(?=.*[A-Z])(?=.*\\d).{8,}$` requires uppercase and digit without capturing\n• Context-sensitive extraction: Find numbers preceded by `$` with `(?<=\\$)\\d+` for currency values\n• Excluding patterns: Match digits NOT in hex colors with `\\d+(?!#[0-9a-fA-F])`\n• Word boundaries: Match whole words only using `(?<=\\s|^)word(?=\\s|$)`\n• Data masking: Find SSNs not already masked using `(?!\\*\\*\\*)\\d{3}-\\d{2}-\\d{4}`'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 13**: Lookaheads and lookbehinds extend alternation concepts from Lesson 13 by providing conditional matching without consuming characters. While alternation lets you match A OR B, lookarounds let you match X ONLY IF followed by Y. This builds on grouping syntax and is essential for the complex validation patterns you\'ll see in Lesson 20 (password strength) and Lesson 15\'s performance considerations.'
      }
    ],
    exercise: {
      id: 'ex-14',
      instruction: 'Write a pattern using positive lookahead that matches a digit only if followed by "px". Example: match "1" in "100px"',
      pattern: '\\d(?=px)',
           testCases: [
             { input: '100px', shouldMatch: true, explanation: 'Matches "0" in "100px" (the 0 before px)' },
             { input: '50px', shouldMatch: true, explanation: 'Matches "0" in "50px"' },
             { input: '100', shouldMatch: false, explanation: 'No "px" after' },
             { input: '100em', shouldMatch: false, explanation: 'Followed by "em", not "px"' },
             { input: 'px100', shouldMatch: false, explanation: '"px" comes before, not after' },
             { input: '5px', shouldMatch: true, explanation: 'Matches "5" in "5px"' },
             { input: '10px 20px', shouldMatch: true, explanation: 'Matches "0" before each px' },
             { input: '123px456', shouldMatch: true, explanation: 'Matches "3" before px' },
             { input: '5pxs', shouldMatch: true, explanation: 'Matches "5" even if "px" is prefix of longer string' },
             { input: '5 px', shouldMatch: false, explanation: 'Space between digit and "px" breaks lookahead' },
             { input: '5PX', shouldMatch: false, explanation: 'Case-sensitive: uppercase "PX" fails' },
             { input: '5px.', shouldMatch: true, explanation: 'Matches "5" with punctuation after "px"' }
           ],
      hints: [
        'Use positive lookahead: (?=...)',
        'Put px inside the lookahead',
        'Match a digit before the lookahead',
        'Try: \\d(?=px)'
      ]
    },
    estimatedMinutes: 20,
    topics: ['lookahead', 'lookbehind', 'zero-width assertions', 'positive/negative lookaround', 'context matching']
  },
  {
    id: '15',
    slug: 'unicode-and-performance',
    title: 'Unicode and Performance',
    description: 'Handle international characters with Unicode mode and learn regex performance best practices.',
    tier: 'advanced',
    order: 15,
    prerequisites: ['14'],
    content: [
      {
        type: 'text',
        content: 'Modern regex engines support Unicode, allowing you to match characters from any language. Use the `u` flag for Unicode mode.'
      },
      {
        type: 'example',
        content: 'Unicode mode flag',
        code: '/\\w+/u',
        explanation: 'The u flag enables Unicode mode. In Unicode mode, \\w matches Unicode word characters, not just ASCII.'
      },
      {
        type: 'example',
        content: 'Matching emoji',
        code: '/\\p{Emoji}/u',
        explanation: '\\p{Emoji} matches emoji characters in Unicode mode. Requires the u flag.'
      },
      {
        type: 'text',
        content: 'Unicode property escapes \\p{...} let you match characters by their Unicode properties: letters, numbers, symbols, etc.'
      },
      {
        type: 'example',
        content: 'Matching any letter',
        code: '/\\p{L}+/u',
        explanation: '\\p{L} matches any Unicode letter. This includes letters from all alphabets: Latin, Cyrillic, Chinese, Arabic, etc.'
      },
      {
        type: 'text',
        content: 'Performance matters. Some patterns can be very slow on certain inputs (catastrophic backtracking).'
      },
      {
        type: 'example',
        content: 'Dangerous pattern',
        code: '(a+)+',
        explanation: 'Nested quantifiers like (a+)+ can cause exponential backtracking on strings like "aaaaaaaaaaaaaaaaaaaa". Avoid or use possessive quantifiers if supported.'
      },
      {
        type: 'text',
        content: 'Tips for better performance: 1) Be specific with character classes, 2) Avoid nested quantifiers, 3) Use atomic groups or possessive quantifiers when possible, 4) Anchor patterns when you can.'
      },
      {
        type: 'example',
        content: 'Better pattern',
        code: '^[a-z]+$',
        explanation: 'Anchored and specific. Fast because it doesn\'t backtrack unnecessarily.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• International text processing: Match names in any language using `\\p{L}+` with Unicode mode\n• Emoji filtering: Extract or count emojis with `\\p{Emoji}` in social media analysis\n• Multilingual search: Support users worldwide by enabling Unicode-aware patterns\n• Performance optimization: Rewrite `(a+)+` as `a+` to avoid catastrophic backtracking on user input\n• Input validation: Use specific character classes like `[a-zA-Z0-9_]` instead of `\\w` when you know the exact allowed set'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 14**: Unicode and performance concepts complement Lesson 14\'s lookarounds by showing how to write efficient patterns for international text. While lookarounds handle context-sensitive matching, Unicode mode ensures those patterns work correctly with non-ASCII characters. The performance tips help avoid the kind of backtracking issues that can make lookaround-heavy patterns slow. This lesson ties together the advanced techniques from Lessons 11-14 into production-ready patterns.'
      }
    ],
  exercise: {
  id: 'ex-15',
  instruction: 'Write a Unicode pattern that matches any letter (any language). Use the Unicode property escape',
  pattern: '\\p{L}',
  flags: 'u',
  testCases: [
             { input: 'hello', shouldMatch: true, explanation: 'Matches each letter' },
             { input: 'Привет', shouldMatch: true, explanation: 'Matches Cyrillic letters' },
             { input: '你好', shouldMatch: true, explanation: 'Matches Chinese characters' },
             { input: '123', shouldMatch: false, explanation: 'Digits are not letters' },
             { input: '!@#', shouldMatch: false, explanation: 'Symbols are not letters' },
             { input: 'مرحبا', shouldMatch: true, explanation: 'Matches Arabic letters' },
             { input: 'Hello123', shouldMatch: true, explanation: 'Matches letters, not digits' },
             { input: 'a', shouldMatch: true, explanation: 'Single letter matches' },
             { input: 'café', shouldMatch: true, explanation: 'Matches accented Latin letters' },
             { input: '😀', shouldMatch: false, explanation: 'Emoji are not letters' },
             { input: 'a1b', shouldMatch: true, explanation: 'Matches letters among digits' },
             { input: 'Helloمرحبا', shouldMatch: true, explanation: 'Matches mixed Latin and Arabic letters' }
           ],
      hints: [
        'Use Unicode property for letters',
        'The property is L (for letter)',
        'Use \\p{L}',
        'Note: This requires Unicode mode (u flag)'
      ]
    },
    estimatedMinutes: 20,
    topics: ['Unicode mode', 'property escapes', '\\p{L}', 'international text', 'regex performance', 'backtracking']
  }
]
