interface ICallable<T, R> {
  (t: T): R;
}
export default class Optional<T> {
  private val: T | null;

  private constructor(val: T | null) {
    this.val = val;
  }
  static of<T>(val: T) {
    return new Optional(val);
  }

  static empty<T>() {
    return new Optional<T>(null);
  }

  isEmpty() {
    return this.val === null;
  }

  map<R>(f: ICallable<T, R>): Optional<R> {
    if (this.isEmpty()) {
      return Optional.empty();
    }
    return Optional.of(f(this.val as T));
  }

  flatMap<R>(f: ICallable<Optional<T>, Optional<R>>): Optional<R> {
    if (this.isEmpty()) {
      return Optional.empty();
    }
    return f(this);
  }

  get(): T | null {
    return this.val;
  }

  orElse(other: T): T {
    if (this.isEmpty()) {
      return other;
    }
    return this.val as T;
  }

  toString(): string {
    if (this.isEmpty()) {
      return "[Optional empty]";
    }
    return `[Optional ${this.val}]`;
  }
}
