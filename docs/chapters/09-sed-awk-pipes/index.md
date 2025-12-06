---
title: Advanced Text Processing - Sed, Awk, and Pipes
description: Master stream editing, field processing, and command pipelines
generated_by: claude skill chapter-content-generator
date: 2025-12-06
version: 0.03
---

# Advanced Text Processing: Sed, Awk, and Pipes

## Summary

This chapter covers advanced text processing with sed for stream editing and awk for field-based processing. You'll also master the UNIX philosophy in action: connecting commands with pipes, understanding text streams (stdin, stdout, stderr), and using redirection operators. These skills enable you to build powerful data processing pipelines.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

1. Sed Command
2. Sed Substitution
3. Awk Command
4. Awk Fields
5. Awk Patterns
6. Text Streams
7. Standard Input
8. Standard Output
9. Standard Error
10. Redirection
11. Output Redirection
12. Input Redirection
13. Append Redirection
14. Error Redirection
15. Pipe Operator
16. Pipeline Commands
17. Xargs Command
18. Tee Command
19. Tr Command
20. Rev Command
21. Fold Command

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: File Operations and Manipulation](../05-file-operations/index.md)
- [Chapter 8: Text Processing with Grep and Regular Expressions](../08-grep-regex/index.md)

---

## The UNIX Philosophy: Small Tools, Big Power

Here's a secret that made UNIX (and Linux) legendary: instead of building giant programs that try to do everything, UNIX developers created small, focused tools that each do ONE thing really well. Then they invented a way to connect these tools together—like LEGO bricks—to build whatever you need!

This chapter teaches you:

- **Streams**: How data flows between programs
- **Redirection**: Sending output to files instead of the screen
- **Pipes**: Connecting commands together
- **Sed**: A stream editor for transforming text
- **Awk**: A powerful language for processing structured data

By the end, you'll be building **pipeline commands** that process text like a pro. These skills are what separate Linux beginners from power users!

## Text Streams: The Rivers of Data

In Linux, data flows through programs like water through pipes. These flows are called **text streams**, and every program has three of them by default.

### Standard Input (stdin)

**Standard input** (stdin) is where a program reads its input. By default, this is your keyboard—when you type, you're sending data to stdin.

```sh
# cat with no arguments reads from stdin (your keyboard)
cat
# Type something, press Enter
# Press Ctrl+D to end input
```

### Standard Output (stdout)

**Standard output** (stdout) is where a program writes its normal output. By default, this goes to your terminal screen.

```sh
# ls writes its output to stdout
ls -la
# Output appears on your screen

# echo writes to stdout
echo "Hello, World!"
# Hello, World!
```

### Standard Error (stderr)

**Standard error** (stderr) is where programs write error messages. It's separate from stdout so you can handle errors differently from regular output.

```sh
# This command produces an error
ls /nonexistent/directory
# ls: cannot access '/nonexistent/directory': No such file or directory
# ↑ This goes to stderr, not stdout
```

### Why Separate Streams?

Having separate streams is brilliant:

- You can save normal output to a file while still seeing errors on screen
- You can discard errors while keeping the good output
- You can log errors to a separate file
- Pipes only connect stdout, so errors still show up for debugging

| Stream | Number | Default | Purpose |
|--------|--------|---------|---------|
| stdin | 0 | Keyboard | Input to program |
| stdout | 1 | Screen | Normal output |
| stderr | 2 | Screen | Error messages |

#### Diagram: Text Streams Visualization

<details markdown="1">
<summary>Understanding stdin, stdout, and stderr</summary>
Type: diagram

Bloom Taxonomy: Understand
Learning Objective: Visualize how the three standard streams connect programs to input/output devices and how they can be redirected.

Layout: Central program box with three streams flowing in/out

Visual elements:
- Central box: "Program" (e.g., grep)
- Left side: stdin (stream 0) flowing IN
  - Default source: keyboard icon
  - Can be redirected from: file icon
- Right top: stdout (stream 1) flowing OUT
  - Default destination: terminal/screen icon
  - Can be redirected to: file icon
- Right bottom: stderr (stream 2) flowing OUT
  - Default destination: terminal/screen icon
  - Can be redirected to: different file icon

Stream labels:
- stdin (0): Blue arrow, "Input"
- stdout (1): Green arrow, "Output"
- stderr (2): Red arrow, "Errors"

Animation:
- Show data packets flowing through streams
- Demonstrate redirection by arrows changing targets
- Show pipe connecting stdout to another program's stdin

