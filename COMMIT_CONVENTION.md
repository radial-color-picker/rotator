## Git Commit Message Convention

> This is adapted from [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/4d7d4926c36199e13ef55c39258ee6701880bef8/packages/conventional-changelog-angular).

#### TL;DR:

Messages must be matched by the following regex:

``` js
/^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types)(\(.+\))?: .{1,50}/
```

Examples:
```
feat: Allow uninterrupted dragging when cursor leaves the element
fix: PascalCase the exported UMD constructor function
tests: Add tests for angle setter
build: Update rollup to latest version
docs: Add CircleCI status badge
chore: Add Prettier
```
