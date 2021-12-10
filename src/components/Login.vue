<template>
    <div>
        <div class="auth">

            <div class="step" v-show="step === 1">
                <div class="auth_wrap">
                    <div class="auth_title">Авторизация</div>
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
                    <!--                    <vue-topprogress ref="topProgress"></vue-topprogress>-->
                    <div class="auth_wrap">
                        <div class="auth_title">Авторизация</div>
                        <div class="auth_subtitle">На портале example.com</div>
                        <form class="auth_blog">
                            <input type="password"
                                   :type="passwordFieldType"
                                   v-model="password" @blur="$v.password.$touch()"
                                   :class="{'input_error': $v.password.$error}">
                            <div @click="switchVisibility" :class="{'view': passwordFieldType === 'password'}" class="password-control"></div>
                            <label>Пароль</label>
                            <div class="invalid" v-if="!$v.password.minLength"> минимально должно быть {{ $v.password.$params.minLength.min }} слов или цифр а не {{ password.length }}!</div>
                            <div class="forgotpassword forgotpassword_hover" @click="nextStep">Забыли пароль?</div>
                            <button type="button" class="further" @click="onSubmit">Войти</button>
                            <div class="forgotpassword tac" @click="backStep"><div class="arrow"></div><span>Назад</span></div>
                        </form>
                    </div>
                </div>
            </transition>

            <transition name="slide-fade">
                <div class="step" v-show="step === 3">
                    <div class="auth_wrap">
                        <div class="auth_title">Восстановление доступа</div>
                        <div class="auth_subtitle">Введите адрес электронной почты</div>
                        <form class="auth_blog">
                            <input type="email"
                                   placeholder="example@mail.com"
                                   v-model="email" @blur="$v.email.$touch()"
                                   :class="{'input_error': $v.email.$error}">
                            <label>Email</label>
                            <div class="invalid" v-if="$v.email.$error" v-show="$v.email.email">Пожалуйста, введите адрес электронной почты</div>
                            <div class="invalid" v-if="!$v.email.email">Пожалуйста, введите действительный адрес электронной почты</div>
                            <button type="button" @click="nextStepAndCheckInputSendLetter" class="disabled" :class="{'further': $v.email.email}">Далее</button>
                            <div class="forgotpassword tac" @click="backStep"><div class="arrow"></div><span>Назад</span></div>
                        </form>
                    </div>
                </div>
            </transition>

            <transition name="slide-fade">
                <div class="step" v-show="step === 4">
                    <div class="auth_wrap">
                        <div class="auth_title">Пожалуйста, подтвердите адрес электронной почты</div>
                        <div class="auth_subtitle">Код отправлен на {{this.email}}</div>
                        <form class="auth_blog">
                            <input type="email"
                                   v-model="letterCode">
                            <label>Код из письма:</label>
                            <div class="second"><span v-if="timerCount">Отправить повторно через: {{timerCount}} сек</span> <span v-else="">Не получили письмо? <span @click="sendReturn" class="sendReturn">Отправить повторно</span></span></div>
                            <button type="button" @click="checkRandomCode" class="further">Далее</button>
                            <div class="forgotpassword tac" @click="backStep"><div class="arrow"></div><span>Назад</span></div>
                        </form>
                    </div>
                </div>
            </transition>

            <transition name="slide-fade">
                <div class="step" v-show="step === 5">
                    <div class="auth_wrap">
                        <div class="auth_title">Почти готово</div>
                        <div class="auth_subtitle">Введите новый пароль</div>
                        <form class="auth_blog">
                            <input type="password"
                                   :type="passwordFieldType"
                                   v-model="newPassword">
                            <div @click="switchVisibility" :class="{'view': passwordFieldType === 'password'}" class="password-control"></div>
                            <label>Пароль</label>
                            <div class="auth_subtitle">Пароль должен состоять из восьми или более символов латинского алфавита, содержать заглавные и строчные буквы, цифры. Для усложнения рекомендуем добавить символы и знаки препинания ! @ $ % ^ & * ( ) _ - +</div>
                            <button type="button" @click="resetPassword" class="further">Сбросить пароль</button>
                            <div class="forgotpassword tac" @click="backStep"><div class="arrow"></div><span>Назад</span></div>
                        </form>
                    </div>
                </div>
            </transition>

        </div>
        <router-view/>
    </div>
</template>
<script>
    import Mixin from "../mixin/mixin"
    export default {
        mixins: [Mixin],
        data () {
            return {
                recoveryEmail: '',
                letterCode: '',
                timerCount: 120,
                newPassword: '',
                sendCode: '',
                user: null
            }
        },
        methods: {
            nextStepAndCheckInputSendLetter () {
                if (this.email !== '') {
                    this.nextStep()
                    this.countDown()
                }
                this.sendCode =  Math.floor(Math.random() * 952143).toString()
                Email.send({
                    Host : "smtp.mail.ru",
                    Username : "testtestov0901@mail.ru",
                    Password : "Lzr99AAgJBfNQqSxHp2c",
                    To : this.email,
                    From : "testtestov0901@mail.ru",
                    Subject : "This is the subject",
                    Body : this.sendCode
                }).then(
                    message => alert(message)
                );
            },
            checkRandomCode () {
                if (this.sendCode === this.letterCode) {
                    this.nextStep()
                } else {
                    alert('Введен неверный код!')
                }
            },
            onSubmit () {
                if (this.email !== '' && this.password !== '') {
                    const user = {
                        email: this.email,
                        password: this.password
                    }
                    this.$store.dispatch('loginUser', user).then(() => {
                        this.$router.push('/main')
                    })
                } else {
                    alert('Заполните для начала почту и пароль!')
                }
            },
            resetPassword () {
                this.$store.dispatch('getUserData', {
                    email: this.email
                }).then(() => {
                    this.user = this.$store.getters.user
                    this.user.password = this.newPassword
                    this.$store.dispatch('updatePassword', this.user)
                    this.$router.push('/main')
                })
            },
            sendReturn () {
                if (this.timerCount) {
                    this.countDown()
                }
            },
            countDown () {
                if (this.timerCount) {
                    return setTimeout(() => {
                        --this.timerCount
                        this.countDown()
                    }, 1000)
                }
            },
        },
    }
</script>