<template>
    <div>
        <div class="auth">
            <div class="step" v-show="step === 1">
                <div class="auth_wrap">
                    <div class="auth_title">Регистрация</div>
                    <div class="auth_subtitle">На портале example.com</div>
                    <form class="auth_blog">
                        <input type="email"
                               placeholder="example@mail.com"
                               v-model="email" @blur="$v.email.$touch()"
                               :class="{'input_error': $v.email.$error}">
                        <label>Email</label>
                        <div class="invalid" v-if="$v.email.$error" v-show="$v.email.email">Пожалуйста, введите адрес электронной почты</div>
                        <div class="invalid" v-if="!$v.email.email">Пожалуйста, введите действительный адрес электронной почты</div>
                        <button type="button" class="disabled" :class="{'further': $v.email.email}" @click="nextStepAndCheckInput">Далее</button>
                    </form>
                </div>
            </div>

            <transition name="slide-fade">
                <div class="step" v-show="step === 2">
                    <div class="auth_wrap">
                        <!--                        <vue-topprogress ref="topProgress"></vue-topprogress>-->
                        <div class="auth_title">Регистрация</div>
                        <div class="auth_subtitle">На портале example.com</div>
                        <form class="auth_blog">
                            <input type="password"
                                   :type="passwordFieldType"
                                   v-model="password" @blur="$v.password.$touch()"
                                   :class="{'input_error': $v.password.$error}">
                            <div @click="switchVisibility" :class="{'view': passwordFieldType === 'password'}" class="password-control"></div>
                            <label>Пароль</label>
                            <div class="invalid" v-if="!$v.password.minLength"> минимально должно быть {{ $v.password.$params.minLength.min }} слов или цифр а не {{ password.length }}!</div>
                            <button type="button" class="further" @click="onSubmit">Войти</button>
                            <div class="forgotpassword tac" @click="backStep"><div class="arrow"></div><span>Назад</span></div>
                        </form>
                    </div>
                </div>
            </transition>

        </div>
    </div>
</template>
<script>
    import Mixin from '../mixin/mixin'
    // import vueTopprogress from 'vue-top-progress'
    export default {
        mixins: [Mixin],
        methods: {
            onSubmit () {
                if (this.email !== '' && this.password !== '') {
                    const user = {
                        email: this.email,
                        password: this.password
                    }
                    this.$store.dispatch('registerUser', user).then(() => {
                        this.$router.push('/main')
                    })
                }
            },
        },
        // mounted () {
        //     this.$refs.topProgress.start()
        //     setTimeout(() => {
        //         this.$refs.topProgress.done()
        //     }, 2000)
        // },
        // components: {
        //     vueTopprogress
        // }
    }
</script>
