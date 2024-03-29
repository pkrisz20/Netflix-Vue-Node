<template>
<div class="login">
    <a class="login-back" href="/"><i class="icon far fa-arrow-left"></i> Back to Home</a>
    <div class="container">
        <div class="admin">
            <h2 class="admin-title">Admin Login</h2>

            <form class="admin-form" @submit.prevent="submitAdminLogin">
                <div v-if="adminErrorMessage" class="error">
                    {{ adminErrorMessage }}
                </div>

                <div class="admin-form-item">
                    <input v-model="adminUsername" class="admin-form-item-input" name="username" id="username-admin" type="text" placeholder="Your username..."/>
                    <label for="username-admin">Username</label>
                </div>

                <div class="admin-form-item">
                    <input v-model="adminPassword" class="admin-form-item-input" name="password" id="admin-pass" type="password" placeholder="Your password..."/>
                    <label for="admin-pass">Password</label>
                </div>
                <div class="forgot-pass">
                    <a target="blank" href="forgotpassword" class="forgot-link">Forgot your password?</a>
                </div>

                <input type="submit" class="admin-form-submit_btn" value="SIGN IN"/>
                
                <div class="admin-form-checkbox">
                    <input type="checkbox" id="remember" name="remember" checked/>
                    <label for="remember">Remember me</label>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import Axios from "axios";
Axios.defaults.withCredentials = true;

    export default {
        name: "AdminLogin",
        data() {
            return {
                adminUsername: "",
                adminPassword: "",
                adminErrorMessage: "",
            }
        },
        methods: {
            checkForm() {
                if (!this.adminUsername || !this.adminPassword) {
                    this.adminErrorMessage = 'Each field is required!';
                    return false;
                }

                else {
                    this.adminErrorMessage = "";
                    return true;
                }
            },
            async submitAdminLogin() {
                
                if (this.checkForm()) {
                    await Axios.post(`${process.env.VUE_APP_API_URL}/admin/login`, { username: this.adminUsername, pass: this.adminPassword })
                    .then((res) => {
                        
                        if (!res.data.status) {
                            if (res.data.message === "You don't have admin permission") {
                                this.$router.push("/403");
                            }
                            else {
                                this.adminErrorMessage = res.data.message;
                            }
                        }

                        else if (res.data.status) {
                            this.$store.state.adminLoggedIn = true;
                            this.$router.push({ name: 'AdminPanel'});
                        }
                    });
                    this.adminUsername = "";
                    this.adminPassword = "";
                }
            },
        },
        mounted() {
            this.$store.state.httpStatus = 200; // need to be loaded the admin login page
        }
    }
</script>

<style lang="scss" scoped>
.login {
    position: relative;

    &-back {
        position: absolute;
        left: 40px;
        top: 40px;
        z-index: 5;
        padding: 12px 20px;
        border-radius: 5px;
        background-color: $c-blue;
        color: $c-d;
        font-family: $c-main-font;
        font-size: 20px;
        cursor: pointer;
        transition: .3s ease-in-out;
        display: flex;
        align-items: center;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;

        @media #{$r-max-tablet} {
            font-size: 16px;
        }

        i {
            margin-right: 10px;
            transition: transform .3s ease-in-out;
        }

        &:hover {
            background-color: $c-middleblue;

            i {
                transform: translateX(-8px);
            }
        }
    }

    .container {
        width: 100%;
        height: 100vh;
        background-image: url('../../assets/images/admin.jpg');
        background-position: center;
        background-size: cover;
        position: relative;
        @include flexCenter();

        &::before {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba($c-black, 0.7);
        }

        .admin {
            background-color: rgba($c-black, 0.8);
            border-radius: 5px;
            padding: 50px;
            @include flexCenter();
            flex-direction: column;
            position: relative;
            z-index: 2;

            @media #{$r-max-tablet} {
                padding: 35px;
            }

            @media #{$r-max-mobile-s} {
                width: 100%;
                height: auto;
                padding: 20px 0;
            }

            &-title {
                font-size: 30px;
                color: $c-white;
                width: 100%;
                margin: 0 0 15px;

                @media #{$r-max-tablet} {
                    font-size: 24px;
                    width: 300px;
                }
            }

            &-form {
                @include flexCenter();
                flex-direction: column;
                width: 300px;

                .error {
                    width: 100%;
                    background-color: $c-red;
                    color: $c-white;
                    border-radius: 3px;
                    padding: 8px;
                    font-size: 15px;
                    margin: 0 0 15px;

                    @media #{$r-max-mobile-s} {
                        font-size: 12px;
                    }
                }

                &-item {
                    position: relative;
                    width: 100%;
                    margin: 12px 0;

                    label {
                        position: absolute;
                        z-index: 2;
                        left: 15px;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 16px;
                        transition: all .2s ease-in-out;
                        color: $c-9;
                        pointer-events: none;
                    }
                    
                    &-input {
                        font-family: $c-main-font;
                        height: 40px;
                        font-size: 16px;
                        background-color: $c-3;
                        color: $c-white;
                        padding: 5px 15px;
                        border-radius: 3px;
                        outline: none;
                        border: none;
                        width: 100%;
                        margin: 0;

                        &:focus, &:active {
                            outline: 2px solid $c-green-theme;
                        }

                        &:focus + label, &:not(:placeholder-shown) + label, &:active + label, &:-webkit-autofill + label {
                            top: -12px;
                            left: 5px;
                            color: $c-green-theme;
                            font-size: 12px;
                        }

                        &::placeholder {
                            opacity: 0;
                            color: $c-9;
                            transition: all .3s;
                            font-family: $c-main-font;
                        }

                        @media #{$r-max-tablet} {
                            height: 26px;
                            font-size: 16px;
                        }

                        @media #{$r-max-mobile-s} {
                            font-size: 12px;
                        }
                    }
                }

                .forgot-pass {
                    width: 100%;

                    .forgot-link {
                        font-size: 14px;
                        transition: .3s;
                        color: $c-green-theme;
                        text-decoration: none;

                        @media #{$r-max-mobile-s} {
                            font-size: 12px;
                        }

                        &:hover {
                            color: $c-white;
                        }
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
                    margin: 25px 0 15px;
                    cursor: pointer;
                    transition: .3s;

                    @media #{$r-max-tablet} {
                        padding: 10px 0;
                        font-size: 16px;
                        margin: 10px 0 5px;
                    }
                }

                
                &-checkbox {
                    display: flex;
                    justify-content: flex-start;
                    width: 100%;
                    color: $c-b;
                    margin: 5px 0;
                    
                    label {
                        font-size: 16px;
                        color: $c-a;

                        @media #{$r-max-mobile-s} {
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
}
</style>