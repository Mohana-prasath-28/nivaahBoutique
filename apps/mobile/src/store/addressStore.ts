import { create } from 'zustand';
import type { Address } from '../types/models';

type AddressState = {
  addresses: Address[];
  setDefault: (id: string) => void;
  add: (a: Address) => void;
  remove: (id: string) => void;
  update: (id: string, patch: Partial<Address>) => void;
  defaultAddress: () => Address | undefined;
};

const seed: Address[] = [
  {
    id: 'a1',
    name: 'Asha Sharma',
    phone: '+91 9876543210',
    pincode: '560001',
    city: 'Bengaluru',
    state: 'Karnataka',
    addressLine: '12, MG Road, Near Metro Station',
    isDefault: true,
  },
  {
    id: 'a2',
    name: 'Rahul Verma',
    phone: '+91 9123456780',
    pincode: '110001',
    city: 'New Delhi',
    state: 'Delhi',
    addressLine: '221B, Connaught Place',
    isDefault: false,
  },
];

export const useAddressStore = create<AddressState>((set, get) => ({
  addresses: seed,

  setDefault: (id) =>
    set((s) => ({
      addresses: s.addresses.map((a) => ({ ...a, isDefault: a.id === id })),
    })),

  add: (a) => set((s) => ({ addresses: [{ ...a, isDefault: s.addresses.length === 0 }, ...s.addresses] })),

  remove: (id) => set((s) => ({ addresses: s.addresses.filter((a) => a.id !== id) })),

  update: (id, patch) =>
    set((s) => ({ addresses: s.addresses.map((a) => (a.id === id ? { ...a, ...patch } : a)) })),

  defaultAddress: () => get().addresses.find((a) => a.isDefault) ?? get().addresses[0],
}));

