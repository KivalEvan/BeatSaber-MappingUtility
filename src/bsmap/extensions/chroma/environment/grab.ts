// deno-lint-ignore-file no-unused-vars
abstract class EnvironmentGrabBase {
   protected _regex = '';
   protected _string = '';

   get regex() {
      return this._regex;
   }

   get string() {
      return this._string;
   }
}

export class EnvironmentGrab extends EnvironmentGrabBase {
   private hasNested = false;

   constructor(value?: string) {
      super();
      if (value) {
         this._string = value;
         this._regex = value;
      }
   }

   static Preset = {
      ENVIRONMENT: new EnvironmentGrab().child().name('Environment').end(),
      CONSTRUCTION: new EnvironmentGrab('Environment').child().name('Construction').end(),
      SMOKE: new EnvironmentGrab().child().name('BigSmokePS').end(),
   } as const;

   static create(value?: string) {
      if (value) {
         return new this(value) as EnvironmentGrabNamed;
      }
      return new this();
   }

   /** Grab game object name. */
   name(value: string): EnvironmentGrabNamed {
      this._string += value.trim();
      this._regex += value.trim();
      return this as unknown as EnvironmentGrabNamed;
   }

   /** Take duplicate ID. */
   id(id: number | null, optional?: boolean): EnvironmentGrabNamedID {
      if (id !== null) {
         if (optional) {
            this._regex += `( \\(${id}\\))?`;
         } else {
            this._regex += ` \\(${id}\\)`;
         }
         this._string += ` (${id})`;
      } else {
         if (optional) {
            this._regex += `( \\(\\d+\\))?`;
         } else {
            this._regex += ` \\(\\d+\\)`;
         }
         this._string += ` (1)`;
      }
      return this as unknown as EnvironmentGrabNamedID;
   }

   /** Add spaces. */
   space(count = 1) {
      for (let i = 0; i < count; i++) {
         this._string += ' ';
         this._regex += ' ';
      }
      return this;
   }

   /** Grab cloned. */
   clone(count = 1): EnvironmentGrabNamedID {
      for (let i = 0; i < count; i++) {
         this._string += ' (Clone)';
         this._regex += ' \\(Clone\\)';
      }
      return this as EnvironmentGrabNamedID;
   }

   /**  Final regex point, also endpoint. */
   end(): EnvironmentGrabEnd {
      this._regex += '$';
      return this as EnvironmentGrabEnd;
   }

   /** Move into child, ID is optional for regex. */
   child(id?: number): EnvironmentGrabChild {
      this._string += `.[${typeof id === 'number' ? id : 1}]`;
      this._regex += `\\.\\[${typeof id === 'number' ? id : '\\d+'}\\]`;
      return this as EnvironmentGrabChild;
   }
}

abstract class EnvironmentGrabEnd extends EnvironmentGrabBase {}

abstract class EnvironmentGrabChild extends EnvironmentGrabBase {
   name(value: string) {
      return this as unknown as EnvironmentGrabNamed;
   }

   space(count = 1) {
      return this;
   }
}

abstract class EnvironmentGrabNamed extends EnvironmentGrabBase {
   id(id: number | null, optional?: boolean) {
      return this as unknown as EnvironmentGrabNamedID;
   }

   clone(count = 1) {
      return this as EnvironmentGrabEnd;
   }

   end() {
      return this as EnvironmentGrabEnd;
   }

   child(id?: number) {
      return this as unknown as EnvironmentGrabChild;
   }

   space(count = 1) {
      return this;
   }
}

abstract class EnvironmentGrabNamedID extends EnvironmentGrabBase {
   clone(count = 1) {
      return this;
   }

   end() {
      return this as EnvironmentGrabEnd;
   }

   child(id?: number) {
      return this as unknown as EnvironmentGrabChild;
   }

   space(count = 1) {
      return this;
   }
}
