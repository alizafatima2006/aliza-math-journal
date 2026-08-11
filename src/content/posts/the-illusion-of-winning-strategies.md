---
title: The Illusion of Winning Strategies
published: 2026-07-31
description: An exploration of why choosing when to stop does not create an advantage in a fair game.
tags: [Probability, Martingales, Optional Stopping]
category: Articles
draft: false
---
“Quit while you’re ahead”, “Take the money and run”, “Lock in your gains”; there are many popular idiomatic phrases indicating that simply being smart regarding when to stop a game can result in a winning strategy. This same notion is echoed throughout popular media where stopping strategies such as the doubling strategy are repetitively painted as clever tactics to ensure an optimal result. For this reason, it may intuitively feel like the answer to the simple question “Can you beat a fair game by simply choosing when to stop?” is a definitive yes. However, mathematically, something much more subtle is going on.

## Modelling Fair Games Using Martingales

A fair game, loosely speaking, is some game where there are no advantages and your expected gain or loss at each step is zero. In probability theory, a fair game is modelled using martingales.

:::definition{title="Martingale"}
A sequence of random variables $\{M_n : 0 \leq n < \infty\}$ is a martingale with respect to the sequence of random variables $\{X_n : 1 \leq n < \infty\}$ if the following properties hold for all $n \geq 1$:

- There is a function $f_n:\mathbb{R}^n \to \mathbb{R}$ such that
  $$
  M_n = f_n(X_1,\ldots,X_n).
  $$
- $$
  \mathbb{E}(M_n \mid X_1,\ldots,X_{n-1}) = M_{n-1}.
  $$
- $$
  \mathbb{E}(|M_n|) < \infty.
  $$
:::

These properties amount to the conditional expectation at any step, given all previous knowledge and assuming that the expected value of each step is finite, being equal to the previous step. Thus, given everything you know, the best prediction for the next value is simply the current value.

:::example{title="The Simple Random Walk"}
One fundamental introductory example of a fair game is the **simple random walk**. This walk provides a model of the wealth process of a gambler who makes a living by repeatedly flipping a fair coin.

Let $S_0$ denote an arbitrary real number representing the initial life savings of a gambler who bets one dollar on every flip of the coin. Let $\{X_n:1\leq n<\infty\}$ denote a sequence of independent random variables with the probability distribution:

$$
P(X_n=1)=P(X_n=-1)=\frac12.
$$

So, at each step, the gambler wins \$1 with probability $\tfrac12$ and loses \$1 with probability $\tfrac12$.

Now define

$$
S_n=S_0+X_1+\cdots+X_n.
$$

The random variable $S_n$ represents the gambler's net worth after $n$ coin tosses.

Since $S_n$ depends only on the first $n$ coin tosses, has finite expectation, and satisfies

$$
\mathbb{E}(S_n\mid X_1,\ldots,X_{n-1})=S_{n-1},
$$

it follows that $(S_n)$ is a martingale with respect to $\{X_n:1\leq n<\infty\}$, making the process fair.
:::

## Stopping Times

The central question being worked towards is “Even if the game is mathematically fair, can an advantage be gained by choosing when to stop?”. For example, by always stopping when at a net gain or stopping after a winning streak, is it possible to guarantee a favourable outcome? This is where intuition strongly suggests that one should be able to win. To formalize this, the concept of a stopping time is introduced.

:::definition{title="Stopping Time"}
A stopping time, $\tau$, is a random time such that the decision to stop at that time depends only on information from the past up to that time and not on the future. So mathematically, the event $\{\tau=n\}$ is a valid stopping time if it depends only on past events $X_0, \ldots ,X_n$.
:::

Any “realistic” stopping strategy can be modelled using stopping times. 

:::example{title="Stopping Strategies"}
Some examples of strategies based on choosing when to stop include:
- Stopping the second time the gambler wins. This uses a valid stopping time.
- Stopping at the 8th turn. This uses a valid stopping time.
- Stopping at the first loss before a sequence of 3 losses. This does not use a valid stopping time since determining whether a loss is the first loss before three consecutive losses requires knowledge of future outcomes.
:::

