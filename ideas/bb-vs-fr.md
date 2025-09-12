---
title: "Benamou–Brenier vs Fisher–Rao: Geodesics in OT and IG"
date: "2025-09-12"
tags: ["optimal transport", "information geometry", "benamou-brenier", "fisher-rao", "exponential families", "wasserstein", "geodesics", "machine learning"]
related: []
slug: "bb-vs-fr"
---

# Key ideas
- Benamou–Brenier gives geodesics in Wasserstein space via fluid-flow minimization.  
- Fisher–Rao gives geodesics in parameter space, measuring statistical distinguishability.  
- OT and IG both equip probability space with Riemannian structures, but with distinct metrics.  
- Hellinger–Kantorovich interpolates between Fisher–Rao and Wasserstein, unifying both views.  
- Exponential families are dually flat (IG), but rarely convex under Wasserstein geodesics.  
- Translation families form the rare case where OT and IG geodesics coincide.  
- Gaussians yield Bures–Wasserstein vs affine-invariant metrics; they differ except for translations.  
- OT is more future-proof for ML since it applies to black-box distributions, while IG is efficient when the parametric form is trusted.  

## Abstract
The Benamou–Brenier dynamic formulation of optimal transport (OT) defines geodesics in Wasserstein space, while information geometry (IG) defines geodesics in parameter space via the Fisher–Rao metric. They describe different but parallel geometries of probability distributions: one in sample space, one in parameter space. Their relation depends heavily on whether the chosen family of distributions is closed under Wasserstein geodesics and whether pullback metrics align. In practice, only special cases (like pure translations) give a 1–1 correspondence.

## Expanded notes

### Core derivations
- **BB action functional**:
  $$
  W_2^2(\mu_0,\mu_1) = \inf_{\rho,v} \int_0^1 \int \tfrac{1}{2}\rho_t(x)\|v_t(x)\|^2\,dx\,dt,
  $$
  subject to continuity equation.  
- **Fisher–Rao metric**:
  $$
  g^F_{ij}(\theta) = \mathbb{E}_\theta[\partial_i \log \rho_\theta \, \partial_j \log \rho_\theta].
  $$
- **Compatibility check**: Need closure under $W_2$ geodesics and equivalence of pullback metrics $g^W$ vs $g^F$.  
- Example: Gaussian family ⇒ $W_2$ induces Bures metric, Fisher induces AIRM; they differ except along translations.  

### Connections & metaphors
- OT geodesics: “mass moving along least-action fluid paths.”  
- IG geodesics: “curvature of distinguishability in parameter space.”  
- Hellinger–Kantorovich = “bridge metric” between the two, mixing displacement and information.  
- Analogy: OT is a *map of terrain*, IG is a *map of perception*.  

### Open questions
- Which nontrivial exponential families are closed under $W_2$ geodesics?  
- Can hybrid metrics (e.g. Sinkhorn–Fisher) be used for stable learning algorithms?  
- Are there practical regimes where Bures and Fisher metrics become approximately aligned?  

### To try next
- Compute explicit pullback $W_2$ metric for 1D exponential family (e.g. exponential or Bernoulli).  
- Explore interpolation flows (JKO scheme with entropic penalties) as bridges between OT and IG.  
- Test in generative ML: compare OT-based vs IG-based training objectives for diffusion models.  

## References
- Benamou & Brenier (2000), *A computational fluid mechanics solution to the Monge–Kantorovich mass transfer problem*.  
- Amari (2016), *Information Geometry and Its Applications*.  
- Villani (2003, 2008), *Topics in Optimal Transport; Optimal Transport: Old and New*.  
- Liero, Mielke, Savaré (2018), *Optimal Entropy–Transport problems and Hellinger–Kantorovich distance*.  
- Takatsu (2011), *Wasserstein geometry of Gaussian measures*.  
- Bhatia et al. (2019), *Bures–Wasserstein metric and connections to quantum information*.  