Interactive features:
- Click to toggle between default and redirected states
- Hover over streams for explanation

Color scheme:
- stdin: Blue
- stdout: Green
- stderr: Red
- Program box: Gray
- Files: Yellow/orange

Implementation: p5.js
</details>

## Redirection: Controlling Where Data Goes

**Redirection** lets you change where stdin comes from and where stdout/stderr go to. Instead of keyboard input and screen output, you can use files!

### Output Redirection (>)

**Output redirection** sends stdout to a file instead of the screen. The `>` operator creates a new file (or overwrites an existing one):

```sh
# Save ls output to a file
ls -la > filelist.txt

# Now the output is in the file, not on screen
cat filelist.txt

# Warning: > overwrites existing files!
echo "New content" > myfile.txt    # Overwrites myfile.txt!
```

### Append Redirection (>>)

**Append redirection** adds to the end of a file instead of overwriting:

```sh
# Add a line to a file
echo "First line" > log.txt
echo "Second line" >> log.txt
echo "Third line" >> log.txt

cat log.txt
# First line
# Second line
# Third line
```

### Input Redirection (<)

**Input redirection** makes a program read from a file instead of the keyboard:

```sh
# Instead of typing a message, read from file
mail user@example.com < message.txt

# Sort reads from file
sort < names.txt

# This is equivalent to:
sort names.txt
# But input redirection is more explicit
```

### Error Redirection (2>)

**Error redirection** sends stderr to a file. Remember, stderr is stream number 2:

```sh
# Save errors to a file
ls /nonexistent 2> errors.txt

# Normal output still goes to screen
ls /home 2> errors.txt
# ↑ Shows /home contents on screen, errors go to file

# Append errors
ls /fake1 2>> all_errors.txt
ls /fake2 2>> all_errors.txt
```

### Combining Redirections

```sh
# Save stdout and stderr to DIFFERENT files
command > output.txt 2> errors.txt

# Save both to the SAME file
command > all.txt 2>&1
# The 2>&1 means "send stderr where stdout is going"

# Modern syntax (bash 4+):
command &> all.txt

# Discard output entirely (send to /dev/null)
command > /dev/null 2>&1
# Or:
command &> /dev/null
```

!!! tip "The Black Hole: /dev/null"
    `/dev/null` is a special file that discards everything written to it. It's like a black hole for data! Use it when you want to run a command but don't care about its output:
    ```sh
    # Run quietly
    noisy_command > /dev/null 2>&1
    ```

### Redirection Summary

| Operator | Name | Effect |
|----------|------|--------|
| `>` | Output redirect | Write stdout to file (overwrite) |
| `>>` | Append redirect | Write stdout to file (append) |
| `<` | Input redirect | Read stdin from file |
| `2>` | Error redirect | Write stderr to file (overwrite) |
| `2>>` | Error append | Write stderr to file (append) |
| `&>` | All redirect | Write stdout AND stderr to file |
| `2>&1` | Stderr to stdout | Send stderr where stdout goes |

## The Pipe Operator: Connecting Commands

The **pipe operator** (`|`) is where the magic happens! It connects the stdout of one command to the stdin of another, creating a **pipeline**.

```sh
# Output of ls becomes input to grep
ls -la | grep ".txt"

# Output of cat becomes input to sort
cat names.txt | sort

# Chain multiple commands
cat data.txt | sort | uniq | head -10
```

Think of it like actual plumbing: the output "flows" from one command into the next!

### Pipeline Commands: Building Data Processing Chains

**Pipeline commands** let you combine simple tools to do complex tasks:

```sh
# Count lines containing "error" in a log file
cat /var/log/syslog | grep "error" | wc -l

# Find the 10 largest files
ls -la | sort -k5 -n -r | head -10

# Find unique users who logged in
last | awk '{print $1}' | sort | uniq

# Process a CSV: extract column 2, sort, count occurrences
cat data.csv | cut -d',' -f2 | sort | uniq -c | sort -rn
```

### Real Pipeline Examples

```sh
# Find most common words in a file
cat book.txt | tr ' ' '\n' | tr -d '[:punct:]' | tr '[:upper:]' '[:lower:]' | sort | uniq -c | sort -rn | head -20

# Find running processes using most memory
ps aux | sort -k4 -rn | head -10

# Find all TODO comments in code
grep -rn "TODO" src/ | cut -d: -f1 | sort | uniq -c | sort -rn
```

