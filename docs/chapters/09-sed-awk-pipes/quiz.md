# Quiz: Advanced Text Processing - Sed, Awk, and Pipes

Test your understanding of stream editing, data processing, and command pipelines.

---

#### 1. What is the pipe operator `|` used for?

<div class="upper-alpha" markdown>
1. Creating symbolic links
2. Connecting the output of one command to the input of another
3. Writing to multiple files simultaneously
4. Running commands in parallel
</div>

??? question "Show Answer"
    The correct answer is **B**. The pipe `|` sends the standard output (stdout) of one command to the standard input (stdin) of another. For example, `ls | grep ".txt"` lists files and filters for those containing ".txt".

    **Concept Tested:** Pipe Operator

    **See:** [Chapter 9 - Pipes](index.md)

---

#### 2. What does `sed 's/old/new/g' file.txt` do?

<div class="upper-alpha" markdown>
1. Deletes all lines containing "old"
2. Replaces all occurrences of "old" with "new"
3. Searches for "old" and prints line numbers
4. Sorts the file alphabetically
</div>

??? question "Show Answer"
    The correct answer is **B**. The `sed` substitution command `s/old/new/g` replaces all occurrences of "old" with "new". The `g` flag means "global" (all occurrences per line), without it only the first occurrence on each line is replaced.

    **Concept Tested:** Sed Command, Text Substitution

    **See:** [Chapter 9 - Sed Substitution](index.md)

---

#### 3. What does `>` do in a command like `ls > files.txt`?

<div class="upper-alpha" markdown>
1. Appends output to the file
2. Redirects output to the file, overwriting it
3. Reads input from the file
4. Compares the output to the file
</div>

??? question "Show Answer"
    The correct answer is **B**. The `>` operator redirects standard output to a file, overwriting any existing content. Use `>>` to append instead of overwriting. For example, `ls > files.txt` saves the directory listing to files.txt.

    **Concept Tested:** Output Redirection

    **See:** [Chapter 9 - Redirection](index.md#output-redirection)

---

#### 4. What does `awk '{print $1}' file.txt` do?

<div class="upper-alpha" markdown>
1. Prints the first line of the file
2. Prints the first field (column) of each line
3. Prints only one copy of duplicate lines
4. Deletes the first column
</div>

??? question "Show Answer"
    The correct answer is **B**. In awk, `$1` refers to the first field (column) of each line, separated by whitespace by default. So `awk '{print $1}'` extracts and prints just the first word/column from each line.

    **Concept Tested:** Awk Command

    **See:** [Chapter 9 - Awk Basics](index.md)

---

#### 5. What does `2>` redirect?

<div class="upper-alpha" markdown>
1. Standard output (stdout)
2. Standard error (stderr)
3. Standard input (stdin)
4. The second line of output
</div>

??? question "Show Answer"
    The correct answer is **B**. File descriptor 2 is standard error. `2>` redirects error messages to a file. For example, `command 2> errors.txt` saves error messages to errors.txt while normal output still goes to the terminal.

    **Concept Tested:** Standard Error, Redirection

    **See:** [Chapter 9 - Error Redirection](index.md)

---

#### 6. What does the `sort` command do by default?

<div class="upper-alpha" markdown>
1. Sorts numerically
2. Sorts in reverse order
3. Sorts lines alphabetically
4. Removes duplicates
</div>

??? question "Show Answer"
    The correct answer is **C**. By default, `sort` sorts lines in alphabetical (lexicographic) order. Use `-n` for numerical sorting, `-r` for reverse order, and `-u` to also remove duplicates.

    **Concept Tested:** Sort Command

    **See:** [Chapter 9 - Sort Command](index.md)

---

#### 7. What does `uniq` do and what's its requirement?

<div class="upper-alpha" markdown>
1. Makes files unique by adding timestamps
2. Removes duplicate adjacent lines (input must be sorted)
3. Finds unique files in a directory
4. Creates unique filenames
</div>

??? question "Show Answer"
    The correct answer is **B**. `uniq` removes duplicate adjacent lines. Since it only compares neighboring lines, you typically need to sort input first: `sort file.txt | uniq`. Use `-c` to count occurrences.

    **Concept Tested:** Uniq Command

    **See:** [Chapter 9 - Uniq Command](index.md)

---

#### 8. What does `cat file.txt | tr 'a-z' 'A-Z'` do?

<div class="upper-alpha" markdown>
1. Deletes lowercase letters
2. Translates lowercase letters to uppercase
3. Counts lowercase letters
4. Transposes rows and columns
</div>

??? question "Show Answer"
    The correct answer is **B**. The `tr` (translate) command replaces characters. Here it maps each lowercase letter (a-z) to its uppercase equivalent (A-Z), effectively converting the entire file to uppercase.

    **Concept Tested:** Tr Command

    **See:** [Chapter 9 - Tr Command](index.md)

---

#### 9. What does `&>` do in bash?

<div class="upper-alpha" markdown>
1. Runs command in background
2. Redirects both stdout and stderr to a file
3. Creates an alias
4. Appends to a file
</div>

??? question "Show Answer"
    The correct answer is **B**. The `&>` operator redirects both standard output (stdout) and standard error (stderr) to the same file. It's equivalent to `> file 2>&1`. For example, `command &> output.txt` captures all output.

    **Concept Tested:** Redirection

    **See:** [Chapter 9 - Combined Redirection](index.md)

---

#### 10. What does `cut -d',' -f2 data.csv` do?

<div class="upper-alpha" markdown>
1. Cuts the file into two pieces
2. Extracts the second comma-separated field from each line
3. Removes the second line
4. Deletes commas from the file
</div>

??? question "Show Answer"
    The correct answer is **B**. The `cut` command extracts portions of text. Here `-d','` sets the delimiter to comma, and `-f2` selects the second field. This is perfect for extracting columns from CSV files.

    **Concept Tested:** Cut Command

    **See:** [Chapter 9 - Cut Command](index.md)
