---
title: Draft Example
published: 2022-07-01
tags: [Markdown, Blogging, Demo]
category: Examples
draft: true
---

# This Article is a Draft

This article is currently in a draft state and is not published. Therefore, it will not be visible to the general audience. The content is still a work in progress and may require further editing and review.

When the article is ready for publication, you can update the "draft" field to "false" in the Frontmatter:

:::definition{title="Martingale"}
A stochastic process $(M_n)_{n \geq 0}$ is a martingale with respect to a filtration $(\mathcal{F}_n)$ if it is integrable, adapted, and satisfies

$$
\mathbb{E}[M_{n+1}\mid\mathcal{F}_n] = M_n.
$$
:::

:::theorem{title="Optional Stopping Theorem"}
Under suitable boundedness conditions, stopping a martingale at a stopping time does not change its expected value.
:::

:::proof
The conclusion follows by applying the martingale property successively up to the stopping time and taking expectations.
:::

:::remark
The boundedness conditions are essential. Without them, optional stopping can fail.
:::