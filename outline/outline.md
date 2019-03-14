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
		- Base frequencies `pi_F81` (Simplex, size 4)
						
		```
		Q := fnF81(pi_F81)
		```
						
	- K80
		- Transition/transversion ratio `kappa_K80` (RealPos)
						
		```
		Q := fnK80(kappa_K80)
		```
	
	- HKY
		- Transition/transversion ratio `kappa_HKY` (RealPos)
		- Base frequencies `pi_HKY` (Simplex, size 4)
						
		```
		Q := fnHKY(kappa_HKY, pi_HKY)
		```
		
	- GTR
		- Exchangeabilities `er_GTR` (Simplex, size 6)
		- Base frequencies `pi_GTR` (Simplex, size 4)
						
		```
		Q := fnGTR(er_GTR, pi_GTR)
		```
	
#### (Amino acid)
				
- Matrix type (radio button)
	- Empirical
		- Base frequencies `pi_aa` (Simplex, size 20)
		- Model (dropdown)
			- WAG
				
				(Empirical base freqs)
				
					Q <- fnWAG()
				
				(Estimated base freqs)
				
					Q <- fnWAG(pi_aa)
					
			- LG
			
				(Empirical base freqs)
				
					Q <- fnLG()
				
				(Estimated base freqs)
				
					Q <- fnLG(pi_aa)
					
			- etc.
			
	- Estimated
		- Model (dropdown)
			- Poisson
			- GTR
		
### Site Rates Model (Checkboxes)

- +I (Proportion of invariant sites) `prop_inv` (Probability)
- +G (Gamma distributed rates across sites) `site_rates_shape` (RealPos)
	- `num_rate_categories` number of site rate categories (fixed integer > 0, default = 4)
				
	```
	site_rates := fnDiscretizeGamma(site_rates_shape, site_rates_shape, num_rate_categories)
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
   		- Branch Lengths `branch_lengths` (Vector of RealPos)
   			- "Fixed" only available for fixed topology
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
        		- Root age `root_age` (RealPos)
        		- Origin time `origin` (RealPos)

    		- Choose prior distribution
    			- Yule
        			- Speciation rate `speciation` (RealPos)
        			- Extant species sampling fraction `rho` (Probability)
        		
    			- Birth-death
    				- Speciation rate `speciation` (RealPos)
    				- Extinction rate `extinction` (RealPos)
        			- Extant species sampling fraction `rho` (Probability)
    			
    			- there are more...need to add later
- Constraints & Calibrations
    - Add monophyly constraint, this should open options to select or enter taxon names, they should also give a name to their constraint (we can give a default name of `clade_i`, where `i` is the the number of the constraint.
    
            clade_1 = clade("<taxon name 1>", "<taxon name 2>", ...)
            
        - Calibrate constraint (check-box)
            - This is complicated and will need some thinking...

# MCMC