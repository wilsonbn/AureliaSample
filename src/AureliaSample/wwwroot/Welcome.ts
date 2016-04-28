import {LogManager} from 'aurelia-framework';

export class Welcome {
    heading: string = 'Welcome to Aurelia!';
    firstName: string = 'John';
    lastName: string = 'Doe';

    constructor() {
        var temp = LogManager.getLogger(0);
        temp.info('test - welcome');
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    submit(): void {
        alert(`Welcome, ${this.fullName}!`);
    }
}