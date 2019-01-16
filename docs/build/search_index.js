var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Overview",
    "title": "Overview",
    "category": "page",
    "text": ""
},

{
    "location": "#Overview-1",
    "page": "Overview",
    "title": "Overview",
    "category": "section",
    "text": "PolyChaos is a collection of numerical routines for orthogonal polynomials written in the Julia programming language. Starting from some non-negative weight (aka an absolutely continuous nonnegative measure), PolyChaos allowsto compute the coefficients for the monic three-term recurrence relation,\nto evaluate the orthogonal polynomials at arbitrary points,\nto compute the quadrature rule,\nto compute tensors of scalar products,\nto do all of the above in a multivariate setting (aka product measures).If the weight function is a probability density function, PolyChaos further provides routines to compute polynomial chaos expansions (PCEs) of random variables with this very density function. These routines allowto compute affine PCE coefficients for arbitrary densities,\nto compute moments,\nto compute the tensors of scalar products.PolyChaos contains several canonical orthogonal polynomials such as Jacobi or Hermite polynomials. For these, closed-form expressions and state-of-the art quadrature rules are used whenever possible. However, a cornerstone principle of PolyChaos is to provide all the functionality for user-specific, arbitrary weights.A very specific application of orthogonal polynomials is the theory of polynomial chaos expansions–-for which PolyChaos provides rich functionalities. Loosely speaking, polynomial chaos is to random variables what Fourier series expansion is to periodic signals: a Hilbert space technique that allows to represent an infinite-dimensional mathematical object in terms of finitely many coefficients.What PolyChaos is not (at least currently):symbolic toolbox\nreplacement for FastGaussQuadrature.jl"
},

{
    "location": "#References-1",
    "page": "Overview",
    "title": "References",
    "category": "section",
    "text": "The code base of PolyChaos is partially based on Walter Gautschi\'s Matlab suite of programs for generating orthogonal polynomials and related quadrature rules, with much of the theory presented in his book Orthogonal Polynomials: Computation and Approximation published in 2004 by the Oxford University Press.For the theory of polynomial chaos expansion we mainly consulted T. J. Sullivan. Introduction to Uncertainty Quantification. Springer International Publishing Switzerland. 2015."
},

{
    "location": "#Citing-1",
    "page": "Overview",
    "title": "Citing",
    "category": "section",
    "text": "Currently, there is no publication about PolyChaos. Meanwhile, in case you find PolyChaos useful, feel free to get in touch, or simply participate in Github\'s gamification. ;)"
},

{
    "location": "typehierarchy/#",
    "page": "Type Hierachy",
    "title": "Type Hierachy",
    "category": "page",
    "text": ""
},

{
    "location": "typehierarchy/#Type-Hierachy-1",
    "page": "Type Hierachy",
    "title": "Type Hierachy",
    "category": "section",
    "text": "needs to be written..."
},

{
    "location": "NumericalIntegration/#",
    "page": "Numerical Integration",
    "title": "Numerical Integration",
    "category": "page",
    "text": ""
},

{
    "location": "NumericalIntegration/#Numerical-Integration-1",
    "page": "Numerical Integration",
    "title": "Numerical Integration",
    "category": "section",
    "text": "using PolyChaos\nn = 5; f(t) = sin(t)\nopq = OrthoPolyQ(\"uniform01\",n-1);\nI0 = integrate(f,opq);\nm = Measure(\"uniform01\");\nq = Quad(n-1,m);\nI1 = integrate(f,q)\nop = OrthoPoly(\"uniform01\",n-1)\nq = Quad(n,op)\nI2 = integrate(f,q)The goal of this tutorial is to solve an integral using Gauss quadrature,I = int_0^1 f(t) mathrmd t approx sum_k=1^n w_k f(t_k)where we choose f(t) = sin(t), and n = 5."
},

{
    "location": "NumericalIntegration/#Variant-0-1",
    "page": "Numerical Integration",
    "title": "Variant 0",
    "category": "section",
    "text": "using PolyChaos\nn = 5;\nf(t) = sin(t);\nopq = OrthoPolyQ(\"uniform01\",n-1);\nI0 = integrate(f,opq)\nprint(\"Numerical error: $(abs(1-cos(1)-I0))\")with negligible numerical errors."
},

{
    "location": "NumericalIntegration/#Variant-1-1",
    "page": "Numerical Integration",
    "title": "Variant 1",
    "category": "section",
    "text": "Let us  now solve the same problem, while elaborating what is going on under the hood. At first, we load the package by callingusing PolyChaosNow we define a measure, specifically the uniform measure mathrmdlambda(t) = w(t) mathrmd t with the weight w defined as  w mathcalW = 01 rightarrow mathbbR quad w(t) = 1This measure can be defined using the composite type Measure:m = Measure(\"uniform01\");Next, we need to compute the quadrature rule relative to the uniform measure. To do this we use the composite type Quad.q1 = Quad(n-1,m);\nnw(q)This creates a quadrature rule q named \"myq\" with n-1 nodes and weights relative to the measure m. The function nw() prints the nodes and weights. To solve the integral we call integrate()I1 = integrate(f,q1)\nprint(\"Numerical error: $(abs(1-cos(1)-I1))\")"
},

{
    "location": "NumericalIntegration/#Variant-2-1",
    "page": "Numerical Integration",
    "title": "Variant 2",
    "category": "section",
    "text": "There is another variant to solve the integral, which computes the quadrature rule based on the recurrence coefficients of the polynomials that are orthogonal relative to the measure m. First, we compute the orthogonal polynomials using the composite type OrthoPoly.op = OrthoPoly(\"uniform01\",n-1);\ncoeffs(op)The resulting system of orthogonal polynomials is characterized by its recursion coefficients (alpha beta), which can be extracted with the function coeffs().Now, the quadrature rule can be constructed based on op, and the integral be solved.q2 = Quad(n,op)\nnw(q)\nI2 = integrate(f,q2)\nprint(\"Numerical error: $(abs(1-cos(1)-I2))\")"
},

{
    "location": "NumericalIntegration/#Comparison-1",
    "page": "Numerical Integration",
    "title": "Comparison",
    "category": "section",
    "text": "We see that the different variants provide slightly different results:1-cos(1) .- [I0 I1 I2]with I0 and I2 being the same and more accurate than I1. The increased accuracy is based on the fact that for I0 and I2 the quadrature rules are based on the recursion coefficients of the underlying orthogonal polynomials. The quadrature for I1 is based on an general-purpose method that can be significantly less accurate."
},

{
    "location": "OrthogonalPolynomials_canonical/#",
    "page": "Monic Orthogonal Polynomials",
    "title": "Monic Orthogonal Polynomials",
    "category": "page",
    "text": ""
},

{
    "location": "OrthogonalPolynomials_canonical/#Univariate-Monic-Orthogonal-Polynomials-1",
    "page": "Monic Orthogonal Polynomials",
    "title": "Univariate Monic Orthogonal Polynomials",
    "category": "section",
    "text": "Univariate monic orthogonal polynomials make up the core building block of the package. These are real polynomials  pi_k _k geq 0, which are univariate pi_k mathbbR rightarrow mathbbR and orthogonal relative to a nonnegative weight function w mathbbR rightarrow mathbbR_geq 0, and which have a leading coefficient equal to one:beginaligned\npi_k(t) = t^k + a_k-1 t^k-1 + dots + a_1 t + a_0 quad forall k = 0 1 dots \nlangle pi_k pi_l rangle = int_mathbbR pi_k(t) pi_l(t) w(t) mathrmdt =\nbegincases\n0  k neq l text and kl geq 0 \n pi_k ^2  0  k = l geq 0\nendcases\nendalignedThese univariate monic orthogonal polynomials satisfy the paramount three-term recurrence relationbeginaligned\npi_k+1(t) = (t - alpha_k) pi_k(t) - beta_k pi_k-1(t) quad k= 0 1 dots \npi_o(t) = 1 \npi_-1(t) = 0\nendalignedHence, every system of n univariate monic orthogonal polynomials  pi_k _k=0^n is isomorphic to its recurrence coefficients  alpha_k beta_k _k=0^n."
},

