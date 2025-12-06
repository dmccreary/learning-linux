---
title: Text Processing with Grep and Regular Expressions
description: Master pattern matching and text search with grep and regex
generated_by: claude skill chapter-content-generator
date: 2025-12-06
version: 0.03
---

# Text Processing with Grep and Regular Expressions

## Summary

This chapter introduces powerful text search techniques using grep and regular expressions. You'll learn to search for patterns in files, understand basic and extended regular expressions, and master metacharacters, anchors, character classes, and quantifiers. Regular expressions are a fundamental skill used across programming languages and tools.

## Concepts Covered

This chapter covers the following 9 concepts from the learning graph:

1. Grep Command
2. Grep Options
3. Regular Expressions
4. Basic Regex
5. Extended Regex
6. Regex Metacharacters
7. Regex Anchors
8. Regex Character Classes
9. Regex Quantifiers

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: File Operations and Manipulation](../05-file-operations/index.md)

---

## The Superpower of Text Search

Imagine you have a log file with 50,000 lines, and somewhere in there is an error message you need to find. Or maybe you need to find every email address in a document. Or locate all the lines in your code that contain a function call.

You could scroll through manually, but that would take forever. Instead, you'll use **grep** and **regular expressions**—the ultimate text-searching duo!

**Grep** is like a metal detector for text: it scans through files and pulls out exactly the lines you're looking for. **Regular expressions** (regex) are the patterns you use to describe WHAT you're looking for. Together, they're like having superpowers for finding needles in haystacks!

In this chapter, you'll learn:

- How to search files with grep
- How to write patterns that match complex text
- Regex building blocks: anchors, character classes, and quantifiers
- Real-world examples you'll use constantly

Let's get grepping!

## The Grep Command: Global Regular Expression Print

The **grep command** searches for patterns in files and displays matching lines. The name "grep" comes from "**G**lobal **R**egular **E**xpression **P**rint"—a command from an old text editor.

### Basic Grep Usage

```sh
# Search for "error" in a file
grep "error" logfile.txt

# Search is case-sensitive by default
grep "Error" logfile.txt      # Different from "error"

# Search multiple files
grep "TODO" *.py

# Search recursively in directories
grep -r "password" /etc/
```

When grep finds a match, it prints the entire line containing that match. If you search multiple files, it shows which file each match came from.

```sh
grep "function" *.js
# app.js:function calculate() {
# utils.js:function formatDate(date) {
# helpers.js:function validateInput(data) {
```

### Understanding Grep Output

```sh
# Sample logfile.txt:
# 2025-12-01 10:15:32 INFO Server started
# 2025-12-01 10:15:45 ERROR Connection failed
# 2025-12-01 10:16:02 INFO Request received
# 2025-12-01 10:16:15 ERROR Timeout occurred

grep "ERROR" logfile.txt
# 2025-12-01 10:15:45 ERROR Connection failed
# 2025-12-01 10:16:15 ERROR Timeout occurred
```

!!! tip "Grep + Pipe = Power Combo"
    You can pipe other commands into grep to filter their output:
    ```sh
    ps aux | grep python       # Find Python processes
    history | grep ssh         # Find SSH commands you've run
    ls -la | grep "Dec"        # Find files from December
    ```

## Grep Options: Fine-Tuning Your Search

The **grep options** let you customize how grep searches and what it displays.

### Essential Grep Options

| Option | Meaning | Example |
|--------|---------|---------|
| `-i` | Case insensitive | `grep -i "error" file` |
| `-v` | Invert match (show NON-matching lines) | `grep -v "debug" file` |
| `-n` | Show line numbers | `grep -n "TODO" file` |
| `-c` | Count matches only | `grep -c "error" file` |
| `-l` | List filenames only | `grep -l "secret" *` |
| `-r` | Recursive search | `grep -r "TODO" .` |
| `-w` | Match whole words only | `grep -w "is" file` |
| `-A n` | Show n lines After match | `grep -A 3 "error" file` |
| `-B n` | Show n lines Before match | `grep -B 2 "error" file` |
| `-C n` | Show n lines of Context (before and after) | `grep -C 2 "error" file` |

### Option Examples

