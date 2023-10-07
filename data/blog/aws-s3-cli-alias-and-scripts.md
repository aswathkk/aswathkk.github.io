---
title: "AWS S3 Command Line aliases & scripts"
description: "Explains my day to day aliases & scripts that I use for AWS S3"
date: 2019-11-15T01:00:00+05:30
tags: ["productivity", "aws"]
draft: false
---

As a data engineer and since my organization is making use of AWS, I have to deal with AWS s3 to manage the data most of the time. Making use of the AWS S3 console (The Web-based UI) has slowed me down. So, mostly I make use of the command-line utilities such as [s3cmd](https://s3tools.org/s3cmd), [s4cmd](https://github.com/bloomreach/s4cmd) and [aws-cli](https://aws.amazon.com/cli/).

If I wanted to list all the contents of a bucket, I would make use of `s3cmd ls <bucket_name>`.

```bash
s3cmd ls <bucket_name>
```

If I wanted to view the content of an s3 file without downloading the file, I will make use of

```bash
s3cmd get <file_path> -
```

If I wanted to only view first few lines, I will pipe the above output to `head` command as follows:

```bash
s3cmd get <file_path> - | head
```

Similar to these, I have multiple use cases which mostly resembles the operations I do locally. I don't want to type these commands and pipe them to other command multiple times. I wanted to simplify all these and provide some meaningful defaults. So, I came up with multiple aliases and shell scripts to do the tasks effectively.

## List contents of s3 path

```bash
alias sls='s3cmd ls --human-readable'
```

## Show content of an s3 file

```bash
function scat {
    s3_path=${@:$#}
    params=${@:1:$# - 1}
    s3cmd get $s3_path - | zcat -f | cat $params
}
```

`scat` will accept all the parameters that is accepted by the cat command. `zcat -f` is used to read the file if it is compressed.

## Show head of an s3 file

```bash
function shead {
    s3_path=${@:$#}
    params=${@:1:$# - 1}
    s3cmd get $s3_path - | zcat -f | head $params
}
```

## Less for s3 files

```bash
function sless {
    s3_path=${@:$#}
    params=${@:1:$# - 1}
    s3cmd get $s3_path - | zcat -f | less $params
}
```

## Get total size of an s3 path

```bash
function ssize {
    aws s3 ls --summarize --human-readable --recursive "$1" | grep "Total Size:"
}
```

All these are available in my [utilities file of my system config](https://github.com/aswathkk/dotfiles/blob/64801c275694abc8bf7a9e03438e63b8fa7d166a/util_scripts/s3utils.sh).
