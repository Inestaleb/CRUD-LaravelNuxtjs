import vue from 'vue';
import {mapGetters}  from 'vuex';
const Validation ={
install(Vue,options){
    Vue.mixin({
        computed:{
            ...mapGetters({
              user:'user',
              authenticated:'authenticated'
            })
        }
    })
}
}
vue.use(Validation);