{
    "location": "OrthogonalPolynomials_canonical/#Classical-Orthogonal-Polynomials-1",
    "page": "Monic Orthogonal Polynomials",
    "title": "Classical Orthogonal Polynomials",
    "category": "section",
    "text": "The so-called classical orthogonal polynomials are polynomials named after famous mathematicians who each discovered a special family of orthogonal polynomials, for example Hermite polynomials or Jacobi polynomials. For classical orthogonal polynomials there exist closed-form expressions of–-among others–-the recurrence coefficients. Also quadrature rules for classical orthogonal polynomials are well-studied (with dedicated packages such as FastGaussQuadrature.jl. However, more often than not these classical orthogonal polynomials are neither monic nor orthogonal, hence not normalized in any sense. For example, there is a distinction between the probabilists\' Hermite polynomials and the physicists\' Hermite polynomials. The difference is in the weight function w(t) relative to which the polynomials are orthogonal:beginaligned\ntextProbabilists w(t) = frac1sqrt2 pi  exp left( - fract^22 right) \ntextPhysicists w(t) =  exp left( - t^2 right)\nendalignedTo streamline the computations, all classical orthogonal polynomials are converted to monic orthogonal polynomials (for which, of course, the closed-form expressions persist). Currently, the following weight functions (hence classical orthogonal polynomials) are supported:Name Weight w(t) Parameters Support Classical polynomial\nhermite $ \\exp \\left( - t^2 \\right)$ - (-infty infty) Hermite\ngenhermite $ \\lvert t \\rvert^{2 \\mu}\\exp \\left( - t^2 \\right)$ mu  -frac12 (-infty infty) Generalized Hermite\nlegendre 1 - (-11) Legendre\njacobi (1-t)^alpha (1+t)^beta alpha beta  -1 (-11) Jacobi\nlaguerre exp(-t) - (0infty) Laguerre\ngenlaguerre t^alphaexp(-t) alpha-1 (0infty) Generalized Laguerre\nmeixnerpollaczek frac12 pi exp((2phi-pi)t) lvertGamma(lambda + mathrmit)rvert^2 lambda  0 0phipi (-inftyinfty) Meixner-PollaczekAdditionally, the following weight functions that are equivalent to probability density functions are supported:Name Weight w(t) Parameters Support Classical polynomial\ngaussian frac1sqrt2 pi  exp left( - fract^22 right) - (-infty infty) Probabilists\' Hermite\nuniform01 1 - (01) Legendre\nbeta01 frac1B(alphabeta)  t^alpha-1 (1-t)^beta-1 alpha beta  0 (01) Jacobi\ngamma fracbeta^alphaGamma(alpha) t^alpha-1 exp(-beta t) alpha beta  0 (0infty) Laguerre\nlogistic fracexp(-t)(1+exp(-t))^2 - (-inftyinfty) -To generate the orthogonal polynomials up to maximum degree deg, simply callusing PolyChaos\ndeg = 4\nop = OrthoPoly(\"gaussian\",deg)This generates opas an OrthoPoly type with the underlying Gaussian measure op.meas. The recurrence coefficients are accessible via coeffs().coeffs(op)By default, the constructor for OrthoPoly generates deg+1 recurrence coefficients. Sometimes, some other number Nrec may be required. This is why Nrec is a keyword for the constructor OrthoPoly.N = 100\nop_ = OrthoPoly(\"logistic\",deg;Nrec=N)Let\'s check whether we truly have more coefficients:size(coeffs(op_),1)==N"
},

{
    "location": "OrthogonalPolynomials_canonical/#Arbitrary-Weights-1",
    "page": "Monic Orthogonal Polynomials",
    "title": "Arbitrary Weights",
    "category": "section",
    "text": "If you are given a weight function w that does not belong to the Table above, it is still possible to generate the respective univariate monic orthogonal polynomials. First, we define the measure by specifying a name, the weight, the support, symmetry, and parameterssupp = (-1,1)\nfunction w(t)\n    supp[1]<=t<=supp[2] ? (1. + t) : error(\"$t not in support\")\nend\nmy_meas = Measure(\"my_meas\",w,supp,false,Dict())Notice: it is advisable to define the weight such that an error is thrown for arguments outside of the support.Now, we want to construct the univariate monic orthogonal polynomials up to degree deg relative to m. The constructor ismy_op = OrthoPoly(\"my_op\",deg,my_meas;Nquad=200)By default, the recurrence coefficients are computed using the Stieltjes procuedure with Clenshaw-Curtis quadrature (with Nquad nodes and weights). Hence, the choice of Nquad influences accuracy."
},

{
    "location": "OrthogonalPolynomials_canonical/#Multivariate-Monic-Orthogonal-Polynomials-1",
    "page": "Monic Orthogonal Polynomials",
    "title": "Multivariate Monic Orthogonal Polynomials",
    "category": "section",
    "text": "Suppose we have p systems of univariate monic orthogonal polynomials, pi_k^(1) _kgeq 0   pi_k^(2) _kgeq 0 dots  pi_k^(p) _kgeq 0each system being orthogonal relative to the weights w^(1) w^(2) dots w^(p) with supports mathcalW^(1) mathcalW^(2) dots mathcalW^(p). Also, let d^(i) be the maximum degree of the i-th system of univariate orthogonal polynomials. We would like to construct a p-variate monic basis  psi_k _k geq 0 with psi mathbbR^p rightarrow mathbbR of degree at most 0 leq d leq min_i=1dotsk d^(i). Further, this basis shall be orthogonal relative to the product measure w mathcalW = mathcalW^(1) otimes mathcalW^(2) mathcalW^(1) cdots otimes mathcalW^(p) rightarrow mathbbR_geq 0 given byw(t) = prod_i=1^p w^(i)(t_i)hence satisfieslangle psi_k psi_l rangle = int_mathcalW psi_k(t) psi_l(t) w(t) mathrmd t =\nbegincases\n0  k neq l text and kl geq 0 \n psi_k ^2  0  k = l geq 0\nendcasesFor this, there exists the composite struct MultiOrthoPoly. Let\'s consider an example where we mix classical orthogonal polynomials with an arbitrary weight.deg = [3,5,6,4]\nd = minimum(deg)\n\nop1 = OrthoPoly(\"gaussian\",deg[1])\nop2 = OrthoPoly(\"uniform01\",deg[2])\nop3 = OrthoPoly(\"beta01\",deg[3],Dict(:shape_a=>2,:shape_b=>1.2))\nops = [op1,op2,op3,my_op]\nmop = MultiOrthoPoly(ops,d)The total number of  basis polynomials is stored in the field dim. The univariate basis polynomials making up the multivariate basis are stored in the field uni.mop.uniThe field ind contains the multi-index, i.e. row i stores what combination of univariate polynomials makes up the i-th multivariate polynomial. For example,i = 11\nmop.ind[i+1,:]translates mathematically topsi_11(t) = pi_0^(1)(t_1) pi_1^(2)(t_2) pi_0^(3)(t_3) pi_1^(4)(t_4)Notice that there is an offset by one, because the basis counting starts at 0, but Julia is 1-indexed. The underlying measure of mop is now of type MultiMeasure, and stored in the field measmop.measThe weight w can be evaluated as expectedmop.meas.w(0.5*ones(length(ops)))"
},

{
    "location": "PCEtutorial/#",
    "page": "Basic Usage",
    "title": "Basic Usage",
    "category": "page",
    "text": ""
},

{
    "location": "PCEtutorial/#CommonRandomVariables-1",
    "page": "Basic Usage",
    "title": "Common Random Variables",
    "category": "section",
    "text": "Polynomial chaos expansion (PCE) is a Hilbert space technique for random variables with finite variance. Mathematically equivalent to Fourier series expansions for periodic signals, PCE allows to characterize a random variable in terms of its PCE coefficients (aka Fourier coefficients). That is, the PCE of a random variable mathsfx is given bymathsfx = sum_i=0^L x_i phi_iwhere x_i are the so-called PCE coefficients, and phi_i are the orthogonal polynomials that are orthogonal relative to the probability density function of mathsfx.This tutorial walks you through the PCE of common random variables, namely Gaussian (gaussian), Beta (beta01), Uniform(uniform01), Logistic (logistic), and shows how they are implemented in PolyChaos."
},

{
    "location": "PCEtutorial/#Construction-of-Basis-1",
    "page": "Basic Usage",
    "title": "Construction of Basis",
    "category": "section",
    "text": "We begin by specifying the names and, if any, parameters for the uncertainties.using Revise\nusing PolyChaos\nα, β = 1.3, 2.2\npolynames = [\"gaussian\", \"beta01\", \"uniform01\", \"logistic\"]\npars = [Dict(), Dict(:shape_a=>α,:shape_b=>β), Dict(), Dict()]The orthogonal polynomials are constructed using OrthoPoly (here of degree at most d, and stored in the dictionary myops).d = 6\nmyops = Dict()\nfor (i,name) in enumerate(polynames)\n    myops[name]=OrthoPoly(name,d,pars[i])\nendFor example, let\'s evaluate the Gaussian basis polynomials at some pointspoints, degrees = randn(10), 0:2:d\nop_gauss=myops[\"gaussian\"]\n[ evaluate(degree,points,op_gauss) for degree in degrees ]If a quadrature rule is required, this can be added by calling OrthoPolyQmyopqs = Dict()\nfor (i,name) in enumerate(polynames)\n    myopqs[name]=OrthoPolyQ(name,d,pars[i])\nend"
},

{
    "location": "PCEtutorial/#Finding-PCE-Coefficients-1",
    "page": "Basic Usage",
    "title": "Finding PCE Coefficients",
    "category": "section",
    "text": "Having constructed the orthogonal bases, the question remains how to find the PCE coefficients for the common random variables. Every random variable can be characterized exactly by two PCE coefficients. For a Gaussian random variable, this is familiar: the mean and the variance suffice to describe a Gaussian random variable entirely. The same is true for any random variable of finite variance given the right basis. The function convert2affinePCE provides the first two PCE coefficients (hence the name affine) for the common random variables."
},

{
    "location": "PCEtutorial/#Gaussian-1",
    "page": "Basic Usage",
    "title": "Gaussian",
    "category": "section",
    "text": "Given the Gaussian random variable mathsfx sim mathcalN(mu sigma^2) with sigma  0, the affine PCE coefficients are# Gaussian\nμ, σ = 2., 0.2\npce_gaussian = convert2affinePCE(\"gaussian\",μ,σ)\n# Uniform"
},

