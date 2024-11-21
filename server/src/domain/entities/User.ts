import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class User {
  private constructor(private props: UserProps) {
    this.validate();
  }

  public static async create(name: string, email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    return new User({
      id: randomUUID().toString(),
      name,
      email,
      password: passwordHash
    });
  }

  public static with(props: UserProps) {
    return new User(props);
  }

  private validate() {
    if (!this.props.name) {
      throw new Error('Name is required');
    }
    if (!this.props.email || !this.validateEmail(this.props.email)) {
      throw new Error('A valid email is required');
    }
    if (!this.props.password) {
      throw new Error('Password hash is required');
    }
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password
  }

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.props.password);
  }

  private validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
