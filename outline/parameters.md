The user can choose to either fix or estimate each parameter, which is usually one of the following types. In the following substitute `<parameter>` for the parameter name.

# RealPos

Continuous value greater than 0.

- Fixed => Enter a value > 0 for the `<parameter>`
			
		<parameter> <- <value>
			
- Estimate
	- Choose prior distribution:
		- Exponential distribution => shape parameter > 0 (default: `shape = 1`)
		
				<parameter> ~ dnExponential(<shape>)
				moves.append(mvScale(<parameter>))
		- Gamma distribution => shape and rate parameters > 0 (default: `shape = 1`,`rate = 1`)
		
				<parameter> ~ dnGamma(<shape>,<rate>)
				moves.append(mvScale(<parameter>))
		- Lognormal distribution => Enter mean and standard deviation parameters > 0 (default: `mean = 1`,`sd = 1`)
		
				<parameter> ~ dnLognormal(mean=<mean>,sd=<sd>)
				moves.append(mvScale(<parameter>))
		- Uniform distribution => Enter min and max parameters > 0 (default: `min = 0`,`max = 100`)
		
				<parameter> ~ dnUniform(<min>,<max>)
				moves.append(mvScale(<parameter>))
						
# Vector of RealPos

Vector of `<n>` RealPos parameters, each with same prior distribution
 
- fixed
	- enter fixed `<value>` to be applied to each vector element
		
			for(i in <n>){
				<parameter>[i] <- <value>
			}
- estimate
	- Choose prior distribution
			- (same options as RealPos), replace `<prior>` with chosen distribution
			
					for(i in <n>){
						<parameter>[i] ~ <prior>
						moves.append(mvScale(<parameter>[i])
					}
	- then for each parameter choose:
		- fixed
			- enter fixed `<value>` for the hyperparameter
				
					<hyperparameter> <- <value>
				
		- estimated
			- Choose hyperprior distributions for parameters of prior distribution 
			- (same options as RealPos), replace `<hyperprior>` with chosen distribution
			
					<hyperparameter> ~ <hyperprior>
					moves.append(mvScale(<hyperparameter>)
					...
						
	- 
		
			for(i in <n>){
				<parameter>[i] ~ <prior>(<hyperparameter>,...)
				moves.append(mvScale(<parameter>[i])
			}		

# Probability

Continuous value between 0 and 1.

- Fixed => Enter a value between 0 and 1 for the `<parameter>`
			
		<parameter> <- <value>
			
- Estimate
				- Beta prior distribution => Enter `alpha` and `beta` parameters > 0 (defaults: `alpha = 1`, `beta = 1`)
		
		<parameter> ~ dnBeta(<alpha>,<beta>)
		moves.append(mvBetaSimplex(<parameter>))

# Simplex

Vector of length `n` with contious values that sum to 1.

- Fixed => Enter `n` values for the `<parameter>` simplex vector (default = (1/n,...))
			
		<parameter> <- v(<value>,...)
			
- Estimate
				- Dirichlet prior distribution => Enter concentration parameters > 0 (default = (1,1,1,1))
		
		<parameter> ~ dnDirichlet(v(<value>, <value>, <value>, <value>))
		moves.append(mvBetaSimplex(<parameter>))
		moves.append(mvDirichletSimplex(<parameter>))