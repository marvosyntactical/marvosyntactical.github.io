---
title: "Geometry-Aware Losses"
date: "2025-09-12"
tags: ["language models","loss functions","wasserstein","semantic smoothing","geometry","transformers","gan","rlhf","orthogonal rotation"]
related: []
slug: "geo-loss"
---

# Key ideas
- Standard cross-entropy ignores geometry of token embeddings; all wrong tokens penalized equally.  
- Wasserstein losses could better capture "semantic distance" between tokens in embedding space.  
- RLHF can be seen as a GAN; replacing KL with Wasserstein is natural, akin to WGAN.  
- Rotation heads (orthogonal transformations before the softmax) can align hidden states with vocab embedding geometry.  
- Semantic label smoothing without annotation: distribute probability mass over nearest-neighbor tokens in embedding space.  
- A cheap $W_2$-to-Dirac expectation can approximate OT loss without expensive Sinkhorn solvers.  
- Cosine/vMF-style heads offer better calibration and semantic discrimination.  
- Precomputed kNN tables make semantic smoothing efficient; runtime overhead remains manageable.  
- This approach may yield faster early generalization and improved calibration, with modest cost.  

## Abstract
Cross-entropy remains the de facto training objective for large language models, yet it is blind to the geometry of the embedding space. In this discussion we explore how Wasserstein distances, orthogonal rotations, and semantic smoothing losses could address this misalignment. By introducing geometry-aware loss terms, such as $W_2$-to-Dirac expectations and kNN-based soft targets, one can create denser, semantically meaningful gradients. These modifications may lead to qualitatively faster generalization and better calibration while incurring only modest runtime overhead compared to the vanilla softmax+CE setup.

## Expanded notes
The default language model objective is maximum likelihood estimation, operationalized via a softmax projection followed by cross-entropy against a one-hot target. This setup discards the natural geometry of the embedding space: predicting "dog" when the gold token is "cat" is penalized equally as predicting "subatomic particle." The insight here is that one can leverage the geometry of the token embedding space to produce losses that better reflect semantic distances.

One proposal is to adopt Wasserstein distances. In particular, rather than using KL divergence, one could minimize $W_2$ between the predicted distribution and a Dirac mass on the true token embedding. Explicitly, for probability vector $p(\cdot|h)$ and gold embedding $e_y$,  
$$
W_2^2(p,\delta_{e_y}) = \sum_j p_j \|e_j - e_y\|^2,
$$  
which can be computed efficiently when embeddings are unit-normalized. This avoids heavy OT solvers.

A second modification is to alter the output layer itself. Instead of a raw linear projection $Wh+b$, one can introduce an orthogonal rotation $R$ parameterized by a skew-symmetric matrix via the Cayley transform. This aligns the hidden state geometry with the vocab embedding frame. Following rotation, normalization and a cosine similarity head yields logits  
$$
z_j = s \cdot \langle \hat h, e_j \rangle,
$$  
with $\hat h = Rh/\|Rh\|$ and learnable scale $s$.

Semantic label smoothing can be achieved without additional annotation: define neighborhoods around the target token using kNN in embedding space and construct soft targets by applying a softmax over cosine similarities with temperature $\tau$. This distributes probability mass over semantically similar alternatives. Practically, this can be implemented efficiently using precomputed kNN tables stored as embeddings for fast gather operations.

Empirically, this combination of rotation, semantic smoothing, and Wasserstein auxiliaries should provide denser gradient signals, reduce over-penalization of near-misses, and improve calibration. Runtime overhead is modest: rotation adds ~8% FLOPs relative to the large vocab GEMM, semantic smoothing with precomputed kNN is nearly free, and $W_2$ adds ~3–8% overhead via a `topk` selection.

### Core derivations
- Cross-entropy ignores distances: $\mathcal{L}_{CE} = -\log p(y|h)$ treats all errors equally.  
- Wasserstein to Dirac simplifies: $W_2^2(p,\delta_{e_y}) = \mathbb{E}_{j\sim p}[\|e_j - e_y\|^2]$.  
- Orthogonal rotation via Cayley: $R = (I-A)(I+A)^{-1}$ with $A^\top=-A$.  
- Semantic smoothing: $q_j^{(y)} \propto \exp(\langle e_j,e_y\rangle/\tau)$ for $j$ in neighborhood.  

### Connections & metaphors
- Cross-entropy is a "bag of marbles" view: all wrong tokens equally far. Wasserstein adds a "metric space" view.  
- RLHF resembles a GAN; replacing KL with Wasserstein is analogous to WGAN vs original GAN.  
- Rotation head aligns the hidden manifold with the semantic frame, like aligning coordinate charts in differential geometry.  
- Semantic smoothing is label smoothing with a Riemannian metric instead of uniform noise.  

### Open questions
- How robust are geometry-aware losses under subword tokenization artifacts?  
- Does semantic smoothing improve downstream few-shot tasks beyond perplexity?  
- What is the optimal balance between CE and geometry-aware terms ($\epsilon$, $\lambda$)?  
- Can RLHF penalties be replaced by Wasserstein expectations at sequence-level?  
- How to handle dynamically evolving embeddings during training (frequency of kNN refresh)?  

### To try next
- Implement precomputed kNN smoothing tables and benchmark against vanilla CE on Wikitext-103.  
- Compare calibration metrics (ECE) under rotation+Wasserstein vs baseline.  
- Test early generalization speed (tokens-to-reach-val-ppl-X).  
- Explore vMF auxiliary as an alternative spherical likelihood.  
- Scale experiments to mid-size models (GPT-2 medium) and track wall-clock overhead.  

## References
- Papers on semantic label smoothing in seq2seq.  
- Work on optimal transport losses in NLP.  
- ArcFace/CosFace (angular margin classifiers).  
- vMF and spherical loss functions.  
- Softmax bottleneck and mixture-of-softmaxes literature.  
- Orthogonalized/normalized softmax layers.  
- Wasserstein GAN (Arjovsky et al., 2017).  
