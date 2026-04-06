import type { Lesson } from '@/types/lesson'

export const creativeLessons: Lesson[] = [
  {
    id: 'bonus-1',
    slug: 'regex-golf',
    title: 'Regex Golf',
    description: 'Match exactly the strings on the left, and none on the right. The shorter the pattern, the better!',
    tier: 'advanced',
    order: 101,
    prerequisites: ['13'],
    content: [
      {
        type: 'text',
        content: 'Regex Golf is a game where you craft the shortest pattern that matches all strings in one set but none in another. It teaches you to think creatively about regex.'
      },
      {
        type: 'example',
        content: 'Match these, not those',
        code: 'Match: "ab", "aab", "aaab"\nDon\'t match: "b", "abb", "aabb"',
        explanation: 'One solution: ^a+b$ matches one or more "a" followed by exactly one "b". This matches the left column and rejects the right.'
      },
      {
        type: 'text',
        content: 'The challenge: find the SHORTEST pattern. There might be multiple valid solutions. Can you find one under 10 characters?'
      },
      {
        type: 'text',
        content: 'Regex Golf teaches you about: negative patterns, clever character classes, and thinking about what makes sets different.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Input validation: Craft minimal patterns to validate specific formats (ZIP codes, product codes)\n• Security filtering: Create tight allowlists for safe patterns in user input\n• Code golf competitions: Write shortest possible code, including regex patterns\n• Pattern optimization: Learn to make existing patterns more efficient and concise\n• Teaching tool: Demonstrates regex engine behavior and matching strategies\n• Test case design: Helps think about edge cases and pattern boundaries'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 13**: Regex Golf builds directly on alternation skills from Lesson 13. The game often requires clever use of character classes and alternation to distinguish between similar strings. It also reinforces grouping concepts from Lesson 10 and teaches pattern optimization - making patterns shorter while maintaining correctness. This creative application of core regex skills develops deeper intuition for how patterns behave.'
      }
    ],
    exercise: {
      id: 'ex-bonus-1',
      instruction: 'Match: "cat", "car", "can" | Don\'t match: "dog", "cut", "cab". Find the shortest pattern!',
      pattern: 'ca[tnr]',
      testCases: [
        { input: 'cat', shouldMatch: true, explanation: 'Matches!' },
        { input: 'car', shouldMatch: true, explanation: 'Matches!' },
        { input: 'can', shouldMatch: true, explanation: 'Matches!' },
        { input: 'dog', shouldMatch: false, explanation: 'Rejected - not in set' },
        { input: 'cut', shouldMatch: false, explanation: 'Rejected - u not in [tnr]' },
        { input: 'cab', shouldMatch: false, explanation: 'Rejected - b not in [tnr]' },
        { input: 'ca', shouldMatch: false, explanation: 'Too short' },
        { input: 'cats', shouldMatch: true, explanation: 'Matches "cat" as substring' },
        { input: 'c', shouldMatch: false, explanation: 'Too short - only 1 character' },
        { input: 'caaa', shouldMatch: false, explanation: 'Third char a not in [tnr]' },
        { input: 'ca ', shouldMatch: false, explanation: 'Space at end not in [tnr]' }
      ],
      hints: [
        'All matches start with "ca"',
        'The last character varies: t, r, n',
        'Use a character class for the last letter',
        'ca[tnr] is 6 characters - can you do better?'
      ]
    },
    estimatedMinutes: 15,
    topics: ['regex golf', 'character classes', 'pattern optimization']
  },
  {
    id: 'bonus-2',
    slug: 'palindrome-simple',
    title: 'Simple Palindromes',
    description: 'Match short palindromes (2-4 characters) that read the same forward and backward.',
    tier: 'advanced',
    order: 102,
    prerequisites: ['12'],
    content: [
      {
        type: 'text',
        content: 'A palindrome reads the same forward and backward. Regex can match short palindromes using backreferences!'
      },
      {
        type: 'example',
        content: 'Two-character palindromes',
        code: '^(.)\\1$',
        explanation: 'Captures one character in group 1, then \\1 matches the same character. Matches "aa", "bb", "11" but not "ab".'
      },
      {
        type: 'example',
        content: 'Three-character palindromes',
        code: '^(.)(.)\\1$',
        explanation: 'First and last characters match (both are \\1), middle can be anything (\\2). Matches "aba", "12321", "wow".'
      },
      {
        type: 'example',
        content: 'Four-character palindromes',
        code: '^(.)(.)\\2\\1$',
        explanation: 'First matches fourth (\\1), second matches third (\\2). Matches "abba", "12321" no wait that\'s 5 chars... matches "abba", "1221", "noon".'
      },
      {
        type: 'text',
        content: 'For longer palindromes, you\'d need more groups. But this gets unwieldy quickly - regex isn\'t the best tool for general palindrome detection!'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• DNA sequence analysis: Find palindromic sequences in genetic code\n• Word games: Validate palindrome words in puzzles and quizzes\n• Text analysis: Detect palindromic patterns in literature or code\n• Cryptography: Some encryption schemes use palindromic properties\n• Pattern recognition: Identify symmetric structures in data\n• Educational tools: Teach recursion and symmetry concepts'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 12**: Palindromes are a direct application of backreferences from Lesson 12. The pattern `^(.)(.)\\1$` for 3-character palindromes uses capturing groups and backreferences (`\\1`) to enforce that the first and last characters match. This creative application demonstrates how backreferences can match repeated patterns at arbitrary distances, not just immediate duplicates. It\'s a fun way to master the backreference syntax introduced in Lesson 12.'
      }
    ],
    exercise: {
      id: 'ex-bonus-2',
      instruction: 'Match 3-character palindromes like "aba", "bob", "121". First and last character must be the same.',
      pattern: '^(.)(.)\\1$',
      testCases: [
        { input: 'aba', shouldMatch: true, explanation: 'Palindrome! a...a' },
        { input: 'bob', shouldMatch: true, explanation: 'Palindrome! b...b' },
        { input: '121', shouldMatch: true, explanation: 'Palindrome! 1...1' },
        { input: 'aaa', shouldMatch: true, explanation: 'Palindrome! all same' },
        { input: 'abc', shouldMatch: false, explanation: 'Not a palindrome' },
        { input: 'ab', shouldMatch: false, explanation: 'Only 2 characters' },
        { input: 'abca', shouldMatch: false, explanation: '4 characters' },
        { input: 'Abb', shouldMatch: false, explanation: 'A != b (case-sensitive)' },
        { input: ' a ', shouldMatch: true, explanation: 'Space-space palindrome' },
        { input: 'a a', shouldMatch: true, explanation: 'a-space-a palindrome' },
        { input: 'a1a', shouldMatch: true, explanation: 'Digit in middle palindrome' },
        { input: 'A1A', shouldMatch: true, explanation: 'Uppercase with digit palindrome' }
      ],
      hints: [
        'Use ^ and $ to match entire string',
        'Capture first character: (.)',
        'Capture middle character: (.)',
        'Reference first character: \\1'
      ]
    },
    estimatedMinutes: 20,
    topics: ['backreferences', 'palindromes', 'capturing groups']
  },
  {
    id: 'bonus-3',
    slug: 'match-abba',
    title: 'The ABBA Pattern',
    description: 'Match strings with the ABBA pattern - first half mirrors second half.',
    tier: 'advanced',
    order: 103,
    prerequisites: ['12'],
    content: [
      {
        type: 'text',
        content: 'The ABBA pattern appears in music, words, and sequences. It means the pattern reverses itself: AB-BA.'
      },
      {
        type: 'example',
        content: 'ABBA patterns',
        code: '^(.+)(.+)(\\2)(\\1)$',
        explanation: 'Matches strings like "helloWorldWorldhello" where the second half mirrors the first. Group 1 = "hello", Group 2 = "World".'
      },
      {
        type: 'text',
        content: 'This is similar to palindromes, but with multi-character segments instead of single characters.'
      },
      {
        type: 'example',
        content: 'Simpler ABBA',
        code: '^(.+)(\\1)$',
        explanation: 'Actually this is just repetition, not ABBA. True ABBA needs two distinct parts that swap: abba, deadheat, etc.'
      },
      {
        type: 'text',
        content: 'In the word "abracadabra" you see the pattern: "abr" ... "a" ... "cada" ... "bra"? No, that\'s not quite it. Better example: "museum" where you see nothing. Actually ABBA the band name is the perfect example: A-B-B-A!'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Music analysis: Detect ABBA structures in musical compositions\n• Data compression: Identify repeating patterns for efficient encoding\n• Palindrome variants: Find ABBA patterns as a palindrome subclass\n• Symmetry detection: Discover mirrored segments in sequences\n• Code refactoring: Spot duplicated code blocks with slight variations\n• Pattern matching competitions: Creative challenges in regex tournaments'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 12**: The ABBA pattern is an advanced application of backreferences from Lesson 12. While simple palindromes (Bonus 2) used `\\1` to match single characters, ABBA uses multiple groups (`\\1`, `\\2`) to match multi-character segments in mirrored positions. The pattern `^(.+)(.+)(\\2)(\\1)$` demonstrates nested capturing and referencing in complex ways, pushing backreference skills beyond basic duplication detection.'
      }
    ],
    exercise: {
      id: 'ex-bonus-3',
      instruction: 'Match strings like "abcXYZXYZabc" where the pattern is A-B-B-A. First segment appears at start and end, second segment appears twice in the middle.',
      pattern: '^(.+)(.+)(\\2)(\\1)$',
      testCases: [
        { input: 'abba', shouldMatch: true, explanation: 'a + b + b + a = ABBA!' },
        { input: 'abcXYZXYZabc', shouldMatch: true, explanation: 'abc + XYZ + XYZ + abc' },
        { input: 'helloWorldWorldhello', shouldMatch: true, explanation: 'hello + World + World + hello' },
        { input: 'ABBA', shouldMatch: true, explanation: 'A + B + B + A (uppercase)' },
  { input: 'abcabc', shouldMatch: false, explanation: 'Not an ABBA pattern (needs A+B+B+A form)' },
  { input: 'abcd', shouldMatch: false, explanation: 'No ABBA pattern' },
  { input: 'abab', shouldMatch: false, explanation: 'Not ABBA (a+b+b+a would be "abba")' },
  { input: 'aaa', shouldMatch: false, explanation: 'Odd length, cannot be ABBA' },
  { input: 'abcba', shouldMatch: false, explanation: 'This is a palindrome, not ABBA (odd length)' },
  { input: 'a!b!b!a', shouldMatch: false, explanation: 'Not ABBA (length mismatch)' },
  { input: 'a b b a', shouldMatch: false, explanation: 'Spaces make length odd, not ABBA' },
  { input: 'abbaabba', shouldMatch: false, explanation: 'Pattern limitation: greedy matching fails for longer ABBA strings' }
      ],
      hints: [
        'Use ^ and $ anchors',
        'Capture first segment: (.+)',
        'Capture second segment: (.+)',
        'Second segment appears twice: \\2\\2? No, \\2 appears once',
        'Wait: A-B-B-A means \\1, \\2, \\2, \\1'
      ]
    },
    estimatedMinutes: 25,
    topics: ['backreferences', 'pattern recognition', 'ABBA structure']
  },
  {
    id: 'bonus-4',
    slug: 'matching-comments',
    title: 'Match Code Comments',
    description: 'Extract single-line and multi-line comments from code. Handle different programming languages.',
    tier: 'advanced',
    order: 104,
    prerequisites: ['7', '8'],
    content: [
      {
        type: 'text',
        content: 'Comments come in different flavors: // single-line, /* multi-line */, # Python-style. Each needs a different pattern.'
      },
      {
        type: 'example',
        content: 'Single-line comments (//)',
        code: '//.*',
        explanation: 'Matches // followed by anything until end of line. The . doesn\'t match newlines by default, so this stops at line end.'
      },
      {
        type: 'example',
        content: 'Multi-line comments (/* */)',
        code: '/\\*[\\s\\S]*?\\*/',
        explanation: '[\\s\\S] matches any character including newlines. The ? makes *? lazy (non-greedy) so it matches the FIRST closing */, not the last.'
      },
      {
        type: 'example',
        content: 'Python comments (#)',
        code: '#.*',
        explanation: 'Simple: hash followed by anything. Works for shell scripts too.'
      },
      {
        type: 'text',
        content: 'Caution: These patterns can fail on edge cases like comment delimiters inside strings. For production parsers, use proper parsers, not regex.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Code analysis tools: Extract comments for documentation generators\n• Comment stripping: Remove comments before minification or obfuscation\n• Security scanning: Detect suspicious comments containing passwords or keys\n• Documentation extraction: Pull TODOs and FIXMEs for technical debt tracking\n• Code metrics: Count comment-to-code ratios for quality assessment\n• Legacy code understanding: Extract historical comments when documenting old systems'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 8**: Matching comments builds on greedy vs lazy matching from Lesson 8. The pattern `/\\*[\\s\\S]*?\\*/` uses lazy quantifier `*?` to match the shortest possible comment rather than consuming everything until the last `*/`. This also uses the `[\\s\\S]` trick to match any character including newlines, combining character class knowledge from Lesson 7 with quantifiers from Lesson 6. It\'s a practical application that demonstrates why lazy matching matters in real parsing scenarios.'
      }
    ],
    exercise: {
      id: 'ex-bonus-4',
      instruction: 'Match JavaScript multi-line comments /* like this */. The comment can span multiple lines. Use lazy matching to handle multiple comments.',
      pattern: '/\\*[\\s\\S]*?\\*/',
      testCases: [
        { input: '/* comment */', shouldMatch: true, explanation: 'Simple single-line comment' },
        { input: '/* multi\nline\ncomment */', shouldMatch: true, explanation: 'Multi-line comment' },
        { input: '/* first */ code /* second */', shouldMatch: true, explanation: 'Matches first comment (lazy)' },
        { input: '// not a block comment', shouldMatch: false, explanation: 'Single-line comment, not matched' },
        { input: 'no comment here', shouldMatch: false, explanation: 'No comment' },
        { input: '/** Documentation */', shouldMatch: true, explanation: 'JSDoc style' },
        { input: '/**\n * Multi-line JSDoc\n */', shouldMatch: true, explanation: 'Multi-line JSDoc' },
        { input: '/* unclosed comment', shouldMatch: false, explanation: 'Missing closing */' },
        { input: 'let x = "/* not a comment */";', shouldMatch: true, explanation: 'WARNING: False positive! String contains comment syntax' },
        { input: '/**/', shouldMatch: true, explanation: 'Empty comment' },
        { input: '/* *** */', shouldMatch: true, explanation: 'Asterisks inside comment' },
        { input: '/* outer /* inner */ outer */', shouldMatch: true, explanation: 'Nested comment - lazy matches first */' }
      ],
      hints: [
        'Start with /\\* (escaped asterisk)',
        'Use [\\s\\S] to match any character including newlines',
        'Make it lazy with *? to match shortest possible',
        'End with \\*/ (escaped closing)'
      ]
    },
    estimatedMinutes: 20,
    topics: ['comments', 'lazy matching', '[\\s\\S] trick', 'code parsing']
  },
  {
    id: 'bonus-5',
    slug: 'markdown-links',
    title: 'Parse Markdown Links',
    description: 'Extract links from Markdown text: [text](url). Handle edge cases like nested brackets.',
    tier: 'advanced',
    order: 105,
    prerequisites: ['10'],
    content: [
      {
        type: 'text',
        content: 'Markdown links have the format [link text](url). Regex can extract both the text and URL components.'
      },
      {
        type: 'example',
        content: 'Basic Markdown link',
        code: '\\[([^\\]]+)\\]\\(([^)]+)\\)',
        explanation: 'Group 1 captures link text, Group 2 captures URL. Escaped brackets \\[ \\] and parentheses \\( \\) match the literal characters.'
      },
      {
        type: 'text',
        content: 'The text part can contain almost anything except ]. The URL part should not contain ) but might in real markdown.'
      },
      {
        type: 'example',
        content: 'Markdown link with title',
        code: '\\[([^\\]]+)\\]\\(([^)\\s]+)(?:\\s+"([^"]+)")?\\)',
        explanation: 'Also captures optional title: [text](url "title"). Group 3 gets the title if present.'
      },
      {
        type: 'text',
        content: 'For full Markdown parsing, use a proper parser. Regex works for simple cases but fails on edge cases like escaped brackets or nested links.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Content scrapers: Extract links from Markdown documentation or blogs\n• Link validation: Check that all Markdown links have valid URLs\n• Documentation processors: Convert Markdown to HTML with proper link handling\n• SEO analysis: Crawl Markdown-based sites and extract internal/external links\n• Static site generators: Process Markdown frontmatter and content\n• Migration tools: Convert Markdown links during platform migrations'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 10**: Markdown link parsing demonstrates advanced capturing groups from Lesson 10, using multiple groups to extract both link text and URL. The pattern `\\[([^\\]]+)\\]\\(([^)]+)\\)` uses nested capturing groups and escaping (Lesson 7) to handle the special Markdown syntax. This builds on all previous grouping skills and shows how regex can parse semi-structured text formats, though Lesson 4\'s caution about regex for full parsing still applies.'
      }
    ],
    exercise: {
      id: 'ex-bonus-5',
      instruction: 'Match Markdown links and capture the link text and URL. Example: [Google](https://google.com) → text="Google", url="https://google.com"',
      pattern: '\\[([^\\]]+)\\]\\(([^)]+)\\)',
      testCases: [
        { input: '[Google](https://google.com)', shouldMatch: true, explanation: 'Captures: Google, https://google.com' },
        { input: '[OpenAI](https://openai.com)', shouldMatch: true, explanation: 'Captures: OpenAI, https://openai.com' },
        { input: 'Check [this link](https://example.com) here', shouldMatch: true, explanation: 'Link in text' },
        { input: '[multi word link](https://example.com/path)', shouldMatch: true, explanation: 'Text with spaces' },
        { input: '[](https://empty-text.com)', shouldMatch: false, explanation: 'Empty text not allowed (pattern requires at least one character)' },
        { input: '[text only]', shouldMatch: false, explanation: 'Missing URL part' },
        { input: '(https://no-text.com)', shouldMatch: false, explanation: 'Missing text part' },
        { input: '[nested [brackets]](https://fail.com)', shouldMatch: false, explanation: 'Nested brackets break simple pattern' },
        { input: '[text](url with spaces)', shouldMatch: true, explanation: 'URL with spaces (matches up to first )' },
        { input: '[text]()', shouldMatch: false, explanation: 'Empty URL - requires at least one character' },
        { input: '[text!@#$%](https://example.com)', shouldMatch: true, explanation: 'Special characters in link text' },
        { input: '[text](https://example.com/path(with parens))', shouldMatch: true, explanation: 'URL with parentheses - matches up to first ) (limitation)' }
      ],
      hints: [
        'Escape brackets: \\[ and \\]',
        'Escape parentheses: \\( and \\)',
        'Text: [^\\]]+ (anything except ])',
        'URL: [^)]+ (anything except ))'
      ]
    },
    estimatedMinutes: 20,
    topics: ['Markdown', 'parsing', 'escaping', 'capturing groups']
  },
  {
    id: 'bonus-6',
    slug: 'emoji-patterns',
    title: 'Match Emojis',
    description: 'Match emojis in text. Handle Unicode characters and emoji sequences.',
    tier: 'advanced',
    order: 106,
    prerequisites: ['15'],
    content: [
      {
        type: 'text',
        content: 'Emojis are Unicode characters. In modern regex with the u flag, you can match them using Unicode property escapes or ranges.'
      },
      {
        type: 'example',
        content: 'Basic emoji matching',
        code: '/\\p{Emoji}/u',
        explanation: 'With u flag, \\p{Emoji} matches any emoji character. This includes simple emojis and emoji components.'
      },
      {
        type: 'example',
        content: 'Match specific emojis',
        code: '[😀-🙏]',
        explanation: 'Matches emojis in a Unicode range. This catches many common emojis but not all. Ranges are approximate.'
      },
      {
        type: 'text',
        content: 'Emojis can be complex: skin tone modifiers (👋🏽), ZWJ sequences (👨‍👩‍👧‍👦), flags (🇺🇸). These are multiple code points acting as one visual emoji.'
      },
      {
        type: 'example',
        content: 'Match flag emojis',
        code: '\\p{Regional_Indicator}{2}',
        explanation: 'Flags are two regional indicator letters. 🇺🇸 is \\p{Regional_Indicator} twice (U + S).'
      },
      {
        type: 'text',
        content: 'For production, consider libraries that handle emoji complexity. Regex can match them but the rules are intricate.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Social media analytics: Count emoji usage in posts for sentiment analysis\n• Chat applications: Filter or highlight emojis in messaging interfaces\n• Content moderation: Detect inappropriate emoji sequences\n• International UX: Ensure emoji render correctly across platforms\n• Data visualization: Create emoji-based metrics dashboards\n• Accessibility: Convert emojis to text descriptions for screen readers'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 15**: Emoji matching directly applies Unicode property escapes (`\\p{Emoji}`) from Lesson 15\'s Unicode section. This demonstrates how Unicode mode (the `u` flag) enables matching international characters beyond basic ASCII. The lesson also touches on performance considerations when dealing with complex Unicode sequences, connecting back to Lesson 15\'s optimization tips. It\'s a practical application showing regex\'s power with modern international text.'
      }
    ],
  exercise: {
  id: 'ex-bonus-6',
  instruction: 'Match single emojis using Unicode property escapes. Use the u flag. Match emojis like 😀, 🎉, 🚀.',
  pattern: '\\p{Emoji}',
  flags: 'u',
  testCases: [
        { input: '😀', shouldMatch: true, explanation: 'Emoji matches' },
        { input: '🎉', shouldMatch: true, explanation: 'Party emoji' },
        { input: '🚀', shouldMatch: true, explanation: 'Rocket emoji' },
        { input: 'Hello 🌍!', shouldMatch: true, explanation: 'Emoji in text' },
        { input: 'Hello', shouldMatch: false, explanation: 'No emoji' },
    { input: '123', shouldMatch: true, explanation: 'Digits are emojis in Unicode (digits have emoji representations)' },
    { input: '👋🏽', shouldMatch: true, explanation: 'Emoji with skin tone (matches first part)' },
    { input: '🇺🇸', shouldMatch: true, explanation: 'Flag emoji (matches first regional indicator)' },
    { input: '👨\u200d👩\u200d👧\u200d👦', shouldMatch: true, explanation: 'Family emoji (ZWJ sequence - matches each emoji part)' },
    { input: '☀️', shouldMatch: true, explanation: 'Sun emoji with variation selector' },
    { input: '©', shouldMatch: true, explanation: 'Copyright symbol is technically an emoji in Unicode' }
      ],
      hints: [
        'Use \\p{Emoji} with u flag',
        'This matches emoji characters',
        'Note: digits are technically emojis in Unicode',
        'For stricter matching, you might need \\p{Emoji_Presentation}'
      ]
    },
    estimatedMinutes: 15,
    topics: ['Unicode', 'emojis', '\\p{} property escapes', 'u flag']
  },
  {
    id: 'bonus-7',
    slug: 'secret-messages',
    title: 'Hidden Messages',
    description: 'Find secret messages hidden in text using patterns. Decoding challenges.',
    tier: 'advanced',
    order: 107,
    prerequisites: ['10'],
    content: [
      {
        type: 'text',
        content: 'Sometimes messages are hidden in plain sight. Regex can extract patterns that reveal hidden content.'
      },
      {
        type: 'example',
        content: 'Capitals spell a word',
        code: '[A-Z]',
        explanation: 'Extract all uppercase letters: "Hello Every One" → "HEO". The capitals might spell a hidden message.'
      },
      {
        type: 'example',
        content: 'First letter of each word',
        code: '\\b\\w',
        explanation: 'Matches the first character of each word. "Help Everyone Leave" → "HEL". Combine all matches to get the message.'
      },
      {
        type: 'example',
        content: 'Every Nth character',
        code: '.(.).(.).(.).',
        explanation: 'Captures every other character. Use this to extract characters at specific positions.'
      },
      {
        type: 'text',
        content: 'Regex is a powerful tool for cryptanalysis and pattern extraction. Combine with programming for complex decoding.'
      },
      {
        type: 'text',
        content: '**Real-world use cases:**\n• Steganography: Extract hidden messages from text carriers\n• Forensic analysis: Find concealed data in seized documents\n• Puzzle games: Create and solve regex-based escape rooms\n• CTF challenges: Capture the flag competitions often use hidden message patterns\n• Data recovery: Extract meaningful patterns from corrupted or obfuscated data\n• Educational puzzles: Teach pattern recognition through games'
      },
      {
        type: 'text',
        content: '**Connection to Lesson 10**: Hidden message extraction showcases advanced capturing group techniques from Lesson 10, particularly using word boundaries (`\\b`) and character classes to isolate specific characters. The pattern `[A-Z]` for capitals is simple, but combined with Lesson 12\'s backreferences and Lesson 14\'s lookarounds, you can create sophisticated extraction patterns. This creative application demonstrates regex\'s power beyond typical validation into the realm of pattern discovery and decoding.'
      }
    ],
    exercise: {
      id: 'ex-bonus-7',
      instruction: 'Match all uppercase letters in a string. We\'ll use this to extract a hidden message from the capitals.',
      pattern: '[A-Z]',
      testCases: [
        { input: 'Hello World', shouldMatch: true, explanation: 'Matches H and W' },
        { input: 'Secret Message Hidden Here', shouldMatch: true, explanation: 'Matches S, M, H, H' },
        { input: 'lowercase only', shouldMatch: false, explanation: 'No uppercase letters' },
        { input: 'ALL CAPS', shouldMatch: true, explanation: 'Matches all letters' },
        { input: 'CamelCaseExample', shouldMatch: true, explanation: 'Matches C, C, E' },
        { input: '123ABC', shouldMatch: true, explanation: 'Matches A, B, C' },
        { input: 'UPPER lower UPPER', shouldMatch: true, explanation: 'Matches UPPER and UPPER' },
        { input: 'aBcDeF', shouldMatch: true, explanation: 'Matches B, D, F' },
        { input: 'ÁÉÍÓÚ', shouldMatch: false, explanation: 'Accented uppercase not in ASCII [A-Z]' },
        { input: 'A.B!C?', shouldMatch: true, explanation: 'Uppercase with punctuation' },
        { input: 'A1B2C3', shouldMatch: true, explanation: 'Alphanumeric uppercase sequence' }
      ],
      hints: [
        'Use [A-Z] to match uppercase',
        'This is a character class',
        'It will match each uppercase letter separately',
        'The pattern is simple: [A-Z]'
      ]
    },
    estimatedMinutes: 10,
    topics: ['cryptanalysis', 'hidden messages', 'uppercase', 'extraction']
  }
]
