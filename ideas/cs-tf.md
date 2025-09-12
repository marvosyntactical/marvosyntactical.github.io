---
title: "Compressed Sensing, Superposition, and MLP Potentials"
date: "2025-09-12"
tags: ["transformers","compressed-sensing","superposition","mutual-coherence","mlp","sparse-coding","helmholtz","entropy"]
related: []
slug: "cs-tf"
---

# Key ideas
- Rows of $W_{\text{in}}$ behave like a low-coherence dictionary; gates yield sparse activations, enabling superposition.
- $W_{\text{out}}$ columns align with $W_{\text{in}}$ rows; the conservative drift equals $\nabla U_t$ with $U_t=\sum_j a_j\psi(v_j\cdot x)$.
- Low mutual coherence $\mu$ reduces interference and predicts entropy trends under sparse gating.
- The divergence-free leftover $R_t$ captures style/phase transport without first-order entropy change.
- Orthogonality is row-wise (for $W_{\text{in}}$) and column-wise alignment (for $W_{\text{out}}$), both empirically testable.

## Abstract
We articulate a compressed-sensing account of transformer MLPs: gating creates sparse codes in a low-coherence dictionary formed by $W_{\text{in}}$ rows, while $W_{\text{out}}$ columns align with the same directions. This yields an exact Helmholtz potential $U_t$ for the conservative drift, a small divergence-free remainder, and concrete predictions for interference, entropy, and feature monosemanticity. We outline measurable diagnostics and their implications for entropy dynamics in the drift–diffusion framework.

## Expanded notes
Let $\rho_t \in \mathcal{P}_2(\mathbb{R}^d)$ denote the distribution of agent states $X_t$. Controlled drift $b$ and noise $\sigma$ give  
$$
dX_t = b(X_t,u(t,X_t),\rho_t)\,dt + \sigma(X_t)\,dW_t.
$$
In the MLP sub-dynamics, write $f_{\mathrm{MLP}}(x)=W_{\text{out}}\sigma(W_{\text{in}}x)$. Let $v_j^\top$ be row $j$ of $W_{\text{in}}$ and $w_j$ column $j$ of $W_{\text{out}}$. Decompose $w_j=a_j v_j+r_j$ with $r_j\perp v_j$. Then
$$
U_t(x)=\sum_j a_j\,\psi(v_j\cdot x),\qquad f_{\mathrm{MLP}}(x)=\nabla U_t(x)+\sum_j r_j\,\sigma(v_j\cdot x),\quad \nabla\!\cdot \sum_j r_j\,\sigma(v_j\cdot x)=0.
$$
Sparse gating (ReLU/GELU) selects a small set of active features; low mutual coherence
$$
\mu(V)=\max_{i\neq j}\frac{|v_i^\top v_j|}{\|v_i\|\|v_j\|}
$$
implies stable sparse recovery and low interference. As width grows and $\mu$ drops, features disentangle (monosemanticity), the conservative drift sharpens, and entropy downstream decreases predictably when $\nabla U_t$ dominates.

### Core derivations
We use the chain rule $\nabla\sigma(v_j\cdot x)=\sigma'(v_j\cdot x)\,v_j$ and the orthogonal decomposition of $w_j$ to derive $f_{\mathrm{MLP}}=\nabla U_t+R_t$ exactly. The divergence-free property of $R_t$ follows from $\nabla\!\cdot (r_j\,\sigma(v_j\cdot x))=r_j^\top\nabla\sigma(v_j\cdot x)=\sigma'(v_j\cdot x)\,r_j^\top v_j=0$. Entropy predictions tie to the relative energy of $\nabla U_t$ versus $R_t$ under the layer’s $\rho_t$.

### Connections & metaphors
- **Sparse coding:** $W_{\text{in}}$ rows are atoms; gates are coefficients; $W_{\text{out}}$ reconstructs directions.
- **Interference control:** low $\mu$ reduces cross-talk between features and supports monosemantic behavior.
- **Energy view:** $U_t$ aggregates activated bumps $\psi(v_j\cdot x)$; drift flows downhill in this landscape.
- **Entropy:** stronger conservative drift correlates with faster post-peak entropy decline.

### Open questions
- Can we prove row-orthogonality (low $\mu$) of $W_{\text{in}}$ from training dynamics?
- How aligned are $w_j$ and $v_j$ across layers and scales; what drives misalignment?
- How large is the swirl energy in practice, and where does it matter (style vs content)?
- What are tight finite-width bounds linking $\mu$ to entropy decay?

### To try next
- Compute the Gram of $W_{\text{in}}$ rows; estimate $\mu$ and its scaling with width/depth.
- Measure $\cos(w_j,v_j)$ and the energy ratio $\|R_t\|^2/\|f_{\mathrm{MLP}}\|^2$ layerwise.
- Correlate $\mu$ and alignment with entropy slope after the peak.
- Perturb $W_{\text{out}}$ to increase/decrease alignment and observe entropy and accuracy effects.

## References
- **Compressed sensing:** Donoho–Huo; Elad–Bruckstein; Tropp (mutual coherence and sparse recovery).
- **FFN memory:** Geva et al. (key–value interpretation).
- **Superposition:** Anthropic (toy models; scaling monosemanticity).
- **Drift–diffusion frame:** see Part 1 for the FPE/SDE embedding.
