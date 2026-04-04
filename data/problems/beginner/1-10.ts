/**
 * Beginner Practice Problems 1-10
 */

import type { PracticeProblem } from '@/types/practice'

export const beginnerProblems: PracticeProblem[] = [
  {
    id: '1',
    slug: 'match-hello',
    title: 'Match "Hello"',
    description: 'Write a pattern that matches the exact word **"Hello"** with capital H. The pattern should match "Hello" but not "hello" or "HELLO".',
    difficulty: 'beginner',
    relatedLessons: ['1'],
    testCases: [
      { id: 'tc1', input: 'Hello world', shouldMatch: true, expectedGroups: [], explanation: 'Matches **"Hello"** at the start' },
      { id: 'tc2', input: 'say Hello there', shouldMatch: true, expectedGroups: [], explanation: 'Matches "Hello" in the middle' },
      { id: 'tc3', input: 'hello', shouldMatch: false, expectedGroups: [], explanation: '*Lowercase* h does not match' },
      { id: 'tc4', input: 'HELLO', shouldMatch: false, expectedGroups: [], explanation: 'All caps does not match' },
      { id: 'tc5', input: 'HelloHello', shouldMatch: false, expectedGroups: [], explanation: 'Part of longer word does not match' },
      { id: 'tc6', input: 'Goodbye', shouldMatch: false, expectedGroups: [], explanation: 'No "Hello" present' }
    ],
    hints: [
      'Match the **exact word** with capital H',
      'Use *literal matching*',
      'Pattern: `Hello`'
    ],
    solution: 'Hello',
    explanation: 'The pattern `Hello` matches exactly that word with capital H. Regex is **case-sensitive** by default.\n\nKey points:\n- Matches the literal characters\n- Case matters in regex\n- No special characters needed',
    topics: ['literal matching', 'case sensitivity']
  },
  {
    id: '2',
    slug: 'match-any-vowel',
    title: 'Match Any Vowel',
    description: 'Write a pattern that matches any single vowel (a, e, i, o, u). The pattern should match each vowel individually.',
    difficulty: 'beginner',
    relatedLessons: ['2'],
    testCases: [
      { id: 'tc1', input: 'cat', shouldMatch: true, expectedGroups: [], explanation: 'Matches "a"' },
      { id: 'tc2', input: 'dog', shouldMatch: true, expectedGroups: [], explanation: 'Matches "o"' },
      { id: 'tc3', input: 'sky', shouldMatch: false, expectedGroups: [], explanation: 'No vowel present' },
      { id: 'tc4', input: 'aeiou', shouldMatch: true, expectedGroups: [], explanation: 'Matches each vowel separately' },
      { id: 'tc5', input: 'xyz', shouldMatch: false, expectedGroups: [], explanation: 'No vowels in this set' },
      { id: 'tc6', input: 'beautiful', shouldMatch: true, expectedGroups: [], explanation: 'Matches all vowels: e, a, u, i, u' }
    ],
    hints: [
      'Use a character class',
      'Put all vowels inside square brackets',
      'Try: [aeiou]'
    ],
    solution: '[aeiou]',
    explanation: 'The character class [aeiou] matches any single vowel. Each vowel in the string will be matched separately.',
    topics: ['character classes', 'vowels', 'square brackets']
  },
  {
    id: '3',
    slug: 'match-digit-shorthand',
    title: 'Match a Digit',
    description: 'Write a pattern using shorthand that matches any single digit (0-9).',
    difficulty: 'beginner',
    relatedLessons: ['3'],
    testCases: [
      { id: 'tc1', input: 'a1b', shouldMatch: true, expectedGroups: [], explanation: 'Matches "1"' },
      { id: 'tc2', input: '123', shouldMatch: true, expectedGroups: [], explanation: 'Matches each digit individually' },
      { id: 'tc3', input: 'abc', shouldMatch: false, expectedGroups: [], explanation: 'No digits present' },
      { id: 'tc4', input: '9', shouldMatch: true, expectedGroups: [], explanation: 'Single digit matches' },
      { id: 'tc5', input: 'a b', shouldMatch: false, expectedGroups: [], explanation: 'Space is not a digit' },
      { id: 'tc6', input: '0', shouldMatch: true, expectedGroups: [], explanation: 'Zero is a digit' }
    ],
    hints: [
      'Use the digit shorthand',
      'Backslash followed by d',
      'Try: \\d'
    ],
    solution: '\\d',
    explanation: 'The shorthand \\d matches any digit from 0 to 9. It is equivalent to [0-9] but shorter.',
    topics: ['\\d', 'digit shorthand', 'predefined character classes']
  },
  {
    id: '4',
    slug: 'dot-wildcard-three-letters',
    title: 'Three-Letter Pattern with Dot',
    description: 'Write a pattern using the dot wildcard that matches any three-letter word starting with "c" and ending with "t".',
    difficulty: 'beginner',
    relatedLessons: ['4'],
    testCases: [
      { id: 'tc1', input: 'cat', shouldMatch: true, expectedGroups: [], explanation: 'Matches "c" + "a" + "t"' },
      { id: 'tc2', input: 'cot', shouldMatch: true, expectedGroups: [], explanation: 'Matches "c" + "o" + "t"' },
      { id: 'tc3', input: 'c t', shouldMatch: true, expectedGroups: [], explanation: 'Matches "c" + space + "t"' },
      { id: 'tc4', input: 'c3t', shouldMatch: true, expectedGroups: [], explanation: 'Matches "c" + "3" + "t"' },
      { id: 'tc5', input: 'coat', shouldMatch: false, expectedGroups: [], explanation: 'Four letters, pattern only matches three' },
      { id: 'tc6', input: 'cut', shouldMatch: true, expectedGroups: [], explanation: 'Matches "c" + "u" + "t"' }
    ],
    hints: [
      'Use c at the start',
      'Use a dot for the middle character',
      'Use t at the end',
      'Try: c.t'
    ],
    solution: 'c.t',
    explanation: 'The pattern c.t matches "c" followed by any single character (except newline) followed by "t".',
    topics: ['dot wildcard', 'any character', 'three-letter words']
  },
  {
    id: '5',
    slug: 'uppercase-range',
    title: 'Match Uppercase Letters',
    description: 'Write a pattern using a character range that matches any single uppercase letter (A-Z).',
    difficulty: 'beginner',
    relatedLessons: ['5'],
    testCases: [
      { id: 'tc1', input: 'Hello', shouldMatch: true, expectedGroups: [], explanation: 'Matches "H"' },
      { id: 'tc2', input: 'HELLO', shouldMatch: true, expectedGroups: [], explanation: 'Matches each uppercase letter' },
      { id: 'tc3', input: 'hello', shouldMatch: false, expectedGroups: [], explanation: 'No uppercase letters' },
      { id: 'tc4', input: 'aBc', shouldMatch: true, expectedGroups: [], explanation: 'Matches "B"' },
      { id: 'tc5', input: '123', shouldMatch: false, expectedGroups: [], explanation: 'Digits are not uppercase letters' },
      { id: 'tc6', input: 'A', shouldMatch: true, expectedGroups: [], explanation: 'Single uppercase letter matches' }
    ],
    hints: [
      'Use a character class with a range',
      'The range for uppercase is A-Z',
      'Try: [A-Z]'
    ],
    solution: '[A-Z]',
    explanation: 'The character class [A-Z] matches any single uppercase letter from A to Z.',
    topics: ['character ranges', 'uppercase', 'A-Z']
  },
  {
    id: '6',
    slug: 'exact-two-digits',
    title: 'Exactly Two Digits',
    description: 'Write a pattern that matches exactly two consecutive digits. Use the digit shorthand.',
    difficulty: 'beginner',
    relatedLessons: ['6'],
    testCases: [
      { id: 'tc1', input: '12', shouldMatch: true, expectedGroups: [], explanation: 'Exactly 2 digits' },
      { id: 'tc2', input: '123', shouldMatch: false, expectedGroups: [], explanation: '3 digits, not 2' },
      { id: 'tc3', input: '1', shouldMatch: false, expectedGroups: [], explanation: 'Only 1 digit' },
      { id: 'tc4', input: 'a12b', shouldMatch: true, expectedGroups: [], explanation: 'Matches "12" as two consecutive digits' },
      { id: 'tc5', input: 'ab', shouldMatch: false, expectedGroups: [], explanation: 'No digits' },
      { id: 'tc6', input: '99', shouldMatch: true, expectedGroups: [], explanation: 'Two same digits match' }
    ],
    hints: [
      'Use \\d for each digit',
      'Specify exactly 2 repetitions with {2}',
      'Try: \\d{2}'
    ],
    solution: '\\d{2}',
    explanation: '\\d{2} matches exactly two digits in a row. The {2} quantifier specifies exact repetition count.',
    topics: ['fixed repetition', 'curly braces', '\\d']
  },
  {
    id: '7',
    slug: 'one-or-more-digits',
    title: 'One or More Digits',
    description: 'Write a pattern that matches a sequence of one or more digits. The pattern should match any number of consecutive digits.',
    difficulty: 'beginner',
    relatedLessons: ['7'],
    testCases: [
      { id: 'tc1', input: '123', shouldMatch: true, expectedGroups: [], explanation: 'Matches all three digits as one sequence' },
      { id: 'tc2', input: '1', shouldMatch: true, expectedGroups: [], explanation: 'Single digit matches' },
      { id: 'tc3', input: '', shouldMatch: false, expectedGroups: [], explanation: 'Empty string does not match' },
      { id: 'tc4', input: 'a1b2c3', shouldMatch: true, expectedGroups: [], explanation: 'Matches "1", "2", and "3" separately' },
      { id: 'tc5', input: 'abc', shouldMatch: false, expectedGroups: [], explanation: 'No digits' },
      { id: 'tc6', input: '999999', shouldMatch: true, expectedGroups: [], explanation: 'Many digits match as one sequence' }
    ],
    hints: [
      'Use \\d to match a digit',
      'Add + to mean one or more',
      'Try: \\d+'
    ],
    solution: '\\d+',
    explanation: '\\d+ matches one or more consecutive digits. The + quantifier means "at least one".',
    topics: ['Kleene plus', 'one or more', '\\d+']
  },
  {
    id: '8',
    slug: 'optional-u-color',
    title: 'Color with Optional U',
    description: 'Write a pattern that matches both "color" and "colour". The letter "u" should be optional.',
    difficulty: 'beginner',
    relatedLessons: ['8'],
    testCases: [
      { id: 'tc1', input: 'color', shouldMatch: true, expectedGroups: [], explanation: 'Matches without the optional u' },
      { id: 'tc2', input: 'colour', shouldMatch: true, expectedGroups: [], explanation: 'Matches with the optional u' },
      { id: 'tc3', input: 'colouur', shouldMatch: false, expectedGroups: [], explanation: 'Two u\'s not allowed' },
      { id: 'tc4', input: 'colr', shouldMatch: false, expectedGroups: [], explanation: 'Missing o and u' },
      { id: 'tc5', input: 'colors', shouldMatch: false, expectedGroups: [], explanation: 'Extra s at end' },
      { id: 'tc6', input: 'Color', shouldMatch: false, expectedGroups: [], explanation: 'Case-sensitive, need lowercase' }
    ],
    hints: [
      'Use ? to make a character optional',
      'Place ? after the u',
      'Try: colou?r'
    ],
    solution: 'colou?r',
    explanation: 'colou?r matches "color" or "colour". The ? after u means zero or one occurrence of u.',
    topics: ['optional matching', '? quantifier']
  },
  {
    id: '9',
    slug: 'start-with-test',
    title: 'Starts With Test',
    description: 'Write a pattern using an anchor that matches strings that start with "test".',
    difficulty: 'beginner',
    relatedLessons: ['9'],
    testCases: [
      { id: 'tc1', input: 'test123', shouldMatch: true, expectedGroups: [], explanation: 'Starts with "test"' },
      { id: 'tc2', input: 'this is a test', shouldMatch: false, expectedGroups: [], explanation: '"test" is in the middle' },
      { id: 'tc3', input: 'test', shouldMatch: true, expectedGroups: [], explanation: 'Exactly "test"' },
      { id: 'tc4', input: 'TEST', shouldMatch: false, expectedGroups: [], explanation: 'Case-sensitive' },
      { id: 'tc5', input: 'mytest', shouldMatch: false, expectedGroups: [], explanation: '"test" is at the end' },
      { id: 'tc6', input: 'test case', shouldMatch: true, expectedGroups: [], explanation: 'Starts with test, followed by space' }
    ],
    hints: [
      'Use the start-of-line anchor',
      'Place ^ before the pattern',
      'Try: ^test'
    ],
    solution: '^test',
    explanation: '^test matches "test" only at the beginning of a string. The ^ anchor asserts the start position.',
    topics: ['anchors', '^ start anchor']
  },
  {
    id: '10',
    slug: 'phone-number-groups',
    title: 'Phone Number Groups',
    description: 'Write a pattern with two capturing groups that matches a phone number in the format "area-number" where area is 3 digits and number is 4 digits. Example: "555-1234"',
    difficulty: 'beginner',
    relatedLessons: ['10'],
    testCases: [
      { id: 'tc1', input: '555-1234', shouldMatch: true, expectedGroups: ['555', '1234'], explanation: 'Group 1="555", Group 2="1234"' },
      { id: 'tc2', input: '123-4567', shouldMatch: true, expectedGroups: ['123', '4567'], explanation: 'Group 1="123", Group 2="4567"' },
      { id: 'tc3', input: '12-3456', shouldMatch: false, expectedGroups: [], explanation: 'Area code must be 3 digits' },
      { id: 'tc4', input: '555-123', shouldMatch: false, expectedGroups: [], explanation: 'Number must be 4 digits' },
      { id: 'tc5', input: '5551234', shouldMatch: false, expectedGroups: [], explanation: 'Missing dash separator' },
      { id: 'tc6', input: '999-0000', shouldMatch: true, expectedGroups: ['999', '0000'], explanation: 'Works with any digits' }
    ],
    hints: [
      'Use parentheses to create groups',
      'First group: \\d{3} for 3 digits',
      'Second group: \\d{4} for 4 digits',
      'Separate with a dash: -',
      'Try: (\\d{3})-(\\d{4})'
    ],
    solution: '(\\d{3})-(\\d{4})',
    explanation: '(\\d{3})-(\\d{4}) creates two capturing groups. Group 1 captures the 3-digit area code, group 2 captures the 4-digit number.',
    topics: ['capturing groups', 'phone number', 'group extraction']
  }
]
