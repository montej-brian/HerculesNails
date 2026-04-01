import { create } from 'zustand';

export const useStore = create((set) => ({
  cart: [],
  addToCart: (service) => set((state) => ({ cart: [...state.cart, service] })),
  removeFromCart: (serviceId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== serviceId)
  })),
  clearCart: () => set({ cart: [] }),
  bookingDetails: {
    technicianId: null,
    date: null,
    time: null,
    customer: {
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    }
  },
  updateBookingDetails: (details) => set((state) => ({
    bookingDetails: { ...state.bookingDetails, ...details }
  })),
  clearBookingDetails: () => set({
    bookingDetails: {
      technicianId: null,
      date: null,
      time: null,
      customer: { name: '', email: '', phone: '', specialRequests: '' }
    }
  })
}));