!!! note "Pipelines Don't Include stderr"
    By default, pipes only pass stdout. Error messages still go to your screen, which is usually what you want for debugging. To pipe stderr too, use `2>&1 |` or `|&` (bash).

#### Diagram: Pipeline Flow

<details markdown="1">
<summary>Understanding Command Pipelines</summary>
Type: diagram

Bloom Taxonomy: Understand, Apply
Learning Objective: Visualize how data flows through a pipeline of commands, with each command's output becoming the next command's input.

Layout: Horizontal chain of connected command boxes

Example pipeline: `cat file.txt | grep "error" | sort | uniq -c`

Visual elements:
1. Source (file icon): file.txt
2. Command boxes connected by pipe symbols:
   - cat: Reads file, outputs all lines
   - grep "error": Filters to error lines only
   - sort: Alphabetizes lines
   - uniq -c: Counts unique lines
3. Final output (screen icon): Results

Between each stage, show:
- Pipe symbol (|)
- Data preview (sample lines at that stage)
- Line count (how many lines at each stage)

Example data flow:
- cat output: 1000 lines (all content)
- grep output: 23 lines (only errors)
- sort output: 23 lines (alphabetized)
- uniq -c output: 5 lines (unique errors with counts)

Animation:
- Data "packets" flowing left to right
- Each command box lights up as it processes
- Output appears on right side

Interactive features:
- Click each command to see its effect
- Show intermediate output at each stage
- Toggle different example pipelines

Color scheme:
- Commands: Blue boxes
- Data flow: Green arrows
- Pipe symbols: Gray
- Filtered data: Yellow highlight

Implementation: p5.js
</details>

## The Tee Command: Output to File AND Screen

The **tee command** is like a plumbing T-junction: it sends output to BOTH a file AND stdout (so the pipeline can continue):

```sh
# Save intermediate results while continuing pipeline
cat data.txt | sort | tee sorted.txt | uniq > final.txt
# sorted.txt has sorted data
# final.txt has sorted unique data

# Watch output while saving to file
./long_process | tee output.log
# You see output on screen AND it's saved to file

# Append instead of overwrite
echo "new line" | tee -a logfile.txt
```

Use tee when you want to:

- Debug a pipeline by saving intermediate results
- Watch progress while logging
- Send output to multiple destinations

## The Tr Command: Translate Characters

The **tr command** (translate) transforms characters—replacing, deleting, or squeezing them:

```sh
# Replace characters (lowercase to uppercase)
echo "hello" | tr 'a-z' 'A-Z'
# HELLO

# Replace spaces with newlines
echo "one two three" | tr ' ' '\n'
# one
# two
# three

# Delete characters
echo "hello123world" | tr -d '0-9'
# helloworld

# Squeeze repeated characters
echo "hellooooo    world" | tr -s 'o '
# hello world

# Replace multiple characters
echo "hello" | tr 'aeiou' '12345'
# h2ll4
```

### Tr Character Classes

```sh
# Replace all lowercase with uppercase
tr '[:lower:]' '[:upper:]' < file.txt

# Delete non-printable characters
tr -d '[:cntrl:]' < file.txt

# Replace digits with X
echo "Phone: 555-1234" | tr '[:digit:]' 'X'
# Phone: XXX-XXXX
```

| Class | Matches |
|-------|---------|
| `[:lower:]` | Lowercase letters |
| `[:upper:]` | Uppercase letters |
| `[:digit:]` | Digits 0-9 |
| `[:alpha:]` | All letters |
| `[:alnum:]` | Letters and digits |
| `[:space:]` | Whitespace |
| `[:punct:]` | Punctuation |

## The Rev Command: Reverse Lines

The **rev command** reverses each line character by character:

```sh
echo "hello" | rev
# olleh

echo "Linux is fun" | rev
# nuf si xuniL

# Reverse a file line by line
rev < original.txt > reversed.txt
```

While it seems simple, rev can be useful in pipelines:

```sh
# Get the last field when you don't know how many fields there are
echo "/path/to/some/file.txt" | rev | cut -d'/' -f1 | rev
# file.txt
```

## The Fold Command: Wrap Long Lines

The **fold command** wraps long lines at a specified width:

```sh
# Wrap at 40 characters
echo "This is a very long line that should be wrapped at forty characters" | fold -w 40
# This is a very long line that should be
# wrapped at forty characters

# Wrap at word boundaries (don't break words)
fold -w 40 -s < long_text.txt

# Process a file
fold -w 80 document.txt > wrapped.txt
```

