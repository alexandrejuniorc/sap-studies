export interface CustomerProps {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export class CustomerModel {
    constructor(private props: CustomerProps) {}

    // ANTES DOS GETTERS, POIS, É UM MÉTODO ESTÁTICO
    public static create(props: CustomerProps) {
        const customer = new CustomerModel({ ...props });
        return customer;
    }

    public get id(): string {
        return this.props.id;
    }

    public get firstName(): string {
        return this.props.firstName;
    }

    public get lastName(): string {
        return this.props.lastName;
    }

    public get email(): string {
        return this.props.email;
    }

    // DEPOIS DOS GETTERS, POIS, É UM MÉTODO DE INSTÂNCIA
    public setDefaultEmailDomain(): CustomerModel {
        const IS_VALID_EMAIL = this.props.email?.includes('@');

        if (!IS_VALID_EMAIL) {
            this.props.email = `${this.props.email}@gmail.com`;
        }

        return this;
    }

    // DEPOIS DOS GETTERS, POIS, É UM MÉTODO DE INSTÂNCIA
    public toObject(): CustomerProps {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
        };
    }
}
