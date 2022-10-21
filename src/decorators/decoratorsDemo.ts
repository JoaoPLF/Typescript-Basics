interface Contact {
    id: number;
}

const currentUser = {
    id: 1234,
    roles: ["ContactEditor"],
    isAuthenticated(): boolean {
        return true;
    },
    isInRole(role: string): boolean {
        return this.roles.contains(role);
    }
}

function authorize(role: string) {
    return function authorizeDecorator(target: any, property: string, descriptor: PropertyDescriptor) {
        const wrapped = descriptor.value;
    
        descriptor.value = function () {
            if (!currentUser.isAuthenticated()) {
                throw Error("User is not authenticated");
            }

            if (!currentUser.isInRole(role)) {
                throw Error(`User not in role ${role}`);
            }
    
            try {
                return wrapped.apply(this, arguments);
            }
            catch (ex) {
                throw ex;
            }
        }
    }
}

function freeze(constructor: Function) {
    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
}

function singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class Singleton extends constructor {
        static _instance = null;

        constructor(...args) {
            super(...args);

            if (Singleton._instance) {
                throw Error("Duplicate instance");
            }

            Singleton._instance = this;
        }
    }
}

function auditable(target: object, key: string | symbol) {
    let val = target[key];

    Object.defineProperty(target, key, {
        get: () => val,
        set: (newVal) => {
            console.log(`${key.toString()} changed: `, newVal);
            val = newVal;
        },
        enumerable: true,
        configurable: true
    });
}

@freeze
@singleton
class ContactRepository {
    @auditable
    private contacts: Contact[] = [];

    @authorize("ContactViewer")
    getContactById(id: number): Contact | null {
        console.trace(`ContactRepository.getContactById: BEGIN`);

        const contact = this.contacts.find(x => x.id === id);

        console.debug(`ContactRepository.getContactById: END`);

        return contact;
    }

    @authorize("ContactViewer")
    save(contact: Contact): void {
        console.trace(`ContactRepository.save: BEGIN`);

        const existing = this.getContactById(contact.id);

        if (existing) {
            Object.assign(existing, contact);
        } else {
            this.contacts.push(contact);
        }

        console.debug(`ContactRepository.save: END`);
    }
}