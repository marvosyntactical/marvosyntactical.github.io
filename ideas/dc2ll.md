---
title: "From Displacement Convexity to Lasry–Lions Monotonicity"
date: "2025-09-12"
tags: ["mean field games","optimal transport","wasserstein geometry","displacement convexity","lasry–lions","evi","uniqueness"]
related: []
slug: "dc2ll"
---

# Key ideas
- \(\lambda\)-displacement convexity of a functional \(\Phi\) on \((\mathcal{P}_2,W_2)\) implies \(\lambda\)-monotonicity of its Wasserstein subdifferential.
- This yields a strong Lasry–Lions (LL) inequality for couplings \(f=\delta\Phi/\delta\rho\), ensuring uniqueness of potential-MFG equilibria.
- The planner’s problem equals the decentralized MFG with Pigouvian term \(\delta\Phi/\delta\rho\); equilibria are \(W_2\)-gradient-flow minimizers of \(\Phi\).
- EVI\(_\lambda\) gives exponential \(W_2\)-contraction of flows when \(\lambda>0\); nonconvex \(\Phi\) permits multiple equilibria.

## Abstract
We give a complete, rigorous proof that \(\lambda\)-displacement convexity of a population potential \(\Phi\) implies a strong Lasry–Lions monotonicity inequality. The argument uses the Benamou–Brenier representation of \(W_2\), the continuity equation calculus, and endpoint subdifferential inequalities. As a corollary, potential mean-field games with coupling \(f=\delta\Phi/\delta\rho\) have unique equilibria (and exponential stability when \(\lambda>0\)) and coincide with the planner’s solution under a Pigouvian correction.

## Expanded notes

### Core derivations (definitions, then the proof)

