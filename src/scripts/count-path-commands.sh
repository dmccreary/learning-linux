#!/bin/bash
# Count the number of executable commands in all PATH directories

echo "$PATH" | tr ':' '\n' | while read dir; do
    [ -d "$dir" ] && find "$dir" -maxdepth 1 -type f -perm +111 2>/dev/null
done | wc -l
