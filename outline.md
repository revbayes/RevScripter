# Data

### Datatype (Dropdown)

- Data file name 
    - enter path to file name `data_file_name `
			
					data = readDiscreteCharacterData(file=data_file_name)

- Nucleotide
		
		num_char_states <- 4

- Amino Acid

		num_char_states <- 20

# Substitution Model
		
### Q Matrix

#### (Nucleotide)

- Model (dropdown)
	- Jukes-Cantor
		
			Q <- fnJC(num_char_states)
		
	- F81
		- Base frequencies
			- Fixed => Enter `pi` simplex vector values (default = (1/4,1/4,1/4,1/4))
			
					pi <- v(<value>, <value>, <value>, <value>)
			
			- Estimate
				- Dirichlet prior distribution => Enter concentration parameters > 0 (default = (1,1,1,1))
		
						pi ~ dnDirichlet(v(<value>, <value>, <value>, <value>))
						moves.append(mvBetaSimplex(pi))
						moves.append(mvDirichletSimplex(pi))
						
		```
		Q := fnF81(pi)
		```
						
	- K80
		- Transition/transversion ratio
			- Fixed => Enter `kappa` value > 0 (default = 1)
			
					kappa <- <value>
			
			- Estimate
				- Prior distribution
					- Exponential => enter `lambda_kappa` rate parameter > 0
					
							lambda_kappa <- <value>
							kappa ~ dnExp(lambda_kappa)
							moves.append(mvScale(kappa))
							
					- Other priors?
						
		```
		Q := fnK80(kappa)
		```
	
	- HKY
		- Transition/transversion ratio
			- Fixed => Enter `kappa` value > 0 (default = 1)
			
					kappa <- <value>
			
			- Estimate
				- Prior distribution
					- Exponential => enter `lambda_kappa` rate parameter > 0
					
							lambda_kappa <- <value>
							kappa ~ dnExp(lambda_kappa)
							moves.append(mvScale(kappa))
							
					- Other priors?
		- Base frequencies
			- Fixed => Enter `pi` simplex vector values (default = (1/4,1/4,1/4,1/4))
			
					pi <- v(<value>, <value>, <value>, <value>)
			
			- Estimate
				- Dirichlet prior distribution => Enter concentration parameters > 0 (default = (1,1,1,1))
		
						pi ~ dnDirichlet(v(<value>, <value>, <value>, <value>))
						moves.append(mvBetaSimplex(pi))
						moves.append(mvDirichletSimplex(pi))
						
		```
		Q := fnHKY(kappa,pi)
		```
		
	- GTR
		- Exchangeabilities
			- Fixed => Enter `er` simplex vector values (default = (1,1,1,1,1,1))
			
					er <- v(<value>, <value>, <value>, <value>, <value>, <value>)
			
			- Estimate
				- Dirichlet prior distribution => Enter concentration parameters > 0 (default = (1,1,1,1,1,1))
		
						er ~ dnDirichlet(v(<value>, <value>, <value>, <value>, <value>, <value>))
						moves.append(mvBetaSimplex(er))
						moves.append(mvDirichletSimplex(er))
						
		- Base frequencies
			- Fixed => Enter `pi` simplex vector values (default = (1/4,1/4,1/4,1/4))
			
					pi <- v(<value>, <value>, <value>, <value>)
			
			- Estimate
				- Dirichlet prior distribution => Enter concentration parameters > 0 (default = (1,1,1,1))
		
						pi ~ dnDirichlet(v(<value>, <value>, <value>, <value>))
						moves.append(mvBetaSimplex(pi))
						moves.append(mvDirichletSimplex(pi))
						
		```
		Q := fnGTR(er,pi)
		```
	
#### (Amino acid)
				