{
    "location": "PCEtutorial/#Uniform-1",
    "page": "Basic Usage",
    "title": "Uniform",
    "category": "section",
    "text": "Given the uniform random variable mathsfx sim mathcalU(a b) with finite support ab, the affine PCE coefficients area, b = -0.3, 1.2\nconvert2affinePCE(\"uniform01\",a,b)Instead, if the expected value and standard deviation are known, the affine PCE coefficients of the uniform random variable arepce_uniform = convert2affinePCE(\"uniform01\",μ,σ;kind=:μσ)\n# notice that the zero-order coefficient IS equivalent to the expected value μ"
},

{
    "location": "PCEtutorial/#Beta-1",
    "page": "Basic Usage",
    "title": "Beta",
    "category": "section",
    "text": "Given the Beta random variable mathsfx sim mathcalB(a b alpha beta) with finite support ab and shape parameters alpha beta  0, the affine PCE coefficients areconvert2affinePCE(\"beta01\",a,b,Dict(:shape_a=>α,:shape_b=>β))Instead, if the expected value and standard deviation are known, the affine PCE coefficients of the uniform random variable arepce_beta = convert2affinePCE(\"beta01\",μ,σ,Dict(:shape_a=>α,:shape_b=>β); kind=:μσ)"
},

{
    "location": "PCEtutorial/#Logistic-1",
    "page": "Basic Usage",
    "title": "Logistic",
    "category": "section",
    "text": "Given the logstic random variable mathsfx sim mathcalL(a_1a_2) where a_20 with the probability density functionrho(t) = frac14 a_2  operatornamesech^2 left(fract-a_12a_2right)the affine PCE coefficients of the uniform random variable area1, a2 = μ, sqrt(3)*σ/pi\npce_logistic = convert2affinePCE(\"logistic\",a1,a2)"
},

{
    "location": "PCEtutorial/#Moments-1",
    "page": "Basic Usage",
    "title": "Moments",
    "category": "section",
    "text": "It is a key feature of PCE to compute moments from the PCE coefficients alone; no sampling is required."
},

{
    "location": "PCEtutorial/#Gaussian-2",
    "page": "Basic Usage",
    "title": "Gaussian",
    "category": "section",
    "text": "mean(pce_gaussian,myops[\"gaussian\"]), std(pce_gaussian,myops[\"gaussian\"])"
},

{
    "location": "PCEtutorial/#Uniform-2",
    "page": "Basic Usage",
    "title": "Uniform",
    "category": "section",
    "text": "mean(pce_uniform,myops[\"uniform01\"]), std(pce_uniform,myops[\"uniform01\"])"
},

{
    "location": "PCEtutorial/#Beta-2",
    "page": "Basic Usage",
    "title": "Beta",
    "category": "section",
    "text": "mean(pce_beta,myops[\"beta01\"]), std(pce_beta,myops[\"beta01\"])"
},

{
    "location": "PCEtutorial/#Logistic-2",
    "page": "Basic Usage",
    "title": "Logistic",
    "category": "section",
    "text": "mean(pce_logistic,myops[\"logistic\"]), std(pce_logistic,myops[\"logistic\"])"
},

{
    "location": "PCEtutorial/#Sampling-1",
    "page": "Basic Usage",
    "title": "Sampling",
    "category": "section",
    "text": "Having found the PCE coefficients, it may be useful to sample the random variables. That means, find N realizations of the random variable that obey the random variable\'s probability density function. This is done in two steps:Draw N samples from the measure (sampleMeasure()), and then\nEvaluate the basis polynomials and multiply times the PCE coefficients, i.e. sum_i=0^L x_i phi_i(xi_j) where xi_j is the j-th sample from the measure (evaluatePCE()).Both steps are combined in the function samplepCE()."
},

{
    "location": "PCEtutorial/#Gaussian-3",
    "page": "Basic Usage",
    "title": "Gaussian",
    "category": "section",
    "text": "using Statistics\nN = 1000\nξ_gaussian = sampleMeasure(N,myops[\"gaussian\"])\nsamples_gaussian = evaluatePCE(pce_gaussian,ξ_gaussian,myops[\"gaussian\"])\n# samplePCE(N,pce_gaussian,myops[\"gaussian\"])"
},

{
    "location": "PCEtutorial/#Uniform-3",
    "page": "Basic Usage",
    "title": "Uniform",
    "category": "section",
    "text": "ξ_uniform = sampleMeasure(N,myops[\"uniform01\"])\nsamples_uniform = evaluatePCE(pce_uniform,ξ_uniform,myops[\"uniform01\"])\n# samples_uniform = samplePCE(N,pce_uniform,myops[\"uniform01\"])"
},

{
    "location": "PCEtutorial/#Beta-3",
    "page": "Basic Usage",
    "title": "Beta",
    "category": "section",
    "text": "ξ_beta = sampleMeasure(N,myops[\"beta01\"])\nsamples_beta = evaluatePCE(pce_beta,ξ_beta,myops[\"beta01\"])\n# samples_beta = samplePCE(N,pce_beta,myops[\"beta01\"])"
},

{
    "location": "PCEtutorial/#Logistic-3",
    "page": "Basic Usage",
    "title": "Logistic",
    "category": "section",
    "text": "ξ_logistic = sampleMeasure(N,myops[\"logistic\"])\nsamples_logistic = evaluatePCE(pce_logistic,ξ_logistic,myops[\"logistic\"])\n# samples_logistic = samplePCE(N,pce_logistic,myops[\"logistic\"])"
},

{
    "location": "ChiSquared_k1/#",
    "page": "Chi Squared, One DOF",
    "title": "Chi Squared, One DOF",
    "category": "page",
    "text": ""
},

{
    "location": "ChiSquared_k1/#Chi-squared-Distribution-(k1)-1",
    "page": "Chi Squared, One DOF",
    "title": "Chi-squared Distribution (k=1)",
    "category": "section",
    "text": ""
},

{
    "location": "ChiSquared_k1/#Theory-1",
    "page": "Chi Squared, One DOF",
    "title": "Theory",
    "category": "section",
    "text": "Given a standard random variable X sim mathcalN(01) we would like to find the random variable Y = X^2. The analytic solution is known: Y follows a chi-squared distribution with k=1 degree of freedom.Using polynomial chaos expansion (PCE), the problem can be solved using Galerkin projection. Let phi_k _k=0^n be the monic orthogonal basis relative to the probability density of X, namelyf_X(x) = frac1sqrt2 pi exp left( - fracx^22 right)Then, the PCE of X is given byX = sum_k=0^n x_k phi_kwithx_0 = 0 quad x_1 = 1 quad x_i = 0 quad forall i =2dotsnTo find the PCE coefficients y_k for Y = sum_k=^n y_k phi_k, we apply Galerkin projection, which leads toy_m langle phi_m phi_m rangle = sum_i=0^n sum_j=0^n x_i x_j langle phi_i phi_j phi_m rangle quad forall m = 0 dots nHence, knowing the scalars langle phi_m phi_m rangle, and langle phi_i phi_j phi_m rangle, the PCE coefficients y_k can be obtained immediately. From the PCE coefficients we can get the moments and compare them to the closed-form expressions.Notice: A maximum degree of 2 suffices to get the exact solution with PCE. In other words, increasing the maximum degree to values greater than 2 introduces nothing but computational overhead (and numerical errors, possibly)."
},

{
    "location": "ChiSquared_k1/#Practice-1",
    "page": "Chi Squared, One DOF",
    "title": "Practice",
    "category": "section",
    "text": "First, we create a orthogonal basis relative to f_X(x) of degree at most d=2 (deg below).Notice that we consider a total of Nrec recursion coefficients, and that we also add a quadrature rule by calling OrthoPolyQ().k = 1\nusing PolyChaos\ndeg, Nrec = 2, 20\nop = OrthoPoly(\"gaussian\",deg;Nrec=Nrec);\nopq = OrthoPolyQ(op)\n# opq = OrthoPolyQ(\"gaussian\",deg;Nrec=Nrec)Next, we define the PCE for X.L = dim(opq)\nmu, sig = 0., 1.\nx = [ convert2affinePCE(\"gaussian\",mu,sig); zeros(Float64,L-2) ]With the orthogonal basis and the quadrature at hand, we can compute the tensors t2 and t3 that store the entries langle phi_m phi_m rangle, and langle phi_i phi_j phi_m rangle, respectively.t2 = Tensor(2,opq);\nt3 = Tensor(3,opq)With the tensors at hand, we can compute the Galerkin projection.y = [ sum( x[i]*x[j]*t3.get([i-1,j-1,m-1])/t2.get([m-1,m-1])  for i=1:L, j=1:L ) for m=1:L ]Let\'s compare the moments via PCE to the closed-form expressions.moms_analytic(k) = [k, sqrt(2k), sqrt(8/k)]\nfunction myskew(y)\n   e3 = sum( y[i]*y[j]*y[k]*t3.get([i-1,j-1,k-1]) for i=1:L,j=1:L,k=1:L )\n   μ = y[1]\n   σ = mystd(y)\n   (e3-3*μ*σ^2-μ^3)/(σ^3)\nend\n\nprint(\"Expected value:\\t\\t$(moms_analytic(k)[1]) = $(mean(y,opq))\\n\")\nprint(\"\\t\\t\\terror = $(abs(mean(y,opq)-moms_analytic(k)[1]))\\n\")\nprint(\"Standard deviation:\\t$(moms_analytic(k)[2]) = $(std(y,opq))\\n\")\nprint(\"\\t\\t\\terror = $(moms_analytic(k)[2]-std(y,opq))\\n\")\nprint(\"Skewness:\\t\\t$(moms_analytic(k)[3]) = $(myskew(y))\\n\")\nprint(\"\\t\\t\\terror = $(moms_analytic(k)[3]-myskew(y))\\n\")\nLet\'s plot the probability density function to compare results. We first draw samples from the measure with the help of sampleMeasure(), and then evaluate the basis at these samples and multiply times the PCE coefficients. The latter stop is done using evaluatePCE(). Finally, we compare the result agains the analytical PDF rho(t) = fracmathrme^-05tsqrt2 t  Gamma(05) of the chi-squared distribution with one degree of freedom.using PyPlot\nNsmpl = 10000\n#ξ = sampleMeasure(Nsmpl,opq)\n#ysmpl = evaluatePCE(y,ξ,opq)\nysmpl = samplePCE(Nsmpl,y,opq)\nfigure(1)\nplt[:hist](ysmpl; density=true,bins=75)\ngrid(true); xlabel(L\"$t$\"); ylabel(L\"$\\rho(t)$\");\n\nimport SpecialFunctions: gamma\nρ(t) = 1/(sqrt(2)*gamma(0.5))*1/sqrt(t)*exp(-0.5*t)\nt = range(0.1; stop=maximum(ysmpl), length=100)\nplot(t,ρ.(t))"
},

