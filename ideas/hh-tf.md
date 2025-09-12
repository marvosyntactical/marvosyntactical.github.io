---
title: "The Helmholtz Transformer"
date: "2025-09-12"
tags: ["transformers","fokker-planck","helmholtz","wasserstein","schrodinger-bridge","diffgeo","attention","mlp","sde","entropy"]
related: []
slug: "hh-tf"
---

# Key ideas
- Two micro-steps per Transformer block (attention then MLP) admit a first-order generator that limits to drift–diffusion.
- Attention contributes diffusion via a conditional CLT; MLP contributes conservative drift via an exact Helmholtz split.
- Work on the unit sphere by inserting the tangent projector and using surface operators; use Stratonovich noise to avoid curvature drift.
- Scalarizing diffusion by $\nu_t=\tfrac{1}{d}\mathrm{tr}\,\Sigma_t$ yields a clean Helmholtz free-energy gradient flow; full $\Sigma_t$ remains elliptic and faithful.
- Entropy dynamics follows a $\Sigma_t$-weighted Fisher information identity; predict diffuse-then-compress.
- Detect decision points with Morse (tangent Hessian) and committors; couple models only there via JKO/barycenter nudging.
- Schrödinger bridges provide minimal-control distribution editing compatible with the SDE.
- Validate with generator tests; measure swirl energy and diffusion anisotropy layerwise.

## Abstract
We model a transformer block as two residual micro-steps on the unit sphere: attention as diffusion (from a conditional CLT) and the MLP as conservative drift (via an exact Helmholtz decomposition). A Lie–Trotter/Chernoff expansion and Taylor with LayerNorm projection yield a limiting Stratonovich SDE whose forward equation is a surface Fokker–Planck PDE. Scalar diffusion recovers a Wasserstein gradient flow of Helmholtz free energy; the full anisotropic diffusion keeps the model faithful and elliptic. The framework furnishes testable generator identities, entropy/free-energy predictions, principled Schrödinger-bridge editing, and basin-aware coupling across models.

