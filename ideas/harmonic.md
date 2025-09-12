---
title: "Harmonic functions, Helmholtz eigenbases, and the colour–sound bridge"
date: "2025-09-12"
tags: ["harmonic","helmholtz","fourier","waves","diffusion","brownian","poisson","acoustics","optics"]
related: []
slug: "harmonic"
---

# Key ideas
- Harmonicity ($\Delta u=0$) is the fixed-point condition of the heat semigroup and the Euler–Lagrange equation for Dirichlet energy.
- Heat flow is Wasserstein gradient ascent on Shannon entropy; its kernel is Gaussian and diagonalizes in Fourier space.
- Helmholtz $(-\Delta u=k^2u)$ is the **eigenvalue problem** whose eigenfunctions form the Fourier/normal-mode basis.
- Colour and sound are spectral distributions over the same Helmholtz eigenmodes with different wave speeds and sensors.
- Fick’s law is the **phase-randomised limit** of wave transport; same Green’s function, new physical regime.
- Brownian motion connects probability to PDE: its law solves the heat equation, and mean-value/martingale properties repackage harmonicity.
- Resolvent/contour calculus decomposes semigroups and explains modal contributions to heat/wave propagation.
- SVD, spectral theorem, and Fourier analysis are one diagonalisation idea across finite, compact, and continuous spectra.

## Abstract (2–4 sentences)
This article knits together harmonic analysis, PDE, and perception by showing that Fourier analysis is expansion in Helmholtz eigenmodes, and that harmonic functions are stationary points of the heat flow. It explains how colour and sound both live on the same eigenbasis, differing only by physical constants and sensor responses, while Fick’s law emerges as a phase-randomised limit of wave transport. Brownian motion, entropy, and the Gaussian heat kernel provide the probabilistic and information-theoretic backbone. Resolvent methods tie the spectral story to semigroup dynamics.

## Expanded notes
Harmonic functions are the zero-Laplacian states: they solve the Euler–Lagrange equation of the Dirichlet functional $\mathcal{E}[u]=\int|\nabla u|^2$, satisfy the mean-value property, and arise as steady states of the heat equation. The heat semigroup $(e^{t\Delta})_{t\ge0}$ evolves data by convolving with a Gaussian kernel; in optimal transport geometry this is the Wasserstein gradient ascent of Shannon entropy, making heat the canonical “uncertainty-maximizing” smoothing.

Helmholtz’s equation $-\Delta u=k^2u$ is the time-harmonic reduction of wave equations; its eigenfunctions are plane waves on $\mathbb{R}^d$ and sines/cosines or Laplace–Beltrami eigenfunctions on bounded/curved domains. The Fourier transform is precisely expansion in these eigenmodes: $\widehat{\Delta u}(\xi)=-|\xi|^2\hat u(\xi)$ diagonalizes the operator, turning PDE into algebra. Thus “Fourier $=$ Helmholtz eigenbasis” is literal.

Colour and sound are field amplitudes decomposed in that same basis: optical fields over $10^{14}$–$10^{15}$ Hz with Maxwell’s speed $c$, and acoustic pressures over $10^1$–$10^4$ Hz with sound speed $c_s$. Sensors (cones/cochlea) project those spectra into low-dimensional perceptual coordinates. When phases decorrelate through scattering, coherent wave transport crosses over to diffusion; the energy density satisfies $\partial_t u=D\nabla^2 u$ (Fick), using the same Green’s functions but forgetting phase.

On the probabilistic side, Brownian motion $X_t$ has Gaussian increments; its law solves the heat equation, and harmonic functions are precisely those for which $u(X_t)$ is a martingale. The resolvent $R(\lambda)=(\lambda I-\Delta)^{-1}$ is analytic in $\lambda$; contour integrals yield spectral projectors and the Laplace inversion formula for $e^{t\Delta}$, matching continuous-spectrum diagonalisation (Fourier) with semigroup decay. Finite-dimensional SVD, compact-operator eigenexpansions, and Fourier integrals are one and the same diagonalisation principle across settings.

