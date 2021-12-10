import {email, minLength, required} from "vuelidate/lib/validators";

export default {
    data () {
        return {
            email: '',
            password: '',
            step: 1,
            passwordFieldType: "password"
        }
    },
    methods: {
        nextStep () {
            if (this.step < 5) {
                this.step++
            }
        },
        backStep () {
            if (this.step > 1) {
                this.step--
            }
        },
        switchVisibility () {
            this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password"
        },
        nextStepAndCheckInput () {
            if (this.email !== '') {
                this.nextStep()
            }
        },
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            minLength: minLength(8)
        },
        recoveryEmail: {
            required,
            email
        },
    },
}