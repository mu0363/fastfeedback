import { compareDesc, parseISO } from 'date-fns';
import { db } from './firebase-admin';

export const getAllSites = async () => {
  const snapshot = await db.collection('sites').get();
  const sites = [];
  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return sites;
};

export const getUserSites = async (uid) => {
  const snapshot = await db
    .collection('sites')
    .where('authorId', '==', uid)
    .get();
  const sites = [];
  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });
  return sites;
};

export const getAllFeedback = async (siteId) => {
  const snapshot = await db
    .collection('feedback')
    .where('siteId', '==', siteId)
    .get();
  const feedback = [];
  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  feedback.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return feedback;
};

export const getUserFeedback = async (uid) => {
  const snapshot = await db
    .collection('feedback')
    .where('authorId', '==', uid)
    .get();
  const feedback = [];
  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });
  return feedback;
};