{
    "location": "ChiSquared_kGreater1/#",
    "page": "Chi Squared, Several DOFs",
    "title": "Chi Squared, Several DOFs",
    "category": "page",
    "text": ""
},

{
    "location": "ChiSquared_kGreater1/#Chi-squared-Distribution-(k1)-1",
    "page": "Chi Squared, Several DOFs",
    "title": "Chi-squared Distribution (k1)",
    "category": "section",
    "text": ""
},

{
    "location": "ChiSquared_kGreater1/#Theory-1",
    "page": "Chi Squared, Several DOFs",
    "title": "Theory",
    "category": "section",
    "text": "Given k standard random variables X_i sim mathcalN(01) for i=1dotsk we would like to find the random variable Y = sum_i=1^k X_i^2. The analytic solution is known: Y follows a chi-squared distribution with k degrees of freedom.Using polynomial chaos expansion (PCE), the problem can be solved using Galerkin projection. Let phi_k _k=0^n be the monic orthogonal basis relative to the probability density of X = X_1 dots X_k, namelyf_X(x) =  prod_i=1^k frac1sqrt2 pi  exp left( - fracx_i^22 right)Then, the PCE of X_i is given byX_i = sum_k=0^n x_ik phi_kwithx_i0 = 0 quad x_ii+1 = 1 quad x_il = 0 quad forall l in 1dotsn setminus i+1To find the PCE coefficients y_k for Y = sum_k=^n y_k phi_k, we apply Galerkin projection, which leads toy_m langle phi_m phi_m rangle = sum_i=1^k sum_j_1=0^n sum_j_2=0^n x_ij_1 x_ij_2 langle phi_j_1 phi_j_2 phi_m rangle quad forall m = 0 dots nHence, knowing the scalars langle phi_m phi_m rangle, and langle phi_j_1 phi_j_2 phi_m rangle, the PCE coefficients y_k can be obtained immediately. From the PCE coefficients we can get the moments and compare them to the closed-form expressions.Notice: A maximum degree of 2 suffices to get the exact solution with PCE. In other words, increasing the maximum degree to values greater than 2 introduces nothing but computational overhead (and numerical errors, possibly)."
},

{
    "location": "ChiSquared_kGreater1/#Practice-1",
    "page": "Chi Squared, Several DOFs",
    "title": "Practice",
    "category": "section",
    "text": "First, we create a orthogonal basis relative to f_X(x) of degree at most d=2 (degree below).Notice that we consider a total of Nrec recursion coefficients, and that we also add a quadrature rule by calling OrthoPolyQ().k = 12\nusing PolyChaos\ndegree, Nrec = 2, 20\nop = OrthoPoly(\"gaussian\",degree;Nrec=Nrec);\nopq = OrthoPolyQ(op)Now let\'s define a multivariate basismop = MultiOrthoPoly([opq for i=1:k],degree)Next, we define the PCE for all X_i with i = 1 dots k.L = dim(mop)\nmu, sig = 0., 1.\nx = [ assign2multi(convert2affinePCE(\"gaussian\",mu,sig),i,mop.ind) for i=1:k ]With the orthogonal basis and the quadrature at hand, we can compute the tensors t2 and t3 that store the entries langle phi_m phi_m rangle, and langle phi_j_1 phi_j_2 phi_m rangle, respectively.t2 = Tensor(2,mop);\nt3 = Tensor(3,mop)With the tensors at hand, we can compute the Galerkin projection.Notice: there are more efficient ways to do this, but let\'s keep it simple.y = [ sum( x[i][j1]*x[i][j2]*t3.get([j1-1,j2-1,m-1])/t2.get([m-1,m-1])  for i=1:k, j1=1:L, j2=1:L ) for m=1:L ]Let\'s compare the moments via PCE to the closed-form expressions.moms_analytic(k) = [k, sqrt(2k), sqrt(8/k)]\nfunction myskew(y)\n   e3 = sum( y[i]*y[j]*y[k]*t3.get([i-1,j-1,k-1]) for i=1:L,j=1:L,k=1:L )\n   μ = y[1]\n   σ = mystd(y)\n   (e3-3*μ*σ^2-μ^3)/(σ^3)\nend\n\nprint(\"Expected value:\\t\\t$(moms_analytic(k)[1]) = $(mean(y,mop))\\n\")\nprint(\"\\t\\t\\terror = $(abs(mean(y,mop)-moms_analytic(k)[1]))\\n\")\nprint(\"Standard deviation:\\t$(moms_analytic(k)[2]) = $(std(y,mop))\\n\")\nprint(\"\\t\\t\\terror = $(moms_analytic(k)[2]-std(y,mop))\\n\")\nprint(\"Skewness:\\t\\t$(moms_analytic(k)[3]) = $(myskew(y))\\n\")\nprint(\"\\t\\t\\terror = $(moms_analytic(k)[3]-myskew(y))\\n\")\nLet\'s plot the probability density function to compare results. We first draw samples from the measure with the help of sampleMeasure(), and then evaluate the basis at these samples and multiply times the PCE coefficients. The latter stop is done using evaluatePCE(). Both steps are combined in the function samplePCE(). Finally, we compare the result agains the analytical PDF rho(t) = fract^t2-1mathrme^-t22^k2  Gamma(k2) of the chi-squared distribution with one degree of freedom.using PyPlot\nNsmpl = 10000\n# ξ = sampleMeasure(Nsmpl,mop)\n# ysmpl = evaluatePCE(y,ξ,mop)\nysmpl = samplePCE(Nsmpl,y,mop)\nfigure(1)\nplt[:hist](ysmpl; density=true,bins=70)\ngrid(true); xlabel(L\"$t$\"); ylabel(L\"$\\rho(t)$\");\n\nimport SpecialFunctions: gamma\nρ(t) = 1/(2^(0.5*k)*gamma(0.5*k))*t^(0.5*k-1)*exp(-0.5*t)\nt = range(0.1; stop=maximum(ysmpl), length=100)\nplot(t,ρ.(t))"
},

{
    "location": "RandomODE/#",
    "page": "Random ODE",
    "title": "Random ODE",
    "category": "page",
    "text": ""
},

{
    "location": "RandomODE/#Galerkin-based-Solution-of-Random-Differential-Equation-1",
    "page": "Random ODE",
    "title": "Galerkin-based Solution of Random Differential Equation",
    "category": "section",
    "text": "This tutorial demonstrates how random differential equations can be solved using polynomial chaos expansions (PCE)."
},

{
    "location": "RandomODE/#Theory-1",
    "page": "Random ODE",
    "title": "Theory",
    "category": "section",
    "text": "A random differential equation is an ordinary differential equation that has random parameters, hence its solution is itself a (time-varying) random variable. Perhaps the simplest non-trivial example is the following scalar, linear ordinary differential equationdotx(t) = a x(t) quad x(0) = x_0where a is the realization of a Gaussian random variable mathsfa sim mathcalN(mu sigma^2) with mean mu and variance sigma^2. Arguably, for every realization a we can solve the differential equation and obtainx(t) = x_0 mathrme^a tfrom which we find thatln (x(t)) = ln (x_0) + at sim mathcalN(ln(x_0) + mu t (sigma t)^2)In other words, the logarithm of the solution is normally distributed (so-called log-normal distribution).We\'d like to obtain this result numerically with the help of PCE. The first step is to define the (truncated) PCE for the random variable mathsfamathsfa = sum_i=0^L a_i phi_iwhere a_i are the so-called PCE coefficients, and phi_i are the orthogonal basis polynomials. As the solution to the random differential equation is itself a random variable, we treat x(t) as the realization of the random variable mathsfx(t), and define its PCEmathsfx(t) = sum_i=0^L x_i(t) phi_iThe question is how to obtain the unknown PCE coefficients x_i(t) from the known PCE coefficients a_i relative to the orthogonal basis polynomials phi_i. This can be done using Galerkin projection, which is nothing else than projecting onto the orthogonal basis. Think of a three-dimensional space, in which you have placed some three-dimensional object. If you know project the silhouett of the object onto every axis of the three-dimensional space, then you are doing a Galerkin projection. With PCE the concept is equivalent, but the imagination has a harder time. The first step for Galerkin projection is to insert the PCEssum_i=0^L dotx_i(t) phi_i = sum_j=0^L a_j phi_j sum_k=0^L x_k(t) phi_kthe second step is to project onto every basis polynomial phi_m for m = 0 1 dots L, and to exploit orthogonality of the basis. This givesdotx_m(t) langle phi_m phi_m rangle = sum_j=0^L sum_k=0^L a_j x_k(t) langle phi_l phi_k phi_m rangle quad m = 0 1 dots LOf course, the initial condition must not be forgotten:x_0(0) = x_0 quad x_m(0) = 0 quad m = 1 dots LIf we can solve this enlarged system of ordinary random differential equations, we can reconstruct the analytic solution."
},

