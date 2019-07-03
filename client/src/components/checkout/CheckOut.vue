<template>
    <section>
        <div ref="card"></div>
        <button v-on:click="register">Register</button>
    </section>
  
</template>

<script>

    import Keys from '../../helpers/courses'
    let stripe = Stripe(`${Keys.stripeKeys.publishable_key}`),
    elements = stripe.elements(),
    card = undefined

    let style = {
        base: {
            border: '1px solid #D8D8D8',
            borderRadius: '4px',
            color: "#000",
        },

        invalid: {
            color:'red'
        }
    }


export default {
    mounted(){
        card = elements.create('card', style)
        card.mount(this.$refs.card)
    },

    methods:{
        async register(){
            const {token, error} = await stripe.createToken(card)
            
            
            // Access the token with result.token
            let self = this

            if (error) {
                self.hasCardErrors = true
                self.$forceUpdate() // Forcing the DOM to update so the Stripe Element can update.
                return
            }

            this.$store.dispatch('checkOut', token)
            
        }
    }
}

</script>