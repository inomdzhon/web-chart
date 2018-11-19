// types
import { IdType, HashType, ListenersType } from "./typing/types";

import { Shape } from "./Shape";

export abstract class Layer<U extends { id: IdType }, T extends Shape<U>> {
  shapes: T[] = [];
  private hash: HashType = {};
  private listeners: ListenersType<T> = {
    add: [],
    remove: [],
  };

  /**
   * factory method for shapes instance
   */
  abstract createShape(attributes: U): T;

  set(items: U[]): void {
    const newHash: HashType = {};
    const newShapes: T[] = [];
    const removed: T[] = [];
    const added: T[] = [];

    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      newHash[item.id] = i;
      const origin = this.getById(item.id);
      if (origin) {
        origin.update(item);
        newShapes.push(origin);
      } else {
        const shape = this.createShape(item);
        newShapes.push(shape);
        added.push(shape);
      }
    }

    // call destroy method for removed shapes
    for (let i = 0; i < this.shapes.length; i += 1) {
      const item = this.shapes[i];
      if (newHash[item.attributes.id] === undefined) {
        item.destroy();
        removed.push(item);
      }
    }

    // commit changes
    this.shapes = newShapes;
    this.hash = newHash;

    // call listeners
    if (added.length) {
      this.executeAddListeners(added);
    }

    if (removed.length) {
      this.executeRemoveListeners(removed);
    }
  }

  /**
   * Return Shape instance by id
   * @param id
   */
  getById(id: IdType): T | null {
    return this.shapes[this.hash[id]] || null;
  }

  /**
   * Call draw layer
   */
  draw(): void {
    for (let i = 0; i < this.shapes.length; i += 1) {
      this.shapes[i].draw();
    }
  }

  /**
   * Call transition layer
   */
  transition(): void {
    for (let i = 0; i < this.shapes.length; i += 1) {
      this.shapes[i].transition();
    }
  }

  /**
   * Call for full destroy layer
   */
  destroy(): void {
    for (let i = 0; i < this.shapes.length; i += 1) {
      this.shapes[i].destroy();
    }
    this.clear();
  }

  /**
   *  Call listeners if in the layer were added new shapes
   */
  onAdd(cb: (items: T[]) => void): void {
    this.listeners.add.push(cb);
  }

  /**
   *  Call listeners if in the layer shapes has been removed
   */
  onRemove(cb: (items: T[]) => void): void {
    this.listeners.remove.push(cb);
  }

  private executeAddListeners(items: T[]): void {
    for (let i = 0; i < this.listeners.add.length; i += 1) {
      this.listeners.add[i](items);
    }
  }

  private executeRemoveListeners(items: T[]): void {
    for (let i = 0; i < this.listeners.remove.length; i += 1) {
      this.listeners.remove[i](items);
    }
  }

  private clear(): void {
    this.shapes = [];
    this.hash = {};
    this.listeners = {
      add: [],
      remove: [],
    };
  }
}