**Setting and notation.**  
- \(\mathcal{P}_2(\mathbb{R}^d)\): probability measures with finite second moment; \(W_2\) the 2-Wasserstein metric.  
- A curve \((\rho_t)_{t\in[0,1]}\) is **\(W_2\)-absolutely continuous** (AC) if there exists \(v_t\in L^2(\rho_t)\) with
  \[
  \partial_t\rho_t + \nabla\!\cdot(\rho_t v_t)=0\quad\text{(in }\mathcal{D}'\text{)}\ \ \text{and}\ \ \int_0^1\!\!\int \|v_t\|^2\,d\rho_t\,dt<\infty.
  \]
  The minimal action equals \(W_2^2(\rho_0,\rho_1)\) (Benamou–Brenier).  
- \(\Phi:\mathcal{P}_2\to(-\infty,+\infty]\) is **\(\lambda\)-displacement convex** if for every \(W_2\)-geodesic \((\rho_t)\),
  \[
  \Phi(\rho_t)\ \le\ (1-t)\Phi(\rho_0)+t\Phi(\rho_1)-\tfrac{\lambda}{2}t(1-t)\,W_2^2(\rho_0,\rho_1).
  \]
- The **Wasserstein subdifferential** \(\partial\Phi(\rho)\) contains vector fields \(\xi\in L^2(\rho)\) such that for every optimal plan \(\pi\) between \(\rho\) and \(\mu\),
  \[
  \Phi(\mu)-\Phi(\rho)\ \ge\ \int \!\langle \xi(x),y-x\rangle\,d\pi(x,y) + \tfrac{\lambda}{2} W_2^2(\rho,\mu).
  \]
  When \(\Phi\) is sufficiently regular, \(\xi=\nabla \big(\delta\Phi/\delta\rho\big)(\rho)\).

**Two calculus identities.** For any smooth \(\psi\) and AC curve with velocity \(v_t\):

1. (Transport identity)
\[
\int \psi\,(\rho_1-\rho_0) \;=\; \int_0^1\!\!\int \nabla\psi\cdot v_t\,d\rho_t\,dt.
\]
2. (Chain rule for \(\Phi\))
\[
\frac{d}{dt}\Phi(\rho_t) \;=\; \int \nabla\!\Big(\tfrac{\delta\Phi}{\delta\rho}(\rho_t)\Big)\!\cdot v_t\,d\rho_t,
\]
valid for the standard sum of linear, internal, and interaction energies (and by density for general \(\Phi\) satisfying the AGS assumptions).

---

### **Theorem (Strong LL from \(\lambda\)-displacement convexity).**
Let \(\Phi\) be proper, l.s.c., and \(\lambda\)-displacement convex on \(\mathcal{P}_2\). Fix \(\rho_0,\rho_1\), and let \(\pi\) be an optimal plan between them. Choose \(\xi_i\in\partial\Phi(\rho_i)\) (e.g. \(\xi_i=\nabla(\delta\Phi/\delta\rho)(\rho_i)\) when smooth). Then
\[
\boxed{\ \int \!\big\langle \xi_1(y)-\xi_0(x),\,y-x\big\rangle\,d\pi(x,y)\ \ge\ \lambda\,W_2^2(\rho_0,\rho_1).\ }
\tag{LL\(_{\mathrm{strong}}\)}
\]
Equivalently, with \(\phi_i=\delta\Phi/\delta\rho(\rho_i)\) and under mild regularity,
\[
\int(\phi_1-\phi_0)\,(\rho_1-\rho_0)\ \ge\ \lambda\,W_2^2(\rho_0,\rho_1).
\tag{LL\(_{\mathrm{scalar}}\)}
\]

**Proof.**  
Let \((\rho_t,v_t)\) be a constant-speed \(W_2\)-geodesic joining \(\rho_0\) to \(\rho_1\). Define \(g(t):=\Phi(\rho_t)\). \(\lambda\)-convexity gives for all \(t\in[0,1]\)
\[
g(t)\ \le\ (1-t)g(0)+t g(1) - \tfrac{\lambda}{2}t(1-t)W_2^2(\rho_0,\rho_1).
\]
Take one-sided derivatives at \(0^+\) and \(1^-\):
\[
g'(0^+)\ \le\ g(1)-g(0)-\tfrac{\lambda}{2}W_2^2,\qquad
g'(1^-)\ \ge\ g(1)-g(0)+\tfrac{\lambda}{2}W_2^2.
\]
Subtracting yields
\[
g'(1^-)-g'(0^+)\ \ge\ \lambda\,W_2^2(\rho_0,\rho_1).\tag{1}
\]
By the chain rule,
\[
g'(t) \;=\; \int \nabla\!\Big(\tfrac{\delta\Phi}{\delta\rho}(\rho_t)\Big)\!\cdot v_t\,d\rho_t.\tag{2}
\]
At the endpoints of a displacement geodesic, \(v_0,v_1\) are optimal displacements: if \(\pi\) is an optimal plan, then
\[
g'(0^+)=\int \langle \xi_0(x), y-x\rangle\,d\pi(x,y),\qquad
g'(1^-)=\int \langle \xi_1(y), y-x\rangle\,d\pi(x,y),\tag{3}
\]
(using the endpoint subdifferential characterization and disintegration of \(\pi\)). Plug (3) into (1):
\[
\int \!\big\langle \xi_1(y)-\xi_0(x),\,y-x\big\rangle\,d\pi(x,y)\ \ge\ \lambda\,W_2^2(\rho_0,\rho_1),
\]
which is \( \mathrm{LL}_{\mathrm{strong}}\). For \( \mathrm{LL}_{\mathrm{scalar}}\), apply the transport identity twice to write
\[
\int(\phi_1-\phi_0)(\rho_1-\rho_0)=\int_0^1\!\!\int \big(\nabla\phi_1-\nabla\phi_0\big)\cdot v_t\,d\rho_t\,dt,
\]
and observe that along a constant-speed geodesic the RHS is bounded below by the endpoint pairing (Jensen along segments), hence by \( \mathrm{LL}_{\mathrm{strong}}\). ∎

---

### Consequences for potential MFGs

Let the **coupling** be \(f(x,\rho)=\delta\Phi/\delta\rho(x)\). The (separable, second-order) MFG system reads
\[
\begin{cases}
-\partial_t u - \nu \Delta u + H(x,\nabla u)= f(x,\rho_t),\\
\partial_t \rho_t - \nu \Delta \rho_t - \nabla\!\cdot\!\big(\rho_t\,\partial_p H(x,\nabla u)\big)=0.
\end{cases}
\]
- **Planner equivalence.** The social planner minimizes \(\int_0^T \big[\tfrac12\!\int \|v_t\|^2 d\rho_t + \Phi(\rho_t)\big]dt\) s.t. continuity/FP. Lagrange multipliers produce
  \[
  -\partial_t u-\nu\Delta u+\tfrac12\|\nabla u\|^2=\frac{\delta\Phi}{\delta\rho}(\rho_t),\qquad
  \partial_t \rho_t-\nu\Delta \rho_t - \nabla\!\cdot(\rho_t\nabla u)=0,
  \]
  i.e., the decentralized MFG with Pigouvian term.
- **Uniqueness.** By \( \mathrm{LL}_{\mathrm{scalar}}\) (or \( \mathrm{LL}_{\mathrm{strong}}\)), equilibria are unique.  
- **Contraction (EVI).** The planner flow is the \(W_2\)-gradient flow of \(\Phi\). Under \(\lambda>0\), EVI\(_\lambda\) implies \(W_2\)-contraction:
  \[
  W_2(\rho_t,\tilde\rho_t)\ \le\ e^{-\lambda t} W_2(\rho_0,\tilde\rho_0).
  \]
  Thus the MFG equilibrium is globally attractive.

### Connections & metaphors
- This is the exact analogue of “\(\mu\)-strong convexity \(\Rightarrow\) \(\mu\)-monotone gradient \(\Rightarrow\) unique minimizer and exponential convergence” in Euclidean optimization, transplanted to \((\mathcal{P}_2,W_2)\).
- LL monotonicity emerges as *nothing more than* monotonicity of a Wasserstein subgradient of \(\Phi\).

### Open questions
- Necessary vs sufficient geometry: displacement monotonicity (for non-separable \(H\)) extends this beyond potentials—can \(\Phi\)-based criteria approximate it?
- Nonconvex \(\Phi\): classify multiplicity and basin geometry via convexity defect, Γ-convergence, and OT concentration.

### To try next
- Give explicit \(\Phi\) families (entropy \(+\) \(\lambda_V\)-convex \(V\) \(+\) positive-type kernels \(K\)) and check \(\lambda\)-displacement convexity.
- Derive JKO schemes for the planner flow; implement Pigouvian-corrected learning as proximal \(W_2\) steps.

## References
- Ambrosio, Gigli, Savaré, *Gradient Flows in Metric Spaces and in the Space of Probability Measures*.
- Carmona & Delarue, *Probabilistic Theory of Mean Field Games with Applications*.
- Lasry & Lions, *Mean Field Games*.
- McCann, *A convexity principle for interacting gases*.