Useful for:

- Formatting text for display
- Preparing text for printing
- Making files easier to read in terminals

## The Xargs Command: Build Commands from Input

The **xargs command** takes input and turns it into arguments for another command. It's incredibly powerful for batch operations!

```sh
# Delete all .tmp files found by find
find . -name "*.tmp" | xargs rm

# Without xargs, you'd need:
rm $(find . -name "*.tmp")  # Can break with many files!

# Echo arguments to see what xargs does
echo "one two three" | xargs echo "Items:"
# Items: one two three

# Process one item at a time (-n 1)
echo "one two three" | xargs -n 1 echo "Item:"
# Item: one
# Item: two
# Item: three
```

### Safe Xargs with -0

When filenames contain spaces or special characters, use `-print0` with find and `-0` with xargs:

```sh
# Safe deletion even with weird filenames
find . -name "*.bak" -print0 | xargs -0 rm

# Process files with spaces in names
find . -name "*.txt" -print0 | xargs -0 wc -l
```

### Xargs with Custom Commands

```sh
# Download multiple URLs
cat urls.txt | xargs -n 1 curl -O

# Run command for each line
cat servers.txt | xargs -I {} ssh {} "uptime"
# {} is replaced with each line

# Parallel execution (-P)
cat files.txt | xargs -P 4 -n 1 process_file
# Runs 4 processes in parallel
```

## The Sed Command: Stream Editor

The **sed command** (stream editor) transforms text as it flows through. It's like find-and-replace on steroids!

### Sed Substitution: Find and Replace

**Sed substitution** is the most common sed operation. The basic syntax is `s/pattern/replacement/`:

```sh
# Replace first occurrence on each line
echo "hello world" | sed 's/world/Linux/'
# hello Linux

# Replace ALL occurrences (g flag)
echo "one one one" | sed 's/one/two/g'
# two two two

# Case insensitive (i flag)
echo "Hello HELLO hello" | sed 's/hello/hi/gi'
# hi hi hi
```

### Sed Substitution Patterns

```sh
# Replace in a file (output to stdout)
sed 's/old/new/g' file.txt

# Edit file IN PLACE (-i flag)
sed -i 's/old/new/g' file.txt

# Create backup before editing
sed -i.bak 's/old/new/g' file.txt
# Creates file.txt.bak with original

# Use different delimiter (useful when pattern contains /)
sed 's|/usr/local|/opt|g' paths.txt
sed 's#http://#https://#g' urls.txt
```

### More Sed Operations

```sh
# Delete lines matching pattern
sed '/pattern/d' file.txt

# Delete empty lines
sed '/^$/d' file.txt

# Delete lines 5-10
sed '5,10d' file.txt

# Print only matching lines (like grep)
sed -n '/pattern/p' file.txt

# Multiple operations
sed -e 's/old/new/' -e 's/foo/bar/' file.txt

# Or use semicolons
sed 's/old/new/; s/foo/bar/' file.txt
```

### Sed Address Ranges

```sh
# Apply only to line 5
sed '5s/old/new/' file.txt

# Apply to lines 1-10
sed '1,10s/old/new/' file.txt

# Apply from line 5 to end
sed '5,$s/old/new/' file.txt

# Apply only to lines matching pattern
sed '/error/s/old/new/' file.txt
```

### Practical Sed Examples

```sh
# Remove leading whitespace
sed 's/^[[:space:]]*//' file.txt

# Remove trailing whitespace
sed 's/[[:space:]]*$//' file.txt

# Remove both (trim)
sed 's/^[[:space:]]*//; s/[[:space:]]*$//' file.txt

# Add prefix to each line
sed 's/^/PREFIX: /' file.txt

# Add suffix to each line
sed 's/$/ :SUFFIX/' file.txt

# Replace entire line if it matches
sed '/error/c\This line had an error' file.txt

# Insert line before match
sed '/pattern/i\New line before' file.txt

# Insert line after match
sed '/pattern/a\New line after' file.txt
```

!!! tip "Test Before Editing In-Place"
    Always test your sed command WITHOUT `-i` first to see the output. Once you're sure it's correct, add `-i` to modify the file:
    ```sh
    sed 's/old/new/g' file.txt          # Preview changes
    sed -i 's/old/new/g' file.txt       # Apply changes
    ```

## The Awk Command: Pattern Scanning and Processing