```sh
# Case insensitive search
grep -i "warning" logfile.txt
# Matches: WARNING, Warning, warning, WaRnInG

# Show line numbers
grep -n "error" app.log
# 45:ERROR: Connection timeout
# 123:ERROR: Invalid input
# 456:ERROR: File not found

# Count occurrences
grep -c "GET" access.log
# 1547

# Show only filenames with matches
grep -l "password" *.conf
# database.conf
# mail.conf

# Show context around matches
grep -C 2 "Exception" error.log
# 2025-12-01 Stack trace:
# 2025-12-01 at line 45
# 2025-12-01 Exception: NullPointerException
# 2025-12-01 at module.process()
# 2025-12-01 Shutting down...

# Match whole words only
grep -w "is" document.txt
# "This is a test" - matches "is"
# "island" - does NOT match (would without -w)
```

### Inverting Matches

The `-v` option shows lines that DON'T match—super useful for filtering out noise:

```sh
# Show all non-empty lines
grep -v "^$" file.txt

# Show lines without "debug"
grep -v "debug" logfile.txt

# Combine: remove comments AND empty lines
grep -v "^#" config.txt | grep -v "^$"
```

#### Diagram: Grep Command Flow

<details markdown="1">
<summary>How Grep Processes Files</summary>
Type: diagram

Bloom Taxonomy: Understand
Learning Objective: Visualize how grep reads input, applies patterns, and produces filtered output.

Layout: Horizontal flow diagram from left to right

Components:
1. Input (left):
   - File icon or STDIN pipe
   - Sample lines flowing in
   - Some lines contain pattern, some don't

2. Grep Engine (center):
   - Box labeled "grep [pattern]"
   - Pattern matcher inside
   - Options modifiers (flags)

3. Output (right):
   - Matching lines highlighted in green
   - Non-matching lines dimmed/crossed out
   - Final output showing only matches

Visual flow:
- Lines enter from left
- Pass through grep filter
- Matching lines continue to output
- Non-matching lines are discarded (shown fading out)

Example data:
- Input lines: "Hello world", "Error found", "All good", "Error again"
- Pattern: "Error"
- Output: "Error found", "Error again"

With -v option:
- Same input
- Output: "Hello world", "All good"

Color scheme:
- Input: Blue
- Pattern match highlight: Yellow
- Matching output: Green
- Discarded lines: Gray/faded

Implementation: p5.js
</details>

## Regular Expressions: The Pattern Language

**Regular expressions** (regex or regexp) are a special language for describing text patterns. Instead of searching for exact text like "error", you can search for patterns like "any word followed by a number" or "text that looks like an email address."

Think of regex as a very precise way to describe what you're looking for. It's like telling someone "find me a word that starts with 'cat' and ends with any letter"—regex lets you express exactly that!

### Why Learn Regex?

Regex appears EVERYWHERE in computing:

- **Linux tools**: grep, sed, awk, find
- **Programming languages**: Python, JavaScript, Java, Go, Ruby
- **Text editors**: VS Code, Vim, Sublime Text
- **Databases**: SQL pattern matching
- **Web forms**: Input validation

Learning regex once gives you a skill you'll use in dozens of different contexts!

### Basic Regex: Simple Patterns

**Basic regex** in Linux uses a specific syntax. The simplest patterns are just literal text:

```sh
# Literal match
grep "hello" file.txt      # Matches exactly "hello"
grep "Error 404" log.txt   # Matches exactly "Error 404"
```

But the real power comes from special characters called **metacharacters**.

## Regex Metacharacters: Special Pattern Symbols

**Regex metacharacters** are characters with special meanings in patterns. They're the building blocks of powerful searches.

### The Dot (.) - Any Single Character

The dot matches ANY single character (except newline):

```sh
# Match "cat", "cut", "c@t", "c9t", etc.
grep "c.t" file.txt

# Match any 5-character word starting with "h" ending with "o"
grep "h...o" file.txt      # Matches: hello, hippo, hydro
```

### The Asterisk (*) - Zero or More

The asterisk means "zero or more of the previous character":

```sh
# Match "color" or "colour" (zero or one 'u')
grep "colou*r" file.txt

# Match "a" followed by any number of "b"s
grep "ab*" file.txt        # Matches: a, ab, abb, abbb...
```