{
    "location": "RandomODE/#Practice-1",
    "page": "Random ODE",
    "title": "Practice",
    "category": "section",
    "text": "We begin by defining the random differential equationx0 = 2.0\nμ, σ = -0.5, 0.05\ntend, Δt = 3.0, 0.01Next, we define an orthogonal basis (and its quadrature rule) relative to the Gaussian measure using PolyChaos. We choose a maximum degree of L.using PolyChaos\nL, Nrec = 6, 40\nopq = OrthoPolyQ(\"gaussian\",L;Nrec=Nrec)Now we can define the PCE for mathsfa and solve the Galerkin-projected ordinary differential equation using DifferentialEquations.jl.using DifferentialEquations\n\na = [ convert2affinePCE(\"gaussian\",μ,σ); zeros(Float64,L-1) ] # PCE coefficients of a\nxinit = [ x0; zeros(Float64,L) ] # PCE coefficients of initial condition\n\nt2 = Tensor(2,opq); # \\langle \\phi_i, \\phi_j \\rangle\nt3 = Tensor(3,opq); # \\langle \\phi_i \\phi_j, \\phi_k \\rangle\n\n# Galerkin-projected random differential equation\nfunction ODEgalerkin(du,u,p,t)\n   du[:] = [ sum( p[j+1]*u[k+1]*t3.get([j,k,m])/t2.get([m,m]) for j=0:L for k=0:L) for m=0:L ]\nend\n\nprobgalerkin = ODEProblem(ODEgalerkin,xinit,(0,tend),a)\nsolgalerkin = solve(probgalerkin;saveat=0:Δt:tend)\nt, x = solgalerkin.t, solgalerkin.u;For later purposes we compute the expected value and the standard deviation at all time instants using PCE.# an advantage of PCE is that moments can be computed from the PCE coefficients alone; no sampling required\nmean_pce = [ mean(x[i],opq) for i=1:length(x)]  \nstd_pce = [ std(x[i],opq) for i=1:length(x) ]We compare the solution from PCE to a Monte-Carlo-based solution. That means to solve the ordinary differential equation for many samples of mathsfa. We first sample from the measure using sampleMeasure, and then generate samples of mathsfa using evaluatePCE. After that we solve the ODE and store the results in xmc.using Statistics\nNsmpl = 5000\nξ = sampleMeasure(Nsmpl,opq)     # sample from Gaussian measure; effectively randn() here    \nasmpl = evaluatePCE(a,ξ,opq)     # sample random variable with PCE coefficients a; effectively μ + σ*randn() here\n# or: asmpl = samplePCE(Nsmpl,a,opq)\nxmc = [ solve(ODEProblem((u,p,t)->aa*u,x0,(0,tend));saveat=0:Δt:tend).u for aa in asmpl]\nxmc = hcat(xmc...);Now we can compare the Monte Carlo mean and standard deviation to the expression from PCE for every time instant.[ mean(xmc,dims=2)-mean_pce std(xmc,dims=2)-std_pce]Clearly, the accuracy of PCE deteriorates over time. Possible remedies are to increase the dimension of PCE, and to tweak the tolerances of the integrator.Finally, we compare whether the samples follow a log-normal distribution, and compare the result to the analytic mean and standard deviation.logx_pce = [ log.(evaluatePCE(x[i],ξ,opq)) for i=1:length(t)]\n[mean.(logx_pce)-(log(x0) .+ μ*t) std.(logx_pce)-σ*t ]"
},

{
    "location": "math/#",
    "page": "Mathematical Background",
    "title": "Mathematical Background",
    "category": "page",
    "text": ""
},

{
    "location": "math/#Mathematical-Background-1",
    "page": "Mathematical Background",
    "title": "Mathematical Background",
    "category": "section",
    "text": "This section is heavily based on the book \"Orthogonal Polynomials: Computation and Approximation\" by Walter Gautschi (Oxford University Press)"
},

{
    "location": "math/#Orthogonal-Polynomials-1",
    "page": "Mathematical Background",
    "title": "Orthogonal Polynomials",
    "category": "section",
    "text": ""
},

{
    "location": "math/#Basic-Theory-1",
    "page": "Mathematical Background",
    "title": "Basic Theory",
    "category": "section",
    "text": "We always work with absolutely continuous measures for which we write mathrmd lambda (t) = w(t) mathrmdt, where the so-called weight function wis a nonnegative integrable function on the real line mathbbR, i.e. w mathcalW subseteq mathbbR rightarrow mathbbR_geq 0\nhas finite limits in case mathcalW = mathbbR, i.e.lim_t to pm infty w(t)  inftyhas finite moments of all ordersmu_r(mathrmdlambda = int_mathcalW t^r mathrmd lambda (t) quad r = 0 1 2 dots quad textwith mu_0  0For any pair of integrable functions u v, their scalar product relative to mathrmd lambda is defined aslangle u v rangle_mathrmd lambda = int_mathcalW u(t) v(t) mathrmd lambda(t)Let mathcalP be the set of real polynomials and mathcalP_d subset mathcalP be the set of real polynomials of degree at most d on mathcalW, respectively. Monic real polynomials are real polynomials with leading coefficient equal to one, i.e. pi_k(t) = t^k + dots for k = 0 1 dotsThe polynomials uv in mathcalP with u neq v are said to be orthogonal iflangle u v rangle_mathrmd lambda = int_mathcalW u(t) v(t) mathrmd lambda(t) = 0The norm of u is given by u _ mathrmdlambda = sqrtlangle u u rangleIf the polynomials u in mathcalP has unit length  u _ mathrmdlambda = 1, it is called orthonormal.Monic orthogonal polynomials are polynomials that are monic and orthogonal, hence satisfypi_k(t) = pi_k(t mathrmd lambda) = t^k + dots\nfor k = 0 1 dots, and\nlangle pi_k pi_l rangle_mathrmdlambda = 0\nfor k neq l and k l = 0 1 dots, and langle pi_k pi_k rangle_mathrmdlambda =  pi_k ^2_ mathrmdlambda  0 for k = 0 1 dots.note: Note\nThe support mathcalW of mathrmd lambda can be an interval (finite, half-finite, infinite), or a finite number of disjoint intervals. If the support consists of a finite or denumerably infinite number of distinct points t_k at which lambda has positive jumps w_k, the measure is called a discrete measure. For a finite number N of points, the discrete measure is denoted by mathrmdlambda_N, and it is characterized by its nodes and weights  t_k w_k _k=1^N according tomathrmd lambda_N (t) = sum_k=1^N w_k delta(t-t_k)where delta is the delta-function.The inner product associated with mathrmd lambda_N islangle u v rangle_mathrmdlambda_N = int_mathcalW u(t) v(t) mathrmd lambda_N (t) = sum_k=1^N w_k u(t_k) v(t_k)There exist only N orthogonal polynomials  pi_k(mathrmd lambda_N) _k=0^N-1 that are orthogonal relative to the discrete measure mathrmd lambda_N in the senselangle pi_k(mathrmd lambda_N) pi_l(mathrmd lambda_N) rangle_mathrmdlambda_N =  pi_k(mathrmd lambda_N) _mathrmd lambda_N delta_klwhere delta_kl is the Dirac-delta, for kl = 0 1 dots N-1."
},

{
    "location": "math/#Properties-1",
    "page": "Mathematical Background",
    "title": "Properties",
    "category": "section",
    "text": ""
},

{
    "location": "math/#Symmetry-1",
    "page": "Mathematical Background",
    "title": "Symmetry",
    "category": "section",
    "text": "An absolutely continuous measure mathrmd lambda(t) = w(t) mathrmd t is symmetric (with respect to the origin) if its support is mathcalW = -aa for some 0  a leq infty, and if w(-t) = w(t) for all t in mathcalW.Similarly, a discrete measure mathrmd lambda_N (t) = sum_k=1^N w_k delta(t-t_k) is symmetric if t_k = - t_N+1-k, and w_k = w_N+1-k for k=1 2 dots N.Theorem 1.17 states that: If mathrmd lambda is symmetric, thenpi_k(-t mathrmd lambda) = (-1)^k pi_k(t mathrmd lambda) quad k=01 dotshence the parity of k decides whether pi_k is even/odd.note: Note\nSymmetry is exploited in computeSP, where symmetry need not be relative to the origin, but some arbitrary point of the support."
},

