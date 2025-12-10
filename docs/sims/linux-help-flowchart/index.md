# Linux Help System Decision Flowchart

## Overview

This interactive flowchart helps students quickly determine which Linux help system to use based on their specific situation. By following the decision tree, learners can efficiently find the right command to get help, whether they're discovering unknown commands, need comprehensive documentation, or just want a quick reference.

## Interactive Diagram

<iframe src="main.html" width="100%" height="600px"></iframe>

[View the Diagram Fullscreen](main.html)

## Description

Linux provides multiple help systems, each designed for different purposes. This decision flowchart guides you through the process of selecting the most appropriate help command based on two key questions: Do you know the command name? And how much detail do you need?

## Workflow Steps

1. **Start**: You need help with a Linux command
2. **First Decision - Do you know the command name?**
   - **No**: Use `apropos [keyword]` to search for commands by description
   - **Yes**: Proceed to determine detail level needed
3. **Second Decision - How much detail do you need?**
   - **Full documentation**: Use `man [command]` for comprehensive manual pages
   - **Just a reminder**: Proceed to check command type
4. **Third Decision - Is it a shell built-in?**
   - **Yes**: Use `help [command]` for bash built-in commands
   - **No/Unsure**: Use `command --help` for quick reference

### Additional Paths

- **Want a one-line summary?** Use `whatis [command]`
- **Need to check if a command is built-in?** Use `type [command]`

## Key Concepts

- **apropos**: Searches manual page descriptions for keywords - great for discovering commands
- **man**: Displays comprehensive manual pages with full documentation
- **--help**: Quick reference flag supported by most commands
- **help**: Bash built-in for getting help on shell built-in commands
- **whatis**: Provides one-line description of a command
- **type**: Reveals whether a command is built-in, alias, or external

## Color Coding

The diagram uses semantic colors to help distinguish different types of help commands:

| Color | Type | Purpose |
|-------|------|---------|
| Yellow | Decision diamonds | Decision points requiring user choice |
| Blue | Discovery | `apropos` - finding unknown commands |
| Green | Comprehensive | `man` - full documentation |
| Orange | Quick reference | `--help` and `help` - brief help |
| Purple | Summary | `whatis` - one-line descriptions |

## Example Outcomes

| Situation | Command | Result |
|-----------|---------|--------|
| Don't know command for compression | `apropos compress` | Lists compression-related commands |
| Need full tar documentation | `man tar` | Displays complete tar manual |
| Quick reminder for ls options | `ls --help` | Shows ls usage summary |
| Check what `cd` does | `whatis cd` | "cd - change directory" |
| Is `echo` built-in? | `type echo` | "echo is a shell builtin" |

## Usage Notes

This diagram illustrates the workflow described above. Each node represents a step or decision point in the process, with arrows showing the flow of control.

**Node Types:**

- **Rounded rectangles**: Start and end points
- **Rectangles**: Process steps or actions
- **Diamonds**: Decision points requiring branching

**Interactive Features:**

- Use zoom controls (+/-) to adjust diagram size
- Click "Export SVG" to download the diagram
- Click on nodes to highlight them

## Related Concepts

- [Getting Help in Linux](../../chapters/05-getting-help/index.md) - Full chapter on Linux help systems
- [Command Line Basics](../../chapters/03-command-line/index.md) - Introduction to the command line
- [Man Pages](../../glossary.md#man-pages) - Glossary entry for manual pages