### Core derivations
**Heat kernel and Fourier diagonalisation.** For $u_0\in\mathcal{S}(\mathbb{R}^d)$,
$$
u(t,x)=(e^{t\Delta}u_0)(x)=\frac{1}{(4\pi t)^{d/2}}\int e^{-\frac{|x-y|^2}{4t}}u_0(y)\,dy,
$$
and in Fourier space
$$
\widehat{u}(t,\xi)=e^{-|\xi|^2 t}\,\widehat{u_0}(\xi).
$$

**Helmholtz eigenproblem.** Solve $-\Delta \phi=k^2\phi$ on $\mathbb{R}^d$; plane waves $\phi_\xi(x)=e^{i\xi\cdot x}$ satisfy it with $k=|\xi|$. On bounded domains with Dirichlet/Neumann conditions, $-\Delta$ has a discrete spectrum $\{\lambda_j\}$ and orthonormal eigenfunctions $\{\phi_j\}$; solutions expand as $u=\sum \hat u_j \phi_j$.

**Green’s identity and harmonicity.** For $u$ harmonic ($\Delta u=0$) in $\Omega$,
$$
u(x)=\int_{\partial\Omega}\big(u\,\partial_n G - G\,\partial_n u\big)\,dS, \quad \text{(Green representation)}
$$
where $G$ is the Green’s function for $-\Delta$ with chosen boundary data.

**Diffusion as phase-randomised waves (sketch).** If a random medium scrambles phases but conserves energy, the Wigner transform $W^\varepsilon[u]$ of wavefields converges to a kinetic density $f(t,x,k)$; in the diffusive limit $f$ solves a radiative transfer equation whose angular average obeys $\partial_t u=D\nabla^2 u$.

**Martingales and harmonic functions.** If $X_t$ is Brownian with generator $\tfrac12\Delta$ and $u\in C^2$, Itô’s formula gives
$$
u(X_t)-u(X_0)-\tfrac12\int_0^t \Delta u(X_s)\,ds
$$
is a martingale; thus $\Delta u=0$ iff $u(X_t)$ is a martingale.

**Resolvent and semigroup.** For $\lambda>0$,
$$
R(\lambda)=(\lambda I-\Delta)^{-1}=\int_0^\infty e^{-\lambda t}\,e^{t\Delta}\,dt,
$$
and the Dunford–Taylor integral gives $e^{t\Delta}=\frac{1}{2\pi i}\oint e^{t\lambda}R(\lambda)\,d\lambda$.

### Connections & metaphors
- Fourier/SVD/spectral theorem = “choose the basis that the operator already prefers.”
- Colour vs. sound = “same eigenmodes, different sensors and speeds.”
- Diffusion from waves = “phase amnesia”: energy remembers Laplacian, phase is gone.
- Harmonic $\Leftrightarrow$ average equals boundary data seen through Green’s kernel.
- Martingale view = “a function that Brownian motion can’t bias.”

### Open questions
- Quantitative bounds for the wave→diffusion limit in rough media (rates beyond scaling limits).
- Robustness of harmonic measure under domain perturbations and its perceptual analogues.
- Extending resolvent contour methods to non-selfadjoint generators in active media.
- Universality classes of eigenfunction statistics across optics/acoustics/graph Laplacians.

### To try next
- Compute eigenmodes on a rectangle and compare Dirichlet vs. Neumann spectra; listen/see their nodal patterns.
- Derive the heat kernel on $\mathbb{S}^1$ via eigenexpansion and via method of images; compare.
- Implement Wigner transform numerics to observe wave→diffusion crossover.
- Explore cochlear filter banks vs. CIE color matching as linear projections in the Helmholtz basis.

## References
- L. C. Evans, *Partial Differential Equations* (heat, Helmholtz, Green’s identities).
- E. M. Stein & R. Shakarchi, *Fourier Analysis*.
- M. Reed & B. Simon, *Methods of Modern Mathematical Physics II* (spectral theorem, resolvents).
- P. Billingsley, *Probability and Measure* (Brownian, martingales).
- G. Bal, “Kinetic transport and diffusion approximations” (lecture notes).
- R. Jordan, D. Kinderlehrer, F. Otto, “Variational formulation of the Fokker–Planck equation”.