The **awk command** is actually a complete programming language designed for text processing! It's especially powerful for working with structured data (like CSV files or log files).

### Awk Fields: Column-Based Processing

**Awk fields** are columns of text, separated by whitespace (by default). Awk automatically splits each line into fields:

- `$0` = entire line
- `$1` = first field
- `$2` = second field
- And so on...

```sh
# Sample: ps aux output
# USER       PID  %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
# root         1  0.0  0.1 169836 13460 ?        Ss   Dec01   0:11 /sbin/init

# Print first field (username)
ps aux | awk '{print $1}'

# Print first and third fields
ps aux | awk '{print $1, $3}'

# Print specific columns
cat data.txt | awk '{print $2, $4}'
```

### Custom Field Separator

```sh
# Use comma as separator (for CSV)
awk -F',' '{print $1, $3}' data.csv

# Use colon (for /etc/passwd)
awk -F':' '{print $1, $6}' /etc/passwd
# Prints username and home directory

# Use tab
awk -F'\t' '{print $1}' file.tsv
```

### Awk Patterns: Conditional Processing

**Awk patterns** let you process only lines that match a condition:

```sh
# Only lines where field 1 is "root"
awk '$1 == "root" {print $0}' /etc/passwd

# Only lines where field 3 is greater than 100
awk '$3 > 100 {print $1, $3}' data.txt

# Pattern matching (regex)
awk '/error/ {print $0}' log.txt

# Combine pattern with action
awk '/error/ {print "Found:", $0}' log.txt
```

### Awk Built-in Variables

| Variable | Meaning |
|----------|---------|
| `NR` | Number of Records (current line number) |
| `NF` | Number of Fields in current line |
| `$0` | Entire current line |
| `$1`, `$2`... | Individual fields |
| `FS` | Field Separator |
| `RS` | Record Separator |
| `OFS` | Output Field Separator |

```sh
# Print line numbers
awk '{print NR, $0}' file.txt

# Print last field of each line
awk '{print $NF}' file.txt

# Print number of fields per line
awk '{print NF, "fields:", $0}' file.txt

# Print lines with more than 5 fields
awk 'NF > 5' file.txt
```

### Awk BEGIN and END

```sh
# Print header and footer
awk 'BEGIN {print "=== START ==="} {print $0} END {print "=== END ==="}' file.txt

# Calculate sum
awk '{sum += $1} END {print "Total:", sum}' numbers.txt

# Calculate average
awk '{sum += $1; count++} END {print "Average:", sum/count}' numbers.txt

# Count lines matching pattern
awk '/error/ {count++} END {print count, "errors"}' log.txt
```

### Practical Awk Examples

```sh
# Sum a column (column 3)
awk '{sum += $3} END {print sum}' data.txt

# Find maximum value
awk 'BEGIN {max = 0} $3 > max {max = $3} END {print max}' data.txt

# Print lines longer than 80 characters
awk 'length($0) > 80' file.txt

# Format output nicely
awk '{printf "%-15s %10d\n", $1, $2}' data.txt

# Swap first two fields
awk '{temp = $1; $1 = $2; $2 = temp; print}' data.txt

# Remove duplicate lines (like uniq but doesn't need sorted input)
awk '!seen[$0]++' file.txt

# Convert CSV to TSV
awk -F',' '{OFS="\t"; $1=$1; print}' data.csv
```

#### Diagram: Awk Field Processing

<details markdown="1">
<summary>Understanding Awk Fields</summary>
Type: microsim

Bloom Taxonomy: Apply, Analyze
Learning Objective: Allow students to visualize how awk splits lines into fields and select specific columns.

Canvas layout (responsive, ~750px max width):
- Top section (80px): Input line with field separators marked
- Middle section (200px): Field boxes showing $1, $2, $3, etc.
- Bottom section (100px): Output based on selected fields

Visual elements:
- Input line: "john:x:1000:1000:John Doe:/home/john:/bin/bash"
- Field separator dropdown: (space, :, ,, tab)
- Field boxes highlighting each parsed field
- Output preview

Interactive controls:
- Dropdown: Select field separator
- Checkboxes: Select which fields to output ($1, $2, etc.)
- Text input: Custom awk command
- Sample input selector: (passwd file, CSV data, ps output)

Sample data options:
1. /etc/passwd format: john:x:1000:1000:John Doe:/home/john:/bin/bash
2. CSV format: Alice,Engineering,75000,Seattle
3. ps aux format: root 1 0.0 0.1 169836 13460 ? Ss Dec01 0:11 /sbin/init

