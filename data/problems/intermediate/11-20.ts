/**
 * Intermediate Practice Problems 11-20
 */

import type { PracticeProblem } from '@/types/practice'

export const intermediateProblems: PracticeProblem[] = [
  {
    id: '11',
    slug: 'three-digit-code',
    title: 'Three-Digit Code',
    description: 'Write a pattern that matches exactly 3 digits. This could represent a simple area code or verification code.',
    difficulty: 'intermediate',
    relatedLessons: ['6'],
    testCases: [
      { id: 'tc1', input: '123', shouldMatch: true, expectedGroups: [], explanation: 'Exactly 3 digits' },
      { id: 'tc2', input: '12', shouldMatch: false, expectedGroups: [], explanation: 'Only 2 digits' },
      { id: 'tc3', input: '1234', shouldMatch: true, expectedGroups: [], explanation: 'Matches first 3 digits "123"' },
      { id: 'tc4', input: 'abc123def', shouldMatch: true, expectedGroups: [], explanation: 'Matches "123" within text' },
      { id: 'tc5', input: '1', shouldMatch: false, expectedGroups: [], explanation: 'Only 1 digit' },
      { id: 'tc6', input: '999', shouldMatch: true, expectedGroups: [], explanation: 'Any 3 digits work' },
      { id: 'tc7', input: '007', shouldMatch: true, expectedGroups: [], explanation: 'Leading zeros are valid' },
      { id: 'tc8', input: 'abc123def456', shouldMatch: true, expectedGroups: [], explanation: 'Multiple 3-digit sequences, matches first' },
      { id: 'tc9', input: '123123', shouldMatch: true, expectedGroups: [], explanation: 'Repeated 3-digit sequence' },
      { id: 'tc10', input: '(123)', shouldMatch: true, expectedGroups: [], explanation: '3 digits within parentheses' },
      { id: 'tc11', input: ' 123 ', shouldMatch: true, expectedGroups: [], explanation: 'Whitespace around 3 digits' },
      { id: 'tc12', input: 'x123y', shouldMatch: true, expectedGroups: [], explanation: '3 digits embedded between non-word chars' }
    ],
    hints: [
      'Use \\d to match a digit',
      'Specify exactly 3 repetitions',
      'Try: \\d{3}'
    ],
    solution: '\\d{3}',
    explanation: '\\d{3} matches exactly three consecutive digits. The {3} quantifier specifies the exact count.',
    topics: ['fixed repetition', 'exact count', '\\d{3}']
  },
  {
    id: '12',
    slug: 'word-with-digits',
    title: 'Word with Digits',
    description: 'Write a pattern that matches a word that contains at least one digit. The word can have letters and digits mixed.',
    difficulty: 'intermediate',
    relatedLessons: ['7'],
    testCases: [
      { id: 'tc1', input: 'test123', shouldMatch: true, expectedGroups: [], explanation: 'Word with digits at end' },
      { id: 'tc2', input: 'user_99', shouldMatch: true, expectedGroups: [], explanation: 'Underscore and digits' },
      { id: 'tc3', input: 'hello', shouldMatch: false, expectedGroups: [], explanation: 'No digits' },
      { id: 'tc4', input: '12345', shouldMatch: true, expectedGroups: [], explanation: 'All digits is also a word' },
      { id: 'tc5', input: 'a1b2c3', shouldMatch: true, expectedGroups: [], explanation: 'Mixed letters and digits' },
      { id: 'tc6', input: 'user.name', shouldMatch: false, expectedGroups: [], explanation: 'Dot is not a word character' },
      { id: 'tc7', input: '123abc', shouldMatch: true, expectedGroups: [], explanation: 'Digits at start of word' },
      { id: 'tc8', input: '1', shouldMatch: true, expectedGroups: [], explanation: 'Single digit word (minimal match)' },
      { id: 'tc9', input: 'test-123', shouldMatch: true, expectedGroups: [], explanation: 'Hyphen separates words, matches "123"' },
      { id: 'tc10', input: 'test_user', shouldMatch: false, expectedGroups: [], explanation: 'Underscores but no digit' },
      { id: 'tc11', input: 'a1b2c3d4e5', shouldMatch: true, expectedGroups: [], explanation: 'Multiple digits interleaved with letters' },
      { id: 'tc12', input: '', shouldMatch: false, expectedGroups: [], explanation: 'Empty string has no digit' }
    ],
    hints: [
      'Use \\w to match word characters',
      'Add + to match one or more',
      'But \\w+ alone would match pure letters too',
      'Think: word characters that include digits',
      'Try: \\w+\\d+\\w* or similar'
    ],
    solution: '\\w*\\d\\w*',
    explanation: '\\w*\\d\\w* matches zero or more word characters, then at least one digit, then zero or more word characters. This ensures at least one digit is present.',
    topics: ['word characters', 'digit inclusion', 'mixed patterns']
  },
  {
    id: '13',
    slug: 'filename-extension',
    title: 'Filename with Extension',
    description: 'Write a pattern that matches a filename with a .txt extension. The filename can be any word characters. Example: "notes.txt"',
    difficulty: 'intermediate',
    relatedLessons: ['7', '8'],
    testCases: [
      { id: 'tc1', input: 'notes.txt', shouldMatch: true, expectedGroups: [], explanation: 'Valid filename' },
      { id: 'tc2', input: 'file123.txt', shouldMatch: true, expectedGroups: [], explanation: 'Filename with digits' },
      { id: 'tc3', input: 'readme', shouldMatch: false, expectedGroups: [], explanation: 'Missing extension' },
      { id: 'tc4', input: 'document.pdf', shouldMatch: false, expectedGroups: [], explanation: 'Wrong extension' },
      { id: 'tc5', input: 'my_file.txt', shouldMatch: true, expectedGroups: [], explanation: 'Underscore is part of \\w (word characters)' },
      { id: 'tc6', input: 'a.txt', shouldMatch: true, expectedGroups: [], explanation: 'Short filename works' },
      { id: 'tc7', input: '123.txt', shouldMatch: true, expectedGroups: [], explanation: 'Digits-only filename is valid' },
      { id: 'tc8', input: 'FILE.TXT', shouldMatch: false, expectedGroups: [], explanation: 'Uppercase extension does not match' },
      { id: 'tc9', input: 'file.name.txt', shouldMatch: true, expectedGroups: [], explanation: 'Multiple dots, contains valid "name.txt" substring' },
      { id: 'tc10', input: 'file..txt', shouldMatch: false, expectedGroups: [], explanation: 'Consecutive dots, no valid filename before .txt' },
      { id: 'tc11', input: 'archive.tar.txt', shouldMatch: true, expectedGroups: [], explanation: 'Compound extension, contains valid "tar.txt" substring' },
      { id: 'tc12', input: '.txt', shouldMatch: false, expectedGroups: [], explanation: 'Missing filename before dot' }
    ],
    hints: [
      'Match word characters for the filename',
      'Escape the dot before txt',
      'Use \\w+ for filename',
      'Try: \\w+\\.txt'
    ],
    solution: '\\w+\\.txt',
    explanation: '\\w+\\.txt matches one or more word characters followed by a literal dot and "txt". The dot must be escaped to match a literal period.',
    topics: ['escaping', 'dot literal', 'file extensions']
  },
  {
    id: '14',
    slug: 'optional-www',
    title: 'URL with Optional WWW',
    description: 'Write a pattern that matches a simple URL with optional "www." prefix. Example: "www.example.com" or "example.com"',
    difficulty: 'intermediate',
    relatedLessons: ['8'],
    testCases: [
      { id: 'tc1', input: 'www.example.com', shouldMatch: true, expectedGroups: [], explanation: 'With www' },
      { id: 'tc2', input: 'example.com', shouldMatch: true, expectedGroups: [], explanation: 'Without www' },
      { id: 'tc3', input: 'wwwtest.com', shouldMatch: false, expectedGroups: [], explanation: 'Missing dot after www' },
      { id: 'tc4', input: 'www', shouldMatch: false, expectedGroups: [], explanation: 'Just www, no domain' },
      { id: 'tc5', input: 'example.org', shouldMatch: false, expectedGroups: [], explanation: 'Wrong TLD' },
      { id: 'tc6', input: 'www.example.org', shouldMatch: false, expectedGroups: [], explanation: 'Wrong TLD' },
      { id: 'tc7', input: 'WWW.EXAMPLE.COM', shouldMatch: false, expectedGroups: [], explanation: 'Case sensitivity: uppercase www' },
      { id: 'tc8', input: 'www.EXAMPLE.COM', shouldMatch: false, expectedGroups: [], explanation: 'Case sensitivity: uppercase domain' },
      { id: 'tc9', input: 'example.COM', shouldMatch: false, expectedGroups: [], explanation: 'Case sensitivity: uppercase TLD' },
  { id: 'tc10', input: 'www.example.com ', shouldMatch: true, expectedGroups: [], explanation: 'Matches "www.example.com" as substring' },
  { id: 'tc11', input: 'example.com.', shouldMatch: true, expectedGroups: [], explanation: 'Matches "example.com" as substring' },
  { id: 'tc12', input: 'http://example.com', shouldMatch: true, expectedGroups: [], explanation: 'Matches "example.com" as substring' }
    ],
    hints: [
      'Use a non-capturing group for www.',
      'Make it optional with ?',
      'Then match example.com',
      'Try: (?:www\\.)?example\\.com'
    ],
    solution: '(?:www\\.)?example\\.com',
    explanation: '(?:www\\.)?example\\.com matches "example.com" optionally preceded by "www.". The non-capturing group makes the www. optional.',
    topics: ['optional groups', 'non-capturing groups', 'URL patterns']
  },
  {
    id: '15',
    slug: 'end-with-digit',
    title: 'Ends With Digit',
    description: 'Write a pattern using an anchor that matches strings ending with a digit.',
    difficulty: 'intermediate',
    relatedLessons: ['9'],
    testCases: [
      { id: 'tc1', input: 'test1', shouldMatch: true, expectedGroups: [], explanation: 'Ends with digit 1' },
      { id: 'tc2', input: 'abc123', shouldMatch: true, expectedGroups: [], explanation: 'Ends with digit 3' },
      { id: 'tc3', input: '123abc', shouldMatch: false, expectedGroups: [], explanation: 'Ends with letter, not digit' },
      { id: 'tc4', input: 'hello', shouldMatch: false, expectedGroups: [], explanation: 'No digit at end' },
      { id: 'tc5', input: 'test9', shouldMatch: true, expectedGroups: [], explanation: 'Ends with digit 9' },
      { id: 'tc6', input: 'a1', shouldMatch: true, expectedGroups: [], explanation: 'Short string ending with digit' },
      { id: 'tc7', input: '1', shouldMatch: true, expectedGroups: [], explanation: 'Single digit string' },
      { id: 'tc8', input: ' 123', shouldMatch: true, expectedGroups: [], explanation: 'Leading whitespace, still ends with digit' },
      { id: 'tc9', input: '123 ', shouldMatch: false, expectedGroups: [], explanation: 'Trailing space - digit is not at end' },
      { id: 'tc10', input: '123\n', shouldMatch: false, expectedGroups: [], explanation: '$ does not match before newline without multiline flag' },
      { id: 'tc11', input: '123a', shouldMatch: false, expectedGroups: [], explanation: 'Ends with letter, not digit' },
      { id: 'tc12', input: '!@#1', shouldMatch: true, expectedGroups: [], explanation: 'Special characters, ends with digit' }
    ],
    hints: [
      'Use the end-of-line anchor',
      'Match a digit before the anchor',
      'Try: \\d$'
    ],
    solution: '\\d$',
    explanation: '\\d$ matches a digit at the end of a string. The $ anchor asserts the end position.',
    topics: ['end anchor', '$ anchor', 'position matching']
  },
  {
    id: '16',
    slug: 'date-capturing-groups',
    title: 'Date with Capturing Groups',
    description: 'Write a pattern with three capturing groups that matches a date in YYYY-MM-DD format. Groups should capture year, month, and day separately.',
    difficulty: 'intermediate',
    relatedLessons: ['10'],
    testCases: [
      { id: 'tc1', input: '2024-03-15', shouldMatch: true, expectedGroups: ['2024', '03', '15'], explanation: 'Group1=year, Group2=month, Group3=day' },
      { id: 'tc2', input: '1999-12-31', shouldMatch: true, expectedGroups: ['1999', '12', '31'], explanation: 'Another valid date' },
      { id: 'tc3', input: '24-03-15', shouldMatch: false, expectedGroups: [], explanation: 'Year must be 4 digits' },
      { id: 'tc4', input: '2024/03/15', shouldMatch: false, expectedGroups: [], explanation: 'Wrong separator' },
      { id: 'tc5', input: '2024-3-15', shouldMatch: false, expectedGroups: [], explanation: 'Month must be 2 digits' },
      { id: 'tc6', input: '2024-03-5', shouldMatch: false, expectedGroups: [], explanation: 'Day must be 2 digits' }
    ],
    hints: [
      'Create three groups with parentheses',
      'Group 1: \\d{4} for year',
      'Group 2: \\d{2} for month',
      'Group 3: \\d{2} for day',
      'Separate with hyphens',
      'Try: (\\d{4})-(\\d{2})-(\\d{2})'
    ],
    solution: '(\\d{4})-(\\d{2})-(\\d{2})',
    explanation: '(\\d{4})-(\\d{2})-(\\d{2}) captures year (4 digits), month (2 digits), and day (2 digits) in separate groups.',
    topics: ['capturing groups', 'date format', 'group extraction', 'YYYY-MM-DD']
  },
  {
    id: '17',
    slug: 'email-local-part',
    title: 'Email Local Part',
    description: 'Write a pattern that matches the local part of an email (before @). It should be word characters and dots. Example: "user.name" or "test123"',
    difficulty: 'intermediate',
    relatedLessons: ['7', '8'],
    testCases: [
      { id: 'tc1', input: 'user.name', shouldMatch: true, expectedGroups: [], explanation: 'Valid with dot' },
      { id: 'tc2', input: 'test123', shouldMatch: true, expectedGroups: [], explanation: 'Valid with digits' },
  { id: 'tc3', input: 'user..name', shouldMatch: true, expectedGroups: [], explanation: 'Matches "user" and "name" as separate sequences' },
  { id: 'tc4', input: '.username', shouldMatch: true, expectedGroups: [], explanation: 'Matches "username" as substring' },
  { id: 'tc5', input: 'username.', shouldMatch: true, expectedGroups: [], explanation: 'Matches "username" as substring' },
  { id: 'tc6', input: 'user-name', shouldMatch: true, expectedGroups: [], explanation: 'Matches "user" and "name" as separate sequences' }
    ],
    hints: [
      'Use \\w for word characters',
      'Allow dots between but not consecutive',
      'Simpler approach: \\w+(?:\\.\\w+)*',
      'Try: \\w+(?:\\.\\w+)*'
    ],
    solution: '\\w+(?:\\.\\w+)*',
    explanation: '\\w+(?:\\.\\w+)* matches one or more word characters, optionally followed by dot and more word characters repeated. This allows "user" or "user.name" or "user.name.test".',
    topics: ['optional repetition', 'non-capturing groups', 'email patterns']
  },
  {
    id: '18',
    slug: 'two-to-four-digits',
    title: 'Two to Four Digits',
    description: 'Write a pattern that matches a sequence of 2, 3, or 4 consecutive digits.',
    difficulty: 'intermediate',
    relatedLessons: ['6'],
    testCases: [
      { id: 'tc1', input: '12', shouldMatch: true, expectedGroups: [], explanation: '2 digits' },
      { id: 'tc2', input: '123', shouldMatch: true, expectedGroups: [], explanation: '3 digits' },
      { id: 'tc3', input: '1234', shouldMatch: true, expectedGroups: [], explanation: '4 digits' },
      { id: 'tc4', input: '1', shouldMatch: false, expectedGroups: [], explanation: 'Only 1 digit' },
      { id: 'tc5', input: '12345', shouldMatch: true, expectedGroups: [], explanation: 'Matches first 4 digits "1234"' },
      { id: 'tc6', input: 'a12b', shouldMatch: true, expectedGroups: [], explanation: 'Matches "12" within text' }
    ],
    hints: [
      'Use \\d for digits',
      'Specify a range with {min,max}',
      'Try: \\d{2,4}'
    ],
    solution: '\\d{2,4}',
    explanation: '\\d{2,4} matches between 2 and 4 digits inclusive. The range quantifier {2,4} specifies minimum and maximum.',
    topics: ['range quantifier', 'min-max', 'digit sequences']
  },
  {
    id: '19',
    slug: 'whole-string-digits',
    title: 'All Digits String',
    description: 'Write a pattern that matches a string consisting entirely of digits (no other characters). Use anchors.',
    difficulty: 'intermediate',
    relatedLessons: ['9', '7'],
    testCases: [
      { id: 'tc1', input: '12345', shouldMatch: true, expectedGroups: [], explanation: 'All digits' },
      { id: 'tc2', input: 'abc123', shouldMatch: false, expectedGroups: [], explanation: 'Contains letters' },
      { id: 'tc3', input: '123abc', shouldMatch: false, expectedGroups: [], explanation: 'Contains letters' },
      { id: 'tc4', input: '12 34', shouldMatch: false, expectedGroups: [], explanation: 'Contains space' },
      { id: 'tc5', input: '1', shouldMatch: true, expectedGroups: [], explanation: 'Single digit is all digits' },
      { id: 'tc6', input: '', shouldMatch: false, expectedGroups: [], explanation: 'Empty string not matched by \\d+' }
    ],
    hints: [
      'Use \\d+ to match digits',
      'Anchor at start with ^',
      'Anchor at end with $',
      'Try: ^\\d+$'
    ],
    solution: '^\\d+$',
    explanation: '^\\d+$ matches a string that starts and ends with one or more digits and contains nothing else. The anchors ensure the entire string is digits.',
    topics: ['anchors both sides', 'full string validation', '^ and $']
  },
  {
    id: '20',
    slug: 'repeated-word',
    title: 'Repeated Word',
    description: 'Write a pattern using a capturing group and backreference that matches a word repeated twice with a space. Example: "hello hello"',
    difficulty: 'intermediate',
    relatedLessons: ['12'],
    testCases: [
      { id: 'tc1', input: 'hello hello', shouldMatch: true, expectedGroups: ['hello'], explanation: 'Matches repeated "hello"' },
      { id: 'tc2', input: 'test test', shouldMatch: true, expectedGroups: ['test'], explanation: 'Matches repeated "test"' },
      { id: 'tc3', input: 'hello world', shouldMatch: false, expectedGroups: [], explanation: 'Words are different' },
      { id: 'tc4', input: 'hello', shouldMatch: false, expectedGroups: [], explanation: 'Only one word' },
      { id: 'tc5', input: 'hello  hello', shouldMatch: true, expectedGroups: ['hello'], explanation: 'Multiple spaces still match' },
      { id: 'tc6', input: 'cat cat', shouldMatch: true, expectedGroups: ['cat'], explanation: 'Any repeated word' }
    ],
    hints: [
      'Capture the first word in a group',
      'Match whitespace',
      'Reference the captured group with \\1',
      'Try: (\\w+)\\s+\\1'
    ],
    solution: '(\\w+)\\s+\\1',
    explanation: '(\\w+)\\s+\\1 captures a word in group 1, then matches whitespace, then matches the same word again using backreference \\1.',
    topics: ['backreferences', 'capturing groups', 'repeated patterns', '\\1']
  }
]
