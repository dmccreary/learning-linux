# Quiz: Text Editors - Nano and Vim

Test your understanding of command-line text editors.

---

#### 1. What makes nano a good choice for beginners?

<div class="upper-alpha" markdown>
1. It's the fastest editor
2. It displays shortcut hints at the bottom of the screen
3. It has the most features
4. It only works in graphical mode
</div>

??? question "Show Answer"
    The correct answer is **B**. Nano displays keyboard shortcuts at the bottom of the screen (like ^X for exit, ^O for save), making it intuitive for beginners. The `^` symbol means Ctrl, so `^X` means Ctrl+X.

    **Concept Tested:** Nano Editor

    **See:** [Chapter 10 - Nano Editor](index.md)

---

#### 2. In nano, what does Ctrl+O do?

<div class="upper-alpha" markdown>
1. Opens a new file
2. Writes (saves) the current file
3. Cuts a line
4. Exits nano
</div>

??? question "Show Answer"
    The correct answer is **B**. Ctrl+O in nano writes (saves) the file. You'll be prompted to confirm the filename. Ctrl+X exits, and if you have unsaved changes, nano will ask if you want to save first.

    **Concept Tested:** Nano Editor

    **See:** [Chapter 10 - Nano Commands](index.md)

---

#### 3. What are vim's two main modes?

<div class="upper-alpha" markdown>
1. Light mode and dark mode
2. Normal (command) mode and insert mode
3. Read mode and write mode
4. User mode and admin mode
</div>

??? question "Show Answer"
    The correct answer is **B**. Vim has multiple modes, but the two main ones are Normal mode (for commands and navigation) and Insert mode (for typing text). Press `i` to enter insert mode, and `Esc` to return to normal mode.

    **Concept Tested:** Vim Editor, Vim Modes

    **See:** [Chapter 10 - Vim Modes](index.md)

---

#### 4. How do you save and quit in vim?

<div class="upper-alpha" markdown>
1. Ctrl+S then Ctrl+Q
2. :wq or :x (in normal mode)
3. F2 then F10
4. /save /quit
</div>

??? question "Show Answer"
    The correct answer is **B**. In vim's normal mode, type `:wq` (write and quit) or `:x` to save and exit. Use `:w` to save without quitting, or `:q!` to quit without saving (force quit).

    **Concept Tested:** Vim Commands

    **See:** [Chapter 10 - Vim Commands](index.md)

---

#### 5. In vim, what does pressing `i` do?

<div class="upper-alpha" markdown>
1. Inserts a new line
2. Enters insert mode at the cursor position
3. Indents the current line
4. Inverts text colors
</div>

??? question "Show Answer"
    The correct answer is **B**. Pressing `i` in vim's normal mode enters insert mode at the cursor position, allowing you to type text. Other insert options: `a` (after cursor), `o` (new line below), `O` (new line above).

    **Concept Tested:** Vim Insert Mode

    **See:** [Chapter 10 - Entering Insert Mode](index.md)

---

#### 6. In vim's normal mode, what does `dd` do?

<div class="upper-alpha" markdown>
1. Duplicates the current line
2. Deletes the current line
3. Downloads a file
4. Displays documentation
</div>

??? question "Show Answer"
    The correct answer is **B**. In vim, `dd` deletes (cuts) the entire current line. The deleted line is stored in a buffer and can be pasted with `p`. Use `5dd` to delete 5 lines at once.

    **Concept Tested:** Vim Commands

    **See:** [Chapter 10 - Vim Editing](index.md)

---

#### 7. How do you search for text in vim?

<div class="upper-alpha" markdown>
1. Ctrl+F
2. /searchterm (in normal mode)
3. :find searchterm
4. F3
</div>

??? question "Show Answer"
    The correct answer is **B**. In normal mode, type `/` followed by your search term and press Enter. Press `n` to go to the next match, `N` for the previous match. Use `?` to search backwards.

    **Concept Tested:** Vim Search

    **See:** [Chapter 10 - Searching in Vim](index.md#searching)

---

#### 8. What does `u` do in vim's normal mode?

<div class="upper-alpha" markdown>
1. Undoes the last change
2. Uppercases text
3. Updates the file
4. Unindents a line
</div>

??? question "Show Answer"
    The correct answer is **A**. Pressing `u` in vim's normal mode undoes the last change. Press `u` multiple times to undo multiple changes. Use `Ctrl+R` to redo (undo the undo).

    **Concept Tested:** Vim Commands

    **See:** [Chapter 10 - Undo and Redo](index.md)

---

#### 9. In vim, what does `yy` followed by `p` do?

<div class="upper-alpha" markdown>
1. Types "yyp" literally
2. Copies the current line and pastes it below
3. Yanks a file from the internet
4. Prints the file
</div>

??? question "Show Answer"
    The correct answer is **B**. In vim, `yy` "yanks" (copies) the current line, and `p` pastes it below the cursor. This is vim's copy-paste functionality. Use `y` with motions for partial yanks.

    **Concept Tested:** Vim Copy and Paste

    **See:** [Chapter 10 - Copy and Paste](index.md)

---

#### 10. What should you do if you're stuck in vim and don't know how to exit?

<div class="upper-alpha" markdown>
1. Close the terminal window
2. Press Esc, then type :q! and press Enter
3. Press Ctrl+Alt+Delete
4. Unplug the computer
</div>

??? question "Show Answer"
    The correct answer is **B**. If you're stuck, press `Esc` to ensure you're in normal mode, then type `:q!` and press Enter. This force-quits vim without saving. Add `:w` first (`:wq`) if you want to save your work.

    **Concept Tested:** Vim Commands

    **See:** [Chapter 10 - Exiting Vim](index.md)
