import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox';


export default function regPrimeVue(app) {
    app.use(PrimeVue, { ripple: true });
    app.component('PButton', Button);
    app.component('PInputText', InputText);
    app.component('PCheckbox', Checkbox);
};