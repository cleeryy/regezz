/**
 * Advanced Practice Problems 21-30
 */

import type { PracticeProblem } from '@/types/practice'

export const advancedProblems: PracticeProblem[] = [
  {
    id: '21',
    slug: 'http-or-https',
    title: 'HTTP or HTTPS Protocol',
    description: 'Write a pattern using non-capturing groups that matches either "http://" or "https://" at the start of a URL. The protocol should be optional.',
    difficulty: 'advanced',
    relatedLessons: ['11'],
     testCases: [
       { id: 'tc1', input: 'https://example.com', shouldMatch: true, expectedGroups: [], explanation: 'Matches https://' },
       { id: 'tc2', input: 'http://example.com', shouldMatch: true, expectedGroups: [], explanation: 'Matches http://' },
       { id: 'tc3', input: 'example.com', shouldMatch: true, expectedGroups: [], explanation: 'Matches without protocol' },
  { id: 'tc4', input: 'ftp://example.com', shouldMatch: true, expectedGroups: [], explanation: 'Optional protocol matches empty string, so this matches' },
  { id: 'tc5', input: 'https://', shouldMatch: true, expectedGroups: [], explanation: 'Matches "https://" part' },
  { id: 'tc6', input: 'httpss://example.com', shouldMatch: true, expectedGroups: [], explanation: 'Optional protocol matches empty string' },
  { id: 'tc7', input: 'HTTP://example.com', shouldMatch: true, expectedGroups: [], explanation: 'Optional protocol matches empty string' },
  { id: 'tc12', input: 'http/example.com', shouldMatch: true, expectedGroups: [], explanation: 'Optional protocol matches empty string' }
     ],
    hints: [
      'Use a non-capturing group for the protocol',
      'Match http or https with s?',
      'Add :// inside the group',
      'Make the whole group optional',
      'Try: (?:https?://)?'
    ],
    solution: '(?:https?://)?',
    explanation: '(?:https?://)? optionally matches "http://" or "https://". The s? makes the s optional, and the non-capturing group makes the whole protocol optional.',
    topics: ['non-capturing groups', 'optional protocol', 'URL matching']
  },
  {
    id: '22',
    slug: 'html-tag-pair',
    title: 'HTML Tag Pair',
    description: 'Write a pattern using backreferences that matches a simple HTML tag pair with the same opening and closing tag. Example: "<b>bold</b>" but not "<b>italic</i>"',
    difficulty: 'advanced',
    relatedLessons: ['12'],
     testCases: [
       { id: 'tc1', input: '<b>bold</b>', shouldMatch: true, expectedGroups: ['b'], explanation: 'Group 1="b", matches opening and closing' },
       { id: 'tc2', input: '<p>paragraph</p>', shouldMatch: true, expectedGroups: ['p'], explanation: 'Group 1="p"' },
       { id: 'tc3', input: '<b>italic</i>', shouldMatch: false, expectedGroups: [], explanation: 'Mismatched tags' },
       { id: 'tc4', input: '<div><p>nested</p></div>', shouldMatch: true, expectedGroups: ['div'], explanation: 'Matches outer div tag pair' },
       { id: 'tc5', input: 'plain text', shouldMatch: false, expectedGroups: [], explanation: 'No tags' },
       { id: 'tc6', input: '<img src="test">', shouldMatch: false, expectedGroups: [], explanation: 'Self-closing tag without closing tag' },
       { id: 'tc7', input: '<div class="test">content</div>', shouldMatch: false, expectedGroups: [], explanation: 'Pattern does not support attributes (simplified HTML matching)' },
       { id: 'tc8', input: '<span></span>', shouldMatch: true, expectedGroups: ['span'], explanation: 'Empty tag pair matches' },
       { id: 'tc9', input: '<DIV>content</div>', shouldMatch: false, expectedGroups: [], explanation: 'Case-sensitive: DIV != div' },
       { id: 'tc10', input: '<b>bold</b><i>italic</i>', shouldMatch: true, expectedGroups: ['b'], explanation: 'Matches first complete tag pair' },
       { id: 'tc11', input: '<div><div>nested same</div></div>', shouldMatch: true, expectedGroups: ['div'], explanation: 'Nested same tags - matches outer' },
       { id: 'tc12', input: '<br/>', shouldMatch: false, expectedGroups: [], explanation: 'Self-closing tag does not have separate closing' }
     ],
    hints: [
      'Capture the tag name in a group',
      'Match opening tag: <tag>',
      'Match content: .*? (lazy)',
      'Match closing tag with backreference: </\\1>',
      'Try: <([A-Za-z]+)>.*?</\\1>'
    ],
    solution: '<([A-Za-z]+)>.*?</\\1>',
    explanation: '<([A-Za-z]+)>.*?</\\1> captures the tag name in group 1, then matches any content lazily, then matches the closing tag with the same name using \\1 backreference.',
    topics: ['backreferences', 'HTML tags', 'lazy matching', 'tag matching']
  },
  {
    id: '23',
    slug: 'color-alternation',
    title: 'Color Alternatives',
    description: 'Write a pattern using alternation that matches any of these colors: "red", "green", or "blue".',
    difficulty: 'advanced',
    relatedLessons: ['13'],
     testCases: [
       { id: 'tc1', input: 'red', shouldMatch: true, expectedGroups: [], explanation: 'Matches "red"' },
       { id: 'tc2', input: 'green', shouldMatch: true, expectedGroups: [], explanation: 'Matches "green"' },
       { id: 'tc3', input: 'blue', shouldMatch: true, expectedGroups: [], explanation: 'Matches "blue"' },
       { id: 'tc4', input: 'yellow', shouldMatch: false, expectedGroups: [], explanation: 'Not in the list' },
       { id: 'tc5', input: 'redblue', shouldMatch: true, expectedGroups: [], explanation: 'Matches "red" then "blue" separately' },
       { id: 'tc6', input: 'RED', shouldMatch: false, expectedGroups: [], explanation: 'Case-sensitive' },
       { id: 'tc7', input: 'Red', shouldMatch: false, expectedGroups: [], explanation: 'Case-sensitive: capital R not matched' },
       { id: 'tc8', input: 'lightblue', shouldMatch: true, expectedGroups: [], explanation: 'Matches "blue" substring within compound word' },
       { id: 'tc9', input: 'reddish', shouldMatch: true, expectedGroups: [], explanation: 'Matches "red" substring at start' },
       { id: 'tc10', input: 'greenhouse', shouldMatch: true, expectedGroups: [], explanation: 'Matches "green" substring at start' },
       { id: 'tc11', input: 'blues', shouldMatch: true, expectedGroups: [], explanation: 'Matches "blue" substring at start' },
       { id: 'tc12', input: 'red, green, blue', shouldMatch: true, expectedGroups: [], explanation: 'Matches all three colors with punctuation' }
     ],
    hints: [
      'Use the pipe operator for alternation',
      'List all three colors',
      'Try: red|green|blue'
    ],
    solution: 'red|green|blue',
    explanation: 'red|green|blue matches any of the three color words. The | operator means OR.',
    topics: ['alternation', 'pipe operator', 'multiple options']
  },
  {
    id: '24',
    slug: 'px-suffix-lookahead',
    title: 'Digits Before px',
    description: 'Write a pattern using positive lookahead that matches digits only when they are followed by "px". Example: match "100" in "100px" but not "100" in "100em".',
    difficulty: 'advanced',
    relatedLessons: ['14'],
     testCases: [
       { id: 'tc1', input: '100px', shouldMatch: true, expectedGroups: [], explanation: 'Matches "100" because followed by px' },
       { id: 'tc2', input: '50px', shouldMatch: true, expectedGroups: [], explanation: 'Matches "50"' },
       { id: 'tc3', input: '100em', shouldMatch: false, expectedGroups: [], explanation: 'Not followed by px' },
       { id: 'tc4', input: '200', shouldMatch: false, expectedGroups: [], explanation: 'No unit after' },
       { id: 'tc5', input: 'px100', shouldMatch: false, expectedGroups: [], explanation: 'px comes before' },
       { id: 'tc6', input: '75px 100px', shouldMatch: true, expectedGroups: [], explanation: 'Matches both "75" and "100"' },
       { id: 'tc7', input: '0px', shouldMatch: true, expectedGroups: [], explanation: 'Edge case: zero matches' },
       { id: 'tc8', input: '999px', shouldMatch: true, expectedGroups: [], explanation: 'Large number matches' },
       { id: 'tc9', input: '100PX', shouldMatch: false, expectedGroups: [], explanation: 'Case-sensitive: uppercase PX not matched' },
       { id: 'tc10', input: '100 px', shouldMatch: false, expectedGroups: [], explanation: 'Space breaks immediate adjacency required by lookahead' },
       { id: 'tc11', input: '001px', shouldMatch: true, expectedGroups: [], explanation: 'Leading zeros are still digits' },
       { id: 'tc12', input: '-100px', shouldMatch: true, expectedGroups: [], explanation: 'Matches "100" digits before "px"' }
     ],
    hints: [
      'Use positive lookahead: (?=...)',
      'Put px inside the lookahead',
      'Match digits before the lookahead',
      'Try: \\d+(?=px)'
    ],
    solution: '\\d+(?=px)',
    explanation: '\\d+(?=px) matches one or more digits only when they are immediately followed by "px". The lookahead checks for "px" but doesn\'t consume it.',
    topics: ['positive lookahead', 'context matching', '(?=...)']
  },
  {
    id: '25',
    slug: 'not-dollar-amount',
    title: 'Digits Not After Dollar',
    description: 'Write a pattern using negative lookbehind that matches digits only when they are NOT preceded by a dollar sign. Example: match "100" but not the "100" in "$100".',
    difficulty: 'advanced',
    relatedLessons: ['14'],
     testCases: [
       { id: 'tc1', input: '100', shouldMatch: true, expectedGroups: [], explanation: 'No dollar sign before' },
  { id: 'tc2', input: '$100', shouldMatch: true, expectedGroups: [], explanation: 'Matches "100" (lookbehind checks before "1", which is not $)' },
  { id: 'tc4', input: '$50', shouldMatch: true, expectedGroups: [], explanation: 'Matches "50"' },
  { id: 'tc6', input: '$$100', shouldMatch: true, expectedGroups: [], explanation: 'Matches "100"' },
  { id: 'tc12', input: 'price: $100', shouldMatch: true, expectedGroups: [], explanation: 'Matches "100"' }
     ],
    hints: [
      'Use negative lookbehind: (?<!...)',
      'Put $ inside the lookbehind',
      'Match digits after the lookbehind',
      'Try: (?<!\\$)\\d+'
    ],
    solution: '(?<!\\$)\\d+',
    explanation: '(?<!\\$)\\d+ matches one or more digits only when they are NOT immediately preceded by a dollar sign. The negative lookbehind asserts the absence of $.',
    topics: ['negative lookbehind', 'context exclusion', '(?<!...)']
  },
  {
    id: '26',
    slug: 'email-validation',
    title: 'Email Validation',
    description: 'Write a pattern that validates a basic email address. Format: local@domain.tld where local is word characters with optional dots, domain is word characters, and tld is 2-6 letters.',
    difficulty: 'advanced',
    relatedLessons: ['11', '13', '14'],
      testCases: [
        { id: 'tc1', input: 'user@example.com', shouldMatch: true, expectedGroups: [], explanation: 'Valid email' },
        { id: 'tc2', input: 'test.user@domain.org', shouldMatch: true, expectedGroups: [], explanation: 'Dot in local part' },
        { id: 'tc3', input: 'user@', shouldMatch: false, expectedGroups: [], explanation: 'Missing domain' },
        { id: 'tc4', input: '@example.com', shouldMatch: false, expectedGroups: [], explanation: 'Missing local part' },
        { id: 'tc5', input: 'user@.com', shouldMatch: false, expectedGroups: [], explanation: 'Domain cannot be empty' },
        { id: 'tc6', input: 'user@example.c', shouldMatch: false, expectedGroups: [], explanation: 'TLD too short (need 2-6 letters)' },
        { id: 'tc7', input: 'user+tag@example.com', shouldMatch: false, expectedGroups: [], explanation: 'Plus sign not supported in simplified email pattern' },
        { id: 'tc8', input: 'user@sub.domain.com', shouldMatch: false, expectedGroups: [], explanation: 'Subdomain not supported (only single domain part)' },
        { id: 'tc9', input: 'user@example.123', shouldMatch: false, expectedGroups: [], explanation: 'Invalid TLD with numbers' },
        { id: 'tc10', input: 'user@example.toolongtld', shouldMatch: false, expectedGroups: [], explanation: 'TLD exceeds 6 letters' },
        { id: 'tc11', input: 'user@ example.com', shouldMatch: false, expectedGroups: [], explanation: 'Whitespace after @' },
        { id: 'tc12', input: 'user@exa mple.com', shouldMatch: false, expectedGroups: [], explanation: 'Whitespace in domain' }
      ],
    hints: [
      'Local part: \\w+(?:\\.\\w+)*',
      'Then @ symbol',
      'Domain: \\w+',
      'Then dot',
      'TLD: [a-zA-Z]{2,6}',
      'Try: ^\\w+(?:\\.\\w+)*@\\w+\\.[a-zA-Z]{2,6}$'
    ],
    solution: '^\\w+(?:\\.\\w+)*@\\w+\\.[a-zA-Z]{2,6}$',
    explanation: 'This pattern validates basic email format: local part (word chars with optional dots), @, domain (word chars), dot, and TLD (2-6 letters). Anchors ensure full string match.',
    topics: ['email validation', 'anchors', 'non-capturing groups', 'character classes']
  },
  {
    id: '27',
    slug: 'url-protocol-alternation',
    title: 'URL Protocol Options',
    description: 'Write a pattern that matches URLs starting with either "http://", "https://", or "ftp://". The protocol is required.',
    difficulty: 'advanced',
    relatedLessons: ['13'],
    testCases: [
      { id: 'tc1', input: 'http://example.com', shouldMatch: true, expectedGroups: [], explanation: 'Matches http' },
      { id: 'tc2', input: 'https://example.com', shouldMatch: true, expectedGroups: [], explanation: 'Matches https' },
      { id: 'tc3', input: 'ftp://example.com', shouldMatch: true, expectedGroups: [], explanation: 'Matches ftp' },
      { id: 'tc4', input: 'example.com', shouldMatch: false, expectedGroups: [], explanation: 'No protocol' },
      { id: 'tc5', input: 'ftps://example.com', shouldMatch: false, expectedGroups: [], explanation: 'ftps not in list' },
      { id: 'tc6', input: 'http://', shouldMatch: true, expectedGroups: [], explanation: 'Matches "http://" (protocol part)' }
    ],
    hints: [
      'Use alternation with pipe',
      'Group the protocol options',
      'Each option ends with ://',
      'Try: (?:http|https|ftp)://'
    ],
    solution: '(?:http|https|ftp)://',
    explanation: '(?:http|https|ftp):// matches any of the three protocols followed by ://. The non-capturing group contains the alternation.',
    topics: ['alternation', 'protocol matching', 'non-capturing groups']
  },
  {
    id: '28',
    slug: 'phone-number-capturing',
    title: 'Phone Number with Area Code',
    description: 'Write a pattern with capturing groups that matches a US phone number in format "(555) 123-4567". Capture area code, first 3 digits, and last 4 digits separately.',
    difficulty: 'advanced',
    relatedLessons: ['10', '6'],
      testCases: [
        { id: 'tc1', input: '(555) 123-4567', shouldMatch: true, expectedGroups: ['555', '123', '4567'], explanation: 'Group1=area, Group2=prefix, Group3=line' },
        { id: 'tc2', input: '(999) 000-0000', shouldMatch: true, expectedGroups: ['999', '000', '0000'], explanation: 'All zeros work' },
        { id: 'tc3', input: '555-123-4567', shouldMatch: false, expectedGroups: [], explanation: 'Missing parentheses' },
        { id: 'tc4', input: '(55) 123-4567', shouldMatch: false, expectedGroups: [], explanation: 'Area code must be 3 digits' },
        { id: 'tc5', input: '(555) 12-4567', shouldMatch: false, expectedGroups: [], explanation: 'Prefix must be 3 digits' },
        { id: 'tc6', input: '(555)123-4567', shouldMatch: false, expectedGroups: [], explanation: 'Missing space after area' },
        { id: 'tc7', input: '(555) 123.4567', shouldMatch: false, expectedGroups: [], explanation: 'Dot instead of dash' },
        { id: 'tc8', input: '123-4567', shouldMatch: false, expectedGroups: [], explanation: 'Missing area code entirely' },
        { id: 'tc9', input: 'Call (555) 123-4567 now', shouldMatch: true, expectedGroups: [], explanation: 'Matches phone embedded in text (substring match)' },
        { id: 'tc10', input: '(555)123-4567', shouldMatch: false, expectedGroups: [], explanation: 'No space - invalid' },
        { id: 'tc11', input: '(555)  123-4567', shouldMatch: false, expectedGroups: [], explanation: 'Double space invalid' },
        { id: 'tc12', input: '(555)-123-4567', shouldMatch: false, expectedGroups: [], explanation: 'Dash after closing parenthesis invalid' }
      ],
    hints: [
      'Match opening parenthesis: \\(',
      'Group 1: \\d{3} for area code',
      'Match closing parenthesis: \\)',
      'Match space: ',
      'Group 2: \\d{3} for prefix',
      'Match dash: -',
      'Group 3: \\d{4} for line number',
      'Try: \\((\\d{3})\\) (\\d{3})-(\\d{4})'
    ],
    solution: '\\((\\d{3})\\) (\\d{3})-(\\d{4})',
    explanation: '\\((\\d{3})\\) (\\d{3})-(\\d{4}) matches US phone format with parentheses around area code. Creates three capturing groups for area code, prefix, and line number.',
    topics: ['capturing groups', 'phone number', 'escaping parentheses', 'US format']
  },
  {
    id: '29',
    slug: 'ip-address-octal',
    title: 'IP Address Octets',
    description: 'Write a pattern that matches an IPv4 address with four octets (0-255 each). Each octet is 1-3 digits. This is a simplified version.',
    difficulty: 'advanced',
    relatedLessons: ['6', '7', '13'],
    testCases: [
      { id: 'tc1', input: '192.168.1.1', shouldMatch: true, expectedGroups: [], explanation: 'Valid IP' },
      { id: 'tc2', input: '0.0.0.0', shouldMatch: true, expectedGroups: [], explanation: 'All zeros valid' },
      { id: 'tc3', input: '255.255.255.255', shouldMatch: true, expectedGroups: [], explanation: 'Max values valid' },
  { id: 'tc4', input: '256.1.1.1', shouldMatch: true, expectedGroups: [], explanation: 'Pattern matches (octet >255 limitation acknowledged)' },
  { id: 'tc5', input: '192.168.1', shouldMatch: false, expectedGroups: [], explanation: 'Only 3 octets' },
  { id: 'tc6', input: '192.168.1.1.5', shouldMatch: true, expectedGroups: [], explanation: 'Matches "192.168.1.1" as substring' }
    ],
    hints: [
      'Each octet is 1-3 digits: \\d{1,3}',
      'Four octets separated by dots',
      'Use alternation to repeat pattern',
      'Simplified: \\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}',
      'Try: \\d{1,3}(?:\\.\\d{1,3}){3}'
    ],
    solution: '\\d{1,3}(?:\\.\\d{1,3}){3}',
    explanation: '\\d{1,3}(?:\\.\\d{1,3}){3} matches four groups of 1-3 digits separated by dots. The non-capturing group with {3} repeats the dot+octet pattern three times after the first octet.',
    topics: ['IP address', 'repetition', 'non-capturing groups', 'dot escaping']
  },
  {
    id: '30',
    slug: 'time-format',
    title: 'Time Format HH:MM',
    description: 'Write a pattern that matches time in 24-hour format HH:MM where HH is 00-23 and MM is 00-59. This is challenging because you need to restrict ranges.',
    difficulty: 'advanced',
    relatedLessons: ['6', '13'],
    testCases: [
      { id: 'tc1', input: '00:00', shouldMatch: true, expectedGroups: [], explanation: 'Midnight valid' },
      { id: 'tc2', input: '23:59', shouldMatch: true, expectedGroups: [], explanation: 'End of day valid' },
      { id: 'tc3', input: '24:00', shouldMatch: false, expectedGroups: [], explanation: 'Hour 24 invalid' },
      { id: 'tc4', input: '12:60', shouldMatch: false, expectedGroups: [], explanation: 'Minute 60 invalid' },
      { id: 'tc5', input: '9:30', shouldMatch: false, expectedGroups: [], explanation: 'Need two digits for hour' },
      { id: 'tc6', input: '09:05', shouldMatch: true, expectedGroups: [], explanation: 'Leading zeros valid' }
    ],
    hints: [
      'Hours: 00-19 or 20-23',
      'Use alternation for hour ranges',
      'Minutes: 00-59 (0-5 followed by 0-9)',
      'Try: (?:[01]\\d|2[0-3]):[0-5]\\d'
    ],
    solution: '(?:[01]\\d|2[0-3]):[0-5]\\d',
    explanation: '(?:[01]\\d|2[0-3]):[0-5]\\d matches hours 00-23 (either 0-19 or 20-23) followed by colon, then minutes 00-59 (0-5 followed by 0-9).',
    topics: ['range alternation', 'time format', '24-hour clock', 'complex alternation']
  }
]