{
    "location": "math/#Three-term-Recurrence-Relation-1",
    "page": "Mathematical Background",
    "title": "Three-term Recurrence Relation",
    "category": "section",
    "text": "The fact that orthogonal polynomials can be represented in terms of a three-term recurrence formula is at the heart of all numerical methods of the package. The importance of the three-term recurrence relation is difficult to overestimate. It providesefficient means of evaluating polynomials (and derivatives),\nzeros of orthogonal polynomials by means of a eigenvalues of a symmetric, tridiagonal matrix\nacces to quadrature rules,\nnormalization constants to create orthonormal polynomials.Theorem 1.27 states:Let pi_k(cdot) = pi_k(cdot mathrmdlambda) for k = 0 1 dots be the monic orthogonal polynomials with respect to the measure mathrmd lambda. Thenbeginaligned\npi_k+1(t) = (t - alpha_k) pi_k(t) - beta_k pi_k-1(t) quad k= 0 1 dots \npi_o(t) = 1 \npi_-1(t) = 0\nendalignedwherebeginaligned\nalpha = alpha_k(mathrmd lambda) = fraclangle t pi_k pi_k rangle_mathrmd lambdalangle pi_k pi_k rangle_mathrmd lambda  k=012 dots \nbeta = beta_k(mathrmd lambda) = fraclangle pi_k pi_k rangle_mathrmd lambdalangle pi_k-1 pi_k-1 rangle_mathrmd lambda  k=12dots\nendalignedLet tildepi_k(cdot) = tildepi_k(cdot mathrmd lambda t) denote the orthonormal polynomials, thenbeginaligned\nsqrtbeta_k+1 tildepi_k(t) = (t - alpha_k) tildepi_k(t) - sqrtbeta_k tildepi_k-1(t) quad k = 0 1 dots \ntildepi_0(t) = 1 \ntildepi_-1(t) = 0\nendalignednote: Note\nWithin the package, the coefficients (α,β) are the building block to represent (monic) orthogonal polynomials.Notice that beta_0 is arbitrary. Nevertheless, it is convenient to define it asbeta_0(mathrmdlambda) = langle pi_0 pi_0 rangle_mathrmd lambda = int_mathcalW mathrmd lambda (t)because it allows to compute the norms of the polynomials based on beta_k alone pi_n _mathrmd lambda = beta_n(mathrmd lambda) beta_n-1(mathrmd lambda) cdots beta_0(mathrmd lambda) quad n = 01 dotsLet the support be mathcalW = ab for 0  ab  infty, thenbeginaligned\n a  alpha_k(mathrmd lambda)  b  k = 012 dots \n 0  beta_k(mathrmd lambda)  max(a^2 b^2)  k = 1 2 dots\nendaligned"
},

{
    "location": "math/#Quadrature-Rules-1",
    "page": "Mathematical Background",
    "title": "Quadrature Rules",
    "category": "section",
    "text": "An n-point quadrature rule for the measure mathrmd lambda t is a formula of the formint_mathcalW f(t) mathrmd lambda(t) = sum_nu = 1^n w_nu f(tau_nu) + R_n(f)The quadrature rule  (tau_nu w_nu) _nu=1^n composed of (mutually distinct) nodes tau_nu and weights w_nu provides an approximation to the integral. The respective error is given by R_n(f). If, for polynomials p in mathcalP_d, the error R_n(p) vanishes, the respective quadrature rule is said to have a degree of exactness d. Gauss quadrature rule are special quadrature rules that have a degree of exactness d = 2n - 1. That means, taking a n =3-point quadrature rule, polynomials up to degree 5 can be integrated exactly. The nodes and weights for the Gauss quadrature rules have some remarkable properties:all Gauss nodes are mutually distinct and contained in the interior of the support of mathrmd lambda;\nthe n Gauss nodes are the zeros of pi_n, the monic orthogonal polynomial of degree n relative to the measure mathrmd lambda;\nall Gauss weights are positive.The Gauss nodes and weights can be computed using the Golub-Welsch algorithm. This means to solve an eigenvalue problem of a symmetric tridiagonal matrix."
},

{
    "location": "functions/#",
    "page": "Functions",
    "title": "Functions",
    "category": "page",
    "text": ""
},

{
    "location": "functions/#Functions-1",
    "page": "Functions",
    "title": "Functions",
    "category": "section",
    "text": "List of all functions in PolyChaos."
},

{
    "location": "functions/#PolyChaos.r_scale-Tuple{Float64,Array{Float64,1},Array{Float64,1}}",
    "page": "Functions",
    "title": "PolyChaos.r_scale",
    "category": "method",
    "text": "r_scale(c::Float64,β::Vector{Float64},α::Vector{Float64})\n\nGiven the recursion coefficients (α,β) for a system of orthogonal polynomials that are orthogonal with respect to some positive weight m(t), this function returns the recursion coefficients (α_,β_) for the scaled measure c m(t) for some positive c.\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.rm_compute-Tuple{Function,Float64,Float64}",
    "page": "Functions",
    "title": "PolyChaos.rm_compute",
    "category": "method",
    "text": "rm_compute(weight::Function,lb::Float64,ub::Float64;Npoly::Int64=4,Nquad::Int64=10,quadrature::Function=clenshaw_curtis)\n\nGiven a positive weight function with domain (lb,ub), i.e. a function w lb ub  rightarrow mathbbR_geq 0, this function creates Npoly recursion coefficients (α,β).\n\nThe keyword quadrature specifies what quadrature rule is being used.\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.rm_logistic-Tuple{Int64}",
    "page": "Functions",
    "title": "PolyChaos.rm_logistic",
    "category": "method",
    "text": "rm_logistic(N::Int)\n\nCreates N recurrence coefficients for monic polynomials that are orthogonal on (-inftyinfty) relative to w(t) = fracmathrme^-t(1 - mathrme^-t)^2\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.rm_hermite-Tuple{Int64,Float64}",
    "page": "Functions",
    "title": "PolyChaos.rm_hermite",
    "category": "method",
    "text": "rm_hermite(N::Int,mu::Float64)\nrm_hermite(N::Int)\n\nCreates N recurrence coefficients for monic generalized Hermite polynomials that are orthogonal on (-inftyinfty) relative to w(t) = t^2 mu mathrme^-t^2\n\nThe call rm_hermite(N) is the same as rm_hermite(N,0).\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.rm_hermite_prob-Tuple{Int64}",
    "page": "Functions",
    "title": "PolyChaos.rm_hermite_prob",
    "category": "method",
    "text": "rm_hermite_prob(N::Int)\n\nCreates N recurrence coefficients for monic probabilists\' Hermite polynomials that are orthogonal on (-inftyinfty) relative to w(t) = frac1sqrt2 pi mathrme^-t^2\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.rm_laguerre-Tuple{Int64,Float64}",
    "page": "Functions",
    "title": "PolyChaos.rm_laguerre",
    "category": "method",
    "text": "rm_laguerre(N::Int,a::Float64)\nrm_laguerre(N::Int)\n\nCreates N recurrence coefficients for monic generalized Laguerre polynomials that are orthogonal on (0infty) relative to w(t) = t^a mathrme^-t.\n\nThe call rm_laguerre(N) is the same as rm_laguerre(N,0).\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.rm_legendre-Tuple{Int64}",
    "page": "Functions",
    "title": "PolyChaos.rm_legendre",
    "category": "method",
    "text": "rm_legendre(N::Int)\n\nCreates N recurrence coefficients for monic Legendre polynomials that are orthogonal on (-11) relative to w(t) = 1.\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.rm_legendre01-Tuple{Int64}",
    "page": "Functions",
    "title": "PolyChaos.rm_legendre01",
    "category": "method",
    "text": "rm_legendre01(N::Int)\n\nCreates N recurrence coefficients for monic Legendre polynomials that are orthogonal on (01) relative to w(t) = 1.\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.rm_jacobi-Tuple{Int64,Float64,Float64}",
    "page": "Functions",
    "title": "PolyChaos.rm_jacobi",
    "category": "method",
    "text": "rm_jacobi(N::Int,a::Float64,b::Float64)\nrm_jacobi(N::Int,a::Float64)\nrm_jacobi(N::Int)\n\nCreates N recurrence coefficients for monic Jacobi polynomials that are orthogonal on (-11) relative to w(t) = (1-t)^a (1+t)^b.\n\nThe call rm_jacobi(N,a) is the same as rm_jacobi(N,a,a) and rm_jacobi(N) the same as rm_jacobi(N,0,0).\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.rm_jacobi01-Tuple{Int64,Float64,Float64}",
    "page": "Functions",
    "title": "PolyChaos.rm_jacobi01",
    "category": "method",
    "text": "rm_jacobi01(N::Int,a::Float64,b::Float64)\nrm_jacobi01(N::Int,a::Float64)\nrm_jacobi01(N::Int)\n\nCreates N recurrence coefficients for monic Jacobi polynomials that are orthogonal on (01) relative to w(t) = (1-t)^a t^b.\n\nThe call rm_jacobi01(N,a) is the same as rm_jacobi01(N,a,a) and rm_jacobi01(N) the same as rm_jacobi01(N,0,0).\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.rm_meixner_pollaczek-Tuple{Int64,Float64,Float64}",
    "page": "Functions",
    "title": "PolyChaos.rm_meixner_pollaczek",
    "category": "method",
    "text": "rm_meixner_pollaczek(N::Int,lambda::Float64,phi::Float64)\nrm_meixner_pollaczek(N::Int,lambda::Float64)\n\nCreates N recurrence coefficients for monic  Meixner-Pollaczek polynomials with parameters λ and ϕ. These are orthogonal on  -inftyinfty relative to the weight function w(t)=(2 pi)^-1 exp(2 phi-pi)t Gamma(lambda+ i t)^2.\n\nThe call rm_meixner_pollaczek(n,lambda) is the same as rm_meixner_pollaczek(n,lambda,pi/2).\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.stieltjes",
    "page": "Functions",
    "title": "PolyChaos.stieltjes",
    "category": "function",
    "text": "stieltjes(N::Int64,nodes::Vector{Float64},weights::Vector{Float64})\n\nDescription based on W. Gautschi OPQ: A MATLAB SUITE OF PROGRAMS FOR GENERATING ORTHOGONAL POLYNOMIALS AND RELATED QUADRATURE RULES Given the discrete inner product (with nodes and weights) the function generates the firstN recurrence coefficients of the corresponding discrete orthogonal polynomials.\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.lanczos",
    "page": "Functions",
    "title": "PolyChaos.lanczos",
    "category": "function",
    "text": "lanczos(N::Int64,nodes::Vector{Float64},weights::Vector{Float64}) Description based on W. Gautschi OPQ: A MATLAB SUITE OF PROGRAMS FOR GENERATING ORTHOGONAL POLYNOMIALS AND RELATED QUADRATURE RULES\n\nGiven the discrete inner product (with nodes and weights) the function generates the first N recurrence coefficients of the corresponding discrete orthogonal polynomials.\n\nThe script is adapted from the routine RKPW in W.B. Gragg and W.J. Harrod, ``The numerically stable reconstruction of Jacobi matrices from spectral data\'\', Numer. Math. 44 (1984), 317-335.\n\n\n\n\n\n"
},

