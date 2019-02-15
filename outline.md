# Data

# Substitution Model

Datatype (Dropdown)

- Nucleotide
	- "Q Matrix" (Dropdown)
		- Jukes-Cantor
		- F81
		- K80
		- HKY
		- GTR
	- "Site Rates Model" (Checkboxes)
		- +I (Proportion of invariant sites)
			- Fixed => Enter `pinv` value between 0 and 1
				
				```pinv <- <value>```
			
			- Estimate
				- Beta prior distribution => enter `alpha`, `beta` values > 0 (default = 1,1)
					
						```
						alpha <- <value>
						beta <- <value>
						pinv ~ dnBeta(alpha,beta)
						moves.append(mvBetaSimplex(pinv))
						```
						
		- +G (Gamma distributed rates across sites)
			- number of discrete rate categories `k` (default = 4)
			- shape parameter `shape`
				- Fixed => enter `shape` value > 0
				
					```shape <- <value>```
					
				- Estimate
					- Prior distribution
						- Exponential => enter `lambda` rate parameter > 0
						
							```
							lambda <- <value>
							shape ~ dnExp(lambda)
							moves.append(mvScale(shape))
							```
							
- Amino Acid

# Tree Model

# MCMC