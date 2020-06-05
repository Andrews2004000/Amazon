export default {
    data() {
        return {
            rules: {
                nameRules: [(v:any) => !!v || 'Name is required'],
                emailRules: [(v:any) => !!v || 'E-mail is required', (v:any) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
                passwordRules: [
                    (v:any) => !!v || 'Password is required',
                    (v:any) => (v && v.length >= 5) || 'Password must be more than 5 characters'
                ],
                changePasswordRules: [
                    (v:any) => {
                        if (!v) {
                            return true;
                        }
                        return v.length >= 5 || 'Password must be more than 5 characters';
                    }
                ],
                notEmptyRule: [(v:any) => !!v || 'This field is required']
            }
        };
    }
};
