---
title: "Transformers as Approximate Wasserstein Gradient Flows"
date: "2025-09-01"
tags: ["transformers","WGF","Navier–Stokes","Helmholtz","diffgeo","optimization"]
related: []
slug: "example-transformer-wgf"
---

# Key ideas
- Self-attention acts like a learned transport plan; layerwise updates resemble time-discretized WGF steps with entropic/viscous regularization.
- Residual streams approximate continuous-time flows; MLPs inject Helmholtz-like potential corrections.
- Training nudges the model toward an energy landscape where token densities follow a quasi-Navier–Stokes dynamic in rep space.

## Abstract
If you squint, a vanilla transformer looks like an explicit Euler step on a Wasserstein gradient flow, with attention as transport and MLPs as potential updates. The “viscosity” comes from normalization, dropout-like noise, and finite-width effects. It’s not a proof; it’s a testable generative lens.

## Expanded notes
- Attention weights $A$ induce stochastic kernels $K(x\\to y)$; entropy in softmax ≈ entropic OT.
- Layer $\\ell\\!:\\ x \\mapsto x + f_\\ell(x)$ suggests $\\partial_t x = f(x,t)$; stack $\\Rightarrow$ Neural ODE flavor.
- Viscosity proxy via LN + noise yields diffusion-like terms.

### Core derivation sketch
Let $\\rho$ be token-emb density. Consider energy $\\mathcal{E}(\\rho)$ so that
$$\\partial_t \\rho = \\nabla\\cdot\\big( \\rho\\,\\nabla \\delta \\mathcal{E}/\\delta \\rho \\big) + \\nu \\Delta \\rho.$$
Attention with kernel $K$ approximates transport $T$, giving a JKO step:
$$\\rho_{t+1} = \\arg\\min_\\rho \\mathcal{E}(\\rho) + \\tfrac{1}{2\\tau} W_2^2(\\rho, T_\\#\\rho_t) + \\varepsilon\\,\\mathrm{Ent}(\\rho).$$

### Open questions
- Can we extract an empirical $\\nu$ from layernorm stats?
- Which Helmholtz decomposition best matches residual updates?

## References
- Santambrogio (OT), JKO (1998), Neural ODEs (2018), assorted transformer lore.

