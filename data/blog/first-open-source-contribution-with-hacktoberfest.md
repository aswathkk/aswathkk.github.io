---
title: "How I Kick-started Open Source Journey with Hacktoberfest"
description: "How I accomplished the goal of start giving back to the world of Open Source Software. And how you can start contributing to FOSS."
date: 2018-11-26T01:00:00+05:30
tags: ["hacktoberfest", "open-source", "oh-my-zsh"]
draft: false
originUrl: "https://medium.com/@aswathkk/how-i-kick-started-open-source-journey-with-hacktoberfest-2018-d699b228e274"
---

For a long time, I was searching for ways to get started with Open Source contributions. Whenever I see some posts about GSoC, I think this time I should start. However, I always end up reading a few articles on How to start contributing to Open Source Software. In the worst case, I will go to the issue list of a few projects and decide that this is not my cup of tea!
This year, I passed out of college, and I realised that I couldn’t take part in GSoC any more.

![Alt text](images/Hacktoberfest-2018-TShirt.webp "Hacktoberfest-2018 T-shirt design")

When I saw a post about hacktoberfest in Github’s LinkedIn page, I decided to give it a try. One thing which gave me the confidence, which I didn’t have previous time is that I know Puneeth. He is mentoring people in our company. Moreover, he has been making open-source contributions for a long time. When I saw the post about hacktoberfest, I told him to help me. He gave me a blog post written by him:

https://punchagan.muse-amuse.in/blog/i-love-foss-how-do-i-start-contributing-code/

While going through this article, I felt like this is similar to whatever I’ve read previous times. I realised I’ve gone through this sometime back. I told him the same. He asked me about the motivation behind participating in hacktoberfest. He added whether it is just for getting a swag? I told him my intentions. He told me to start by contributing to some FOSS projects that I use. Also, throughout the journey, he helped me in clarifying many doubts I had.

I started exploring the Github repositories of the software that I’m using. I thought this time also I may do the same thing that I did before. However, that was not the case. I saw an issue in the repository [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) which was tagged as hacktoberfest. It was to [add READMEs to undocumented oh-my-zsh plugins](https://github.com/robbyrussell/oh-my-zsh/issues/7175).

# My first Pull Request

I searched through the list of `oh-my-zsh` plugins to see whether I can write some docs for it. I found many!

I asked Puneeth to help me on creating a PR to solve the issue, rather than reading the CONTRIBUTING file of the repository.

> Always read the CONTRIBUTING guide of the repository if they’ve it.

Roughly, the steps are:

- Create a fork of the repository that you want to work. (In my case fork `robbyrussell/oh-my-zsh` to `aswathkk/oh-my-zsh`)
- Clone your fork to your development machine.
- Always create a separate branch out of the master branch to work on each issue.
- Work on the issue. (In my case add documentation)
- Commit the changes by adding meaning full comments and Push to your repository.
- From your repository (`aswathkk/oh-my-zsh`), you can raise a PR to the upstream repository (`robbyrussell/oh-my-zsh`)

By following the steps mentioned above, I built [my first PR](https://github.com/robbyrussell/oh-my-zsh/pull/7216).🕺🕺

The second [PR](https://github.com/robbyrussell/oh-my-zsh/pull/7229) was also on adding docs for multiple plugins. Then I spotted an issue with one of the plugins. Since I faced the problem myself, I knew the solution also. I was glad that [the third PR](https://github.com/robbyrussell/oh-my-zsh/pull/7233) was not to add documentation. I saw that the maintainers are spotting tiny errors in the PRs. I got wondered how on earth these people are finding it out!

I experienced the joy and satisfaction that we get when our initial PRs gets merged to the master branch. That was another level !!

---

# Things I learned by Contributing to Oh-My-Zsh

- **It doesn’t matter what kind of issue you are fixing.**  
  You are doing something for the community, and you are learning something. The first issue that I picked up was to add documentation for a plugin. It was a straightforward task. But it taught me how to contribute to an external Github repository via pull requests.
- **Start with the tools that you use.**  
  While using one of the plugins in oh-my-zsh, I came across a bug. I reported it and opened a PR for fixing the same. Even though that bug was trivial to fix, I got the satisfaction of making oh-my-zsh better!
- **Maintainers of repositories are super awesome.**  
  In all the PRs that I made, there were little errors that I failed to notice. But the maintainers saw it and fixed it themselves while merging to the master.
- **You will learn something new for every issue that you are fixing.**  
  While you submit the PR, others will review your code. They might suggest some changes or they may teach you some coding standards to follow. You may also get to learn a new tool indicated by them.

---

To complete hacktoberfest-2018, we should make at least 5 PRs. I made the other contributions to [openebs](https://medium.com/u/487395ff1add) and finished it.

Apart from hacktoberfest goodies, I was also able to win some awesome goodies such as **Amazon Echo** and a **Laptop** from [openebs](https://medium.com/u/487395ff1add).

Wanted to read that experience?
https://medium.com/@aswathkk/experience-with-openebs-in-this-hacktoberfest-64b9711a22f5
