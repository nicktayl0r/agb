# What is this directory?

A lot of files in the alleged build dont actually get built, they exist independent of the webpack configurations.
The simplest path for resolving the issue was to take these files and simply copy them into the build directory.

- jsonEditor is overwritten to an extent, which should be addressed at some point.
- ckeditor should be replaced with something from npm. `ckeditor4` perhaps or we could just use the [cdn](https://cdn.ckeditor.com/#ckeditor4)
- dist is overwritten in _possibly_ negligent ways.
