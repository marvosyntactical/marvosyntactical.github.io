---
title: "Causality, Abstraction DAGs, and G-Causal Wasserstein Geometry (Part 3)"
date: "2025-09-12"
tags: ["transformers","causality","dags","optimal-transport","coarse-graining","renormalization","abstraction","wasserstein"]
related: []
slug: "cause-tf"
---

# Key ideas
- Concepts are hierarchical; coarse-graining maps fine DAGs to coarser DAGs that imperfectly preserve causality.
- Use DAG-respecting couplings to define a G-causal Wasserstein distance that penalizes order violations.
- Abstraction selection across layers resembles a renormalization step that preserves predictions while compressing state.
- Decision points correspond to saddle regions between coarse basins; committors formalize “which basin next”.
- Coupling multiple models should occur only at these decision points to preserve diversity yet avoid chaos.

## Abstract
We formalize abstraction as a coarse-graining map between DAGs of micro-concepts and macro-concepts, and we use DAG-constrained couplings to define a G-causal Wasserstein metric. This geometry quantifies how well a layer’s concepts respect causal structure under abstraction and provides a principled way to detect decision points via committors. The construction interfaces with the drift–diffusion model by supplying when and where to intervene (e.g., consensus nudging) without overwriting the model’s own causal granularity.

## Expanded notes
Let $\rho_t \in \mathcal{P}_2(\mathbb{R}^d)$ denote the distribution of agent states $X_t$. Controlled drift $b$ and noise $\sigma$ give  
$$
dX_t = b(X_t,u(t,X_t),\rho_t)\,dt + \sigma(X_t)\,dW_t.
$$
Consider a fine DAG $G=(V,E)$ over micro-concepts and a coarse DAG $\bar G=(\bar V,\bar E)$ with a surjective coarse-graining $\pi:V\to\bar V$. A coupling $\gamma$ between two laws is G-causal if it transports mass only along edges that do not violate partial order (e.g., through a causal mask). Define a G-causal Wasserstein distance by restricting admissible couplings in $W_2$. This distance respects causal constraints and can be evaluated on token clouds via masking in the cost or kernel.

Abstraction choice across layers is a discrete renormalization step: choose $\pi$ to compress state while preserving downstream predictions. Decision points are saddle regions where committors to two coarse basins are both near $1/2$. In practice, we approximate committors with classifiers trained to predict future basin membership; a low spectral gap or small tangent-Hessian eigenvalue flags the same regions.

### Core derivations
For distributions $\mu,\nu$ on $\mathbb{R}^d$ with a causal mask $M$, define
$$
W_{2,G}^2(\mu,\nu)=\inf_{\gamma\in\Gamma_G(\mu,\nu)}\int \|x-y\|^2\,d\gamma(x,y),
$$
where $\Gamma_G(\mu,\nu)\subset\Gamma(\mu,\nu)$ are couplings supported on pairs $(x,y)$ consistent with $G$ (mask $M(x,y)=1$). Coarse-graining $\pi$ induces pushforwards $\pi_\#\mu,\pi_\#\nu$, and we can similarly define $W_{2,\bar G}$. Minimizing $W_{2,\bar G}$ under a capacity constraint formalizes “best abstraction” given a budget.

### Connections & metaphors
- **Causal transport:** move mass only along arrows allowed by the DAG; mask violations are “forbidden paths”.
- **Renormalization:** $\pi$ selects macro-variables that preserve predictions while compressing micro-structure.
- **Decision theory:** committor $q$ encodes probability of hitting basin $B$ before $A$; $q\approx 1/2$ is indecision.
- **Geometry:** $W_{2,G}$ tightens the space by ruling out shortcuts that ignore causality.

### Open questions
- How to learn $\pi$ jointly with the model to minimize causal distortion while maximizing compression?
- What generalization guarantees follow from small $W_{2,G}$ across tasks?
- How to estimate committors robustly on the sphere with limited samples?
- Can we define a layerwise curvature bound (Bakry–Émery style) under causal constraints?

### To try next
- Implement masked-OT with the causal mask; benchmark $W_{2,G}$ against standard $W_2$.
- Train a committor proxy and validate against actual future mode membership.
- Explore budgeted abstraction: optimize $\pi$ to minimize $W_{2,\bar G}$ subject to a cardinality constraint.

## References
- **Causal OT:** constrained transport and masked cost formulations.
- **Abstraction/RG:** coarse-graining, information bottleneck connections.
- **Drift–diffusion frame:** Part 1 integrates these with the FPE/SDE.