{
    "location": "functions/#Recurrence-Coefficients-for-Monic-Orthogonal-Polynomials-1",
    "page": "Functions",
    "title": "Recurrence Coefficients for Monic Orthogonal Polynomials",
    "category": "section",
    "text": "The functions below provide analytic expressions for the recurrence coefficients of common orthogonal polynomials. All of these provide monic orthogonal polynomials relative to the weights.note: Note\nThe number N of recurrence coefficients has to be positive for all functions below.r_scale(c::Float64,a::Vector{Float64},b::Vector{Float64})\nrm_compute(weight::Function,lb::Float64,ub::Float64;Npoly::Int64=4,Nquad::Int64=10,quadrature::Function=clenshaw_curtis)\nrm_logistic(N::Int)\nrm_hermite(N::Int,mu::Float64)\nrm_hermite_prob(N::Int)\nrm_laguerre(N::Int,a::Float64)\nrm_legendre(N::Int)\nrm_legendre01(N::Int)\nrm_jacobi(N::Int,a::Float64,b::Float64)\nrm_jacobi01(N::Int,a::Float64,b::Float64)\nrm_meixner_pollaczek(N::Int,lambda::Float64,phi::Float64)\nstieltjes\nlanczos"
},

{
    "location": "functions/#PolyChaos.computeSP2",
    "page": "Functions",
    "title": "PolyChaos.computeSP2",
    "category": "function",
    "text": "computeSP2(n::Int64,β::Vector{Float64})\ncomputeSP2(n::Int64,op::OrthoPoly) = computeSP2(n,op.β)\ncomputeSP2(op::OrthoPoly) = computeSP2(op.deg,op.β)\ncomputeSP2(opq::OrthoPolyQ) = computeSP2(opq.op)\n\nComputes the n regular scalar products aka 2-norms of the orthogonal polynomials, namely\n\nϕ_i^2 = langle phi_iphi_irangle quad forall i in  0dotsn \n\nNotice that only the values of β of the recurrence coefficients (α,β) are required. The computation is based on equation (1.3.7) from Gautschi, W. \"Orthogonal Polynomials: Computation and Approximation\". Whenever there exists an analytic expressions for β, this function should be used.\n\nThe function is multiply dispatched to facilitate its use with the composite types OrthoPoly and OrthoPolyQ.\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.computeSP",
    "page": "Functions",
    "title": "PolyChaos.computeSP",
    "category": "function",
    "text": "Univariate\n\ncomputeSP(a::Vector{Int64},α::Vector{Float64},β::Vector{Float64},nodes::Vector{Float64},weights::Vector{Float64};issymmetric::Bool=false)\ncomputeSP(a::Vector{Int64},op::OrthoPoly,q::Quad;issymmetric=issymmetric(op))\ncomputeSP(a::Vector{Int64},opq::OrthoPolyQ)\n\nMultivariate\n\ncomputeSP( a::Vector{Int64},\n           α::Vector{Vector{Float64}},β::Vector{Vector{Float64}},\n           nodes::Vector{Vector{Float64}},weights::Vector{Vector{Float64}},\n           ind::Matrix{Int64};\n           issymmetric::BitArray=falses(length(α)))\ncomputeSP(a::Vector{Int64},op::Vector{OrthoPoly},q::Vector{Quad},ind::Matrix{Int64})\ncomputeSP(a::Vector{Int64},mOP::MultiOrthoPoly)\n\nComputes the scalar product\n\nlangle phi_a_1phi_a_2cdotsphi_a_n rangle\n\nwhere n = length(a). This requires to provide the recurrence coefficients (α,β) and the quadrature rule (nodes,weights), as well as the multi-index ind. If provided via the keyword issymmetric, symmetry of the weight function is exploited. All computations of the multivariate scalar products resort back to efficient computations of the univariate scalar products. Mathematically, this follows from Fubini\'s theorem.\n\nThe function is multiply dispatched to facilitate its use with OrthoPolyQ or a suitable combination of OrthoPoly and its quadrature rule Quad.\n\nnote: Note\nZero entries of a are removed automatically to simplify computations, which follows fromlangle phi_i phi_j phi_0cdotsphi_0 rangle = langle phi_i phi_j ranglebecause \\phi_0 = 1.It is checked whether enough quadrature points are supplied to solve the integral exactly.\n\n\n\n\n\n"
},

{
    "location": "functions/#Scalar-Products-1",
    "page": "Functions",
    "title": "Scalar Products",
    "category": "section",
    "text": "computeSP2\ncomputeSP"
},

{
    "location": "functions/#PolyChaos.evaluate",
    "page": "Functions",
    "title": "PolyChaos.evaluate",
    "category": "function",
    "text": "Univariate\n\nevaluate(n::Int64,x::Array{Float64},a::Vector{Float64},b::Vector{Float64})\nevaluate(n::Int64,x::Float64,a::Vector{Float64},b::Vector{Float64})\nevaluate(n::Int64,x::Vector{Float64},op::OrthoPoly)\nevaluate(n::Int64,x::Float64,op::OrthoPoly)\n\nEvaluate the n-th univariate basis polynomial at point(s) x The function is multiply dispatched to facilitate its use with the composite type OrthoPoly\n\nnote: Note\nn is the degree of the univariate basis polynomial\nlength(x) = N, where N is the number of points\n(a,b) are the recursion coefficients\n\nMultivariate\n\nevaluate(n::Vector{Int64},x::Matrix{Float64},a::Vector{Vector{Float64}},b::Vector{Vector{Float64}})\nevaluate(n::Vector{Int64},x::Vector{Float64},a::Vector{Vector{Float64}},b::Vector{Vector{Float64}})\nevaluate(n::Vector{Int64},x::Matrix{Float64},op::MultiOrthoPoly)\nevaluate(n::Vector{Int64},x::Vector{Float64},op::MultiOrthoPoly)\n\nEvaluate the n-th p-variate basis polynomial at point(s) x The function is multiply dispatched to facilitate its use with the composite type MultiOrthoPoly\n\nnote: Note\n`n is a multi-index\nlength(n) == p, i.e. a p-variate basis polynomial\nsize(x) = (N,p), where N is the number of points\nsize(a)==size(b)=p.\n\n\n\n\n\n"
},

{
    "location": "functions/#Evaluating-Orthogonal-Polynomials-1",
    "page": "Functions",
    "title": "Evaluating Orthogonal Polynomials",
    "category": "section",
    "text": "evaluate"
},

{
    "location": "functions/#PolyChaos.fejer",
    "page": "Functions",
    "title": "PolyChaos.fejer",
    "category": "function",
    "text": "fejer(N::Int64)\n\nFejer\'s first quadrature rule.\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.fejer2",
    "page": "Functions",
    "title": "PolyChaos.fejer2",
    "category": "function",
    "text": "fejer2(n::Int64)\n\nFejer\'s second quadrature rule according to Waldvogel, J. Bit Numer Math (2006) 46: 195.\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.clenshaw_curtis",
    "page": "Functions",
    "title": "PolyChaos.clenshaw_curtis",
    "category": "function",
    "text": "clenshaw_curtis(n::Int64)\n\nClenshaw-Curtis quadrature according to Waldvogel, J. Bit Numer Math (2006) 46: 195.\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.quadpts_beta01",
    "page": "Functions",
    "title": "PolyChaos.quadpts_beta01",
    "category": "function",
    "text": "quadpts_beta01(α::Float64,β::Float64,Nquad::Int64)\n\nget quadrature points for beta distribution on (01)` using Gauss-Jacobi quadrature\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.quadpts_gamma",
    "page": "Functions",
    "title": "PolyChaos.quadpts_gamma",
    "category": "function",
    "text": "quadpts_gamma(α::Float64,Nquad::Int)\n\nget quadrature points for gamma distribution on (0infty) using Gauss-Laguerre quadrature\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.quadpts_gaussian",
    "page": "Functions",
    "title": "PolyChaos.quadpts_gaussian",
    "category": "function",
    "text": "quadpts_gaussian(Nquad::Int)\n\nget quadrature points for normal distribution on (-inftyinfty) using Gauss-Hermite quadrature\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.quadpts_logistic",
    "page": "Functions",
    "title": "PolyChaos.quadpts_logistic",
    "category": "function",
    "text": "quadpts_logistic(N::Int64)\n\nget quadrature points for logistic weight function on (-inftyinfty)\n\n\n\n\n\nQuadrature rule for weight function\n    w(t) = c3*c2*exp(-c2*(t-c1))/(exp(-c2*(t-c1)))^2\n\nThe default value for c3 is one, c3=1, and\n    w(t) = c2*exp(-c2*(t-c1))/(1+exp(-c2*(t-c1)))^2.\nIn that case w(t) is the probability density function of\n    Y = 1/c2*X + c1, with c2>0\nwhere X has the standard logistic density\n    ρ(t) = exp(-x)/(1+exp(-x))^2\n\nA value c3!=1 is needed, for example, when constructing sums of logistic densities.\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.quadpts_uniform01",
    "page": "Functions",
    "title": "PolyChaos.quadpts_uniform01",
    "category": "function",
    "text": "quadpts_uniform01(Nquad::Int)\n\nget quadrature points for uniform distribution on 01 using Gauss-Legendre quadrature\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.quadgp",
    "page": "Functions",
    "title": "PolyChaos.quadgp",
    "category": "function",
    "text": "quadgp(weight::Function,a::Float64,b::Float64,N::Int64=10;quadrature::Function=clenshaw_curti\n\ngeneral purpose quadrature based on Gautschi, \"Orthogonal Polynomials: Computation and Approximation\", Section 2.2.2, pp. 93-95\n\n\n\n\n\n"
},

