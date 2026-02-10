type LoggedUserProps = {
    id: string;
    roles: string[];
    attributes: LoggedUserAttributesProps;
};

type LoggedUserAttributesProps = {
    id: number;
    groups: string[];
};

export class LoggedUserModel implements LoggedUserProps {
    constructor(private props: LoggedUserProps) {}

    public static create(props: LoggedUserProps): LoggedUserModel {
        return new LoggedUserModel(props);
    }

    get id(): string {
        return this.props.id;
    }

    get roles(): string[] {
        return this.props.roles;
    }

    get attributes(): LoggedUserAttributesProps {
        return this.props.attributes;
    }

    public toStringifiedObject(): string {
        return JSON.stringify(this.props);
    }
}