- Matrix type (radio button)
	- Empirical
		- Base frequencies (radio button)
			- Empirical
			- Estimated
				- Dirichlet prior distribution => Enter concentration parameter > 0 (default = 1)
			
						pi ~ dnDirichlet(rep(<value>,20))
						moves.append(mvBetaSimplex(pi))
						moves.append(mvDirichletSimplex(pi))
						
		- Model (dropdown)
			- WAG
				
				(Empirical base freqs)
				
					Q <- fnWAG()
				
				(Estimated base freqs)
				
					Q <- fnWAG(pi)
					
			- LG
			
				(Empirical base freqs)
				
					Q <- fnLG()
				
				(Estimated base freqs)
				
					Q <- fnLG(pi)
					
			- etc.
			
	- Estimated
		- Model (dropdown)
			- Poisson
			- GTR
		
### Site Rates Model (Checkboxes)

- +I (Proportion of invariant sites)
	- Fixed => Enter `pinv` value between 0 and 1
		
			pinv <- <value>
	
	- Estimate
		- Beta prior distribution => enter `alpha`, `beta` values > 0 (default = 1,1)
			
				alpha <- <value>
				beta <- <value>
				pinv ~ dnBeta(alpha,beta)
				moves.append(mvBetaSimplex(pinv))
				
- +G (Gamma distributed rates across sites)
	- number of discrete rate categories `k` > 0 (default = 4)
	
			k <- <value>
			
	- shape parameter `shape`
		- Fixed => enter `shape` value > 0
		
				shape <- <value>
			
		- Estimate
			- Prior distribution
				- Exponential => enter `lambda_shape` rate parameter > 0
				
						lambda_shape <- <value>
						shape ~ dnExp(lambda_shape)
						moves.append(mvScale(shape))
						
				- Other priors?
				
	```
	site_rates := fnDiscretizeGamma(shape, shape, k)
	```


# Tree Model

