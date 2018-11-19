// types
import { IdType } from './typing/types';

export abstract class Shape<T extends { id: IdType }> {
  attributes: T;
  private previousAttributes?: T;

  constructor(attributes: T) {
    this.attributes = this.parse(attributes);
  }

  /**
   * Call shape render
   */
  abstract draw(): void;

  /**
   * Call when shape must be destroy
   */
  abstract destroy(): void;

  /**
   * Call when shape must be animate
   */
  abstract transition(): void;

  update(attributes: T): void {
    this.previousAttributes = this.attributes;
    this.attributes = this.parse(attributes);
    const changes = this.calculateChanges(this.attributes, this.previousAttributes);
    if (changes) {
      this.onChange(changes);
    }
  }

  // Call if attributes changed from last update
  onChange(_changes: Partial<T>): void {}

  protected parse(attributes: T): T {
    return attributes;
  }

  private calculateChanges(attributes: T, previousAttributes: T): Partial<T> | null {
    let isDirty: boolean = false;
    const changes: Partial<T> = {};
    const attributesKeys = Object.keys(attributes);
    let currentAttributesKey;
    for (let i = 0; i < attributesKeys.length; i += 1) {
      currentAttributesKey = attributesKeys[i];
      if (previousAttributes[currentAttributesKey] !== attributes[currentAttributesKey]) {
        changes[currentAttributesKey] = attributes[currentAttributesKey];
        isDirty = true;
      }
    }
    return isDirty ? changes : null;
  }
}
