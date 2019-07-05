/**
 *  Not all courses have the same properties
 * The objects here are to be used to present info to users and admins
 */

const Costs = {
    "CNA": 75,       
    'Adult CPR/FA': 80,    
    "Infant, Child, Adult CPR/FA": 110,
    "Basic Life Support (BLS)": 65,
    "Job posting": 25
}

const stripeKeys = {
    publishable_key: "pk_test_FgBE9JjMUDZGe7i1k6KvBKEv",
    //secret_key: 'sk_test_8FKHH34P5YD8HuxPT136mz2X'
}


module.exports = {Costs, stripeKeys}