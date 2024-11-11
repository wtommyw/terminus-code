import Alpine from 'alpinejs'
import "./main.scss";
 
window.Alpine = Alpine;

const allNumbers = [0, 10, 11, 20, 21, 22];
const allOptions = allNumbers.map(number => {
    return {
        value: number,
        variable: undefined,
    };
})

document.addEventListener('alpine:init', () => {
    Alpine.store('options', {
        options: allOptions.slice(0),

        get x() {
            return this.options.find(el => el.variable === 'x')?.value;
        },

        get y() {
            return this.options.find(el => el.variable === 'y')?.value;
        },

        get z() {
            return this.options.find(el => el.variable === 'z')?.value;
        },

        get firstDigit() {
            if (this.x === undefined) {
                return '--';
            }

            return this.pad((2 * this.x) + 11);
        },

        get secondDigit() {
            if (this.y === undefined || this.z === undefined) {
                return '--';
            }

            return this.pad(((2 * this.z) + this.y) - 5);
        },

        get thirdDigit() {
            if (this.x === undefined || this.y === undefined || this.z === undefined) {
                return '--';
            }

            return this.pad(Math.abs((this.y + this.z) - this.x));
        },

        select(variable, selectedNumber) {
            console.log(variable, selectedNumber);
            
            const currentlySelected = this.options.findIndex(el => el.variable === variable);
            if (this.options[currentlySelected] !== undefined) {
                this.options[currentlySelected].variable = '';
            }

            const index = this.options.findIndex(el => {
                return el.value === selectedNumber;
            });
            this.options[index].variable = variable;
        },

        pad(number) {
            return String(number).padStart(2, '0')
        },
    });
});

Alpine.start();