## Expanded notes
Let $\rho_t \in \mathcal{P}_2(\mathbb{R}^d)$ denote the distribution of agent states $X_t$ (token embeddings projected by LayerNorm to $S^{d-1}$). Controlled drift $b$ and noise $\sigma$ give
$$
dX_t = b\big(X_t,u(t,X_t),\rho_t\big)\,dt + \sigma(X_t)\circ dW_t .
$$
In our setting, the drift decomposes into a conservative part from the MLP (a potential) and, optionally, a divergence-free swirl; the diffusion comes from attention. The two residual micro-steps per block yield a one-step operator whose discrete generator is the sum of the attention and MLP contributions at first order. Passing to the limit (generator convergence plus a Lindeberg condition) gives the SDE on $S^{d-1}$ with projected noise $P_{X_t}\sigma(X_t)\circ dW_t$, where the tangent projector is $P_x=I-xx^\top/\|x\|^2$. The associated surface Fokker–Planck equation reads
$$
\partial_t \rho_t \;=\; -\,\mathrm{div}^S\!\big(\rho_t\,\nabla^S U_t\big) \;+\; \mathrm{div}^S\!\big(\Sigma_t\,\nabla^S \rho_t\big),
$$
with $\Sigma_t$ identified from attention’s conditional covariance and $U_t$ from an exact MLP Helmholtz split
$$
f_{\mathrm{MLP}}(x)\;=\;\nabla U_t(x)\;+\;R_t(x),\qquad \nabla\!\cdot R_t \equiv 0,\qquad U_t(x)=\sum_j a_j\,\psi(v_j\!\cdot x).
$$
When $\Sigma_t=\nu_t I$, the law evolves as a Wasserstein gradient flow of Helmholtz free energy. Let $\rho$ be the token-embedding density and $\mathcal{F}_t[\rho]=\nu_t\,\mathrm{Ent}(\rho)+\int U_t\,d\rho$. Then
$$
\partial_t \rho \;=\; \nabla\!\cdot\!\big(\rho\,\nabla\,\delta \mathcal{F}_t/\delta \rho\big).
$$
Attention with kernel $K$ approximates a transport map $T$, which yields a JKO step at depth resolution $\tau$:
$$
\rho_{t+\tau} \;=\; \arg\min_{\rho}\ \mathcal{F}_t(\rho) + \frac{1}{2\tau}\, W_2^2\!\big(\rho,\, T_\#\rho_t\big).
$$
Entropy production exhibits a $\Sigma_t$-weighted Fisher information term and a drift-compression term, explaining the characteristic diffuse-then-compress curve across layers. On the sphere, we implement all derivatives with surface operators $\nabla^S, \mathrm{div}^S, \Delta_S$ and the tangent projector $P_x$.

### Core derivations
We linearize LayerNorm: $\mathcal{N}(x+\delta)=x+P_x\delta+O(\|\delta\|^2)$, $P_x=I-xx^\top/\|x\|^2$. For the attention micro-step (row-stochastic kernel from $W_Q,W_K$ and values via $W_V$), the centered increment is a weighted sum of many small terms. A conditional Lindeberg–Feller CLT yields Gaussian fluctuations with covariance
$$
\Sigma_A(x_i,t)=\tfrac{1}{2}\,W_V\!\Big(\sum_j P_{ij}\,(x_j-m_i)(x_j-m_i)^\top\Big)W_V^\top,\qquad m_i=\sum_j P_{ij}x_j,
$$
and mean that vanishes to first order under near-bistochastic kernels. For the MLP micro-step, decompose each $w_j$ into $a_j v_j+r_j$ with $r_j\perp v_j$; then
$$
f_{\mathrm{MLP}}(x)=\sum_j a_j\,\sigma(v_j\!\cdot x)\,v_j\;+\;\sum_j r_j\,\sigma(v_j\!\cdot x).
$$
The first sum is $\nabla U_t$ with $U_t=\sum_j a_j\,\psi(v_j\!\cdot x)$; the second is divergence-free. Lie–Trotter/Chernoff gives a first-order sum of generators; all $O(\varepsilon^{3/2})$ terms vanish in the discrete generator $L_\varepsilon$ after dividing by the macro step.

### Connections & metaphors
- **Hydrodynamics:** advection–diffusion on $S^{d-1}$ with advection $-\nabla^S U_t+R_t$ and diffusion $\Sigma_t$.
- **Information geometry:** entropy dissipation equals a $\Sigma_t$-weighted Fisher information plus drift compression.
- **Compressed sensing:** low mutual coherence of $W_{\text{in}}$ and alignment $W_{\text{out}}\parallel W_{\text{in}}$ support a strong conservative drift.
- **OT / JKO:** scalar diffusion gives a textbook Helmholtz gradient flow; whitening rescales anisotropic, constant $\Sigma_t$ layers to the same form.
- **Schrödinger bridges:** minimal-control steering between marginals; implement via $\delta U_t=-2\nu_t\log \varphi_t$ or kernel reweightings.

### Open questions
- How sharp are CLT assumptions under real token dependence and head coupling?
- What curvature corrections arise if one insists on Itô on $S^{d-1}$ instead of Stratonovich?
- Can anisotropic, state-dependent $\Sigma_t(x)$ be cast cleanly as a generalized mobility in OT?
- How close to bistochastic is trained attention in practice (layerwise $\mu_A\approx 0$)?
- Can we prove row-orthogonality (low coherence) of $W_{\text{in}}$ under sparse-gate dynamics?

### To try next
- Measure $U_t,R_t,\Sigma_t,\nu_t$ layerwise; report anisotropy $\mathrm{tr}(\Sigma_t^2)/\mathrm{tr}(\Sigma_t)^2$ and swirl fraction $\|R_t\|^2/\|f_{\mathrm{MLP}}\|^2$.
- Run generator tests: compare $(\mathbb{E}[\phi(x_{k+1})]-\mathbb{E}[\phi(x_k)])/\varepsilon$ to $\mathbb{E}[(L\phi)(x_k)]$ for a probe bank.
- Fit entropy/free-energy curves from $\nu_t$ and $U_t$, and validate the diffuse-then-compress shape.
- Deploy decision detectors (tangent Hessian min-eig near $0$; committor $\approx 0.5$); trigger barycenter nudging only there.
- Try layerwise whitening when $\Sigma_t$ is constant in space to recover an exact Helmholtz gradient flow.

## References
- **Gradient flows:** Jordan–Kinderlehrer–Otto; Ambrosio–Gigli–Savaré.
- **Diffusion approximation:** Ethier–Kurtz; Lindeberg–Feller triangular arrays.
- **Operator splitting:** Lie–Trotter; Chernoff products.
- **Attention as heat (mean-field):** bistochastic attention limits; Sinkhorn balancing.
- **FFN memory:** Geva et al. (key–value FFNs).
- **Superposition/SAEs:** Anthropic (toy models; scaling monosemanticity).
- **Schrödinger bridges:** Föllmer; Jamison; Léonard survey; entropic OT (Cuturi).
