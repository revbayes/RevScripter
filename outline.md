# Data

# Substitution Model

Datatype (Dropdown)

- Nucleotide
	- Q Matrix (Dropdown)
		- Jukes-Cantor
		- F81
		- K80
		- HKY
		- GTR
	- Site Model (Checkboxes)
		- +I
			- Fixed -> Enter value
				- ```pinv <- <value>```
			- Estimate
				- Beta prior
					- Alpha, Beta -> enter values (default = 1)
					- 
```
pinv ~ dnBeta(1,1)
moves.append(mvBetaSimplex(pinv))
```
		- +G
- Amino Acid

# Tree Model

# MCMC