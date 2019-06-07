<template>
    <section>
        <div class="container mt-5 col-sm-10 col-md-6 col-lg-4 p-5">
            <div class="row">                
                <form action="/forgot" method="POST">
                    <legend>Forgot Password</legend>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" autofocus class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Reset Password">
                    </div>
                </form>               
            </div>
        </div>
    </section>    
</template>
<script>
export default {
    
}
</script>