### The Backslash (\) - Escape Character

The backslash makes metacharacters literal:

```sh
# Search for actual dot (not any character)
grep "version 2\.0" file.txt

# Search for asterisk
grep "5\*3" math.txt
```

### Common Metacharacters

| Character | Meaning | Example |
|-----------|---------|---------|
| `.` | Any single character | `c.t` matches cat, cut, c9t |
| `*` | Zero or more of previous | `ab*` matches a, ab, abb |
| `\` | Escape next character | `\.` matches literal dot |
| `^` | Start of line | `^Error` matches "Error" at line start |
| `$` | End of line | `end$` matches "end" at line end |
| `[]` | Character class | `[aeiou]` matches any vowel |
| `[^]` | Negated class | `[^0-9]` matches non-digit |

!!! note "BRE vs ERE"
    Basic Regular Expressions (BRE) treat some characters differently than Extended Regular Expressions (ERE). We'll cover both!

## Regex Anchors: Position Matters

**Regex anchors** don't match characters—they match POSITIONS in the text. They "anchor" your pattern to specific locations.

### Start of Line (^)

The caret `^` matches the beginning of a line:

```sh
# Lines that START with "Error"
grep "^Error" log.txt
# Matches: "Error: file not found"
# Doesn't match: "An Error occurred"

# Lines that START with a number
grep "^[0-9]" data.txt
```

### End of Line ($)

The dollar sign `$` matches the end of a line:

```sh
# Lines that END with "failed"
grep "failed$" results.txt
# Matches: "Test failed"
# Doesn't match: "failed to connect"

# Lines that end with a period
grep "\.$" document.txt
```

### Combining Anchors

```sh
# Lines that ARE exactly "OK"
grep "^OK$" status.txt

# Empty lines (start immediately followed by end)
grep "^$" file.txt

# Lines containing only whitespace
grep "^[[:space:]]*$" file.txt

# Lines that start with # (comments)
grep "^#" config.txt

# Lines that DON'T start with # (non-comments)
grep -v "^#" config.txt
```

#### Diagram: Regex Anchors Visualized

<details markdown="1">
<summary>Understanding Anchor Positions</summary>
Type: diagram

Bloom Taxonomy: Understand, Remember
Learning Objective: Show how anchors (^ and $) match positions rather than characters.

Layout: Text line with position markers

Visual elements:
- A sample line of text: "Error: Connection failed"
- Position markers showing where ^ and $ match
- Arrows indicating invisible anchor points

Demonstration:
1. Without anchors:
   - Pattern "Error" highlighted wherever it appears
   - Could be start, middle, or end

2. With ^ anchor:
   - Position marker at very start of line
   - Pattern "^Error" only matches at beginning
   - "Error: failed" - MATCH
   - "An Error" - NO MATCH

3. With $ anchor:
   - Position marker at very end of line
   - Pattern "failed$" only matches at end
   - "Test failed" - MATCH
   - "failed again" - NO MATCH

4. Both anchors:
   - Pattern "^exact$" matches whole line
   - Only matches if entire line is "exact"

Interactive features:
- Click different patterns to see where they match
- Highlight matching positions in text
- Show match/no match for examples

Color scheme:
- Anchor markers: Red
- Matching text: Green
- Non-matching: Gray
- Position indicators: Blue arrows

Implementation: p5.js
</details>

## Regex Character Classes: Sets of Characters

**Regex character classes** match ONE character from a defined set. They're written with square brackets `[]`.

### Basic Character Classes

```sh
# Match any vowel
grep "[aeiou]" file.txt

# Match any digit
grep "[0-9]" file.txt

# Match any lowercase letter
grep "[a-z]" file.txt

# Match any uppercase letter
grep "[A-Z]" file.txt

# Match alphanumeric
grep "[a-zA-Z0-9]" file.txt
```

### Combining Characters

```sh
# Match "gray" or "grey"
grep "gr[ae]y" file.txt

# Match any hex digit (0-9, a-f, A-F)
grep "[0-9a-fA-F]" file.txt

# Match common punctuation
grep "[.,;:!?]" file.txt
```

### Negated Character Classes

Put `^` at the START of a class to negate it (match anything NOT in the set):

```sh
# Match any NON-digit
grep "[^0-9]" file.txt

