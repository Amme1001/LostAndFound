<template>
    <div id="login-box">

        <div class="login-box-logo">
            <h3><img src="../assets/admin/img/logo-login.png" alt="Logo"/></h3>
        </div>

        <!--login form-->
        <template v-if="showLoginForm">
            <AdminLoginForm :toRegisterForm="toRegisterForm"></AdminLoginForm>
        </template>

        <!--register form-->
        <template v-if="showRegisterForm">
            <AdminRegisterForm :toLoginForm="toLoginForm"></AdminRegisterForm>
        </template>

    </div>
</template>

<style>
    @import "../assets/admin/css/login.css";
</style>

<script>
    import AdminLoginForm from "./login/loginForm.vue";
    import AdminRegisterForm from "./login/registerForm.vue";

    export default {
        name: "AdminLogin",
        // 模板
        components: {AdminLoginForm, AdminRegisterForm},
        // 数据
        data() {
            return {
                // 显示登陆表单
                showLoginForm: true,
                // 显示注册表单
                showRegisterForm: false,
            }
        },
        methods: {
            // 显示登陆表单
            toLoginForm() {
                this.showLoginForm = true;
                this.showRegisterForm = false;
            },
            // 显示注册表单
            toRegisterForm() {
                this.showRegisterForm = true;
                this.showLoginForm = false;
            }
        }
    }
</script>