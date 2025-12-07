# Quiz: Text Processing with Grep and Regular Expressions

Test your understanding of pattern matching and text searching.

---

#### 1. What does `grep` stand for and what does it do?

<div class="upper-alpha" markdown>
1. General Regular Expression Parser - compiles code
2. Global Regular Expression Print - searches for patterns in text
3. Group Regular Expression Processor - sorts files
4. Graphical Regular Expression Program - displays images
</div>

??? question "Show Answer"
    The correct answer is **B**. grep (Global Regular Expression Print) searches for patterns in text files or input streams and prints matching lines. It's one of the most frequently used commands for finding information in files and logs.

    **Concept Tested:** Grep Command

    **See:** [Chapter 8 - Grep Command](index.md#grep-command)

---

#### 2. What does `grep -i "error" logfile.txt` do?

<div class="upper-alpha" markdown>
1. Inverts the search, showing non-matching lines
2. Performs a case-insensitive search for "error"
3. Counts the number of matches
4. Shows only the first match
</div>

??? question "Show Answer"
    The correct answer is **B**. The `-i` flag makes grep case-insensitive, so it matches "error", "Error", "ERROR", and any other case variation. This is useful when you don't know the exact capitalization.

    **Concept Tested:** Grep Options

    **See:** [Chapter 8 - Grep Options](index.md#grep-options)

---

#### 3. In regular expressions, what does the `.` (dot) character match?

<div class="upper-alpha" markdown>
1. Only a literal period
2. Any single character except newline
3. Zero or more characters
4. The end of a line
</div>

??? question "Show Answer"
    The correct answer is **B**. In regex, `.` is a wildcard that matches any single character (except newline). For example, `c.t` matches "cat", "cot", "cut", etc. To match a literal period, escape it with `\.`.

    **Concept Tested:** Regular Expressions

    **See:** [Chapter 8 - Regex Basics](index.md#regex-metacharacters)

---

#### 4. What does `^` mean at the start of a regex pattern?

<div class="upper-alpha" markdown>
1. Matches a literal caret character
2. Matches the beginning of a line
3. Matches the end of a line
4. Negates the entire pattern
</div>

??? question "Show Answer"
    The correct answer is **B**. The `^` anchor matches the beginning of a line. So `^Error` matches "Error" only when it appears at the start of a line, not in the middle. Use `$` to match the end of a line.

    **Concept Tested:** Regular Expressions, Anchors

    **See:** [Chapter 8 - Anchors](index.md#anchors)

---

#### 5. What does `grep -r "TODO" .` do?

<div class="upper-alpha" markdown>
1. Searches only the current file
2. Recursively searches all files in the current directory and subdirectories
3. Reverses the search results
4. Removes lines containing "TODO"
</div>

??? question "Show Answer"
    The correct answer is **B**. The `-r` (recursive) flag tells grep to search through all files in the specified directory and its subdirectories. The `.` means start from the current directory.

    **Concept Tested:** Grep Options, Recursive Search

    **See:** [Chapter 8 - Recursive Search](index.md#recursive-search)

---

#### 6. What does `*` mean in a regular expression?

<div class="upper-alpha" markdown>
1. Matches any characters (like a shell wildcard)
2. Matches zero or more of the preceding character
3. Matches exactly one character
4. Matches the start of a file
</div>

??? question "Show Answer"
    The correct answer is **B**. In regex, `*` means "zero or more of the preceding element." So `ab*c` matches "ac", "abc", "abbc", "abbbc", etc. This is different from shell wildcards where `*` matches any characters.

    **Concept Tested:** Regular Expressions, Quantifiers

    **See:** [Chapter 8 - Quantifiers](index.md#quantifiers)

---

#### 7. What does `grep -v "pattern" file.txt` do?

<div class="upper-alpha" markdown>
1. Verbose output with extra details
2. Shows only lines that DON'T match the pattern
3. Validates the pattern syntax
4. Shows version information
</div>

??? question "Show Answer"
    The correct answer is **B**. The `-v` flag inverts the match, showing lines that do NOT contain the pattern. This is useful for filtering out unwanted lines, like `grep -v "^#" config.txt` to remove comment lines.

    **Concept Tested:** Grep Options

    **See:** [Chapter 8 - Inverting Matches](index.md#inverting-matches)

---

#### 8. What does the regex pattern `[0-9]+` match?

<div class="upper-alpha" markdown>
1. Exactly one digit
2. One or more digits
3. Zero or more digits
4. The literal string "[0-9]+"
</div>

??? question "Show Answer"
    The correct answer is **B**. `[0-9]` is a character class matching any digit, and `+` means "one or more." So `[0-9]+` matches one or more consecutive digits like "42" or "12345". Note: `+` requires extended regex (`grep -E`).

    **Concept Tested:** Regular Expressions, Character Classes

    **See:** [Chapter 8 - Character Classes](index.md#character-classes)

---

#### 9. What command shows the count of matching lines instead of the lines themselves?

<div class="upper-alpha" markdown>
1. grep -l
2. grep -c
3. grep -n
4. grep -o
</div>

??? question "Show Answer"
    The correct answer is **B**. The `-c` flag tells grep to output only the count of matching lines, not the lines themselves. For example, `grep -c "error" logfile.txt` outputs just a number like "42".

    **Concept Tested:** Grep Options

    **See:** [Chapter 8 - Counting Matches](index.md#counting-matches)

---

#### 10. What's the difference between `grep` and `grep -E` (or `egrep`)?

<div class="upper-alpha" markdown>
1. -E is faster
2. -E enables extended regular expressions with more features
3. -E searches in binary files
4. -E encrypts the output
</div>

??? question "Show Answer"
    The correct answer is **B**. `grep -E` (or `egrep`) uses extended regular expressions, which support additional features like `+` (one or more), `?` (zero or one), `|` (alternation), and grouping without escaping. Basic grep requires escaping these.

    **Concept Tested:** Extended Regular Expressions

    **See:** [Chapter 8 - Extended Regex](index.md#extended-regular-expressions)
