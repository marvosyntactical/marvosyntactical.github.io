---
title: "Time, Entropy, and Consciousness"
date: "2025-09-12"
tags: ["time","entropy","thermodynamics","consciousness","information-theory","dopamine","landauer","causality"]
related: []
slug: "subj-time"
---

# Key ideas
- Subjective time splits into online felt speed and retrospective memory duration.
- Retrospective duration scales with information gained per unit entropy production.
- Online felt time depends on arousal (dopamine/NE) and attention to time itself.
- Landauer’s bound links entropy production and effective temperature to power budgets.
- A “consciousness field” can be defined as integrated information efficiency per Joule.
- Feedback loops may exist: more consciousness increases entropy production, which then alters the effective flow of time.
- Possible formalism: disformal coupling of consciousness to clock rates in spacetime metrics.
- Boredom, flow, and near-death experiences can be explained as distinct positions in this dynamical framework.

## Abstract
This note explores a thermodynamic formalism for the relation between entropy, consciousness, and the flow of time. Starting from subjective time as a function of information processing efficiency, we separate online and retrospective components, then extend the hypothesis to suggest that time itself might physically depend on entropy production. We sketch coupled differential equations, and finally a relativistic field-theoretic version where consciousness back-reacts on the local metric.

## Expanded notes
The starting problem is whether time can be formalized in terms of entropy, not just as a metaphor but as a quantitative relation. Subjective time clearly dissociates into two components: the *online felt passage* $\hat\tau$, and the *retrospective memory duration* $\tau_R$. These map differently onto entropy production and information integration.

For retrospective time, one can write
$$
\frac{d\tau_R}{dt} = \beta\,a(t)\,\frac{I(t)}{\sigma(t)/\Theta},
$$
where $I(t)$ is the rate of useful information (mutual information or KL-change in models), $\sigma(t)$ the entropy production rate, and $\Theta$ the effective temperature. This captures the sense that meaningful, high-information intervals are remembered as longer. Landauer’s principle grounds the ratio: each bit of belief update costs at least $k_B\Theta\ln 2$ energy dissipated. Thus the ratio $I/(\sigma/\Theta)$ measures bits per Joule efficiency, capped by physical limits.

For online time, the feeling of slowness or speed requires attention and arousal terms:
$$
\frac{d\hat\tau}{dt} = \omega_0 a(t) + \eta m(t),
$$
with $a(t)$ a neuromodulatory gain (dopamine, norepinephrine) and $m(t)$ attentional load directed at monitoring time. Boredom corresponds to low $I$, normal $\sigma$, high $m$ — leading to slow felt time but short remembered time. Flow is high $I$, high efficiency, low $m$ — leading to time flying in the moment but a rich retrospective expansion. Near-death experiences combine very high $a$ and $I$, dilating both.

The speculative extension is to treat time not as subjective but as dynamically dependent on entropy production. One can posit
$$
dT = \kappa\, \sigma(t)^\gamma dt,
$$
so that entropy production drives the flow of physical time. Coupling this with a consciousness measure
$$
C = \chi\!\left(\frac{I}{k_B\Theta\sigma}\right),
$$
produces feedback: $C$ increases $\sigma$, which alters $dT/dt$, which feeds back into computational capacity.

In relativistic form, one writes a disformal metric
$$
\tilde g_{\mu\nu} = g_{\mu\nu} + \big(1 - N^{-2}(C,\sigma)\big)u_\mu u_\nu,
$$
so that proper clock rates depend on consciousness and entropy production. Field dynamics for $C$ can be added with a Klein–Gordon type equation and entropy balance laws. This gives a coupled PDE system where consciousness fields shape the local flow of time.

### Core derivations
- Retrospective time $\tau_R$: proportional to information gain per dissipated energy, consistent with Landauer’s bound.
- Online time $\hat\tau$: additive contributions from neuromodulatory gain and monitoring load.
- Feedback PDE system: $\partial_t C$, $\partial_t\sigma$, $\partial_t T$ coupled via constitutive laws.
- Disformal coupling: effective proper time $dT/d\tau = N(C,\sigma)$.

### Connections & metaphors
- **Flow vs. boredom**: dual dissociation between online and retrospective time.
- **Entropy as arrow**: entropy production as the driver not only of direction but of pace of time.
- **Landauer as metronome**: bits per Joule efficiency acts as a temporal “gear ratio.”
- **Field-theory analogy**: consciousness as a scalar field altering the metric similar to Einstein-Æther theories.

### Open questions
- Does empirical data support local time dilation effects from neural metabolic states?
- How to operationalize $I(t)$ (info gain) in a measurable way in brains?
- Should time accelerate with entropy production ($\gamma > 0$) or decelerate ($\gamma < 0$)?
- Can this be reconciled with thermal time hypothesis in statistical mechanics?

### To try next
- Simulate the Newtonian PDE system with $C,\sigma,T$ on a lattice.
- Use prediction error signals as proxies for $I(t)$ in cognitive tasks.
- Explore relativistic action with curvature coupling $\xi_C C R$.
- Compare to event segmentation models of memory duration.

## References
- Rovelli & Connes: thermal time hypothesis.
- Shiraishi et al. (2018): thermodynamic speed limits.
- Landauer (1961): principle of minimal heat cost for erasure.
- Friston et al.: free energy principle and entropy production in brains.
- Hoel et al. (2013): causal emergence and integrated information.