## The Optional Stopping Theorem
In the case of a fair game such as the random walk with stopping time $\tau$, the stopped process $M_\tau$ is examined. The key question becomes:

$$
\mathbb{E}(M_\tau)\overset{?}{=}\mathbb{E}(M_0).
$$

If this equality holds then no advantage is gained by choosing when to stop and the game is still fair. The question is answered through one of the fundamental results of martingale theory.

:::theorem{title="Optional Stopping Theorem"}
Let the sequence of random variables $\{M_n:0\leq n<\infty\}$ be a martingale with respect to the sequence of random variables $\{X_n:1\leq n<\infty\}$. Let $\tau$ be a stopping time with respect to $\{X_n:1\leq n<\infty\}$.

Suppose at least one of the following conditions holds:

- $(M_n)$ is bounded.

- $\tau$ is bounded.

- $\mathbb{E}(\tau)<\infty$ and there exists a constant $C$ such that

  $$
  \mathbb{E}\!\left(\left|M_{n+1}-M_n\right|\mid X_1,\ldots,X_n\right)<C.
  $$

Then

$$
\mathbb{E}(M_\tau)=\mathbb{E}(M_0).
$$

:::

Despite the seeming technicality of the conditions, the key insight is that the theorem applies whenever the martingale and stopping strategy satisfy suitable regularity conditions that rule out unbounded risk or indefinite wait. If one applies this to the random walk example then it indicates that no matter how complex or well-thought out the stopping strategy is, the gambler is not expected to make any profit as long as the strategy is feasible. More generally, the intuitive idea that one can beat a fair game using a careful stopping strategy is not typically accurate.

:::example{title="A Random Walk Between Two Barriers"}
For a concrete application of the Optional Stopping Theorem, consider a simple random walk starting at zero. Define the stopping time

$$
\tau=\inf\{n:S_n=a \text{ or } S_n=-b\},
$$

where $a$ and $b$ are positive integers.

This means that you stop as soon as you hit either $+a$ or $-b$. Since $(S_n)$ is a martingale and $\tau$ satisfies the hypotheses of the Optional Stopping Theorem,

$$
\mathbb{E}(S_\tau)=\mathbb{E}(S_0)=0.
$$

Now let

$$
p=P(S_\tau=a)
$$

denote the probability that the random walk reaches the upper barrier before the lower barrier. The since the walk must end at either when you hit either $+a$ or $-b$,

$$
\mathbb{E}(S_\tau)
=ap+(-b)(1-p).
$$

Combining this with the Optional Stopping Theorem gives

$$
ap-b(1-p)=0,
$$

which implies

$$
p=\frac{b}{a+b}.
$$

Thus, the probability of first hitting the upper barrier is determined entirely by the fairness of the random walk and the locations of the two barriers.
:::

:::remark{title="Why the Doubling Strategy Does Not Contradict the Theorem"}

One might wonder whether the famous **doubling strategy** provides a counterexample to the Optional Stopping Theorem. The strategy follows a simple rule:

- Bet \$1.
- If you lose, bet \$2.
- If you lose again, bet \$4.
- Continue doubling the bet until you eventually win.

The strategy seems to guarantee profit since a fair coin eventually lands heads with a probability of one and when this occurs the gambler experiences a net gain of $1. This suggests

$$
\mathbb{E}(S_\tau)>0,
$$

which appears to contradict the Optional Stopping Theorem.

However, the apparent contradiction disappears once the hypotheses of the theorem are examined. This strategy satisfies none of the theorem's three sufficient conditions since the stopping time $\tau$ is not bounded, the strategy requires the gambler to risk an arbitrarily large amount of money, and changes in the martingale are not constrained. Thus, the Optional Stopping Theorem is not contradicted.
:::

More broadly, the Optional Stopping Theorem demonstrates that information alone cannot result in an advantage in a fair game, a recurring theme in probability theory. No matter how cleverly one analyzes the situation, fairness is preserved unless one is willing to take large risks such as having to spend arbitrarily large amount of money or continuing for unknown, lengthy durations of time. The result demonstrates that what appears to be a winning strategy is often an illusion created by focusing on the eventual successful outcomes without considering the risks and potential losses required to achieve them.