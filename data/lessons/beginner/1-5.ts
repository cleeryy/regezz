import type { Lesson } from '@/types/lesson'

export const beginnerLessons: Lesson[] = [
  {
    id: '1',
    slug: 'literal-matching',
    title: 'Literal Matching',
    description: 'Learn how to match **exact text patterns** using regular expressions. The foundation of all regex patterns.',
    tier: 'foundation',
    order: 1,
    prerequisites: [],
    content: [
      {
        type: 'text',
        content: 'Regular expressions (regex) are patterns used to match text. The most basic pattern matches exactly what you write - this is called **literal matching**. Think of it as the "Find" function in a text editor.'
      },
      {
        type: 'example',
        content: 'The pattern `cat` matches any string containing "cat"',
        code: 'cat',
        explanation: 'This finds "cat" anywhere in the text - in "cat", "catalog", "scatter", etc. The regex engine searches for this exact sequence of characters.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Finding specific error messages in logs: `ERROR`, `Exception`, `Failed`\n• Searching for specific keywords in documentation\n• Validating that a required string exists in user input\n• Finding function names in code: `function`, `def`, `class`'
      },
      {
        type: 'example',
        content: 'Searching logs for errors',
        code: 'ERROR',
        explanation: 'Matches any log line containing "ERROR". Useful for filtering logs: "ERROR: Connection failed", "ERROR: Timeout", etc.'
      },
      {
        type: 'text',
        content: 'Literal matching is **case-sensitive**. The pattern `Cat` will match "Cat" but not "cat". This matters for exact searches:\n- `Cat` matches: "Cat", "CatDog", "the Cat"\n- `Cat` does NOT match: "cat", "CAT", "cAt"'
      },
          {
            type: 'text',
            content: '**Important:** Literal matching has limitations. It can\'t express "any digit" or "any letter" - that\'s why we\'ll learn character classes in the next lesson. But for exact strings, it\'s perfect!'
          },
          {
            type: 'text',
            content: '**What\'s Next**: In Lesson 2, you\'ll learn **character classes** - how to match "any one of these characters" instead of just one specific character. This gives you flexibility while keeping patterns precise.'
          }
        ],
    exercise: {
      id: 'ex-1',
      instruction: 'Write a pattern that matches the word **"hello"**. The pattern will find "hello" anywhere in the text. Remember: be *exact* with your spelling!',
      pattern: 'hello',
      testCases: [
        { input: 'hello world', shouldMatch: true, explanation: '"hello" is found at the start' },
        { input: 'say hello to me', shouldMatch: true, explanation: '"hello" is found in the middle' },
        { input: 'well hello there', shouldMatch: true, explanation: '"hello" is found anywhere' },
        { input: 'HELLO', shouldMatch: false, explanation: 'Case-sensitive! Uppercase does not match lowercase' },
        { input: 'goodbye', shouldMatch: false, explanation: 'No "hello" in this string' },
        { input: 'helo', shouldMatch: false, explanation: 'Missing one "l" - exact match required' },
        { input: 'hellohello', shouldMatch: true, explanation: 'Matches the first "hello" (finds it anywhere)' },
        { input: 'Hello', shouldMatch: false, explanation: 'Capital H doesn\'t match lowercase h' },
        { input: '', shouldMatch: false, explanation: 'Empty string contains no "hello"' },
        { input: 'hello123', shouldMatch: true, explanation: '"hello" found at start of longer string' },
        { input: '!hello?', shouldMatch: true, explanation: '"hello" found with punctuation around it' },
        { input: 'heLLo', shouldMatch: false, explanation: 'Mixed case does not match lowercase pattern' },
        { input: 'say_hello_to_me', shouldMatch: true, explanation: '"hello" found within underscores' },
        { input: 'hello\nworld', shouldMatch: true, explanation: 'Newline does not prevent match' },
        { input: 'hello\tworld', shouldMatch: true, explanation: 'Tab does not prevent match' },
        { input: 'ello', shouldMatch: false, explanation: 'Missing starting h' }
      ],
      hints: [
        'Regex finds patterns anywhere in text - no special syntax needed for simple words',
        'Just type what you want to find, letter by letter: h-e-l-l-o',
        'Remember: case matters! "hello" ≠ "Hello" ≠ "HELLO"'
      ]
    },
    estimatedMinutes: 8,
    topics: ['literal matching', 'case sensitivity', 'exact text', 'pattern basics']
  },
  {
    id: '2',
    slug: 'character-classes',
    title: 'Character Classes',
    description: 'Match any one character from a set using square brackets. More flexible than literal matching.',
    tier: 'foundation',
    order: 2,
    prerequisites: ['1'],
    content: [
      {
        type: 'text',
        content: 'Square brackets `[ ]` create a **character class** - it matches any ONE character from a set. This is more powerful than literal matching because you can express alternatives.'
      },
      {
        type: 'example',
        content: 'Match any single vowel',
        code: '[aeiou]',
        explanation: 'Matches ONE character that is either a, e, i, o, or u. In "cat", it matches "a". In "dog", it matches "o".'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 1**: Literal matching finds exact sequences. Character classes find any one character from a group. Use classes when you want flexibility: "match a OR b OR c".'
      },
      {
        type: 'example',
        content: 'Match hexadecimal digits',
        code: '[0-9a-fA-F]',
        explanation: 'Matches any digit (0-9) or any letter a-f (case-insensitive). Useful for matching hex color codes like "#FF5733".'
      },
      {
        type: 'text',
        content: '**Ranges** make character classes shorter. Instead of `[abcdefghijklmnopqrstuvwxyz]`, write `[a-z]`. Common ranges:\n• `[a-z]` - lowercase letters\n• `[A-Z]` - uppercase letters\n• `[0-9]` - digits\n• `[a-zA-Z]` - all letters'
      },
      {
        type: 'example',
        content: 'Match word characters (letters and digits)',
        code: '[a-zA-Z0-9]',
        explanation: 'Matches any letter (upper or lower) or any digit. This is similar to the shorthand \\w (which also includes underscore).'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Validate file extensions: `\\.[jJ][pP][gG]` matches .jpg, .JPG, .Jpg, etc.\n• Match status codes: `[45]\\d{2}` matches 400-599 (error codes)\n• Parse log levels: `\\[(ERROR|WARN|INFO)\\]` (we\'ll learn grouping later)\n• Match currency symbols: `[$€£]`'
      }
    ],
    exercise: {
      id: 'ex-2',
      instruction: 'Write a pattern using character class that matches any single vowel (a, e, i, o, u). Your pattern should find vowels in any word.',
      pattern: '[aeiou]',
      testCases: [
        { input: 'cat', shouldMatch: true, explanation: 'Matches "a" in cat' },
        { input: 'dog', shouldMatch: true, explanation: 'Matches "o" in dog' },
        { input: 'sky', shouldMatch: false, explanation: 'No vowels in "sky"' },
        { input: 'aeiou', shouldMatch: true, explanation: 'Matches the first vowel "a"' },
        { input: '123', shouldMatch: false, explanation: 'No vowels in numbers' },
        { input: 'AEIOU', shouldMatch: false, explanation: 'Uppercase vowels not in the class' },
        { input: 'rhythm', shouldMatch: false, explanation: 'No vowels (y is not a vowel here)' },
        { input: 'a', shouldMatch: true, explanation: 'Single vowel matches' },
        { input: '', shouldMatch: false, explanation: 'Empty string has no character to match' },
        { input: 'a1e2i3o4u5', shouldMatch: true, explanation: 'Matches first vowel "a" among digits' },
        { input: 'xyz a', shouldMatch: true, explanation: 'Matches vowel "a" at end after consonants' },
        { input: ' a ', shouldMatch: true, explanation: 'Matches vowel "a" surrounded by spaces' }
      ],
      hints: [
        'Character classes use square brackets: [characters]',
        'List the vowels you want to match: a, e, i, o, u',
        'Put all five vowels inside brackets with no spaces: [aeiou]'
      ]
    },
    estimatedMinutes: 12,
    topics: ['character classes', 'ranges', 'character sets', 'flexibility']
  },
  {
    id: '3',
    slug: 'shorthand-classes',
    title: 'Shorthand Classes',
    description: 'Learn common shortcuts like \\d, \\w, and \\s for digits, word characters, and whitespace.',
    tier: 'foundation',
    order: 3,
    prerequisites: ['2'],
    content: [
      {
        type: 'text',
        content: 'Instead of writing `[0-9]` for digits, you can use `\\d`. This is a **shorthand character class** - a shortcut for common patterns. Much cleaner and more readable!'
      },
      {
        type: 'example',
        content: 'The three main shorthands',
        code: '\\d\\w\\s',
        explanation: '\\d = any digit (same as [0-9])\n\\w = any word character (letters, digits, underscore) - same as [a-zA-Z0-9_]\n\\s = any whitespace (space, tab, newline, carriage return)'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 2**: You learned character classes like `[0-9]` and `[a-zA-Z]`. Shorthands are identical in function, just shorter syntax. Choose based on readability.'
      },
      {
        type: 'example',
        content: 'Match a phone number format',
        code: '\\d\\d\\d-\\d\\d\\d\\d',
        explanation: 'Matches "123-4567" (3 digits, dash, 4 digits). Cleaner than [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9].'
      },
      {
        type: 'text',
        content: '**Negated shorthands** (uppercase): Each shorthand has a negated version that matches the opposite:\n• `\\D` = NOT a digit (same as [^0-9])\n• `\\W` = NOT a word character (same as [^a-zA-Z0-9_])\n• `\\S` = NOT whitespace'
      },
      {
        type: 'example',
        content: 'Remove non-digits from phone number',
        code: '\\D',
        explanation: 'Matches any non-digit character. Use this to find and remove spaces, dashes, parentheses from "(555) 123-4567" → "5551234567".'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Validate IDs: `\\w+` for usernames (letters, digits, underscore)\n• Clean phone numbers: use `\\D` to remove non-digits\n• Parse whitespace-separated data: `\\s+` matches any spacing\n• Find numbers in text: `\\d+` for extracting quantities\n• Match log levels: `(ERROR|WARN|INFO)` combined with other patterns'
      },
      {
        type: 'example',
        content: 'Match a simple identifier',
        code: '\\w+',
        explanation: 'Matches variable names, function names, or any identifier: "userName", "count", "item1", "_private".'
      }
    ],
    exercise: {
      id: 'ex-3',
      instruction: 'Write a pattern using \\d that matches any single digit. Your pattern should find digits in any text.',
      pattern: '\\d',
      testCases: [
        { input: '5', shouldMatch: true, explanation: '5 is a digit' },
        { input: 'a', shouldMatch: false, explanation: 'a is not a digit' },
        { input: '123', shouldMatch: true, explanation: 'Matches the first digit "1"' },
        { input: 'hello5world', shouldMatch: true, explanation: 'Matches the digit "5"' },
        { input: 'no numbers here', shouldMatch: false, explanation: 'No digits in this string' },
        { input: '0', shouldMatch: true, explanation: '0 is a digit' },
        { input: '99 bottles', shouldMatch: true, explanation: 'Matches first digit "9"' },
        { input: 'price: $19.99', shouldMatch: true, explanation: 'Matches first digit "1"' },
        { input: '', shouldMatch: false, explanation: 'Empty string contains no digit' },
        { input: '3.14', shouldMatch: true, explanation: 'Matches first digit "3" in decimal' },
        { input: '5\n', shouldMatch: true, explanation: 'Digit followed by newline still matches' },
        { input: '\t9', shouldMatch: true, explanation: 'Digit after tab matches' }
      ],
      hints: [
        'Shorthand for digit uses backslash + one letter: \\d',
        'The letter "d" stands for "digit"',
        'Your pattern is just two characters: backslash and d'
      ]
    },
    estimatedMinutes: 10,
    topics: ['shorthand', 'digits', 'word characters', 'whitespace', 'negation']
  },
  {
    id: '4',
    slug: 'dot-wildcard',
    title: 'The Dot Wildcard',
    description: 'Learn how the dot (.) matches any single character except newline. Powerful but use carefully.',
    tier: 'foundation',
    order: 4,
    prerequisites: ['3'],
    content: [
      {
        type: 'text',
        content: 'The dot `.` is a special wildcard that matches **any single character** (except newlines by default). It\'s the most flexible pattern - use it when you truly don\'t care what character is there.'
      },
      {
        type: 'example',
        content: 'Match patterns like "c t" where the middle can be anything',
        code: 'c.t',
        explanation: 'Matches "cat", "cot", "cut", "c5t", "c t" (with space), "c.t" (literal dot). The dot matches ANY character between c and t.'
      },
      {
        type: 'text',
        content: '**Connection to previous lessons**: You learned specific matching (Lesson 1), character classes (Lesson 2), and shorthands (Lesson 3). The dot is the ultimate flexibility - it matches ANY character, no restrictions.'
      },
      {
        type: 'text',
        content: '**⚠️ Important: Escape the dot when you want a literal dot!**\n\nTo match an actual period/dot character, use `\\.` (backslash + dot).\n• `.` matches any character\n• `\\.` matches only a literal dot'
      },
      {
        type: 'example',
        content: 'Match file extensions',
        code: '\\.txt',
        explanation: 'The \\.(escaped dot) matches a literal dot, then "txt". This matches ".txt" but NOT ".xtx" or "atxt".'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Match file extensions: `\\.(jpg|png|gif)` (we\'ll learn grouping later)\n• Find typos: `h.t` could match "hat", "hit", "hot" (but also "h5t", "h t")\n• Parse simple formats: `\\d\\d/\\d\\d/\\d\\d\\d\\d` for dates (but be careful!)\n• Match any separator: `\\d.\\d` matches "3.14", "3-14", "3/14"'
      },
      {
        type: 'example',
        content: 'When the dot is TOO permissive',
        code: 'user.name',
        explanation: 'This matches "userName", "user.name", "user!name", "user name", "userXname"... Sometimes that\'s too broad! Consider: `user[._]name` for more control.'
      },
      {
        type: 'text',
        content: '**Best practice**: Use the dot sparingly. Be as specific as possible:\n• ✅ `c.t` when you really want any character\n• ❌ `.` when you could use `\\d` or `\\w` or `[a-z]`\n• ✅ `\\d\\d\\d` for 3 digits (better than `...`)\n• ✅ `\\w+` for words (better than `.+` in many cases)'
      }
    ],
    exercise: {
      id: 'ex-4',
      instruction: 'Write a pattern that matches "h.t" where the middle character can be anything. This should match "hat", "hot", "hit", "h5t", "h t", etc.',
      pattern: 'h.t',
      testCases: [
        { input: 'hat', shouldMatch: true, explanation: 'Matches "hat" - a matches the dot' },
        { input: 'hot', shouldMatch: true, explanation: 'Matches "hot" - o matches the dot' },
        { input: 'h5t', shouldMatch: true, explanation: 'Matches "h5t" - 5 matches the dot' },
        { input: 'h t', shouldMatch: true, explanation: 'Matches "h t" - space matches the dot' },
        { input: 'ht', shouldMatch: false, explanation: 'Need exactly 3 characters: h, any char, t' },
        { input: 'h.t', shouldMatch: true, explanation: 'Matches "h.t" - literal dot matches the pattern dot' },
        { input: 'haat', shouldMatch: false, explanation: 'Too long - dot matches ONE character only' },
        { input: 'HAT', shouldMatch: false, explanation: 'Case-sensitive: H ≠ h' },
        { input: 'h\nt', shouldMatch: false, explanation: 'Dot does NOT match newline characters' },
        { input: 'h\rt', shouldMatch: false, explanation: 'Dot does NOT match carriage return' },
        { input: 'h-t', shouldMatch: true, explanation: 'Dot matches hyphen' },
        { input: 'h  t', shouldMatch: false, explanation: 'Two spaces between h and t - dot matches only one character' }
      ],
      hints: [
        'The dot (.) is the wildcard - it matches any single character',
        'Your pattern needs: h, then dot, then t',
        'Three characters total: h.t'
      ]
    },
    estimatedMinutes: 10,
    topics: ['wildcard', 'dot', 'escaping', 'flexibility', 'best practices']
  },
  {
    id: '5',
    slug: 'negation-ranges',
    title: 'Negation and Ranges',
    description: 'Learn to negate character classes and use efficient range notation. Invert matches with ^.',
    tier: 'foundation',
    order: 5,
    prerequisites: ['4'],
    content: [
      {
        type: 'text',
        content: 'Inside character classes, `^` at the START means **negation** - match anything NOT in the set. `[^aeiou]` matches any character that is NOT a vowel.'
      },
      {
        type: 'example',
        content: 'Match non-digits',
        code: '[^0-9]',
        explanation: 'Matches any single character that is NOT a digit 0-9. Matches "a", "!", " ", but not "5". Useful for removing or finding non-numeric data.'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 3**: Remember `\\D` (uppercase) matches non-digits? `[^0-9]` is equivalent! Choose based on context:\n• `\\D` - shorter, use for simple "not a digit"\n• `[^0-9]` - more explicit, use when you need custom negation'
      },
      {
        type: 'example',
        content: 'Match consonants (not vowels)',
        code: '[^aeiouAEIOU]',
        explanation: 'Matches any character that is not a vowel (case-insensitive). Includes consonants, digits, spaces, punctuation.'
      },
      {
        type: 'text',
        content: '**Ranges** make character classes shorter and more readable:\n• `[a-z]` instead of `[abcdefghijklmnopqrstuvwxyz]`\n• `[A-Z]` instead of `[ABCDEFGHIJKLMNOPQRSTUVWXYZ]`\n• `[0-9]` instead of `[0123456789]`\n• `[a-zA-Z]` for all letters, `[a-zA-Z0-9]` for alphanumeric'
      },
      {
        type: 'example',
        content: 'Combine ranges with negation',
        code: '[^a-zA-Z]',
        explanation: 'Matches anything that is NOT a letter. Includes digits, spaces, punctuation, symbols. Useful for finding special characters.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Clean phone numbers: `[^0-9]` to remove everything except digits\n• Validate usernames: `[^a-zA-Z0-9_]` to find invalid characters\n• Parse file names: `[^a-zA-Z0-9._-]` to find problematic characters\n• Extract words: `[^a-zA-Z]` to split on non-letters'
      },
      {
        type: 'example',
        content: 'Find invalid characters in identifier',
        code: '[^a-zA-Z0-9_]',
        explanation: 'In "user$name", matches "$" (invalid in most identifiers). Use this to validate and clean input.'
      },
      {
        type: 'text',
        content: '**Important**: The `^` must be FIRST inside the brackets for negation. If it appears elsewhere, it\'s just a literal `^`:\n• `[^a-z]` = negation (NOT a-z)\n• `[a-z^]` = literal match: a-z or ^\n• `[a-z^0-9]` = letters, caret, or digits (not negation!)'
      }
    ],
    exercise: {
      id: 'ex-5',
      instruction: 'Write a pattern using negation that matches any single character that is NOT a digit. Your pattern should match letters, spaces, punctuation, but not numbers.',
      pattern: '[^0-9]',
      testCases: [
        { input: 'a', shouldMatch: true, explanation: 'a is not a digit' },
        { input: '5', shouldMatch: false, explanation: '5 IS a digit, so no match' },
        { input: '!', shouldMatch: true, explanation: '! is not a digit' },
        { input: ' ', shouldMatch: true, explanation: 'space is not a digit' },
        { input: 'hello', shouldMatch: true, explanation: 'Matches first non-digit "h"' },
        { input: '0', shouldMatch: false, explanation: '0 is a digit' },
        { input: 'test123', shouldMatch: true, explanation: 'Matches first non-digit "t"' },
        { input: '9', shouldMatch: false, explanation: '9 is a digit' },
        { input: '', shouldMatch: false, explanation: 'Empty string has no character to match' },
        { input: '12345', shouldMatch: false, explanation: 'All digits - no non-digit to match' },
        { input: '1a', shouldMatch: true, explanation: 'Matches non-digit "a" at position 1 (first char is digit)' },
        { input: '123a', shouldMatch: true, explanation: 'Matches non-digit "a" at the end after digits' }
      ],
      hints: [
        'Use ^ INSIDE brackets at the START for negation: [^...]',
        'Negate the digit range: put ^ before 0-9',
        'Your pattern: [^0-9] - anything NOT in the range 0-9'
      ]
    },
    estimatedMinutes: 12,
    topics: ['negation', 'ranges', 'character classes', 'inversion', 'validation']
  }
]