# Match any NON-vowel
grep "[^aeiou]" file.txt

# Match lines with non-ASCII characters
grep "[^[:ascii:]]" file.txt
```

!!! warning "^ Inside vs Outside Brackets"
    - `^` OUTSIDE brackets = start of line anchor
    - `^` INSIDE brackets (first position) = negation

    ```sh
    grep "^a"    # Lines STARTING with 'a'
    grep "[^a]"  # Characters that are NOT 'a'
    ```

### POSIX Character Classes

Linux provides named character classes for common sets:

| Class | Meaning | Equivalent |
|-------|---------|------------|
| `[[:alpha:]]` | Alphabetic | `[a-zA-Z]` |
| `[[:digit:]]` | Digits | `[0-9]` |
| `[[:alnum:]]` | Alphanumeric | `[a-zA-Z0-9]` |
| `[[:space:]]` | Whitespace | `[ \t\n\r\f\v]` |
| `[[:upper:]]` | Uppercase | `[A-Z]` |
| `[[:lower:]]` | Lowercase | `[a-z]` |
| `[[:punct:]]` | Punctuation | `[!\"#$%&'()*+,-./:;<=>?@[\]^_\`{|}~]` |
| `[[:xdigit:]]` | Hex digits | `[0-9a-fA-F]` |

```sh
# Find lines starting with uppercase
grep "^[[:upper:]]" file.txt

# Find lines containing digits
grep "[[:digit:]]" file.txt

# Find words (sequences of alphanumeric)
grep "[[:alnum:]]*" file.txt
```

## Regex Quantifiers: How Many?

**Regex quantifiers** specify HOW MANY of the previous element to match.

### Basic Quantifiers (in BRE)

```sh
# * - Zero or more
grep "ab*c" file.txt       # ac, abc, abbc, abbbc...

# \{n\} - Exactly n times
grep "a\{3\}" file.txt     # Matches "aaa"

# \{n,\} - At least n times
grep "a\{2,\}" file.txt    # Matches "aa", "aaa", "aaaa"...

# \{n,m\} - Between n and m times
grep "a\{2,4\}" file.txt   # Matches "aa", "aaa", "aaaa"
```

### Extended Regex Quantifiers

With extended regex (`grep -E` or `egrep`), you get cleaner syntax:

```sh
# ? - Zero or one (optional)
grep -E "colou?r" file.txt      # color, colour

# + - One or more
grep -E "ab+c" file.txt         # abc, abbc, abbbc... (NOT ac)

# {n} - Exactly n
grep -E "a{3}" file.txt         # aaa

# {n,} - At least n
grep -E "a{2,}" file.txt        # aa, aaa, aaaa...

# {n,m} - Between n and m
grep -E "a{2,4}" file.txt       # aa, aaa, aaaa
```

### Quantifier Summary

| Quantifier | BRE Syntax | ERE Syntax | Meaning |
|------------|------------|------------|---------|
| Zero or more | `*` | `*` | 0, 1, 2, 3... |
| One or more | `\+` | `+` | 1, 2, 3... |
| Zero or one | `\?` | `?` | 0 or 1 |
| Exactly n | `\{n\}` | `{n}` | Exactly n |
| At least n | `\{n,\}` | `{n,}` | n or more |
| Between n and m | `\{n,m\}` | `{n,m}` | n to m inclusive |

## Basic Regex vs Extended Regex

Linux grep supports two regex flavors:

### Basic Regex (BRE) - Default

**Basic regex** is grep's default mode. Some metacharacters need backslashes:

```sh
# BRE examples
grep "a\+" file.txt           # One or more 'a'
grep "a\?" file.txt           # Zero or one 'a'
grep "a\{2,3\}" file.txt      # 2 to 3 'a's
grep "\(ab\)*" file.txt       # Group: zero or more "ab"
```

### Extended Regex (ERE) - grep -E

**Extended regex** uses `grep -E` (or the `egrep` command). Metacharacters don't need backslashes:

```sh
# ERE examples - cleaner syntax!
grep -E "a+" file.txt         # One or more 'a'
grep -E "a?" file.txt         # Zero or one 'a'
grep -E "a{2,3}" file.txt     # 2 to 3 'a's
grep -E "(ab)*" file.txt      # Group: zero or more "ab"

# ERE also adds alternation with |
grep -E "cat|dog" file.txt    # Match "cat" OR "dog"
grep -E "error|warning|critical" log.txt
```

### When to Use Which?

| Feature | Use BRE | Use ERE |
|---------|---------|---------|
| Simple literal search | ✓ | ✓ |
| Basic wildcards | ✓ | ✓ |
| `+`, `?` quantifiers | Awkward | ✓ Clean |
| Alternation (OR) | Not available | ✓ |
| Complex patterns | Harder | ✓ Easier |

!!! tip "Just Use ERE"
    For most work, use `grep -E`. The syntax is cleaner and more consistent with regex in other languages. The only reason to use BRE is compatibility with very old scripts.

#### Diagram: Interactive Regex Tester

<details markdown="1">
<summary>Regex Pattern Matcher MicroSim</summary>
Type: microsim

Bloom Taxonomy: Apply, Analyze
Learning Objective: Allow students to type regex patterns and test them against sample text, seeing matches highlighted in real-time.

Canvas layout (responsive, ~750px max width):
- Top section (60px): Pattern input with ERE/BRE toggle
- Middle section (200px): Sample text area with highlighted matches
- Bottom section (150px): Explanation of pattern and match count

Visual elements:
- Text input for regex pattern
- Toggle button: BRE / ERE mode
- Multi-line text area with sample text
- Highlighted matches in yellow/green
- Pattern breakdown explanation

Sample text (editable):
```
Error: Connection refused at 10.0.0.1
Warning: Low memory (512MB remaining)
Info: Server started on port 8080
Error: File not found: config.json
Debug: Processing request #12345
Warning: Timeout after 30 seconds
```

Interactive controls:
- Pattern input field
- ERE/BRE mode toggle
- Quick pattern buttons:
  - "^Error" (lines starting with Error)
  - "[0-9]+" (numbers)
  - "\\.json$" (ends with .json)
  - "Error|Warning" (either word)
- Clear and reset buttons

Behavior:
- Type pattern: matches highlight immediately
- Invalid pattern: show error message in red
- Display: "X matches found"
- Show breakdown: "This pattern means..."
- Hover over match: show which part of pattern matched

Example interactions:
- Pattern "Error" highlights both "Error" occurrences
- Pattern "^Error" highlights only line-starting "Error"
- Pattern "[0-9]+" highlights all number sequences

Color scheme:
- Pattern input: Blue border
- Valid match: Green highlight
- Invalid pattern: Red border
- Explanation: Gray background

Implementation: p5.js with JavaScript regex engine
</details>

## Practical Grep Examples

Let's put it all together with real-world examples!

### Finding IP Addresses

```sh
# Basic IP pattern (simplified)
grep -E "[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+" logfile.txt

# More precise (each octet 0-255)
grep -E "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b" logfile.txt
```

### Finding Email Addresses

```sh
# Simple email pattern
grep -E "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" contacts.txt
```

### Log File Analysis

```sh
# Find all errors from December 6th
grep "2025-12-06.*ERROR" app.log

# Find errors between 10:00 and 11:00
grep -E "2025-12-06 10:[0-5][0-9].*ERROR" app.log

# Count different log levels
grep -c "ERROR" app.log
grep -c "WARNING" app.log
grep -c "INFO" app.log
```

### Code Searching

```sh
# Find function definitions in Python
grep -E "^def [a-zA-Z_]+" *.py

# Find TODO comments
grep -rn "TODO:" src/

# Find variable assignments
grep -E "^[a-zA-Z_][a-zA-Z0-9_]* *=" config.py

# Find import statements
grep -E "^import |^from .* import" *.py
```

### Configuration File Parsing

```sh
# Find uncommented settings
grep -v "^#" config.txt | grep -v "^$"

# Find settings with values
grep -E "^[a-zA-Z_]+=" settings.conf

# Find specific setting
grep "^DATABASE_URL=" .env
```

## Building Complex Patterns

Let's build some patterns step by step!

### Example: Matching Phone Numbers

```sh
# Step 1: Match digits
grep "[0-9]" file.txt

# Step 2: Match groups of 3 digits
grep -E "[0-9]{3}" file.txt

# Step 3: Match area code in parentheses
grep -E "\([0-9]{3}\)" file.txt

# Step 4: Full phone pattern (XXX) XXX-XXXX
grep -E "\([0-9]{3}\) [0-9]{3}-[0-9]{4}" file.txt

# Step 5: Allow optional spaces/dashes
grep -E "\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}" file.txt
```

### Example: Matching URLs

```sh
# Match http or https URLs
grep -E "https?://[a-zA-Z0-9./-]+" file.txt

# More complete URL pattern
grep -E "https?://[a-zA-Z0-9.-]+(/[a-zA-Z0-9./_-]*)?" file.txt
```

### Example: Matching Dates

```sh
# Match YYYY-MM-DD format
grep -E "[0-9]{4}-[0-9]{2}-[0-9]{2}" file.txt

# Match MM/DD/YYYY format
grep -E "[0-9]{2}/[0-9]{2}/[0-9]{4}" file.txt

# Match either format
grep -E "[0-9]{4}-[0-9]{2}-[0-9]{2}|[0-9]{2}/[0-9]{2}/[0-9]{4}" file.txt
```

## Grep Cheat Sheet

### Most-Used Commands

```sh
# Basic search
grep "pattern" file.txt

# Case insensitive
grep -i "pattern" file.txt

# Recursive search
grep -r "pattern" directory/

# Show line numbers
grep -n "pattern" file.txt

# Extended regex
grep -E "pattern" file.txt

# Invert (show non-matches)
grep -v "pattern" file.txt

# Count matches
grep -c "pattern" file.txt

# Context (3 lines around match)
grep -C 3 "pattern" file.txt
```

### Common Patterns

| Pattern | Matches |
|---------|---------|
| `^text` | Lines starting with "text" |
| `text$` | Lines ending with "text" |
| `^$` | Empty lines |
| `.` | Any single character |
| `.*` | Any characters (greedy) |
| `[abc]` | One of a, b, or c |
| `[^abc]` | Any character except a, b, c |
| `[0-9]` | Any digit |
| `[a-z]` | Any lowercase letter |
| `a+` (ERE) | One or more "a" |
| `a*` | Zero or more "a" |
| `a?` (ERE) | Zero or one "a" |
| `a{3}` (ERE) | Exactly 3 "a"s |
| `a\|b` (ERE) | "a" or "b" |

## Key Takeaways

You've learned one of the most powerful skills in text processing!

- **grep** searches for patterns in files and outputs matching lines
- **grep options** control case sensitivity, line numbers, recursion, and more
- **Regular expressions** describe patterns, not literal text
- **Metacharacters** (`.`, `*`, `^`, `$`, `[]`) give patterns their power
- **Anchors** (`^`, `$`) match positions, not characters
- **Character classes** (`[abc]`, `[0-9]`) match sets of characters
- **Quantifiers** (`*`, `+`, `?`, `{n,m}`) specify repetition
- **Extended regex** (`grep -E`) has cleaner syntax for complex patterns

!!! success "You're a Regex Wizard Now!"
    Regular expressions take practice to master, but you now have all the tools. Start using grep daily—search your code, filter logs, find configurations. Every time you use regex, you'll get better at constructing patterns!

## What's Next?

Now that you can find text, it's time to learn how to TRANSFORM it! Next chapter covers sed and awk—powerful tools for editing and processing text streams.

---

??? question "Quick Quiz: Grep and Regular Expressions"
    1. What command searches for "error" (case-insensitive) in log.txt?
    2. What does the pattern `^#` match?
    3. What's the difference between `*` and `+` quantifiers?
    4. What does `[^0-9]` match?
    5. How do you search for a literal dot (.) in text?
    6. What grep option shows lines that DON'T match the pattern?

??? note "Quiz Answers"
    1. `grep -i "error" log.txt`
    2. Lines that start with # (comments in many config files)
    3. `*` matches zero or more; `+` matches one or more (requires at least one)
    4. Any character that is NOT a digit
    5. `grep "\." file.txt` - escape the dot with backslash
    6. `grep -v "pattern" file.txt` - the -v flag inverts the match

