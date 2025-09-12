---
title: "Thermodynamics, Causality, and Fokker–Planck"
date: "2025-09-12"
tags: ["causality","fokker-planck","wasserstein gradient flow","thermodynamics","landauer","schrodinger bridge","evolutionary game theory","bbgky","mean-field"]
related: []
slug: "cause-fpe"
---

# Key ideas
- Define causal influence directly in Wasserstein gradient flows using velocity fields.
- Bound causal strength by subsystem entropy production, yielding a Landauer-type limit.
- Schrödinger bridges provide least-work counterfactuals, pricing causal effects in $kT$ units.
- Free-energy separability offers a rigorous way to rule out causal edges.
- Fokker–Planck equations generalize ODEs, SDEs, and particle systems, acting as a universal closure.
- BBGKY hierarchy explains why single-particle equations depend on higher-order correlations.
- Evolutionary game theory connects replicator equations and Lotka–Volterra dynamics via mean-field limits.
- Structured populations in EGT need BBGKY-style closures, not just replicator mean-field equations.
- Thermodynamic constraints couple information flow, causality, and dissipation in a single framework.

## Abstract
This note explores the interplay between causality, thermodynamics, and mean-field dynamics under the Fokker–Planck lens. We define causal influence in Wasserstein gradient flows of Helmholtz free energy, bounded by entropy production, and show how Schrödinger bridges yield minimal-work counterfactuals. Beyond physics, the Fokker–Planck perspective generalizes to particle systems in biology and game theory, where BBGKY hierarchies explain the emergence of replicator dynamics and Lotka–Volterra systems. The unifying thread is that causality and evolution can be analyzed as flows of distributions constrained by thermodynamic budgets.

## Expanded notes
The starting point is to consider dynamics of probability densities $\rho_t$ as Wasserstein gradient flows (WGF) of Helmholtz free energy. For overdamped Langevin processes, the Fokker–Planck equation (FPE) gives the law of the system. Its velocity field $v$ encodes the evolution of probability mass. If we partition variables into $(A,B)$, then the causal effect of $A$ on $B$ can be quantified by the part of $B$'s velocity unexplained by $B$ alone. This leads to the definition of **Wasserstein causal strength**, a metric-weighted quadratic form.

Entropy production rate (EPR) provides a thermodynamic budget: it quantifies irreversibility, and for subsystem $B$, it bounds how much influence can flow into $B$. This is essentially a Landauer principle at the level of flows: bits per joule of causal influence are limited by $kT$.

Counterfactuals enter via Schrödinger bridges (SB), which interpolate between distributions under a prior diffusion with minimal KL divergence. Constraining $A$'s marginal via SB and reading off the induced change in $B$ yields the least-work causal effect. This method provides a physical price tag for counterfactuals, grounding them in thermodynamics.

Separability of the free-energy functional implies no causality: if $\mathcal{F}(\rho)$ splits into independent parts, then velocities of $A$ and $B$ decouple, giving zero causal strength. This provides a "ruling-out" criterion, independent of interventions.

Zooming out, the FPE is general. Any ODE can be cast as an SDE with zero noise, and any SDE has an FPE for its density. Large-$N$ particle systems converge in mean-field to nonlinear FPEs. This makes FPE a "universal closure," underpinning models in physics, finance, and biology.

When correlations cannot be ignored, the BBGKY hierarchy comes in. It expresses how the $n$-particle marginal depends on the $(n+1)$-particle marginal. In gases, closing it under molecular chaos gives the Boltzmann equation. In evolutionary game theory, replicator dynamics are the one-body closure of a BBGKY-type system; correlations between strategies (pair or group structures) demand higher-order closures. Replicator equations on the simplex correspond to Lotka–Volterra systems with normalization.

Thus, causality, evolution, and thermodynamics all meet under the same umbrella: particles → distributions → Fokker–Planck → WGF geometry → thermo bounds → causal and evolutionary laws.

### Core derivations
- Fokker–Planck as continuity equation:  
  $$\partial_t \rho + \nabla\cdot(\rho v)=0,\quad v=-M\nabla\frac{\delta \mathcal{F}}{\delta \rho}.$$
- Causal strength:  
  $$\mathsf{C}_{A\to B} = \mathbb{E}_\rho\big[\langle \Delta v_{B\leftarrow A},M_B^{-1}\Delta v_{B\leftarrow A}\rangle\big].$$
- Entropy production bound:  
  $$\mathsf{C}_{A\to B} \le \dot{\Sigma}_B = \mathbb{E}_\rho[\langle v_B,M_B^{-1}v_B\rangle].$$
- Landauer limit for info flow:  
  $$\dot{I}_{A\to B} \le \frac{\dot{\Sigma}_B}{kT}.$$
- Schrödinger bridge: optimal stochastic path with cost = excess entropy production.
- BBGKY: $\dot f_1$ depends on $f_2$, $\dot f_2$ on $f_3$, etc.; closure yields replicator/Boltzmann forms.

### Connections & metaphors
- Fokker–Planck as the “equation that rules them all,” unifying ODEs, SDEs, particle systems.
- Schrödinger bridges as “minimal-work counterfactuals.”
- Landauer limit as the “currency exchange rate” between energy and bits of causal influence.
- BBGKY in gases mirrored by pair-approximation in evolutionary games.
- Replicator dynamics as Lotka–Volterra with normalization, linking ecology and strategy evolution.

### Open questions
- How to compute causal strength efficiently in high-dimensional systems?
- Can Landauer bounds be experimentally verified in biological signaling networks?
- How to generalize free-energy separability tests to systems with latent variables?
- What is the right closure scheme for structured evolutionary games beyond pair approximation?
- Can biosemiotic processes be rigorously modeled as Schrödinger bridges of sign distributions?

### To try next
- Formalize proofs of the entropy-production bounds and separability criteria.
- Simulate OU processes to test causal strength measures vs. EP budgets.
- Implement Schrödinger bridge counterfactuals in small agent-based models.
- Explore BBGKY closures for networked replicator systems.
- Apply the framework to empirical data (e.g., microbial competition, financial order books).

## References
- Schrödinger (1931), “Über die Umkehrung der Naturgesetze.”
- Benamou & Brenier (2000), “A computational fluid mechanics solution to the Monge–Kantorovich problem.”
- Cheridito & Eckstein (2023), “Causal Optimal Transport.”
- Kolchinsky & Wolpert (2018), “Semantic information, autonomous agency, and non-equilibrium thermodynamics.”
- Ohtsuki et al. (2006), “A simple rule for the evolution of cooperation on graphs.”
- Matsuda et al. (1992), “Statistical mechanics of population dynamics.”
- Lotka (1925), “Elements of Physical Biology.”  
- Volterra (1926), “Fluctuations in the abundance of a species.”