- Topology
	- Unrooted
		- Fixed
    		- fix topology only?
        		- File name => enter `tree_file`
				
						input_tree = readTrees(tree_file, treetype="non-clock")[1]
						topology <- input_tree
        		              		      
    		- fix topology and branch lengths?
        		- File name => enter `tree_file`
				
						input_tree = readTrees(tree_file, treetype="non-clock")[1]
						psi <- input_tree
        		              		      
		- Estimate	
    		- Choose prior distribution
    			- Uniform Topology
        			- Outgroup => Enter outgroup name(s) [strings separated by commas] 
				
    						out_group = clade(<entered names>)
    						topology ~ dnUniformTopology(taxa, outgroup=out_group)
    						moves.append( mvNNI(topology, weight=num_taxa/2.0) )
    						moves.append( mvSPR(topology, weight=num_taxa/10.0) )

					- No outgroup 
				
    						topology ~ dnUniformTopology(taxa)
    						moves.append( mvNNI(topology, weight=num_taxa/2.0) )
    						moves.append( mvSPR(topology, weight=num_taxa/10.0) )
			
    			- others?
   		- Branch Length Model
    		- fixed (only available for fixed topolopy)
    		- estimate
    			- prior distribution on iid branch lengths
        			- Exponential => enter the rate parameter `<value>` (must be > 0)
				
								for(i in num_branches){
		    						br_len[i] ~ dnExp(<value>)
		    						moves.append(mvScale(br_len[i])
								}
								tree_length := sum(br_len)
	- Rooted
		- Fixed
    		- fix topology only?
        		- File name => enter `tree_file`
				
						input_tree = readTrees(tree_file, treetype="clock")[1]
						topology <- input_tree
        		              		      
    		- fix topology and branch lengths?
        		- File name => enter `tree_file`
				
						input_tree = readTrees(tree_file, treetype="clock")[1]
						psi <- input_tree
		
		- Estimated
    		- Condition on:
        		- Root age
            		- Fix, enter value
            		
                            root_age <- <value>
            		
            		- Estimate, choose prior distribution
                		- Uniform, enter min and max age, with the following rules: (1) min < max, (2) min >= 0
                		
                        		root_age ~ dnUniform(<min>, <max>)
                		
                		- Exponential, enter 2 values: (1) rate, (2) offset
                		
                        		root_age ~ dnExp(<rate>, <offset>)
                		
                		- Gamma, enter 3 values: (1) alpha, (2) beta, (3) offset
                		
                        		root_age ~ dnGamma(<alpha>, <beta>, <offset>)
                		

                		- Lognormal, enter 3 values (1) expected value (mean), (2) sd, (3) offset
                		
                        		root_mean_age <- <mean>
                        		root_stdev_age <- <sd>
                        		root_LN_mu <- ln(root_mean_age) - ((root_stdev_age* root_stdev_age) * 0.5)
                        		root_age ~ dnLognormal(root_LN_mu, root_stdev_age, <offset>)
                		
        		- Origin time
            		- Fix, enter value
            		
                            root_age <- <value>
                            
            		- Estimate, choose prior distribution
                		- Uniform, enter min and max age, with the following rules: (1) min < max, (2) min >= 0
                		
                        		root_age ~ dnUniform(<min>, <max>)
                		
                		- Exponential, enter 2 values: (1) rate, (2) offset
                		
                        		root_age ~ dnExp(<rate>, <offset>)
                		
                		- Gamma, enter 3 values: (1) alpha, (2) beta, (3) offset
                		
                        		root_age ~ dnGamma(<alpha>, <beta>, <offset>)
                		

                		- Lognormal, enter 3 values (1) expected value (mean), (2) sd, (3) offset
                		
                        		root_mean_age <- <mean>
                        		root_stdev_age <- <sd>
                        		root_LN_mu <- ln(root_mean_age) - ((root_stdev_age* root_stdev_age) * 0.5)
                        		root_age ~ dnLognormal(root_LN_mu, root_stdev_age, <offset>)
                		

    		- Choose prior distribution
    			- Yule
        			- Speciation rate
            			- fix (enter decimal value greater than 0)
		         
                    	         speciation <- <value>
		         
            			- estimate, choose prior distribution
                			- Uniform, enter min value and max value
		         
                        	         speciation ~ dnUniform(<min>, <max>)
                			
                			- Exponential, enter rate value
		         
                        	         speciation ~ dnExp(<rate value>)
                			
                			
                	- Extant species sampling probability
                        - fix, enter 0 =< value >= 1 (default = 1)
                        
                                rho <- <value>
                                
                        - estimate, choose prior distribution
                            - Beta, enter alpha and beta
                            
                                    rho ~ dnBeta(<alpha>, <beta>)
                
    			- Birth-death
        			- Speciation rate
            			- fix (enter decimal value greater than 0)
		         
                    	         speciation <- <value>
		         
            			- estimate, choose prior distribution
                			- Uniform, enter min value and max value
		         
                        	         speciation ~ dnUniform(<min>, <max>)
                			
                			- Exponential, enter rate value
		         
                        	         speciation ~ dnExp(<rate value>)
                			
            		- Extinction rate
            			- fix (enter decimal value greater than 0)
		         
                    	         extinction <- <value>
		         
            			- estimate, choose prior distribution
                			- Uniform, enter min value and max value
		         
                        	         extinction ~ dnUniform(<min>, <max>)
                			
                			- Exponential, enter rate value
		         
                        	         extinction ~ dnExp(<rate value>)
	
                	- Extant species sampling probability
                        - fix, enter 0 =< value >= 1 (default = 1)
                        
                                rho <- <value>
                                
                        - estimate, choose prior distribution
                            - Beta, enter alpha and beta
                            
                                    rho ~ dnBeta(<alpha>, <beta>)
    			
    			- there are more...need to add later
- Constraints & Calibrations
    - Add monophyly constraint, this should open options to select or enter taxon names, they should also give a name to their constraint (we can give a default name of `clade_i`, where `i` is the the number of the constraint.
    
            clade_1 = clade("<taxon name 1>", "<taxon name 2>", ...)
            
        - Calibrate constraint (check-box)
            - This is complicated and will need some thinking...

# MCMC