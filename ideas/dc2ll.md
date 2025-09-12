---
title: "From Displacement Convexity to Lasry–Lions Monotonicity"
date: "2025-09-12"
tags: ["mean field games","optimal transport","wasserstein","displacement convexity","lasry–lions","gradient flows","uniqueness"]
related: []
slug: "dc2ll"
---

# Key ideas
- $\lambda$-displacement convexity of $\Phi$ implies $\lambda$-monotonicity of Wasserstein subgradients.  
- This yields Lasry–Lions inequalities ensuring uniqueness of equilibria.  
- Equilibria coincide with minimizers of $\Phi$; under $\lambda>0$ uniqueness and exponential contraction hold.  
- Planner problem = decentralized MFG with Pigouvian price $\delta\Phi/\delta\rho$.  
- Nonconvex $\Phi$ allows multiple equilibria and metastability.  

## Abstract
We rigorously prove that displacement convexity in Wasserstein space implies strong Lasry–Lions monotonicity. Using the Benamou–Brenier dynamic formulation and endpoint variations, we derive a monotonicity inequality that guarantees uniqueness and stability of equilibria in potential MFGs. This bridges optimal transport convexity with game-theoretic uniqueness results.

## Expanded notes

### Proof: displacement convexity $\Rightarrow$ LL

**Setup.**  
Let $\Phi:\mathcal{P}_2(\mathbb{R}^d)\to(-\infty,\infty]$ be $\lambda$-displacement convex.  
Take $\rho_0,\rho_1$ with optimal plan $\pi$, and geodesic $(\rho_t,v_t)$.  

- Define $g(t)=\Phi(\rho_t)$. By $\lambda$-convexity,  
$$
g(t)\le (1-t)g(0)+tg(1)-\tfrac{\lambda}{2}t(1-t)W_2^2(\rho_0,\rho_1).
$$
- Differentiating at $0^+,1^-$:  
$$
g'(1^-)-g'(0^+)\ge \lambda W_2^2(\rho_0,\rho_1).
$$

**Chain rule.**  
For AC curve $(\rho_t,v_t)$,  
$$
\frac{d}{dt}\Phi(\rho_t)=\int \nabla\!\Big(\tfrac{\delta\Phi}{\delta\rho}(\rho_t)\Big)\cdot v_t\,d\rho_t.
$$

**Endpoint velocities.**  
For optimal plan $\pi$,  
$$
g'(0^+)=\int \langle \xi_0(x),y-x\rangle\,d\pi(x,y),\qquad
g'(1^-)=\int \langle \xi_1(y),y-x\rangle\,d\pi(x,y),
$$
with $\xi_i=\nabla(\delta\Phi/\delta\rho)(\rho_i)$.  

**Combine.**  
Thus  
$$
\int \langle \xi_1(y)-\xi_0(x),y-x\rangle\,d\pi(x,y)\ge \lambda W_2^2(\rho_0,\rho_1).
$$
This is the **strong LL inequality**.

**Scalar form.**  
With $\phi_i=\delta\Phi/\delta\rho(\rho_i)$,  
$$
\int (\phi_1-\phi_0)(\rho_1-\rho_0)\ge \lambda W_2^2(\rho_0,\rho_1).
$$

### Consequences for MFGs

Potential MFG system:  
$$
\begin{cases}
-\partial_t u-\nu\Delta u+H(x,\nabla u)=\delta\Phi/\delta\rho(x),\\
\partial_t\rho_t-\nu\Delta\rho_t-\nabla\cdot(\rho_t\partial_p H)=0.
\end{cases}
$$

- **Equivalence.** Planner problem yields same system with Pigouvian term $\delta\Phi/\delta\rho$.  
- **Uniqueness.** Follows from LL inequality.  
- **Contraction.** Gradient flow of $\Phi$ in $(\mathcal{P}_2,W_2)$ satisfies EVI$_\lambda$:  
$$
W_2(\rho_t,\tilde\rho_t)\le e^{-\lambda t}W_2(\rho_0,\tilde\rho_0).
$$

### Connections & metaphors
- Analogy: strong convexity $\Rightarrow$ gradient monotonicity in $\mathbb{R}^n$ $\Rightarrow$ unique minimizer.  
- Here: displacement convexity $\Rightarrow$ LL monotonicity in $\mathcal{P}_2$ $\Rightarrow$ unique equilibrium.  

### Open questions
- Can weaker notions than displacement convexity ensure LL?  
- How to classify equilibria in nonconvex $\Phi$?  
- What is the right “convexification” of games beyond separable Hamiltonians?  

### To try next
- Construct explicit convex $\Phi$ (entropy + convex potential + positive-type kernel).  
- Test uniqueness numerically using JKO scheme:  
$$
\rho_{t+1}=\arg\min_\rho \{ \Phi(\rho)+\tfrac{1}{2\tau}W_2^2(\rho,\rho_t)\}.
$$

## References
- Ambrosio, Gigli, Savaré, *Gradient Flows*.  
- Carmona & Delarue, *Mean Field Games*.  
- Lasry & Lions, *Mean Field Games*.  
- McCann, *A convexity principle for interacting gases*.  