{
    "location": "functions/#Quadrature-Rules-1",
    "page": "Functions",
    "title": "Quadrature Rules",
    "category": "section",
    "text": "fejer\nfejer2\nclenshaw_curtis\nquadpts_beta01\nquadpts_gamma\nquadpts_gaussian\nquadpts_logistic\nquadpts_uniform01\nquadgp"
},

{
    "location": "functions/#Statistics.mean",
    "page": "Functions",
    "title": "Statistics.mean",
    "category": "function",
    "text": "Univariate\n\nmean(x::Vector{Float64},op::OrthoPoly)\nmean(x::Vector{Float64},opq::OrthoPolyQ)\n\nMultivariate\n\nmean(x::Vector{Float64},mop::MultiOrthoPoly)\n\ncompute mean of random variable with PCE x\n\n\n\n\n\n"
},

{
    "location": "functions/#Statistics.var",
    "page": "Functions",
    "title": "Statistics.var",
    "category": "function",
    "text": "Univariate\n\nvar(x::Vector{Float64},op::OrthoPoly)\nvar(x::Vector{Float64},opq::OrthoPolyQ)\n\nMultivariate\n\nvar(x::Vector{Float64},mop::MultiOrthoPoly)\n\ncompute variance of random variable with PCE x\n\n\n\n\n\n"
},

{
    "location": "functions/#Statistics.std",
    "page": "Functions",
    "title": "Statistics.std",
    "category": "function",
    "text": "Univariate\n\nstd(x::Vector{Float64},op::OrthoPoly)\nstd(x::Vector{Float64},opq::OrthoPolyQ)\n\nMultivariate\n\nstd(x::Vector{Float64},mop::MultiOrthoPoly)\n\ncompute standard deviation of random variable with PCE x\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.sampleMeasure",
    "page": "Functions",
    "title": "PolyChaos.sampleMeasure",
    "category": "function",
    "text": "Univariate\n\nsampleMeasure(n::Int64,name::String,w::Function,dom::Tuple{Float64,Float64},symm::Bool,d::Dict;method::String=\"adaptiverejection\")\nsampleMeasure(n::Int64,m::Measure;method::String=\"adaptiverejection\")\nsampleMeasure(n::Int64,op::OrthoPoly;method::String=\"adaptiverejection\")\nsampleMeasure(n::Int64,opq::OrthoPolyQ;method::String=\"adaptiverejection\")\n\nDraw n samples from the measure m described by its\n\nname\nweight function w,\ndomain dom,\nsymmetry property symm,\nand, if applicable, parameters stored in the dictionary d.\n\nBy default an adaptive rejection sampling method is used (from AdaptiveRejectionSampling.jl), unless it is a common random variable for which Distributions.jl is used.\n\nThe function is multiply dispatched to accept OrthoPoly or OrthoPolyQ.\n\nMultivariate\n\nsampleMeasure(n::Int64,m::MultiMeasure;method::Vector{String}=[\"adaptiverejection\" for i=1:length(m.name)])\nsampleMeasure(n::Int64,mop::MultiOrthoPoly;method::Vector{String}=[\"adaptiverejection\" for i=1:length(mop.meas.name)])\n\nMultivariate extension which provides array of samples with n rows and as many columns as the multimeasure has univariate measures.\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.evaluatePCE",
    "page": "Functions",
    "title": "PolyChaos.evaluatePCE",
    "category": "function",
    "text": "evaluatePCE(x::Vector{Float64},ξ::Vector{Float64},α::Vector{Float64},β::Vector{Float64})\n\nEvaluation of polynomial chaos expansion\n\nmathsfx = sum_i=0^L x_i phi_ixi_j\n\nwhere L+1 = length(x) and x_j is the jth sample where j=1dotsm with m = length(ξ).\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.samplePCE",
    "page": "Functions",
    "title": "PolyChaos.samplePCE",
    "category": "function",
    "text": "Univariate\n\nsamplePCE(n::Int64,x::Vector{Float64},op::OrthoPoly;method::String=\"adaptiverejection\")\nsamplePCE(n::Int64,x::Vector{Float64},opq::OrthoPolyQ;method::String=\"adaptiverejection\")\n\nCombines sampleMeasure and evaluatePCE, i.e. it first draws n samples from the measure, then evaluates the PCE for those samples.\n\nMultivariate\n\nsamplePCE(n::Int64,x::Vector{Float64},mop::MultiOrthoPoly;method::Vector{String}=[\"adaptiverejection\" for i=1:length(mop.meas.name)])\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.calculateAffinePCE",
    "page": "Functions",
    "title": "PolyChaos.calculateAffinePCE",
    "category": "function",
    "text": "calculateAffinePCE(α::Vector{Float64})::Vector{Float64}\n\nComputes the affine PCE coefficients x_0 and x_1 from recurrence coefficients lpha.\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.convert2affinePCE",
    "page": "Functions",
    "title": "PolyChaos.convert2affinePCE",
    "category": "function",
    "text": "convert2affinePCE(a::Vector{Float64},α0::Float64)\nconvert2affinePCE(name::String,p1::Float64,p2::Float64,d::Dict=Dict();kind::Symbol=:lbub)\n\nComputes the affine PCE coefficients x_0 and x_1 from\n\nX = a_1 + a_2 Xi = x_0 + x_1 phi_1(Xi)\n\nwhere phi_1(t) = t-alpha_0 is the first-order monic basis polynomial.\n\nFor classical polynomials the name can be given directly. The keyword kind in [:lbub, :μσ] specifies whether p1 and p2 have the meaning of lower/upper bounds or mean/standard deviation.\n\n\n\n\n\n"
},

{
    "location": "functions/#Polynomial-Chaos-1",
    "page": "Functions",
    "title": "Polynomial Chaos",
    "category": "section",
    "text": "mean\nvar\nstd\nsampleMeasure\nevaluatePCE\nsamplePCE\ncalculateAffinePCE\nconvert2affinePCE"
},

{
    "location": "functions/#PolyChaos.nw",
    "page": "Functions",
    "title": "PolyChaos.nw",
    "category": "function",
    "text": "nw(q::Quad)\nnw(opq::OrthoPolyQ)\nnw(opq::Vector{OrthoPolyQ})\nnw(mOP::MultiOrthoPoly)\n\nreturns nodes and weights in matrix form\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.coeffs",
    "page": "Functions",
    "title": "PolyChaos.coeffs",
    "category": "function",
    "text": "coeffs(op::OrthoPoly)\ncoeffs(opq::OrthoPolyQ)\ncoeffs(op::Vector{OrthoPoly})\ncoeffs(opq::Vector{OrthoPolyQ})\ncoeffs(mop::MultiOrthoPoly)\n\nreturns recurrence coefficients of in matrix form\n\n\n\n\n\n"
},

{
    "location": "functions/#PolyChaos.integrate",
    "page": "Functions",
    "title": "PolyChaos.integrate",
    "category": "function",
    "text": "integrate(f::Function,nodes::Vector{Float64},weights::Vector{Float64})\nintegrate(f::Function,q::Quad)\nintegrate(f::Function,opq::OrthogonalPolyQ)\n\nintegrate function f using quadrature rule specified via nodes, weights\n\nnote: Note\n\n\nfunction f is assumed to return a scalar\ninterval of integration is \"hidden\" in nodes\n\n\n\n\n\n"
},

{
    "location": "functions/#LinearAlgebra.issymmetric",
    "page": "Functions",
    "title": "LinearAlgebra.issymmetric",
    "category": "function",
    "text": "issymmetric(m::Measure)::Bool\nissymmetric(op::OrthoPoly)::Bool\nissymmetric(q::Quad)::Bool\nissymmetric(opq::OrthoPolyQ)::Bool\n\nis measure symmetric (around any point in the domain)?\n\n\n\n\n\n"
},

{
    "location": "functions/#Auxiliary-Functions-1",
    "page": "Functions",
    "title": "Auxiliary Functions",
    "category": "section",
    "text": "nw\ncoeffs\nintegrate\nissymmetric"
},

]}