<template>
    <div class="container">
        <img alt="reset image" class="reset-image" src="../../assets/images/movie-poster.jpg">

        <div class="reset">
            <h2 class="reset-title">Reset password</h2>

            <form class="reset-form" @submit.prevent="submitEmail">
                <div v-if="errorMessage" class="error">
                    {{ errorMessage }}
                </div>

                <input v-model="email" class="reset-form-input" name="email" type="text" placeholder="Email"/>

                <input type="submit" class="reset-form-submit_btn" value="SEND"/>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ForgotPassword",
        data() {
            return {
                email: '',
                errorMessage: ''
            }
        },
        methods: {
            validEmail(email_data) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email_data);
            },

            checkForm() {

                if (!this.email) {
                    this.errorMessage = 'Email field is required if you want to reset your password!';
                    return false;
                }

                else if (!this.validEmail(this.email)) {
                    this.errorMessage = 'Invalid email!';
                    return false;
                }

                else {
                    this.errorMessage = '';
                    return true;
                }
            },

            submitEmail() {
                
                if(this.checkForm()) {
                    //AXIOS

                    this.email = '';
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 100vh;
        position: relative;

        &::before {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba($c-black, 0.7);
        }

        .reset-image {
            width: 100%;
            height: 100vh;
            object-fit: cover;
            object-position: center;
        }

        .reset {
            position: absolute;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba($c-black, 0.8);
            border-radius: 5px;
            padding: 65px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            &-title {
                font-size: 30px;
                color: $c-white;
                width: 100%;
                margin: 0 0 15px;
            }

            &-form {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 300px;

                .error {
                    width: calc(100% - 16px);
                    background-color: $c-red;
                    color: $c-white;
                    border-radius: 3px;
                    padding: 8px;
                    font-size: 15px;
                }

                &-input {
                    height: 40px;
                    font-size: 16px;
                    background-color: $c-3;
                    color: $c-white;
                    padding: 5px 15px;
                    border-radius: 3px;
                    outline: none;
                    border: none;
                    width: calc(100% - 30px);
                    margin: 8px 0;

                    &::placeholder {
                        color: $c-9;
                    }
                }

                &-submit_btn {
                    width: 100%;
                    padding: 12px 0;
                    font-size: 18px;
                    color: $c-white;
                    background-color: $c-green-theme;
                    border: none;
                    border-radius: 3px;
                    margin: 10px 0 0;
                    cursor: pointer;
                    transition: .3s;
                }
            }
        }
    }
</style>