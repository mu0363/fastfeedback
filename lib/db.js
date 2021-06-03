import firebase from './firebase';
import { getStripe } from './stripe';

const db = firebase.firestore();

export const createUser = (uid, user) => {
  return db.collection('users').doc(uid).set(user, { merge: true });
};

export const createSite = (data) => {
  const site = db.collection('sites').doc();
  data.id = site.id;
  return site.set(data);
};

export const createFeedback = (data) => {
  const feedback = db.collection('feedback').doc();
  data.id = feedback.id;
  return feedback.set(data);
};

export const deleteFeedback = (feedbackId) => {
  const feedback = db.collection('feedback').doc(feedbackId).delete();
  return feedback;
};

export const updateFeedback = (feedbackId, status) => {
  const feedback = db.collection('feedback').doc(feedbackId).update({
    status,
  });
  return feedback;
};

export const checkoutSessionRef = async (uid) => {
  const docRef = await db
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: 'price_1I6SBEJGNqgNu47cCWNBklHY',
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
  docRef.onSnapshot(async (snap) => {
    const { error, sessionId } = snap.data();
    if (error) {
      alert(`An error occured: ${error.message}`);
    }
    if (sessionId) {
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
};

export const goToBillingPortal = async () => {
  const functionRef = firebase
    .app()
    .functions('asia-northeast1')
    .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
  const { data } = await functionRef({ returnUrl: window.location.origin });
  window.location.assign(data.url);
};