Behavior:
- Changing separator re-parses the line
- Selected fields appear in output
- Show NF value
- Show generated awk command

Color scheme:
- $1: Red
- $2: Orange
- $3: Yellow
- $4: Green
- $5: Blue
- $6: Purple
- Field separator: Gray highlighted

Implementation: p5.js
</details>

## Putting It All Together: Text Processing Workflows

Let's combine everything to solve real problems!

### Workflow 1: Log Analysis

```sh
# Find error patterns and count occurrences
cat /var/log/syslog | \
  grep -i error | \
  awk '{print $5}' | \
  sort | uniq -c | sort -rn | head -10
```

### Workflow 2: CSV Processing

```sh
# Process CSV: extract columns, filter, summarize
cat sales.csv | \
  awk -F',' 'NR > 1 {print $2, $4}' | \
  grep "Electronics" | \
  awk '{sum += $2} END {print "Electronics total:", sum}'
```

### Workflow 3: Text Cleanup

```sh
# Clean up messy text file
cat messy.txt | \
  tr -s ' ' | \
  sed 's/^[[:space:]]*//' | \
  sed 's/[[:space:]]*$//' | \
  sed '/^$/d' > clean.txt
```

### Workflow 4: System Information

```sh
# Find top 10 largest files
find /home -type f -exec ls -s {} \; 2>/dev/null | \
  sort -rn | \
  head -10

# Find users with most processes
ps aux | \
  awk 'NR > 1 {print $1}' | \
  sort | uniq -c | sort -rn
```

## Sed and Awk Cheat Sheet

### Sed Quick Reference

```sh
# Substitution
sed 's/old/new/'          # First occurrence
sed 's/old/new/g'         # All occurrences
sed 's/old/new/gi'        # All, case insensitive

# Line operations
sed '5d'                  # Delete line 5
sed '/pattern/d'          # Delete matching lines
sed '/^$/d'               # Delete empty lines
sed -n '/pattern/p'       # Print matching lines

# In-place editing
sed -i 's/old/new/g' file
sed -i.bak 's/old/new/g' file  # With backup
```

### Awk Quick Reference

```sh
# Print fields
awk '{print $1}'          # First field
awk '{print $1, $3}'      # Fields 1 and 3
awk '{print $NF}'         # Last field

# Field separator
awk -F':' '{print $1}'    # Colon separated
awk -F',' '{print $1}'    # Comma separated

# Patterns
awk '/error/'             # Lines matching "error"
awk '$3 > 100'            # Field 3 greater than 100
awk 'NR > 1'              # Skip first line (header)

# Math
awk '{sum += $1} END {print sum}'    # Sum column
awk 'END {print NR}'                 # Count lines
```

## Key Takeaways

You've learned the power of UNIX text processing!

- **Text streams**: stdin, stdout, stderr—the three channels of data flow
- **Redirection**: `>`, `>>`, `<`, `2>` control where data goes
- **Pipes**: `|` connects commands into powerful pipelines
- **Sed**: Stream editor for find/replace and text transformation
- **Awk**: Field-based processing with pattern matching
- **Tr**: Character translation and deletion
- **Xargs**: Convert input to command arguments
- **Tee**: Split output to file and screen
- **Rev/Fold**: Reverse and wrap text

!!! success "You're a Text Processing Master!"
    These tools embody the UNIX philosophy: small, focused programs combined to do big things. Practice building pipelines, and you'll find elegant solutions to problems that would take dozens of lines of code in other languages!

## What's Next?

Now that you can process text like a pro, it's time to learn about **text editors**! Next chapter covers nano and vim—the editors you'll use to write scripts, edit configs, and work on code.

---

??? question "Quick Quiz: Sed, Awk, and Pipes"
    1. What does `>` do differently than `>>`?
    2. What stream number is stderr?
    3. How do you print the third field in awk?
    4. What does `sed 's/old/new/g'` do?
    5. What does the `tee` command do?
    6. How do you make sed edit a file in place?

??? note "Quiz Answers"
    1. `>` overwrites the file; `>>` appends to the file
    2. stderr is stream 2
    3. `awk '{print $3}'` prints the third field
    4. Replaces ALL occurrences of "old" with "new" on each line (g = global)
    5. tee sends output to BOTH a file AND stdout (continues the pipeline)
    6. `sed -i 's/old/new/g' file` - the -i flag edits in place

